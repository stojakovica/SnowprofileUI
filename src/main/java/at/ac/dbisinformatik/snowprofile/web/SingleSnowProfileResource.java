package at.ac.dbisinformatik.snowprofile.web;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URISyntaxException;
import java.util.List;

import javax.xml.transform.TransformerException;

import org.apache.batik.transcoder.TranscoderException;
import org.apache.commons.io.output.ByteArrayOutputStream;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.Function;
import org.mozilla.javascript.JavaScriptException;
import org.mozilla.javascript.Scriptable;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.resource.Delete;
import org.restlet.resource.Get;
import org.restlet.resource.Put;
import org.restlet.resource.ServerResource;
import org.xml.sax.SAXException;

import at.ac.dbisinformatik.snowprofile.data.DB;
import at.ac.dbisinformatik.snowprofile.dataconverter.Converter;
import at.ac.dbisinformatik.snowprofile.web.svgcreator.SVGCreator;
import at.ac.dbisinformatik.snowprofile.web.svgcreator.Test;

import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import com.orientechnologies.orient.core.db.document.ODatabaseDocumentTx;
import com.orientechnologies.orient.core.record.impl.ODocument;
import com.orientechnologies.orient.core.serialization.OBase64Utils.OutputStream;
import com.orientechnologies.orient.core.sql.query.OSQLSynchQuery;

public class SingleSnowProfileResource extends ServerResource {
	
	private DB db;
	
	public SingleSnowProfileResource(DB db) {
		this.db = db;
	}
	
	@Get("pdf")
	public ByteArrayOutputStream getPDF() throws JSONException, SAXException, IOException, TransformerException, URISyntaxException, TranscoderException {
		String profileID = "";
		ByteArrayOutputStream returnDocument = null;
		try {
			boolean pdfFlag = true;
			Context cx = Context.enter();
			Scriptable scope = cx.initStandardObjects();
			Reader script = new InputStreamReader(Test.class.getResourceAsStream("/at/ac/dbisinformatik/snowprofile/web/resources/includeFunctions.js"));
			cx.evaluateReader(scope, script, "<cmd>", 1, null);
			Object func = scope.get("getJSON", scope);

			JSONObject jsObject = null;
			List<ODocument> resultDB = db.querySQL("select * from SnowProfile where @rid = #"+getRequestAttributes().get("id"));
			for (ODocument oDocument : resultDB) {
				jsObject = new JSONObject("{\"SnowProfile\": "+oDocument.toJSON().toString()+"}");
			}
			String jsonRawString = jsObject.get("SnowProfile").toString();
			profileID = new JSONObject(jsonRawString).get("rid").toString();
			profileID = profileID.replace("#", "_");
			profileID = profileID.replace(":", "_");
			Object stringify = ((Scriptable) scope.get("JSON", scope)).get("stringify", scope);
			Object jsonParse = ((Scriptable) scope.get("JSON", scope)).get("parse", scope);
			Object jsonRawObject = ((Function) jsonParse).call(cx, scope, scope, new Object[] { jsonRawString });
			if (func instanceof Function) {
				Object funcArgs[] = new Object[] { jsonRawObject, pdfFlag };
				Object result = ((Function) func).call(cx, scope, scope, funcArgs);
				String jsonString = (String) ((Function) stringify).call(cx, scope, scope, new Object[] { result });
				JsonArray jsonObject = (JsonArray) new JsonParser().parse(jsonString);
				returnDocument = SVGCreator.svgDocument(jsonObject, "pdf", new JSONObject(jsonRawString).get("rid").toString());
			}
		} catch (IOException ioe) {
			ioe.printStackTrace();
		} catch (JavaScriptException jse) {
			jse.printStackTrace();
		} catch (TransformerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			Context.exit();
		}
		return returnDocument;
	}
	
	@Get("xml")
	public String getXML() throws JSONException, SAXException, IOException, TransformerException {
		JSONObject returnProfile = null;
		String fileName = getRequestAttributes().get("id").toString();
		fileName = "_"+fileName.replace(":", "_");
		// TODO move to ScichtprofilDAO...
		List<ODocument> result = db.querySQL("select * from SnowProfile where @rid = #"+ getRequestAttributes().get("id"));

		for (ODocument oDocument : result) {
			returnProfile = new JSONObject("{\"SnowProfile\": "
					+ oDocument.toJSON().toString() + "}");
		}

		returnProfile = new JSONObject(JSONHelpers.flatten("stratProfile",
				returnProfile));
		String returnProfileString = returnProfile.toString();
		returnProfileString = returnProfileString.replace("\"rid\"","\"rid_old\"");
		returnProfileString = returnProfileString.replace("@", "");
		returnProfileString = returnProfileString.replace("null", "\"\"");
		returnProfileString = returnProfileString.replace("\"id\":\"\",", "");
		returnProfileString = returnProfileString.replace("\"id\":{\"id\":\"\"},", "");
		
		Converter con = new Converter();
		return con.convert(XML.toString(new JSONObject(returnProfileString)), "internConverter.xsl");
	}
	
	@Get("json")
	public String getJson() throws JSONException, IOException {
		JSONObject returnProfile = null;
		//TODO move to ScichtprofilDAO...
		List<ODocument> result = db.querySQL("select * from SnowProfile where @rid = #"+getRequestAttributes().get("id"));
			
		for (ODocument oDocument : result) {
			returnProfile = new JSONObject("{\"SnowProfile\": "+oDocument.toJSON().toString()+"}");
		}
		
		returnProfile = new JSONObject(JSONHelpers.flatten("stratProfile", returnProfile));
		String returnProfileString = returnProfile.toString();
		returnProfileString = returnProfileString.replace("\"rid\"", "\"rid_old\"");
		returnProfileString = returnProfileString.replace("@", "");
		returnProfileString = returnProfileString.replace("null", "\"\"");
		returnProfileString = returnProfileString.replace("\"id\":\"\",", "");
		returnProfileString = returnProfileString.replace("\"id\":{\"id\":\"\"},", "");
		
		return returnProfileString;
	}
	
	@Delete
	protected Representation delete() {
		db.delete("SnowProfile", getRequestAttributes().get("id").toString());
		return new StringRepresentation("{\"success\": \"true\"}");
	}
	
	@Put
	public String updateJson(Representation value) throws IOException, JSONException {
		db.update(getRequestAttributes().get("id").toString(), new JSONObject(value.getText()));	
		return "{\"success\": \"true\"}";
	}
}

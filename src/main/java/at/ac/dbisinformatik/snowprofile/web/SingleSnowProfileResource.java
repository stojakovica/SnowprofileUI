package at.ac.dbisinformatik.snowprofile.web;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URISyntaxException;

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
import org.restlet.data.MediaType;
import org.restlet.representation.OutputRepresentation;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.resource.Delete;
import org.restlet.resource.Get;
import org.restlet.resource.Put;
import org.restlet.resource.ServerResource;
import org.xml.sax.SAXException;

import at.ac.dbisinformatik.snowprofile.data.DB;
import at.ac.dbisinformatik.snowprofile.data.SchichtprofilDAO;
import at.ac.dbisinformatik.snowprofile.dataconverter.Converter;
import at.ac.dbisinformatik.snowprofile.web.svgcreator.SVGCreator;

import com.google.gson.JsonArray;
import com.google.gson.JsonParser;

public class SingleSnowProfileResource extends ServerResource {
	
	private DB db;
	
	public SingleSnowProfileResource(DB db) {
		this.db = db;
	}
	
	/**
	 * generates a Snow Profile by type (pdf, png, jpg,...)
	 * 
	 * @param type
	 * @return
	 */
	@SuppressWarnings("resource")
	public ByteArrayOutputStream generateSnowProfileDiagramm(String type) {
		ByteArrayOutputStream ret = new ByteArrayOutputStream();
		String jsonRawString = "";
		try {
			boolean pdfFlag = true;
			Context cx = Context.enter();
			Scriptable scope = cx.initStandardObjects();
			Reader script = new InputStreamReader(SingleSnowProfileResource.class.getResourceAsStream("/at/ac/dbisinformatik/snowprofile/web/resources/includeFunctions.js"));
			cx.evaluateReader(scope, script, "<cmd>", 1, null);
			Object func = scope.get("getJSON", scope);

			JSONObject jsObject = SchichtprofilDAO.getSingleSnowProfile(db, getRequestAttributes().get("id").toString());
			jsonRawString = jsObject.get("SnowProfile").toString();
			
			Object stringify = ((Scriptable) scope.get("JSON", scope)).get("stringify", scope);
			Object jsonParse = ((Scriptable) scope.get("JSON", scope)).get("parse", scope);
			Object jsonRawObject = ((Function) jsonParse).call(cx, scope, scope, new Object[] { jsonRawString });
			if (func instanceof Function) {
				Object funcArgs[] = new Object[] { jsonRawObject, pdfFlag };
				Object result = ((Function) func).call(cx, scope, scope, funcArgs);
				String jsonString = (String) ((Function) stringify).call(cx, scope, scope, new Object[] { result });
				JsonArray jsonObject = (JsonArray) new JsonParser().parse(jsonString);
				ret = SVGCreator.svgDocument(jsonObject, type, new JSONObject(jsonRawString).get("rid").toString());
			}
		} catch (IOException ioe) {
			ioe.printStackTrace();
		} catch (JavaScriptException jse) {
			jse.printStackTrace();
		} catch (TransformerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (URISyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (TranscoderException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			Context.exit();
		}
		return ret;
	}
	
	/**
	 * returns the PDF-Resource of Snow Profile Graph
	 * 
	 * @return
	 * @throws JSONException
	 * @throws SAXException
	 * @throws IOException
	 * @throws TransformerException
	 * @throws URISyntaxException
	 * @throws TranscoderException
	 */
	@Get("pdf")
	public OutputRepresentation getPDF() throws JSONException, SAXException, IOException, TransformerException, URISyntaxException, TranscoderException {
		return new OutputRepresentation(MediaType.APPLICATION_PDF) {
			@Override
			public void write(java.io.OutputStream outputStream) throws IOException {
				generateSnowProfileDiagramm("pdf").writeTo(outputStream);
			}
		};
	}
	
	/**
	 * returns the PNG-Resource of Snow Profile Graph
	 * 
	 * @return
	 * @throws JSONException
	 * @throws SAXException
	 * @throws IOException
	 * @throws TransformerException
	 * @throws URISyntaxException
	 * @throws TranscoderException
	 */
	@Get("png")
	public OutputRepresentation getPNG() throws JSONException, SAXException, IOException, TransformerException, URISyntaxException, TranscoderException {
		return new OutputRepresentation(MediaType.IMAGE_PNG) {
			@Override
			public void write(java.io.OutputStream outputStream) throws IOException {
				generateSnowProfileDiagramm("png").writeTo(outputStream);
			}
		};
	}
	
	/**
	 * returns the XML-Resource of Snow Profile in CAAML-Standard
	 * 
	 * @return
	 * @throws JSONException
	 * @throws SAXException
	 * @throws IOException
	 * @throws TransformerException
	 */
	@Get("xml")
	public String getXML() throws JSONException, SAXException, IOException, TransformerException {
		String fileName = getRequestAttributes().get("id").toString();
		fileName = "_"+fileName.replace(":", "_");
		
		Converter con = new Converter();
		return con.convert(XML.toString(SchichtprofilDAO.getSingleSnowProfile(db, getRequestAttributes().get("id").toString())), "internConverter.xsl");
	}
	
	/**
	 * returns the JSON-Resource of Snow Profile
	 * 
	 * @return
	 * @throws JSONException
	 * @throws IOException
	 */
	@Get("json")
	public String getJson() throws JSONException, IOException {
		return SchichtprofilDAO.getSingleSnowProfile(db, getRequestAttributes().get("id").toString()).toString();
	}
	
	/**
	 * deletes a single Snow Profile from Database
	 */
	@Delete
	protected Representation delete() {
		db.delete("SnowProfile", getRequestAttributes().get("id").toString());
		return new StringRepresentation("{\"success\": \"true\"}");
	}
	
	/**
	 * updates a Snow Profile
	 * 
	 * @param value
	 * @return
	 * @throws IOException
	 * @throws JSONException
	 */
	@Put
	public String updateJson(Representation value) throws IOException, JSONException {
		db.update(getRequestAttributes().get("id").toString(), new JSONObject(value.getText()));	
		return "{\"success\": \"true\"}";
	}
}

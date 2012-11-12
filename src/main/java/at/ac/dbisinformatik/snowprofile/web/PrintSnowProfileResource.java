package at.ac.dbisinformatik.snowprofile.web;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URISyntaxException;
import java.util.List;

import javax.xml.transform.TransformerException;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.Function;
import org.mozilla.javascript.JavaScriptException;
import org.mozilla.javascript.Scriptable;
import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;

import at.ac.dbisinformatik.snowprofile.data.DB;
import at.ac.dbisinformatik.snowprofile.web.svgcreator.SVGCreator;
import at.ac.dbisinformatik.snowprofile.web.svgcreator.Test;

import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import com.orientechnologies.orient.core.record.impl.ODocument;

public class PrintSnowProfileResource extends ServerResource {
	
	private DB db;
	
	public PrintSnowProfileResource(DB db) {
		setNegotiated(true);
		this.db = db;
	}

	@Get()
	public String getJson() throws JSONException, IOException, URISyntaxException {
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
			
			Object stringify = ((Scriptable) scope.get("JSON", scope)).get("stringify", scope);
			Object jsonParse = ((Scriptable) scope.get("JSON", scope)).get("parse", scope);
			Object jsonRawObject = ((Function) jsonParse).call(cx, scope, scope, new Object[] { jsonRawString });
			if (func instanceof Function) {
				Object funcArgs[] = new Object[] { jsonRawObject, pdfFlag };
				Object result = ((Function) func).call(cx, scope, scope,
						funcArgs);
				String jsonString = (String) ((Function) stringify).call(cx,
						scope, scope, new Object[] { result });
				JsonArray jsonObject = (JsonArray) new JsonParser()
						.parse(jsonString);
				SVGCreator.svgDocument(jsonObject);
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

		return "{\"success\": \"true\"}";
	}
}

package at.ac.dbisinformatik.snowprofile.web;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;

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

import at.ac.dbisinformatik.snowprofile.web.svgcreator.SVGCreator;
import at.ac.dbisinformatik.snowprofile.web.svgcreator.Test;

import com.google.gson.JsonArray;
import com.google.gson.JsonParser;

public class PrintSnowProfileResource extends ServerResource {

	@Get()
	public void getJson() throws JSONException, IOException {
		String content = "";
		if(getRequestAttributes().get("id").equals("2"))
			content = IOUtils.toString(new FileInputStream("C:/test2.xml"));
		else
			content = IOUtils.toString(new FileInputStream("C:/test.xml"));

		JSONObject snowprofile = XML.toJSONObject(content);
		
		snowprofile = new JSONObject(JSONHelpers.flatten("stratProfile", snowprofile));
		
		String jsonRawString = snowprofile.toString();
		jsonRawString = jsonRawString.replace("caaml:", "");
		jsonRawString = jsonRawString.replace("gml:", "");
		jsonRawString = jsonRawString.replace("xmlns:", "xmlns_");
		jsonRawString = jsonRawString.replace("xsi:", "xsi_");
		
		try {
			boolean pdfFlag = true;
            Context cx = Context.enter();
            Scriptable scope = cx.initStandardObjects();  
            Reader script = new InputStreamReader(Test.class.getResourceAsStream("/at/ac/dbisinformatik/snowprofile/web/resources/includeFunctions.js"));
            cx.evaluateReader(scope, script,"<cmd>", 1, null);
            Object func = scope.get("getJSON", scope);
            
            jsonRawString = FileUtils.readFileToString(new File("c:\\json.json"));
            
            Object stringify = ((Scriptable) scope.get("JSON", scope)).get("stringify", scope);
            Object jsonParse = ((Scriptable) scope.get("JSON", scope)).get("parse", scope);
            Object jsonRawObject = ((Function)jsonParse).call(cx, scope, scope, new Object[] { jsonRawString });
            
            if (func instanceof Function) {
                Object funcArgs[] = new Object[] { jsonRawObject, pdfFlag };
                Object result = ((Function)func).call(cx, scope, scope, funcArgs);
                String jsonString = (String) ((Function)stringify).call(cx, scope, scope, new Object[] { result });
                JsonArray jsonObject = (JsonArray) new JsonParser().parse(jsonString);
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
	}
}

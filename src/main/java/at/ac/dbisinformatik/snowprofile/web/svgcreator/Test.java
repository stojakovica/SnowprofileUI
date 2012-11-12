package at.ac.dbisinformatik.snowprofile.web.svgcreator;

import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URISyntaxException;
import java.util.List;

import javax.xml.transform.TransformerException;

import org.apache.commons.io.FileUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.Function;
import org.mozilla.javascript.JavaScriptException;
import org.mozilla.javascript.Scriptable;

import at.ac.dbisinformatik.snowprofile.app.Configuration;
import at.ac.dbisinformatik.snowprofile.data.DB;

import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import com.orientechnologies.orient.core.db.document.ODatabaseDocumentTx;
import com.orientechnologies.orient.core.record.impl.ODocument;
import com.orientechnologies.orient.core.sql.query.OSQLSynchQuery;

/**
 * 
 */

/**
 * @author Robert Binna
 *
 */
public class Test {

	/**
	 * @param args
	 * @throws JSONException 
	 * @throws IOException 
	 * @throws URISyntaxException 
	 */
	public static void main(String[] args) throws JSONException, IOException, URISyntaxException {
//		JSONObject jsObject = new JSONObject(FileUtils.readFileToString(new File("c:\\snowprofileTemplate.json")));
//        System.out.println(jsObject.toString(2).replace("\"id\": \"\",\n", ""));
		
		try {
			boolean pdfFlag = true;
			String exportType = "pdf";
            Context cx = Context.enter();
            Scriptable scope = cx.initStandardObjects();  
            Reader script = new InputStreamReader(Test.class.getResourceAsStream("/at/ac/dbisinformatik/snowprofile/web/resources/includeFunctions.js"));
            cx.evaluateReader(scope, script,"<cmd>", 1, null);
            Object func = scope.get("getJSON", scope);
            
            JSONObject jsObject = null;
            DB tempDB = new DB(new Configuration());
            ODatabaseDocumentTx db = tempDB.getTransaction();
            List<ODocument> resultDB = db.query(new OSQLSynchQuery<ODocument>("select * from SnowProfile where @rid = #8:1"));
    		for (ODocument oDocument : resultDB) {
    			jsObject = new JSONObject("{\"SnowProfile\": "+oDocument.toJSON().toString()+"}");
    		}
    		db.close();
            String jsonRawString = jsObject.get("SnowProfile").toString();
            
            Object stringify = ((Scriptable) scope.get("JSON", scope)).get("stringify", scope);
            Object jsonParse = ((Scriptable) scope.get("JSON", scope)).get("parse", scope);
            Object jsonRawObject = ((Function)jsonParse).call(cx, scope, scope, new Object[] { jsonRawString });
            if (func instanceof Function) {
                Object funcArgs[] = new Object[] { jsonRawObject, pdfFlag };
                Object result = ((Function)func).call(cx, scope, scope, funcArgs);
                String jsonString = (String) ((Function)stringify).call(cx, scope, scope, new Object[] { result });
                JsonArray jsonObject = (JsonArray) new JsonParser().parse(jsonString);
                SVGCreator.svgDocument(jsonObject, exportType);
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
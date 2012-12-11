package at.ac.dbisinformatik.snowprofile.web.svgcreator;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

import org.apache.batik.transcoder.TranscoderException;
import org.json.JSONException;

import at.ac.dbisinformatik.snowprofile.app.Configuration;
import at.ac.dbisinformatik.snowprofile.data.DB;

import com.orientechnologies.orient.core.record.impl.ODocument;

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
	 * @throws TranscoderException 
	 */
	public static void main(String[] args) throws JSONException, IOException, URISyntaxException, TranscoderException {
		DB tempDB = new DB(new Configuration());
		List<ODocument> results = tempDB.querySQL("select * from SnowProfile");
		for (ODocument oDocument : results) {
			oDocument.delete();
		}
//		try {
//			boolean pdfFlag = true;
//			String exportType = "png";
//            Context cx = Context.enter();
//            Scriptable scope = cx.initStandardObjects();  
//            Reader script = new InputStreamReader(Test.class.getResourceAsStream("/at/ac/dbisinformatik/snowprofile/web/resources/includeFunctions.js"));
//            cx.evaluateReader(scope, script,"<cmd>", 1, null);
//            Object func = scope.get("getJSON", scope);
//            
//            JSONObject jsObject = null;
//            DB tempDB = new DB(new Configuration());
//            ODatabaseDocumentTx db = tempDB.getTransaction();
//            List<ODocument> resultDB = db.query(new OSQLSynchQuery<ODocument>("select * from SnowProfile where @rid = #8:0"));
//    		for (ODocument oDocument : resultDB) {
//    			jsObject = new JSONObject("{\"SnowProfile\": "+oDocument.toJSON().toString()+"}");
//    		}
//    		db.close();
//            String jsonRawString = jsObject.get("SnowProfile").toString();
//            
//            Object stringify = ((Scriptable) scope.get("JSON", scope)).get("stringify", scope);
//            Object jsonParse = ((Scriptable) scope.get("JSON", scope)).get("parse", scope);
//            Object jsonRawObject = ((Function)jsonParse).call(cx, scope, scope, new Object[] { jsonRawString });
//            if (func instanceof Function) {
//                Object funcArgs[] = new Object[] { jsonRawObject, pdfFlag };
//                Object result = ((Function)func).call(cx, scope, scope, funcArgs);
//                String jsonString = (String) ((Function)stringify).call(cx, scope, scope, new Object[] { result });
//                JsonArray jsonObject = (JsonArray) new JsonParser().parse(jsonString);
//                SVGCreator.svgDocument(jsonObject, exportType, new JSONObject(jsonRawString).get("rid").toString());
//            }
//        } catch (IOException ioe) {
//            ioe.printStackTrace();
//        } catch (JavaScriptException jse) {
//            jse.printStackTrace();
//        } catch (TransformerException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} finally {
//            Context.exit();
//        }

	}

}
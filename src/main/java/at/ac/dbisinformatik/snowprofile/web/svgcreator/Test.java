package at.ac.dbisinformatik.snowprofile.web.svgcreator;

/**
 * Copyright (c) 2012 Aleksandar Stojakovic
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * The Software shall be used for Good, not Evil.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

import org.apache.batik.transcoder.TranscoderException;
import org.json.JSONException;

import at.ac.dbisinformatik.snowprofile.app.Configuration;
import at.ac.dbisinformatik.snowprofile.data.DB;

import com.orientechnologies.orient.core.record.impl.ODocument;

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
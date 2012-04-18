package at.ac.dbisinformatik.snowprofile.web.svgcreator;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;

import javax.xml.transform.TransformerException;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.Function;
import org.mozilla.javascript.JavaScriptException;
import org.mozilla.javascript.Scriptable;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

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
	 */
	public static void main(String[] args) {
		try {
            Context cx = Context.enter();
            Scriptable scope = cx.initStandardObjects();  
            Reader script = new InputStreamReader(Test.class.getResourceAsStream("/at/ac/dbisinformatik/snowprofile/web/resources/data/svgcreator/test.js"));
            //Reader jsonScriptReader = new InputStreamReader(Test.class.getResourceAsStream("/json.js"));
            //cx.evaluateReader(scope, jsonScriptReader,"<cmd>", 1, null);
            cx.evaluateReader(scope, script,"<cmd>", 1, null);
            Object func = scope.get("getJSON", scope);
            Object stringify = ((Scriptable) scope.get("JSON", scope)).get("stringify", scope);
            if (func instanceof Function) {
                Object funcArgs[] = null;
                Object result = ((Function)func).call(cx, scope, scope, funcArgs);
                System.out.println(result.getClass().getName());
                System.out.println(result);
                String jsonString = (String) ((Function)stringify).call(cx, scope, scope, new Object[] { result });
                JsonObject jsonObject = (JsonObject) new JsonParser().parse(jsonString);
                SVGCreator.svgDocument(jsonObject);
                /*HashMap<String, String> mapParams = new HashMap<String, String>();

                if(obj != null) {
                    Object[] propIds = NativeObject.getPropertyIds(obj);
                    for(Object propId: propIds) {
                        String key = propId.toString();
                        String value = NativeObject.getProperty(obj, key).toString();
                        mapParams.put(key, value);
                    }
                }*/
                //work with mapParams next..
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
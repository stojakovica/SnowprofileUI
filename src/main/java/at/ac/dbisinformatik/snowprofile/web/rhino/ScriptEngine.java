/**
 * Copyright 2007 Dejan Bosanac
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package at.ac.dbisinformatik.snowprofile.web.rhino;

import java.io.FileReader;
import java.io.IOException;

import org.json.JSONException;
import org.json.JSONStringer;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.Function;
import org.mozilla.javascript.IdScriptableObject;
import org.mozilla.javascript.JavaScriptException;
import org.mozilla.javascript.NativeArray;
import org.mozilla.javascript.NativeJavaObject;
import org.mozilla.javascript.NativeObject;
import org.mozilla.javascript.Scriptable;

/**
 * 
 * Creates a SVG-Document of given JavaScript-Data from the Snow Profile Web Application
 *
 */
public class ScriptEngine {

	private static void nativeObjectToJSONString(NativeObject nativeObject,
			JSONStringer json) throws JSONException {
		json.object();

		Object[] ids = nativeObject.getIds();
		for (Object id : ids) {
			String key = id.toString();
			json.key(key);

			Object value = nativeObject.get(key, nativeObject);
			valueToJSONString(value, json);
		}

		json.endObject();
	}

	private static void valueToJSONString(Object value, JSONStringer json)
			throws JSONException {
		if (value instanceof IdScriptableObject
				&& ((IdScriptableObject) value).getClassName().equals("Date") == true) {
			// Get the UTC values of the date
			Object year = NativeObject.callMethod((IdScriptableObject) value,
					"getUTCFullYear", null);
			Object month = NativeObject.callMethod((IdScriptableObject) value,
					"getUTCMonth", null);
			Object date = NativeObject.callMethod((IdScriptableObject) value,
					"getUTCDate", null);
			Object hours = NativeObject.callMethod((IdScriptableObject) value,
					"getUTCHours", null);
			Object minutes = NativeObject.callMethod(
					(IdScriptableObject) value, "getUTCMinutes", null);
			Object seconds = NativeObject.callMethod(
					(IdScriptableObject) value, "getUTCSeconds", null);
			Object milliSeconds = NativeObject.callMethod(
					(IdScriptableObject) value, "getUTCMilliseconds", null);

			// Build the JSON object to represent the UTC date
			json.object().key("zone").value("UTC").key("year").value(year)
					.key("month").value(month).key("date").value(date)
					.key("hours").value(hours).key("minutes").value(minutes)
					.key("seconds").value(seconds).key("milliseconds")
					.value(milliSeconds).endObject();

		} else if (value instanceof NativeJavaObject) {
			Object javaValue = Context.jsToJava(value, Object.class);
			json.value(javaValue);
		} else if (value instanceof NativeArray) {
			// Output the native object
			nativeArrayToJSONString((NativeArray) value, json);
		} else if (value instanceof NativeObject) {
			// Output the native array
			nativeObjectToJSONString((NativeObject) value, json);
		} else {
			json.value(value);
		}
	}

	private static void nativeArrayToJSONString(NativeArray nativeArray,
			JSONStringer json) throws JSONException {
		Object[] propIds = nativeArray.getIds();
		if (isArray(propIds) == true) {
			json.array();

			for (int i = 0; i < propIds.length; i++) {
				Object propId = propIds[i];
				if (propId instanceof Integer) {
					Object value = nativeArray.get((Integer) propId,
							nativeArray);
					valueToJSONString(value, json);
				}
			}

			json.endArray();
		} else {
			json.object();

			for (Object propId : propIds) {
				Object value = nativeArray.get(propId.toString(), nativeArray);
				json.key(propId.toString());
				valueToJSONString(value, json);
			}

			json.endObject();
		}
	}

	private static boolean isArray(Object[] ids) {
		boolean result = true;
		for (Object id : ids) {
			if (id instanceof Integer == false) {
				result = false;
				break;
			}
		}
		return result;
	}

	public static void main(String[] args) throws JSONException {
		try {
			Context cx = Context.enter();
			Scriptable scope = cx.initStandardObjects();
			FileReader script = new FileReader(
					"src/main/resources/at/ac/dbisinformatik/snowprofile/web/resources/includeFunctions.js");
			cx.evaluateReader(scope, script, "<cmd>", 1, null);
			Object func = scope.get("drawGraphJSON", scope);
			if (func instanceof Function) {
				Object funcArgs[] = null;
				// Object result = ((Function)func).call(cx, scope, scope,
				// funcArgs);
				JSONStringer json = new JSONStringer();
				nativeObjectToJSONString((NativeObject) ((Function) func).call(cx,
						scope, scope, funcArgs), json);
				System.out.println(json.toString());
			}
		} catch (IOException ioe) {
			ioe.printStackTrace();
		} catch (JavaScriptException jse) {
			jse.printStackTrace();
		} finally {
			Context.exit();
		}
	}
}

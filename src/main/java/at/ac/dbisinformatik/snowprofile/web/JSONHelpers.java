package at.ac.dbisinformatik.snowprofile.web;

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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * 
 * JSONHelpers contains methods for parsing JSON, converting in Map and flatten hierarchical data of a JSON-Document
 *
 */
public class JSONHelpers {
	private static ArrayList<String> globalKeys = new ArrayList<String>();
	
	/**
	 * converts a JSONObject to Map to a given key
	 * 
	 * @param key - will be written in front of the flattened JSON-Data - default: null
	 * @param obj - JSONObject
	 * @return a Map with JSON-Data
	 * @throws JSONException
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, Object> jsonToMap(final String key, final Object obj) throws JSONException {
		if (obj instanceof JSONObject) {
			final HashMap<String, Object> values = new HashMap<String, Object>();
			final JSONObject jsonObj = (JSONObject) obj;
			final Iterator<String> it = jsonObj.keys();
			while (it.hasNext()) {
				final String innerKey = it.next();
				Object tempJsonObj = jsonObj.get(innerKey);
				if(tempJsonObj instanceof String) {
					values.put(innerKey, tempJsonObj);
				}
				else {
					values.put(innerKey, jsonToMap(innerKey, jsonObj.get(innerKey)));
				}
			}
			return values;
		} else if (obj instanceof JSONArray) {
			final JSONArray ary = (JSONArray)obj;
			final LinkedList<Object> values = new LinkedList<Object>();
			for (int i = 0; i < ary.length(); i++)
				values.add(jsonToMap(null, ary.get(i)));
			final HashMap<String, Object> m = new HashMap<String, Object>();
			m.put(key, values);
			return m;
		} else {
			final HashMap<String, Object> m = new HashMap<String, Object>();
			m.put(key, obj);
			return m;
		}
	}
	
	/**
	 * flats a Subnode (key) of a given JSON-Document
	 * 
	 * @param key - will be written in front of the flattened JSON-Data - default: null
	 * @param obj - the JSONObject
	 * @return Map with given JSON-Data
	 * @throws JSONException
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, Object> flatSubNode(final String key, final Object obj) throws JSONException {
		if (obj instanceof JSONObject) {
			final HashMap<String, Object> values = new HashMap<String, Object>();
			final JSONObject jsonObj = (JSONObject)obj;
			final Iterator<String> it = jsonObj.keys();
			while (it.hasNext()) {
				final String innerKey = it.next();
				if(innerKey.equals("Layer") || innerKey.equals("Obs") || innerKey.equals("ComprTest") || innerKey.equals("ExtColumnTest") || innerKey.equals("RBlockTest")) {
					values.putAll(flatSubNode(innerKey, jsonObj.get(innerKey)));
				}
				else
					values.putAll(flatSubNode(key != null ? (key + "_" + innerKey) : innerKey, jsonObj.get(innerKey)));
			}
			return values;
		} else if (obj instanceof JSONArray) {
			final JSONArray ary = (JSONArray)obj;
			final LinkedList<Object> values = new LinkedList<Object>();
			for (int i = 0; i < ary.length(); i++)
				values.add(flatSubNode(null, ary.get(i)));
			final HashMap<String, Object> m = new HashMap<String, Object>();
			m.put(key, values);
			return m;
		} else {
			final HashMap<String, Object> m = new HashMap<String, Object>();
			m.put(key, obj);
			return m;
		}
	}
	
	/**
	 * main method for flattening a JSON-Document with a key which will be written before the flattened Subnode
	 * 
	 * @param compareKey - name of the Subnode
	 * @param key - will be written in front of the flattened JSON-Data - default: null
	 * @param obj - the given JSON-Document
	 * @return
	 * @throws JSONException
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, Object> flatten(final String compareKey, final String key, final Object obj) throws JSONException {
		if (obj instanceof JSONObject) {
			final HashMap<String, Object> values = new HashMap<String, Object>();
			final JSONObject jsonObj = (JSONObject)obj;
			final Iterator<String> it = jsonObj.keys();
			while (it.hasNext()) {
				final String innerKey = it.next();
				Object tempJsonObj = jsonObj.get(innerKey);
				if(tempJsonObj instanceof JSONArray) {
					values.putAll(flatten(compareKey, innerKey, tempJsonObj));
				}
				else if(tempJsonObj instanceof String) {
					values.put(innerKey, tempJsonObj);
				}
				else {
					if(innerKey.equals(compareKey)) {
						values.put(innerKey, flatSubNode(compareKey, jsonObj.get(innerKey)));
					}
					else {
						values.put(innerKey, flatten(compareKey, innerKey, jsonObj.get(innerKey)));
					}
				}
			}
			return values;
		} else if (obj instanceof JSONArray) {
			final JSONArray ary = (JSONArray)obj;
			final LinkedList<Object> values = new LinkedList<Object>();
			for (int i = 0; i < ary.length(); i++)
				values.add(flatten(compareKey, null, ary.get(i)));
			final HashMap<String, Object> m = new HashMap<String, Object>();
			m.put(key, values);
			return m;
		} else {
			final HashMap<String, Object> m = new HashMap<String, Object>();
			m.put(key, obj);
			return m;
		}
	}
	
	/**
	 * main method for flattening a JSON-Document
	 * 
	 * @param compareKey
	 * @param obj
	 * @return
	 * @throws JSONException
	 */
	public static Map<String, Object> flatten(final String compareKey, final Object obj) throws JSONException {
		return flatten(compareKey, null, obj);
	}
	
	/**
	 * helper-method for unflattening the JSON-Document
	 * 
	 * @param originalKey
	 * @param string
	 * @param obj
	 * @return
	 * @throws JSONException
	 */
	public static Map<String, Object> splitAndUnflat(final String originalKey, final String string, final Object obj) throws JSONException {
		if(string != null)
			globalKeys.add(string);
		final HashMap<String, Object> values = new HashMap<String, Object>();
		final JSONObject jsonObj = (JSONObject) obj;
		if(string.indexOf('_') > 0) {
			String[] subKeys = string.split("_", 2);
			values.put(subKeys[0], splitAndUnflat(originalKey, subKeys[1], jsonObj));
		}
		else {
			Object tempJsonObj = jsonObj.get(originalKey);
			values.put(string, tempJsonObj);
		}
		return values;
	}
	
	/**
	 * main method to unflatten a JSON-Document to a given key (name of the Subnode)
	 * 
	 * @param key
	 * @param obj
	 * @return
	 * @throws JSONException
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, Object> unflatten(final String key, final Object obj) throws JSONException {
		if (obj instanceof JSONObject) {
			final HashMap<String, Object> values = new HashMap<String, Object>();
			final JSONObject jsonObj = (JSONObject) obj;
			final Iterator<String> it = jsonObj.keys();
			while (it.hasNext()) {
				final String innerKey = it.next();
				Object tempJsonObj = jsonObj.get(innerKey);
				if(innerKey.indexOf('_') > 0) {
					values.putAll(splitAndUnflat(innerKey, innerKey, jsonObj));
				}
				else {
					if(tempJsonObj instanceof JSONArray) {
						values.putAll(unflatten(innerKey, tempJsonObj));
					}
					else if(tempJsonObj instanceof String) {
						values.put(innerKey, tempJsonObj);
					}
					else {
						values.put(innerKey, unflatten(innerKey, jsonObj.get(innerKey)));
					}
				}
			}
			return values;
		} else if (obj instanceof JSONArray) {
			final JSONArray ary = (JSONArray)obj;
			final LinkedList<Object> values = new LinkedList<Object>();
			for (int i = 0; i < ary.length(); i++)
				values.add(unflatten(key, ary.get(i)));
			final HashMap<String, Object> m = new HashMap<String, Object>();
			m.put(key, values);
			return m;
		} else {
			final HashMap<String, Object> m = new HashMap<String, Object>();
			m.put(key, obj);
			return m;
		}
	}

	/**
	 * main method for unflattening all snow profile relevant JSON-Documents which are flattened before.
	 * 
	 * @param obj
	 * @return
	 * @throws JSONException
	 */
	public static Map<String, Object> unflatten(final Object obj) throws JSONException {
		return unflatten(null, obj);
	}
}
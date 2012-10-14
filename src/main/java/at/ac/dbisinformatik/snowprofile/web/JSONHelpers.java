package at.ac.dbisinformatik.snowprofile.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class JSONHelpers {
	private static ArrayList<String> globalKeys = new ArrayList<String>();
	
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
	
	public static Map<String, Object> flatten(final String compareKey, final Object obj) throws JSONException {
		return flatten(compareKey, null, obj);
	}
	
	
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

	public static Map<String, Object> unflatten(final Object obj) throws JSONException {
		return unflatten(null, obj);
	}
}
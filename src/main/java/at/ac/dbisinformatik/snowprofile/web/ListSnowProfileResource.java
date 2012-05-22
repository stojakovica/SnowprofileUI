package at.ac.dbisinformatik.snowprofile.web;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.Put;
import org.restlet.resource.ServerResource;

public class ListSnowProfileResource extends ServerResource {

	public ListSnowProfileResource() {
		setNegotiated(true);
	}

	@Get()
	public String getJson() throws JSONException {
		JSONObject json1 = new JSONObject();
		json1.append("vonHoehe", new Float(95.0));
		json1.append("bisHoehe", new Float(92.0));
		json1.append("kornform", "3-3-3");
		json1.append("groesse", "0,5-0,5");
		json1.append("haerte", "3-4");
		json1.append("feuchte", "1");
		
		JSONObject json2 = new JSONObject();
		json2.append("vonHoehe", new Float(92.0));
		json2.append("bisHoehe", new Float(80.0));
		json2.append("kornform", "2-2-2");
		json2.append("groesse", "1,0-1,0");
		json2.append("haerte", "3-4");
		json2.append("feuchte", "1");
		
		JSONObject json3 = new JSONObject();
		json3.append("vonHoehe", new Float(80.0));
		json3.append("bisHoehe", new Float(77.0));
		json3.append("kornform", "6-6-6");
		json3.append("groesse", "1,0-2,0");
		json3.append("haerte", "4-5");
		json3.append("feuchte", "1");
		
		JSONObject json4 = new JSONObject();
		json4.append("vonHoehe", new Float(77.0));
		json4.append("bisHoehe", new Float(27.0));
		json4.append("kornform", "4-4-4");
		json4.append("groesse", "1,0-1,0");
		json4.append("haerte", "2-2");
		json4.append("feuchte", "1");
			
		JSONObject json5 = new JSONObject();
		json5.append("vonHoehe", new Float(27.0));
		json5.append("bisHoehe", new Float(25.0));
		json5.append("kornform", "4-4-4");
		json5.append("groesse", "1,5-1,5");
		json5.append("haerte", "1-1");
		json5.append("feuchte", "1");
		
		JSONObject json6 = new JSONObject();
		json6.append("vonHoehe", new Float(25.0));
		json6.append("bisHoehe", new Float(2.0));
		json6.append("kornform", "6-4-4");
		json6.append("groesse", "2,0-2,0");
		json6.append("haerte", "2-2");
		json6.append("feuchte", "1");
		
		JSONObject json7 = new JSONObject();
		json7.append("vonHoehe", new Float(2.0));
		json7.append("bisHoehe", new Float(0.0));
		json7.append("kornform", "6-6-6");
		json7.append("groesse", "2,0-2,0");
		json7.append("haerte", "2-3");
		json7.append("feuchte", "2");
		
		JSONArray json = new JSONArray();
		json.put(json1);
		json.put(json2);
		json.put(json3);
		json.put(json4);
		json.put(json5);
		json.put(json6);
		json.put(json7);
		
		return json.toString();
	}

	@Put
	public String updateJson(String value) {
		return value;
	}
	
	@Post
	public void storeJson(String value) {
		System.out.println("JSON stored!");
	}
}

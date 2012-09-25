package at.ac.dbisinformatik.snowprofile.web;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Scanner;

import org.apache.commons.io.IOUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;
import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.Put;
import org.restlet.resource.ServerResource;

public class ListSnowProfileResource extends ServerResource {

	public ListSnowProfileResource() {
		setNegotiated(true);
	}
	
	@Get()
	public String getJson() throws JSONException, IOException {
//		String content = IOUtils.toString(new FileInputStream("C:/test.xml"));
//
//		JSONObject snowprofile = XML.toJSONObject(content);
//		
//		snowprofile = new JSONObject(JSONHelpers.flatten("stratProfile", snowprofile));
//		
//		String returnProfile = snowprofile.toString();
//		returnProfile = returnProfile.replace("caaml:", "");
//		returnProfile = returnProfile.replace("gml:", "");
//		returnProfile = returnProfile.replace("xmlns:", "xmlns_");
//		returnProfile = returnProfile.replace("xsi:", "xsi_");
//		
//		return returnProfile;
		return "{}";
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

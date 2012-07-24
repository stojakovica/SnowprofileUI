package at.ac.dbisinformatik.snowprofile.web;

import java.io.File;
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
	
	public static String readFile(String file) throws IOException {
		StringBuilder text = new StringBuilder();
		String NL = System.getProperty("line.separator");
		Scanner scanner = new Scanner(new FileInputStream(file));
		try {
			while (scanner.hasNextLine()) {
				text.append(scanner.nextLine() + NL);
			}
		} finally {
			scanner.close();
		}
		
		return text.toString();
	}

	@Get()
	public String getJson() throws JSONException, IOException {
		//String content = IOUtils.toString(getClass().getResourceAsStream("/at/ac/dbisinformatik/snowprofile/dataconverter/testoutputs/test.xml"));
		String content = IOUtils.toString(new FileInputStream("/Users/rbinna/VCS/snowprofile/trunk/code/src/main/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testoutputs/test.xml"));
		//String file = readFile("C:/test.xml");
		JSONObject snowprofile = XML.toJSONObject(content);
		
		String returnProfile = snowprofile.toString();
		returnProfile = returnProfile.replace("caaml:", "");
		returnProfile = returnProfile.replace("gml:", "");
		returnProfile = returnProfile.replace("xmlns:", "xmlns_");
		returnProfile = returnProfile.replace("xsi:", "xsi_");
		
		return returnProfile;
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

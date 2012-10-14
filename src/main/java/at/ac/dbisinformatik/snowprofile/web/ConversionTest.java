package at.ac.dbisinformatik.snowprofile.web;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;

public class ConversionTest {

	/**
	 * @param args
	 * @throws IOException 
	 * @throws JSONException 
	 */
	public static void main(String[] args) throws JSONException, IOException {
		// TODO Auto-generated method stub
		String content = IOUtils.toString(new FileInputStream("C:/StabilityTestResults.xml"));
		JSONObject snowprofile = XML.toJSONObject(content);
		
		JSONObject snowprofile2 = new JSONObject(JSONHelpers.flatten("stbTests", snowprofile));
		JSONObject snowprofile3 = new JSONObject(JSONHelpers.flatten("stratProfile", new JSONObject(snowprofile2.toString())));
		System.out.println(snowprofile3.toString(4));
		
		String returnProfile = snowprofile.toString();
		returnProfile = returnProfile.replace("caaml:", "");
		returnProfile = returnProfile.replace("gml:", "");
		returnProfile = returnProfile.replace("xmlns:", "xmlns_");
		returnProfile = returnProfile.replace("xsi:", "xsi_");
	}

}

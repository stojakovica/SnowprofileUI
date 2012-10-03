package at.ac.dbisinformatik.snowprofile.web;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Iterator;

import org.apache.commons.io.IOUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;
import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.Put;
import org.restlet.resource.ServerResource;

import com.orientechnologies.orient.core.db.document.ODatabaseDocumentTx;
import com.orientechnologies.orient.core.record.impl.ODocument;

public class ListSnowProfileResource extends ServerResource {

	public ListSnowProfileResource() {
		setNegotiated(true);
	}
	
	@Get()
	public String getJson() throws JSONException, IOException {
		JSONObject snowprofile1 = XML.toJSONObject(IOUtils.toString(new FileInputStream("C:/test.xml")));
		JSONObject snowprofile2 = XML.toJSONObject(IOUtils.toString(new FileInputStream("C:/test2.xml")));
		
		snowprofile1 = new JSONObject(JSONHelpers.flatten("stratProfile", snowprofile1));
		snowprofile2 = new JSONObject(JSONHelpers.flatten("stratProfile", snowprofile2));
		
		JSONArray returnList = new JSONArray();
		returnList.put(snowprofile1.get("SnowProfile"));
		returnList.put(snowprofile2.get("SnowProfile"));
		
		String returnProfiles = returnList.toString();
		returnProfiles = returnProfiles.replace("caaml:", "");
		returnProfiles = returnProfiles.replace("gml:", "");
		returnProfiles = returnProfiles.replace("xmlns:", "xmlns_");
		returnProfiles = returnProfiles.replace("xsi:", "xsi_");
		
		return "{SnowprofileList: "+returnProfiles+"}";
	}

	@Put
	public String updateJson(String value) {
		return value;
	}
	
	@Post
	public void storeJson(String value) {
		ODatabaseDocumentTx db = new ODatabaseDocumentTx("local:C:/Users/Administrator/Uni/Bachelor/OrientDB/databases/test/test").open("admin", "admin");

		// CREATE A NEW DOCUMENT AND FILL IT
		ODocument doc = new ODocument(db, "Person");
		doc.field( "name", "Aleks" );
		doc.field( "surname", "Stocheck" );
		doc.field( "city", new ODocument(db, "City").field("name","Rome").field("country", "Italy") );
		              
		// SAVE THE DOCUMENT
		doc.save();

		db.close();
	}
}

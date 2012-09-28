package at.ac.dbisinformatik.snowprofile.web;

import java.io.IOException;
import org.json.JSONException;
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

package at.ac.dbisinformatik.snowprofile.web;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.Put;
import org.restlet.resource.ServerResource;

import com.orientechnologies.orient.core.db.document.ODatabaseDocumentTx;
import com.orientechnologies.orient.core.record.impl.ODocument;
import com.orientechnologies.orient.core.sql.query.OSQLSynchQuery;

public class ListSnowProfileResource extends ServerResource {

	public ListSnowProfileResource() {
		setNegotiated(true);
	}
	
	@Get()
	public String getJson() throws JSONException, IOException {
		JSONArray returnList = new JSONArray();
		ODatabaseDocumentTx db = new ODatabaseDocumentTx("local:C:/Users/Administrator/Uni/Bachelor/OrientDB/orientdb110/databases/test/snowprofile").open("admin", "admin");
		
		List<ODocument> result = db.query(new OSQLSynchQuery<ODocument>("select * from SnowProfile"));
		
		for (ODocument oDocument : result) {
			Map<?,?> sub = oDocument.field("SnowProfile");
			returnList.put(sub);
		}
		
		return "{SnowprofileList: "+returnList.toString()+"}";
	}

	@Put
	public String updateJson(String value) {
		return value;
	}
	
	@Post
	public void storeJson(String value) {
		
	}
}

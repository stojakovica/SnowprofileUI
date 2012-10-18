package at.ac.dbisinformatik.snowprofile.web;

import java.io.IOException;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.resource.Delete;
import org.restlet.resource.Get;
import org.restlet.resource.Put;
import org.restlet.resource.ServerResource;

import at.ac.dbisinformatik.snowprofile.data.DB;

import com.orientechnologies.orient.core.db.document.ODatabaseDocumentTx;
import com.orientechnologies.orient.core.record.impl.ODocument;
import com.orientechnologies.orient.core.sql.query.OSQLSynchQuery;

public class SingleSnowProfileResource extends ServerResource {
	
	private DB db;
	
	public SingleSnowProfileResource(DB db) {
		this.db = db;
	}
	
	@Get()
	public String getJson() throws JSONException, IOException {
		JSONObject returnProfile = null;
		//TODO move to ScichtprofilDAO...
		List<ODocument> result = db.querySQL("select * from SnowProfile where @rid = #"+getRequestAttributes().get("id"));
			
		for (ODocument oDocument : result) {
			returnProfile = new JSONObject("{\"SnowProfile\": "+oDocument.toJSON().toString()+"}");
		}
		
		returnProfile = new JSONObject(JSONHelpers.flatten("stratProfile", returnProfile));
		String returnProfileString = returnProfile.toString();
		returnProfileString = returnProfileString.replace("\"rid\"", "\"rid_old\"");
		returnProfileString = returnProfileString.replace("@", "");
		returnProfileString = returnProfileString.replace("null", "\"\"");
		returnProfileString = returnProfileString.replace("\"id\":\"\",", "");
		returnProfileString = returnProfileString.replace("\"id\":{\"id\":\"\"},", "");
		
		return returnProfileString;
	}
	
	@Delete
	protected Representation delete() {
		db.delete("SnowProfile", getRequestAttributes().get("id").toString());
		return new StringRepresentation("{\"success\": \"true\"}");
	}
	
	@Put
	public String updateJson(Representation value) throws IOException, JSONException {
		db.update(getRequestAttributes().get("id").toString(), new JSONObject(value.getText()));	
		return "{\"success\": \"true\"}";
	}
}

package at.ac.dbisinformatik.snowprofile.web;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.resource.Delete;
import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;

import at.ac.dbisinformatik.snowprofile.data.DB;

import com.orientechnologies.orient.core.record.impl.ODocument;

public class ListSnowProfileResource extends ServerResource {

	private DB db;

	public ListSnowProfileResource(DB db) {
		setNegotiated(true);
		this.db = db;
	}

	@Get()
	public String getJson() throws JSONException, IOException {
		final JSONArray returnList = new JSONArray();

		List<ODocument> results = db.querySQL("select * from SnowProfile");
		for (ODocument oDocument : results) {
			JSONObject temp = new JSONObject(oDocument.toJSON());
			Map<String, Object> idMap = (Map<String, Object>) JSONHelpers
					.jsonToMap("SnowProfile", temp);
			idMap.put("rid", (String) temp.get("@rid").toString().substring(1));
			returnList.put(idMap);
		}

		return "{SnowprofileList: " + returnList.toString() + "}";
	}

	@Post
	public String storeJson(Representation value) throws IOException, JSONException {
		System.out.println(value);
		return db.store("SnowProfile", new JSONObject(value.getText()));
	}

	@Delete
	protected Representation delete() {
		return new StringRepresentation("{\"success\": \"true\"}");
	}
}

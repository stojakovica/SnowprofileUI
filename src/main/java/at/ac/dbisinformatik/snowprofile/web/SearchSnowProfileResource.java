package at.ac.dbisinformatik.snowprofile.web;

import java.io.IOException;
import java.text.ParseException;

import org.json.JSONException;
import org.json.JSONObject;
import org.restlet.representation.Representation;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;

import at.ac.dbisinformatik.snowprofile.data.DB;
import at.ac.dbisinformatik.snowprofile.data.SchichtprofilDAO;

public class SearchSnowProfileResource extends ServerResource {
	
	private DB db;

	public SearchSnowProfileResource(DB db) {
		setNegotiated(true);
		this.db = db;
	}
	
	/**
	 * returns a list of all Snow Profiles filtered by search values
	 * 
	 * @param value
	 * @return
	 * @throws JSONException
	 * @throws IOException
	 * @throws ParseException
	 */
	@Post()
	public String getJsonPost(Representation value) throws JSONException, IOException, ParseException {
		return "{SnowprofileList: " + SchichtprofilDAO.getSnowProfilesBySearch(db, new JSONObject(value.getText())).toString() + "}";
	}
}

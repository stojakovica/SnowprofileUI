package at.ac.dbisinformatik.snowprofile.web;

import java.io.IOException;
import java.util.List;
import org.json.JSONException;
import org.json.JSONObject;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.representation.Variant;
import org.restlet.resource.Delete;
import org.restlet.resource.Get;
import org.restlet.resource.Put;
import org.restlet.resource.ResourceException;
import org.restlet.resource.ServerResource;

import com.orientechnologies.orient.core.db.document.ODatabaseDocumentTx;
import com.orientechnologies.orient.core.id.ORID;
import com.orientechnologies.orient.core.id.ORecordId;
import com.orientechnologies.orient.core.record.impl.ODocument;
import com.orientechnologies.orient.core.sql.query.OSQLSynchQuery;

import at.ac.dbisinformatik.snowprofile.data.DAORegistry;
import at.ac.dbisinformatik.snowprofile.data.UserDAO;

public class SingleSnowProfileResource extends ServerResource {
	
	private UserDAO userDao = DAORegistry.USER_DAO;

	@Get()
	public String getJson() throws JSONException, IOException {
		JSONObject returnProfile = null;
		ODatabaseDocumentTx db = new ODatabaseDocumentTx("local:"+getClass().getResource("/at/ac/dbisinformatik/snowprofile/web/db/").toString().substring(6)).open("admin", "admin");
//		ODatabaseDocumentTx db = new ODatabaseDocumentTx("local:C:/Users/Administrator/Uni/Bachelor/OrientDB/orientdb110/databases/test/snowprofile").open("admin", "admin");
		List<ODocument> result = db.query(new OSQLSynchQuery<ODocument>("select * from SnowProfile where @rid = #"+getRequestAttributes().get("id")));
		for (ODocument oDocument : result) {
			returnProfile = new JSONObject("{\"SnowProfile\": "+oDocument.toJSON().toString()+"}");
		}
		db.close();
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
//		ODatabaseDocumentTx db = new ODatabaseDocumentTx("local:C:/Users/Administrator/Uni/Bachelor/OrientDB/orientdb110/databases/test/snowprofile").open("admin", "admin");
		ODatabaseDocumentTx db = new ODatabaseDocumentTx("local:"+getClass().getResource("/at/ac/dbisinformatik/snowprofile/web/db/").toString().substring(6)).open("admin", "admin");
		List<ODocument> result = db.query(new OSQLSynchQuery<ODocument>("select from SnowProfile where @rid = #"+getRequestAttributes().get("id")));
		for (ODocument oDocument : result) {
			db.delete(oDocument);
		}
		db.close();
		return new StringRepresentation("{\"success\": \"true\"}");
	}
	
	@Put
	public String updateJson(Representation value) throws IOException, JSONException {
//		ODatabaseDocumentTx db = new ODatabaseDocumentTx("local:C:/Users/Administrator/Uni/Bachelor/OrientDB/orientdb110/databases/test/snowprofile").open("admin", "admin");
		ODatabaseDocumentTx db = new ODatabaseDocumentTx("local:"+getClass().getResource("/at/ac/dbisinformatik/snowprofile/web/db/").toString().substring(6)).open("admin", "admin");
		ORID rid = new ORecordId(getRequestAttributes().get("id").toString());
		ODocument doc = new ODocument(rid);
		doc.fromJSON(new JSONObject(value.getText()).toString());
		doc.save();
		db.close();
		return "{\"success\": \"true\"}";
	}
	
	public void setUserDao(UserDAO userDao) {
		this.userDao = userDao;
	}
}

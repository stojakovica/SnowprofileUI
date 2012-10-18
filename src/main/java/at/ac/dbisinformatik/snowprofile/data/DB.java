package at.ac.dbisinformatik.snowprofile.data;

import java.util.List;

import org.json.JSONObject;

import at.ac.dbisinformatik.snowprofile.app.ApplicationVariables;
import at.ac.dbisinformatik.snowprofile.app.Configuration;

import com.orientechnologies.orient.core.command.OCommandRequest;
import com.orientechnologies.orient.core.db.document.ODatabaseDocumentTx;
import com.orientechnologies.orient.core.id.ORID;
import com.orientechnologies.orient.core.id.ORecordId;
import com.orientechnologies.orient.core.record.impl.ODocument;
import com.orientechnologies.orient.core.sql.OCommandSQL;
import com.orientechnologies.orient.core.sql.query.OSQLSynchQuery;

public class DB {

	private Configuration configuration;

	public DB(Configuration configuration) {
		this.configuration = configuration;
		
		initDatabase();
	}
	
	public void initDatabase() {
		ODatabaseDocumentTx transaction = getTransaction();
		
		if(transaction.getMetadata().getSchema().getClass("SnowProfile") == null) {
			transaction.command(new OCommandSQL("CREATE CLASS SnowProfile"));
		}
		transaction.close();
	}
	
	public ODatabaseDocumentTx getTransaction() {
		ODatabaseDocumentTx db = new ODatabaseDocumentTx("local:"+ ApplicationVariables.DB_LOCATION.getAbsolutePath());
		if(!ApplicationVariables.DB_LOCATION.isDirectory()) {
			db.create();
		} 
		db.open(configuration.getValue("db.username"), configuration.getValue("db.password"));
		return db;
	}
	
	public void command(OCommandRequest command) {
		ODatabaseDocumentTx transaction = getTransaction();
		transaction.command(command).execute();
		transaction.close(); //TODO add clean error handling
	}

	public List<ODocument> querySQL(String query, DBResultCallback dbResultCallback) {
		ODatabaseDocumentTx db = getTransaction();
		List<ODocument> results = db.query(new OSQLSynchQuery<ODocument>(query));
		dbResultCallback.process(results);
		db.close();
		return results;
	}
	
	public String store(String dbClass, JSONObject object) {
		String jsonString = object.toString();
		jsonString = jsonString.replace("null", "\"\"");
		ODatabaseDocumentTx db = getTransaction();
		ODocument doc = new ODocument("SnowProfile");
		doc.fromJSON(jsonString);
		doc.save();
		ORID rid = doc.getIdentity();
		db.close();
		return rid.toString().substring(1);
	}

	public void delete(String className, String id) {
		ODatabaseDocumentTx db = getTransaction();
		List<ODocument> result = db.query(new OSQLSynchQuery<ODocument>("select from " + className + " where @rid = #"+id));
		for (ODocument oDocument : result) {
			db.delete(oDocument);
		}
		db.close();
		
	}

	public void update(String id, JSONObject jsonObject) {
		ODatabaseDocumentTx db = getTransaction();
		ORID rid = new ORecordId(id);
		ODocument doc = new ODocument(rid);
		doc.fromJSON(jsonObject.toString());
		doc.save();
		db.close();
	}
}

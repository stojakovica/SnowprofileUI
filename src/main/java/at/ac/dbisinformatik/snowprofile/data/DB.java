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
	private ThreadLocal<ODatabaseDocumentTx> currentTransaction = new ThreadLocal<ODatabaseDocumentTx>();

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
	
	public ODatabaseDocumentTx getDB() {
		if(currentTransaction.get() == null) {
			currentTransaction.set(getTransaction());
		}
		return currentTransaction.get();
	}
	
	public void close() {
		if(currentTransaction.get() != null) {
			currentTransaction.get().close();
			currentTransaction.set(null);
		}
	}
	
	public void command(OCommandRequest command) {
		getDB().command(command).execute();
	}

	public List<ODocument> querySQL(String query) {
		return getDB().query(new OSQLSynchQuery<ODocument>(query));
	}
	
	public String store(String dbClass, JSONObject object) {
		String jsonString = object.toString();
		jsonString = jsonString.replace("null", "\"\"");
		getDB();
		ODocument doc = new ODocument("SnowProfile");
		doc.fromJSON(jsonString);
		doc.save();
		ORID rid = doc.getIdentity();
		return rid.toString().substring(1);
	}

	public void delete(String className, String id) {
		ODatabaseDocumentTx db = getDB();
		List<ODocument> result = db.query(new OSQLSynchQuery<ODocument>("select from " + className + " where @rid = #"+id));
		for (ODocument oDocument : result) {
			db.delete(oDocument);
		}
		
	}

	public void update(String id, JSONObject jsonObject) {
		ODatabaseDocumentTx db = getDB();
		ORID rid = new ORecordId(id);
		ODocument doc = new ODocument(rid);
		doc.fromJSON(jsonObject.toString());
		doc.save();
	}
}

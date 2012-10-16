package at.ac.dbisinformatik.snowprofile.web;

import org.restlet.Component;
import org.restlet.data.Protocol;

import com.orientechnologies.orient.core.db.document.ODatabaseDocumentTx;
import com.orientechnologies.orient.core.exception.ODatabaseException;
import com.orientechnologies.orient.core.exception.OStorageException;
import com.orientechnologies.orient.core.sql.OCommandSQL;

public class ServerMain {

	/**
	 * @param args
	 */
	public static void main(String[] args) throws Exception {
		// Create Database
		try {
			ODatabaseDocumentTx db = new ODatabaseDocumentTx("local:"+ServerMain.class.getResource("/at/ac/dbisinformatik/snowprofile/web/db").toString().substring(6)).create();
			db.command(new OCommandSQL("CREATE CLASS SnowProfile")).execute();
			db.close();
			// Create a new Component.  
			Component component = new Component();  
			
			// Add a new HTTP server listening on port 8080.  
			component.getServers().add(Protocol.HTTP, 8080);  
			
			//Define CLAP-Protokoll
			component.getClients().add(Protocol.CLAP);
			component.getClients().add(Protocol.FILE);
			
			// Attach the sample application.  
			component.getDefaultHost().attach("/lwd", new SnowProfileApplikation() );  
			//server.getContext().getParameters().add("useForwardedForHeader", "true");
			
			// Start the component.  
			component.start(); 
		} catch(ODatabaseException e) {
			// Create a new Component.  
			Component component = new Component();  
			
			// Add a new HTTP server listening on port 8080.  
			component.getServers().add(Protocol.HTTP, 8080);  
			
			//Define CLAP-Protokoll
			component.getClients().add(Protocol.CLAP);
			component.getClients().add(Protocol.FILE);
			
			// Attach the sample application.  
			component.getDefaultHost().attach("/lwd", new SnowProfileApplikation() );  
			//server.getContext().getParameters().add("useForwardedForHeader", "true");
			
			// Start the component.  
			component.start(); 
		}
	}
}

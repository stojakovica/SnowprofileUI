package at.ac.dbisinformatik.snowprofile.web;

import org.restlet.Component;
import org.restlet.data.Protocol;

public class ServerMain {

	/**
	 * @param args
	 */
	public static void main(String[] args) throws Exception {
		 // Create a new Component.  
	    Component component = new Component();  
	    
	    // Add a new HTTP server listening on port 8080.  
	    component.getServers().add(Protocol.HTTP, 8080);  
	    
	    //Define CLAP-Protokoll
	    component.getClients().add(Protocol.CLAP);
	    
	    // Attach the sample application.  
	    component.getDefaultHost().attach("/lwd", new SnowProfileApplikation() );  
	    //server.getContext().getParameters().add("useForwardedForHeader", "true");
	    
	    // Start the component.  
	    component.start(); 
	}

}

package at.ac.dbisinformatik.snowprofile.server;

import org.restlet.resource.Get;  
import org.restlet.resource.ServerResource;

public class HelloWorldResource extends ServerResource {
	
	@Get
	public String represent() {
		return "Hello World";
	}

}

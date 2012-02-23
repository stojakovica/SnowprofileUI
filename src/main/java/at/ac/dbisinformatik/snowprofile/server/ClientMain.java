package at.ac.dbisinformatik.snowprofile.server;

import org.restlet.Client;
import org.restlet.Context;
import org.restlet.data.Protocol;
import org.restlet.resource.ClientResource;

public class ClientMain {

	
	public static void main(String args[]) {
		// Instantiate the client connector, and configure it.
		Client client = new Client(new Context(), Protocol.HTTP);
		client.getContext().getParameters().add("useForwardedForHeader","false");

		// Instantiate the ClientResource, and set it's client connector.
		ClientResource cr = new ClientResource("http://www.example.com/");
		cr.setNext(client);
	}
}

package at.ac.dbisinformatik.snowprofile.web;

import org.restlet.Application;
import org.restlet.Component;
import org.restlet.data.Protocol;

public class SnowProfileComponent extends Component {

	public SnowProfileComponent(Application application) {
		// Create a new Component.

		// Add a new HTTP server listening on port 8080.
		getServers().add(Protocol.HTTP, 8080);

		// Define CLAP-Protokoll
		getClients().add(Protocol.CLAP);
		getClients().add(Protocol.FILE);

		// Attach the sample application.
		getDefaultHost().attach("/lwd", application);
		// server.getContext().getParameters().add("useForwardedForHeader",
		// "true");

		// Start the component.
		application.getTunnelService().setExtensionsTunnel(true);
	}
}

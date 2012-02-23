package at.ac.dbisinformatik.snowprofile.server;

import org.restlet.Application;
import org.restlet.Restlet;
import org.restlet.resource.Directory;
import org.restlet.routing.Router;

public class MyApplication extends Application {

	/**
	 * Creates a root Restlet that will receive all incoming calls.
	 */
	@Override
	public synchronized Restlet createInboundRoot() {
		Router router = new Router(this.getContext());

		// initialize the static file server
		final Directory dir = new Directory(getContext(),
				"clap://system/src/main/resources/at/ac/dbisinformatik/snowprofile/web/index.html");
		dir.setDeeplyAccessible(true);
		dir.setListingAllowed(false);
		dir.setNegotiatingContent(false);
		router.attach("/schema", dir);
		
		return router;
	}

}
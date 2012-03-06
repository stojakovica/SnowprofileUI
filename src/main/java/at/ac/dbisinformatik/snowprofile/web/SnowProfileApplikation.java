package at.ac.dbisinformatik.snowprofile.web;

import org.restlet.Application;
import org.restlet.Restlet;
import org.restlet.resource.Directory;
import org.restlet.routing.Redirector;
import org.restlet.routing.Router;

public class SnowProfileApplikation extends Application {

	/**
	 * Creates a root Restlet that will receive all incoming calls.
	 */
	@Override
	public synchronized Restlet createInboundRoot() {
		Router router = new Router(this.getContext());

		// initialize the static file server
		final Directory dir = new Directory(getContext(),
				"clap://system/at/ac/dbisinformatik/snowprofile/web/resources");
		dir.setDeeplyAccessible(true);
		dir.setListingAllowed(true);
		dir.setNegotiatingContent(false);
		router.attach("/static/1.0.0.0", dir);
		
		router.attach("/", new Redirector(getContext(), "/lwd/static/1.0.0.0/index.html", Redirector.MODE_CLIENT_TEMPORARY));
		router.attach("/user", ListUserResource.class);
		router.attach("/user/{id}", SingleUserResource.class);
		
		
		
		//router.attach("/snowprofile", ListSnowProfileResource.class);
		//router.attach("/snowprofile/{id}", SingleSnowProfileResource.class);
		//....
		
		return router;
	}

}
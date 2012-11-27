package at.ac.dbisinformatik.snowprofile.web;

import org.restlet.Application;
import org.restlet.Restlet;
import org.restlet.resource.Directory;
import org.restlet.routing.Redirector;

public class SnowProfileApplication extends Application {
	
	private SnowProfileRouter router;
	private CacheFilter cacheFilter;
	private DBFilter dbFilter;
	
	public SnowProfileApplication(SnowProfileRouter router, CacheFilter cacheFilter, DBFilter dbFilter) {
		this.router = router;
		this.cacheFilter = cacheFilter;
		this.dbFilter = dbFilter;
	}

	/**
	 * Creates a root Restlet that will receive all incoming calls.
	 */
	@Override
	public synchronized Restlet createInboundRoot() {
		dbFilter.setNext(router);
		
		router.setContext(this.getContext());
		
		final Directory dir = new Directory(getContext(),
				"clap://system/at/ac/dbisinformatik/snowprofile/web/resources/");
		dir.setDeeplyAccessible(true);
		dir.setListingAllowed(true);
		dir.setNegotiatingContent(false);

		cacheFilter.setNext(dir);
		
		//Attach Directory with Filter for caching
		router.attach("/static/1.0.0.0", cacheFilter);
		
		router.attach("/", new Redirector(getContext(), "/lwd/static/1.0.0.0/login.html", Redirector.MODE_CLIENT_TEMPORARY));
		router.attach("/user", ListUserResource.class);
		router.attach("/user/{usrn}/{pwd}", SingleUserResource.class);
		
		router.attach("/snowprofile", ListSnowProfileResource.class);
		router.attach("/snowprofile/{id}", SingleSnowProfileResource.class);

		router.attach("/printsnowprofile/{id}/{type}", PrintSnowProfileResource.class);

		router.attach("/search", SearchSnowProfileResource.class);
		
		return dbFilter;
	}
	
}
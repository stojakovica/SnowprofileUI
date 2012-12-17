package at.ac.dbisinformatik.snowprofile.web;

/**
 * Copyright (c) 2012 Aleksandar Stojakovic
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * The Software shall be used for Good, not Evil.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */

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

		router.attach("/search", SearchSnowProfileResource.class);
		
		return dbFilter;
	}
	
}
package at.ac.dbisinformatik.snowprofile.web;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.restlet.Request;
import org.restlet.Response;
import org.restlet.data.CacheDirective;
import org.restlet.data.Form;
import org.restlet.routing.Filter;

public class CacheFilter extends Filter {

	@Override
	/**
	 * Cache for all ExtJS-Files to optimize the web application
	 */
	protected int doHandle(Request request, Response response) {
		int result = super.doHandle(request, response);
		Form headers = (Form) response.getAttributes().get("org.restlet.http.headers");
		if (headers == null) {
			headers = new Form();
			response.getAttributes().put("org.restlet.http.headers", headers);
		}
		response.getAttributes().put("org.restlet.http.headers", headers);
		List<CacheDirective> cacheDirectives;
		if(request.getOriginalRef().getPath().contains("ext-4.1.1a")) {
			cacheDirectives = Arrays.asList(new CacheDirective[] { CacheDirective.publicInfo() } );
			response.getEntity().setExpirationDate(new Date(System.currentTimeMillis() + (3600l * 1000l * 24l * 6000l)));
		} else {
			cacheDirectives = Arrays.asList(new CacheDirective[] { CacheDirective.noCache()  } );   
		}
		response.setCacheDirectives(cacheDirectives);
		request.setCacheDirectives(cacheDirectives);
		return result;
	}
}

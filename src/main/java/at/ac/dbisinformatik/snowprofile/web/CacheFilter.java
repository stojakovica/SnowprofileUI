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

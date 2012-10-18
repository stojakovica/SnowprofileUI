package at.ac.dbisinformatik.snowprofile.web;

import org.restlet.Request;
import org.restlet.Response;
import org.restlet.routing.Filter;

import at.ac.dbisinformatik.snowprofile.data.DB;

public class DBFilter extends Filter {
	
	private DB db;

	public DBFilter(DB db) {
		this.db = db;
	}

	@Override
	protected int doHandle(Request request, Response response) {
		int result = 0;
		try {
			result = super.doHandle(request, response);
		} finally {
			this.db.close();
		}
		return result;
	}
}

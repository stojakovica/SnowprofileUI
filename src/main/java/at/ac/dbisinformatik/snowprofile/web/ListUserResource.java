package at.ac.dbisinformatik.snowprofile.web;

import org.json.JSONObject;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.representation.Variant;
import org.restlet.resource.Get;
import org.restlet.resource.ResourceException;
import org.restlet.resource.ServerResource;

import at.ac.dbisinformatik.snowprofile.data.DAORegistry;
import at.ac.dbisinformatik.snowprofile.data.UserDAO;

public class ListUserResource extends ServerResource {

	private UserDAO userDao = DAORegistry.USER_DAO;

	public ListUserResource() {
		setNegotiated(true);
	}

	// search
	@Get
	protected Representation get(Variant variant) throws ResourceException {
		return new StringRepresentation("{ success : true }");
	}

	// add
	@Override
	protected Representation post(Representation representation, Variant variant)
			throws ResourceException {
		// TODO Auto-generated method stub
		return super.put(representation, variant);
	}
}

package at.ac.dbisinformatik.snowprofile.web;

import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.representation.Variant;
import org.restlet.resource.Get;
import org.restlet.resource.ResourceException;
import org.restlet.resource.ServerResource;

import at.ac.dbisinformatik.snowprofile.data.UserDAO;

public class SingleUserResource extends ServerResource {
	
	private UserDAO dao;

	public SingleUserResource(UserDAO dao) {
		this.dao = dao;
	}

	//einzelobjekt zurückgeben
	@Get
	protected Representation get(Variant variant) throws ResourceException {
		
		if(dao.authenticate(getRequestAttributes().get("usrn").toString(),  getRequestAttributes().get("pwd").toString())) {
			return new StringRepresentation("{ success : true }");
		} else {
			return new StringRepresentation("{ success: false, errors: { reason: 'Login failed. Try again.' }}");
		}
	}
	
	//einzelobjekt updaten
	@Override
	protected Representation put(Representation representation, Variant variant)
			throws ResourceException {
		// TODO Auto-generated method stub
		return super.put(representation, variant);
	}
	
	//löschen
	@Override
	protected Representation delete() throws ResourceException {
		// TODO Auto-generated method stub
		return super.delete();
	}
}

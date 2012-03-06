package at.ac.dbisinformatik.snowprofile.web;

import org.restlet.representation.Representation;
import org.restlet.representation.Variant;
import org.restlet.resource.ResourceException;
import org.restlet.resource.ServerResource;

import at.ac.dbisinformatik.snowprofile.data.DAORegistry;
import at.ac.dbisinformatik.snowprofile.data.UserDAO;

public class SingleUserResource extends ServerResource {
	
	private UserDAO userDao = DAORegistry.USER_DAO;

	//einzelobjekt zurückgeben
	@Override
	protected Representation get(Variant variant) throws ResourceException {
		/*if(variant.getMediaType().equals(MediaType.APPLICATION_ALL_XML)) {
			
		} */
		//getRequestAttributes().get("id")
		return super.get(variant);
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
	
	public void setUserDao(UserDAO userDao) {
		this.userDao = userDao;
	}
}

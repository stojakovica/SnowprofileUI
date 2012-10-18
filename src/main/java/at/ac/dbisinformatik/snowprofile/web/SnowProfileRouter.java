package at.ac.dbisinformatik.snowprofile.web;

import org.picocontainer.MutablePicoContainer;
import org.restlet.resource.Finder;
import org.restlet.resource.ServerResource;
import org.restlet.routing.Router;

public class SnowProfileRouter extends Router {

	private final MutablePicoContainer container;

	public SnowProfileRouter(MutablePicoContainer container) {
		this.container = container;
	}

	@Override
	public Finder createFinder(Class<?> targetClass) {
		Finder result = null;
		if (ServerResource.class.isAssignableFrom(targetClass)) {
			result = new SnowProfileFinder(container, getContext(), targetClass);
		} else {
			throw new IllegalStateException("Could not create a finder for the specific target class");
		}

		return result;
	}
}

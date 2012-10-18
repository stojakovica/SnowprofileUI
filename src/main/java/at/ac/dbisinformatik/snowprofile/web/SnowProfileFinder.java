package at.ac.dbisinformatik.snowprofile.web;

import org.picocontainer.MutablePicoContainer;
import org.restlet.Context;
import org.restlet.Request;
import org.restlet.Response;
import org.restlet.resource.Finder;
import org.restlet.resource.ServerResource;

public class SnowProfileFinder extends Finder {

	private final MutablePicoContainer container;

    public SnowProfileFinder(MutablePicoContainer container, Context context, Class<?> targetClass) {
            super(context, targetClass);
            this.container = container;
    }

    
    @Override
    public ServerResource create(Class<? extends ServerResource> targetClass, Request request, Response response) {

            ServerResource resource =  container.getComponent(targetClass);

            if (resource == null) {
                    container.addComponent(targetClass);
                    resource =  container.getComponent(targetClass);
            } 

            return resource;
    }
    
}

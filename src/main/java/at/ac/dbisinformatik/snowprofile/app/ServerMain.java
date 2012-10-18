package at.ac.dbisinformatik.snowprofile.app;

import static org.picocontainer.Characteristics.CACHE;

import org.picocontainer.DefaultPicoContainer;
import org.picocontainer.MutablePicoContainer;
import org.restlet.Component;

import at.ac.dbisinformatik.snowprofile.data.DB;
import at.ac.dbisinformatik.snowprofile.data.UserDAO;
import at.ac.dbisinformatik.snowprofile.web.CacheFilter;
import at.ac.dbisinformatik.snowprofile.web.DBFilter;
import at.ac.dbisinformatik.snowprofile.web.SnowProfileApplication;
import at.ac.dbisinformatik.snowprofile.web.SnowProfileComponent;
import at.ac.dbisinformatik.snowprofile.web.SnowProfileRouter;

public class ServerMain {

	/**
	 * @param args
	 */
	public static void main(String[] args) throws Exception {	
		MutablePicoContainer pico = new DefaultPicoContainer();  
		pico.addComponent(pico);
		pico.as(CACHE).addComponent(Configuration.class);
		pico.as(CACHE).addComponent(DB.class);
		
		pico.as(CACHE).addComponent(UserDAO.class);
		
		pico.addComponent(SnowProfileComponent.class);
		pico.addComponent(SnowProfileApplication.class);
		
		pico.addComponent(CacheFilter.class);
		pico.addComponent(DBFilter.class);	
		pico.addComponent(SnowProfileRouter.class);
		// Create Database
		pico.getComponent(Component.class).start();
	}
}

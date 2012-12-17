package at.ac.dbisinformatik.snowprofile.app;

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
	 * ServerMain starts the Web Application.
	 * Picocontainer loads all Classes in one container and regulates all connections between these classes.
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

		//starting application
		pico.getComponent(Component.class).start();
	}
}

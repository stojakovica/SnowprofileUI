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

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;


public class Configuration {

	private static final String TEMPLATE_LOCATION="/at/ac/dbisinformatik/snowprofile/app/snowprofile.conf";
	private Properties properties; 
	
	public Configuration() {
		if(!ApplicationVariables.CONFIG_FILE_DIRECTORY.isDirectory()) {
			ApplicationVariables.CONFIG_FILE_DIRECTORY.mkdirs();
		} 
		File configFileTarget = ApplicationVariables.CONFIG_FILE_LOCATION;
		if(ApplicationVariables.CONFIG_FILE_LOCATION.isFile()) {
			configFileTarget = new File(ApplicationVariables.CONFIG_FILE_DIRECTORY, "snowprofile.conf.tmpl");
		}
		try {
			String configFileTemplateConfig = IOUtils.toString(
				Configuration.class.getResourceAsStream(TEMPLATE_LOCATION)
			);
			FileUtils.write(configFileTarget, configFileTemplateConfig);
			properties = new Properties();
			properties.load(new FileReader(ApplicationVariables.CONFIG_FILE_LOCATION));
		} catch (IOException e) {
			throw new IllegalStateException("Could not Read config template file", e);
		}
	}
	
	public String getValue(String key) {
		 return properties.getProperty(key);
	}
	
}

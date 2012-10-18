package at.ac.dbisinformatik.snowprofile.app;

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

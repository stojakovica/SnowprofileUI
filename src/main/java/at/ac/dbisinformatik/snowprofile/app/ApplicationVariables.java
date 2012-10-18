package at.ac.dbisinformatik.snowprofile.app;

import java.io.File;

import org.apache.commons.lang3.SystemUtils;

public class ApplicationVariables {
	public static final File SNOWPROFILE_APP_DIR;
	public static final File CONFIG_FILE_DIRECTORY;
	public static final File CONFIG_FILE_LOCATION;
	public static final File DB_LOCATION;
	
	static {
		if(SystemUtils.IS_OS_WINDOWS
			|| SystemUtils.IS_OS_WINDOWS_2000
			|| SystemUtils.IS_OS_WINDOWS_7
			|| SystemUtils.IS_OS_WINDOWS_95
			|| SystemUtils.IS_OS_WINDOWS_98
			|| SystemUtils.IS_OS_WINDOWS_ME
			|| SystemUtils.IS_OS_WINDOWS_NT
			|| SystemUtils.IS_OS_WINDOWS_VISTA
			|| SystemUtils.IS_OS_WINDOWS_XP){
			File applicationData = new File(System.getenv().get("APPDATA"));
			SNOWPROFILE_APP_DIR = new File(applicationData, "snowprofile/");
		}
		else {
			SNOWPROFILE_APP_DIR = new File("/opt/snowprofile/");
		}
		
		CONFIG_FILE_DIRECTORY = new File(SNOWPROFILE_APP_DIR, "config/");
		CONFIG_FILE_LOCATION = new File(SNOWPROFILE_APP_DIR, "config/snowprofile.conf");
		DB_LOCATION = new File(SNOWPROFILE_APP_DIR, "db/");
	}
}

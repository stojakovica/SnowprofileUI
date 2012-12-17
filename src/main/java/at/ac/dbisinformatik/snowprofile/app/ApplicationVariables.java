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

package at.ac.dbisinformatik.snowprofile.data;

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

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import at.ac.dbisinformatik.snowprofile.web.JSONHelpers;

import com.orientechnologies.orient.core.record.impl.ODocument;

public class SchichtprofilDAO {
	
	/**
	 * compares the given search-name with the name of the person in the snow profile document
	 * 
	 * @param oDocument
	 * @param name
	 * @return
	 * @throws JSONException
	 */
	public static boolean checkName(ODocument oDocument, String name) throws JSONException {
		if(name.equals(""))
			return true;
		else {
			if(oDocument.rawField("metaDataProperty.MetaData.srcRef.Operation.contactPerson.Person.name").toString().matches("(?i:.*"+name+".*)"))
				return true;
			else
				return false;
		}
	}
	
	/**
	 * compares the given search-date with the date of the date the snow profile was taken
	 * 
	 * @param oDocument
	 * @param date
	 * @return
	 * @throws ParseException
	 */
	public static boolean checkDate(ODocument oDocument, String date) throws ParseException {
		if(date.equals(""))
			return true;
		else {
			Date sdfToDate = new SimpleDateFormat("dd.MM.yyyy").parse(date);
			String dateToNewFormat = new SimpleDateFormat("yyyy-MM-dd").format(sdfToDate);
			String documentDate = oDocument.rawField("validTime.TimeInstant.timePosition").toString().substring(0,10);
			if(documentDate.matches("(?i:.*"+dateToNewFormat+".*)"))
				return true;
			else
				return false;
		}
	}
	
	/**
	 * compares the given search-time with the time the snow profile was taken
	 * 
	 * @param oDocument
	 * @param time
	 * @return
	 * @throws ParseException
	 */
	public static boolean checkTime(ODocument oDocument, String time) throws ParseException {
		if(time.equals(""))
			return true;
		else {
			Date sdfToTime = new SimpleDateFormat("HH:mm").parse(time);
			String timeToNewFormat = new SimpleDateFormat("HH:mm:00").format(sdfToTime);
			String documentTime = oDocument.rawField("validTime.TimeInstant.timePosition").toString().substring(11,19);
			if(documentTime.matches("(?i:.*"+timeToNewFormat+".*)"))
				return true;
			else
				return false;
		}
	}
	
	/**
	 * compares the given search-region with the region where the snow profile was taken
	 * 
	 * @param oDocument
	 * @param region
	 * @return
	 */
	public static boolean checkRegion(ODocument oDocument, String region) {
		if(region.equals(""))
			return true;
		else {
			if(oDocument.rawField("locRef.ObsPoint.description").toString().matches("(?i:.*"+region+".*)"))
				return true;
			else
				return false;
		}
	}
	
	/**
	 * compares the given search-place with the place the snow profile was taken
	 * 
	 * @param oDocument
	 * @param ort
	 * @return
	 */
	public static boolean checkOrt(ODocument oDocument, String ort) {
		if(ort.equals(""))
			return true;
		else {
			if(oDocument.rawField("locRef.ObsPoint.name").toString().matches("(?i:.*"+ort+".*)"))
				return true;
			else
				return false;
		}
	}
	
	/**
	 * compares the given search-coordinate with the coordinate where the snow profile was taken
	 * 
	 * @param oDocument
	 * @param koordinaten
	 * @return
	 */
	public static boolean checkKoordinaten(ODocument oDocument, String koordinaten) {
		if(koordinaten.equals(""))
			return true;
		else {
			if(oDocument.rawField("locRef.ObsPoint.pointLocation.gml_Point.gml_pos").toString().matches("(?i:.*"+koordinaten+".*)"))
				return true;
			else
				return false;
		}
	}

	/**
	 * returns all Snow Profiles from the Orient DataBase
	 * 
	 * @param db
	 * @return
	 * @throws JSONException
	 */
	public static JSONArray getAllSnowprofiles(DB db) throws JSONException {
		final JSONArray returnList = new JSONArray();

		List<ODocument> results = db.querySQL("select * from SnowProfile");
		for (ODocument oDocument : results) {
			JSONObject temp = new JSONObject(oDocument.toJSON());
			returnList.put(getSingleSnowProfile(db, temp.get("@rid").toString().substring(1)).get("SnowProfile"));
		}
		
		return returnList;
	}
	
	/**
	 * returns one Snow Profile with the given id
	 * 
	 * @param db
	 * @param id
	 * @return
	 * @throws JSONException
	 */
	public static JSONObject getSingleSnowProfile(DB db, String id) throws JSONException {
		JSONObject returnProfile = null;
		List<ODocument> result = db.querySQL("select * from SnowProfile where @rid = #"+id);
		
		for (ODocument oDocument : result) {
			returnProfile = new JSONObject("{\"SnowProfile\": "+oDocument.toJSON().toString()+"}");
		}
		
		returnProfile = new JSONObject(JSONHelpers.flatten("stratProfile", returnProfile));
		String returnProfileString = returnProfile.toString();
		returnProfileString = returnProfileString.replace("\"rid\"", "\"rid_old\"");
		returnProfileString = returnProfileString.replace("@", "");
		returnProfileString = returnProfileString.replace("null", "\"\"");
		returnProfileString = returnProfileString.replace("\"id\":\"\",", "");
		returnProfileString = returnProfileString.replace("\"id\":{\"id\":\"\"},", "");
		
		return new JSONObject(returnProfileString);
	}

	/**
	 * returns all Snow Profiles where the search-fields are matched with the Snow Profile data
	 * 
	 * @param db
	 * @param searchObject
	 * @return
	 * @throws JSONException
	 * @throws ParseException
	 */
	public static JSONArray getSnowProfilesBySearch(DB db, JSONObject searchObject) throws JSONException, ParseException {
		final JSONArray returnList = new JSONArray();

		List<ODocument> results = db.querySQL("select * from SnowProfile");
		for (ODocument oDocument : results) {
			JSONObject temp = new JSONObject(oDocument.toJSON());
			Map<String, Object> idMap = (Map<String, Object>) JSONHelpers.jsonToMap("SnowProfile", temp);
			idMap.put("rid", (String) temp.get("@rid").toString().substring(1));
			if(checkName(oDocument, searchObject.get("name").toString()) && checkDate(oDocument, searchObject.get("profildatum").toString()) && checkTime(oDocument, searchObject.get("zeit").toString()) && checkOrt(oDocument, searchObject.get("profilort").toString()) && checkRegion(oDocument, searchObject.get("region").toString()) && checkKoordinaten(oDocument, searchObject.get("utmKoordinaten").toString())) {
				returnList.put(idMap);
			}
		}
		
		return returnList;
	}
}

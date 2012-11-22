package at.ac.dbisinformatik.snowprofile.data;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import at.ac.dbisinformatik.snowprofile.web.JSONHelpers;

import com.orientechnologies.orient.core.record.impl.ODocument;

public class SchichtprofilDAO {
	
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

	public static JSONArray getAllSnowprofiles(DB db) throws JSONException {
		final JSONArray returnList = new JSONArray();

		List<ODocument> results = db.querySQL("select * from SnowProfile");
		for (ODocument oDocument : results) {
			JSONObject temp = new JSONObject(oDocument.toJSON());
			Map<String, Object> idMap = (Map<String, Object>) JSONHelpers
					.jsonToMap("SnowProfile", temp);
			idMap.put("rid", (String) temp.get("@rid").toString().substring(1));
			returnList.put(idMap);
		}
		
		return returnList;
	}
	
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

	public static JSONArray getSnowProfilesBySearch(DB db, JSONObject searchObject) throws JSONException, ParseException {
		final JSONArray returnList = new JSONArray();

		List<ODocument> results = db.querySQL("select * from SnowProfile");
		for (ODocument oDocument : results) {
			JSONObject temp = new JSONObject(oDocument.toJSON());
			Map<String, Object> idMap = (Map<String, Object>) JSONHelpers.jsonToMap("SnowProfile", temp);
			idMap.put("rid", (String) temp.get("@rid").toString().substring(1));
			System.out.println(checkName(oDocument, searchObject.get("name").toString()));
			if(checkName(oDocument, searchObject.get("name").toString()) && checkDate(oDocument, searchObject.get("profildatum").toString()) && checkTime(oDocument, searchObject.get("zeit").toString()) && checkOrt(oDocument, searchObject.get("profilort").toString()) && checkRegion(oDocument, searchObject.get("region").toString()) && checkKoordinaten(oDocument, searchObject.get("utmKoordinaten").toString())) {
				returnList.put(idMap);
			}
		}
		
		return returnList;
	}
}

package at.ac.dbisinformatik.snowprofile.web;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.io.IOUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;
import org.restlet.data.MediaType;
import org.restlet.ext.fileupload.RestletFileUpload;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;

import at.ac.dbisinformatik.snowprofile.data.DB;
import at.ac.dbisinformatik.snowprofile.data.SchichtprofilDAO;

public class ListSnowProfileResource extends ServerResource {

	private DB db;

	public ListSnowProfileResource(DB db) {
		setNegotiated(true);
		this.db = db;
	}

	/**
	 * gives a list of all Snowprofiles which are saved in the Database
	 * 
	 * @return
	 * @throws JSONException
	 * @throws IOException
	 */
	@Get()
	public String getJson() throws JSONException, IOException {
		return "{SnowprofileList: " + SchichtprofilDAO.getAllSnowprofiles(db).toString() + "}";
	}

	/**
	 * store new Snowprofile in Database
	 * 
	 * @param entity
	 * @return
	 * @throws Exception
	 */
	@Post
	public String storeJson(Representation entity) throws Exception {
		String rep = "";
        if (entity != null) {
            if (MediaType.MULTIPART_FORM_DATA.equals(entity.getMediaType(), true)) {
                DiskFileItemFactory factory = new DiskFileItemFactory();
                factory.setSizeThreshold(1000240);

                RestletFileUpload upload = new RestletFileUpload(factory);
                List<FileItem> items;

                items = upload.parseRequest(getRequest());

                boolean found = false;
                for (final Iterator<FileItem> it = items.iterator(); it
                        .hasNext()
                        && !found;) {
                    FileItem fi = it.next();
                    String snowprofile = "";
                    if (fi.getFieldName().equals("import")) {
                    	snowprofile = IOUtils.toString(fi.getInputStream());
                    	JSONObject snowprofileJSON = XML.toJSONObject(snowprofile);
                    	
                    	snowprofile = snowprofileJSON.toString().replace("caaml:", "");
                    	snowprofile = snowprofile.replace("gml:", "gml_");
                    	snowprofile = snowprofile.replace("xmlns:", "xmlns_");
                    	snowprofile = snowprofile.replace("xsi:", "xsi_");
                    	
                    	snowprofileJSON = new JSONObject(snowprofile);
                    	
                    	snowprofile = db.store("SnowProfile", new JSONObject(snowprofileJSON.get("SnowProfile").toString()));
                    	rep = "{\"success\": \"true\", \"id\": \""+snowprofile+"\"}";
                    } else {
                        rep = new StringRepresentation("no file uploaded", MediaType.TEXT_PLAIN).toString();
                    }
                }
            } else {
            	rep = db.store("SnowProfile", new JSONObject(entity.getText()));
    		}
        }

        return rep;
	}
}

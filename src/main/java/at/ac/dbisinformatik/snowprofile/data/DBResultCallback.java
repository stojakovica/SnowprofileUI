package at.ac.dbisinformatik.snowprofile.data;

import java.util.List;

import com.orientechnologies.orient.core.record.impl.ODocument;

public interface DBResultCallback {

	public void process(List<ODocument> results);
}

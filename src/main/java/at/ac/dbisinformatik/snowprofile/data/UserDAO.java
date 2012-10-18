package at.ac.dbisinformatik.snowprofile.data;

public class UserDAO {

	@SuppressWarnings("unused")
	private DB db;

	public UserDAO(DB db) {
		this.db = db;
	}

	public boolean authenticate(String username, String password) {
		return "admin".equals(username) && "admin".equals(password);
	}
}

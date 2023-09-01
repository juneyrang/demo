package egovframework.desm.cmmn.firebase;

import java.util.List;
import java.util.Map;

public interface FirebaseService {
	public void init();
	
	public String sendByFcmToken(String token, String title, String body);
	
	public String sendByFcmToken(String token, String title, String body, Map<String, String> data);
	
	public String sendByFcmToken(Map<String, Object> paramMap);
	
	public Map<String, Object> saveFcmToken(String param) throws Exception;
	
	public int saveFcmTokenHistory(Map<String, Object> paramMap);
	
	public Map<String, Object> sendFcmByWebTest(Map<String, Object> paramMap) throws Exception;
}


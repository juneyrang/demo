package egovframework.desm.cmmn.firebase;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.internal.NonNull;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.google.firebase.messaging.Message.Builder;

import egovframework.desm.service.MaterialService;
import egovframework.desm.service.impl.DesmDAO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.property.EgovPropertyService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service("firebaseService")
public class FirebaseServiceImpl extends EgovAbstractServiceImpl implements FirebaseService {
	private static final Logger logger = LoggerFactory.getLogger(FirebaseServiceImpl.class);

	@Resource(name="propertiesService")
	protected EgovPropertyService propertiesService;
	
	@Resource(name="firebaseDAO")
	private FirebaseDAO firebaseDAO;
	
	@Resource(name = "desmDAO")
	private DesmDAO desmDAO;	
	
	/*
	 * context-common.xml bean 등록 init-method, Server 최초 실행시 동작.
	 * */
	@Override
	public void init() {
		try {
			// Messaging만 Scope 설정
			String firebaseScope = propertiesService.getString("fcm.key.scope").toString();
			
			ClassPathResource serviceAccount = new ClassPathResource(propertiesService.getString("fcm.key.path"));

			FirebaseOptions firebaseOptions = FirebaseOptions.builder()
												.setCredentials(GoogleCredentials.fromStream(serviceAccount.getInputStream()))
												.build();
			
			if(FirebaseApp.getApps().isEmpty()) {
				FirebaseApp.initializeApp(firebaseOptions);
				logger.info("Initialize :: Firebase application has been initialized.");
				//sendByTokenTest(null);
			}
		}  catch (IOException ioe) {
			logger.error(ioe.getMessage());
			throw new RuntimeException(ioe.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void sendByTokenTest(List<String> tokenList) {
		// This registration token comes from the client FCM SDKs.
		String registrationToken = "cWTgfq1QQfiEyfRJbUfnvz:APA91bGIz9fTLDXM0BCbVw90FjPOZK9ihffu4v3UkkuKCY2pDoKDM2zkbp0zcgNtx-W5pYx_Y6JTJoguVwnHIj7lUtxXoyE-JvoN8V9P9rY7oc1p1JODJXZ4C08Kud4oPUygN-KgqrdT";

		// See documentation on defining a message payload.
		Message message = Message.builder()
			.setToken(registrationToken)
			.setNotification(Notification.builder().setTitle("test Title").setBody("test Body").build())
		    .putData("score", "850")
		    .putData("time", "2:45")
		    .build();

		// Send a message to the device corresponding to the provided
		// registration token.
		String response = "";
		try {
			response = FirebaseMessaging.getInstance().send(message);
		} catch (FirebaseMessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// Response is a message ID string.
		System.out.println("Successfully sent message: " + response);
	}
	
	@Override
	public Map<String, Object> sendFcmByWebTest(Map<String, Object> paramMap) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			// 1. get user_ad token
			// 2. send token
			// 3. no history(for test)
			String registrationToken = firebaseDAO.selectTokenByUserAd(paramMap);
			sendByFcmToken(registrationToken, paramMap.get("TITLE").toString(), paramMap.get("BODY").toString());
			resultMap.put("status", "success");
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e.getMessage());
		}
		return resultMap;
	}
	
	@Override
	public Map<String, Object> saveFcmToken(String param) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		try {
			Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
			firebaseDAO.saveFcmToken(paramMap);
			paramMap.put("USER_ID", paramMap.get("USER_AD"));
			paramMap.put("IP", paramMap.get("PLATFORM"));
			desmDAO.insertUserLog(paramMap);
			
			resultMap.put("status", "success");
    		resultMap.put("data", "");
    		
		} catch (Exception e) {
			System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
		return resultMap;
	}
	
	@Override
	public String sendByFcmToken(String token, String title, String body) {
		String response;
		try {
			Message message = Message.builder()
					.setToken(token)
					.setNotification(Notification.builder()
							.setTitle(title)
							.setBody(body)
							.build())
					.build();
			response = FirebaseMessaging.getInstance().send(message);
			logger.info(response);
			return response;
		} catch (Exception e) {
			// TODO: token logging -> token delete가 필요한가, 우선은 [ERROR] RETURN으로 HISTORY 테이블에서 확인만 함.
			// ERROR Type 조치 방안 전부 확인 후, 분기로 처리필요할 듯 함.. 
			//e.printStackTrace();
			return "[ERROR]" + e.getMessage();
		}
	}
	
	@Override
	public String sendByFcmToken(String token, String title, String body, Map<String, String> data) {
		String response;
		try {
			Message message = Message.builder()
						.setToken(token)
						.setNotification(Notification.builder()
									.setTitle(title)
									.setBody(body)
									.build())
						.putAllData(data)
						.build();
			response = FirebaseMessaging.getInstance().send(message);
			logger.info(response);
			return response;
		} catch (Exception e) {
			//e.printStackTrace();
			return "[ERROR]" + e.getMessage();
		}
	}
	
	@Override
	public String sendByFcmToken(Map<String, Object> paramMap) {
		String response;
		Message message;
		try {
			if(paramMap.get("data") == null) {
				message = Message.builder()
						.setToken(paramMap.get("fcmToken").toString())
						.setNotification(Notification.builder()
								.setTitle(paramMap.get("title").toString())
								.setBody(paramMap.get("body").toString())
								.build())
						.build();
			}
			else {
				message = Message.builder()
						.setToken(paramMap.get("fcmToken").toString())
						.setNotification(Notification.builder()
								.setTitle(paramMap.get("title").toString())
								.setBody(paramMap.get("body").toString())
								.build())
						.putAllData((Map<String, String>)paramMap.get("data"))
						.build();
			}
			response = FirebaseMessaging.getInstance().send(message);
			return response;
		} catch (Exception e) {
			//e.printStackTrace();
			return "[ERROR]" + e.getMessage();
		}
	}
	
	@Override
	public int saveFcmTokenHistory(Map<String, Object> paramMap) {
		int cnt = 0;
		

		if(paramMap.get("DATA") == null) {
			paramMap.put("DATA", "");
		}
		
		cnt = firebaseDAO.saveFcmTokenHistory(paramMap);
			

		return cnt;
	}
}

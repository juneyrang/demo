package egovframework.desm.cmmn.idcs;

import java.security.cert.X509Certificate;
import java.util.Base64;
import java.util.Base64.Encoder;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.net.ssl.SSLContext;

import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.TrustStrategy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import egovframework.desm.service.impl.MaterialDAO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service("idcsService")
public class IdcsServiceImpl extends EgovAbstractServiceImpl implements IdcsService {
	private static final Logger logger = LoggerFactory.getLogger(IdcsServiceImpl.class);

	@Resource(name="idcsDAO")
	private IdcsDAO idcsDAO;

	@Resource(name = "materialDAO")
	private MaterialDAO materialDAO;

	private String base64Str;
	private String baseUrl = "https://idcs-4f17d54755df4b698b84d30191a87d33.identity.oraclecloud.com";
	private String groupId = "43349a03c4d3498ca5042575a68895d9";

	private RestTemplate restTemplate;

	/*
	 * context-common.xml bean 등록 init-method, Server 최초 실행시 동작.
	 * */
	@Override
	public void init() {
		try {
			// idcs call authorization.
			String clientId = "9a896877261546fe99ada27b5e27a6a2";
			String clientSecret = "7895194b-d817-49ca-ada1-31f9fba0da87";
			byte[] targetBytes = (clientId + ":" + clientSecret).getBytes();
			Encoder encoder = Base64.getEncoder();
			byte[] encodedBytes = encoder.encode(targetBytes);
			this.base64Str = new String(encodedBytes);

			// restTemplate Setup
			TrustStrategy acceptingTrustStrategy = (X509Certificate[] chain, String authType) -> true;

	        SSLContext sslContext = org.apache.http.ssl.SSLContexts.custom()
							        	.loadTrustMaterial(null, acceptingTrustStrategy)
							        	.build();

	        SSLConnectionSocketFactory csf = new SSLConnectionSocketFactory(sslContext, new NoopHostnameVerifier());

	        CloseableHttpClient httpClient = HttpClients.custom()
										    	.setSSLSocketFactory(csf)
										    	.build();

	        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();

	        factory.setHttpClient(httpClient);
			factory.setReadTimeout(300000); // 300 * 1000, 300sec, 5min
			factory.setConnectTimeout(5000); // 5 * 1000, 5sec

			this.restTemplate = new RestTemplate(factory);

		}  catch (Exception e) {
			logger.error(e.getMessage());
			throw new RuntimeException(e.getMessage());
		}
	}

	private HttpHeaders getIdcsHeader() {
		logger.info("getIdcsAccessToken");
		try {
			// get access token from idcs client with client id + clinet secret
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", "Basic " + this.base64Str);
			headers.set("Content-Type", "application/x-www-form-urlencoded");

			String bodyString = "grant_type=client_credentials&scope=urn:opc:idm:__myscopes__";
			HttpEntity<String> reqEntity = new HttpEntity<>(bodyString, headers);

			Map<String, Object> result = restTemplate.postForObject(baseUrl + "/oauth2/v1/token", reqEntity, Map.class);
			logger.info(result.toString());

			// get userinfo from idcs with access token
			headers = new HttpHeaders();
			headers.set("Authorization", "Bearer " + result.get("access_token"));
			headers.set("Content-Type", "application/json");

			return headers;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public String getIdcsUserListTest() {
		try {
			HttpEntity<MultiValueMap<String, Object>> reqEntity = new HttpEntity<>(getIdcsHeader());

			ResponseEntity<Map> resultUser = restTemplate.exchange(baseUrl + "/admin/v1/Users", HttpMethod.GET, reqEntity, Map.class);

			logger.info(resultUser.toString());

			return "sucess";
		} catch (Exception e) {
			e.printStackTrace();
			return e.getMessage();
		}
	}

	@Override
	public JSONObject searchIDCSUser(Map<String, Object> paramMap) throws Exception {
		JSONObject result = new JSONObject();
		try {
			HttpEntity<MultiValueMap<String, Object>> reqEntity = new HttpEntity<>(getIdcsHeader());
			ResponseEntity<JSONObject> resultUser = null;
			JSONObject rtnJson = new JSONObject();
			logger.info(paramMap.toString());

			if(paramMap.containsKey("userName")){
				String filter = "userName eq \""+paramMap.get("userName")+"\"";
				resultUser = restTemplate.exchange(baseUrl + "/admin/v1/Users?filter="+filter, HttpMethod.GET, reqEntity, JSONObject.class);
				JSONArray arr = resultUser.getBody().getJSONArray("Resources");
				if(arr.size() > 0)rtnJson = arr.getJSONObject(0);
			}else if(paramMap.containsKey("idcs_id")){
				resultUser = restTemplate.exchange(baseUrl + "/admin/v1/Users/"+paramMap.get("idcs_id"), HttpMethod.GET, reqEntity, JSONObject.class);
				rtnJson = resultUser.getBody();
			}

			logger.info(rtnJson.toString());
			result.put("success", rtnJson);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			result.put("error", e.getMessage());
			return result;
		}
	}

	@Override
	public JSONObject updateIDCSUser(Map<String, Object> paramMap) {
		JSONObject result = new JSONObject();
		try {
			JSONObject json = new JSONObject();
			JSONArray schemas = new JSONArray();
			schemas.add("urn:ietf:params:scim:api:messages:2.0:PatchOp");

			JSONArray operations = new JSONArray();
			JSONObject emailMap = new JSONObject();
			JSONObject nameMap = new JSONObject();

			JSONArray emails = new JSONArray();
			JSONObject workEmail = new JSONObject();
			workEmail.put("secondary", false);
			workEmail.put("verified", true);
			workEmail.put("type", "work");
			workEmail.put("primary", true);
			workEmail.put("value", paramMap.get("email"));
			emails.add(workEmail);

			JSONObject workEmail2 = new JSONObject();
			workEmail2.put("secondary", false);
			workEmail2.put("verified", true);
			workEmail2.put("type", "recovery");
			workEmail2.put("primary", false);
			workEmail2.put("value", paramMap.get("email"));
			emails.add(workEmail2);

			emailMap.put("op", "replace");
			emailMap.put("path", "emails");
			emailMap.put("value", emails);
			operations.add(emailMap);

			JSONObject name = new JSONObject();
			name.put("familyName",paramMap.get("name"));

			nameMap.put("op", "replace");
			nameMap.put("path", "name");
			nameMap.put("value", name);
			operations.add(nameMap);

			json.put("schemas", schemas);
			json.put("Operations", operations);

			HttpEntity<JSONObject> reqEntity = new HttpEntity<>(json,getIdcsHeader());

			Map resultUser = restTemplate.patchForObject(baseUrl + "/admin/v1/Users/"+paramMap.get("idcs_id"),reqEntity, Map.class);

			logger.info(resultUser.toString());

			result.put("success", "success");
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			result.put("error", e.getMessage());
			return result;
		}
	}

	@Override
	public JSONObject createIDCSUser(Map<String, Object> paramMap) {

		JSONObject result = new JSONObject();
		paramMap.put("P_USER_AD", paramMap.get("userName"));
		List<Map<String, Object>> checkList = materialDAO.getDesmSubconUser(paramMap);

		if(checkList.size() > 0) {
			result.put("error", "OVERLAP");
			result.put("USER_AD", paramMap.get("P_USER_AD"));
    		return result;
		}

		try {
			JSONObject json = new JSONObject();
			JSONArray schemas = new JSONArray();
			schemas.add("urn:ietf:params:scim:schemas:core:2.0:User");
			schemas.add("urn:ietf:params:scim:schemas:oracle:idcs:extension:userState:User");
			schemas.add("urn:ietf:params:scim:schemas:oracle:idcs:extension:user:User");

			JSONObject emailMap = new JSONObject();
			JSONObject nameMap = new JSONObject();

			JSONArray emails = new JSONArray();
			JSONObject workEmail = new JSONObject();
			workEmail.put("secondary", false);
			workEmail.put("verified", true);
			workEmail.put("type", "work");
			workEmail.put("primary", true);
			workEmail.put("value", paramMap.get("email"));
			emails.add(workEmail);

			JSONObject workEmail2 = new JSONObject();
			workEmail2.put("secondary", false);
			workEmail2.put("verified", true);
			workEmail2.put("type", "recovery");
			workEmail2.put("primary", false);
			workEmail2.put("value", paramMap.get("email"));
			emails.add(workEmail2);

			emailMap.put("op", "replace");
			emailMap.put("path", "emails");
			emailMap.put("value", emails);

			JSONObject name = new JSONObject();
			name.put("familyName",paramMap.get("name"));

			nameMap.put("op", "replace");
			nameMap.put("path", "name");
			nameMap.put("value", name);

			json.put("schemas", schemas);
			json.put("userName", paramMap.get("userName"));
			json.put("name", name);
			json.put("emails", emails);
			json.put("locale", "en");
			json.put("preferredLanguage", "en");

			HttpHeaders httpHeader = getIdcsHeader();
			HttpEntity<JSONObject> reqEntity = new HttpEntity<>(json,httpHeader);

			Map resultUser = restTemplate.postForObject(baseUrl + "/admin/v1/Users",reqEntity, Map.class);
			logger.info(resultUser.toString());

			String idcsId = resultUser.get("id").toString();

			schemas = new JSONArray();
			schemas.add("urn:ietf:params:scim:api:messages:2.0:PatchOp");
			JSONArray operations = new JSONArray();
			JSONArray valueArr = new JSONArray();
			JSONObject valueMap = new JSONObject();
			JSONObject value = new JSONObject();
			value.put("type","User");
			value.put("value",idcsId);
			valueArr.add(value);

			valueMap.put("op", "add");
			valueMap.put("path", "members");
			valueMap.put("value", valueArr);
			operations.add(valueMap);

			json = new JSONObject();
			json.put("schemas", schemas);
			json.put("Operations", operations);

			reqEntity = new HttpEntity<>(json,httpHeader);

			resultUser = restTemplate.patchForObject(baseUrl + "/admin/v1/Groups/"+groupId,reqEntity, Map.class);
			logger.info(resultUser.toString());

			result.put("success", idcsId);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			result.put("error", e.getMessage());
			return result;
		}
	}

	@Override
	public JSONObject resetIDCSPassword(Map<String, Object> paramMap) throws Exception {
		JSONObject result = new JSONObject();
		try {
			JSONObject json = new JSONObject();
			JSONArray schemas = new JSONArray();
			schemas.add("urn:ietf:params:scim:schemas:oracle:idcs:UserPasswordResetter");
			json.put("schemas", schemas);
			HttpEntity<JSONObject> reqEntity = new HttpEntity<>(json,getIdcsHeader());

			restTemplate.put(baseUrl + "/admin/v1/UserPasswordResetter/"+paramMap.get("idcs_id"),reqEntity);

			result.put("success", "success");

			idcsDAO.saveResetPasswordHistory(paramMap);

			return result;
		} catch (Exception e) {
			e.printStackTrace();
			result.put("error", e.getMessage());
			return result;
		}
	}

    @Override
    public JSONObject updateUserIDCSYn(Map<String, Object> paramMap) throws Exception {
    	JSONObject result = new JSONObject();
    	try {
    		if(paramMap.containsKey("updateList")){
	    		JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
	    		JSONObject obj;
		    	for(int i = 0; i < updateList.size(); i++) {
		    		obj = updateList.getJSONObject(i);
		    		idcsDAO.updateUserIDCSYn(obj);
		    	}
    		}else if(paramMap.containsKey("userName")){
    			idcsDAO.updateUserIDCSYn(paramMap);
    		}

    		result.put("success", "success");
    	}catch (Exception e) {
    		e.printStackTrace();
    		System.out.println("!!!!!!" + e.toString());
    		result.put("error", e.getMessage());
    	}
    	return result;
    }

}

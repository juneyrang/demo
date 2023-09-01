package egovframework.desm.cmmn.idcs;

import java.util.Map;

import net.sf.json.JSONObject;

public interface IdcsService {
	public void init();

	public String getIdcsUserListTest();

	public JSONObject updateUserIDCSYn(Map<String, Object> paramMap) throws Exception;

	public JSONObject updateIDCSUser(Map<String, Object> paramMap) throws Exception;

	public JSONObject createIDCSUser(Map<String, Object> paramMap) throws Exception;

	public JSONObject resetIDCSPassword(Map<String, Object> paramMap)throws Exception;

	public JSONObject searchIDCSUser(Map<String, Object> paramMap) throws Exception;

}


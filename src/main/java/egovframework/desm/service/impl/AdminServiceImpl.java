/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package egovframework.desm.service.impl;

import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.desm.cmmn.UserPasword;
import egovframework.desm.cmmn.firebase.FirebaseService;
import egovframework.desm.service.AdminService;
import egovframework.desm.service.DesmService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.property.EgovPropertyService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * @Class Name : EgovSampleServiceImpl.java
 * @Description : Sample Business Implement Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
@Service("adminService")
public class AdminServiceImpl extends EgovAbstractServiceImpl implements AdminService {

	private static final Logger LOGGER = LoggerFactory.getLogger(AdminServiceImpl.class);


	@Resource(name = "adminDAO")
	private AdminDAO adminDAO;

	@Resource(name = "firebaseService")
	FirebaseService firebaseService;

	@Resource(name="propertiesService")
	protected EgovPropertyService propertiesService;

	@Resource(name = "desmService")
	private DesmService desmService;

	public void scriptCheck(Map<String, Object> obj) {
		for(String key : obj.keySet()){
			if (obj.get(key) != null && !obj.get(key).toString().equals("")){
				String value = obj.get(key).toString();
				value = value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
			    value = value.replaceAll("'", "&#39;");
			    value = value.replaceAll("eval\\((.*)\\)", "");
			    value = value.replaceAll("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");
			    value = value.replaceAll("script", "");
			    obj.put(key, value);
			}
        }
	}

    @Override
    public List getMenu(Map<String, Object> paramMap) {
        return adminDAO.getMenu(paramMap);
    }

    @Override
    public int insertMenu(Map<String, Object> paramMap) {
    	this.scriptCheck(paramMap);
        return adminDAO.insertMenu(paramMap);
    }

    @Override
    public int insertMenuAuth(Map<String, Object> paramMap) {
        return adminDAO.insertMenuAuth(paramMap);
    }

    @Override
    public int deleteMenu(Map<String, Object> paramMap) {
        return adminDAO.deleteMenu(paramMap);
    }

    @Override
    public int deleteMenuAuth(Map<String, Object> paramMap) {
        return adminDAO.deleteMenuAuth(paramMap);
    }

    @Override
    public int insertPermission(Map<String, Object> paramMap) {
    	this.scriptCheck(paramMap);
        return adminDAO.insertPermission(paramMap);
    }

    @Override
    public List getPermission(Map<String, Object> paramMap) {
        return adminDAO.getPermission(paramMap);
    }

    @Override
    public List getMenuAuthList(Map<String, Object> paramMap) {
        return adminDAO.getMenuAuthList(paramMap);
    }

    @Override
    public int deletePermission(Map<String, Object> paramMap) {
        return adminDAO.deletePermission(paramMap);
    }

    @Override
    public int insertPermissionMenu(Map<String, Object> paramMap) {

    	Map<String, Object> row = new HashMap<String, Object>();

    	adminDAO.deletePermissionMenu(paramMap);

    	int cnt = 0;
    	JSONArray listParam = JSONArray.fromObject(paramMap.get("updateList").toString());

    	for(int i = 0; i < listParam.size(); i++) {
    		JSONObject obj = (JSONObject)listParam.get(i);

    		row.put("ROLE_SEQ", paramMap.get("ROLE_SEQ").toString());
    		row.put("USER_AD", paramMap.get("USER_AD").toString());
    		row.put("MENU_SEQ", obj.get("MENU_SEQ").toString());

    		adminDAO.insertPermissionMenu(row);
    		cnt++;
    	}

        return cnt;
    }

    @Override
    public int insertPermissionMenuAuth(Map<String, Object> paramMap) {

    	Map<String, Object> row = new HashMap<String, Object>();

    	adminDAO.deletePermissionMenuAuth(paramMap);

    	int cnt = 0;
    	JSONArray listParam = JSONArray.fromObject(paramMap.get("updateList").toString());

    	for(int i = 0; i < listParam.size(); i++) {
    		JSONObject obj = (JSONObject)listParam.get(i);

    		row.put("ROLE_SEQ", paramMap.get("ROLE_SEQ").toString());
    		row.put("USER_AD", paramMap.get("USER_AD").toString());
    		row.put("MENU_SEQ", obj.get("MENU_SEQ").toString());
    		row.put("AUTH_CODE", obj.get("AUTH_CODE").toString());

    		adminDAO.insertPermissionMenuAuth(row);
    		cnt++;
    	}

        return cnt;
    }

    @Override
    public List getPermissionMenu(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = adminDAO.getPermissionMenu(paramMap);

    	for(int i = 0; i < list.size(); i++){
    		Map<String, Object> row = list.get(i);
    		if(row.get("USE_YN").toString().equals("Y")) {
    			row.put("ck", true);
    		}
    		else {
    			row.put("ck", false);
    		}
    	}

        return list;
    }

    @Override
    public List getMenuAuthUseList(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = adminDAO.getMenuAuthUseList(paramMap);

    	for(int i = 0; i < list.size(); i++){
    		Map<String, Object> row = list.get(i);
    		if(row.get("USE_YN").toString().equals("Y")) {
    			row.put("ck", true);
    		}
    		else {
    			row.put("ck", false);
    		}
    	}

        return list;
    }

    @Override
    public List getUser(Map<String, Object> paramMap) {
        return adminDAO.getUser(paramMap);
    }

    @Override
    public List getUserCheckList(Map<String, Object> paramMap) {
        return adminDAO.getUserCheckList(paramMap);
    }

    @Override
    public int insertUser(Map<String, Object> paramMap) throws Exception {
    	int cnt = 0;
    	try {
    		UserPasword up = new UserPasword();
    		String user_pw = "123qwer@";
    		String SALT = up.getSALT();


        	List<Map<String, Object>> list = adminDAO.getUserCheckList(paramMap);

        	if(list.size() > 0) {
        		Map<String, Object> row = list.get(0);

        		if(row.get("USER_PW") == null || row.get("USER_PW").toString().equals("")) {
        			paramMap.put("USER_PW_SALT", SALT);
        			paramMap.put("USER_PW", up.setHashing(up.setHashing(user_pw, SALT), SALT));
        		}
        	}
        	else {
    			paramMap.put("USER_PW_SALT", SALT);
    			paramMap.put("USER_PW", up.setHashing(up.setHashing(user_pw, SALT), SALT));
        	}
        	this.scriptCheck(paramMap);
        	cnt = adminDAO.insertUser(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}


        return cnt;
    }



    @Override
    public int deleteUser(Map<String, Object> paramMap) {
        return adminDAO.deleteUser(paramMap);
    }

    @Override
    public List getUserPermission(Map<String, Object> paramMap) {

    	List<Map<String, Object>> list = adminDAO.getUserPermission(paramMap);

    	for(int i = 0; i < list.size(); i++){
    		Map<String, Object> row = list.get(i);
    		if(row.get("USE_YN").toString().equals("Y")) {
    			row.put("ck", true);
    		}
    		else {
    			row.put("ck", false);
    		}
    	}

        return list;
    }

    @Override
    public int insertUserPermission(Map<String, Object> paramMap) {

    	Map<String, Object> row = new HashMap<String, Object>();

    	adminDAO.deleteUserPermission(paramMap);

    	int cnt = 0;
    	JSONArray listParam = JSONArray.fromObject(paramMap.get("updateList").toString());

    	for(int i = 0; i < listParam.size(); i++) {
    		JSONObject obj = (JSONObject)listParam.get(i);

    		row.put("P_USER_AD", paramMap.get("P_USER_AD").toString());
    		row.put("USER_AD", paramMap.get("USER_AD").toString());
    		row.put("ROLE_SEQ", obj.get("ROLE_SEQ").toString());

    		adminDAO.insertUserPermission(row);
    		cnt++;
    	}

        return cnt;
    }

    @Override
    public List getCode(Map<String, Object> paramMap) {
        return adminDAO.getCode(paramMap);
    }

    @Override
    public int insertCode(Map<String, Object> paramMap) {

    	if(paramMap.get("USE_YN").toString().equals("Y")) {
    		paramMap.put("DELEGATE_FLAG", "N");
    	}
    	else {
    		paramMap.put("DELEGATE_FLAG", "Y");
    	}

    	this.scriptCheck(paramMap);
        return adminDAO.insertCode(paramMap);
    }

    @Override
    public List getCodeDetail(Map<String, Object> paramMap) {
        return adminDAO.getCodeDetail(paramMap);
    }

    @Override
    public int insertCodeDetail(Map<String, Object> paramMap) {

    	if(paramMap.get("USE_YN").toString().equals("Y")) {
    		paramMap.put("DELEGATE_FLAG", "N");
    	}
    	else {
    		paramMap.put("DELEGATE_FLAG", "Y");
    	}


        return adminDAO.insertCodeDetail(paramMap);
    }

    @Override
    public List getTest(Map<String, Object> paramMap) {

    	List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

    	List<Map<String, Object>> list = adminDAO.getTest(paramMap);

    	for(int i = 0; i < list.size(); i++) {

    		Map<String, Object> row = list.get(i);

    		if(row.get("YN") != null && row.get("YN").toString().equals("Y")) {
    			continue;
    		}

    		row.put("YN", "Y");
    		List<Map<String, Object>> childList = getChildList(row, list);

    		if(childList.size() > 0) {
    			row.put("Items", childList);
    		}
			else {
				row.put("Items", new HashMap<String, Object>());
			}

    		Map<String, Object> resultMap = new HashMap<String, Object>();
    		resultMap.putAll(row);
    		resultList.add(resultMap);


    	}

        return resultList;
    }

    public List getChildList(Map<String, Object> row,List<Map<String, Object>> list) {

    	List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

		for(int i = 0; i < list.size(); i++) {
			Map<String, Object> tmpRow = list.get(i);

    		if(tmpRow.get("YN") != null && tmpRow.get("YN").toString().equals("Y")) {
    			continue;
    		}

    		if(tmpRow.get("TRK_ITEM_SEQ").toString().equals("16751")) {
    			tmpRow.put("YN", "Y");
    		}

    		if(row.get("TRK_ITEM_SEQ").toString().equals(tmpRow.get("TRK_ITEM_GROUP").toString())) {
    			tmpRow.put("YN", "Y");
    			List<Map<String, Object>> childList = getChildList(tmpRow, list);

    			if(childList.size() > 0) {
    				tmpRow.put("Items", childList);
        		}
    			else {
    				tmpRow.put("Items", new HashMap<String, Object>());
    			}

        		Map<String, Object> resultMap = new HashMap<String, Object>();
        		resultMap.putAll(tmpRow);
        		resultList.add(resultMap);
    		}

		}


    	return resultList;
    }

    @Override
    public Map<String, Object> saveDesmPwdChange(Map<String, Object> paramMap) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();
    	int cnt = 0;

    	try {
    		paramMap.put("P_USER_AD", paramMap.get("USER_AD"));

    		List<Map<String, Object>> userInfoPwList = adminDAO.getUserCheckList(paramMap);

    		UserPasword up = new UserPasword();
    		String user_pw = paramMap.get("C_PWD").toString();
    		String user_pw_data = userInfoPwList.get(0).get("USER_PW") == null ? "" :  userInfoPwList.get(0).get("USER_PW").toString();
    		String SALT = userInfoPwList.get(0).get("USER_PW_SALT") == null ? "" : userInfoPwList.get(0).get("USER_PW_SALT").toString();
    		String pw = up.setHashing(up.setHashing(user_pw, SALT), SALT);

    		if(pw.equals(user_pw_data)) {
    			UserPasword nup = new UserPasword();
        		String user_new_pw = paramMap.get("N_PWD").toString();
        		String new_SALT = nup.getSALT();


    			paramMap.put("USER_PW_SALT", new_SALT);
    			paramMap.put("USER_PW", nup.setHashing(nup.setHashing(user_new_pw, new_SALT), new_SALT));

            	cnt = adminDAO.updatePwdUser(paramMap);

            	if(paramMap.get("PWS_EDIT_YN").toString().equals("N")) {
            		paramMap.put("PWS_EDIT_YN", "Y");
            		cnt = adminDAO.updatePwdEditYn(paramMap);
            	}

    		}
    		else {
    			resultMap.put("error", "NOT");
    			return resultMap;
    		}


    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public List getDesmDefaultProject(Map<String, Object> paramMap) {
        return adminDAO.getDesmDefaultProject(paramMap);
    }

    @Override
    public List getDesmDefaultCountry(Map<String, Object> paramMap) {
        return adminDAO.getDesmDefaultCountry(paramMap);
    }


    @Override
	public List getMail(Map<String, Object> paramMap) throws Exception {
    	  return adminDAO.getMail(paramMap);
	}

    @Override
    public List getProjectSupplyScope(Map<String, Object> paramMap) throws Exception {
    	List<Map<String, String>> list = adminDAO.getProjectSupplyScope(paramMap);
    	for(Map<String, String> m : list){
    		if(m.get("ATTRIBUTE6") == null)m.put("ATTRIBUTE6", "");
    	}
    	return list;
    }

    @Override
    public int insertMail(Map<String, Object> paramMap) {
    	this.scriptCheck(paramMap);

    	paramMap.put("ddlExceptScope", String.valueOf(paramMap.get("ddlExceptScope")).replace("]", "").replace("[", "").replace(", ", ","));
    	int rtn = 0;
    	if("add".equals(paramMap.get("mode"))){
    		List list= adminDAO.getMail(paramMap);
    		if(list.size() == 0){
    			rtn = adminDAO.insertMail(paramMap);
    		}else{
    			rtn = -1;
    		}
    	}else{
    		rtn = adminDAO.insertMail(paramMap);
    	}

        return rtn;
    }

	@Override
    public int saveDesmDefaultProjectSave(Map<String, Object> paramMap) {
    	int cnt = 0;
    	paramMap.put("P_USER_AD", paramMap.get("USER_AD"));
    	cnt = adminDAO.deleteDesmDefaultProject(paramMap);
    	cnt = adminDAO.saveDesmDefaultProject(paramMap);


        return cnt;
    }

    @Override
    public int saveDesmDefaultCountrySave(Map<String, Object> paramMap) {
    	int cnt = 0;
    	paramMap.put("P_USER_AD", paramMap.get("USER_AD"));
    	cnt = adminDAO.deleteDesmDefaultCountry(paramMap);
    	cnt = adminDAO.saveDesmDefaultCountry(paramMap);


        return cnt;
    }

    @Override
    public int initDesmPwd(Map<String, Object> paramMap) throws Exception {


    	int cnt = 0;

    	try {

			UserPasword nup = new UserPasword();
    		String user_new_pw = "123qwer@";
    		String new_SALT = nup.getSALT();


			paramMap.put("USER_PW_SALT", new_SALT);
			paramMap.put("USER_PW", nup.setHashing(nup.setHashing(user_new_pw, new_SALT), new_SALT));

        	cnt = adminDAO.updatePwdUser(paramMap);

        	paramMap.put("PWS_EDIT_YN", "N");
        	cnt = adminDAO.updatePwdEditYn(paramMap);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

    @Override
    public int sendFcmRole(Map<String, Object> paramMap) throws Exception {


    	int cnt = 0;

    	try {

			JSONArray list = JSONArray.fromObject(paramMap.get("sendRoleList").toString());
			paramMap.put("list", list);
			List<Map<String, Object>> fcmTokenList = adminDAO.getRolefcmToken(paramMap);

	    	for(int i = 0; i < fcmTokenList.size(); i++) {
	    		Map<String, Object> fcmTokenRow = fcmTokenList.get(i);
	    		fcmTokenRow.put("TITLE", paramMap.get("TITLE"));
	    		fcmTokenRow.put("BODY", paramMap.get("BODY"));
	    		fcmTokenRow.put("PROJECT_NO", paramMap.get("PROJECT_NO"));

				String response = firebaseService.sendByFcmToken(fcmTokenRow.get("FCM_TOKEN").toString(), fcmTokenRow.get("TITLE").toString(), fcmTokenRow.get("BODY").toString());
				//String response = "AA";
				fcmTokenRow.put("RESPONSE", response);
				firebaseService.saveFcmTokenHistory(fcmTokenRow);

	    	}

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

    @Override
    public int updateUserPwNull(Map<String, Object> paramMap) throws Exception {
    	int cnt = 0;
    	try {

    		cnt = adminDAO.updateUserPwNull(paramMap);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}


        return cnt;
    }



	@Override
	public int deleteMail(Map<String, Object> paramMap) {
		return adminDAO.deleteMail(paramMap);
	}

	@Override
	public Map<String, Object> mailSend(Map<String, Object> paramMap) throws Exception {

		Map<String, Object> results = new HashMap<>(); // Browser console log 확인 용도

		String loc = propertiesService.getString("location");
    	String loginUrl = loc.equals("dev") ? propertiesService.getString("mail.login.url.dev") : propertiesService.getString("mail.login.url.prod");

    	// EWS PROJECT별 체크 대상 기준 SETUP정보 확인
		List<Map<String, String>> mailSetup = adminDAO.getMailLower(paramMap);
		results.put("mailSetup", mailSetup);

		List<Map<String, String>> mailList;
		List<Map<String, String>> mailReceiverList;
		List<Map<String, Object>> mailSendList = null; // 메일 보낼 때 최상위 레벨 데이터, List로 가지만 보통 하나만 담아서 보냄

		Map<String, Object> content;
		Map<String, Object> rowData;

		DecimalFormat formatter = new DecimalFormat("###,###");

		// PROJECT_NO별로 mailSetup, 돌면서 체크
		for(Map<String, String> setup : mailSetup) {
			// Setup 기준에 맞게 기자재 일정관리 Summary 정보 추출
			mailList = adminDAO.mailList(setup);
			// Project No 메일 수신자 추출
			mailReceiverList = adminDAO.mailReceiverList(setup);

			mailSendList = new ArrayList<>();
			results.put("mailList", mailList);
			results.put("mailReceiverList", mailReceiverList);

			//공급일정 및 담당자 업데이트 Mail 본문 내용 가공
			int pmc=0,emc=0,ptc=0,etc=0,ppc=0,epc=0,pcc=0,ecc=0,pfc=0,efc=0,poc=0,eoc=0,mpmc=0,memc=0,mbuyerc=0,msmc=0,mqcc=0;
			for(Map<String, String> mail : mailList){

				String exceptScope = setup.get("except_scope");
				String supplyScope = mail.get("supply_scope");
				if(supplyScope == null)supplyScope = "N/A";
				if(exceptScope != null && exceptScope.contains( supplyScope ))continue;

				if(("Y".equals(setup.get("l2_yn")) &&  "2".equals(String.valueOf(mail.get("lv"))))
				|| ("Y".equals(setup.get("l3_yn")) &&  "3".equals(String.valueOf(mail.get("lv"))))
				|| ("Y".equals(setup.get("l4_yn")) &&  "4".equals(String.valueOf(mail.get("lv"))))  ){

					if(("Y".equals(setup.get("on_yn")) &&  mail.get("offshore").toUpperCase().contains("ON"))
					|| ("Y".equals(setup.get("off_yn")) &&  mail.get("offshore").toUpperCase().contains("OFF")) ){

						if("Y".equals(setup.get("mps_yn")) && mail.get("mps_plan_date") == null)pmc++;
						if("Y".equals(setup.get("mps_yn")) && mail.get("mps_expected_date") == null)emc++;
						if("Y".equals(setup.get("te_yn")) && mail.get("te_plan_date") == null)ptc++;
						if("Y".equals(setup.get("te_yn")) && mail.get("te_expected_date") == null)etc++;
						if("Y".equals(setup.get("po_yn")) && mail.get("po_plan_date") == null)ppc++;
						if("Y".equals(setup.get("po_yn")) && mail.get("po_expected_date") == null)epc++;
						if("Y".equals(setup.get("cargo_yn")) && mail.get("cargo_plan_date") == null)pcc++;
						if("Y".equals(setup.get("cargo_yn")) && mail.get("cargo_expected_date") == null)ecc++;
						if("Y".equals(setup.get("fob_yn")) && mail.get("fob_plan_date") == null)pfc++;
						if("Y".equals(setup.get("fob_yn")) && mail.get("fob_expected_date") == null)efc++;
						if("Y".equals(setup.get("onsite_yn")) && mail.get("onsite_plan_date") == null)poc++;
						if("Y".equals(setup.get("onsite_yn")) && mail.get("onsite_expected_date") == null)eoc++;

						if(mail.get("pm_ad") == null)mpmc++;
						if(mail.get("em_ad") == null)memc++;
						if(mail.get("buyer_ad") == null)mbuyerc++;
						if(mail.get("sm_ad") == null)msmc++;
						if(mail.get("qc_ad") == null)mqcc++;

					}
				}
			}

			// 메일 본문 Parameter 매핑을 위한 content 입력
			content = new HashMap<String, Object>();
			content.put("project_no", setup.get("project_no"));
			content.put("project_name", setup.get("project_name"));
			content.put("pmc",   ("Y".equals(setup.get("mps_yn"))) ? formatter.format(pmc) : "N/A"   );
			content.put("emc",   ("Y".equals(setup.get("mps_yn"))) ? formatter.format(emc) : "N/A"   );
			content.put("ptc",   ("Y".equals(setup.get("te_yn"))) ? formatter.format(ptc) : "N/A"    );
			content.put("etc",   ("Y".equals(setup.get("te_yn"))) ? formatter.format(etc) : "N/A"    );
			content.put("ppc",   ("Y".equals(setup.get("po_yn"))) ? formatter.format(ppc) : "N/A"    );
			content.put("epc",   ("Y".equals(setup.get("po_yn"))) ? formatter.format(epc) : "N/A"    );
			content.put("pcc",   ("Y".equals(setup.get("cargo_yn"))) ? formatter.format(pcc) : "N/A" );
			content.put("ecc",   ("Y".equals(setup.get("cargo_yn"))) ? formatter.format(ecc) : "N/A" );
			content.put("pfc",   ("Y".equals(setup.get("fob_yn"))) ? formatter.format(pfc) : "N/A"   );
			content.put("efc",   ("Y".equals(setup.get("fob_yn"))) ? formatter.format(efc) : "N/A"   );
			content.put("poc",   ("Y".equals(setup.get("onsite_yn"))) ? formatter.format(poc) : "N/A");
			content.put("eoc",   ("Y".equals(setup.get("onsite_yn"))) ? formatter.format(eoc) : "N/A");
			content.put("mpmc",     formatter.format(mpmc)   );
			content.put("memc",     formatter.format(memc)   );
			content.put("mbuyerc",  formatter.format(mbuyerc));
			content.put("msmc",     formatter.format(msmc)   );
			content.put("mqcc",     formatter.format(mqcc)   );
			content.put("login_url", loginUrl);

			// Mail 수신자 리스트로 Loop 돌면서 개별 발송
			// TODO: 수신자 List to_list_addr로 일괄 발송
			for(Map<String, String> receiver : mailReceiverList){
				rowData = new HashMap<String, Object>();
				rowData.put("from_addr", "ews_desm@doosan.com");
				rowData.put("from_nm", "DESM Alarm Service");

				rowData.put("to_addr", receiver.get("mail"));
				rowData.put("USER_AD", receiver.get("user_ad"));
				rowData.put("PROJECT_NO", setup.get("project_no"));
				LOGGER.info("Send User : " + receiver.get("user_ad") + " - " + receiver.get("mail"));

				if(loc.equals("dev")) {
					rowData.put("to_addr", "hojun8.lee@doosan.com");
					rowData.put("USER_AD", "HOJUN8.LEE");
				}

				rowData.put("title", "");
				rowData.put("data", content); // content 입력
				rowData.put("email_title", "[DESM " + setup.get("project_name") + "] 공급일정 및 담당자 입력 현황");

				mailSendList.add(rowData);
			}
			// TODO end

//			desmService.addMail("DESM_SUPPLY_SUMMARY_MAIL", mailSendList);
		}
		results.put("mailSendList", mailSendList);
		return results;
	}

	@Override
	public Map<String, Object> mailSendUser(Map<String, Object> paramMap) throws Exception {

		Map<String, Object> results = new HashMap<>(); // Browser console log 확인 용도
		String loc = propertiesService.getString("location");

    	// EWS PROJECT별 체크 대상 기준 SETUP정보 확인
		List<Map<String, String>> mailSetup = adminDAO.getMailLower(paramMap);
		//확인용
//		results.put("mailSetup", mailSetup);

		List<Map<String, Object>> mailList;
		//summary용 데이터
		Map<String, Object> mailSendSumMap = null;

		Map<String, List<Map<String, Object>>> pmArriveSumMap;
		Map<String, List<Map<String, Object>>> pmDelaySumMap;
		Map<String, List<Map<String, Object>>> emArriveSumMap;
		Map<String, List<Map<String, Object>>> emDelaySumMap;
		Map<String, List<Map<String, Object>>> buyerArriveSumMap;
		Map<String, List<Map<String, Object>>> buyerDelaySumMap;
		Map<String, List<Map<String, Object>>> smArriveSumMap;
		Map<String, List<Map<String, Object>>> smDelaySumMap;

		Map<String,Map<String,Object>> userSumMap;

		//담당자용 데이터
		Map<String, Object> mailSendMap = null;

		Map<String, List<Map<String, Object>>> pmArriveMap;
		Map<String, List<Map<String, Object>>> pmDelayMap;
		Map<String, List<Map<String, Object>>> emArriveMap;
		Map<String, List<Map<String, Object>>> emDelayMap;
		Map<String, List<Map<String, Object>>> buyerArriveMap;
		Map<String, List<Map<String, Object>>> buyerDelayMap;
		Map<String, List<Map<String, Object>>> smArriveMap;
		Map<String, List<Map<String, Object>>> smDelayMap;

		Map<String,Map<String,Object>> userMap;

		//lv1
		List<Map<String, Object>> l1ItemList;
		Map<String,Map<String,Object>> summaryl1ResultMap;
		Map<String,Object> summaryl1ResultDetailMap = null;
		List<Map<String, Object>> sumLevelList;
		Map<String, Object> sumLevelTotalMap;

		//팀장
		List<Map<String, Object>> teamList;
		Map<String,Map<String,Object>> summaryTeamResultMap;
		Map<String,Object> summaryTeamResultDetailMap = null;
		List<Map<String, Object>> sumTeamList;
		Map<String, Object> sumTeamTotalMap;

		Map<String, Object> sumTempMap;
		Map<String, Object> tempMap;

		Map<String,List<String>> typeMap = new HashMap<>();
		typeMap.put("em", new ArrayList<>(Arrays.asList("mps", "te")));
		typeMap.put("buyer", new ArrayList<>(Arrays.asList("po")));
		typeMap.put("sm", new ArrayList<>(Arrays.asList("cargo")));
		typeMap.put("pm", new ArrayList<>(Arrays.asList("fob", "onsite")));

		// PROJECT_NO별로 mailSetup, 돌면서 체크
		for(Map<String, String> setup : mailSetup) {
			// Setup 기준에 맞게 기자재 일정관리 Summary 정보 추출
			mailList = adminDAO.mailList(setup);
			//확인용
//			results.put("mailList", mailList);


			pmArriveMap = new HashMap<>();
			pmDelayMap = new HashMap<>();
			emArriveMap = new HashMap<>();
			emDelayMap = new HashMap<>();
			buyerArriveMap = new HashMap<>();
			buyerDelayMap = new HashMap<>();
			smArriveMap = new HashMap<>();
			smDelayMap = new HashMap<>();

			userMap = new HashMap<>();
			mailSendMap = new HashMap<>();


			pmArriveSumMap = new HashMap<>();
			pmDelaySumMap = new HashMap<>();
			emArriveSumMap = new HashMap<>();
			emDelaySumMap = new HashMap<>();
			buyerArriveSumMap = new HashMap<>();
			buyerDelaySumMap = new HashMap<>();
			smArriveSumMap = new HashMap<>();
			smDelaySumMap = new HashMap<>();

			userSumMap = new HashMap<>();
			mailSendSumMap = new HashMap<>();
			//공급일정 및 담당자 업데이트 Mail 본문 내용 가공
			for(Map<String, Object> mail : mailList){
				String exceptScope = setup.get("except_scope");
				String supplyScope = String.valueOf(mail.get("supply_scope"));
				if(supplyScope == null)supplyScope = "N/A";
				if(exceptScope != null && exceptScope.contains( supplyScope ))continue;

				if(("Y".equals(setup.get("l2_yn")) &&  "2".equals(String.valueOf(mail.get("lv"))))
				|| ("Y".equals(setup.get("l3_yn")) &&  "3".equals(String.valueOf(mail.get("lv"))))
				|| ("Y".equals(setup.get("l4_yn")) &&  "4".equals(String.valueOf(mail.get("lv"))))  ){

					if(("Y".equals(setup.get("on_yn")) &&  String.valueOf(mail.get("offshore")).toUpperCase().contains("ON"))
					|| ("Y".equals(setup.get("off_yn")) &&  String.valueOf(mail.get("offshore")).toUpperCase().contains("OFF")) ){
						if(mail.get("pm_ad") != null)userMap.put(mail.get("pm_ad").toString(),mail);  // PM
						if(mail.get("em_ad") != null)userMap.put(mail.get("em_ad").toString(),mail);  // 설계
						if(mail.get("buyer_ad") != null)userMap.put(mail.get("buyer_ad").toString(),mail); // 구매
						if(mail.get("sm_ad") != null)userMap.put(mail.get("sm_ad").toString(),mail); // 공정

						setStatus(typeMap,mail,setup);

						setMailMap(mail.get("mps_status")+"#"+mail.get("te_status"),emArriveMap,emDelayMap,mail.get("em_ad"),mail); // 설계
						setMailMap(String.valueOf(mail.get("po_status")),buyerArriveMap,buyerDelayMap,mail.get("buyer_ad"),mail); // 구매
						setMailMap(String.valueOf(mail.get("cargo_status")),smArriveMap,smDelayMap,mail.get("sm_ad"),mail); // 공정
						setMailMap(mail.get("fob_status")+"#"+mail.get("onsite_status"),pmArriveMap,pmDelayMap,mail.get("pm_ad"),mail); // PM

					}
				}

				//summary용
				if(("Y".equals(setup.get("on_yn")) &&  String.valueOf(mail.get("offshore")).toUpperCase().contains("ON"))
				|| ("Y".equals(setup.get("off_yn")) &&  String.valueOf(mail.get("offshore")).toUpperCase().contains("OFF")) ){
					if(mail.get("pm_ad") != null)userSumMap.put(mail.get("pm_ad").toString(),mail);
					if(mail.get("em_ad") != null)userSumMap.put(mail.get("em_ad").toString(),mail);
					if(mail.get("buyer_ad") != null)userSumMap.put(mail.get("buyer_ad").toString(),mail);
					if(mail.get("sm_ad") != null)userSumMap.put(mail.get("sm_ad").toString(),mail);

					setStatus(typeMap,mail,setup);

					setMailMap(mail.get("mps_status")+"#"+mail.get("te_status"),emArriveSumMap,emDelaySumMap,mail.get("em_ad"),mail); // PM
					setMailMap(String.valueOf(mail.get("po_status")),buyerArriveSumMap,buyerDelaySumMap,mail.get("buyer_ad"),mail); // 설계
					setMailMap(String.valueOf(mail.get("cargo_status")),smArriveSumMap,smDelaySumMap,mail.get("sm_ad"),mail); // 구매
					setMailMap(mail.get("fob_status")+"#"+mail.get("onsite_status"),pmArriveSumMap,pmDelaySumMap,mail.get("pm_ad"),mail); // 공정

				}



			}


			mailSendMap.put("pm",sendUserMail("pm",userMap,pmArriveMap,pmDelayMap,setup));
			mailSendMap.put("em",sendUserMail("em",userMap,emArriveMap,emDelayMap,setup));
			mailSendMap.put("buyer",sendUserMail("buyer",userMap,buyerArriveMap,buyerDelayMap,setup));
			mailSendMap.put("sm",sendUserMail("sm",userMap,smArriveMap,smDelayMap,setup));

			mailSendSumMap.put("pm",sendUserMail("pm",userSumMap,pmArriveSumMap,pmDelaySumMap,setup));
			mailSendSumMap.put("em",sendUserMail("em",userSumMap,emArriveSumMap,emDelaySumMap,setup));
			mailSendSumMap.put("buyer",sendUserMail("buyer",userSumMap,buyerArriveSumMap,buyerDelaySumMap,setup));
			mailSendSumMap.put("sm",sendUserMail("sm",userSumMap,smArriveSumMap,smDelaySumMap,setup));

			//확인용
//			results.put("pmArriveMap", pmArriveMap);
//			results.put("pmDelayMap", pmDelayMap);
//			results.put("emArriveMap", emArriveMap);
//			results.put("emDelayMap", emDelayMap);
//			results.put("buyerArriveMap", buyerArriveMap);
//			results.put("buyerDelayMap", buyerDelayMap);
//			results.put("smArriveMap", smArriveMap);
//			results.put("smDelayMap", smDelayMap);



			//LV1 합계 정보
			l1ItemList = adminDAO.l1ItemList(setup);
			//확인용
//			results.put("l1ItemList", l1ItemList);

			summaryl1ResultMap = new HashMap<>();
			for(Map<String, Object> l1item : l1ItemList){
				summaryl1ResultMap.put(l1item.get("lv1_name").toString(), new HashMap<String,Object>());
			}

			List<Map<String, Object>> arriveList;
			List<Map<String, Object>> delayList;
			for(String key: mailSendSumMap.keySet()){
				for(Map<String,Object> map : (List<Map<String, Object>>)mailSendSumMap.get(key)){
					arriveList = (List) ((Map)map.get("data")).get("list_arrive");
					delayList = (List) ((Map)map.get("data")).get("list_delay");
					setSummaryCount(typeMap,"_arrive_count",key, "lv1_name", arriveList, summaryl1ResultMap, summaryl1ResultDetailMap);
					setSummaryCount(typeMap,"_delay_count",key, "lv1_name", delayList, summaryl1ResultMap, summaryl1ResultDetailMap);
				}
			}

			sumLevelList = new ArrayList<>();
			sumLevelTotalMap = new HashMap<>();
			for(String key : summaryl1ResultMap.keySet()){
				sumTempMap = summaryl1ResultMap.get(key);
				tempMap = new HashMap<>(sumTempMap);
				for(String k : sumTempMap.keySet()){
					String totalCount = "";
					if(k.contains("delay")){
						totalCount = "total_delay_count";
					}else if(k.contains("arrive")){
						totalCount = "total_arrive_count";
					}
					setMapCountValue(tempMap,totalCount,tempMap.get(k));
					setMapCountValue(sumLevelTotalMap,k,tempMap.get(k));
				}
				tempMap.put("lv1_item_name", key);
				sumLevelList.add(tempMap);
			}

			sumLevelList.sort(new Comparator<Map<String, Object>>() {
				@Override
				public int compare(Map<String, Object> o1, Map<String, Object> o2) {
					return o1.get("lv1_item_name").toString().compareTo(o2.get("lv1_item_name").toString());
				}
			});

			tempMap = new HashMap<>(sumLevelTotalMap);
			for(String k : sumLevelTotalMap.keySet()){
				if(k.contains("delay")){
					setMapCountValue(tempMap,"total_delay_count",tempMap.get(k));
				}else if(k.contains("arrive")){
					setMapCountValue(tempMap,"total_arrive_count",tempMap.get(k));
				}
			}
			tempMap.put("lv1_item_name", "Total");
			sumLevelList.add(tempMap);

			//확인용
			results.put("sumLevelList", sumLevelList);



			//팀별 합계
			teamList = adminDAO.teamList(setup);
			//확인용
//			results.put("teamList", teamList);

			summaryTeamResultMap = new HashMap<>();
			for(Map<String, Object> team : teamList){
				summaryTeamResultMap.put(team.get("zorg_nm").toString(), new HashMap<String,Object>());
			}

			sumTeamTotalMap = new HashMap<>();
			for(String key: mailSendSumMap.keySet()){
				for(Map<String,Object> map : (List<Map<String, Object>>)mailSendSumMap.get(key)){
					arriveList = (List) ((Map)map.get("data")).get("list_arrive");
					delayList = (List) ((Map)map.get("data")).get("list_delay");
					setSummaryCount(typeMap,"_arrive_count",key, key+"_zorg_nm", arriveList, summaryTeamResultMap, summaryTeamResultDetailMap);
					setSummaryCount(typeMap,"_delay_count",key, key+"_zorg_nm", delayList, summaryTeamResultMap, summaryTeamResultDetailMap);
				}
			}

			sumTeamList = new ArrayList<>();
			sumTeamTotalMap = new HashMap<>();
			for(String key : summaryTeamResultMap.keySet()){
				sumTempMap = summaryTeamResultMap.get(key);
				tempMap = new HashMap<>(sumTempMap);
				for(String k : sumTempMap.keySet()){
					String totalCount = "";
					if(k.contains("delay")){
						totalCount = "total_delay_count";
					}else if(k.contains("arrive")){
						totalCount = "total_arrive_count";
					}
					setMapCountValue(tempMap,totalCount,tempMap.get(k));
					setMapCountValue(sumTeamTotalMap,k,tempMap.get(k));
				}
				tempMap.put("dept_name", key);
				sumTeamList.add(tempMap);
			}

			sumTeamList.sort(new Comparator<Map<String, Object>>() {
				@Override
				public int compare(Map<String, Object> o1, Map<String, Object> o2) {
					return o1.get("dept_name").toString().compareTo(o2.get("dept_name").toString());
				}
			});

			tempMap = new HashMap<>(sumTeamTotalMap);
			for(String k : sumTeamTotalMap.keySet()){
				if(k.contains("delay")){
					setMapCountValue(tempMap,"total_delay_count",tempMap.get(k));
				}else if(k.contains("arrive")){
					setMapCountValue(tempMap,"total_arrive_count",tempMap.get(k));
				}
			}
			tempMap.put("dept_name", "Total");
			sumTeamList.add(tempMap);

			//확인용
			results.put("sumTeamList", sumTeamList);





			//팀장 메일발송
			Map<String,Object> rowData;
			Map<String,Object> content;
			List<Map<String, Object>> mailSendList = new ArrayList<>();
			for(Map<String, Object> team : teamList){
				rowData = new HashMap<String, Object>();
				rowData.put("from_addr", "ews_desm@doosan.com");
				rowData.put("from_nm", "DESM Alarm Service");
				rowData.put("USER_AD", team.get("team_leader_num"));
				rowData.put("to_addr", team.get("team_leader_email"));
				rowData.put("PROJECT_NO", setup.get("project_no"));
	//			if(loc.equals("dev")) {
	//				rowData.put("to_addr", "hojun8.lee@doosan.com");
	//			}

				// 메일 본문 Parameter 매핑을 위한 content 입력
				content = new HashMap<String, Object>();
				content.put("project_no", setup.get("project_no"));
				content.put("project_name", setup.get("project_name"));
				content.put("manager_name", team.get("team_leader_name"));
				content.put("manager_dept_name", team.get("zorg_nm"));
				content.put("list_sum_level", sumLevelList);
				content.put("list_sum_dept", sumTeamList);

				rowData.put("title", "");
				rowData.put("data", content); // content 입력
				rowData.put("email_title", "[DESM " + setup.get("project_name") + "] 기자재 공급일정도래 및 지연 Notice");

				mailSendList.add(rowData);
			}
			//팀장 메일발송
//			desmService.addMail("DESM_SUPPLY_DATE_TL_MAIL" , mailSendList);

			//확인용
			results.put("mailSendList", mailSendList);


			//담당자메일 발송
			List<Map<String, Object>> tempList;
			List<Map<String, Object>> workList;
			for(String key: mailSendMap.keySet()){
				tempList = (List<Map<String, Object>>)mailSendMap.get(key);
				workList = new ArrayList<>(tempList);

				for(Map<String,Object> map :  tempList){
					//퇴사자 발송X
					if("N".equals(map.get("use_yn"))){
						workList.remove(map);
						continue;
					}
					content = (Map<String, Object>) map.get("data");
					content.put("list_sum_level", sumLevelList);
					content.put("list_sum_dept", sumTeamList);

					//20개 이상 제거
					arriveList = (List<Map<String, Object>>) content.get("list_arrive");
					delayList = (List<Map<String, Object>>) content.get("list_delay");
					for(int i = arriveList.size()-1; i >= 20 ; i --)arriveList.remove(i);
					for(int i = delayList.size()-1; i >= 20 ; i --)delayList.remove(i);


				}
				//담당자메일 발송
//				desmService.addMail("DESM_SUPPLY_DATE_"+ key.toUpperCase() + "_MAIL" , workList);
			}

		}

		//확인용
		results.put("mailSendMap", mailSendMap);
		results.put("mailSendSumMap", mailSendSumMap);

		return results;
	}

	private void setSummaryCount(Map<String,List<String>> typeMap, String kind, String key, String name ,List<Map<String, Object>> dataList, Map<String,Map<String,Object>> summaryResultMap, Map<String, Object> summaryResultDetailMap){
		if(dataList != null){
			for(Map<String, Object> arriveMap : dataList){
				if(summaryResultMap.containsKey(arriveMap.get(name))){
					summaryResultDetailMap = summaryResultMap.get(arriveMap.get(name));
					for(String type : typeMap.get(key)) {
						if(arriveMap.get(type+"_week") != null && !"".equals(arriveMap.get(type+"_week"))){
							setMapCountAuto(summaryResultDetailMap,type+kind);
						}
					}
					summaryResultMap.put(String.valueOf(arriveMap.get(name)), summaryResultDetailMap);
				}
			}
		}
	}

	private void setMapCountAuto(Map<String, Object> map , String key){
		if(map.containsKey(key)){
			map.put(key,Integer.parseInt(map.get(key).toString())+1);
		}else{
			map.put(key,1);
		}
	}

	private void setMapCountValue(Map<String, Object> map , String key, Object value){
		if(map.containsKey(key)){
			int v = value == null ? 0 : Integer.parseInt(value.toString());
			map.put(key,Integer.parseInt(map.get(key).toString()) + v);
		}else{
			map.put(key,value);
		}
	}

	private void setStatus(Map<String,List<String>> typeMap, Map<String, Object> mail,Map<String, String> setup){
		long cu = System.currentTimeMillis();
		long w1 = cu + 1000*60*60*24*7;
		long w2 = w1 + 1000*60*60*24*7;
		long w3 = w2 + 1000*60*60*24*7;

		for(String nameType : typeMap.keySet()){
			for(String type : typeMap.get(nameType)){
				if("Y".equals(setup.get(type+"_yn")) && mail.get(type+"_actual_date") == null && mail.get(type+"_expected_date") != null && mail.get(nameType+"_ad") != null){
					String status = "";

					long ed = ((Timestamp)mail.get(type+"_expected_date")).getTime();
					if(cu > ed) {
						status = ((int)((cu - ed)/(1000*60*60*24*7))+1) +  "주 지연";
					}
					else if(w3 <= ed) status = "";
					else if(w3 < ed) status = "납기 4주 전";
					else if(w2 < ed) status = "납기 3주 전";
					else if(w1 < ed) status = "납기 2주 전";
					else if(cu < ed) status = "납기 1주 전";
					mail.put(type+"_status", status);
					mail.put(type+"_week", status);
				}
			}
		}
	}

	private void setMailMap(String condition, Map<String, List<Map<String, Object>>> arriveMap,Map<String, List<Map<String, Object>>> delayMap, Object mapKey, Map<String, Object> mail){
		if( condition != null ) {
			String key = String.valueOf(mapKey);
			List<Map<String, Object>> userMailList;
			String[] c = condition.split("#");
			for(int i = 0 ; i < c.length ; i ++){
				if(c[i].contains("납기")){
					if(arriveMap.get(key) == null){
						userMailList = new ArrayList<>();
					}else{
						userMailList = arriveMap.get(key);
					}
					userMailList.add(mail);
					arriveMap.put(key, userMailList);
					break;
				}else if(c[i].contains("지연")){
					if(delayMap.get(key) == null){
						userMailList = new ArrayList<>();
					}else{
						userMailList = delayMap.get(key);
					}
					userMailList.add(mail);
					delayMap.put(key, userMailList);
					break;
				}
			}
		}
	}

	private List<Map<String, Object>> sendUserMail(String mailType ,Map<String,Map<String,Object>> userMap,Map<String, List<Map<String, Object>>> arriveMap , Map<String, List<Map<String, Object>>> delayMap ,Map<String, String> setup ) throws Exception{
		Map<String, Object> content;
		Map<String, Object> rowData;
		List<Map<String, Object>> mailSendList = new ArrayList<>();
		String loc = propertiesService.getString("location");

		// Mail 수신자 리스트로 Loop 돌면서 개별 발송
		// TODO: 수신자 List to_list_addr로 일괄 발송
		for(String key: userMap.keySet()){
			if(arriveMap.containsKey(key) || delayMap.containsKey(key)){
				String ad = String.valueOf(userMap.get(key).get(mailType+"_ad"));
				String name = String.valueOf(userMap.get(key).get(mailType+"_name"));
				String mail = String.valueOf(userMap.get(key).get(mailType+"_email"));
				String orgId = String.valueOf(userMap.get(key).get(mailType+"_zorg_id"));
				String orgName = String.valueOf(userMap.get(key).get(mailType+"_zorg_nm"));
				String useYn = String.valueOf(userMap.get(key).get(mailType+"_user_yn"));
				rowData = new HashMap<String, Object>();
				rowData.put("from_addr", "ews_desm@doosan.com");
				rowData.put("from_nm", "DESM Alarm Service");
				rowData.put("USER_AD", ad);
				rowData.put("to_addr", mail);
				rowData.put("org_id", orgId);
				rowData.put("org_name", orgName);
				rowData.put("use_yn", useYn);
				rowData.put("PROJECT_NO", setup.get("project_no"));
	//			if(loc.equals("dev")) {
	//				rowData.put("to_addr", "hojun8.lee@doosan.com");
	//			}

				// 메일 본문 Parameter 매핑을 위한 content 입력
				content = new HashMap<String, Object>();
				content.put("project_no", setup.get("project_no"));
				content.put("project_name", setup.get("project_name"));
				content.put("manager_name", name);
				content.put("manager_dept_name", orgName);
				content.put("list_arrive", arriveMap.get(key) == null ? new ArrayList<>() : arriveMap.get(key));
				content.put("list_delay", delayMap.get(key) == null ? new ArrayList<>() : delayMap.get(key));

				rowData.put("type", mailType);
				rowData.put("title", "");
				rowData.put("data", content); // content 입력
				rowData.put("email_title", "[DESM " + setup.get("project_name") + "] 기자재 공급일정도래 및 지연 Notice");

				mailSendList.add(rowData);
			}
		}
		// TODO end
		return mailSendList;
	}

	@Override
	public List getMaterialSetup(Map<String, Object> paramMap) throws Exception {
    	  return adminDAO.getMaterialSetup(paramMap);
	}
	
	@Override
    public int saveMaterialSetup(Map<String, Object> paramMap) {
    	this.scriptCheck(paramMap);

    	int rtn = 0;
    	if("add".equals(paramMap.get("mode"))){
    		List list= adminDAO.getMaterialSetup(paramMap);
    		if(list.size() == 0){
    			rtn = adminDAO.saveMaterialSetup(paramMap);
    		}else{
    			rtn = -1;
    		}
    	}else{
    		rtn = adminDAO.saveMaterialSetup(paramMap);
    	}

        return rtn;
    }
	
	@Override
	public int deleteMaterialSetup(Map<String, Object> paramMap) {
		return adminDAO.deleteMaterialSetup(paramMap);
	}
}

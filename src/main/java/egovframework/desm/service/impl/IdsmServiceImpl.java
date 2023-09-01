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

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.desm.service.IdsmService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service("idsmService")
public class IdsmServiceImpl extends EgovAbstractServiceImpl implements IdsmService {

	private static final Logger LOGGER = LoggerFactory.getLogger(IdsmServiceImpl.class);


	@Resource(name = "idsmDAO")
	private IdsmDAO idsmDAO;

    @Override
    public List getIdsmSetupProject(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();

    	try {
        	idsmDAO.updateSetLanguage(null);
        	list = idsmDAO.getIdsmSetupProject(paramMap);

        	HashMap<String, Object> map = new HashMap<String, Object>();


        	for (Object el : list) {
        		HashMap<String, String> row = (HashMap)el;

        		map = new HashMap<String, Object>();
        		map.put("label",
            			row.get("SEGMENT1").toString() + "&nbsp;&nbsp;" +
            			row.get("NAME").toString()
            	);
        		map.put("value",
            			row.get("PROJECT_ID").toString() + "|" +
            			row.get("SEGMENT1").toString() + "|" +
            			row.get("NAME").toString() + "|" +
            			row.get("DATA_YN").toString()
            	);
            	retList.add(map);
        	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}


        return retList;
    }

	@Override
    public List getPo(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();

    	try {
        	idsmDAO.updateSetLanguage(null);

        	if(paramMap.get("supplier_yn").toString().equals("Y")) {
    			paramMap.put("SUPPLIER_NO", paramMap.get("USER_AD"));
        	}

        	list = idsmDAO.getPo(paramMap);

        	HashMap<String, Object> map = new HashMap<String, Object>();


        	for (Object el : list) {
        		HashMap<String, String> row = (HashMap)el;

        		map = new HashMap<String, Object>();
        		map.put("label",
            			row.get("PO_NO").toString() + "&nbsp;&nbsp;" +
            			row.get("PO_DESCRIPTION").toString()
            	);

        		String PROJECT_CODE = row.get("PROJECT_CODE") == null ? "" : row.get("PROJECT_CODE").toString();
        		String PROJECT_NAME = row.get("PROJECT_NAME") == null ? "" : row.get("PROJECT_NAME").toString();
        		String PRODUCT_NAME = row.get("PRODUCT_NAME") == null ? "" : row.get("PRODUCT_NAME").toString();

        		map.put("value",
            			row.get("PO_NO").toString() + "|" +
            			row.get("PO_DESCRIPTION").toString() + "|" +
            			row.get("SUPPLIER_NUMBER").toString() + "|" +
            			row.get("SUPPLIER_NAME").toString() + "|" +
            			row.get("PROMISED_DATE").toString() + "|" +
            			row.get("MPR_DATE").toString() + "|" +
            			PROJECT_CODE + "|" +
            			PROJECT_NAME + "|" +
            			PRODUCT_NAME

            	);
            	retList.add(map);
        	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}


        return retList;
    }

    @Override
    public List getDesmDlgPoList(Map<String, Object> paramMap) {
    	if(paramMap.get("supplier_yn").toString().equals("Y")) {
			paramMap.put("SUPPLIER_NO", paramMap.get("USER_AD"));
    	}
        return idsmDAO.getPo(paramMap);
    }

    @Override
    public List getIdsmProjectMgtProject(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();

    	try {
        	idsmDAO.updateSetLanguage(null);
        	list = idsmDAO.getIdsmProjectMgtProject(paramMap);

        	HashMap<String, Object> map = new HashMap<String, Object>();


        	for (Object el : list) {
        		HashMap<String, String> row = (HashMap)el;

        		map = new HashMap<String, Object>();
        		map.put("label",
            			row.get("SEGMENT1").toString() + "&nbsp;&nbsp;" +
            			row.get("NAME").toString()
            	);
        		map.put("value",
            			row.get("PROJECT_ID").toString() + "|" +
            			row.get("SEGMENT1").toString() + "|" +
            			row.get("NAME").toString()
            	);
            	retList.add(map);
        	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}


        return retList;
    }

    @Override
    public List getBlrSchmapProject(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();

    	try {
        	idsmDAO.updateSetLanguage(null);
        	list = idsmDAO.getBlrSchmapProject(paramMap);

        	HashMap<String, Object> map = new HashMap<String, Object>();


        	for (Object el : list) {
        		HashMap<String, String> row = (HashMap)el;

        		map = new HashMap<String, Object>();
        		map.put("label",
            			row.get("PROJECT_NO").toString() + "&nbsp;&nbsp;" +
            			row.get("PROJECT_DESC").toString()
            	);
        		map.put("value",
            			row.get("PROJECT_NO").toString() + "|" +
            			row.get("PROJECT_DESC").toString() + "|" +
            			row.get("DATA_YN").toString()
            	);
            	retList.add(map);
        	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}


        return retList;
    }

    @Override
    public List getIdsmSetup(Map<String, Object> paramMap) {

    	List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

    	List<Map<String, Object>> list = idsmDAO.getIdsmSetup(paramMap);

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
    public int saveIdsmSetup(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
			JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
	    	for(int i = 0; i < updateList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD").toString());


	    		if(row.get("TRK_ITEM_SEQ") == null || row.get("TRK_ITEM_SEQ").toString().equals("")) {
	    			List<Map<String, Object>> seqList = idsmDAO.getIdsmSetupSeq(row);
	    			row.put("TRK_ITEM_SEQ", seqList.get(0).get("SEQ"));
	    		}

				List<Map<String, Object>> dataCheckList = idsmDAO.getIdsmSetupDlgItemScheduleItemEditCheck(row);

				if(dataCheckList.size() > 0) {
					return -1;
				}

	    		cnt = idsmDAO.saveIdsmSetup(row);

	    		this.saveIdsmSetupDlgItemSequence(row);

	    		if(row.get("PM_AD") != null && !row.get("PM_AD").toString().equals("")) {

	    			Map<String, Object> authRow = new HashMap<String, Object>();
	    			authRow.put("TRK_ITEM_SEQ", row.get("TRK_ITEM_SEQ"));
	    			authRow.put("USER_AD", row.get("PM_AD"));
	    			authRow.put("USER_NAME", row.get("PM_NAME"));
	    			authRow.put("USER_JOB", "PM");
	    			authRow.put("AUTH_SCHEDULE", "관리");
	    			authRow.put("P_USER_AD", row.get("USER_AD"));

	    			cnt = idsmDAO.saveIdsmSetupAuth(authRow);
	    		}

	    		if(row.get("EM_AD") != null && !row.get("EM_AD").toString().equals("")) {

	    			Map<String, Object> authRow = new HashMap<String, Object>();
	    			authRow.put("TRK_ITEM_SEQ", row.get("TRK_ITEM_SEQ"));
	    			authRow.put("USER_AD", row.get("EM_AD"));
	    			authRow.put("USER_NAME", row.get("EM_NAME"));
	    			authRow.put("USER_JOB", "EM");
	    			authRow.put("AUTH_SCHEDULE", "관리");
	    			authRow.put("P_USER_AD", row.get("USER_AD"));

	    			cnt = idsmDAO.saveIdsmSetupAuth(authRow);
	    		}

	    		if(row.get("BUYER_AD") != null && !row.get("BUYER_AD").toString().equals("")) {

	    			Map<String, Object> authRow = new HashMap<String, Object>();
	    			authRow.put("TRK_ITEM_SEQ", row.get("TRK_ITEM_SEQ"));
	    			authRow.put("USER_AD", row.get("BUYER_AD"));
	    			authRow.put("USER_NAME", row.get("BUYER_NAME"));
	    			authRow.put("USER_JOB", "BUYER");
	    			authRow.put("AUTH_SCHEDULE", "관리");
	    			authRow.put("P_USER_AD", row.get("USER_AD"));

	    			cnt = idsmDAO.saveIdsmSetupAuth(authRow);
	    		}

	    		if(row.get("QC_AD") != null && !row.get("QC_AD").toString().equals("")) {

	    			Map<String, Object> authRow = new HashMap<String, Object>();
	    			authRow.put("TRK_ITEM_SEQ", row.get("TRK_ITEM_SEQ"));
	    			authRow.put("USER_AD", row.get("QC_AD"));
	    			authRow.put("USER_NAME", row.get("QC_NAME"));
	    			authRow.put("USER_JOB", "QC");
	    			authRow.put("AUTH_SCHEDULE", "관리");
	    			authRow.put("P_USER_AD", row.get("USER_AD"));

	    			cnt = idsmDAO.saveIdsmSetupAuth(authRow);
	    		}

	    		if(row.get("SM_AD") != null && !row.get("SM_AD").toString().equals("")) {

	    			Map<String, Object> authRow = new HashMap<String, Object>();
	    			authRow.put("TRK_ITEM_SEQ", row.get("TRK_ITEM_SEQ"));
	    			authRow.put("USER_AD", row.get("SM_AD"));
	    			authRow.put("USER_NAME", row.get("SM_NAME"));
	    			authRow.put("USER_JOB", "SM");
	    			authRow.put("AUTH_SCHEDULE", "관리");
	    			authRow.put("P_USER_AD", row.get("USER_AD"));

	    			cnt = idsmDAO.saveIdsmSetupAuth(authRow);
	    		}
	    	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

    @Override
    public List<Map<String, Object>> saveIdsmSetupSeq(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;
    	List<Map<String, Object>> rtnList = null;

    	try {
    		rtnList = new ArrayList<>();
			JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
	    	for(int i = 0; i < updateList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD").toString());


	    		if(row.get("TRK_ITEM_SEQ") == null || row.get("TRK_ITEM_SEQ").toString().equals("")) {
	    			List<Map<String, Object>> seqList = idsmDAO.getIdsmSetupSeq(row);
	    			row.put("TRK_ITEM_SEQ", seqList.get(0).get("SEQ"));
	    			rtnList.add(row);
	    		}

				List<Map<String, Object>> dataCheckList = idsmDAO.getIdsmSetupDlgItemScheduleItemEditCheck(row);

				if(dataCheckList.size() > 0) {
	    			rtnList.clear();
					return null;
				}

	    		cnt = idsmDAO.saveIdsmSetup(row);

	    		this.saveIdsmSetupDlgItemSequence(row);

	    		if(row.get("PM_AD") != null && !row.get("PM_AD").toString().equals("")) {

	    			Map<String, Object> authRow = new HashMap<String, Object>();
	    			authRow.put("TRK_ITEM_SEQ", row.get("TRK_ITEM_SEQ"));
	    			authRow.put("USER_AD", row.get("PM_AD"));
	    			authRow.put("USER_NAME", row.get("PM_NAME"));
	    			authRow.put("USER_JOB", "PM");
	    			authRow.put("AUTH_SCHEDULE", "관리");
	    			authRow.put("P_USER_AD", row.get("USER_AD"));

	    			cnt = idsmDAO.saveIdsmSetupAuth(authRow);
	    		}

	    		if(row.get("EM_AD") != null && !row.get("EM_AD").toString().equals("")) {

	    			Map<String, Object> authRow = new HashMap<String, Object>();
	    			authRow.put("TRK_ITEM_SEQ", row.get("TRK_ITEM_SEQ"));
	    			authRow.put("USER_AD", row.get("EM_AD"));
	    			authRow.put("USER_NAME", row.get("EM_NAME"));
	    			authRow.put("USER_JOB", "EM");
	    			authRow.put("AUTH_SCHEDULE", "관리");
	    			authRow.put("P_USER_AD", row.get("USER_AD"));

	    			cnt = idsmDAO.saveIdsmSetupAuth(authRow);
	    		}

	    		if(row.get("BUYER_AD") != null && !row.get("BUYER_AD").toString().equals("")) {

	    			Map<String, Object> authRow = new HashMap<String, Object>();
	    			authRow.put("TRK_ITEM_SEQ", row.get("TRK_ITEM_SEQ"));
	    			authRow.put("USER_AD", row.get("BUYER_AD"));
	    			authRow.put("USER_NAME", row.get("BUYER_NAME"));
	    			authRow.put("USER_JOB", "BUYER");
	    			authRow.put("AUTH_SCHEDULE", "관리");
	    			authRow.put("P_USER_AD", row.get("USER_AD"));

	    			cnt = idsmDAO.saveIdsmSetupAuth(authRow);
	    		}

	    		if(row.get("QC_AD") != null && !row.get("QC_AD").toString().equals("")) {

	    			Map<String, Object> authRow = new HashMap<String, Object>();
	    			authRow.put("TRK_ITEM_SEQ", row.get("TRK_ITEM_SEQ"));
	    			authRow.put("USER_AD", row.get("QC_AD"));
	    			authRow.put("USER_NAME", row.get("QC_NAME"));
	    			authRow.put("USER_JOB", "QC");
	    			authRow.put("AUTH_SCHEDULE", "관리");
	    			authRow.put("P_USER_AD", row.get("USER_AD"));

	    			cnt = idsmDAO.saveIdsmSetupAuth(authRow);
	    		}

	    		if(row.get("SM_AD") != null && !row.get("SM_AD").toString().equals("")) {

	    			Map<String, Object> authRow = new HashMap<String, Object>();
	    			authRow.put("TRK_ITEM_SEQ", row.get("TRK_ITEM_SEQ"));
	    			authRow.put("USER_AD", row.get("SM_AD"));
	    			authRow.put("USER_NAME", row.get("SM_NAME"));
	    			authRow.put("USER_JOB", "SM");
	    			authRow.put("AUTH_SCHEDULE", "관리");
	    			authRow.put("P_USER_AD", row.get("USER_AD"));

	    			cnt = idsmDAO.saveIdsmSetupAuth(authRow);
	    		}
	    	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return rtnList;
    }

    @Override
    public Map getIdsmSetupDlgInvEdit(Map<String, Object> paramMap) {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	List<Map<String, Object>> list = idsmDAO.getIdsmSetupDlgInvEditList(paramMap);
    	List<Map<String, Object>> allList = idsmDAO.getIdsmSetupDlgInvEditAllList(paramMap);

    	resultMap.put("list", list);
    	resultMap.put("allList", allList);

        return resultMap;
    }

    @Override
    public int deleteIdsmSetupDlgInvEdit(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
			JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
	    	for(int i = 0; i < deleteList.size(); i++) {
	    		JSONObject obj = (JSONObject)deleteList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD").toString());

	    		cnt = idsmDAO.deleteIdsmSetupDlgInvEdit(row);
	    	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

    @Override
    public int saveIdsmSetupDlgInvEdit(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
			JSONArray insertList = JSONArray.fromObject(paramMap.get("insertList").toString());
	    	for(int i = 0; i < insertList.size(); i++) {
	    		JSONObject obj = (JSONObject)insertList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD").toString());

	    		cnt = idsmDAO.saveIdsmSetupDlgInvEdit(row);
	    	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

    @Override
    public int saveIdsmProjectMgt(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
			JSONArray updateUserList = JSONArray.fromObject(paramMap.get("updateUserList").toString());
	    	for(int i = 0; i < updateUserList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateUserList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD").toString());

	    		if(row.get("ALL_FLAG").toString().equals("0")) {
	    			cnt = idsmDAO.deleteIdsmProjectMgtUserList(row);
	    		}
	    		else {
	    			cnt = idsmDAO.updateIdsmProjectMgtUserList(row);
	    		}


	    	}

			JSONArray updateProjectList = JSONArray.fromObject(paramMap.get("updateProjectList").toString());
	    	for(int i = 0; i < updateProjectList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateProjectList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD").toString());

	    		cnt = idsmDAO.updateIdsmProjectMgtProjectList(row);
	    	}

	    	if(paramMap.get("SITE_YN") != null && paramMap.get("SITE_YN").toString().equals("Y")) {
	    		List<Map<String, Object>> pList = idsmDAO.getIdsmProjectMgtSiteProjectList(paramMap);

	    		if(pList.size() > 0) {
	    			paramMap.put("PROJECT_CODE", pList.get(0).get("PROJECT_CODE"));
	    			cnt = idsmDAO.updateIdsmProjectMgtProjectDefault(paramMap);
	    		}
	    		else {
	    			cnt = idsmDAO.deleteIdsmProjectMgtProjectDefault(paramMap);
	    		}


	    	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

    @Override
    public List getIdsmSetupDlgCreateItemProject(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();

    	try {
        	idsmDAO.updateSetLanguage(null);
        	list = idsmDAO.getIdsmSetupDlgCreateItemProject(paramMap);

        	HashMap<String, Object> map = new HashMap<String, Object>();


        	for (Object el : list) {
        		HashMap<String, String> row = (HashMap)el;

        		map = new HashMap<String, Object>();
        		map.put("label",
            			row.get("PROJECT_CODE").toString() + "&nbsp;&nbsp;" +
            			row.get("PROJECT_NAME").toString()
            	);
        		map.put("value",
            			row.get("PROJECT_CODE").toString() + "|" +
            			row.get("PROJECT_NAME").toString() + "|" +
            			row.get("PROJECT_ID").toString()
            	);
            	retList.add(map);
        	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}


        return retList;
    }

    @Override
    public List getIdsmSetupDlgItemScheduleItem(Map<String, Object> paramMap) {
    	List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

    	List<Map<String, Object>> list = idsmDAO.getIdsmSetupDlgItemScheduleItem(paramMap);

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

    @Override
    public List getIdsmSetupDlgItemScheduleItemTreeName(Map<String, Object> paramMap) {
    	return idsmDAO.getIdsmSetupDlgItemScheduleItemTreeName(paramMap);
    }

    @Override
    public int saveIdsmSetupDlgItemScheduleItemEdit(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;



    	try {

    		cnt = idsmDAO.saveIdsmSetupDlgItemScheduleItemEdit(paramMap);
    		/*JSONArray insertList = JSONArray.fromObject(paramMap.get("insertList").toString());
	    	for(int i = 0; i < insertList.size(); i++) {
	    		JSONObject obj = (JSONObject)insertList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD").toString());
	    		cnt = idsmDAO.saveIdsmSetupDlgItemScheduleItemEdit(row);

	    	}*/
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

    @Override
    public int saveIdsmSetupDlgItemScheduleAttach(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {

    		cnt = idsmDAO.saveIdsmSetupDlgItemScheduleAttach(paramMap);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

    @Override
    public List getIdsmSetupDlgItemScheduleAdmin(Map<String, Object> paramMap) {
        return idsmDAO.getIdsmSetupDlgItemScheduleAdmin(paramMap);
    }

    @Override
    public List getIdsmSetupDlgAdminAddList(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();

    	try {
        	list = idsmDAO.getIdsmSetupDlgAdminAddList(paramMap);

        	HashMap<String, Object> map = new HashMap<String, Object>();


        	for (Object el : list) {
        		HashMap<String, String> row = (HashMap)el;

        		map = new HashMap<String, Object>();
        		map.put("label",
            			row.get("EMP_NAME").toString() + "&nbsp;&nbsp;" +
            			row.get("DEPT_NAME").toString() + "&nbsp;&nbsp;" +
            			row.get("EMP_AD").toString()
            	);
        		map.put("value",
            			row.get("EMP_NAME").toString() + "|" +
    					row.get("EMP_AD").toString() + "|" +
    					row.get("DEPT_CODE").toString() + "|" +
            			row.get("DEPT_NAME").toString()
            	);
            	retList.add(map);
        	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}


        return retList;
    }

    @Override
    public int deleteIdsmSetupDlgItemScheduleAdmin(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
			JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
	    	for(int i = 0; i < deleteList.size(); i++) {
	    		JSONObject obj = (JSONObject)deleteList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD").toString());

	    		cnt = idsmDAO.deleteIdsmSetupDlgItemScheduleAdmin(row);
	    	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

    @Override
    public int saveIdsmSetupDlgItemScheduleAdmin(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
			JSONArray updateList = JSONArray.fromObject(paramMap.get("updateAdminList").toString());
	    	for(int i = 0; i < updateList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD").toString());

	    		if(row.get("OLD_USER_JOB").toString().equals("")) {
	    			cnt = idsmDAO.saveIdsmSetupDlgItemScheduleAdmin(row);
	    		}
	    		else {
	    			cnt = idsmDAO.updateIdsmSetupDlgItemScheduleAdmin(row);
	    		}

	    	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

    @Override
    public int saveIdsmSetupDlgCreateItem(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;
		String success = "Y";
		String logContent = "";
		String msg = "";
    	try {
			JSONArray insertMstList = JSONArray.fromObject(paramMap.get("insertMstList").toString());
	    	for(int i = 0; i < insertMstList.size(); i++) {
	    		JSONObject obj = (JSONObject)insertMstList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		List<Map<String, Object>> seqList = idsmDAO.getIdsmSetupDlgCreateItemMstSeq(row);

	    		row.put("TRK_ITEM_SEQ", seqList.get(0).get("SEQ").toString());
	    		row.put("USER_AD", paramMap.get("USER_AD").toString());

	            List<Map<String, Object>> dataCheckList = idsmDAO.getIdsmSetupDlgItemScheduleItemEditCheck(row);

	            if(dataCheckList.size() > 0) {
	              return -1;
	            }

	    		if(i == 0) {
	    			cnt = idsmDAO.saveIdsmSetupDlgCreateItemMst(row);
	    		}
	    		else {
	    			cnt = idsmDAO.saveIdsmSetupDlgCreateItemMstBatch(row);
	    		}

	    		JSONArray insertAdminList = JSONArray.fromObject(paramMap.get("insertAdminList").toString());
	    		for(int j = 0; j < insertAdminList.size(); j++) {
	    			JSONObject adminObj = (JSONObject)insertAdminList.get(j);
	    			Map<String, Object> adminRow = new ObjectMapper().readValue(adminObj.toString(), Map.class);

	    			adminRow.put("TRK_ITEM_SEQ", row.get("TRK_ITEM_SEQ").toString());
	    			adminRow.put("USER_AD", paramMap.get("USER_AD").toString());

	    			cnt = idsmDAO.saveIdsmSetupDlgItemScheduleAdmin(adminRow);

	    		}

	    	}
    	}
    	catch (Exception e) {
			logContent = "";
			success = "N";
			msg = e.toString();
    		System.out.println("!!!!!!" + e.toString());

		}
    	finally {
    		Map<String, Object> logMap = new HashMap<String, Object>();

			logMap.put("success_yn", success);
			logMap.put("action_how", "서비스-createChildItemMaster");
			logMap.put("action_locate", "IdsmService.saveIdsmSetupDlgCreateItem");
			logMap.put("action_frame_nm", "서비스-createChildItemMaster");
			logMap.put("content", logContent);
			logMap.put("USER_AD", paramMap.get("USER_AD").toString());

			idsmDAO.insertLogInfo(logMap);

			if ("Y".equals(success)) {

			} else {
				throw new Exception(msg);
			}


		}
        return cnt;
    }

    @Override
    public int deleteIdsmSetup(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

		String success = "Y";
		String logContent = "Item 일정 삭제";
		String msg = "";

    	try {
			JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
	    	for(int i = 0; i < deleteList.size(); i++) {
	    		JSONObject obj = (JSONObject)deleteList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD").toString());

	    		List<Map<String, Object>> checkList = idsmDAO.getIdsmSetupPlCheckList(row);
	    		if(checkList.size() > 0) {
	    			logContent = "";
	    			success = "checkErr";
	    		}
	    		else {
	    			cnt = idsmDAO.deleteIdsmSetup(row);
	    		}

	    	}
    	}
    	catch (Exception e) {
			logContent = "";
			success = "N";
    		System.out.println("!!!!!!" + e.toString());
    		msg = e.toString();

		}
    	finally {
    		Map<String, Object> logMap = new HashMap<String, Object>();

			logMap.put("success_yn", success);
			logMap.put("action_how", "서비스-deleteItemSetup");
			logMap.put("action_locate", "IdsmService.deleteIdsmSetup");
			logMap.put("action_frame_nm", "서비스-deleteItemSetup");
			logMap.put("content", logContent);
			logMap.put("USER_AD", paramMap.get("USER_AD").toString());

			if(!success.equals("checkErr")) {
				idsmDAO.insertLogInfo(logMap);
			}


			if ("Y".equals(success)) {

			}
			else if("checkErr".equals(success)) {
				return -1;
			}
			else {
				throw new Exception(msg);
			}


		}

        return cnt;
    }

    @Override
    public int deleteIdsmProjectMgt(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
			JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
	    	for(int i = 0; i < deleteList.size(); i++) {
	    		JSONObject obj = (JSONObject)deleteList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD").toString());

	    		cnt = idsmDAO.deleteIdsmProjectMgt(row);

	    	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}


        return cnt;
    }

    @Override
    public List getIdsmSetupDlgExcelUploadDownload(Map<String, Object> paramMap) {
        return idsmDAO.getIdsmSetupDlgExcelUploadDownload(paramMap);
    }

    @Override
    public int saveIdsmSetupExceluploadSave(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

		String success = "Y";
		String logContent = "";
		String msg = "";
    	try {
			JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());

			Map<String, Object> firstRow = new HashMap<String, Object>();

			if(updateList.size() > 0) {

	    		JSONObject obj = (JSONObject)updateList.get(0);
	    		firstRow = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		firstRow.put("USER_AD", paramMap.get("USER_AD").toString());

				cnt = idsmDAO.deleteIdsmSetupExceluploadExcelData(firstRow);
				cnt = idsmDAO.deleteIdsmSetupExceluploadAdmin(firstRow);
				cnt = idsmDAO.deleteIdsmSetupExceluploadInv(firstRow);
				cnt = idsmDAO.deleteIdsmSetupExceluploadItemMst(firstRow);

			}

	    	for(int i = 0; i < updateList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD").toString());
	    		cnt = idsmDAO.saveIdsmSetupExceluploadExcelData(row);

	    		String item1 = row.get("TRK_ITEM_NAME1").toString();
				String item2 = row.get("TRK_ITEM_NAME2").toString();
				String item3 = row.get("TRK_ITEM_NAME3").toString();
				String item4 = row.get("TRK_ITEM_NAME4").toString();

				int typeCnt = 1;

				if (!item2.equals("")) {
					typeCnt = 2;
				}
				if (!item3.equals("")) {
					typeCnt = 3;
				}
				if (!item4.equals("")) {
					typeCnt = 4;
				}

				String seq1 = "0";
				String seq2 = "0";
				String seq3 = "0";
				String seq4 = "0";

				for (int j = 0; j < typeCnt; j++) {

					if (j == 0) {
						row.put("LEVEL", 1);
						List<Map<String, Object>> seqList = idsmDAO.getIdsmSetupExceluploadSeq(row);
						seq1 = seqList.get(0).get("SEQ_NEXTVAL").toString();
					} else if (j == 1) {
						row.put("LEVEL", 2);
						List<Map<String, Object>> seqList = idsmDAO.getIdsmSetupExceluploadSeq(row);
						seq2 = seqList.get(0).get("SEQ_NEXTVAL").toString();
					} else if (j == 2) {
						row.put("LEVEL", 3);
						List<Map<String, Object>> seqList = idsmDAO.getIdsmSetupExceluploadSeq(row);
						seq3 = seqList.get(0).get("SEQ_NEXTVAL").toString();
					} else if (j == 3) {
						row.put("LEVEL", 4);
						List<Map<String, Object>> seqList = idsmDAO.getIdsmSetupExceluploadSeq(row);
						seq4 = seqList.get(0).get("SEQ_NEXTVAL").toString();
					}
				}

				for (int j = 0; j < typeCnt; j++) {
					if (j == 0) {
						row.put("TRK_ITEM_SEQ", seq1);
						row.put("TRK_ITEM_NAME", item1);
						row.put("TRK_ITEM_GROUP", "");
					} else if (j == 1) {
						row.put("TRK_ITEM_SEQ", seq2);
						row.put("TRK_ITEM_NAME", item2);
						row.put("TRK_ITEM_GROUP", seq1);
					} else if (j == 2) {
						row.put("TRK_ITEM_SEQ", seq3);
						row.put("TRK_ITEM_NAME", item3);
						row.put("TRK_ITEM_GROUP", seq2);
					} else if (j == 3) {
						row.put("TRK_ITEM_SEQ", seq4);
						row.put("TRK_ITEM_NAME", item4);
						row.put("TRK_ITEM_GROUP", seq3);
					}

		    		if(row.get("SEQUENCE_YN").toString().equals("Y")) {
		    			List<Map<String, Object>> dataCheckList = idsmDAO.getIdsmSetupDlgItemScheduleItemEditSequenceCheck(row);

						if(dataCheckList.size() > 0) {
							return -2;
						}
					}


					cnt = idsmDAO.saveIdsmSetupExceluploadMst(row);
					this.saveIdsmSetupDlgItemSequence(row);
				}

				String invnum1 = row.get("INVOICE_NUM1").toString();
				String invnum2 = row.get("INVOICE_NUM2").toString();
				String invnum3 = row.get("INVOICE_NUM3").toString();

				if(typeCnt >  1){
					if(typeCnt ==  4){
						row.put("TRK_ITEM_SEQ", seq4);
					}else if(typeCnt ==  3){
						row.put("TRK_ITEM_SEQ", seq3);
					}else if(typeCnt ==  2){
						row.put("TRK_ITEM_SEQ", seq2);
					}

					if(!invnum1.equals("")){
						row.put("INVOICE_NUM", invnum1);
						cnt = idsmDAO.saveIdsmSetupExceluploadInv(row);
					}
					if(!invnum2.equals("")){
						row.put("INVOICE_NUM", invnum2);
						cnt = idsmDAO.saveIdsmSetupExceluploadInv(row);
					}
					if(!invnum3.equals("")){
						row.put("INVOICE_NUM", invnum3);
						cnt = idsmDAO.saveIdsmSetupExceluploadInv(row);
					}

				}



	    	}

	    	cnt = idsmDAO.svaeIdsmSetupExceluploadAdmin(firstRow);

	    	logContent = "엑셀 업로드 처리";
    	}
    	catch (Exception e) {
			logContent = "";
			success = "N";
			msg = e.toString();
    		System.out.println("!!!!!!" + e.toString());

		}
    	finally {
    		Map<String, Object> logMap = new HashMap<String, Object>();

			logMap.put("success_yn", success);
			logMap.put("action_how", "엑셀 업로드");
			logMap.put("action_locate", "IdsmService.saveIdsmSetupExceluploadSave");
			logMap.put("action_frame_nm", "엑셀 업로드 처리");
			logMap.put("content", logContent);
			logMap.put("USER_AD", paramMap.get("USER_AD").toString());

			idsmDAO.insertLogInfo(logMap);

			if ("Y".equals(success)) {

			} else {
				throw new Exception(msg);
			}


		}
        return cnt;
    }

    @Override
    public List getIdsmSetupDlgProject(Map<String, Object> paramMap) {
    	return idsmDAO.getIdsmSetupProject(paramMap);
    }

    @Override
   	public List getIdsmSetupDlgMprProject(Map<String, Object> paramMap) throws Exception {
           return idsmDAO.getIdsmSetupDlgMprProject(paramMap);
   	}

    @Override
    public List getIdsmProjectMgtDlgProject(Map<String, Object> paramMap) {
    	return idsmDAO.getIdsmProjectMgtProject(paramMap);
    }

    @Override
    public List getIdsmBlrDlgProject(Map<String, Object> paramMap) {
    	return idsmDAO.getBlrSchmapProject(paramMap);
    }

    @Override
    public List getIdsmScheduleEtc(Map<String, Object> paramMap) {

    	List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

    	List<Map<String, Object>> list = idsmDAO.getIdsmScheduleEtc(paramMap);

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

    @Override
    public int saveIdsmSetupExceluploadUpdate(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

		String success = "Y";
		String logContent = "";
		String msg = "";
    	try {
			JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());

			Map<String, Object> firstRow = new HashMap<String, Object>();


	    	for(int i = 0; i < updateList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD").toString());


	    		String item1 = row.get("TRK_ITEM_NAME1").toString();
				String item2 = row.get("TRK_ITEM_NAME2").toString();
				String item3 = row.get("TRK_ITEM_NAME3").toString();
				String item4 = row.get("TRK_ITEM_NAME4").toString();

				int typeCnt = 1;

				if (!item2.equals("")) {
					typeCnt = 2;
				}
				if (!item3.equals("")) {
					typeCnt = 3;
				}
				if (!item4.equals("")) {
					typeCnt = 4;
				}

				String chkseq = "0";

				if(typeCnt == 1){
					row.put("TRK_CHECK_ITEM_NAME", item1);
					List<Map<String, Object>> seqList = idsmDAO.getIdsmSetupExceluploadUpdateSeq(row);
					if(seqList.size() > 0) {
						chkseq = seqList.get(0).get("SEQ_NEXTVAL").toString();
					}
					row.put("TRK_ITEM_NAME", item1);
					row.put("TRK_ITEM_SEQ", chkseq);
				}else if(typeCnt == 2){
					row.put("TRK_CHECK_ITEM_NAME", item2);
					List<Map<String, Object>> seqList = idsmDAO.getIdsmSetupExceluploadUpdateSeq(row);
					if(seqList.size() > 0) {
						chkseq = seqList.get(0).get("SEQ_NEXTVAL").toString();
					}
					row.put("TRK_ITEM_NAME", item2);
					row.put("TRK_ITEM_SEQ", chkseq);
				}else if(typeCnt == 3){
					row.put("TRK_CHECK_ITEM_NAME", item3);
					List<Map<String, Object>> seqList = idsmDAO.getIdsmSetupExceluploadUpdateSeq(row);
					if(seqList.size() > 0) {
						chkseq = seqList.get(0).get("SEQ_NEXTVAL").toString();
					}
					row.put("TRK_ITEM_NAME", item3);
					row.put("TRK_ITEM_SEQ", chkseq);
				}else if(typeCnt == 4){
					row.put("TRK_CHECK_ITEM_NAME", item4);
					List<Map<String, Object>> seqList = idsmDAO.getIdsmSetupExceluploadUpdateSeq(row);
					if(seqList.size() > 0) {
						chkseq = seqList.get(0).get("SEQ_NEXTVAL").toString();
					}
					row.put("TRK_ITEM_NAME", item4);
					row.put("TRK_ITEM_SEQ", chkseq);
				}


				if(!chkseq.equals("0")) {

					cnt = idsmDAO.saveIdsmSetupExceluploadMstUpdate(row);

					cnt = idsmDAO.deleteIdsmSetupExceluploadAdminUpdate(row);
					cnt = idsmDAO.svaeIdsmSetupExceluploadAdminUpdate(row);

//					this.saveIdsmSetupDlgItemSequence(row);


//					if(typeCnt >  1){
//
//						cnt = idsmDAO.deleteIdsmSetupExceluploadInvUpdate(row);
//
//						String invnum1 = row.get("INVOICE_NUM1").toString();
//						String invnum2 = row.get("INVOICE_NUM2").toString();
//						String invnum3 = row.get("INVOICE_NUM3").toString();
//
//						if(!invnum1.equals("")){
//							row.put("INVOICE_NUM", invnum1);
//							cnt = idsmDAO.saveIdsmSetupExceluploadInv(row);
//						}
//						if(!invnum2.equals("")){
//							row.put("INVOICE_NUM", invnum2);
//							cnt = idsmDAO.saveIdsmSetupExceluploadInv(row);
//						}
//						if(!invnum3.equals("")){
//							row.put("INVOICE_NUM", invnum3);
//							cnt = idsmDAO.saveIdsmSetupExceluploadInv(row);
//						}
//
//					}

				}

	    	}

	    	logContent = "엑셀 업로드 처리";
    	}
    	catch (Exception e) {
			logContent = "";
			success = "N";
			msg = e.toString();
    		System.out.println("!!!!!!" + e.toString());

		}
    	finally {
    		Map<String, Object> logMap = new HashMap<String, Object>();

			logMap.put("success_yn", success);
			logMap.put("action_how", "엑셀 업로드");
			logMap.put("action_locate", "IdsmService.saveIdsmSetupExceluploadUpdate");
			logMap.put("action_frame_nm", "엑셀 업로드 처리");
			logMap.put("content", logContent);
			logMap.put("USER_AD", paramMap.get("USER_AD").toString());

			//idsmDAO.insertLogInfo(logMap);

			if ("Y".equals(success)) {

			} else {
				throw new Exception(msg);
			}


		}
        return cnt;
    }

    @Override
    public List getIdsmSetupDlgItemScheduleItemEditCheck(Map<String, Object> paramMap) {

        return idsmDAO.getIdsmSetupDlgItemScheduleItemEditCheck(paramMap);
    }

    @Override
    public List getIdsmSetupDlgInoviceSeqList(Map<String, Object> paramMap) {
    	return idsmDAO.getIdsmSetupDlgInoviceSeqList(paramMap);
    }

    @Override
    public int saveIdsmSetupDlgInoviceSeqList(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
			JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
	    	for(int i = 0; i < updateList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD").toString());

	    		cnt = idsmDAO.saveIdsmSetupDlgInoviceSeqList(row);
	    	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

    @Override
    public int deleteIdsmSetupDlgInoviceSeqList(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
			JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
	    	for(int i = 0; i < deleteList.size(); i++) {
	    		JSONObject obj = (JSONObject)deleteList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD").toString());

	    		cnt = idsmDAO.deleteIdsmSetupDlgInoviceSeqList(row);

	    	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}

        return cnt;
    }

    @Override
    public Map getIdsmSetupDlgInvEditInvSeq(Map<String, Object> paramMap) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {

        	List<Map<String, Object>> invoiceInfoList = idsmDAO.getIdsmSetupDlgInvEditInvInfoList(paramMap);

        	if(invoiceInfoList.size() == 0) {
        		resultMap.put("INVOICE_NUM", "");
        		return resultMap;
        	}

        	paramMap.put("START_SEQ", invoiceInfoList.get(0).get("START_SEQ"));
        	paramMap.put("END_SEQ", invoiceInfoList.get(0).get("END_SEQ"));
        	paramMap.put("EXPRESSION", invoiceInfoList.get(0).get("EXPRESSION"));
        	paramMap.put("LENG", invoiceInfoList.get(0).get("LENG"));

        	List<Map<String, Object>> invoiceList = new ArrayList<Map<String,Object>>();
			JSONArray invoiceJsonList = JSONArray.fromObject(paramMap.get("list").toString());
	    	for(int i = 0; i < invoiceJsonList.size(); i++) {
	    		JSONObject obj = (JSONObject)invoiceJsonList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		invoiceList.add(row);
	    	}

	    	paramMap.put("list", invoiceList);

        	List<Map<String, Object>> invoiceSeqList = idsmDAO.getIdsmSetupDlgInvEditInvSeqList(paramMap);

        	if(invoiceSeqList.size() == 0) {
        		resultMap.put("INVOICE_NUM", "");
        		return resultMap;
        	}

        	resultMap.put("INVOICE_NUM", invoiceSeqList.get(0).get("SEQ"));

    	}catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}


        return resultMap;
    }

    @Override
    public Map getIdsmSchmapList(Map<String, Object> paramMap) {
    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	List<Map<String, Object>> list = idsmDAO.getIdsmSchmapList(paramMap);
    	List<Map<String, Object>> inofList = idsmDAO.getIdsmSchmapInfo(paramMap);

    	resultMap.put("resultList", list);
    	resultMap.put("resultInfo", inofList.get(0));

        return resultMap;
    }

    @Override
    public Map getIdsmBlrSchmapList(Map<String, Object> paramMap) {
    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	List<Map<String, Object>> list = idsmDAO.getIdsmBlrSchmapList(paramMap);
    	List<Map<String, Object>> inofList = idsmDAO.getIdsmBlrSchmapInfo(paramMap);

    	resultMap.put("resultList", list);
    	resultMap.put("resultInfo", inofList.get(0));

        return resultMap;
    }

    @Override
    public int saveIdsmSchmapList(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	if(paramMap.get("TYPE").toString().equals("C")) {
    		idsmDAO.createIdsmSchmapList(paramMap);
    	}
    	else if(paramMap.get("TYPE").toString().equals("S")) {
    		idsmDAO.syncIdsmSchmapList(paramMap);
    	}


        return cnt;
    }

    @Override
    public int saveIdsmBlrSchmapList(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	if(paramMap.get("TYPE").toString().equals("C")) {
    		idsmDAO.createIdsmBlrSchmapList(paramMap);
    	}
    	else if(paramMap.get("TYPE").toString().equals("S")) {
    		idsmDAO.syncIdsmBlrSchmapList(paramMap);
    	}


        return cnt;
    }

    @Override
    public int saveIdsmSchmap(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
			JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
	    	for(int i = 0; i < list.size(); i++) {
	    		JSONObject obj = (JSONObject)list.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));

	    		idsmDAO.saveIdsmSchmap(row);
	    	}

    	}catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}

        return cnt;
    }

    @Override
    public int saveIdsmBlrSchmap(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
			JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
	    	for(int i = 0; i < list.size(); i++) {
	    		JSONObject obj = (JSONObject)list.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));

	    		idsmDAO.saveIdsmBlrSchmap(row);
	    	}

    	}catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}

        return cnt;
    }

    @Override
    public int saveIdsmSchmapExcelUpload(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
			JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
	    	for(int i = 0; i < list.size(); i++) {
	    		JSONObject obj = (JSONObject)list.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));

	    		idsmDAO.saveIdsmSchmapExcelUpload(row);
	    	}

    	}catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}

        return cnt;
    }

    @Override
    public int saveIdsmBlrSchmapExcelUpload(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
			JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
	    	for(int i = 0; i < list.size(); i++) {
	    		JSONObject obj = (JSONObject)list.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));

	    		idsmDAO.saveIdsmBlrSchmapExcelUpload(row);
	    	}

    	}catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}

        return cnt;
    }

    @Override
    public List getIdsmSchmapViewList(Map<String, Object> paramMap) {
        return idsmDAO.getIdsmSchmapViewList(paramMap);
    }

    @Override
    public List getIdsmProjectMgtUserList(Map<String, Object> paramMap) {
        return idsmDAO.getIdsmProjectMgtUserList(paramMap);
    }

    @Override
    public List getIdsmProjectMgtProjectList(Map<String, Object> paramMap) {
        return idsmDAO.getIdsmProjectMgtProjectList(paramMap);
    }

    @Override
    public List getIdsmSchmapViewDlgDetail(Map<String, Object> paramMap) {
        return idsmDAO.getIdsmSchmapViewDlgDetail(paramMap);
    }

    @Override
    public String syncIdsmSchmapView(Map<String, Object> paramMap) throws Exception {

    	String msg = "";

    	try {
    		paramMap.put("L_ERRBUF", "");
    		idsmDAO.syncIdsmSchmapView(paramMap);

    		if(paramMap.get("L_ERRBUF") != null) {
    			msg = paramMap.get("L_ERRBUF").toString();
    		}


    	}catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}

        return msg;
    }

    @Override
    public int saveIdsmSetupDlgMemo(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
    		cnt = idsmDAO.saveIdsmSetupDlgMemo(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

    @Override
    public List getIdsmSetupDlgMemo(Map<String, Object> paramMap) {
        return idsmDAO.getIdsmSetupDlgMemo(paramMap);
    }

    @Override
    public List getIdsmSetupDlgItemScheduleInvCheck(Map<String, Object> paramMap) {
        return idsmDAO.getIdsmSetupDlgItemScheduleInvCheck(paramMap);
    }

    @Override
    public List getIdsmSetupDlgItemScheduleItemPL(Map<String, Object> paramMap) {
        return idsmDAO.getIdsmSetupDlgItemScheduleItemPL(paramMap);
    }

    @Override
    public List getIdsmSetupDlgItemScheduleItemEditSequenceCheck(Map<String, Object> paramMap) {

        return idsmDAO.getIdsmSetupDlgItemScheduleItemEditSequenceCheck(paramMap);
    }

    @Override
    public int saveIdsmSetupDlgItemSequence(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
    		List<Map<String, Object>> checkList = idsmDAO.getIdsmSetupDlgItemSequenceCheckList(paramMap);
    		Map<String, Object> checkListMap = checkList.get(0);
    		if(checkList.size() > 0 && Integer.parseInt(checkListMap.get("PL_CNT").toString())  < 1) {

    			if(checkListMap.get("ATTRIBUTE10") == null || checkListMap.get("ATTRIBUTE10").equals("") || checkListMap.get("ORGN_FILE_NM") == null || checkListMap.get("ORGN_FILE_NM").equals("")) {
    				checkListMap.put("ATTRIBUTE9", "");
    			}
    			else {
    				List<Map<String, Object>> sequenceList = idsmDAO.getIdsmSetupDlgItemSequenceList(checkListMap);
    				Map<String, Object> sequenceListMap = sequenceList.get(0);
    				if(sequenceListMap.get("FILE_YN").toString().equals("Y")) {
    					checkListMap.put("ATTRIBUTE9", "");
    				}
    				else {
    					checkListMap.put("ATTRIBUTE9", sequenceListMap.get("ATTRIBUTE9"));
    				}
    			}

    			cnt = idsmDAO.saveIdsmSetupDlgItemSequence(checkListMap);
    		}


    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

	@Override
	public void deleteIdsmSetupDifferentName() throws Exception {
		idsmDAO.deleteIdsmSetupDifferentName();
	}

	@Override
	public List<Map<String, Object>> getIdsmSchedule(Map<String, Object> paramMap) throws Exception {
		 return idsmDAO.getIdsmSchedule(paramMap);
	}
	
	@Override
    public Map getIdsmTaskList(Map<String, Object> paramMap) {
    	Map<String, Object> resultMap = new HashMap<String, Object>();
    	List<Map<String, Object>> list = idsmDAO.getIdsmTaskList(paramMap);
    	resultMap.put("list", list);

        return resultMap;
    }
	
	@Override
    public Map getIdsmPrNoList(Map<String, Object> paramMap) {
    	Map<String, Object> resultMap = new HashMap<String, Object>();
    	List<Map<String, Object>> list = idsmDAO.getIdsmPrNoList(paramMap);
    	resultMap.put("list", list);

        return resultMap;
    }
	
	@Override
    public Map getIdsmMprList(Map<String, Object> paramMap) {
    	Map<String, Object> resultMap = new HashMap<String, Object>();
    	List<Map<String, Object>> list = idsmDAO.getIdsmMprList(paramMap);
    	resultMap.put("list", list);

        return resultMap;
    }
	
	@Override
    public List getIdsmSetupT(Map<String, Object> paramMap) {

    	List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

    	List<Map<String, Object>> list = idsmDAO.getIdsmSetupT(paramMap);

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
	
	// saveIdsmSetupSeqT 로 대체, 기자재 일정관리도 마찬가지, 메인그리드 저장 후 Re search 없이 가기 위함..
	@Override
    public int saveIdsmSetupT(Map<String, Object> paramMap) throws Exception {
    	int cnt = 0;

    	try {
			JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
	    	for(int i = 0; i < updateList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD").toString());


	    		if(row.get("TRK_ITEM_SEQ") == null || row.get("TRK_ITEM_SEQ").toString().equals("")) {
	    			List<Map<String, Object>> seqList = idsmDAO.getIdsmSetupSeq(row);
	    			row.put("TRK_ITEM_SEQ", seqList.get(0).get("SEQ"));
	    		}

				List<Map<String, Object>> dataCheckList = idsmDAO.getIdsmSetupDlgItemScheduleItemEditCheck(row);

				if(dataCheckList.size() > 0) {
					return -1;
				}

	    		cnt = idsmDAO.saveIdsmSetupT(row);

	    		this.saveIdsmSetupDlgItemSequence(row);

	    		if(row.get("PM_AD") != null && !row.get("PM_AD").toString().equals("")) {

	    			Map<String, Object> authRow = new HashMap<String, Object>();
	    			authRow.put("TRK_ITEM_SEQ", row.get("TRK_ITEM_SEQ"));
	    			authRow.put("USER_AD", row.get("PM_AD"));
	    			authRow.put("USER_NAME", row.get("PM_NAME"));
	    			authRow.put("USER_JOB", "PM");
	    			authRow.put("AUTH_SCHEDULE", "관리");
	    			authRow.put("P_USER_AD", row.get("USER_AD"));

	    			cnt = idsmDAO.saveIdsmSetupAuth(authRow);
	    		}

	    		if(row.get("EM_AD") != null && !row.get("EM_AD").toString().equals("")) {

	    			Map<String, Object> authRow = new HashMap<String, Object>();
	    			authRow.put("TRK_ITEM_SEQ", row.get("TRK_ITEM_SEQ"));
	    			authRow.put("USER_AD", row.get("EM_AD"));
	    			authRow.put("USER_NAME", row.get("EM_NAME"));
	    			authRow.put("USER_JOB", "EM");
	    			authRow.put("AUTH_SCHEDULE", "관리");
	    			authRow.put("P_USER_AD", row.get("USER_AD"));

	    			cnt = idsmDAO.saveIdsmSetupAuth(authRow);
	    		}

	    		if(row.get("BUYER_AD") != null && !row.get("BUYER_AD").toString().equals("")) {

	    			Map<String, Object> authRow = new HashMap<String, Object>();
	    			authRow.put("TRK_ITEM_SEQ", row.get("TRK_ITEM_SEQ"));
	    			authRow.put("USER_AD", row.get("BUYER_AD"));
	    			authRow.put("USER_NAME", row.get("BUYER_NAME"));
	    			authRow.put("USER_JOB", "BUYER");
	    			authRow.put("AUTH_SCHEDULE", "관리");
	    			authRow.put("P_USER_AD", row.get("USER_AD"));

	    			cnt = idsmDAO.saveIdsmSetupAuth(authRow);
	    		}

	    		if(row.get("QC_AD") != null && !row.get("QC_AD").toString().equals("")) {

	    			Map<String, Object> authRow = new HashMap<String, Object>();
	    			authRow.put("TRK_ITEM_SEQ", row.get("TRK_ITEM_SEQ"));
	    			authRow.put("USER_AD", row.get("QC_AD"));
	    			authRow.put("USER_NAME", row.get("QC_NAME"));
	    			authRow.put("USER_JOB", "QC");
	    			authRow.put("AUTH_SCHEDULE", "관리");
	    			authRow.put("P_USER_AD", row.get("USER_AD"));

	    			cnt = idsmDAO.saveIdsmSetupAuth(authRow);
	    		}

	    		if(row.get("SM_AD") != null && !row.get("SM_AD").toString().equals("")) {

	    			Map<String, Object> authRow = new HashMap<String, Object>();
	    			authRow.put("TRK_ITEM_SEQ", row.get("TRK_ITEM_SEQ"));
	    			authRow.put("USER_AD", row.get("SM_AD"));
	    			authRow.put("USER_NAME", row.get("SM_NAME"));
	    			authRow.put("USER_JOB", "SM");
	    			authRow.put("AUTH_SCHEDULE", "관리");
	    			authRow.put("P_USER_AD", row.get("USER_AD"));

	    			cnt = idsmDAO.saveIdsmSetupAuth(authRow);
	    		}
	    	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }
	
	@Override
    public List<Map<String, Object>> saveIdsmSetupSeqT(Map<String, Object> paramMap) throws Exception {
		int cnt = 0;
		List<Map<String, Object>> rtnList = null;
		
    	try {
    		rtnList = new ArrayList<>();
			JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
	    	for(int i = 0; i < updateList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD").toString());


	    		if(row.get("TRK_ITEM_SEQ") == null || row.get("TRK_ITEM_SEQ").toString().equals("")) {
	    			List<Map<String, Object>> seqList = idsmDAO.getIdsmSetupSeq(row);
	    			row.put("TRK_ITEM_SEQ", seqList.get(0).get("SEQ"));
	    			rtnList.add(row);
	    		}

				List<Map<String, Object>> dataCheckList = idsmDAO.getIdsmSetupDlgItemScheduleItemEditCheck(row);

				if(dataCheckList.size() > 0) {
	    			rtnList.clear();
					return null;
				}

	    		cnt = idsmDAO.saveIdsmSetupT(row);

	    		this.saveIdsmSetupDlgItemSequence(row);

	    		if(row.get("PM_AD") != null && !row.get("PM_AD").toString().equals("")) {

	    			Map<String, Object> authRow = new HashMap<String, Object>();
	    			authRow.put("TRK_ITEM_SEQ", row.get("TRK_ITEM_SEQ"));
	    			authRow.put("USER_AD", row.get("PM_AD"));
	    			authRow.put("USER_NAME", row.get("PM_NAME"));
	    			authRow.put("USER_JOB", "PM");
	    			authRow.put("AUTH_SCHEDULE", "관리");
	    			authRow.put("P_USER_AD", row.get("USER_AD"));

	    			cnt = idsmDAO.saveIdsmSetupAuth(authRow);
	    		}

	    		if(row.get("EM_AD") != null && !row.get("EM_AD").toString().equals("")) {

	    			Map<String, Object> authRow = new HashMap<String, Object>();
	    			authRow.put("TRK_ITEM_SEQ", row.get("TRK_ITEM_SEQ"));
	    			authRow.put("USER_AD", row.get("EM_AD"));
	    			authRow.put("USER_NAME", row.get("EM_NAME"));
	    			authRow.put("USER_JOB", "EM");
	    			authRow.put("AUTH_SCHEDULE", "관리");
	    			authRow.put("P_USER_AD", row.get("USER_AD"));

	    			cnt = idsmDAO.saveIdsmSetupAuth(authRow);
	    		}

	    		if(row.get("BUYER_AD") != null && !row.get("BUYER_AD").toString().equals("")) {

	    			Map<String, Object> authRow = new HashMap<String, Object>();
	    			authRow.put("TRK_ITEM_SEQ", row.get("TRK_ITEM_SEQ"));
	    			authRow.put("USER_AD", row.get("BUYER_AD"));
	    			authRow.put("USER_NAME", row.get("BUYER_NAME"));
	    			authRow.put("USER_JOB", "BUYER");
	    			authRow.put("AUTH_SCHEDULE", "관리");
	    			authRow.put("P_USER_AD", row.get("USER_AD"));

	    			cnt = idsmDAO.saveIdsmSetupAuth(authRow);
	    		}

	    		if(row.get("QC_AD") != null && !row.get("QC_AD").toString().equals("")) {

	    			Map<String, Object> authRow = new HashMap<String, Object>();
	    			authRow.put("TRK_ITEM_SEQ", row.get("TRK_ITEM_SEQ"));
	    			authRow.put("USER_AD", row.get("QC_AD"));
	    			authRow.put("USER_NAME", row.get("QC_NAME"));
	    			authRow.put("USER_JOB", "QC");
	    			authRow.put("AUTH_SCHEDULE", "관리");
	    			authRow.put("P_USER_AD", row.get("USER_AD"));

	    			cnt = idsmDAO.saveIdsmSetupAuth(authRow);
	    		}

	    		if(row.get("SM_AD") != null && !row.get("SM_AD").toString().equals("")) {

	    			Map<String, Object> authRow = new HashMap<String, Object>();
	    			authRow.put("TRK_ITEM_SEQ", row.get("TRK_ITEM_SEQ"));
	    			authRow.put("USER_AD", row.get("SM_AD"));
	    			authRow.put("USER_NAME", row.get("SM_NAME"));
	    			authRow.put("USER_JOB", "SM");
	    			authRow.put("AUTH_SCHEDULE", "관리");
	    			authRow.put("P_USER_AD", row.get("USER_AD"));

	    			cnt = idsmDAO.saveIdsmSetupAuth(authRow);
	    		}
	    	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
    	return rtnList;
    }

    /** 
    	Spare part & Special Tool
    */  
    @Override
	public List getIdsmSupplySpSt(Map<String, Object> paramMap) throws Exception {
        return idsmDAO.getIdsmSupplySpSt(paramMap);
    }

    @Override
	public List getIdsmTrkItemSeq(Map<String, Object> paramMap) throws Exception {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();

    	try {
        	idsmDAO.updateSetLanguage(null);
        	list = idsmDAO.getIdsmTrkItemSeq(paramMap);

        	HashMap<String, Object> map = new HashMap<String, Object>();


        	for (Object el : list) {
        		HashMap<String, String> row = (HashMap)el;

        		map = new HashMap<String, Object>();
        		map.put("label",
        				String.valueOf(row.get("TRK_ITEM_SEQ")) + "&nbsp;&nbsp;" +
            			row.get("TRK_ITEM_NAME").toString()
            	);
        		map.put("value",
        				String.valueOf(row.get("TRK_ITEM_SEQ")) + "|" +
            			row.get("TRK_ITEM_NAME").toString()
            	);
            	retList.add(map);
        	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}


        return retList;
    }

    @Override
	public int saveIdsmItemSupplySpSt(Map<String, Object> paramMap) throws Exception {
    	int cnt = 0;

    	try {
    		cnt = idsmDAO.saveIdsmItemSupplySpSt(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

    @Override
    public int deleteIdsmItemSupplySpSt(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
			JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
	    	for(int i = 0; i < deleteList.size(); i++) {
	    		JSONObject obj = (JSONObject)deleteList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD").toString());

	    		cnt = idsmDAO.deleteIdsmItemSupplySpSt(row);
	    	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

    @Override
    public int saveIdsmSupplySpStExceluploadUpdate(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

		String success = "Y";
		String logContent = "";
		String msg = "";
    	try {
			JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());

			Map<String, Object> firstRow = new HashMap<String, Object>();


	    	for(int i = 0; i < updateList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD").toString());

	    		System.out.println(row);
	    		cnt = idsmDAO.saveIdsmItemSupplySpSt(row);

	    	}

	    	logContent = "엑셀 업로드 처리";
    	}
    	catch (Exception e) {
			logContent = "";
			success = "N";
			msg = e.toString();
    		System.out.println("!!!!!!" + e.toString());

		}
    	finally {
    		Map<String, Object> logMap = new HashMap<String, Object>();

			logMap.put("success_yn", success);
			logMap.put("action_how", "엑셀 업로드");
			logMap.put("action_locate", "IdsmService.saveIdsmSetupExceluploadUpdate");
			logMap.put("action_frame_nm", "엑셀 업로드 처리");
			logMap.put("content", logContent);
			logMap.put("USER_AD", paramMap.get("USER_AD").toString());

			//idsmDAO.insertLogInfo(logMap);

			if (!"Y".equals(success)) {
				throw new Exception(msg);
			}


		}
        return cnt;
    }
    
    @Override
    public Map<String, Object> getMprSeqRecent(Map<String, Object> paramMap) {
        return idsmDAO.getMprSeqRecent(paramMap);
    }

}

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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.desm.service.DesmService;
import egovframework.desm.service.IdsmFileService;
import egovframework.desm.service.MaterialService;
import egovframework.desm.service.MobileService;
import egovframework.desm.service.MprService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service("mobileService")
public class MobileServiceImpl extends EgovAbstractServiceImpl implements MobileService {


	private static final Logger LOGGER = LoggerFactory.getLogger(MobileServiceImpl.class);

	@Resource(name = "desmService")
	private DesmService desmService;

	@Resource(name = "mobileDAO")
	private MobileDAO mobileDAO;

	@Resource(name = "materialDAO")
	private MaterialDAO materialDAO;

	@Resource(name = "materialService")
	private MaterialService materialService;

	@Resource(name = "mprService")
	private MprService mprService;
	
	@Resource(name = "idsmFileService")
	private IdsmFileService idsmFileService;

    @Override
    public Map<String, Object> getMobileLeftMenu(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);

    		List<Map<String, Object>> resultList = mobileDAO.getLeftMenu(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileInitDefaultProject(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		List<Map<String, Object>> resultList = desmService.getInitDefailProject(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileMenuAuthCheckList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		List<Map<String, Object>> resultList = mobileDAO.getMenuAuthCheckList(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileToDoList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);

    		/*
    		List<Map<String, Object>> subconList = mobileDAO.getMobileSubconInfo(paramMap);
    		if(subconList.size() > 0 && subconList.get(0).get("SUBCON_YN").toString().equals("Y")) {
    			paramMap.put("SUBCONTRACTOR", subconList.get(0).get("DEPT_NAME"));
    		}
    		*/

    		List<Map<String, Object>> resultList = mobileDAO.getMobileToDoList(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileRsiHeaderList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		List<Map<String, Object>> resultList = mobileDAO.getMobileRsiHeaderList(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileRsiLineList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		List<Map<String, Object>> resultList = mobileDAO.getMobileRsiLineList(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public int saveAccessTokenDelegate(Map<String, Object> paramMap) throws Exception {
    	return mobileDAO.insertAccessTokenDelegate(paramMap);
    }

    @Override
	public Map<String, Object> getAccessToken(String param) throws Exception {
    	Map<String, Object> resultMap = new HashMap<String, Object> ();
    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		Map<String, Object> result = mobileDAO.selectAccessToken(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", result);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
    	}
    	return resultMap;
    }

    @Override
    public Map<String, Object> getMobileMrfHeaderList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		List<Map<String, Object>> resultList = mobileDAO.getMobileMrfHeaderList(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileMrfLineList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		List<Map<String, Object>> resultList = mobileDAO.getMobileMrfLineList(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> saveMobileRsi(String param, Map<String, Object> paramMailMap) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);

    		if(paramMap.get("TRANS_TYPE").toString().equals("Incomplete")) {
				paramMap.put("STATUS", "Incomplete");

				if(paramMap.get("REQUESTED_BY") != null && !paramMap.get("REQUESTED_BY").toString().equals("")) {
					paramMap.put("keyword", paramMap.get("REQUESTED_BY"));
					List<Map<String, Object>> userList = materialDAO.getDesmRsiUserList(paramMap);
					if(userList.size() > 0) {
						if(userList.get(0).get("DEPT_NAME") != null) {
							paramMap.put("SUBCONTRACTOR", userList.get(0).get("DEPT_NAME"));
						}

					}
				}
			}
			else if(paramMap.get("TRANS_TYPE").toString().equals("Pre-Checked")) {
				paramMap.put("STATUS", "Pre-Checked");
				paramMap.put("REQUESTED_BY", paramMap.get("USER_AD"));
				//paramMap.put("CONFIRMED_BY", "YUNSEON.PYO");

				paramMap.put("keyword", paramMap.get("USER_AD"));
				List<Map<String, Object>> userList = materialDAO.getDesmRsiUserList(paramMap);
				if(userList.size() > 0) {
					if(userList.get(0).get("DEPT_NAME") != null) {
						paramMap.put("SUBCONTRACTOR", userList.get(0).get("DEPT_NAME"));
					}

				}
			}
			else if(paramMap.get("TRANS_TYPE").toString().equals("Pre-Confirmed")) {
				paramMap.put("STATUS", "Pre-Confirmed");
				paramMap.put("CHECKED_BY", paramMap.get("USER_AD"));
				//paramMap.put("APPROVED_BY", "JAEHONG.JOO");
			}
			else if(paramMap.get("TRANS_TYPE").toString().equals("Pre-Approved")) {
				paramMap.put("STATUS", "Pre-Approved");
				paramMap.put("CONFIRMED_BY", paramMap.get("USER_AD"));
			}
			else if(paramMap.get("TRANS_TYPE").toString().equals("Approved")) {
				paramMap.put("STATUS", "Approved");
				paramMap.put("APPROVED_BY", paramMap.get("USER_AD"));
			}

    		mobileDAO.saveMobileRsi(paramMap);

    		paramMailMap.put("RSI_HEADER_ID", paramMap.get("RSI_HEADER_ID"));
    		paramMailMap.put("STATUS", paramMap.get("STATUS"));
    		paramMailMap.put("USER_AD", paramMap.get("USER_AD"));


    		materialService.sendMailDesmRsi(paramMailMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", "");

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> saveMobileRsiReject(String param, Map<String, Object> paramMailMap) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);


    		materialDAO.saveDesmRsiReject(paramMap);

    		paramMailMap.put("RSI_HEADER_ID", paramMap.get("RSI_HEADER_ID"));
    		paramMailMap.put("STATUS", paramMap.get("STATUS"));
    		paramMailMap.put("USER_AD", paramMap.get("USER_AD"));


    		materialService.sendMailDesmRsi(paramMailMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", "");

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> saveMobileMrf(String param, Map<String, Object> paramMailMap) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);

    		if(paramMap.get("TRANS_TYPE").toString().equals("Incomplete")) {
				paramMap.put("STATUS", "Incomplete");

				if(paramMap.get("REQUESTED_BY") != null && !paramMap.get("REQUESTED_BY").toString().equals("")) {
					paramMap.put("keyword", paramMap.get("REQUESTED_BY"));
					List<Map<String, Object>> userList = materialDAO.getDesmRsiUserList(paramMap);
					if(userList.size() > 0) {
						if(userList.get(0).get("DEPT_NAME") != null) {
							paramMap.put("SUBCONTRACTOR", userList.get(0).get("DEPT_NAME"));
						}

					}
				}
			}
			else if(paramMap.get("TRANS_TYPE").toString().equals("Pre-Checked")) {
				paramMap.put("STATUS", "Pre-Checked");
				paramMap.put("REQUESTED_BY", paramMap.get("USER_AD"));

				paramMap.put("keyword", paramMap.get("USER_AD"));
				List<Map<String, Object>> userList = materialDAO.getDesmRsiUserList(paramMap);
				if(userList.size() > 0) {
					if(userList.get(0).get("DEPT_NAME") != null) {
						paramMap.put("SUBCONTRACTOR", userList.get(0).get("DEPT_NAME"));
					}

				}
			}
			else if(paramMap.get("TRANS_TYPE").toString().equals("Pre-Confirmed")) {
				paramMap.put("STATUS", "Pre-Confirmed");
				paramMap.put("CHECKED_BY", paramMap.get("USER_AD"));
			}
			else if(paramMap.get("TRANS_TYPE").toString().equals("Pre-Approved")) {
				paramMap.put("STATUS", "Pre-Approved");
				paramMap.put("CONFIRMED_BY", paramMap.get("USER_AD"));
			}
			else if(paramMap.get("TRANS_TYPE").toString().equals("Approved")) {
				paramMap.put("STATUS", "Approved");
				paramMap.put("APPROVED_BY", paramMap.get("USER_AD"));
			}

    		mobileDAO.saveMobileMrf(paramMap);

	    	if(paramMap.get("TRANS_TYPE").toString().equals("Approved")) {
	    		List<Map<String, Object>> returnList = materialDAO.getDesmMrfLineReturnQtyList(paramMap);
	    		for(int i = 0; i < returnList.size(); i++) {
	    			Map<String, Object> returnRow = returnList.get(i);
	    			returnRow.put("USER_AD", paramMap.get("USER_AD"));
	    			returnRow.put("PROJECT_NO", paramMap.get("PROJECT_NO"));

	                materialDAO.saveDesmMrfReturnSave(returnRow);
	                materialDAO.saveDesmMrfReturnQtySave(returnRow);
	                materialDAO.saveDesmMrfReturnQtyCloseSave(returnRow);


	    		}
			}

    		paramMailMap.put("MRF_HEADER_ID", paramMap.get("MRF_HEADER_ID"));
    		paramMailMap.put("STATUS", paramMap.get("STATUS"));
    		paramMailMap.put("USER_AD", paramMap.get("USER_AD"));


    		materialService.sendMailDesmMrf(paramMailMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", "");

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> saveMobileMrfReject(String param, Map<String, Object> paramMailMap) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);


    		materialDAO.saveDesmMrfReject(paramMap);

    		paramMailMap.put("MRF_HEADER_ID", paramMap.get("MRF_HEADER_ID"));
    		paramMailMap.put("STATUS", paramMap.get("STATUS"));
    		paramMailMap.put("USER_AD", paramMap.get("USER_AD"));


    		materialService.sendMailDesmMrf(paramMailMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", "");

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileMapList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);

    		List<Map<String, Object>> resultList = materialService.getDesmMapCreationList(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> saveMobileMap(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);

    		materialDAO.saveDesmLocation(paramMap);

    		if(paramMap.get("CODE_TYPE").toString().equals("SUMMARY")) {
    			List<Map<String, Object>> checkList = materialDAO.saveDesmLocationSummaryDetailCheck(paramMap);
    			if(checkList.size() == 0){
    				resultMap.put("status", "qtyCheckErr");
    				resultMap.put("QTY_ZERO", "QTY_ZERO");
    				resultMap.put("PACKAGE_NO", paramMap.get("PACKAGE_NO"));
    				return resultMap;
    			}
    			materialDAO.saveDesmLocationSummary(paramMap);
    			materialDAO.saveIdsmOsSummaryEditLogList(paramMap);
    			materialDAO.saveDesmLocationSummaryDetail(paramMap);
    			materialDAO.saveDesmLocationSummaryDetailLog(paramMap);
    		}
    		else if(paramMap.get("CODE_TYPE").toString().equals("DETAIL")) {
    			int i = materialDAO.saveDesmLocationDetail(paramMap);
    			if( i > 0 ){
    				materialDAO.saveIdsmOsDetailListLog(paramMap);
    			}else{
    				resultMap.put("status", "qtyCheckErr");
    				return resultMap;
    			}
    		}

    		resultMap.put("status", "success");
    		resultMap.put("data", "");

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> saveMobileMapCheck(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
			Map<String,Object> checkMap;

	    		//22.09.21 Package 단위 Location 업데이트가 최초 한번 이후에도 계속 일괄 적용이 가능하도록 기능 수정
	    		if(paramMap.get("CODE_TYPE").toString().equals("SUMMARY")) {
	    			List<Map<String, Object>> checkList = materialDAO.getDesmLocationCheckDetail(paramMap);
	    			if(checkList.size() > 0) {
	    				checkMap = new HashMap<>();
	    				for(int j = 0 ; j < checkList.size(); j ++){
	    					if(checkList.get(j) != null){
	    						checkMap.put(checkList.get(j).get("LOCATION").toString(), checkList.get(j).get("LOCATION"));
	    					}
	    				}
	    				if(checkMap.size() > 1){
		    				resultMap.put("LOCATION_DIFF", paramMap.get("PACKAGE_NO"));
		    				return resultMap;
	    				}
	    			}
	    		}

    	}
    	catch (Exception e) {
    		e.printStackTrace();
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileQrCodePackageInfo(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
    		if(paramMap.get("CODE_TYPE").toString().equals("SUMMARY") || paramMap.get("CODE_TYPE").toString().equals("SHIPPING_MARK")) {
    			resultList = mobileDAO.getMobileQrCodePackageInfo(paramMap);
    		}else if(paramMap.get("CODE_TYPE").toString().equals("DETAIL")) {
    			resultList = mobileDAO.getMobileQrCodeDetailItemInfo(paramMap);
    		}


    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileSearchList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		//Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		Map<String, Object> paramMap = new ObjectMapper().readValue(java.net.URLDecoder.decode(param, "UTF-8"), Map.class);
    		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

    		paramMap.put("PAGE_CNT", "20");
    		System.out.println(paramMap);
    		if(paramMap.get("S_TYPE").toString().equals("RSI")) {
    			resultList = mobileDAO.getMobileSearchRsiList(paramMap);
    		}
    		else if(paramMap.get("S_TYPE").toString().equals("MRF")) {
    			resultList = mobileDAO.getMobileSearchMrfList(paramMap);
    		}
    		else if(paramMap.get("S_TYPE").toString().equals("SUMMARY")) {
    			resultList = mobileDAO.getMobileSearchSummaryList(paramMap);
    		}
    		else if(paramMap.get("S_TYPE").toString().equals("DETAIL")) {
    			resultList = mobileDAO.getMobileSearchDetailList(paramMap);
    		}
    		else if(paramMap.get("S_TYPE").toString().equals("MRR_PACKAGE_SEARCH")) {
    			resultList = mobileDAO.getMobileSearchMrrPackageSearch(paramMap);
    		}


    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileOutgoingList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

    		// 호출 Screen 두개 : OutGoingCountsScreen.tsx / DetailItsmScreen.tsx
    		// OutGoingCountsScreen.tsx(RSI_LINE_ID 포함) / DetailItsmScreen.tsx(RSI_LINE_ID 미포함)
    		resultList = mobileDAO.getMobileOutgoingList(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> saveMobileOutgoing(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);

    		List<Map<String, Object>> checkList = materialDAO.getDesmRsiLineOutQtyList(paramMap);
    		if(Integer.parseInt(checkList.get(0).get("HANDOVER_AVAILABLE_QTY").toString()) < Integer.parseInt(paramMap.get("HANDOVER_QTY").toString())) {
    			Map<String, Object> checkMap = new  HashMap<String, Object>();
    			checkMap.put("RSI_LINE_ID", paramMap.get("RSI_LINE_ID"));
    			checkMap.put("HANDOVER_AVAILABLE_QTY", checkList.get(0).get("HANDOVER_AVAILABLE_QTY"));

    			resultMap.put("status", "qtyErr");
    			resultMap.put("data", checkMap);
	    		return resultMap;
    		}

    		//materialDAO.saveDesmRsiOutGoingSave(paramMap);
    		materialDAO.saveDesmRsiOutGoingSaveM(paramMap);
    		materialDAO.saveDesmRsiOutQtySave(paramMap);
    		materialDAO.saveDesmRsiOutQtyCloseSave(paramMap);
    		
    		// TODO: Mobile Outgoing 처리시에, Remain 0인 항목 Location 지우는 작업 필요함. MaterialServiceImpl.saveDesmRsiOutSave참고
    		checkList = materialDAO.getDesmRsiOutPackageQtyListM(paramMap);
    		if(checkList.size() == 1){
    			Map<String, Object> tempParam = checkList.get(0);
    			tempParam.put("USER_AD", "SYSTEM");
    			materialDAO.deleteDesmLocationSummary(tempParam);
    			materialDAO.updateDesmLocationSummary(tempParam);
    			materialDAO.saveIdsmOsSummaryEditLogList(tempParam);
    		}

    		resultMap.put("status", "success");
    		resultMap.put("data", "");

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> saveMobileOutgoingList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		JSONArray list = JSONArray.fromObject(param);

	    	for(int i = 0; i < list.size(); i++) {
	    		JSONObject obj = (JSONObject)list.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);


	    		List<Map<String, Object>> checkList = materialDAO.getDesmRsiLineOutQtyList(row);

	    		if(Integer.parseInt(checkList.get(0).get("HANDOVER_AVAILABLE_QTY").toString()) < Integer.parseInt(row.get("HANDOVER_QTY").toString())) {
	    			Map<String, Object> checkMap = new  HashMap<String, Object>();
	    			checkMap.put("RSI_LINE_ID", row.get("RSI_LINE_ID"));
	    			checkMap.put("HANDOVER_AVAILABLE_QTY", checkList.get(0).get("HANDOVER_AVAILABLE_QTY"));

	    			resultMap.put("status", "qtyErr");
	    			resultMap.put("data", checkMap);
		    		return resultMap;
	    		}

	    		//materialDAO.saveDesmRsiOutGoingSave(row);
	    		materialDAO.saveDesmRsiOutGoingSaveM(row);
	    		materialDAO.saveDesmRsiOutQtySave(row);
	    		materialDAO.saveDesmRsiOutQtyCloseSave(row);
	    		
	    		// TODO: Mobile Outgoing List 처리시에, Remain 0인 항목 Location 지우는 작업 필요함. MaterialServiceImpl.saveDesmRsiOutSave참고
	    		checkList = materialDAO.getDesmRsiOutPackageQtyListM(row);
	    		if(checkList.size() == 1){
	    			Map<String, Object> tempParam = checkList.get(0);
	    			tempParam.put("USER_AD", "SYSTEM");
	    			materialDAO.deleteDesmLocationSummary(tempParam);
	    			materialDAO.updateDesmLocationSummary(tempParam);
	    			materialDAO.saveIdsmOsSummaryEditLogList(tempParam);
	    		}
	    	}

    		resultMap.put("status", "success");
    		resultMap.put("data", "");

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileReturnList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

    		// 호출 Screen 두개 : OutGoingCountsScreen.tsx / DetailItsmScreen.tsx
    		// MrfReturnScreen.tsx(MRF_LINE_ID 포함) / DetailItsmScreen.tsx(RSI_LINE_ID 미포함)
    		resultList = mobileDAO.getMobileReturnList(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> saveMobileReturn(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);

    		List<Map<String, Object>> checkList = materialDAO.getDesmMrfLineReturnList(paramMap);
    		if(Integer.parseInt(checkList.get(0).get("RETURN_AVAILABLE_QTY").toString()) < Integer.parseInt(paramMap.get("RETURN_QTY").toString())) {

    			Map<String, Object> checkMap = new  HashMap<String, Object>();
    			checkMap.put("MRF_LINE_ID", paramMap.get("MRF_LINE_ID"));
    			checkMap.put("RETURN_AVAILABLE_QTY", checkList.get(0).get("RETURN_AVAILABLE_QTY"));

    			resultMap.put("status", "qtyErr");
    			resultMap.put("data", checkMap);
	    		return resultMap;
    		}

    		materialDAO.saveDesmMrfReturnSave(paramMap);
    		materialDAO.saveDesmMrfReturnQtySave(paramMap);
    		materialDAO.saveDesmMrfReturnQtyCloseSave(paramMap);
    		materialDAO.saveDesmRsiOutQtyCloseSave(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", "");

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileCodeList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(java.net.URLDecoder.decode(param, "UTF-8"), Map.class);

    		Map<String, Object> codeMap = new HashMap<String, Object>();

    		paramMap.put("MST_CODE", "R001");
    		codeMap.put("Closed", mobileDAO.getMobileCodeList(paramMap));

    		paramMap.put("MST_CODE", "R002");
    		codeMap.put("Status", mobileDAO.getMobileCodeList(paramMap));

    		paramMap.put("MST_CODE", "R006");
    		codeMap.put("MrrStatus", mobileDAO.getMobileCodeList(paramMap));

    		paramMap.put("MST_CODE", "M003");
    		codeMap.put("MprStatus", mobileDAO.getMobileCodeList(paramMap));

    		resultMap.put("status", "success");
    		resultMap.put("data", codeMap);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileSubconInfo(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

    		resultList = mobileDAO.getMobileSubconInfo(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList.get(0));

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileMapViewDataList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

    		paramMap.put("PAGE_CNT", "20");
    		if(paramMap.get("CODE_TYPE").toString().equals("SUMMARY")) {
    			resultList = mobileDAO.getDesmDesmMapLocationSummaryList(paramMap);
    		}
    		else if(paramMap.get("CODE_TYPE").toString().equals("DETAIL")) {
    			resultList = mobileDAO.getDesmDesmMapLocationDetailList(paramMap);
    		}


    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileMapViewDataCnt(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		Map<String, Object> dataMap = new HashMap<String, Object>();

    		dataMap.put("summaryInfo", mobileDAO.getDesmDesmMapLocationSummaryCnt(paramMap).get(0));
    		dataMap.put("detailInfo", mobileDAO.getDesmDesmMapLocationDetailCnt(paramMap).get(0));

    		resultMap.put("status", "success");
    		resultMap.put("data", dataMap);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getAppVersion() {
    	Map<String, Object> resultMap = new HashMap<String, Object>();
    	try {
    		resultMap = mobileDAO.getAppVersion();
    		resultMap.put("status", "success");
    		return resultMap;
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		return null;
		}
    }

    @Override
    public Map<String, Object> getMobileDetailItemList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

    		paramMap.put("PAGE_CNT", "20");
    		resultList = mobileDAO.getMobileDetailItemList(paramMap);

			resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileVinaQrCodeDetailItemList(String param) throws Exception
    {
    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

    		paramMap.put("PAGE_CNT", "20");
    		resultList = mobileDAO.getMobileVinaQrCodeDetailItemList(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileOutgoingReturnList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

    		paramMap.put("PAGE_CNT", "20");
    		resultList = mobileDAO.getMobileOutgoingReturnList(paramMap);


    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> saveMobileDetailItemInfo(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		Map<String, Object> paramChekcMap = new ObjectMapper().readValue(param, Map.class);

    		List<Map<String, Object>> checkList = materialDAO.getDesmPlDetailEditLogList(paramMap);
    		if(checkList.size() == 0) {
    			paramChekcMap.put("USER_AD", "ADMIN");
    			materialDAO.saveIdsmOsDetailListLog(paramChekcMap);
    		}

    		materialDAO.saveIdsmOsDetailList(paramMap);
    		materialDAO.saveIdsmOsDetailListLog(paramMap);
    		materialDAO.saveIdsmOsSummaryReport(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", "");

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileShippingStatusList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

    		resultList = mobileDAO.getMobileShippingStatusList(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileMprPoList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

    		resultList = mobileDAO.getMobileMprPoList(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileMprProjectList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

    		resultList = mobileDAO.getMobileMprProjectList(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileMprSupplierList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

    		resultList = mobileDAO.getMobileMprSupplierList(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileMprList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

    		resultList = mobileDAO.getMobileMprList(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileMprSupplierAuth(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

    		resultList = mprService.getSupplierAuth(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> getMobileMprDetailList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		Map<String, Object> dataMap = new HashMap<String, Object>();
    		paramMap.put("LANG", "en");

    		dataMap.put("header", mobileDAO.getMobileMprDetailHeaderList(paramMap));
    		dataMap.put("summary", mobileDAO.getMobileMprDetailSummaryList(paramMap));
    		dataMap.put("note", mobileDAO.getMobileMprDetailNoteList(paramMap));
    		dataMap.put("remarks", mobileDAO.getMobileMprDetailRemarksList(paramMap));

    		resultMap.put("status", "success");
    		resultMap.put("data", dataMap);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

	/**
	 * MRR 추가 - 2023.02.16
	 * @param param
	 * @return
	 * @throws Exception
	 */
    @Override
    public Map<String, Object> getMobileMrrList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(java.net.URLDecoder.decode(param, "UTF-8"), Map.class);
    		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

    		paramMap.put("PAGE_CNT", "20");
    		resultList = mobileDAO.getMobileMrrList(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		e.printStackTrace();
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

	@Override
	public Map<String, Object> getMobileMrrHeaderList(String param) throws Exception {
    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(java.net.URLDecoder.decode(param, "UTF-8"), Map.class);
    		paramMap.put("PAGE_CNT", "20");
    		List<Map<String, Object>> resultList = mobileDAO.getMobileMrrHeaderList(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
	}

	@Override
	public Map<String, Object> getMobileMrrLineList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(java.net.URLDecoder.decode(param, "UTF-8"), Map.class);
    		paramMap.put("PAGE_CNT", "20");
    		List<Map<String, Object>> resultList = mobileDAO.getMobileMrrLineList(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
	}

    @Override
    public Map<String, Object> saveMobileMrr(String param, Map<String, Object> paramMailMap) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();
    	int cnt = 0;
    	try {
    		//System.out.println("11111111111111111111111111");
    		//System.out.println(java.net.URLDecoder.decode(param.substring(0, param.length() - 1), "UTF-8").toString());
    		//System.out.println("22222222222222222");
    		//Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);
    		//Map<String, Object> paramMap = new ObjectMapper().readValue(java.net.URLDecoder.decode(param.substring(0, param.length() - 1), "UTF-8"), Map.class);
    		Map<String, Object> paramMap = new ObjectMapper().readValue(java.net.URLDecoder.decode(param, "UTF-8"), Map.class);
    		
    		if(paramMap.get("MRR_HEADER_ID") == null || paramMap.get("MRR_HEADER_ID").toString().equals("")) {
    			List<Map<String, Object>> list = materialDAO.getDesmMrrHeaderData(paramMap);

    			paramMap.put("MRR_HEADER_ID", list.get(0).get("MRR_HEADER_ID"));
    			paramMap.put("MRR_NO", list.get(0).get("MRR_NO"));
    		}
    		resultMap.put("MRR_HEADER_ID", paramMap.get("MRR_HEADER_ID"));
    		
    		if(paramMap.get("TRANS_TYPE").toString().equals("Incomplete")) {
				paramMap.put("STATUS", "Incomplete");

//				if(paramMap.get("PREPARED_BY") != null && !paramMap.get("PREPARED_BY").toString().equals("")) {
//					paramMap.put("P_USER_AD", paramMap.get("PREPARED_BY"));
//					/*List<Map<String, Object>> userList = materialDAO.getDesmRsiUserList(paramMap);
//					if(userList.size() > 0) {
//						if(userList.get(0).get("DEPT_NAME") != null) {
//							paramMap.put("SUBCONTRACTOR", userList.get(0).get("DEPT_NAME")); //????
//						}
//
//					}*/
//				}
			}
//			else if(paramMap.get("TRANS_TYPE").toString().equals("Pre-Checked")) {
//				paramMap.put("STATUS", "Pre-Checked");
//				paramMap.put("PREPARED_BY", paramMap.get("USER_AD"));
//				
//				paramMap.put("P_USER_AD", paramMap.get("USER_AD"));
//				/*List<Map<String, Object>> userList = materialDAO.getDesmRsiUserList(paramMap);
//				if(userList.size() > 0) {
//					if(userList.get(0).get("DEPT_NAME") != null) {
//						paramMap.put("SUBCONTRACTOR", userList.get(0).get("DEPT_NAME"));
//					}
//
//				}*/
//			}
			else if(paramMap.get("TRANS_TYPE").toString().equals("Pre-Confirmed")) {
				paramMap.put("STATUS", "Pre-Confirmed");
				paramMap.put("PREPARED_BY", paramMap.get("USER_AD"));
				//paramMap.put("APPROVED_BY", "JAEHONG.JOO");
			}
			else if(paramMap.get("TRANS_TYPE").toString().equals("Confirmed")) {
				paramMap.put("STATUS", "Confirmed");
				paramMap.put("CONFIRMED_BY", paramMap.get("USER_AD"));
			}
			
			resultMap.put("STATUS", paramMap.get("STATUS"));
			
			//System.out.println("===========");
			//System.out.println(paramMap.get("updateList").toString());
			//JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList"));
			//JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
			//System.out.println("===========" + updateList.size());
			List<Map<String, Object>>  updateList = (List<Map<String, Object>>)paramMap.get("updateList");
			//System.out.println("1111111111111111111111");
			
			// MRR LINE의 Update List 있을 경우
	    	for(int i = 0; i < updateList.size(); i++) {
	    		//JSONObject obj = (JSONObject)updateList.get(i);
	    		
	    		//Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		Map<String, Object> row = updateList.get(i);
	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("MRR_HEADER_ID", paramMap.get("MRR_HEADER_ID"));
	    		
	    		// 현재 updateList와 deleteList 다 포함되어있을 수 있지만 update -> delete 순서라서 큰 상관은 없을 듯 합니다.
	    		if(row.get("MRR_LINE_ID") == null || row.get("MRR_LINE_ID").toString().equals("")) {
	    			// TODO: 신규 생성되면서 저장시키는 MRR_LINE의 경우 LINE의 MRR_LINE_ID는 Mobile에서 가지고 있지 않을 수 있고,
	    			//       그 상태에서 deleteList로 넘어오면 삭제 안되는 현상있음.
	    			// MRR_LINE_ID가 NULL이면, paramMap.get("MRR_HEADER_ID")랑, row.get의 TRK_ITEM_NAME / PACKAGE_LIST_NO / PACKAGE_NO 로 MRR_LINE_ID를 가져와서 ROW.PUT하기
	    			Map<String, Object> currentMrrLineId = mobileDAO.getMobileMrrLineId(row);
	    			
	    			if(currentMrrLineId == null) {
	    				row.put("MRR_LINE_ID", "");
	    			} 
	    			else row.put("MRR_LINE_ID", currentMrrLineId.get("MRR_LINE_ID").toString());
	    		}
	    		
	    		row.put("VISUAL_CHECKED_BY", paramMap.get("USER_AD")); // row.put("VISUAL_CHECKED_BY", "");
	    		
	    		//Line Attach grp cd 추가
	    		boolean whileCheck = true;
	    		if(row.get("ATTACH_GRP_CD") == null || row.get("ATTACH_GRP_CD").toString().equals("") || row.get("ATTACH_GRP_CD").toString().equals("null")) {
	    			whileCheck = true;
	    			while(whileCheck) {
		    			row.put("ATTACH_GRP_CD", UUID.randomUUID().toString());
		    			row.put("FILE_GRP_CD", row.get("ATTACH_GRP_CD"));	    			
		    			List<Map<String, Object>> fileCheckList = idsmFileService.getIdsmSetupDlgItemScheduleFileCheckGrp(row);
		    			
		    			if(fileCheckList.size() == 0) {
		    				whileCheck = false;
		    			}
	    			}
	    		}
	    		
	    		
	    		//cnt = materialDAO.saveDesmMrrLineSave(row);
	    		cnt = mobileDAO.saveMobileMrrLineSave(row);
	    		
	    	}
	    	// MRR LINE의 Update List 있을 경우 end

	    	// MRR LINE의 Delete List 있을 경우
	    	//System.out.println("22222222222222222222");
	    	List<Map<String, Object>>  deleteList = (List<Map<String, Object>>)paramMap.get("deleteList");
			
			for(int i = 0; i < deleteList.size(); i++) {
	    		//JSONObject obj = (JSONObject)updateList.get(i);
	    		
	    		//Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		Map<String, Object> row = deleteList.get(i);
	    		
	    		if(row.get("MRR_LINE_ID") == null || row.get("MRR_LINE_ID").toString().equals("")) {
	    			//row.put("MRR_LINE_ID", "");
	    			// TODO: 신규 생성되면서 저장시키는 MRR_LINE의 경우 LINE의 MRR_LINE_ID는 Mobile에서 가지고 있지 않을 수 있고,
	    			//       그 상태에서 deleteList로 넘어오면 삭제 안되는 현상있음.
	    			// MRR_LINE_ID가 NULL이면, paramMap.get("MRR_HEADER_ID")랑, row.get의 TRK_ITEM_NAME / PACKAGE_LIST_NO / PACKAGE_NO 로 MRR_LINE_ID를 가져와서 ROW.PUT하기
	    			Map<String, Object> currentMrrLineId = mobileDAO.getMobileMrrLineId(row);
	    			
	    			if(currentMrrLineId == null) {
	    				row.put("MRR_LINE_ID", "");
	    			} 
	    			else row.put("MRR_LINE_ID", currentMrrLineId.get("MRR_LINE_ID").toString());
	    		}
	    		
	    		//cnt = materialDAO.saveDesmMrrLineSave(row);
	    		materialDAO.deleteDesmMrrDtl(row);
	    		
	    	}
			// MRR LINE의 Delete List 있을 경우
			
			
			//System.out.println("3333333333333333");
	    	//cnt = materialDAO.saveDesmMrrHeaderSave(paramMap);
			// MRR Header save
			// MRR Header Attach GRP CD 추가
			boolean whileCheck = true;
    		if(paramMap.get("ATTACH_GRP_CD") == null || paramMap.get("ATTACH_GRP_CD").toString().equals("") || paramMap.get("ATTACH_GRP_CD").toString().equals("null")) {
    			whileCheck = true;
    			while(whileCheck) {
    				paramMap.put("ATTACH_GRP_CD", UUID.randomUUID().toString());
    				paramMap.put("FILE_GRP_CD", paramMap.get("ATTACH_GRP_CD"));	    			
	    			List<Map<String, Object>> fileCheckList = idsmFileService.getIdsmSetupDlgItemScheduleFileCheckGrp(paramMap);
	    			
	    			if(fileCheckList.size() == 0) {
	    				whileCheck = false;
	    			}
    			}
    		}
	    	cnt = mobileDAO.saveMobileMrrHeaderSave(paramMap);
			
    		
    		paramMailMap.put("MRR_HEADER_ID", paramMap.get("MRR_HEADER_ID"));
    		paramMailMap.put("STATUS", paramMap.get("STATUS"));
    		paramMailMap.put("USER_AD", paramMap.get("USER_AD"));

    		if(paramMap.get("TRANS_TYPE").toString().equals("Pre-Confirmed")  || paramMap.get("TRANS_TYPE").toString().equals("Confirmed") ) {
    			materialService.sendMailDesmMrr(paramMailMap);
    		}

    		resultMap.put("status", "success");
    		resultMap.put("data", "");

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> saveMobileMrrReject(String param, Map<String, Object> paramMailMap) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class);


    		materialDAO.saveDesmMrrReject(paramMap);

    		paramMailMap.put("MRR_HEADER_ID", paramMap.get("MRR_HEADER_ID"));
    		paramMailMap.put("STATUS", paramMap.get("STATUS"));
    		paramMailMap.put("USER_AD", paramMap.get("USER_AD"));


    		materialService.sendMailDesmMrr(paramMailMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", "");

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

	@Override
    public Map<String, Object> getIdsmOsSummaryMrrMobileList(String param) throws Exception {
    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(java.net.URLDecoder.decode(param, "UTF-8"), Map.class);
    		List<Map<String, Object>> resultList = mobileDAO.getIdsmOsSummaryMrrMobileList(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }
	
	
	@Override
    public Map<String, Object> saveMobileMrrDelete(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(java.net.URLDecoder.decode(param, "UTF-8"), Map.class);
    		
    		materialDAO.deleteDesmMrrDtlAll(paramMap);
    		materialDAO.deleteDesmMrrMst(paramMap);
    		
	    	
    		resultMap.put("status", "success");
    		resultMap.put("data", "");

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }
	
	@Override
    public Map<String, Object> saveMobileMrrLineDelete(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(java.net.URLDecoder.decode(param, "UTF-8"), Map.class);
    		//JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
    		List<Map<String, Object>>  deleteList = (List<Map<String, Object>>)paramMap.get("deleteList");
    		
    		for(int i = 0; i < deleteList.size(); i++) {
	    		//JSONObject obj = (JSONObject)deleteList.get(i);
    			Map<String, Object> row = deleteList.get(i);
	    		//Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD").toString());
	    		materialDAO.deleteDesmMrrDtl(row);
	    	}
	    	
    		resultMap.put("status", "success");
    		resultMap.put("data", "");

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }
	
	@Override
    public Map<String, Object> getMobileMrrHeaderAttachList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(java.net.URLDecoder.decode(param, "UTF-8"), Map.class);
    		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

    		//paramMap.put("PAGE_CNT", "20");
    		resultList = mobileDAO.getMobileMrrHeaderAttachList(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		e.printStackTrace();
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }
	
	@Override
    public Map<String, Object> getMobileAttachList(String param) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(java.net.URLDecoder.decode(param, "UTF-8"), Map.class);
    		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

    		//paramMap.put("PAGE_CNT", "20");
    		resultList = mobileDAO.getMobileMrrHeaderAttachList(paramMap);

    		resultMap.put("status", "success");
    		resultMap.put("data", resultList);

    	}
    	catch (Exception e) {
    		e.printStackTrace();
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }
	
	@Override
    public List getMobileUserList(String paramString) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();

    	try {
    		Map<String, Object> paramMap = new ObjectMapper().readValue(java.net.URLDecoder.decode(paramString, "UTF-8"), Map.class);
    		
        	list = mobileDAO.getMobileUserList(paramMap);

        	HashMap<String, Object> map = new HashMap<String, Object>();


        	for (Object el : list) {
        		HashMap<String, String> row = (HashMap)el;

        		map = new HashMap<String, Object>();
        		map.put("label",
            			row.get("USER_AD").toString() + "&nbsp;&nbsp;" +
            			row.get("DEPT_NAME").toString() + "&nbsp;&nbsp;" +
            			row.get("USER_NAME").toString()
            	);
        		map.put("value",
            			row.get("USER_NAME").toString() + "|" +
    					row.get("USER_AD").toString() + "|" +
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
	public String getMobileAttachGrpCd(String paramString) {
		boolean whileCheck = true;
		Map<String, Object> mapCheck = new HashMap<String, Object>();
		whileCheck = true;
		while(whileCheck) {
			mapCheck.put("ATTACH_GRP_CD", UUID.randomUUID().toString());
			mapCheck.put("FILE_GRP_CD", mapCheck.get("ATTACH_GRP_CD"));
			List<Map<String, Object>> fileCheckList = idsmFileService.getIdsmSetupDlgItemScheduleFileCheckGrp(mapCheck);
			
			if(fileCheckList.size() == 0) {
				whileCheck = false;
			}
		}
		return mapCheck.get("ATTACH_GRP_CD").toString();
	}

}

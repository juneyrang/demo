package egovframework.desm.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.desm.service.AdminService;
import egovframework.desm.service.DesmService;
import egovframework.desm.service.IdsmFileService;
import egovframework.desm.service.MaterialService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service("materialService")
public class MaterialServiceImpl extends EgovAbstractServiceImpl implements MaterialService {

	/*
	 * MaterialDAO
	 */
	@Resource(name = "materialDAO")
	private MaterialDAO materialDAO;

	@Resource(name = "adminService")
	private AdminService adminService;

	@Resource(name = "desmService")
	private DesmService desmService;
	
	@Resource(name = "idsmFileService")
	private IdsmFileService idsmFileService;
	
	

	@Resource(name = "adminDAO")
	private AdminDAO adminDAO;
	/**
	 *
	 *
	 * @메소드명 	: getVoyageList
	 * @날짜 		: 2021. 10. 21 오전 11:40:45
	 * @작성자 		: Cho HeumJun
	 * @설명
	 * <pre>
	 *		항차 리스트
	 * </pre>
	 *
	 * @param paramMap
	 * @return
	 */
	@Override
    public List<Map<String, Object>> getVoyageList(Map<String, Object> paramMap) {
        return materialDAO.getVoyageList(paramMap);
    }

	/**
	 *
	 *
	 * @메소드명 	: getMaterialList
	 * @날짜 		: 2021. 10. 21 오전 11:40:45
	 * @작성자 		: Cho HeumJun
	 * @설명
	 * <pre>
	 *		현장자재관리 리스트
	 * </pre>
	 *
	 * @param paramMap
	 * @return
	 */
	@Override
    public List<Map<String, Object>> getPackingList(Map<String, Object> paramMap) {
        return materialDAO.getPackingList(paramMap);
    }


	@Override
   public List<Map<String, Object>> getIdsmOsSummaryList(Map<String, Object> paramMap) {
		if(paramMap.get("LOCATION") != null && !paramMap.get("LOCATION").toString().equals("")) {
			String[] locationArr = paramMap.get("LOCATION").toString().split("!!!");
			List<Map<String, Object>> lList = new ArrayList<Map<String,Object>>();

			for (int i = 0; i < locationArr.length; i++) {
				Map<String, Object> row = new HashMap<String, Object>();
				row.put("LOCATION", locationArr[i]);

				lList.add(row);
				
			}
			
			// Package에 Location 존재여부로 판단할 때의 검색조건 추가..
			if(lList.get(0).get("LOCATION").equals("ALL EXISTS") || lList.get(0).get("LOCATION").equals("ALL NOT EXISTS")) {
				paramMap.put("LOCATION_EXIST", lList.get(0).get("LOCATION").toString());
			}
			else {
				paramMap.put("LOCATION_LIST", lList);
			}
		}

       return materialDAO.getIdsmOsSummaryList(paramMap);
   }

	@Override
	public List<Map<String, Object>> getIdsmOsDetailList(Map<String, Object> paramMap) {
		if(paramMap.get("LOCATION") != null && !paramMap.get("LOCATION").toString().equals("")) {
			String[] locationArr = paramMap.get("LOCATION").toString().split("!!!");
			List<Map<String, Object>> lList = new ArrayList<Map<String,Object>>();

			for (int i = 0; i < locationArr.length; i++) {
				Map<String, Object> row = new HashMap<String, Object>();
				row.put("LOCATION", locationArr[i]);

				lList.add(row);
			}

			paramMap.put("LOCATION_LIST", lList);
		}
	       return materialDAO.getIdsmOsDetailList(paramMap);
	}

	@Override
	public Map<String, Object> getIdsmOsSummaryListMirCheck(Map<String, Object> paramMap)  throws Exception {

		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> checkList = new ArrayList<Map<String,Object>>();

    	try {
			JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
	    	for(int i = 0; i < list.size(); i++) {
	    		JSONObject obj = (JSONObject)list.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		List<Map<String, Object>> statusList = materialDAO.getIdsmOsSummaryListMirCheck(row);

	    		if(statusList.size() > 0) {
	    			if(!statusList.get(0).get("STATUS").toString().equals("cancel")) {
	    				checkList.add(statusList.get(0));
	    			}
	    		}
	    	}

	    	resultMap.put("checkList", checkList);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}

	    return resultMap;
	}

    @Override
    public Map<String, Object> saveIdsmOsSummaryListMirCreation(Map<String, Object> paramMap) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {

    		//List<Map<String, Object>> mirNoList = materialDAO.getIdsmOsSummaryListMirNo(null);
    		//paramMap.put("MIR_NO", mirNoList.get(0).get("MIR_NO"));

			JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
	    	for(int i = 0; i < list.size(); i++) {
	    		JSONObject obj = (JSONObject)list.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		paramMap.put("PACKAGE_NO", row.get("PACKAGE_NO"));
	    		paramMap.put("PROJECT_NO", row.get("PROJECT_NO"));
	    		paramMap.put("TRK_ITEM_NAME", row.get("TRK_ITEM_NAME"));
	    		paramMap.put("STATUS", "create");

	    		materialDAO.saveIdsmOsSummaryListMirCreation(paramMap);
	    	}

	    	resultMap.put("MIR_NO", paramMap.get("MIR_NO"));
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

	@Override
	public Map<String, Object> getIdsmOsSummaryListMirCancelCheck(Map<String, Object> paramMap)  throws Exception {

		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> checkList = new ArrayList<Map<String,Object>>();

    	try {
			JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
	    	for(int i = 0; i < list.size(); i++) {
	    		JSONObject obj = (JSONObject)list.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		List<Map<String, Object>> statusList = materialDAO.getIdsmOsSummaryListMirCancelCheck(row);

	    		if(statusList.size() > 0) {
	    			if(!statusList.get(0).get("STATUS").toString().equals("cancel")) {
	    				checkList.add(statusList.get(0));
	    			}
	    		}
	    	}

	    	resultMap.put("checkList", checkList);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}

	    return resultMap;
	}

    @Override
    public int saveIdsmOsSummaryListMirCancel(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
			JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
	    	for(int i = 0; i < list.size(); i++) {
	    		JSONObject obj = (JSONObject)list.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("STATUS", "cancel");
	    		row.put("USER_AD", paramMap.get("USER_AD"));

	    		cnt = materialDAO.saveIdsmOsSummaryListMirCancel(row);
	    	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

    @Override
    public int saveIdsmOsSummaryListMirAccept(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
			JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
	    	for(int i = 0; i < list.size(); i++) {
	    		JSONObject obj = (JSONObject)list.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("STATUS", "accept");
	    		row.put("USER_AD", paramMap.get("USER_AD"));

	    		cnt = materialDAO.saveIdsmOsSummaryListMirAccept(row);
	    	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

    @Override
    public int saveIdsmOsSummaryListConfirmMaterial(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
			JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
	    	for(int i = 0; i < list.size(); i++) {
	    		JSONObject obj = (JSONObject)list.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));

	    		cnt = materialDAO.saveIdsmOsSummaryListConfirmMaterial(row);
	    	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

	@Override
	public Map<String, Object> getIdsmOsSummaryListMirAcceptCheck(Map<String, Object> paramMap)  throws Exception {

		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> checkList = new ArrayList<Map<String,Object>>();

    	try {
			JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
	    	for(int i = 0; i < list.size(); i++) {
	    		JSONObject obj = (JSONObject)list.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		List<Map<String, Object>> statusList = materialDAO.getIdsmOsSummaryListMirAcceptCheck(row);

	    		if(statusList.size() == 0 || statusList.get(0).get("CHECK_YN").toString().equals("N")) {
	    			checkList.add(row);
	    		}
	    	}

	    	resultMap.put("checkList", checkList);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}

	    return resultMap;
	}

    @Override
    public int saveIdsmOsSummaryList(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
			JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
	    	for(int i = 0; i < list.size(); i++) {
	    		JSONObject obj = (JSONObject)list.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		List<Map<String, Object>> checkList = materialDAO.getDesmPlSummaryEditLogList(row);
	    		if(checkList.size() == 0) {
	    			row.put("USER_AD", "ADMIN");
	    			cnt = materialDAO.saveIdsmOsSummaryEditLogList(row);
	    		}

	    		row.put("USER_AD", paramMap.get("USER_AD"));

	    		cnt = materialDAO.saveIdsmOsSummaryList(row);
	    		cnt = materialDAO.saveIdsmOsSummaryEditLogList(row);
	    	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

	@Override
	public Map<String, Object> getIdsmOsSummaryListRfiCheck(Map<String, Object> paramMap)  throws Exception {

		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> checkList = new ArrayList<Map<String,Object>>();

    	try {
			JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
	    	for(int i = 0; i < list.size(); i++) {
	    		JSONObject obj = (JSONObject)list.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		List<Map<String, Object>> statusList = materialDAO.getIdsmOsSummaryListRfiCheck(row);

	    		Map<String, Object> checkRow = new HashMap<String, Object>();
	    		if(statusList.size() == 0) {
	    			checkRow.put("PACKAGE_NO", row.get("PACKAGE_NO"));
	    			checkList.add(checkRow);
	    		}
	    		else {
	    			if(statusList.get(0).get("CHECK_YN").toString().equals("N")) {
	    				checkRow.put("PACKAGE_NO", statusList.get(0).get("PACKAGE_NO"));
	    				checkList.add(checkRow);
	    			}
	    		}
	    	}

	    	resultMap.put("checkList", checkList);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}

	    return resultMap;
	}

	 @Override
	    public Map<String, Object> saveIdsmOsSummaryListRfiCreation(Map<String, Object> paramMap) throws Exception {

	    	Map<String, Object> resultMap = new HashMap<String, Object>();

	    	try {

	    		List<Map<String, Object>> mirNoList = materialDAO.getIdsmOsSummaryListRfiNo(null);
	    		paramMap.put("RFI_NO", mirNoList.get(0).get("RFI_NO"));

				JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
		    	for(int i = 0; i < list.size(); i++) {
		    		JSONObject obj = (JSONObject)list.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

		    		paramMap.put("PACKAGE_NO", row.get("PACKAGE_NO"));
		    		paramMap.put("PROJECT_NO", row.get("PROJECT_NO"));
		    		paramMap.put("TRK_ITEM_NAME", row.get("TRK_ITEM_NAME"));
		    		paramMap.put("STATUS", "create");

		    		materialDAO.saveIdsmOsSummaryListRfiCreation(paramMap);
		    	}

		    	resultMap.put("RFI_NO", paramMap.get("RFI_NO"));
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return resultMap;
	    }

		@Override
		public Map<String, Object> getIdsmOsSummaryListRfiCancelCheck(Map<String, Object> paramMap)  throws Exception {

			Map<String, Object> resultMap = new HashMap<String, Object>();
			List<Map<String, Object>> checkList = new ArrayList<Map<String,Object>>();

	    	try {
				JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
		    	for(int i = 0; i < list.size(); i++) {
		    		JSONObject obj = (JSONObject)list.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

		    		List<Map<String, Object>> statusList = materialDAO.getIdsmOsSummaryListRfiCancelCheck(row);

		    		if(statusList.size() > 0) {
		    			if(statusList.get(0).get("CHECK_YN").toString().equals("N")) {
		    				checkList.add(statusList.get(0));
		    			}
		    		}
		    	}

		    	resultMap.put("checkList", checkList);
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}

		    return resultMap;
		}

	   @Override
	    public int saveIdsmOsSummaryListRfiCancel(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
				JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
		    	for(int i = 0; i < list.size(); i++) {
		    		JSONObject obj = (JSONObject)list.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

		    		row.put("STATUS", "cancel");
		    		row.put("USER_AD", paramMap.get("USER_AD"));

		    		cnt = materialDAO.saveIdsmOsSummaryListRfiCancel(row);
		    	}
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

	   @Override
		public Map<String, Object> getIdsmOsSummaryListRfiAcceptCheck(Map<String, Object> paramMap)  throws Exception {

			Map<String, Object> resultMap = new HashMap<String, Object>();
			List<Map<String, Object>> checkList = new ArrayList<Map<String,Object>>();

	    	try {
				JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
		    	for(int i = 0; i < list.size(); i++) {
		    		JSONObject obj = (JSONObject)list.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

		    		List<Map<String, Object>> statusList = materialDAO.getIdsmOsSummaryListRfiAcceptCheck(row);

		    		if(statusList.size() == 0 || statusList.get(0).get("CHECK_YN").toString().equals("N")) {
		    			checkList.add(row);
		    		}
		    	}

		    	resultMap.put("checkList", checkList);
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}

		    return resultMap;
		}

	    @Override
	    public int saveIdsmOsSummaryListRfiAccept(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
				JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
		    	for(int i = 0; i < list.size(); i++) {
		    		JSONObject obj = (JSONObject)list.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

		    		row.put("STATUS", "accept");
		    		row.put("USER_AD", paramMap.get("USER_AD"));

		    		cnt = materialDAO.saveIdsmOsSummaryListRfiAccept(row);
		    	}
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

	    @Override
	    public int saveIdsmRfiCreationSetUp(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
				JSONArray list = JSONArray.fromObject(paramMap.get("AppliedProcedureUpdateList").toString());
		    	for(int i = 0; i < list.size(); i++) {
		    		JSONObject obj = (JSONObject)list.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

		    		row.put("USER_AD", paramMap.get("USER_AD"));
		    		row.put("SEQ", row.get("SEQ") == null ? "" : row.get("SEQ").toString());

		    		cnt = materialDAO.saveIdsmRfiCreationSetUpAppliedProcedure(row);
		    	}

				list = JSONArray.fromObject(paramMap.get("ProcedureUpdateList").toString());
		    	for(int i = 0; i < list.size(); i++) {
		    		JSONObject obj = (JSONObject)list.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

		    		row.put("USER_AD", paramMap.get("USER_AD"));
		    		row.put("SEQ", row.get("SEQ") == null ? "" : row.get("SEQ").toString());
		    		cnt = materialDAO.saveIdsmRfiCreationSetUpProcedure(row);
		    	}

				list = JSONArray.fromObject(paramMap.get("InspectionUpdateList").toString());
		    	for(int i = 0; i < list.size(); i++) {
		    		JSONObject obj = (JSONObject)list.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

		    		row.put("USER_AD", paramMap.get("USER_AD"));
		    		row.put("SEQ", row.get("SEQ") == null ? "" : row.get("SEQ").toString());
		    		cnt = materialDAO.saveIdsmRfiCreationSetUpInspection(row);
		    	}

		    	cnt = materialDAO.saveIdsmRfiCreationSetUpAttachments(paramMap);
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

		@Override
	    public List<Map<String, Object>> getIdsmRfiCreationSetUpAppliedProcedure(Map<String, Object> paramMap) {
	        return materialDAO.getIdsmRfiCreationSetUpAppliedProcedure(paramMap);
	    }

		@Override
	    public List<Map<String, Object>> getIdsmRfiCreationSetUpProcedure(Map<String, Object> paramMap) {
	        return materialDAO.getIdsmRfiCreationSetUpProcedure(paramMap);
	    }

		@Override
	    public List<Map<String, Object>> getIdsmRfiCreationSetUpInspection(Map<String, Object> paramMap) {
	        return materialDAO.getIdsmRfiCreationSetUpInspection(paramMap);
	    }

		@Override
	    public List<Map<String, Object>> getIdsmRfiCreationSetUpAttachments(Map<String, Object> paramMap) {
	        return materialDAO.getIdsmRfiCreationSetUpAttachments(paramMap);
	    }

	    @Override
	    public int deleteIdsmCreateItemSetupAppliedProcedure(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
				JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
		    	for(int i = 0; i < deleteList.size(); i++) {
		    		JSONObject obj = (JSONObject)deleteList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		row.put("USER_AD", paramMap.get("USER_AD").toString());

		    		cnt = materialDAO.deleteIdsmCreateItemSetupAppliedProcedure(row);
		    	}
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

	    @Override
	    public int deleteIdsmCreateItemSetupProcedure(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
				JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
		    	for(int i = 0; i < deleteList.size(); i++) {
		    		JSONObject obj = (JSONObject)deleteList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		row.put("USER_AD", paramMap.get("USER_AD").toString());

		    		cnt = materialDAO.deleteIdsmCreateItemSetupProcedure(row);
		    	}
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

	    @Override
	    public int deleteIdsmCreateItemSetupInspection(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
				JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
		    	for(int i = 0; i < deleteList.size(); i++) {
		    		JSONObject obj = (JSONObject)deleteList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		row.put("USER_AD", paramMap.get("USER_AD").toString());

		    		cnt = materialDAO.deleteIdsmCreateItemSetupInspection(row);
		    	}
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

		@Override
	    public Map<String, Object> getIdsmRfiCreationCode(Map<String, Object> paramMap) {

			Map<String, Object> resultMap = new HashMap<String, Object>();


			List<Map<String, Object>> AppliedProcedureCodeList = materialDAO.getIdsmRfiCreationSetUpAppliedProcedure(paramMap);
			List<Map<String, Object>> ProcedureCodeList = materialDAO.getIdsmRfiCreationSetUpProcedure(paramMap);
			List<Map<String, Object>> InspectionCodeList = materialDAO.getIdsmRfiCreationSetUpInspection(paramMap);
			List<Map<String, Object>> AttachmentsList = materialDAO.getIdsmRfiCreationSetUpAttachments(paramMap);
			List<Map<String, Object>> loginList = materialDAO.getIdsmRfiCreationLoginInfoList(paramMap);
			List<Map<String, Object>> dtList = materialDAO.getIdsmRfiCreationDtList(paramMap);

			resultMap.put("AppliedProcedureCodeList", AppliedProcedureCodeList);
			resultMap.put("ProcedureCodeList", ProcedureCodeList);
			resultMap.put("InspectionCodeList", InspectionCodeList);
			resultMap.put("AttachmentsList", AttachmentsList);
			resultMap.put("loginList", loginList);
			resultMap.put("dtList", dtList);


	        return resultMap;
	    }

		@Override
	    public List<Map<String, Object>> getIdsmMirCreationLastData(Map<String, Object> paramMap) {
	        return materialDAO.getIdsmMirCreationLastData(paramMap);
	    }

		@Override
	    public List<Map<String, Object>> getDesmRsiPlDetailList(Map<String, Object> paramMap) {
	        return materialDAO.getDesmRsiPlDetailList(paramMap);
	    }

	    @Override
	    public Map<String, Object> saveDesmRsiSave(Map<String, Object> paramMap) throws Exception {

	    	Map<String, Object> resultMap = new HashMap<String, Object>();
	    	int cnt = 0;
	    	try {

	    		if(paramMap.get("RSI_HEADER_ID") == null || paramMap.get("RSI_HEADER_ID").toString().equals("")) {
	    			List<Map<String, Object>> list = materialDAO.getDesmRsiHeaderData(paramMap);

	    			paramMap.put("RSI_HEADER_ID", list.get(0).get("RSI_HEADER_ID"));
	    			paramMap.put("RSI_NO", list.get(0).get("RSI_NO"));
	    		}
	    		resultMap.put("RSI_HEADER_ID", paramMap.get("RSI_HEADER_ID"));

    			if(paramMap.get("TRANS_TYPE").toString().equals("Incomplete")) {
    				paramMap.put("STATUS", "Incomplete");

    				if(paramMap.get("REQUESTED_BY") != null && !paramMap.get("REQUESTED_BY").toString().equals("")) {
    					paramMap.put("P_USER_AD", paramMap.get("REQUESTED_BY"));
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

					paramMap.put("P_USER_AD", paramMap.get("USER_AD"));
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
    			resultMap.put("STATUS", paramMap.get("STATUS"));

				JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
		    	for(int i = 0; i < updateList.size(); i++) {
		    		JSONObject obj = (JSONObject)updateList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		row.put("USER_AD", paramMap.get("USER_AD"));
		    		row.put("RSI_HEADER_ID", paramMap.get("RSI_HEADER_ID"));

		    		int qtyIdx = row.get("REQ_QTY").toString().indexOf(".");
		    		if(qtyIdx != -1) {
		    			String Qty = row.get("REQ_QTY").toString().substring(0, qtyIdx);
		    			row.put("REQ_QTY", Qty);
		    		}

		    		List<Map<String, Object>> checkList = materialDAO.getDesmRsiLineQtyList(row);
		    		if(Integer.parseInt(checkList.get(0).get("REQ_AVAILABLE_QTY").toString()) < Integer.parseInt(row.get("REQ_QTY").toString())) {
		    			resultMap.put("error", "QTY");
		    			resultMap.put("MATERIAL_CODE", row.get("MATERIAL_CODE"));
		    			resultMap.put("REQ_AVAILABLE_QTY", checkList.get(0).get("REQ_AVAILABLE_QTY"));
			    		return resultMap;
		    		}

		    		cnt = materialDAO.saveDesmRsiLineSave(row);
		    		cnt = materialDAO.saveDesmRsiQtySave(row);
		    	}

		    	cnt = materialDAO.saveDesmRsiHeaderSave(paramMap);
		    	cnt = materialDAO.saveDesmRsiHeaderProjectSave(paramMap);

		    	/*
	    		if(paramMap.get("TRANS_TYPE").toString().equals("Approved")) {
	    			cnt = materialDAO.saveDesmRsiOutQtySave(paramMap);
	    		}*/


	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return resultMap;
	    }

		@Override
	    public List<Map<String, Object>> getDesmRsiList(Map<String, Object> paramMap) {
	        return materialDAO.getDesmRsiList(paramMap);
	    }

		@Override
	    public Map<String, Object> getDesmRsiInfoList(Map<String, Object> paramMap) {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("headerList", materialDAO.getDesmRsiHeaderList(paramMap));
			resultMap.put("lineList", materialDAO.getDesmRsiLineList(paramMap));

	        return resultMap;
	    }

	    @Override
	    public int saveDesmRsiFileGrpCd(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
	    		materialDAO.saveDesmRsiFileGrpCd(paramMap);
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

	    @Override
	    public int deleteDesmRsiDtl(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
				JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
		    	for(int i = 0; i < deleteList.size(); i++) {
		    		JSONObject obj = (JSONObject)deleteList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		row.put("USER_AD", paramMap.get("USER_AD").toString());

		    		cnt = materialDAO.deleteDesmRsiDtl(row);
		    		cnt = materialDAO.saveDesmRsiQtySave(row);
		    	}
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

	    @Override
	    public int saveDesmRsiReject(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
	    		cnt = materialDAO.saveDesmRsiReject(paramMap);
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

	    @Override
	    public List getDesmRsiUserList(Map<String, Object> paramMap) {
	    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
	    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();

	    	try {
	        	list = materialDAO.getDesmRsiUserList(paramMap);

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
	    public List<Map<String, Object>> getDesmRsiUserSubconList(Map<String, Object> paramMap) {
	        return materialDAO.getDesmRsiUserList(paramMap);
	    }

		@Override
	    public List<Map<String, Object>> getDesmOutGoingCreationList(Map<String, Object> paramMap) {
	        return materialDAO.getDesmOutGoingCreationList(paramMap);
	    }

		@Override
	    public Map<String, Object> saveDesmRsiOutSave(Map<String, Object> paramMap) throws Exception {

	    	Map<String, Object> resultMap = new HashMap<String, Object>();
	    	int cnt = 0;
	    	try {


				JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
		    	for(int i = 0; i < updateList.size(); i++) {
		    		JSONObject obj = (JSONObject)updateList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		row.put("USER_AD", paramMap.get("USER_AD"));


		    		List<Map<String, Object>> checkList = materialDAO.getDesmRsiLineOutQtyList(row);
		    		if(Integer.parseInt(checkList.get(0).get("HANDOVER_AVAILABLE_QTY").toString()) < Integer.parseInt(row.get("HANDOVER_QTY").toString())) {
		    			resultMap.put("error", "QTY");
		    			resultMap.put("RSI_LINE_ID", row.get("RSI_LINE_ID"));
		    			resultMap.put("HANDOVER_AVAILABLE_QTY", checkList.get(0).get("HANDOVER_AVAILABLE_QTY"));
			    		return resultMap;
		    		}

		    		cnt = materialDAO.saveDesmRsiOutGoingSave(row);
		    		cnt = materialDAO.saveDesmRsiOutQtySave(row);
		    		cnt = materialDAO.saveDesmRsiOutDetailLog(row);
		    		cnt = materialDAO.saveDesmRsiOutQtyCloseSave(row);



		    		checkList = materialDAO.getDesmRsiOutPackageQtyList(row);
		    		if(checkList.size() == 1){
		    			Map<String, Object> param = checkList.get(0);
		    			param.put("USER_AD", "SYSTEM");
		    			cnt = materialDAO.deleteDesmLocationSummary(param);
		    			cnt = materialDAO.updateDesmLocationSummary(param);
		    			cnt = materialDAO.saveIdsmOsSummaryEditLogList(param);
		    		}
		    	}



	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return resultMap;
	    }

		@Override
	    public List<Map<String, Object>> getDesmRsiOutGoingList(Map<String, Object> paramMap) {
	        return materialDAO.getDesmRsiOutGoingList(paramMap);
	    }

	    @Override
	    public Map<String, Object> deleteDesmRsiOut(Map<String, Object> paramMap) throws Exception {

	    	Map<String, Object> resultMap = new HashMap<String, Object>();

	    	try {
				JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
		    	for(int i = 0; i < deleteList.size(); i++) {
		    		JSONObject obj = (JSONObject)deleteList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		row.put("USER_AD", paramMap.get("USER_AD").toString());

		    		List<Map<String, Object>> checkList = materialDAO.getCheckMrfList(row);
		    		if(checkList.size() > 0) {
		    			resultMap.put("error", "MRF");
		    			resultMap.put("RSI_OUTGOING_ID", row.get("RSI_OUTGOING_ID"));
		    			return resultMap;
		    		}

		    		materialDAO.deleteDesmRsiOut(row);
		    		materialDAO.saveDesmRsiOutQtySave(row);
		    		materialDAO.updateDesmRsiOpen(row);
		    	}
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return resultMap;
	    }

	    @Override
	    public Map<String, Object> saveDesmSubconSave(Map<String, Object> paramMap) throws Exception {

	    	Map<String, Object> resultMap = new HashMap<String, Object>();
	    	int cnt = 0;

	    	try {
		    	if(paramMap.get("EDIT_TYPE").toString().equals("S")) {
		    		List<Map<String, Object>> checkList = materialDAO.getDesmSubconUser(paramMap);

		    		if(checkList.size() > 0) {
		    			resultMap.put("error", "OVERLAP");
		    			resultMap.put("USER_AD", paramMap.get("P_USER_AD"));
			    		return resultMap;
		    		}

			    	cnt = adminService.insertUser(paramMap);
			    	cnt = adminService.insertUserPermission(paramMap);
			    	cnt = materialDAO.insertSubcontUser(paramMap);
			    	//20220820 :: insert desm_user_project, insert desm_user_default_project
			    	String projectId = materialDAO.selectProjectId(paramMap);
			    	if(!projectId.isEmpty()) paramMap.put("P_PROJECT_ID", projectId);
			    	cnt = materialDAO.mergeSubconUserProject(paramMap);
			    	cnt = materialDAO.mergeSubconUserDefaultProject(paramMap);
		    	}
		    	else if(paramMap.get("EDIT_TYPE").toString().equals("E")) {
		    		//cnt = materialDAO.deleteSubcontUserRole(paramMap);
		    		cnt = adminService.insertUserPermission(paramMap);
		    		cnt = adminService.insertUser(paramMap);
		    	}

		    	cnt = adminDAO.deleteDesmDefaultCountry(paramMap);
		    	cnt = adminDAO.saveDesmDefaultCountry(paramMap);
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return resultMap;
	    }

		@Override
	    public List<Map<String, Object>> getDesmSubconList(Map<String, Object> paramMap) {
	        return materialDAO.getDesmSubconList(paramMap);
	    }

	    @Override
	    public int deleteDesmSubconList(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
				JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
		    	for(int i = 0; i < deleteList.size(); i++) {
		    		JSONObject obj = (JSONObject)deleteList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		row.put("USER_AD", paramMap.get("USER_AD").toString());
		    		row.put("P_USER_AD", row.get("P_USER_AD").toString());

		    		cnt = adminService.deleteUser(row);
		    		cnt = materialDAO.deleteSubcontUser(row);
		    	}
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

		@Override
	    public List<Map<String, Object>> getDesmSubconRoleList(Map<String, Object> paramMap) {
	        return materialDAO.getDesmSubconRoleList(paramMap);
	    }

		@Override
	    public Map<String, Object> saveIdsmOsSummaryListCancelMaterial(Map<String, Object> paramMap) throws Exception {

	    	Map<String, Object> resultMap = new HashMap<String, Object>();
	    	int cnt = 0;
	    	try {


				JSONArray updateList = JSONArray.fromObject(paramMap.get("list").toString());
		    	for(int i = 0; i < updateList.size(); i++) {
		    		JSONObject obj = (JSONObject)updateList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		row.put("USER_AD", paramMap.get("USER_AD"));


		    		List<Map<String, Object>> checkList = materialDAO.getDesmRsiLineOutQtyCheckList(row);
		    		if(Integer.parseInt(checkList.get(0).get("CNT").toString()) > 0) {
		    			resultMap.put("error", "RSI");
		    			resultMap.put("PACKAGE_NO", row.get("PACKAGE_NO"));

			    		return resultMap;
		    		}

		    		cnt = materialDAO.saveIdsmOsSummaryListCancelMaterial(row);
		    	}

	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return resultMap;
	    }

	    @Override
	    public List getDesmSiteProjectList(Map<String, Object> paramMap) {
	    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
	    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();

	    	try {
	    		materialDAO.updateSetLanguage(null);
	        	list = materialDAO.getDesmSiteProjectList(paramMap);

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
	    public List getDesmSiteProjectDlgProject(Map<String, Object> paramMap) {
	    	return materialDAO.getDesmSiteProjectList(paramMap);
	    }

	    @Override
	    public List getDesmSiteProjectUserList(Map<String, Object> paramMap) {
	    	return materialDAO.getDesmSiteProjectUserList(paramMap);
	    }

	    @Override
	    public int deleteDesmRsi(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
	    		List<Map<String, Object>> deleteList = materialDAO.getDeleteDesmRsiList(paramMap);
	    		for(int i = 0; i < deleteList.size(); i++) {
	    			Map<String, Object> row = deleteList.get(i);
	    			row.put("USER_AD", paramMap.get("USER_AD").toString());
		    		cnt = materialDAO.deleteDesmRsiDtl(row);
		    		cnt = materialDAO.saveDesmRsiQtySave(row);
	    		}

	    		cnt = materialDAO.deleteDesmRsiMst(paramMap);

	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

		@Override
	    public List<Map<String, Object>> getDesmRsiViewList(Map<String, Object> paramMap) {
	        return materialDAO.getDesmRsiViewList(paramMap);
	    }

	    @Override
	    public int sendMailDesmRsi(Map<String, Object> paramMap) throws Exception {
	    	int cnt = 0;
	    	try {

				cnt = this.sendMailDesmRsiData(paramMap);

				if(cnt < 0) {
					return cnt;
				}

	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

		public int sendMailDesmRsiData(Map<String, Object> paramMap) {

			int cnt = 0;


			try {

				Map<String, Object> mailInfo = new HashMap<String, Object>();

				String mailReceiverList = "";

				List<Map<String, Object>> mailContentList = materialDAO.getMailRsiMstData(paramMap);
				Map<String, Object> mailContent = mailContentList.get(0);

				List<Map<String, Object>> dtlList = materialDAO.getMailRsiDtlData(paramMap);


				List<Map<String, Object>> listMailReceiver = materialDAO.getMailRsiReceiver(paramMap);



				for (Map<String, Object> receiver : listMailReceiver) {
					mailReceiverList += receiver.get("EMAIL").toString();
					mailReceiverList += "; ";
				}
				mailContent.put("mailReceiverList", mailReceiverList);

				mailInfo.put("mailData", mailContent);
				mailInfo.put("receivePerson", listMailReceiver);
				mailInfo.put("dtlList", dtlList);

				mailInfo.put("LOGIN_URL", paramMap.get("LOGIN_URL").toString());
				mailInfo.put("USER_AD", paramMap.get("USER_AD").toString());

				mailInfo.put("location", paramMap.get("location"));
				mailInfo.put("host", paramMap.get("host"));
				mailInfo.put("port", paramMap.get("port"));
				mailInfo.put("encoding", paramMap.get("encoding"));
				mailInfo.put("username", paramMap.get("username"));
				mailInfo.put("password", paramMap.get("password"));


				cnt = this.sendMailDesmRsiDataMailFormat(mailInfo);

			} catch (Exception e) {
				cnt = -2;
				e.printStackTrace();
			}



			return cnt;
		}

		public int sendMailDesmRsiDataMailFormat(Map<String, Object> param) {
			int cnt = 0;

			final Map<String, Object> paramInfo = new HashMap<String, Object>();

			Map<String, Object> mailData = (Map<String, Object>) param.get("mailData");  // 메일정보
			List<Map<String, Object>> personList = (List<Map<String, Object>>) param.get("receivePerson");  // 수신자 정보
			List<Map<String, Object>> dtlList = (List<Map<String, Object>>) param.get("dtlList");  // Invoice List
			List<Map<String, Object>> mailList = new ArrayList<Map<String, Object>>();

			try {

				for (final Map<String, Object> dtlRow : dtlList) {

					dtlRow.put("no", dtlRow.get("NO") == null ? "&nbsp;" : dtlRow.get("NO").toString());
					dtlRow.put("packing_list_no", dtlRow.get("PACKAGE_LIST_NO") == null ? "&nbsp;" : dtlRow.get("PACKAGE_LIST_NO").toString());
					dtlRow.put("package_no", dtlRow.get("PACKAGE_NO") == null ? "&nbsp;" : dtlRow.get("PACKAGE_NO").toString());
					dtlRow.put("material_code", dtlRow.get("MATERIAL_CODE") == null ? "&nbsp;" : dtlRow.get("MATERIAL_CODE").toString());
					dtlRow.put("package_type", dtlRow.get("PACKAGE_TYPE") == null ? "&nbsp;" : dtlRow.get("PACKAGE_TYPE").toString());
					dtlRow.put("description", dtlRow.get("DESCRIPTION") == null ? "&nbsp;" : dtlRow.get("DESCRIPTION").toString());
					dtlRow.put("tag_no", dtlRow.get("TAG_NO") == null ? "&nbsp;" : dtlRow.get("TAG_NO").toString());
					dtlRow.put("drawing_no", dtlRow.get("DRAWING_NO") == null ? "&nbsp;" : dtlRow.get("DRAWING_NO").toString());
					dtlRow.put("unit", dtlRow.get("UNIT") == null ? "&nbsp;" : dtlRow.get("UNIT").toString());
					dtlRow.put("in_qty", dtlRow.get("IN_QTY") == null ? "&nbsp;" : dtlRow.get("IN_QTY").toString());
					dtlRow.put("req_qty", dtlRow.get("REQ_QTY") == null ? "&nbsp;" : dtlRow.get("REQ_QTY").toString());
				}

				for(int i = 0; i < personList.size(); i++) {
					Map<String, Object> content = new HashMap<String, Object>();
					Map<String, Object> receiver = personList.get(i);

					content.put("project_no", mailData.get("PROJECT_NO") == null ? "&nbsp;" : mailData.get("PROJECT_NO").toString());
					content.put("project_name", mailData.get("PROJECT_NAME") == null ? "&nbsp;" : mailData.get("PROJECT_NAME").toString());
					content.put("rsi_no", mailData.get("RSI_NO") == null ? "&nbsp;" : mailData.get("RSI_NO").toString());
					content.put("rsi_no", mailData.get("RSI_NO") == null ? "&nbsp;" : mailData.get("RSI_NO").toString());
					content.put("rsi_name", mailData.get("RSI_NAME") == null ? "&nbsp;" : mailData.get("RSI_NAME").toString());
					content.put("last_updated_by", mailData.get("LAST_UPDATED_BY") == null ? "&nbsp;" : mailData.get("LAST_UPDATED_BY").toString());
					content.put("status", mailData.get("STATUS") == null ? "&nbsp;" : mailData.get("STATUS").toString());
					content.put("subcontractor", mailData.get("SUBCONTRACTOR") == null ? "&nbsp;" : mailData.get("SUBCONTRACTOR").toString());
					content.put("subcon_manager", mailData.get("REQUESTED_BY") == null ? "&nbsp;" : mailData.get("REQUESTED_BY").toString());
					content.put("request_date", mailData.get("REQUEST_DATE") == null ? "&nbsp;" : mailData.get("REQUEST_DATE").toString());
					content.put("description", mailData.get("DESCRIPTION") == null ? "&nbsp;" : mailData.get("DESCRIPTION").toString());
					content.put("remark", mailData.get("REMARK") == null ? "&nbsp;" : mailData.get("REMARK").toString());
					content.put("count_rsi_line", mailData.get("COUNT_RSI_LINE") == null ? "&nbsp;" : mailData.get("COUNT_RSI_LINE").toString());


					content.put("list_data", dtlList);

					content.put("login_url", param.get("LOGIN_URL").toString());


					// 메일본문에 메일 수신자 임시 추가
					content.put("mailReceiverList", mailData.get("mailReceiverList") == null ? "&nbsp;" : mailData.get("mailReceiverList").toString());


					Map<String, Object> rowData = new HashMap<String, Object>();
					rowData.put("from_addr", "ews_desm@doosan.com");
					rowData.put("from_nm", "DESM Alarm Service");

					rowData.put("to_addr", (String) receiver.get("EMAIL"));
					rowData.put("TO_USER_AD", receiver.get("USER_AD"));
					rowData.put("PROJECT_NO", mailData.get("PROJECT_NO"));

					if(param.get("location").toString().equals("dev")) {
						//rowData.put("to_addr", "seunghwan2.jung@doosan.com");
						rowData.put("to_addr", "hanbyul1.lee@doosan.com");
						rowData.put("TO_USER_AD", "HANBYUL1.LEE");
					}


					rowData.put("title", "");
					rowData.put("data", content);

					rowData.put("USER_AD", param.get("USER_AD"));
					rowData.put("host", param.get("host"));
					rowData.put("port", param.get("port"));
					rowData.put("encoding", param.get("encoding"));
					rowData.put("username", param.get("username"));
					rowData.put("password", param.get("password"));
					rowData.put("rsi_name", mailData.get("RSI_NAME") == null ? "&nbsp;" : mailData.get("RSI_NAME").toString());
					rowData.put("RSI_NO", mailData.get("RSI_NO") == null ? "&nbsp;" : mailData.get("RSI_NO").toString());
					rowData.put("status", mailData.get("STATUS") == null ? "&nbsp;" : mailData.get("STATUS").toString());

					mailList.add(rowData);

				}

				cnt = desmService.addMail("DESM_RSI_APPROVAL_CHANGE_MAIL", mailList);
				cnt = desmService.sendFcm("RSI", mailList);

			} catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		cnt = -2;
	    		return cnt;
			}

			return cnt;
		}

	    @Override
	    public int saveIdsmOsDetailList(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
				JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
		    	for(int i = 0; i < list.size(); i++) {
		    		JSONObject obj = (JSONObject)list.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);


		    		List<Map<String, Object>> checkList = materialDAO.getDesmPlDetailEditLogList(row);
		    		if(checkList.size() == 0) {
		    			row.put("USER_AD", "ADMIN");
		    			cnt = materialDAO.saveIdsmOsDetailListLog(row);
		    		}

		    		row.put("USER_AD", paramMap.get("USER_AD"));
		    		row.put("REPORT_SHORT", row.get("REPORT_SHORT").toString().equals("1") ? "Y" : "N");
		    		row.put("REPORT_OVER", row.get("REPORT_OVER").toString().equals("1") ? "Y" : "N");
		    		row.put("REPORT_DMG", row.get("REPORT_DMG").toString().equals("1") ? "Y" : "N");
		    		row.put("REPORT_MISSING", row.get("REPORT_MISSING").toString().equals("1") ? "Y" : "N");
		    		cnt = materialDAO.saveIdsmOsDetailList(row);
		    		cnt = materialDAO.saveIdsmOsDetailListLog(row);
		    		cnt = materialDAO.saveIdsmOsSummaryReport(row);
		    	}
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

		@Override
	    public List<Map<String, Object>> getDesmPlDetailEditLogList(Map<String, Object> paramMap) {
	        return materialDAO.getDesmPlDetailEditLogList(paramMap);
	    }

		@Override
	    public List<Map<String, Object>> getDesmPlSummaryEditLogList(Map<String, Object> paramMap) {
	        return materialDAO.getDesmPlSummaryEditLogList(paramMap);
	    }

		@Override
	    public List<Map<String, Object>> getDesmMrfPlDetailList(Map<String, Object> paramMap) {
	        return materialDAO.getDesmMrfPlDetailList(paramMap);
	    }

	    @Override
	    public Map<String, Object> saveDesmMrfSave(Map<String, Object> paramMap) throws Exception {

	    	Map<String, Object> resultMap = new HashMap<String, Object>();
	    	int cnt = 0;
	    	try {

	    		if(paramMap.get("MRF_HEADER_ID") == null || paramMap.get("MRF_HEADER_ID").toString().equals("")) {
	    			List<Map<String, Object>> list = materialDAO.getDesmMrfHeaderData(paramMap);

	    			paramMap.put("MRF_HEADER_ID", list.get(0).get("MRF_HEADER_ID"));
	    			paramMap.put("MRF_NO", list.get(0).get("MRF_NO"));
	    		}
	    		resultMap.put("MRF_HEADER_ID", paramMap.get("MRF_HEADER_ID"));

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
    			resultMap.put("STATUS", paramMap.get("STATUS"));

				JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
		    	for(int i = 0; i < updateList.size(); i++) {
		    		JSONObject obj = (JSONObject)updateList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		row.put("USER_AD", paramMap.get("USER_AD"));
		    		row.put("MRF_HEADER_ID", paramMap.get("MRF_HEADER_ID"));
		    		row.put("PROJECT_NO", paramMap.get("PROJECT_NO"));


		    		int qtyIdx = row.get("REQ_RETURN_QTY").toString().indexOf(".");
		    		if(qtyIdx != -1) {
		    			String Qty = row.get("REQ_RETURN_QTY").toString().substring(0, qtyIdx);
		    			row.put("REQ_RETURN_QTY", Qty);
		    		}

		    		if(row.get("RSI_OUTGOING_ID") == null || row.get("RSI_OUTGOING_ID").equals("")) {
		    			row.put("RETURN_TYPE", "RSI Cancel");
		    		}
		    		else {
		    			row.put("RETURN_TYPE", "Outgoing Return");
		    		}

		    		List<Map<String, Object>> checkList = materialDAO.getDesmMrfLineQtyList(row);
		    		if(Integer.parseInt(checkList.get(0).get("RETURN_AVAILABLE_QTY").toString()) < Integer.parseInt(row.get("REQ_RETURN_QTY").toString())) {
		    			resultMap.put("error", "QTY");
		    			resultMap.put("RSI_LINE_ID", row.get("RSI_LINE_ID"));
		    			resultMap.put("RSI_OUTGOING_ID", row.get("RSI_OUTGOING_ID"));
		    			resultMap.put("MATERIAL_CODE", row.get("MATERIAL_CODE"));
		    			resultMap.put("RETURN_TYPE", row.get("RETURN_TYPE"));
		    			resultMap.put("RETURN_AVAILABLE_QTY", checkList.get(0).get("RETURN_AVAILABLE_QTY"));
			    		return resultMap;
		    		}
		    		else {
		    			String description = checkList.get(0).get("DESCRIPTION") == null ? "" : checkList.get(0).get("DESCRIPTION").toString();
		    			String remarks = checkList.get(0).get("REMARKS") == null ? "" : checkList.get(0).get("REMARKS").toString();

		    			row.put("RSI_HEADER_ID", checkList.get(0).get("RSI_HEADER_ID"));
		    			row.put("DESCRIPTION", description);
		    			row.put("REMARK", remarks);
		    		}


		    		cnt = materialDAO.saveDesmMrfLineSave(row);
		    		cnt = materialDAO.saveDesmMrfQtySave(row);
		    		cnt = materialDAO.saveDesmRsiOutQtyCloseSave(row);
		    	}

		    	cnt = materialDAO.saveDesmMrfHeaderSave(paramMap);

		    	if(paramMap.get("TRANS_TYPE").toString().equals("Approved")) {
		    		List<Map<String, Object>> returnList = materialDAO.getDesmMrfLineReturnQtyList(paramMap);
		    		for(int i = 0; i < returnList.size(); i++) {
		    			Map<String, Object> returnRow = returnList.get(i);
		    			returnRow.put("USER_AD", paramMap.get("USER_AD"));
		    			returnRow.put("PROJECT_NO", paramMap.get("PROJECT_NO"));

		                cnt = materialDAO.saveDesmMrfReturnSave(returnRow);
		                cnt = materialDAO.saveDesmMrfReturnQtySave(returnRow);
		                cnt = materialDAO.saveDesmMrfReturnQtyCloseSave(returnRow);


		    		}
    			}


	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return resultMap;
	    }

		@Override
	    public List<Map<String, Object>> getDesmMrfList(Map<String, Object> paramMap) {
	        return materialDAO.getDesmMrfList(paramMap);
	    }

		@Override
	    public Map<String, Object> getDesmMrfInfoList(Map<String, Object> paramMap) {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("headerList", materialDAO.getDesmMrfHeaderList(paramMap));
			resultMap.put("lineList", materialDAO.getDesmMrfLineList(paramMap));

	        return resultMap;
	    }

	    @Override
	    public int saveDesmMrfReject(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
	    		cnt = materialDAO.saveDesmMrfReject(paramMap);
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

	    @Override
	    public int deleteDesmMrfDtl(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
				JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
		    	for(int i = 0; i < deleteList.size(); i++) {
		    		JSONObject obj = (JSONObject)deleteList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		row.put("USER_AD", paramMap.get("USER_AD").toString());

		    		cnt = materialDAO.deleteDesmMrfDtl(row);
		    		cnt = materialDAO.saveDesmMrfQtySave(row);
		    		cnt = materialDAO.saveDesmRsiOutQtyCloseSave(row);

		    	}
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

	    @Override
	    public int saveDesmMrfFileGrpCd(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
	    		materialDAO.saveDesmMrfFileGrpCd(paramMap);
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

	    @Override
	    public int deleteDesmMrf(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
	    		List<Map<String, Object>> deleteList = materialDAO.getDeleteDesmMrfList(paramMap);
	    		for(int i = 0; i < deleteList.size(); i++) {
	    			Map<String, Object> row = deleteList.get(i);
	    			row.put("USER_AD", paramMap.get("USER_AD").toString());
	    			row.put("PROJECT_NO", paramMap.get("PROJECT_NO").toString());
		    		cnt = materialDAO.deleteDesmMrfDtl(row);
		    		cnt = materialDAO.saveDesmMrfQtySave(row);
		    		cnt = materialDAO.saveDesmRsiOutQtyCloseSave(row);
	    		}

	    		cnt = materialDAO.deleteDesmMrfMst(paramMap);

	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

		@Override
	    public List<Map<String, Object>> getDesmReturnCreationList(Map<String, Object> paramMap) {
	        return materialDAO.getDesmReturnCreationList(paramMap);
	    }

		@Override
	    public Map<String, Object> saveDesmMrfReturnSave(Map<String, Object> paramMap) throws Exception {

	    	Map<String, Object> resultMap = new HashMap<String, Object>();
	    	int cnt = 0;
	    	try {


				JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
		    	for(int i = 0; i < updateList.size(); i++) {
		    		JSONObject obj = (JSONObject)updateList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		row.put("USER_AD", paramMap.get("USER_AD"));


		    		List<Map<String, Object>> checkList = materialDAO.getDesmMrfLineReturnList(row);
		    		if(Integer.parseInt(checkList.get(0).get("RETURN_AVAILABLE_QTY").toString()) < Integer.parseInt(row.get("RETURN_QTY").toString())) {
		    			resultMap.put("error", "QTY");
		    			resultMap.put("MRF_LINE_ID", row.get("MRF_LINE_ID"));
		    			resultMap.put("RETURN_AVAILABLE_QTY", checkList.get(0).get("RETURN_AVAILABLE_QTY"));
			    		return resultMap;
		    		}

		    		cnt = materialDAO.saveDesmMrfReturnSave(row);
		    		cnt = materialDAO.saveDesmMrfReturnQtySave(row);
		    		cnt = materialDAO.saveDesmMrfReturnQtyCloseSave(row);
		    		cnt = materialDAO.saveDesmRsiOutQtyCloseSave(row);
		    	}



	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return resultMap;
	    }

		@Override
	    public List<Map<String, Object>> getDesmMrfReturnList(Map<String, Object> paramMap) {
	        return materialDAO.getDesmMrfReturnList(paramMap);
	    }

	    @Override
	    public int deleteDesmMrfReturn(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
				JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
		    	for(int i = 0; i < deleteList.size(); i++) {
		    		JSONObject obj = (JSONObject)deleteList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		row.put("USER_AD", paramMap.get("USER_AD").toString());

		    		cnt = materialDAO.deleteDesmMrfReturn(row);
		    		cnt = materialDAO.saveDesmMrfReturnQtySave(row);
		    		cnt = materialDAO.saveDesmMrfReturnQtyCloseSave(row);

		    	}
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

	    @Override
	    public int saveIdsmQrCodeList(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;
	    	cnt = materialDAO.deleteIdsmQrCodeList(paramMap);

	    	try {
				JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
		    	for(int i = 0; i < list.size(); i++) {
		    		JSONObject obj = (JSONObject)list.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

		    		row.put("USER_AD", paramMap.get("USER_AD"));

		    		cnt = materialDAO.saveIdsmQrCodeList(row);
		    	}
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

	    @Override
	    public int sendMailDesmMrf(Map<String, Object> paramMap) throws Exception {
	    	int cnt = 0;
	    	try {

				cnt = this.sendMailDesmMrfData(paramMap);

				if(cnt < 0) {
					return cnt;
				}

	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

		public int sendMailDesmMrfData(Map<String, Object> paramMap) {

			int cnt = 0;


			try {

				Map<String, Object> mailInfo = new HashMap<String, Object>();

				String mailReceiverList = "";

				List<Map<String, Object>> mailContentList = materialDAO.getMailMrfMstData(paramMap);
				Map<String, Object> mailContent = mailContentList.get(0);

				List<Map<String, Object>> dtlList = materialDAO.getMailMrfDtlData(paramMap);


				List<Map<String, Object>> listMailReceiver = materialDAO.getMailMrfReceiver(paramMap);



				for (Map<String, Object> receiver : listMailReceiver) {
					mailReceiverList += receiver.get("EMAIL").toString();
					mailReceiverList += "; ";
				}
				mailContent.put("mailReceiverList", mailReceiverList);

				mailInfo.put("mailData", mailContent);
				mailInfo.put("receivePerson", listMailReceiver);
				mailInfo.put("dtlList", dtlList);

				mailInfo.put("LOGIN_URL", paramMap.get("LOGIN_URL").toString());
				mailInfo.put("USER_AD", paramMap.get("USER_AD").toString());

				mailInfo.put("location", paramMap.get("location"));
				mailInfo.put("host", paramMap.get("host"));
				mailInfo.put("port", paramMap.get("port"));
				mailInfo.put("encoding", paramMap.get("encoding"));
				mailInfo.put("username", paramMap.get("username"));
				mailInfo.put("password", paramMap.get("password"));


				cnt = this.sendMailDesmMrfDataMailFormat(mailInfo);

			} catch (Exception e) {
				cnt = -2;
				e.printStackTrace();
			}



			return cnt;
		}

		public int sendMailDesmMrfDataMailFormat(Map<String, Object> param) {
			int cnt = 0;

			final Map<String, Object> paramInfo = new HashMap<String, Object>();

			Map<String, Object> mailData = (Map<String, Object>) param.get("mailData");  // 메일정보
			List<Map<String, Object>> personList = (List<Map<String, Object>>) param.get("receivePerson");  // 수신자 정보
			List<Map<String, Object>> dtlList = (List<Map<String, Object>>) param.get("dtlList");  // Invoice List
			List<Map<String, Object>> mailList = new ArrayList<Map<String, Object>>();

			try {

				for (final Map<String, Object> dtlRow : dtlList) {

					dtlRow.put("no", dtlRow.get("NO") == null ? "&nbsp;" : dtlRow.get("NO").toString());
					dtlRow.put("packing_list_no", dtlRow.get("PACKAGE_LIST_NO") == null ? "&nbsp;" : dtlRow.get("PACKAGE_LIST_NO").toString());
					dtlRow.put("package_no", dtlRow.get("PACKAGE_NO") == null ? "&nbsp;" : dtlRow.get("PACKAGE_NO").toString());
					dtlRow.put("material_code", dtlRow.get("MATERIAL_CODE") == null ? "&nbsp;" : dtlRow.get("MATERIAL_CODE").toString());
					dtlRow.put("package_type", dtlRow.get("PACKAGE_TYPE") == null ? "&nbsp;" : dtlRow.get("PACKAGE_TYPE").toString());
					dtlRow.put("unit", dtlRow.get("UNIT") == null ? "&nbsp;" : dtlRow.get("UNIT").toString());
					dtlRow.put("rsi_name", dtlRow.get("RSI_NAME") == null ? "&nbsp;" : dtlRow.get("RSI_NAME").toString());
					dtlRow.put("return_type", dtlRow.get("RETURN_TYPE") == null ? "&nbsp;" : dtlRow.get("RETURN_TYPE").toString());
					dtlRow.put("in_qty", dtlRow.get("IN_QTY") == null ? "&nbsp;" : dtlRow.get("IN_QTY").toString());
					dtlRow.put("req_qty", dtlRow.get("REQ_RETURN_QTY") == null ? "&nbsp;" : dtlRow.get("REQ_RETURN_QTY").toString());
				}

				for(int i = 0; i < personList.size(); i++) {
					Map<String, Object> content = new HashMap<String, Object>();
					Map<String, Object> receiver = personList.get(i);

					content.put("project_no", mailData.get("PROJECT_NO") == null ? "&nbsp;" : mailData.get("PROJECT_NO").toString());
					content.put("project_name", mailData.get("PROJECT_NAME") == null ? "&nbsp;" : mailData.get("PROJECT_NAME").toString());
					content.put("mrf_no", mailData.get("MRF_NO") == null ? "&nbsp;" : mailData.get("MRF_NO").toString());
					content.put("mrf_name", mailData.get("MRF_NAME") == null ? "&nbsp;" : mailData.get("MRF_NAME").toString());
					content.put("last_updated_by", mailData.get("LAST_UPDATED_BY") == null ? "&nbsp;" : mailData.get("LAST_UPDATED_BY").toString());
					content.put("status", mailData.get("STATUS") == null ? "&nbsp;" : mailData.get("STATUS").toString());
					content.put("subcontractor", mailData.get("SUBCONTRACTOR") == null ? "&nbsp;" : mailData.get("SUBCONTRACTOR").toString());
					content.put("subcon_manager", mailData.get("REQUESTED_BY") == null ? "&nbsp;" : mailData.get("REQUESTED_BY").toString());
					content.put("request_date", mailData.get("REQUEST_DATE") == null ? "&nbsp;" : mailData.get("REQUEST_DATE").toString());
					content.put("description", mailData.get("DESCRIPTION") == null ? "&nbsp;" : mailData.get("DESCRIPTION").toString());
					content.put("remark", mailData.get("REMARK") == null ? "&nbsp;" : mailData.get("REMARK").toString());
					content.put("count_mrf_line", mailData.get("COUNT_MRF_LINE") == null ? "&nbsp;" : mailData.get("COUNT_MRF_LINE").toString());


					content.put("list_data", dtlList);

					content.put("login_url", param.get("LOGIN_URL").toString());


					// 메일본문에 메일 수신자 임시 추가
					content.put("mailReceiverList", mailData.get("mailReceiverList") == null ? "&nbsp;" : mailData.get("mailReceiverList").toString());


					Map<String, Object> rowData = new HashMap<String, Object>();
					rowData.put("from_addr", "ews_desm@doosan.com");
					rowData.put("from_nm", "DESM Alarm Service");

					rowData.put("to_addr", (String) receiver.get("EMAIL"));
					rowData.put("TO_USER_AD", receiver.get("USER_AD"));
					rowData.put("PROJECT_NO", mailData.get("PROJECT_NO"));

					if(param.get("location").toString().equals("dev")) {
						//rowData.put("to_addr", "seunghwan2.jung@doosan.com");
						rowData.put("to_addr", "hanbyul1.lee@doosan.com");
						rowData.put("TO_USER_AD", "HANBYUL1.LEE");
					}


					rowData.put("title", "");
					rowData.put("data", content);

					rowData.put("USER_AD", param.get("USER_AD"));
					rowData.put("host", param.get("host"));
					rowData.put("port", param.get("port"));
					rowData.put("encoding", param.get("encoding"));
					rowData.put("username", param.get("username"));
					rowData.put("password", param.get("password"));
					rowData.put("mrf_name", mailData.get("MRF_NAME") == null ? "&nbsp;" : mailData.get("MRF_NAME").toString());
					rowData.put("MRF_NO", mailData.get("MRF_NO") == null ? "&nbsp;" : mailData.get("MRF_NO").toString());
					rowData.put("status", mailData.get("STATUS") == null ? "&nbsp;" : mailData.get("STATUS").toString());

					mailList.add(rowData);

				}

				cnt = desmService.addMail("DESM_MRF_APPROVAL_CHANGE_MAIL", mailList);
				cnt = desmService.sendFcm("MRF", mailList);

			} catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		cnt = -2;
	    		return cnt;
			}

			return cnt;
		}

	    @Override
	    public int saveDesmMapCreation(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
				JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
		    	for(int i = 0; i < list.size(); i++) {
		    		JSONObject obj = (JSONObject)list.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

		    		row.put("USER_AD", paramMap.get("USER_AD"));

		    		cnt = materialDAO.saveDesmMapCreation(row);
		    	}
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

		@Override
	    public List<Map<String, Object>> getDesmMapCreationList(Map<String, Object> paramMap) {
	        return materialDAO.getDesmMapCreationList(paramMap);
	    }

	    @Override
	    public int deleteDesmMapCreation(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
				JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
		    	for(int i = 0; i < deleteList.size(); i++) {
		    		JSONObject obj = (JSONObject)deleteList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		row.put("USER_AD", paramMap.get("USER_AD").toString());

		    		cnt = materialDAO.deleteDesmMapCreation(row);

		    	}
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

		@Override
	    public Map<String, Object> getDesmMapInfoList(Map<String, Object> paramMap) {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("mstInfo", materialDAO.getDesmMapMstInfoList(paramMap));
			resultMap.put("dtlInfo", materialDAO.getDesmMapDtlInfoList(paramMap));

	        return resultMap;
	    }

	    @Override
	    public int saveDesmMapAreaCreation(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
				JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
		    	for(int i = 0; i < list.size(); i++) {
		    		JSONObject obj = (JSONObject)list.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

		    		row.put("USER_AD", paramMap.get("USER_AD"));

		    		cnt = materialDAO.saveDesmMapAreaCreation(row);
		    	}
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

	    @Override
	    public int deleteDesmMapAreaCreation(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
				JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
		    	for(int i = 0; i < deleteList.size(); i++) {
		    		JSONObject obj = (JSONObject)deleteList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		row.put("USER_AD", paramMap.get("USER_AD").toString());

		    		cnt = materialDAO.deleteDesmMapAreaCreation(row);

		    	}
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

	    @Override
	    public Map<String, Object> saveDesmLocation(Map<String, Object> paramMap) throws Exception {

	    	Map<String, Object> resultMap = new HashMap<String, Object>();

	    	try {
				JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
		    	for(int i = 0; i < list.size(); i++) {
		    		JSONObject obj = (JSONObject)list.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

		    		row.put("USER_AD", paramMap.get("USER_AD"));
		    		row.put("MAP_MST_ID", paramMap.get("MAP_MST_ID"));
		    		row.put("MAP_DTL_ID", paramMap.get("MAP_DTL_ID"));

		    		materialDAO.saveDesmLocation(row); // DESM_MAP_LOCATION에 MERGER, MATERIAL_MAP에서만 현재 사용 중

		    		if(row.get("CODE_TYPE").toString().equals("SUMMARY")) {
		    			List<Map<String, Object>> checkList = materialDAO.saveDesmLocationSummaryDetailCheck(row);
		    			if(checkList.size() == 0){
		    				resultMap.put("QTY_ZERO", "QTY_ZERO");
		    				resultMap.put("PACKAGE_NO", row.get("PACKAGE_NO"));
		    				return resultMap;
		    			}
		    			// MST, DTL TABLE에 LOCATION UPDATE
		    			materialDAO.saveDesmLocationSummary(row);
		    			materialDAO.saveIdsmOsSummaryEditLogList(row);
		    			materialDAO.saveDesmLocationSummaryDetail(row);
		    			materialDAO.saveDesmLocationSummaryDetailLog(row);
		    		}else if(row.get("CODE_TYPE").toString().equals("DETAIL")) {
		    			materialDAO.saveDesmLocationDetail(row);
		    			materialDAO.saveIdsmOsDetailListLog(row);
		    		}
		    	}

	    	}catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return resultMap;
	    }

	    @Override
	    public Map<String, Object> saveDesmLocationCheck(Map<String, Object> paramMap) throws Exception {

	    	Map<String, Object> resultMap = new HashMap<String, Object>();

	    	try {
				JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
				Map<String,Object> checkMap;
		    	for(int i = 0; i < list.size(); i++) {
		    		JSONObject obj = (JSONObject)list.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

		    		//22.09.21 Package 단위 Location 업데이트가 최초 한번 이후에도 계속 일괄 적용이 가능하도록 기능 수정
		    		if(row.get("CODE_TYPE").toString().equals("SUMMARY")) {
		    			List<Map<String, Object>> checkList = materialDAO.getDesmLocationCheckDetail(row);

		    			if(checkList.size() > 0) {
		    				checkMap = new HashMap<>();
		    				for(int j = 0 ; j < checkList.size(); j ++){
		    					if(checkList.get(j) != null){
		    						checkMap.put(checkList.get(j).get("LOCATION").toString(), checkList.get(j).get("LOCATION"));
		    					}
		    				}
		    				if(checkMap.size() > 1){
			    				resultMap.put("LOCATION_DIFF", row.get("PACKAGE_NO"));
			    				return resultMap;
		    				}
		    			}
		    		}

		    	}
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return resultMap;
	    }

		@Override
	    public Map<String, Object> getDesmDesmMapLocationList(Map<String, Object> paramMap) {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			/*
			resultMap.put("summaryInfo", materialDAO.getDesmDesmMapLocationSummaryList(paramMap));
			resultMap.put("detailInfo", materialDAO.getDesmDesmMapLocationDetailList(paramMap));
			*/

			resultMap.put("packageInfo", materialDAO.getDesmDesmMapLocationSummaryList(paramMap));
			resultMap.put("detailInfo", materialDAO.getDesmDesmMapLocationDataList(paramMap));

	        return resultMap;
	    }

		@Override
	    public Map<String, Object> getDesmMapSearchInfoList(Map<String, Object> paramMap) {
			Map<String, Object> resultMap = new HashMap<String, Object>();

			if(paramMap.get("CODE_TYPE").toString().equals("SUMMARY")) {
				resultMap.put("mstInfo", materialDAO.getDesmMapSearchSummaryMstInfoList(paramMap));
				resultMap.put("dtlInfo", materialDAO.getDesmMapSearchSummaryDtlInfoList(paramMap));
			}
			else {
				resultMap.put("mstInfo", materialDAO.getDesmMapSearchDetailMstInfoList(paramMap));
				resultMap.put("dtlInfo", materialDAO.getDesmMapSearchDetailDtlInfoList(paramMap));
			}



	        return resultMap;
	    }

	    @Override
	    public int deleteDesmLocation(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
				JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
		    	for(int i = 0; i < deleteList.size(); i++) {
		    		JSONObject obj = (JSONObject)deleteList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		row.put("USER_AD", paramMap.get("USER_AD").toString());

		    		if(row.get("CODE_TYPE").toString().equals("SUMMARY")) {
		    			cnt = materialDAO.deleteDesmLocationSummary(row);
		    			cnt = materialDAO.updateDesmLocationSummary(row);
		    			cnt = materialDAO.saveIdsmOsSummaryEditLogList(row);
		    			cnt = materialDAO.deleteDesmLocationSummaryDetail(row);
		    			cnt = materialDAO.saveDesmLocationSummaryDetailLog(row);
		    		}
		    		else if(row.get("CODE_TYPE").toString().equals("DETAIL")) {
		    			cnt = materialDAO.deleteDesmLocationDetail(row);
		    			cnt = materialDAO.updateDesmLocationDetail(row);
		    			cnt = materialDAO.saveIdsmOsDetailListLog(row);
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
	    public List<Map<String, Object>> getLocationCodeList(Map<String, Object> paramMap) {
	        return materialDAO.getLocationCodeList(paramMap);
	    }

	    @Override
	    public int saveDesmDetailItemCreation(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {

	    		// TODO: MAX 댕겨올 때 text 전체 말고, 끝자리수만 잘라서 TO_NUMBER 후 MAX구하기..
	    		// 추후 MATERIAL_CODE 자리수가 변경될 때 반영 필요..
	    		List<Map<String, Object>> codeList = materialDAO.getDesmDetailItemCreationMaterialCode(paramMap);
	    		paramMap.put("MATERIAL_CODE", codeList.get(0).get("MATERIAL_CODE"));

	    		cnt = materialDAO.saveDesmDetailItemCreation(paramMap);
	    		cnt = materialDAO.saveIdsmOsDetailListLog(paramMap);
	    		cnt = materialDAO.saveIdsmOsSummaryReport(paramMap);
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }

		@Override
		public List<Map<String, Object>> getIdsmOsManageList(Map<String, Object> paramMap) {
			if(paramMap.get("LOCATION") != null && !paramMap.get("LOCATION").toString().equals("")) {
				String[] locationArr = paramMap.get("LOCATION").toString().split("!!!");
				List<Map<String, Object>> lList = new ArrayList<Map<String,Object>>();

				for (int i = 0; i < locationArr.length; i++) {
					Map<String, Object> row = new HashMap<String, Object>();
					row.put("LOCATION", locationArr[i]);

					lList.add(row);
				}

				paramMap.put("LOCATION_LIST", lList);
			}
			return materialDAO.getIdsmOsManageList(paramMap);
		}

		 @Override
		    public int saveIdsmOsManageList(Map<String, Object> paramMap) throws Exception {

		    	int cnt = 0;

		    	try {
		    		JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
		    		JSONObject obj;
		    		Map<String, Object> row = null;
			    	for(int i = 0; i < list.size(); i++) {
			    		obj = (JSONObject)list.get(i);
			    		row = new ObjectMapper().readValue(obj.toString(), Map.class);
			    		row.put("USER_AD", paramMap.get("USER_AD"));
			    		cnt = materialDAO.saveIdsmOsManageList(row);
			    	}
		    	}
		    	catch (Exception e) {
		    		System.out.println("!!!!!!" + e.toString());
		    		throw new Exception(e.toString());
				}
		        return cnt;
		    }

		 @Override
	    public List<Map<String, Object>> getDesmMaterialManageCreationList(Map<String, Object> paramMap) {
	        return materialDAO.getDesmMaterialManageCreationList(paramMap);
	    }

		@Override
		public Map<String, Object> saveDesmMaterialManageSave(Map<String, Object> paramMap) throws Exception {
			Map<String, Object> resultMap = new HashMap<String, Object>();
	    	try {

	    		JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
	    		JSONObject obj;
	    		Map<String, Object> row = null;
	    		Map<String, Object> rsi;
		    	for(int i = 0; i < updateList.size(); i++) {
		    		obj = (JSONObject)updateList.get(i);
		    		row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		row.put("USER_AD", paramMap.get("USER_AD"));

		    		if("SP".equals(row.get("TYPE")) || "CP".equals(row.get("TYPE"))){
		    			rsi = materialDAO.getRsiReqQty(row);
		    			if(rsi != null){
		    				row.put("IS_RSI_CONFIRM", "Y");
		    				row.put("RSI_CONFIRM_QTY", rsi.get("REQ_QTY"));
		    			}
		    		}

		    		materialDAO.saveDesmMaterialManageSave(row);
		    	}

	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return resultMap;
		}

		@Override
		public Map<String, Object> deleteMaterialManage(Map<String, Object> paramMap) throws Exception {
			Map<String, Object> resultMap = new HashMap<String, Object>();
	    	try {

	    		JSONArray updateList = JSONArray.fromObject(paramMap.get("deleteList").toString());
	    		JSONObject obj;
	    		Map<String, Object> row = null;
		    	for(int i = 0; i < updateList.size(); i++) {
		    		obj = (JSONObject)updateList.get(i);
		    		row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		materialDAO.deleteMaterialManage(row);
		    	}

	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return resultMap;
		}

		@Override
		public List<Map<String, Object>> getDesmTransactionHistoryList(Map<String, Object> paramMap) throws Exception {
			return materialDAO.getDesmTransactionHistoryList(paramMap);
		}

		@Override
		public int saveDesmMaterialManagementFileGrpCd(Map<String, Object> paramMap) throws Exception {
			int cnt = 0;

	    	try {
	    		materialDAO.saveDesmMaterialManagementFileGrpCd(paramMap);
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;

		}

		@Override
	    public Map<String, Object> getDesmProjectPackageInfo(Map<String, Object> paramMap) {
	        return materialDAO.getDesmProjectPackageInfo(paramMap);
	    }
		
		@Override
	    public List<Map<String, Object>> getDesmMrrList(Map<String, Object> paramMap) {
	        return materialDAO.getDesmMrrList(paramMap);
	    }
		
		@Override
	    public Map<String, Object> saveDesmMrrSave(Map<String, Object> paramMap) throws Exception {

	    	Map<String, Object> resultMap = new HashMap<String, Object>();
	    	int cnt = 0;
	    	try {
	    		
	    		if(paramMap.get("MRR_HEADER_ID") == null || paramMap.get("MRR_HEADER_ID").toString().equals("")) {
	    			List<Map<String, Object>> list = materialDAO.getDesmMrrHeaderData(paramMap);

	    			paramMap.put("MRR_HEADER_ID", list.get(0).get("MRR_HEADER_ID"));
	    			paramMap.put("MRR_NO", list.get(0).get("MRR_NO"));
	    		}
	    		resultMap.put("MRR_HEADER_ID", paramMap.get("MRR_HEADER_ID"));

    			if(paramMap.get("TRANS_TYPE").toString().equals("Incomplete")) {
    				paramMap.put("STATUS", "Incomplete");

    				if(paramMap.get("PREPARED_BY") != null && !paramMap.get("PREPARED_BY").toString().equals("")) {
    					paramMap.put("P_USER_AD", paramMap.get("PREPARED_BY"));
    					List<Map<String, Object>> userList = materialDAO.getDesmRsiUserList(paramMap);
    					if(userList.size() > 0) {
    						if(userList.get(0).get("DEPT_NAME") != null) {
    							paramMap.put("SUBCONTRACTOR", userList.get(0).get("DEPT_NAME")); //????
    						}

    					}
    				}
    			}
    			else if(paramMap.get("TRANS_TYPE").toString().equals("Pre-Checked")) {
    				paramMap.put("STATUS", "Pre-Checked");
    				paramMap.put("PREPARED_BY", paramMap.get("USER_AD"));
    				//paramMap.put("CONFIRMED_BY", "YUNSEON.PYO");

					paramMap.put("P_USER_AD", paramMap.get("USER_AD"));
					List<Map<String, Object>> userList = materialDAO.getDesmRsiUserList(paramMap);
					if(userList.size() > 0) {
						if(userList.get(0).get("DEPT_NAME") != null) {
							paramMap.put("SUBCONTRACTOR", userList.get(0).get("DEPT_NAME"));
						}

					}
    			}
    			else if(paramMap.get("TRANS_TYPE").toString().equals("Pre-Confirmed")) {
    				paramMap.put("STATUS", "Pre-Confirmed");
    				paramMap.put("PREPARED_BY", paramMap.get("USER_AD"));
    				//paramMap.put("APPROVED_BY", "JAEHONG.JOO");
    			}
    			else if(paramMap.get("TRANS_TYPE").toString().equals("Confirmed")) {
    				paramMap.put("STATUS", "Confirmed");
    				paramMap.put("CONFIRMED_BY", paramMap.get("USER_AD"));
    			}
    			else if(paramMap.get("TRANS_TYPE").toString().equals("Approved")) {
    				paramMap.put("STATUS", "Approved");
    				paramMap.put("APPROVED_BY", paramMap.get("USER_AD"));
    			}
    			resultMap.put("STATUS", paramMap.get("STATUS"));

				JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
		    	for(int i = 0; i < updateList.size(); i++) {
		    		JSONObject obj = (JSONObject)updateList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		row.put("USER_AD", paramMap.get("USER_AD"));
		    		row.put("MRR_HEADER_ID", paramMap.get("MRR_HEADER_ID"));
		    		
		    		/*if(row.get("VISUAL_CHECK").toString() == null || row.get("VISUAL_CHECK").toString().equals("")) {
		    			row.put("VISUAL_CHECKED_BY", paramMap.get("USER_AD"));
		    		}else {
		    			row.put("VISUAL_CHECKED_BY", "");
		    		}*/
		    		row.put("VISUAL_CHECKED_BY", "");
		    		
		    		
		    		/*int qtyIdx = row.get("REQ_QTY").toString().indexOf(".");
		    		if(qtyIdx != -1) {
		    			String Qty = row.get("REQ_QTY").toString().substring(0, qtyIdx);
		    			row.put("REQ_QTY", Qty);
		    		}*/

		    		/*List<Map<String, Object>> checkList = materialDAO.getDesmRsiLineQtyList(row);
		    		if(Integer.parseInt(checkList.get(0).get("REQ_AVAILABLE_QTY").toString()) < Integer.parseInt(row.get("REQ_QTY").toString())) {
		    			resultMap.put("error", "QTY");
		    			resultMap.put("MATERIAL_CODE", row.get("MATERIAL_CODE"));
		    			resultMap.put("REQ_AVAILABLE_QTY", checkList.get(0).get("REQ_AVAILABLE_QTY"));
			    		return resultMap;
		    		}*/
		    		
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

		    		cnt = materialDAO.saveDesmMrrLineSave(row);
		    		//cnt = materialDAO.saveDesmRsiQtySave(row);
		    	}
		    	
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
		    	cnt = materialDAO.saveDesmMrrHeaderSave(paramMap);
		    	//cnt = materialDAO.saveDesmMrrHeaderProjectSave(paramMap);

		    	/*
	    		if(paramMap.get("TRANS_TYPE").toString().equals("Approved")) {
	    			cnt = materialDAO.saveDesmRsiOutQtySave(paramMap);
	    		}*/


	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return resultMap;
	    }
		
		@Override
	    public Map<String, Object> getDesmMrrInfoList(Map<String, Object> paramMap) {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("headerList", materialDAO.getDesmMrrHeaderList(paramMap));
			resultMap.put("lineList", materialDAO.getDesmMrrLineList(paramMap));

	        return resultMap;
	    }
		
		@Override
	    public int deleteDesmMrrDtl(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
				JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
		    	for(int i = 0; i < deleteList.size(); i++) {
		    		JSONObject obj = (JSONObject)deleteList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		row.put("USER_AD", paramMap.get("USER_AD").toString());

		    		cnt = materialDAO.deleteDesmMrrDtl(row);
		    		//cnt = materialDAO.saveDesmRsiQtySave(row);
		    	}
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }
		
		@Override
	    public int saveDesmMrrReject(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
	    		cnt = materialDAO.saveDesmMrrReject(paramMap);
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }
		
		@Override
	    public int deleteDesmMrr(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
//	    		List<Map<String, Object>> deleteList = materialDAO.getDeleteDesmMrrList(paramMap);
//	    		for(int i = 0; i < deleteList.size(); i++) {
//	    			Map<String, Object> row = deleteList.get(i);
//	    			row.put("USER_AD", paramMap.get("USER_AD").toString());
//		    		cnt = materialDAO.deleteDesmMrrDtl(row);
//		    		//cnt = materialDAO.saveDesmRsiQtySave(row);
//	    		}
	    		cnt = materialDAO.deleteDesmMrrDtlAll(paramMap);
	    		cnt = materialDAO.deleteDesmMrrMst(paramMap);

	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }
		
		
		@Override
	    public int sendMailDesmMrr(Map<String, Object> paramMap) throws Exception {
	    	int cnt = 0;
	    	try {

				cnt = this.sendMailDesmMrrData(paramMap);

				if(cnt < 0) {
					return cnt;
				}

	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }
		
		public int sendMailDesmMrrData(Map<String, Object> paramMap) {

			int cnt = 0;


			try {

				Map<String, Object> mailInfo = new HashMap<String, Object>();

				String mailReceiverList = "";

				List<Map<String, Object>> mailContentList = materialDAO.getMailMrrMstData(paramMap);
				Map<String, Object> mailContent = mailContentList.get(0);

				List<Map<String, Object>> dtlList = materialDAO.getMailMrrDtlData(paramMap);


				List<Map<String, Object>> listMailReceiver = materialDAO.getMailMrrReceiver(paramMap);



				for (Map<String, Object> receiver : listMailReceiver) {
					mailReceiverList += receiver.get("EMAIL").toString();
					mailReceiverList += "; ";
				}
				mailContent.put("mailReceiverList", mailReceiverList);

				mailInfo.put("mailData", mailContent);
				mailInfo.put("receivePerson", listMailReceiver);
				mailInfo.put("dtlList", dtlList);

				mailInfo.put("LOGIN_URL", paramMap.get("LOGIN_URL").toString());
				mailInfo.put("USER_AD", paramMap.get("USER_AD").toString());

				mailInfo.put("location", paramMap.get("location"));
				mailInfo.put("host", paramMap.get("host"));
				mailInfo.put("port", paramMap.get("port"));
				mailInfo.put("encoding", paramMap.get("encoding"));
				mailInfo.put("username", paramMap.get("username"));
				mailInfo.put("password", paramMap.get("password"));


				cnt = this.sendMailDesmMrrDataMailFormat(mailInfo);

			} catch (Exception e) {
				cnt = -2;
				e.printStackTrace();
			}



			return cnt;
		}
		
		
		public int sendMailDesmMrrDataMailFormat(Map<String, Object> param) {
			int cnt = 0;

			final Map<String, Object> paramInfo = new HashMap<String, Object>();

			Map<String, Object> mailData = (Map<String, Object>) param.get("mailData");  // 메일정보
			List<Map<String, Object>> personList = (List<Map<String, Object>>) param.get("receivePerson");  // 수신자 정보
			List<Map<String, Object>> dtlList = (List<Map<String, Object>>) param.get("dtlList");  // Invoice List
			List<Map<String, Object>> mailList = new ArrayList<Map<String, Object>>();

			try {

				for (final Map<String, Object> dtlRow : dtlList) {

					dtlRow.put("no", dtlRow.get("NO") == null ? "&nbsp;" : dtlRow.get("NO").toString());
					dtlRow.put("invoice_no", dtlRow.get("INVOICE_NO") == null ? "&nbsp;" : dtlRow.get("INVOICE_NO").toString());
					dtlRow.put("shipment_no", dtlRow.get("SHIPMENT_NO") == null ? "&nbsp;" : dtlRow.get("SHIPMENT_NO").toString());
					dtlRow.put("package_no", dtlRow.get("PACKAGE_NO") == null ? "&nbsp;" : dtlRow.get("PACKAGE_NO").toString());
					dtlRow.put("description", dtlRow.get("DESCRIPTION") == null ? "&nbsp;" : dtlRow.get("DESCRIPTION").toString());
					//dtlRow.put("material_code", dtlRow.get("MATERIAL_CODE") == null ? "&nbsp;" : dtlRow.get("MATERIAL_CODE").toString());
					dtlRow.put("pkg_type", dtlRow.get("PACKAGE_TYPE") == null ? "&nbsp;" : dtlRow.get("PACKAGE_TYPE").toString());
					//dtlRow.put("tag_no", dtlRow.get("TAG_NO") == null ? "&nbsp;" : dtlRow.get("TAG_NO").toString());
					//dtlRow.put("drawing_no", dtlRow.get("DRAWING_NO") == null ? "&nbsp;" : dtlRow.get("DRAWING_NO").toString());
					//dtlRow.put("unit", dtlRow.get("UNIT") == null ? "&nbsp;" : dtlRow.get("UNIT").toString());
					dtlRow.put("qty", dtlRow.get("QTY") == null ? "&nbsp;" : dtlRow.get("QTY").toString());
					dtlRow.put("received_date", dtlRow.get("RECEIVED_DATE") == null ? "&nbsp;" : dtlRow.get("RECEIVED_DATE").toString());
					dtlRow.put("visual_check", dtlRow.get("VISUAL_CHECK") == null ? "&nbsp;" : dtlRow.get("VISUAL_CHECK").toString());
					dtlRow.put("location", dtlRow.get("LOCATION") == null ? "&nbsp;" : dtlRow.get("LOCATION").toString());
					dtlRow.put("remark", dtlRow.get("REMARK") == null ? "&nbsp;" : dtlRow.get("REMARK").toString());
					dtlRow.put("pic_yn", dtlRow.get("PIC_YN") == null ? "&nbsp;" : dtlRow.get("PIC_YN").toString());
					//dtlRow.put("req_qty", dtlRow.get("REQ_QTY") == null ? "&nbsp;" : dtlRow.get("REQ_QTY").toString());
				}

				for(int i = 0; i < personList.size(); i++) {
					Map<String, Object> content = new HashMap<String, Object>();
					Map<String, Object> receiver = personList.get(i);

					content.put("project_no", mailData.get("PROJECT_NO") == null ? "&nbsp;" : mailData.get("PROJECT_NO").toString());
					content.put("project_name", mailData.get("PROJECT_NAME") == null ? "&nbsp;" : mailData.get("PROJECT_NAME").toString());
					content.put("mrr_no", mailData.get("MRR_NO") == null ? "&nbsp;" : mailData.get("MRR_NO").toString());
					content.put("mrr_name", mailData.get("MRR_NAME") == null ? "&nbsp;" : mailData.get("MRR_NAME").toString());
					content.put("last_updated_by", mailData.get("LAST_UPDATED_BY") == null ? "&nbsp;" : mailData.get("LAST_UPDATED_BY").toString());
					content.put("status", mailData.get("STATUS") == null ? "&nbsp;" : mailData.get("STATUS").toString());
					//content.put("subcontractor", mailData.get("SUBCONTRACTOR") == null ? "&nbsp;" : mailData.get("SUBCONTRACTOR").toString());
					//content.put("subcon_manager", mailData.get("REQUESTED_BY") == null ? "&nbsp;" : mailData.get("REQUESTED_BY").toString());
					content.put("received_date_from", mailData.get("RECEIVED_DATE_FROM") == null ? "&nbsp;" : mailData.get("RECEIVED_DATE_FROM").toString());
					content.put("received_date_to", mailData.get("RECEIVED_DATE_TO") == null ? "&nbsp;" : mailData.get("RECEIVED_DATE_TO").toString());
					String inspection_date = "";
					if(mailData.get("INSPECTION_DATE_FROM") != null && mailData.get("INSPECTION_DATE_TO") == null) {
						inspection_date = mailData.get("INSPECTION_DATE_FROM").toString();
					} else if(mailData.get("INSPECTION_DATE_FROM") == null && mailData.get("INSPECTION_DATE_TO") != null) {
						inspection_date = mailData.get("INSPECTION_DATE_TO").toString();
					} else if(mailData.get("INSPECTION_DATE_FROM") != null && mailData.get("INSPECTION_DATE_TO") != null) {
						inspection_date = mailData.get("INSPECTION_DATE_FROM").toString() + " ~ " + mailData.get("INSPECTION_DATE_TO").toString();
					}
					content.put("inspection_date_from", mailData.get("INSPECTION_DATE_FROM") == null ? "&nbsp;" : mailData.get("INSPECTION_DATE_FROM").toString());
					content.put("inspection_date_to", mailData.get("INSPECTION_DATE_TO") == null ? "&nbsp;" : mailData.get("INSPECTION_DATE_TO").toString());
					content.put("inspection_date", inspection_date);
					//content.put("description", mailData.get("DESCRIPTION") == null ? "&nbsp;" : mailData.get("DESCRIPTION").toString());
					content.put("remark", mailData.get("REMARK") == null ? "&nbsp;" : mailData.get("REMARK").toString());
					content.put("count_mrr_line", mailData.get("COUNT_MRR_LINE") == null ? "&nbsp;" : mailData.get("COUNT_MRR_LINE").toString());


					content.put("list_data", dtlList);

					content.put("login_url", param.get("LOGIN_URL").toString());


					// 메일본문에 메일 수신자 임시 추가
					content.put("mailReceiverList", mailData.get("mailReceiverList") == null ? "&nbsp;" : mailData.get("mailReceiverList").toString());


					Map<String, Object> rowData = new HashMap<String, Object>();
					rowData.put("from_addr", "ews_desm@doosan.com");
					rowData.put("from_nm", "DESM Alarm Service");

					rowData.put("to_addr", (String) receiver.get("EMAIL"));
					rowData.put("TO_USER_AD", receiver.get("USER_AD"));
					rowData.put("PROJECT_NO", mailData.get("PROJECT_NO"));

					if(param.get("location").toString().equals("dev")) {
						//rowData.put("to_addr", "seunghwan2.jung@doosan.com");
						//rowData.put("to_addr", "hanbyul1.lee@doosan.com");
						//rowData.put("TO_USER_AD", "HANBYUL1.LEE");
						//rowData.put("to_addr", "sangyong3.park@doosan.com");
						//rowData.put("TO_USER_AD", "SANGYONG3.PARK");
						rowData.put("to_addr", "juneshik.yang@doosan.com");
						rowData.put("TO_USER_AD", "juneshik.yang");
						
						//rowData.put("TO_USER_AD", "HANBYUL1.LEE");
					}


					rowData.put("title", "");
					rowData.put("data", content);

					rowData.put("USER_AD", param.get("USER_AD"));
					rowData.put("host", param.get("host"));
					rowData.put("port", param.get("port"));
					rowData.put("encoding", param.get("encoding"));
					rowData.put("username", param.get("username"));
					rowData.put("password", param.get("password"));
					rowData.put("mrr_name", mailData.get("MRR_NAME") == null ? "&nbsp;" : mailData.get("MRR_NAME").toString());
					rowData.put("MRR_NO", mailData.get("MRR_NO") == null ? "&nbsp;" : mailData.get("MRR_NO").toString());
					rowData.put("status", mailData.get("STATUS") == null ? "&nbsp;" : mailData.get("STATUS").toString());

					mailList.add(rowData);

				}

				//cnt = desmService.addMail("DESM_RSI_APPROVAL_CHANGE_MAIL", mailList);
				//cnt = desmService.sendFcm("RSI", mailList);
				cnt = desmService.addMail("DESM_MRR_APPROVAL_CHANGE_MAIL", mailList);
				cnt = desmService.sendFcm("MRR", mailList);

			} catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		cnt = -2;
	    		return cnt;
			}

			return cnt;
		}
		
		@Override
	    public List<Map<String, Object>> getIdsmOsSummaryMrrList(Map<String, Object> paramMap) {
			if(paramMap.get("LOCATION") != null && !paramMap.get("LOCATION").toString().equals("")) {
				String[] locationArr = paramMap.get("LOCATION").toString().split("!!!");
				List<Map<String, Object>> lList = new ArrayList<Map<String,Object>>();

				for (int i = 0; i < locationArr.length; i++) {
					Map<String, Object> row = new HashMap<String, Object>();
					row.put("LOCATION", locationArr[i]);

					lList.add(row);
				}

				paramMap.put("LOCATION_LIST", lList);
			}

	       return materialDAO.getIdsmOsSummaryMrrList(paramMap);
	    }

		@Override
	    public List<Map<String, Object>> getDesmMirList(Map<String, Object> paramMap) {
	        return materialDAO.getDesmMirList(paramMap);
	    }

		@Override
		public List<Map<String, Object>> getIdsmOsSummaryMirList(Map<String, Object> paramMap) {
			if(paramMap.get("LOCATION") != null && !paramMap.get("LOCATION").toString().equals("")) {
				String[] locationArr = paramMap.get("LOCATION").toString().split("!!!");
				List<Map<String, Object>> lList = new ArrayList<Map<String,Object>>();

				for (int i = 0; i < locationArr.length; i++) {
					Map<String, Object> row = new HashMap<String, Object>();
					row.put("LOCATION", locationArr[i]);

					lList.add(row);
				}

				paramMap.put("LOCATION_LIST", lList);
			}

	       return materialDAO.getIdsmOsSummaryMirList(paramMap);
		}

		@Override
		public List<Map<String, Object>> getIdsmOsSummaryMirItemList(Map<String, Object> paramMap) throws Exception {
			if(paramMap.get("LOCATION") != null && !paramMap.get("LOCATION").toString().equals("")) {
				String[] locationArr = paramMap.get("LOCATION").toString().split("!!!");
				List<Map<String, Object>> lList = new ArrayList<Map<String,Object>>();

				for (int i = 0; i < locationArr.length; i++) {
					Map<String, Object> row = new HashMap<String, Object>();
					row.put("LOCATION", locationArr[i]);

					lList.add(row);
				}

				paramMap.put("LOCATION_LIST", lList);
			}

			if(paramMap.get("PACKAGE_NO_LIST") != null && !paramMap.get("PACKAGE_NO_LIST").toString().equals("")) {
				ObjectMapper objectMapper = new ObjectMapper();
				paramMap.put("PACKAGE_NO_LIST", objectMapper.readValue((String) paramMap.get("PACKAGE_NO_LIST"), List.class));
			}
			
			if(paramMap.get("TRK_ITEM_NAME_LIST") != null && !paramMap.get("TRK_ITEM_NAME_LIST").toString().equals("")) {
				ObjectMapper objectMapper = new ObjectMapper();
				paramMap.put("TRK_ITEM_NAME_LIST", objectMapper.readValue((String) paramMap.get("TRK_ITEM_NAME_LIST"), List.class));
			}

	       return materialDAO.getIdsmOsSummaryMirItemList(paramMap);
		}

		@Override
		public Map<String, Object> saveDesmMirSave(Map<String, Object> paramMap) throws Exception {

	    	Map<String, Object> resultMap = new HashMap<String, Object>();
	    	int cnt = 0;
	    	try {
	    		
	    		if(paramMap.get("MIR_HEADER_ID") == null || paramMap.get("MIR_HEADER_ID").toString().equals("")) {
	    			List<Map<String, Object>> list = materialDAO.getDesmMirHeaderData(paramMap);

	    			paramMap.put("MIR_HEADER_ID", list.get(0).get("MIR_HEADER_ID"));
	    			paramMap.put("MIR_NO", list.get(0).get("MIR_NO"));
	    		}
	    		resultMap.put("MIR_HEADER_ID", paramMap.get("MIR_HEADER_ID"));

    			if(paramMap.get("TRANS_TYPE").toString().equals("Incomplete")) {
    				paramMap.put("STATUS", "Incomplete");

    				if(paramMap.get("PREPARED_BY") != null && !paramMap.get("PREPARED_BY").toString().equals("")) {
    					paramMap.put("P_USER_AD", paramMap.get("PREPARED_BY"));
    				}
    			}    			
    			else if(paramMap.get("TRANS_TYPE").toString().equals("Pre-Checked1")) {
    				paramMap.put("STATUS", "Pre-Checked1");
    				paramMap.put("PREPARED_BY", paramMap.get("USER_AD"));
					paramMap.put("P_USER_AD", paramMap.get("USER_AD"));
    			}
    			else if(paramMap.get("TRANS_TYPE").toString().equals("Pre-Checked2")) {
    				paramMap.put("STATUS", "Pre-Checked2");
    				paramMap.put("CHECKED1_BY", paramMap.get("USER_AD"));
					paramMap.put("P_USER_AD", paramMap.get("USER_AD"));
    			}
    			else if(paramMap.get("TRANS_TYPE").toString().equals("Pre-Checked3")) {
    				paramMap.put("STATUS", "Pre-Checked3");
    				paramMap.put("CHECKED2_BY", paramMap.get("USER_AD"));
					paramMap.put("P_USER_AD", paramMap.get("USER_AD"));
    			}
    			else if(paramMap.get("TRANS_TYPE").toString().equals("Checked")) {
    				paramMap.put("STATUS", "Checked");
    				paramMap.put("CHECKED3_BY", paramMap.get("USER_AD"));
					paramMap.put("P_USER_AD", paramMap.get("USER_AD"));
    			}
    			resultMap.put("STATUS", paramMap.get("STATUS"));

				JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
		    	for(int i = 0; i < updateList.size(); i++) {
		    		JSONObject obj = (JSONObject)updateList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		row.put("USER_AD", paramMap.get("USER_AD"));
		    		row.put("MIR_HEADER_ID", paramMap.get("MIR_HEADER_ID"));
		    		
		    		
		    		/*int qtyIdx = row.get("REQ_QTY").toString().indexOf(".");
		    		if(qtyIdx != -1) {
		    			String Qty = row.get("REQ_QTY").toString().substring(0, qtyIdx);
		    			row.put("REQ_QTY", Qty);
		    		}*/

		    		/*List<Map<String, Object>> checkList = materialDAO.getDesmRsiLineQtyList(row);
		    		if(Integer.parseInt(checkList.get(0).get("REQ_AVAILABLE_QTY").toString()) < Integer.parseInt(row.get("REQ_QTY").toString())) {
		    			resultMap.put("error", "QTY");
		    			resultMap.put("MATERIAL_CODE", row.get("MATERIAL_CODE"));
		    			resultMap.put("REQ_AVAILABLE_QTY", checkList.get(0).get("REQ_AVAILABLE_QTY"));
			    		return resultMap;
		    		}*/
		    		
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

		    		cnt = materialDAO.saveDesmMirLineSave(row);
		    	}
		    	
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
		    	cnt = materialDAO.saveDesmMirHeaderSave(paramMap);

		    	// "Checked" 하는 시점에 MIR Line의 Package No Distinct 처리 후 해당 Package No의 Material Confirm을 Y로 변경 
		    	if(paramMap.get("TRANS_TYPE").toString().equals("Checked")) {
			    	materialDAO.saveMirLineConfirmMaterial(paramMap);
		    	}
		    	
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return resultMap;
		}

		@Override
	    public Map<String, Object> getDesmMirInfoList(Map<String, Object> paramMap) {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("headerList", materialDAO.getDesmMirHeaderList(paramMap));
			resultMap.put("lineList", materialDAO.getDesmMirLineList(paramMap));

	        return resultMap;
	    }
		
		@Override
		public int deleteDesmMirDtl(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
				JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
		    	for(int i = 0; i < deleteList.size(); i++) {
		    		JSONObject obj = (JSONObject)deleteList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		row.put("USER_AD", paramMap.get("USER_AD").toString());

		    		cnt = materialDAO.deleteDesmMirDtl(row);
		    		//cnt = materialDAO.saveDesmRsiQtySave(row);
		    	}
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
		}

		@Override
		public int saveDesmMirReject(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
	    		cnt = materialDAO.saveDesmMirReject(paramMap);
	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
		}

		@Override
		public int deleteDesmMir(Map<String, Object> paramMap) throws Exception {

	    	int cnt = 0;

	    	try {
	    		List<Map<String, Object>> deleteList = materialDAO.getDeleteDesmMirList(paramMap);
	    		// TODO: 전체삭제면 MIR_HEADER_ID로 쿼리 한번만 날릴 수 있도록 수정 
//	    		for(int i = 0; i < deleteList.size(); i++) {
//	    			Map<String, Object> row = deleteList.get(i);
//	    			row.put("USER_AD", paramMap.get("USER_AD").toString());
//		    		cnt = materialDAO.deleteDesmMirDtl(row);
//		    		//cnt = materialDAO.saveDesmRsiQtySave(row);
//	    		}
	    		cnt = materialDAO.deleteDesmMirDtlAll(paramMap);
	    		cnt = materialDAO.deleteDesmMirMst(paramMap);

	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
		}

		@Override
	    public int sendMailDesmMir(Map<String, Object> paramMap) throws Exception {
	    	int cnt = 0;
	    	try {

				cnt = this.sendMailDesmMirData(paramMap);

				if(cnt < 0) {
					return cnt;
				}

	    	}
	    	catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		throw new Exception(e.toString());
			}
	        return cnt;
	    }
		
		public int sendMailDesmMirData(Map<String, Object> paramMap) {

			int cnt = 0;


			try {

				Map<String, Object> mailInfo = new HashMap<String, Object>();

				String mailReceiverList = "";

				List<Map<String, Object>> mailContentList = materialDAO.getMailMirMstData(paramMap);
				Map<String, Object> mailContent = mailContentList.get(0);
				mailContent.put("TRANS_TYPE", paramMap.get("TRANS_TYPE").toString());

				List<Map<String, Object>> dtlList = materialDAO.getMailMirDtlData(paramMap);


				// TRANS_TYPE으로 분기..
				List<Map<String, Object>> listMailReceiver = (paramMap.get("TRANS_TYPE").toString().equals("CheckedUpdate")) ? materialDAO.getMailMirUpdateReceiver(paramMap) : materialDAO.getMailMirReceiver(paramMap);



				for (Map<String, Object> receiver : listMailReceiver) {
					mailReceiverList += receiver.get("EMAIL").toString();
					mailReceiverList += "; ";
				}
				mailContent.put("mailReceiverList", mailReceiverList);

				mailInfo.put("mailData", mailContent);
				mailInfo.put("receivePerson", listMailReceiver);
				mailInfo.put("dtlList", dtlList);

				mailInfo.put("LOGIN_URL", paramMap.get("LOGIN_URL").toString());
				mailInfo.put("USER_AD", paramMap.get("USER_AD").toString());

				mailInfo.put("location", paramMap.get("location"));
				mailInfo.put("host", paramMap.get("host"));
				mailInfo.put("port", paramMap.get("port"));
				mailInfo.put("encoding", paramMap.get("encoding"));
				mailInfo.put("username", paramMap.get("username"));
				mailInfo.put("password", paramMap.get("password"));


				cnt = this.sendMailDesmMirDataMailFormat(mailInfo);

			} catch (Exception e) {
				cnt = -2;
				e.printStackTrace();
			}



			return cnt;
		}
		
		
		public int sendMailDesmMirDataMailFormat(Map<String, Object> param) {
			int cnt = 0;

			final Map<String, Object> paramInfo = new HashMap<String, Object>();

			Map<String, Object> mailData = (Map<String, Object>) param.get("mailData");  // 메일정보
			List<Map<String, Object>> personList = (List<Map<String, Object>>) param.get("receivePerson");  // 수신자 정보
			List<Map<String, Object>> dtlList = (List<Map<String, Object>>) param.get("dtlList");  // Invoice List
			List<Map<String, Object>> mailList = new ArrayList<Map<String, Object>>();

			try {

				boolean isOsdmName = false;
				for (final Map<String, Object> dtlRow : dtlList) {

					dtlRow.put("no", dtlRow.get("NO") == null ? "&nbsp;" : dtlRow.get("NO").toString());
					dtlRow.put("invoice_no", dtlRow.get("INVOICE_NO") == null ? "&nbsp;" : dtlRow.get("INVOICE_NO").toString());
					dtlRow.put("package_no", dtlRow.get("PACKAGE_NO") == null ? "&nbsp;" : dtlRow.get("PACKAGE_NO").toString());
					dtlRow.put("description", dtlRow.get("DESCRIPTION") == null ? "&nbsp;" : dtlRow.get("DESCRIPTION").toString());
					dtlRow.put("tag_no", dtlRow.get("TAG_NO") == null ? "&nbsp;" : dtlRow.get("TAG_NO").toString());
					dtlRow.put("drawing_no", dtlRow.get("PACKAGE_TYPE") == null ? "&nbsp;" : dtlRow.get("PACKAGE_TYPE").toString());
					dtlRow.put("unit", dtlRow.get("UNIT") == null ? "&nbsp;" : dtlRow.get("UNIT").toString());
					dtlRow.put("in_qty", dtlRow.get("IN_QTY") == null ? "&nbsp;" : Integer.parseInt(dtlRow.get("IN_QTY").toString()));
					dtlRow.put("inspection_result", dtlRow.get("INSPECTION_RESULT") == null ? "&nbsp;" : dtlRow.get("INSPECTION_RESULT").toString());
					if(!isOsdmName) {
						isOsdmName = dtlRow.get("inspection_result").toString().equals("Defect") ? true : false;
					}
					dtlRow.put("osdm_received_qty", dtlRow.get("RECEIVED_QTY") == null ? "&nbsp;" : Integer.parseInt(dtlRow.get("RECEIVED_QTY").toString()));
					dtlRow.put("o_qty", dtlRow.get("OVER_QTY") == null ? "&nbsp;" : dtlRow.get("OVER_QTY").toString());
					dtlRow.put("s_qty", dtlRow.get("SHORT_QTY") == null ? "&nbsp;" : dtlRow.get("SHORT_QTY").toString());
					dtlRow.put("d_qty", dtlRow.get("DAMAGE_QTY") == null ? "&nbsp;" : dtlRow.get("DAMAGE_QTY").toString());
					dtlRow.put("m_qty", dtlRow.get("MISSING_QTY") == null ? "&nbsp;" : dtlRow.get("MISSING_QTY").toString());
				}

				for(int i = 0; i < personList.size(); i++) {
					Map<String, Object> content = new HashMap<String, Object>();
					Map<String, Object> receiver = personList.get(i);

					content.put("project_no", mailData.get("PROJECT_NO") == null ? "&nbsp;" : mailData.get("PROJECT_NO").toString());
					content.put("project_name", mailData.get("PROJECT_NAME") == null ? "&nbsp;" : mailData.get("PROJECT_NAME").toString());
					content.put("mir_no", mailData.get("MIR_NO") == null ? "&nbsp;" : mailData.get("MIR_NO").toString());
					content.put("mir_name", mailData.get("MIR_NAME") == null ? "&nbsp;" : mailData.get("MIR_NAME").toString());
					content.put("category", mailData.get("CATEGORY") == null ? "&nbsp;" : mailData.get("CATEGORY").toString());
					content.put("osdm_name", isOsdmName ? mailData.get("OSDM_NAME") == null ? "&nbsp;" : mailData.get("OSDM_NAME").toString() : "&nbsp;");
					System.out.println(isOsdmName + " ========================> " + content.get("osdm_name"));
					content.put("inspection_location", mailData.get("INSPECTION_LOCATION") == null ? "&nbsp;" : mailData.get("INSPECTION_LOCATION").toString());
					content.put("result_of_inspection", mailData.get("RESULT_OF_INSPECTION") == null ? "&nbsp;" : mailData.get("RESULT_OF_INSPECTION").toString());
					content.put("last_updated_by", mailData.get("LAST_UPDATED_BY") == null ? "&nbsp;" : mailData.get("LAST_UPDATED_BY").toString());
					content.put("status", mailData.get("STATUS") == null ? "&nbsp;" : mailData.get("STATUS").toString());
					content.put("received_date_from", mailData.get("RECEIVED_DATE_FROM") == null ? "&nbsp;" : mailData.get("RECEIVED_DATE_FROM").toString());
					content.put("received_date_to", mailData.get("RECEIVED_DATE_TO") == null ? "&nbsp;" : mailData.get("RECEIVED_DATE_TO").toString());
					String inspection_date = "";
					if(mailData.get("INSPECTION_DATE_FROM") != null && mailData.get("INSPECTION_DATE_TO") == null) {
						inspection_date = mailData.get("INSPECTION_DATE_FROM").toString();
					} else if(mailData.get("INSPECTION_DATE_FROM") == null && mailData.get("INSPECTION_DATE_TO") != null) {
						inspection_date = mailData.get("INSPECTION_DATE_TO").toString();
					} else if(mailData.get("INSPECTION_DATE_FROM") != null && mailData.get("INSPECTION_DATE_TO") != null) {
						inspection_date = mailData.get("INSPECTION_DATE_FROM").toString() + " ~ " + mailData.get("INSPECTION_DATE_TO").toString();
					}
					content.put("inspection_date", inspection_date);
					content.put("remarks", mailData.get("REMARKS") == null ? "&nbsp;" : mailData.get("REMARKS").toString());
					content.put("client_comments", mailData.get("CLIENT_COMMENTS") == null ? "&nbsp;" : mailData.get("CLIENT_COMMENTS").toString());
					content.put("count_mir_line", mailData.get("COUNT_MIR_LINE") == null ? "&nbsp;" : mailData.get("COUNT_MIR_LINE").toString());


					content.put("list_data", dtlList);

					content.put("login_url", param.get("LOGIN_URL").toString());


					// 메일본문에 메일 수신자 임시 추가
					content.put("mailReceiverList", mailData.get("mailReceiverList") == null ? "&nbsp;" : mailData.get("mailReceiverList").toString());


					Map<String, Object> rowData = new HashMap<String, Object>();
					rowData.put("from_addr", "ews_desm@doosan.com");
					rowData.put("from_nm", "DESM Alarm Service");

					rowData.put("to_addr", (String) receiver.get("EMAIL"));
					rowData.put("TO_USER_AD", receiver.get("USER_AD"));
					rowData.put("PROJECT_NO", mailData.get("PROJECT_NO"));

					if(param.get("location").toString().equals("dev")) {
						//rowData.put("to_addr", "seunghwan2.jung@doosan.com");
						//rowData.put("to_addr", "hanbyul1.lee@doosan.com");
						//rowData.put("TO_USER_AD", "HANBYUL1.LEE");
						//rowData.put("to_addr", "sangyong3.park@doosan.com");
						//rowData.put("TO_USER_AD", "SANGYONG3.PARK");
						rowData.put("to_addr", "juneshik.yang@doosan.com");
						rowData.put("TO_USER_AD", "juneshik.yang");
						System.out.println("TO_ADDR :: ");
						System.out.println(receiver.get("EMAIL").toString());
						System.out.println(receiver.get("USER_AD").toString());
						
					}


					rowData.put("title", "");
					rowData.put("data", content);
					
					//TODO: email_title 넣고, TRANS_TYPE 으로 문구 변경처리
					String mirName = mailData.get("MIR_NAME") == null ? "&nbsp;" : mailData.get("MIR_NAME").toString();
					String status = mailData.get("STATUS") == null ? "&nbsp;" : mailData.get("STATUS").toString();

					rowData.put("USER_AD", param.get("USER_AD"));
					rowData.put("host", param.get("host"));
					rowData.put("port", param.get("port"));
					rowData.put("encoding", param.get("encoding"));
					rowData.put("username", param.get("username"));
					rowData.put("password", param.get("password"));
					rowData.put(
							"email_title", mailData.get("TRANS_TYPE") == null ? "&nbsp;" : 
								mailData.get("TRANS_TYPE").toString().equals("CheckedUpdate") ? "DESM MIR Client Comment Update [" + mirName + "]" : "DESM MIR Approval Status Notice [" + mirName + "] : " + status
					);
					//System.out.println(rowData.get("email_title").toString());
					rowData.put("mir_name", mailData.get("MIR_NAME") == null ? "&nbsp;" : mailData.get("MIR_NAME").toString());
					rowData.put("MIR_NO", mailData.get("MIR_NO") == null ? "&nbsp;" : mailData.get("MIR_NO").toString());
					rowData.put("status", mailData.get("STATUS") == null ? "&nbsp;" : mailData.get("STATUS").toString());

					mailList.add(rowData);

				}

				cnt = desmService.addMail("DESM_MIR_APPROVAL_CHANGE_MAIL", mailList);
				cnt = desmService.sendFcm("MIR", mailList);

			} catch (Exception e) {
	    		System.out.println("!!!!!!" + e.toString());
	    		cnt = -2;
	    		return cnt;
			}

			return cnt;
	}
	
	@Override
	public Map<String, Object> updateMirAfterChecked(Map<String, Object> paramMap) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();
    	try {
    		JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
	    	for(int i = 0; i < updateList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD").toString());
	    		materialDAO.updateMirLineRemarks(row);
	    	}
    		
	    	materialDAO.updateMirClientComments(paramMap);
    		resultMap.put("MIR_HEADER_ID", paramMap.get("MIR_HEADER_ID"));
    		resultMap.put("STATUS", paramMap.get("STATUS"));
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
	}
}

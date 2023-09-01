package egovframework.desm.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.desm.cmmn.idcs.IdcsService;
import egovframework.desm.service.AdminService;
import egovframework.desm.service.DesmService;
import egovframework.desm.service.MprService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service("mprService")
public class MprServiceImpl extends EgovAbstractServiceImpl implements MprService {

	@Resource(name = "desmDAO")
	private DesmDAO desmDAO;

	@Resource(name = "mprDAO")
	private MprDAO mprDAO;

	@Resource(name = "adminService")
	private AdminService adminService;

	@Resource(name = "idsmDAO")
	private IdsmDAO idsmDAO;

	@Resource(name = "desmService")
	private DesmService desmService;

	@Resource(name = "idcsService")
	private IdcsService idcsService;

    @Override
    public Map<String, Object> saveDesmMprSetupDate(Map<String, Object> paramMap) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {

            if(paramMap.get("MPR_NO") == null || paramMap.get("MPR_NO").toString().equals("")) {
                List<Map<String, Object>> mprNoList = mprDAO.getMprNoList(paramMap);
                paramMap.put("MPR_NO", mprNoList.get(0).get("MPR_NO"));
          	}

    		mprDAO.saveDesmMprSetupDate(paramMap);

    		resultMap.put("MPR_NO", paramMap.get("MPR_NO"));
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

	@Override
    public List<Map<String, Object>> getDesmMprSetupDate(Map<String, Object> paramMap) {
        return mprDAO.getDesmMprSetupDate(paramMap);
    }

	@Override
    public Map<String, Object> getDesmMprSetupData(Map<String, Object> paramMap) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> checkList = mprDAO.getDesmMprSetupCheckDateList(paramMap);
		if(checkList.size() == 0) {
			paramMap.put("colList", new HashMap<String, Object>());
		}
		else {
			if(checkList.get(0).get("START_MONTH") == null || checkList.get(0).get("START_MONTH").toString().equals("")) {
				paramMap.put("colList", new HashMap<String, Object>());
			}
			else
			{
				paramMap.put("colList", mprDAO.getDesmMprSetupColDataList(paramMap));
			}
		}



		List<Map<String, Object>> dataList = mprDAO.getDesmMprSetupDataList(paramMap);
//		List<Map<String, Object>> dataList = mprDAO.getDesmMprSetupDataListNew(paramMap);
		resultMap.put("colList", paramMap.get("colList"));
		resultMap.put("dataList", dataList);

        return resultMap;
    }

    @Override
    public Map<String, Object> saveDesmMprSetupData(Map<String, Object> paramMap) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {

    		if(paramMap.get("MPR_NO") == null || paramMap.get("MPR_NO").toString().equals("")) {
    			List<Map<String, Object>> mprNoList = mprDAO.getMprNoList(paramMap);
    			paramMap.put("MPR_NO", mprNoList.get(0).get("MPR_NO"));
    		}

			JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
	    	for(int i = 0; i < updateList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("MPR_NO", paramMap.get("MPR_NO"));
	    		mprDAO.saveDesmMprSetupData(row);
	    	}

			JSONArray updateRemarkList = JSONArray.fromObject(paramMap.get("updateRemarkList").toString());
	    	for(int i = 0; i < updateRemarkList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateRemarkList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("MPR_NO", paramMap.get("MPR_NO"));
	    		mprDAO.saveDesmMprSetupRemark(row);
	    	}

			JSONArray updateSupplierMailList = JSONArray.fromObject(paramMap.get("updateSupplierMailList").toString());
	    	for(int i = 0; i < updateSupplierMailList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateSupplierMailList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("TYPE_CODE", "S");
	    		row.put("MPR_NO", paramMap.get("MPR_NO"));
	    		mprDAO.saveDesmMprSetupMail(row);
	    	}

			JSONArray updateUserMailList = JSONArray.fromObject(paramMap.get("updateUserMailList").toString());
	    	for(int i = 0; i < updateUserMailList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateUserMailList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("TYPE_CODE", "D");
	    		row.put("MPR_NO", paramMap.get("MPR_NO"));
	    		mprDAO.saveDesmMprSetupMail(row);
	    	}

	    	mprDAO.saveDesmMprSetupProductName(paramMap);

	    	if(paramMap.get("STATUS").toString().equals("Incomplete")) {
	    		mprDAO.saveDesmMprSetupSubmisstionPeriod(paramMap);
	    	}

	    	resultMap.put("MPR_NO", paramMap.get("MPR_NO"));

	    	if(paramMap.get("STATUS").toString().equals("Pre-Confirmed")) {
		    	int cnt = this.sendMailDesmMprSetupData(paramMap);
		    	if(cnt < 0) {
		    		resultMap.put("Err", cnt);
		    	}
	    	}


    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

	public int sendMailDesmMprSetupData(Map<String, Object> paramMap) {

		int cnt = 0;


		try {
			paramMap.put("EXPEDITER_YN", "Y");
			Map<String, Object> mailInfo = new HashMap<String, Object>();

			String mailReceiverList = "";

			List<Map<String, Object>> mailContentList = mprDAO.getMailMprSetupMstData(paramMap);
			if(mailContentList == null || mailContentList.size() < 1) {
				return cnt;
			}
			Map<String, Object> mailContent = mailContentList.get(0);

			/*
			List<Map<String, Object>> dtlList = materialDAO.getMailRsiDtlData(paramMap);*/

			List<Map<String, Object>> dtlList = new ArrayList<Map<String,Object>>();

			List<Map<String, Object>> listMailReceiver = mprDAO.getMailMprSetupReceiver(paramMap);



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


			cnt = this.sendMailDesmMprSetupDataMailFormat(mailInfo);

		} catch (Exception e) {
			cnt = -2;
			e.printStackTrace();
		}

		return cnt;
	}

	public int sendMailDesmMprSetupDataMailFormat(Map<String, Object> param) {
		int cnt = 0;

		final Map<String, Object> paramInfo = new HashMap<String, Object>();

		Map<String, Object> mailData = (Map<String, Object>) param.get("mailData");  // 메일정보
		List<Map<String, Object>> personList = (List<Map<String, Object>>) param.get("receivePerson");  // 수신자 정보
		List<Map<String, Object>> dtlList = (List<Map<String, Object>>) param.get("dtlList");  // Invoice List
		List<Map<String, Object>> mailList = new ArrayList<Map<String, Object>>();

		try {

			/*
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
			*/


			for(int i = 0; i < personList.size(); i++) {
				Map<String, Object> content = new HashMap<String, Object>();
				Map<String, Object> receiver = personList.get(i);

				content.put("company", mailData.get("SUPPLIER_NAME") == null ? "&nbsp;" : mailData.get("SUPPLIER_NAME").toString());
				content.put("product_name", mailData.get("PRODUCT_NAME") == null ? "&nbsp;" : mailData.get("PRODUCT_NAME").toString());
				content.put("po_no", mailData.get("PO_NO") == null ? "&nbsp;" : mailData.get("PO_NO").toString());
				content.put("po_description", mailData.get("PO_DESCRIPTION") == null ? "&nbsp;" : mailData.get("PO_DESCRIPTION").toString());
				content.put("mpr_no", mailData.get("MPR_NO") == null ? "&nbsp;" : mailData.get("MPR_NO").toString());
				content.put("status", mailData.get("STATUS") == null ? "&nbsp;" : mailData.get("STATUS").toString());
				content.put("updateby_mail", mailData.get("UPDATE_BY_MAIL") == null ? "&nbsp;" : mailData.get("UPDATE_BY_MAIL").toString());
				content.put("last_updated_by", mailData.get("UPDATE_BY_MAIL") == null ? "&nbsp;" : mailData.get("LAST_UPDATED_BY").toString());

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

				if(i == 0) {
					if(!param.get("location").toString().equals("dev")) {
			        	String[] strArr = new String[2];
			        	strArr[0] = "jiwon.youn@doosan.com";
			        	strArr[1] = "juseong.kim@doosan.com";
			        	rowData.put("bcc_addr", strArr);
			          }
			        else {
			        	String[] strArr = new String[1];
			        	strArr[0] = "seunghwan2.jung@doosan.com";
			        	rowData.put("bcc_addr", strArr);
			        }
				}

				/*
				if(param.get("location").toString().equals("dev")) {
					rowData.put("to_addr", "seunghwan2.jung@doosan.com");
					//rowData.put("to_addr", "hanbyul1.lee@doosan.com");
					rowData.put("TO_USER_AD", "HANBYUL1.LEE");
				}
				*/



				rowData.put("title", "");
				rowData.put("data", content);

				String emailTitle = "[DESM MPR] New MPR Setup : " + content.get("company").toString();
				rowData.put("USER_AD", param.get("USER_AD"));
				rowData.put("host", param.get("host"));
				rowData.put("port", param.get("port"));
				rowData.put("encoding", param.get("encoding"));
				rowData.put("username", param.get("username"));
				rowData.put("password", param.get("password"));
				rowData.put("email_title", emailTitle);
				//rowData.put("rsi_name", mailData.get("RSI_NAME") == null ? "&nbsp;" : mailData.get("RSI_NAME").toString());
				//rowData.put("RSI_NO", mailData.get("RSI_NO") == null ? "&nbsp;" : mailData.get("RSI_NO").toString());
				//rowData.put("status", mailData.get("STATUS") == null ? "&nbsp;" : mailData.get("STATUS").toString());

				mailList.add(rowData);

			}

			cnt = desmService.addMail("DESM_MPR_SETUP_CHANGE_MAIL", mailList);
			//cnt = desmService.sendFcm("RSI", mailList);

		} catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		cnt = -2;
    		return cnt;
		}

		return cnt;
	}

    @Override
    public Map<String, Object> saveDesmMprHeader(Map<String, Object> paramMap, List<Map<String, Object>> imgTxtList) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {

    		if(paramMap.get("MPR_SEQ") == null || paramMap.get("MPR_SEQ").toString().equals("")) {
    			List<Map<String, Object>> seqList = mprDAO.getDesmMprSeq(paramMap);
    			paramMap.put("MPR_SEQ", seqList.get(0).get("SEQ"));
    		}

    		mprDAO.saveDesmMprHeader(paramMap);
    		resultMap.put("MPR_SEQ", paramMap.get("MPR_SEQ"));

	    	for(int i = 0; i < imgTxtList.size(); i++) {
	    		Map<String, Object> row = imgTxtList.get(i);
	    		row.put("SEQ", i);
	    		mprDAO.saveDesmMprImgTxt(row);
	    	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public Map<String, Object> saveDesmMprDetail(Map<String, Object> paramMap) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {

			JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
	    	for(int i = 0; i < updateList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("MPR_SEQ", paramMap.get("MPR_SEQ"));

	    		System.out.println(row);

	    		if(row.get("VAL") == null ||  row.get("VAL").toString().equals("")) {
	    			mprDAO.updateDesmMprDetailnProgress(row);
	    		}
	    		else {
	    			mprDAO.saveDesmMprDetailnProgress(row);
	    		}


	    	}

			JSONArray updateRemarkList = JSONArray.fromObject(paramMap.get("updateRemarkList").toString());
	    	for(int i = 0; i < updateRemarkList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateRemarkList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("MPR_SEQ", paramMap.get("MPR_SEQ"));

	    		mprDAO.saveDesmMprDetailnProgressRemark(row);
	    	}

			JSONArray updateProgressNoteList = JSONArray.fromObject(paramMap.get("updateProgressNoteList").toString());
	    	for(int i = 0; i < updateProgressNoteList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateProgressNoteList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("MPR_SEQ", paramMap.get("MPR_SEQ"));
	    		mprDAO.saveDesmMprProgressNote(row);
	    	}

			JSONArray updateMainRemarksList = JSONArray.fromObject(paramMap.get("updateMainRemarksList").toString());
	    	for(int i = 0; i < updateMainRemarksList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateMainRemarksList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("MPR_SEQ", paramMap.get("MPR_SEQ"));
	    		mprDAO.saveDesmMprMainRemarks(row);
	    	}

			JSONArray updateProcureList = JSONArray.fromObject(paramMap.get("updateProcureList").toString());
	    	for(int i = 0; i < updateProcureList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateProcureList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("MPR_SEQ", paramMap.get("MPR_SEQ"));
	    		mprDAO.saveDesmMprProcure(row);
	    	}

			JSONArray updateDesignList = JSONArray.fromObject(paramMap.get("updateDesignList").toString());
	    	for(int i = 0; i < updateDesignList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateDesignList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("MPR_SEQ", paramMap.get("MPR_SEQ"));
	    		mprDAO.saveDesmMprDesign(row);
	    	}

			JSONArray updateQualityList = JSONArray.fromObject(paramMap.get("updateQualityList").toString());
	    	for(int i = 0; i < updateQualityList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateQualityList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("MPR_SEQ", paramMap.get("MPR_SEQ"));
	    		mprDAO.saveDesmMprQuality(row);
	    	}

			JSONArray updateManufactureList = JSONArray.fromObject(paramMap.get("updateManufactureList").toString());
	    	for(int i = 0; i < updateManufactureList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateManufactureList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("MPR_SEQ", paramMap.get("MPR_SEQ"));
	    		mprDAO.saveDesmMprManufacture(row);
	    	}

	        if(paramMap.get("STATUS").equals("Pre-Confirmed")) {
		    	int cnt = this.sendMailDesmMprRequestData(paramMap);
		    	if(cnt < 0) {
		    		resultMap.put("Err", "-4");
		    	}
	        }


    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    /*
    @Override
    public Map<String, Object> saveDesmMpr(Map<String, Object> paramMap, List<Map<String, Object>> imgTxtList) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {

    		if(paramMap.get("MPR_SEQ") == null || paramMap.get("MPR_SEQ").toString().equals("")) {
    			List<Map<String, Object>> seqList = mprDAO.getDesmMprSeq(paramMap);
    			paramMap.put("MPR_SEQ", seqList.get(0).get("SEQ"));
    		}

    		mprDAO.saveDesmMprHeader(paramMap);
    		resultMap.put("MPR_SEQ", paramMap.get("MPR_SEQ"));

			JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
	    	for(int i = 0; i < updateList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("MPR_SEQ", paramMap.get("MPR_SEQ"));

	    		if(row.get("VAL") == null ||  row.get("VAL").toString().equals("")) {
	    			mprDAO.updateDesmMprDetailnProgress(row);
	    		}
	    		else {
	    			mprDAO.saveDesmMprDetailnProgress(row);
	    		}


	    	}

			JSONArray updateRemarkList = JSONArray.fromObject(paramMap.get("updateRemarkList").toString());
	    	for(int i = 0; i < updateRemarkList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateRemarkList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("MPR_SEQ", paramMap.get("MPR_SEQ"));

	    		mprDAO.saveDesmMprDetailnProgressRemark(row);
	    	}

			JSONArray updateProgressNoteList = JSONArray.fromObject(paramMap.get("updateProgressNoteList").toString());
	    	for(int i = 0; i < updateProgressNoteList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateProgressNoteList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("MPR_SEQ", paramMap.get("MPR_SEQ"));
	    		mprDAO.saveDesmMprProgressNote(row);
	    	}

			JSONArray updateMainRemarksList = JSONArray.fromObject(paramMap.get("updateMainRemarksList").toString());
	    	for(int i = 0; i < updateMainRemarksList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateMainRemarksList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("MPR_SEQ", paramMap.get("MPR_SEQ"));
	    		mprDAO.saveDesmMprMainRemarks(row);
	    	}

			JSONArray updateProcureList = JSONArray.fromObject(paramMap.get("updateProcureList").toString());
	    	for(int i = 0; i < updateProcureList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateProcureList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("MPR_SEQ", paramMap.get("MPR_SEQ"));
	    		mprDAO.saveDesmMprProcure(row);
	    	}

	    	for(int i = 0; i < imgTxtList.size(); i++) {
	    		Map<String, Object> row = imgTxtList.get(i);
	    		row.put("SEQ", i);
	    		mprDAO.saveDesmMprImgTxt(row);
	    	}

	        if(paramMap.get("STATUS").equals("Pre-Confirmed")) {
		    	int cnt = this.sendMailDesmMprRequestData(paramMap);
		    	if(cnt < 0) {
		    		resultMap.put("Err", "-4");
		    	}
	        }


    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }
    */

	public int sendMailDesmMprRequestData(Map<String, Object> paramMap) {

		int cnt = 0;


		try {

			Map<String, Object> mailInfo = new HashMap<String, Object>();

			String mailReceiverList = "";

			List<Map<String, Object>> mailContentList = mprDAO.getMailMprRequestMstData(paramMap);
			Map<String, Object> mailContent = mailContentList.get(0);

			/*List<Map<String, Object>> dtlList = materialDAO.getMailRsiDtlData(paramMap);*/
			List<Map<String, Object>> dtlList = new ArrayList<Map<String,Object>>();

			List<Map<String, Object>> listMailReceiver = mprDAO.getMailMprSetupReceiver(paramMap);



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


			cnt = this.sendMailDesmMprRequestDataMailFormat(mailInfo);

		} catch (Exception e) {
			cnt = -2;
			e.printStackTrace();
		}

		return cnt;
	}

	public int sendMailDesmMprRequestDataMailFormat(Map<String, Object> param) {
		int cnt = 0;

		final Map<String, Object> paramInfo = new HashMap<String, Object>();

		Map<String, Object> mailData = (Map<String, Object>) param.get("mailData");  // 메일정보
		List<Map<String, Object>> personList = (List<Map<String, Object>>) param.get("receivePerson");  // 수신자 정보
		List<Map<String, Object>> dtlList = (List<Map<String, Object>>) param.get("dtlList");  // Invoice List
		List<Map<String, Object>> mailList = new ArrayList<Map<String, Object>>();

		try {

			/*
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
			*/

			for(int i = 0; i < personList.size(); i++) {
				Map<String, Object> content = new HashMap<String, Object>();
				Map<String, Object> receiver = personList.get(i);

				content.put("company", mailData.get("SUPPLIER_NAME") == null ? "&nbsp;" : mailData.get("SUPPLIER_NAME").toString());
				content.put("product_name", mailData.get("PRODUCT_NAME") == null ? "&nbsp;" : mailData.get("PRODUCT_NAME").toString());
				content.put("po_no", mailData.get("PO_NO") == null ? "&nbsp;" : mailData.get("PO_NO").toString());
				content.put("po_description", mailData.get("PO_DESCRIPTION") == null ? "&nbsp;" : mailData.get("PO_DESCRIPTION").toString());
				content.put("mpr_no", mailData.get("MPR_NO") == null ? "&nbsp;" : mailData.get("MPR_NO").toString());

//				String mprRound = mailData.get("MPR_ROUND") == null ? "&nbsp;" : (mailData.get("MPR_ROUND").toString().equals("2")) ? "2nd" : "1st";
//				content.put("mpr_round", mprRound);

				content.put("manager_mail", mailData.get("MANAGER_MAIL") == null ? "&nbsp;" : mailData.get("MANAGER_MAIL").toString());
				content.put("last_updated_by", mailData.get("UPDATE_BY_MAIL") == null ? "&nbsp;" : mailData.get("LAST_UPDATED_BY").toString());

				content.put("mpr_date_1", mailData.get("MPR_DATE_1") == null ? "&nbsp;" : mailData.get("MPR_DATE_1").toString());
				content.put("mpr_date_2", mailData.get("MPR_DATE_2") == null ? "&nbsp;" : mailData.get("MPR_DATE_2").toString());
				content.put("mpr_date_3", mailData.get("MPR_DATE_3") == null ? "&nbsp;" : mailData.get("MPR_DATE_3").toString());
				content.put("mpr_date_4", mailData.get("MPR_DATE_4") == null ? "&nbsp;" : mailData.get("MPR_DATE_4").toString());
				content.put("mpr_date_5", mailData.get("MPR_DATE_5") == null ? "&nbsp;" : mailData.get("MPR_DATE_5").toString());
				content.put("mpr_date_6", mailData.get("MPR_DATE_6") == null ? "&nbsp;" : mailData.get("MPR_DATE_6").toString());

				content.put("mpr_status_1", mailData.get("MPR_STATUS_1") == null ? "&nbsp;" : mailData.get("MPR_STATUS_1").toString());
				content.put("mpr_status_2", mailData.get("MPR_STATUS_2") == null ? "&nbsp;" : mailData.get("MPR_STATUS_2").toString());
				content.put("mpr_status_3", mailData.get("MPR_STATUS_3") == null ? "&nbsp;" : mailData.get("MPR_STATUS_3").toString());
				content.put("mpr_status_4", mailData.get("MPR_STATUS_4") == null ? "&nbsp;" : mailData.get("MPR_STATUS_4").toString());
				content.put("mpr_status_5", mailData.get("MPR_STATUS_5") == null ? "&nbsp;" : mailData.get("MPR_STATUS_5").toString());
				content.put("mpr_status_6", mailData.get("MPR_STATUS_6") == null ? "&nbsp;" : mailData.get("MPR_STATUS_6").toString());

				content.put("mpr_round_1", mailData.get("MPR_ROUND_1") == null ? "&nbsp;" : mailData.get("MPR_ROUND_1").toString().equals("2") ? "2nd" : "1st");
				content.put("mpr_round_2", mailData.get("MPR_ROUND_2") == null ? "&nbsp;" : mailData.get("MPR_ROUND_2").toString().equals("2") ? "2nd" : "1st");
				content.put("mpr_round_3", mailData.get("MPR_ROUND_3") == null ? "&nbsp;" : mailData.get("MPR_ROUND_3").toString().equals("2") ? "2nd" : "1st");
				content.put("mpr_round_4", mailData.get("MPR_ROUND_4") == null ? "&nbsp;" : mailData.get("MPR_ROUND_4").toString().equals("2") ? "2nd" : "1st");
				content.put("mpr_round_5", mailData.get("MPR_ROUND_5") == null ? "&nbsp;" : mailData.get("MPR_ROUND_5").toString().equals("2") ? "2nd" : "1st");
				content.put("mpr_round_6", mailData.get("MPR_ROUND_6") == null ? "&nbsp;" : mailData.get("MPR_ROUND_6").toString().equals("2") ? "2nd" : "1st");

				content.put("updateby_mail", mailData.get("UPDATE_BY_MAIL") == null ? "&nbsp;" : mailData.get("UPDATE_BY_MAIL").toString());

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

				if(i == 0) {
					if(!param.get("location").toString().equals("dev")) {
			        	String[] strArr = new String[2];
			        	strArr[0] = "jiwon.youn@doosan.com";
			        	strArr[1] = "juseong.kim@doosan.com";
			        	rowData.put("bcc_addr", strArr);
			          }
			        else {
			        	String[] strArr = new String[1];
			        	strArr[0] = "seunghwan2.jung@doosan.com";
			        	rowData.put("bcc_addr", strArr);
			        }
				}
				/*
				if(param.get("location").toString().equals("dev")) {
					rowData.put("to_addr", "seunghwan2.jung@doosan.com");
					//rowData.put("to_addr", "hanbyul1.lee@doosan.com");
					rowData.put("TO_USER_AD", "HANBYUL1.LEE");
				}
				*/



				rowData.put("title", "");
				rowData.put("data", content);

				rowData.put("USER_AD", param.get("USER_AD"));
				rowData.put("host", param.get("host"));
				rowData.put("port", param.get("port"));
				rowData.put("encoding", param.get("encoding"));
				rowData.put("username", param.get("username"));
				rowData.put("password", param.get("password"));

				String emailTitle = "[DESM MPR] Request : Monthly Progress Report of the month";
				rowData.put("email_title", emailTitle);


				mailList.add(rowData);

			}

			cnt = desmService.addMail("DESM_MPR_STATUS_REQUEST_MAIL", mailList);
			//cnt = desmService.sendFcm("RSI", mailList);

		} catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		cnt = -2;
    		return cnt;
		}

		return cnt;
	}

	@Override
    public List<Map<String, Object>> getDesmMprCheckList(Map<String, Object> paramMap) {
        return mprDAO.getDesmMprCheckList(paramMap);
    }

	@Override
    public List<Map<String, Object>> getDesmMprList(Map<String, Object> paramMap) {

		if(paramMap.get("SUPPLIER_YN").toString().equals("Y")) {
			paramMap.put("SUPPLIER_NAME", "");
		}
		else {
			paramMap.put("SUPPLIER_NO", "");
		}

        return mprDAO.getDesmMprList(paramMap);
    }

	@Override
    public List<Map<String, Object>> getDesmMprData(Map<String, Object> paramMap) {
        return mprDAO.getDesmMprData(paramMap);
    }

	@Override
    public Map<String, Object> getDesmMprDetailProgressData(Map<String, Object> paramMap) {
		Map<String, Object> resultMap = new HashMap<String, Object>();

		List<Map<String, Object>> dataList = new ArrayList<Map<String,Object>>();
		List<Map<String, Object>> checkList = new ArrayList<Map<String,Object>>();
		paramMap.put("STATUS", "Confirmed");
		checkList = mprDAO.getDesmMprSetupCheckDateList(paramMap);
		if(checkList.size() == 0) {
			paramMap.put("colList", new HashMap<String, Object>());
		}
		else {
			if(checkList.get(0).get("START_MONTH") == null || checkList.get(0).get("START_MONTH").toString().equals("")) {
				paramMap.put("colList", new HashMap<String, Object>());
			}
			else
			{
				paramMap.put("colList", mprDAO.getDesmMprSetupColDataList(paramMap));
			}
		}

		resultMap.put("colList", paramMap.get("colList"));

		if(paramMap.get("MPR_SEQ") != null && !paramMap.get("MPR_SEQ").toString().equals("")) {
			checkList = mprDAO.getDesmMprDetailProgressCurrentChekcList(paramMap);
			if(checkList.get(0).get("CHECK_YN").toString().equals("Y")) {
				dataList = mprDAO.getDesmMprDetailProgressCurrentList(paramMap);
				resultMap.put("dataList", dataList);
				return resultMap;
			}
		}

		checkList = mprDAO.getDesmMprDetailProgressLastChekcList(paramMap);
		if(checkList.get(0).get("CHECK_YN").toString().equals("Y")) {
			paramMap.put("MPR_SEQ", checkList.get(0).get("MPR_SEQ"));
			dataList = mprDAO.getDesmMprDetailProgressCurrentList(paramMap);
			resultMap.put("dataList", dataList);
			return resultMap;
		}

		// Setup쪽에 있는 Period는 안가져올 수 있도록 기존 Setup과 같이 쓰는 쿼리 분리 필요.
		//dataList = mprDAO.getDesmMprSetupDataList(paramMap);
		dataList = mprDAO.getDesmMprFirstSetupDataList(paramMap);
		resultMap.put("dataList", dataList);
		return resultMap;
    }

	@Override
    public List<Map<String, Object>> getDesmMprSetupList(Map<String, Object> paramMap) {
		if(paramMap.get("SUPPLIER_YN").toString().equals("Y")) {
			paramMap.put("SUPPLIER", "");
		}
		else {
			paramMap.put("SUPPLIER_NO", "");
		}

        return mprDAO.getDesmMprSetupList(paramMap);
    }

    @Override
    public int saveDesmMprStatus(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {

			JSONArray list = JSONArray.fromObject(paramMap.get("updateList").toString());
	    	for(int i = 0; i < list.size(); i++) {
	    		JSONObject obj = (JSONObject)list.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));

	    		List<Map<String, Object>> statusList = mprDAO.getDesmMprStatus(row);


	    		if(row.get("STATUS").toString().equals("Confirmed") && !statusList.get(0).get("STATUS").toString().equals("Pre-Confirmed")) {
	    			return -1;
	    		}
	    		else if(row.get("STATUS").toString().equals("Returned") && !statusList.get(0).get("STATUS").toString().equals("Pre-Confirmed") && !statusList.get(0).get("STATUS").toString().equals("Confirmed")) {
	    			return -2;
	    		}


	    		mprDAO.saveDesmMprStatus(row);

	    	}

	    	for(int i = 0; i < list.size(); i++) {
	    		JSONObject obj = (JSONObject)list.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("LOGIN_URL", paramMap.get("LOGIN_URL"));

	    		row.put("location", paramMap.get("location"));
	    		row.put("host", paramMap.get("host"));
	    		row.put("port", paramMap.get("port"));
	    		row.put("encoding", paramMap.get("encoding"));
	    		row.put("username", paramMap.get("username"));
	    		row.put("password", paramMap.get("password"));

		    	cnt = this.sendMailDesmMprData(row);
		    	if(cnt < 0) {
		    		return -4;
		    	}
	    	}


    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

	public int sendMailDesmMprData(Map<String, Object> paramMap) {

		int cnt = 0;


		try {

			Map<String, Object> mailInfo = new HashMap<String, Object>();

			String mailReceiverList = "";

			List<Map<String, Object>> mailContentList = mprDAO.getMailMprMstData(paramMap);
			Map<String, Object> mailContent = mailContentList.get(0);

			/*List<Map<String, Object>> dtlList = materialDAO.getMailRsiDtlData(paramMap);*/
			List<Map<String, Object>> dtlList = new ArrayList<Map<String,Object>>();

			List<Map<String, Object>> listMailReceiver = mprDAO.getMailMprSetupReceiver(paramMap);



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

			mailInfo.put("STATUS", mailContent.get("STATUS"));


			cnt = this.sendMailDesmMprDataMailFormat(mailInfo);

		} catch (Exception e) {
			cnt = -2;
			e.printStackTrace();
		}

		return cnt;
	}

	public int sendMailDesmMprDataMailFormat(Map<String, Object> param) {
		int cnt = 0;

		final Map<String, Object> paramInfo = new HashMap<String, Object>();

		Map<String, Object> mailData = (Map<String, Object>) param.get("mailData");  // 메일정보
		List<Map<String, Object>> personList = (List<Map<String, Object>>) param.get("receivePerson");  // 수신자 정보
		List<Map<String, Object>> dtlList = (List<Map<String, Object>>) param.get("dtlList");  // Invoice List
		List<Map<String, Object>> mailList = new ArrayList<Map<String, Object>>();

		try {

			/*
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
			*/

			String mailSubTitle = "● MPR Return Notice";
			if(param.get("STATUS").toString().equals("Confirmed")) {
				mailSubTitle = "● MPR Confirm Notice";
			}

			for(int i = 0; i < personList.size(); i++) {
				Map<String, Object> content = new HashMap<String, Object>();
				Map<String, Object> receiver = personList.get(i);

				content.put("mail_sub_title", mailSubTitle);
				content.put("company", mailData.get("SUPPLIER_NAME") == null ? "&nbsp;" : mailData.get("SUPPLIER_NAME").toString());
				content.put("product_name", mailData.get("PRODUCT_NAME") == null ? "&nbsp;" : mailData.get("PRODUCT_NAME").toString());
				content.put("po_no", mailData.get("PO_NO") == null ? "&nbsp;" : mailData.get("PO_NO").toString());
				content.put("po_description", mailData.get("PO_DESCRIPTION") == null ? "&nbsp;" : mailData.get("PO_DESCRIPTION").toString());
				content.put("mpr_no", mailData.get("MPR_NO") == null ? "&nbsp;" : mailData.get("MPR_NO").toString());

				String mprRound = mailData.get("MPR_ROUND") == null ? "&nbsp;" : (mailData.get("MPR_ROUND").toString().equals("2")) ? "2nd" : "1st";
				content.put("mpr_round", mprRound);

				content.put("manager_mail", mailData.get("MANAGER_MAIL") == null ? "&nbsp;" : mailData.get("MANAGER_MAIL").toString());
				content.put("updateby_mail", mailData.get("UPDATE_BY_MAIL") == null ? "&nbsp;" : mailData.get("UPDATE_BY_MAIL").toString());
				content.put("last_updated_by", mailData.get("UPDATE_BY_MAIL") == null ? "&nbsp;" : mailData.get("LAST_UPDATED_BY").toString());

				content.put("mpr_date", mailData.get("MPR_DATE") == null ? "&nbsp;" : mailData.get("MPR_DATE").toString());
				content.put("mpr_status", mailData.get("STATUS") == null ? "&nbsp;" : mailData.get("STATUS").toString());
				content.put("reject_comments", mailData.get("REJECT_COMMENTS") == null ? "&nbsp;" : mailData.get("REJECT_COMMENTS").toString());


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

				if(i == 0) {
					if(!param.get("location").toString().equals("dev")) {
			        	String[] strArr = new String[2];
			        	strArr[0] = "jiwon.youn@doosan.com";
			        	strArr[1] = "juseong.kim@doosan.com";
			        	rowData.put("bcc_addr", strArr);
			          }
			        else {
			        	String[] strArr = new String[1];
			        	strArr[0] = "seunghwan2.jung@doosan.com";
			        	rowData.put("bcc_addr", strArr);
			        }
				}
				/*
				if(param.get("location").toString().equals("dev")) {
					rowData.put("to_addr", "seunghwan2.jung@doosan.com");
					//rowData.put("to_addr", "hanbyul1.lee@doosan.com");
					rowData.put("TO_USER_AD", "HANBYUL1.LEE");
				}
				*/


				rowData.put("title", "");
				rowData.put("data", content);

				rowData.put("USER_AD", param.get("USER_AD"));
				rowData.put("host", param.get("host"));
				rowData.put("port", param.get("port"));
				rowData.put("encoding", param.get("encoding"));
				rowData.put("username", param.get("username"));
				rowData.put("password", param.get("password"));

				String emailTitle = "[DESM MPR] " + content.get("mpr_status").toString() + " : Monthly Progress Report of the month";
				rowData.put("email_title", emailTitle);


				mailList.add(rowData);

			}

			cnt = desmService.addMail("DESM_MPR_STATUS_CHANGE_MAIL", mailList);
			//cnt = desmService.sendFcm("RSI", mailList);

		} catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		cnt = -2;
    		return cnt;
		}

		return cnt;
	}

    @Override
    public List getSupplier(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();

    	try {
        	list = mprDAO.getSupplier(paramMap);

        	HashMap<String, Object> map = new HashMap<String, Object>();


        	for (Object el : list) {
        		HashMap<String, String> row = (HashMap)el;

        		map = new HashMap<String, Object>();
        		map.put("label",
            			row.get("SEGMENT1").toString() + "&nbsp;&nbsp;" +
            			row.get("VENDOR_NAME").toString()
            	);

        		map.put("value",
            			row.get("SEGMENT1").toString() + "|" +
            			row.get("VENDOR_NAME").toString()
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
    public List<Map<String, Object>> getDesmSupplierSetupPoList(Map<String, Object> paramMap) {
        return mprDAO.getDesmSupplierSetupPoList(paramMap);
    }

	@Override
    public List<Map<String, Object>> getDesmDlgSupplierList(Map<String, Object> paramMap) {
        return mprDAO.getSupplier(paramMap);
    }

	@Override
    public List<Map<String, Object>> getDesmDlgMprSupplierList(Map<String, Object> paramMap) {
        return mprDAO.getMprSupplier(paramMap);
    }

    @Override
    public int saveDesmManualPoCreationData(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
    		System.out.println(paramMap);
    		cnt = mprDAO.getDesmManualPoCount(paramMap);
    		if (cnt > 0) {
    			return -3;
    		}
    		mprDAO.saveDesmManualPoCreationData(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

    @Override
    public int saveDesmSupplierSetupData(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
    		paramMap.put("USER_NAME", paramMap.get("SUPPLIER_NAME"));
    		paramMap.put("DEPT_NAME", paramMap.get("SUPPLIER_NAME"));
    		paramMap.put("MAIL", paramMap.get("MAIL"));



    		if(paramMap.get("P_USER_AD") == null || paramMap.get("P_USER_AD").toString().equals("")) {
        		List<Map<String, Object>> checkList = mprDAO.getDesmSupplierSetupCheckList(paramMap);
        		if(checkList.size() > 0) {
        			return -3;
        		}

    			paramMap.put("P_USER_AD", "D" + paramMap.get("SUPPLIER_NO").toString());
    		}

    		Map<String, Object> idcsParamMap = new HashMap<String, Object>();
    		idcsParamMap.put("userName", paramMap.get("P_USER_AD").toString());
    		idcsParamMap.put("name", paramMap.get("SUPPLIER_NAME").toString());
    		idcsParamMap.put("email", paramMap.get("MAIL").toString());
    		if(paramMap.get("IDCS_ID") == null || paramMap.get("IDCS_ID").toString().equals("") || paramMap.get("IDCS_ID").toString().equals("N")) {
    			paramMap.put("IDCS_ID", "");
    		}
    		idcsParamMap.put("idcs_id", paramMap.get("IDCS_ID").toString());


    		if(paramMap.get("IDCS_ID") == null || paramMap.get("IDCS_ID").toString().equals("") || paramMap.get("IDCS_ID").toString().equals("N")) {

    			JSONObject user = (JSONObject)idcsService.searchIDCSUser(idcsParamMap);
    			Map<String, Object> userMap = new ObjectMapper().readValue(user.toString(), Map.class);

    			if(userMap.get("success") != null &&  ((Map<String, Object>)userMap.get("success")).size() > 0) {
    				Map<String, Object> userResultMap = (Map<String, Object>)userMap.get("success");
    				if(!((List<Map<String, Object>>)userResultMap.get("emails")).get(0).get("value").toString().equals(paramMap.get("MAIL").toString())) {
    					return -11;
    				}
    				else {
    					paramMap.put("IDCS_C", "Y");
    					paramMap.put("IDCS_U", "Y");
    					idcsParamMap.put("idcs_id", userResultMap.get("id"));
    					paramMap.put("IDCS_YN", userResultMap.get("id"));
    					String federated_yn = (boolean)((Map<String, Object>)userResultMap.get("urn:ietf:params:scim:schemas:oracle:idcs:extension:user:User")).get("isFederatedUser") == true ? "Y" : "N";
    					paramMap.put("FEDERATED_YN", federated_yn);
    					cnt = saveDesmSupplierSetupDataSuccess(paramMap);
    				}

    			}
    			else {
    				JSONObject result = (JSONObject)idcsService.createIDCSUser(idcsParamMap);
    				if(result.containsKey("success")){
    					Map<String, Object> resultMap = new ObjectMapper().readValue(result.toString(), Map.class);
        				paramMap.put("IDCS_C", "Y");
        				if(resultMap.get("success") != null) {
        					paramMap.put("IDCS_YN", resultMap.get("success"));
        					cnt = saveDesmSupplierSetupDataSuccess(paramMap);
        				}
        				else if(resultMap.get("error").toString().equals("OVERLAP")){
        					return -10;
        				}
        			}else{
        				throw new Exception(result.getString("error"));
        			}
    			}
    		}
    		else if(paramMap.get("FEDERATED_YN").toString().equals("N") && !paramMap.get("OLD_MAIL").toString().equals(paramMap.get("MAIL").toString())){
    			JSONObject result = (JSONObject)idcsService.updateIDCSUser(idcsParamMap);
    			if(result.containsKey("success")){
	    			paramMap.put("IDCS_U", "Y");
	    			cnt = saveDesmSupplierSetupDataSuccess(paramMap);
    			}else{
    				throw new Exception(result.getString("error"));
    			}
			}else{
				cnt = saveDesmSupplierSetupDataSuccess(paramMap);
			}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

    public int saveDesmSupplierSetupDataSuccess(Map<String, Object> paramMap) throws Exception {
    	int cnt = 0;
    	try {
    		cnt = adminService.updateUserPwNull(paramMap);
	    	cnt = adminService.insertUser(paramMap);
	    	cnt = adminService.insertUserPermission(paramMap);

	    	int updateCnt = mprDAO.updateDesmSupplierSetupData(paramMap);
	    	paramMap.put("INSERT_YN", "N");
	    	if(updateCnt == 0) {
	    		cnt = mprDAO.insertDesmSupplierSetupData(paramMap);
	    		paramMap.put("INSERT_YN", "Y");
	    	}

	    	cnt = this.sendMailDesmMprSupplierData(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
    	return cnt;
    }

	public int sendMailDesmMprSupplierData(Map<String, Object> paramMap) {

		int cnt = 0;


		try {

			Map<String, Object> mailInfo = new HashMap<String, Object>();

			String mailReceiverList = "";

			List<Map<String, Object>> mailContentList = mprDAO.getMailMprSupplierMstData(paramMap);
			Map<String, Object> mailContent = mailContentList.get(0);

			/*List<Map<String, Object>> dtlList = materialDAO.getMailRsiDtlData(paramMap);*/
			List<Map<String, Object>> dtlList = new ArrayList<Map<String,Object>>();

			List<Map<String, Object>> listMailReceiver = mprDAO.getMailMprSupplierReceiver(paramMap);



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
			mailInfo.put("INSERT_YN", paramMap.get("INSERT_YN"));



			cnt = this.sendMailDesmMprSupplierDataMailFormat(mailInfo);

		} catch (Exception e) {
			cnt = -2;
			e.printStackTrace();
		}

		return cnt;
	}

	public int sendMailDesmMprSupplierDataMailFormat(Map<String, Object> param) {
		int cnt = 0;

		final Map<String, Object> paramInfo = new HashMap<String, Object>();

		Map<String, Object> mailData = (Map<String, Object>) param.get("mailData");  // 메일정보
		List<Map<String, Object>> personList = (List<Map<String, Object>>) param.get("receivePerson");  // 수신자 정보
		List<Map<String, Object>> dtlList = (List<Map<String, Object>>) param.get("dtlList");  // Invoice List
		List<Map<String, Object>> mailList = new ArrayList<Map<String, Object>>();

		try {

			/*
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
			*/

			String emailTitle = "[DESM MPR] Your company account has been created.";
			String mailSubTitle = "● Account creation notification";
			String mailSubContents = "Your company account for the DESM system has been created as shown below.";
			if(param.get("INSERT_YN").toString().equals("N")) {
				emailTitle = "[DESM MPR] Your company account data has been updated.";
				mailSubTitle = "● Account data update notification";
				mailSubContents = "Your company account data for the DESM system has been updated as shown below.";
			}

			for(int i = 0; i < personList.size(); i++) {
				Map<String, Object> content = new HashMap<String, Object>();
				Map<String, Object> receiver = personList.get(i);

				content.put("mail_sub_title", mailSubTitle);
				content.put("mail_sub_contents", mailSubContents);
				content.put("company", mailData.get("USER_NAME") == null ? "&nbsp;" : mailData.get("USER_NAME").toString());
				content.put("account_id", mailData.get("USER_AD") == null ? "&nbsp;" : mailData.get("USER_AD").toString());
				content.put("e_mail", mailData.get("MAIL") == null ? "&nbsp;" : mailData.get("MAIL").toString());
				content.put("user_password", mailData.get("PW") == null ? "&nbsp;" : mailData.get("PW").toString());
				content.put("updateby_mail", mailData.get("UPDATE_BY_MAIL") == null ? "&nbsp;" : mailData.get("UPDATE_BY_MAIL").toString());
				content.put("list_data", dtlList);
				content.put("login_url", param.get("LOGIN_URL").toString());


				// 메일본문에 메일 수신자 임시 추가
				content.put("mailReceiverList", mailData.get("mailReceiverList") == null ? "&nbsp;" : mailData.get("mailReceiverList").toString());


				Map<String, Object> rowData = new HashMap<String, Object>();
				rowData.put("from_addr", "ews_desm@doosan.com");
				rowData.put("from_nm", "DESM Alarm Service");

				rowData.put("to_addr", (String) receiver.get("EMAIL"));
				rowData.put("TO_USER_AD", receiver.get("USER_AD"));

				if(i == 0) {
					if(!param.get("location").toString().equals("dev")) {
			        	String[] strArr = new String[2];
			        	strArr[0] = "jiwon.youn@doosan.com";
			        	strArr[1] = "juseong.kim@doosan.com";
			        	rowData.put("bcc_addr", strArr);
			          }
			        else {
			        	String[] strArr = new String[1];
			        	strArr[0] = "seunghwan2.jung@doosan.com";
			        	rowData.put("bcc_addr", strArr);
			        }
				}

				/*
				if(param.get("location").toString().equals("dev")) {
					rowData.put("to_addr", "seunghwan2.jung@doosan.com");
					//rowData.put("to_addr", "hanbyul1.lee@doosan.com");
					rowData.put("TO_USER_AD", "HANBYUL1.LEE");
				}
				*/


				rowData.put("title", "");
				rowData.put("data", content);

				rowData.put("USER_AD", param.get("USER_AD"));
				rowData.put("host", param.get("host"));
				rowData.put("port", param.get("port"));
				rowData.put("encoding", param.get("encoding"));
				rowData.put("username", param.get("username"));
				rowData.put("password", param.get("password"));
				rowData.put("email_title", emailTitle);
				//rowData.put("rsi_name", mailData.get("RSI_NAME") == null ? "&nbsp;" : mailData.get("RSI_NAME").toString());
				//rowData.put("RSI_NO", mailData.get("RSI_NO") == null ? "&nbsp;" : mailData.get("RSI_NO").toString());
				//rowData.put("status", mailData.get("STATUS") == null ? "&nbsp;" : mailData.get("STATUS").toString());

				mailList.add(rowData);

			}

			cnt = desmService.addMail("DESM_MPR_SULLIER_SAVE_MAIL", mailList);
			//cnt = desmService.sendFcm("RSI", mailList);

		} catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		cnt = -2;
    		return cnt;
		}

		return cnt;
	}

	@Override
    public List<Map<String, Object>> getDesmSupplierSetupList(Map<String, Object> paramMap) {
        return mprDAO.getDesmSupplierSetupList(paramMap);
    }

    @Override
    public int deleteDesmSupplierSetupData(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;
    	Map<String, Object> row = new HashMap<String, Object>();

    	try {
        	JSONArray listParam = JSONArray.fromObject(paramMap.get("deleteList").toString());
        	for(int i = 0; i < listParam.size(); i++) {
        		JSONObject obj = (JSONObject)listParam.get(i);
        		row.put("P_USER_AD", obj.get("P_USER_AD"));
        		row.put("USER_AD", paramMap.get("USER_AD"));

        		adminService.deleteUser(row);
        		mprDAO.deleteDesmSupplierSetupData(row); // 여기서 DESM_SUPPLIER, DESM_USER 테이블에 데이터 모두 삭제함.
        		// TODO: IDCS 사용자 삭제 로직 추가하거나 빼거나 해야할 듯 함..

        	}

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

	@Override
    public List<Map<String, Object>> getDesmMprSetupSupplierList(Map<String, Object> paramMap) {
        return mprDAO.getDesmMprSetupSupplierList(paramMap);
    }

	@Override
    public List<Map<String, Object>> getDesmMprSetupUserList(Map<String, Object> paramMap) {
        return mprDAO.getDesmMprSetupUserList(paramMap);
    }

	@Override
    public List<Map<String, Object>> getDesmMprSetupMail(Map<String, Object> paramMap) {
        return mprDAO.getDesmMprSetupMail(paramMap);
    }

    @Override
    public int deleteDesmMprSetupMail(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {

			JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
	    	for(int i = 0; i < deleteList.size(); i++) {
	    		JSONObject obj = (JSONObject)deleteList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("TYPE_CODE", paramMap.get("TYPE_CODE"));
	    		mprDAO.deleteDesmMprSetupMail(row);
	    	}

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

	@Override
    public List<Map<String, Object>> getSupplierAuth(Map<String, Object> paramMap) {
        return mprDAO.getSupplierAuth(paramMap);
    }

	@Override
    public List<Map<String, Object>> getDesmMprProgressNote(Map<String, Object> paramMap) {
        return mprDAO.getDesmMprProgressNote(paramMap);
    }

    @Override
    public int deleteDesmMprProgressNote(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {

			JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
	    	for(int i = 0; i < deleteList.size(); i++) {
	    		JSONObject obj = (JSONObject)deleteList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		mprDAO.deleteDesmMprProgressNote(row);
	    	}

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

	@Override
    public List<Map<String, Object>> getDesmMprRemarks(Map<String, Object> paramMap) {
        return mprDAO.getDesmMprRemarks(paramMap);
    }

    @Override
    public int deleteDesmMprRemarks(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {

			JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
	    	for(int i = 0; i < deleteList.size(); i++) {
	    		JSONObject obj = (JSONObject)deleteList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		mprDAO.deleteDesmMprRemarks(row);
	    	}

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

	@Override
    public List<Map<String, Object>> getDesmMprProcure(Map<String, Object> paramMap) {
        return mprDAO.getDesmMprProcure(paramMap);
    }

	@Override
    public int deleteDesmProcure(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {

			JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
	    	for(int i = 0; i < deleteList.size(); i++) {
	    		JSONObject obj = (JSONObject)deleteList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		mprDAO.deleteDesmProcure(row);
	    	}

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

	@Override
    public Map<String, Object> getDesmMprPayments(Map<String, Object> paramMap) {
		desmDAO.setSessionLang(paramMap);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("payments", mprDAO.getDesmMprPayments(paramMap));
		resultMap.put("remarks", mprDAO.getDesmMprPoRemarks(paramMap));
        return resultMap;
    }

	@Override
    public int deleteDesmMprList(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {

			JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
	    	for(int i = 0; i < updateList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));

	    		List<Map<String, Object>> checkList = mprDAO.getDesmMprStatus(row);
	    		if(!checkList.get(0).get("STATUS").toString().equals("Incomplete") && !checkList.get(0).get("STATUS").toString().equals("Returned")) {
	    			return -1;
	    		}

	    		mprDAO.deleteDesmMprList(row);
	    	}



    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

	@Override
    public Map<String, Object> deleteDesmMprSetupList(Map<String, Object> paramMap) throws Exception {

		Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {

			JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
	    	for(int i = 0; i < deleteList.size(); i++) {
	    		JSONObject obj = (JSONObject)deleteList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		List<Map<String, Object>> checkList = mprDAO.getDesmMprSaveList(row);
	    		if(checkList.size() > 0) {
	    			resultMap.put("PO_NO", row.get("PO_NO"));
	    			return resultMap;
	    		}

	    		mprDAO.deleteDesmMprSetupList(row);
	    	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

    @Override
    public List getDesmMprPo(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();

    	try {
        	idsmDAO.updateSetLanguage(null);

        	if(paramMap.get("supplier_yn").toString().equals("Y")) {
    			paramMap.put("SUPPLIER_NO", paramMap.get("keyword3"));
        	}

        	list = mprDAO.getDesmMprPo(paramMap);

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
        		String PROMISED_DATE = row.get("PROMISED_DATE") == null ? "" : row.get("PROMISED_DATE").toString();
        		String MPR_SAVE_YN = row.get("MPR_SAVE_YN") == null ? "" : row.get("MPR_SAVE_YN").toString();

        		map.put("value",
            			row.get("PO_NO").toString() + "|" +
            			row.get("PO_DESCRIPTION").toString() + "|" +
            			row.get("SUPPLIER_NUMBER").toString() + "|" +
            			row.get("SUPPLIER_NAME").toString() + "|" +
            			PROMISED_DATE + "|" +
            			PROJECT_CODE + "|" +
            			PROJECT_NAME + "|" +
            			MPR_SAVE_YN

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
    public List getDesmMprPoList(Map<String, Object> paramMap) {
    	if(paramMap.get("supplier_yn").toString().equals("Y")) {
			paramMap.put("SUPPLIER_NO", paramMap.get("keyword3"));
    	}
        return mprDAO.getDesmMprPo(paramMap);
    }

    @Override
    public List getDesmMprNoPo(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();

    	try {
        	idsmDAO.updateSetLanguage(null);

        	if(paramMap.get("supplier_yn").toString().equals("Y")) {
    			paramMap.put("SUPPLIER_NO", paramMap.get("keyword3"));
        	}

        	list = mprDAO.getDesmMprNoPo(paramMap);

        	HashMap<String, Object> map = new HashMap<String, Object>();


        	for (Object el : list) {
        		HashMap<String, String> row = (HashMap)el;

        		String PROJECT_CODE 	= row.get("PROJECT_CODE") 	== null ? "" : row.get("PROJECT_CODE").toString();
        		String PROJECT_NAME 	= row.get("PROJECT_NAME") 	== null ? "" : row.get("PROJECT_NAME").toString();
        		String PRODUCT_NAME 	= row.get("PRODUCT_NAME") 	== null ? "" : row.get("PRODUCT_NAME").toString();
        		String MPR_NO 			= row.get("MPR_NO") 		== null ? "" : row.get("MPR_NO").toString();
        		String START_MONTH 		= row.get("START_MONTH") 	== null ? "" : row.get("START_MONTH").toString();
        		String END_MONTH 		= row.get("END_MONTH") 		== null ? "" : row.get("END_MONTH").toString();

        		String PO_NO 			= row.get("PO_NO") == null ? "" : row.get("PO_NO").toString();
        		String PO_DESCRIPTION 	= row.get("PO_DESCRIPTION") == null ? "" : row.get("PO_DESCRIPTION").toString();

        		map = new HashMap<String, Object>();
        		map.put("label",
        				PO_NO + "&nbsp;&nbsp;" +
        				PO_DESCRIPTION + "&nbsp;&nbsp;" +
            			MPR_NO
            	);

        		String SUPPLIER_NUMBER 	= row.get("SUPPLIER_NUMBER") 	== null ? "" : row.get("SUPPLIER_NUMBER").toString();
        		String SUPPLIER_NAME 	= row.get("SUPPLIER_NAME") 		== null ? "" : row.get("SUPPLIER_NAME").toString();
        		String PROMISED_DATE 	= row.get("PROMISED_DATE") 		== null ? "" : row.get("PROMISED_DATE").toString();
        		String MPR_DATE 		= row.get("MPR_DATE") 			== null ? "" : row.get("MPR_DATE").toString();
        		String MPR_SUBMISSION 	= row.get("MPR_SUBMISSION") 	== null ? "" : String.valueOf(row.get("MPR_SUBMISSION"));

        		map.put("value",
        				PO_NO + "|" +
						PO_DESCRIPTION + "|" +
						SUPPLIER_NUMBER + "|" +
						SUPPLIER_NAME + "|" +
						PROMISED_DATE + "|" +
            			PROJECT_CODE + "|" +
            			PROJECT_NAME + "|" +
            			PRODUCT_NAME + "|" +
            			MPR_NO + "|" +
            			MPR_DATE + "|" +
            			MPR_SUBMISSION + "|" +
            			START_MONTH + "|" +
            			END_MONTH
            	);
            	retList.add(map);
        	}
    	}
    	catch (Exception e) {
    		System.out.println("getDesmMprNoPo !!!!" + e.toString());
		}

        return retList;
    }

    @Override
    public List getDesmMprProgressSummary(Map<String, Object> paramMap) {

        return mprDAO.getDesmMprProgressSummary(paramMap);
    }

    @Override
    public List getDesmMprNoPoList(Map<String, Object> paramMap) {
    	if(paramMap.get("supplier_yn").toString().equals("Y")) {
			paramMap.put("SUPPLIER_NO", paramMap.get("keyword3"));
    	}
        return mprDAO.getDesmMprNoPo(paramMap);
    }

    @Override
    public int saveDesmMprSupplierFileGrpCd(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
    		mprDAO.saveDesmMprSupplierFileGrpCd(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

    @Override
    public int saveDesmMprSetupStatus(Map<String, Object> paramMap) throws Exception {
    	int cnt = 0;

    	try {

			JSONArray list = JSONArray.fromObject(paramMap.get("updateList").toString());
	    	for(int i = 0; i < list.size(); i++) {
	    		JSONObject obj = (JSONObject)list.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));

	    		List<Map<String, Object>> statusList = mprDAO.getDesmMprSetupStatus(row);


	    		if(row.get("STATUS").toString().equals("Confirmed") && !statusList.get(0).get("STATUS").toString().equals("Pre-Confirmed")) {
	    			return -1;
	    		}
	    		else if(row.get("STATUS").toString().equals("Returned") && !statusList.get(0).get("STATUS").toString().equals("Pre-Confirmed") && !statusList.get(0).get("STATUS").toString().equals("Confirmed")) {
	    			return -2;
	    		}

	    		mprDAO.saveDesmMprSetupStatus(row);
	    	}

	    	for(int i = 0; i < list.size(); i++) {
	    		JSONObject obj = (JSONObject)list.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));

	    		row.put("LOGIN_URL", paramMap.get("LOGIN_URL"));

	    		row.put("location", paramMap.get("location"));
	    		row.put("host", paramMap.get("host"));
	    		row.put("port", paramMap.get("port"));
	    		row.put("encoding", paramMap.get("encoding"));
	    		row.put("username", paramMap.get("username"));
	    		row.put("password", paramMap.get("password"));

	        	if(!row.get("STATUS").toString().equals("Incomplete")) {
			    	cnt = this.sendMailDesmMprSetupStatus(row);
			    	if(cnt < 0) {
			    		return -4;
			    	}
		    	}
	    	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

	public int sendMailDesmMprSetupStatus(Map<String, Object> paramMap) {

		int cnt = 0;


		try {
			//paramMap.put("TYPE_CODE", "S");
			Map<String, Object> mailInfo = new HashMap<String, Object>();

			String mailReceiverList = "";

			List<Map<String, Object>> mailContentList = mprDAO.getMailMprSetupMstData(paramMap);
			if(mailContentList == null || mailContentList.size() < 1) {
				return cnt;
			}
			Map<String, Object> mailContent = mailContentList.get(0);

			/*
			List<Map<String, Object>> dtlList = materialDAO.getMailRsiDtlData(paramMap);*/

			List<Map<String, Object>> dtlList = new ArrayList<Map<String,Object>>();

			List<Map<String, Object>> listMailReceiver = mprDAO.getMailMprSetupReceiver(paramMap);



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


			cnt = this.sendMailDesmMprSetupStatusMailFormat(mailInfo);

		} catch (Exception e) {
			cnt = -4;
			e.printStackTrace();
		}

		return cnt;
	}


	public int sendMailDesmMprSetupStatusMailFormat(Map<String, Object> param) {
		int cnt = 0;

		final Map<String, Object> paramInfo = new HashMap<String, Object>();

		Map<String, Object> mailData = (Map<String, Object>) param.get("mailData");  // 메일정보
		List<Map<String, Object>> personList = (List<Map<String, Object>>) param.get("receivePerson");  // 수신자 정보
		List<Map<String, Object>> dtlList = (List<Map<String, Object>>) param.get("dtlList");  // Invoice List
		List<Map<String, Object>> mailList = new ArrayList<Map<String, Object>>();

		try {

			/*
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
			*/


			for(int i = 0; i < personList.size(); i++) {
				Map<String, Object> content = new HashMap<String, Object>();
				Map<String, Object> receiver = personList.get(i);

				content.put("company", mailData.get("SUPPLIER_NAME") == null ? "&nbsp;" : mailData.get("SUPPLIER_NAME").toString());
				content.put("product_name", mailData.get("PRODUCT_NAME") == null ? "&nbsp;" : mailData.get("PRODUCT_NAME").toString());
				content.put("po_no", mailData.get("PO_NO") == null ? "&nbsp;" : mailData.get("PO_NO").toString());
				content.put("po_description", mailData.get("PO_DESCRIPTION") == null ? "&nbsp;" : mailData.get("PO_DESCRIPTION").toString());
				content.put("mpr_no", mailData.get("MPR_NO") == null ? "&nbsp;" : mailData.get("MPR_NO").toString());
				content.put("status", mailData.get("STATUS") == null ? "&nbsp;" : mailData.get("STATUS").toString());
				content.put("remarks", mailData.get("REJECT_COMMENTS") == null ? "&nbsp;" : mailData.get("REJECT_COMMENTS").toString());
				content.put("updateby_mail", mailData.get("UPDATE_BY_MAIL") == null ? "&nbsp;" : mailData.get("UPDATE_BY_MAIL").toString());
				content.put("last_updated_by", mailData.get("UPDATE_BY_MAIL") == null ? "&nbsp;" : mailData.get("LAST_UPDATED_BY").toString());

				String mailSubContents = "New MPR(Monthly Progress Report) created as shown below.";
				if(content.get("status").toString().equals("Confirmed")) {
					mailSubContents = "New MPR(Monthly Progress Report) Confirmed as shown below.";
				}
				content.put("mail_sub_contents", mailSubContents);

				content.put("list_data", dtlList);
				content.put("login_url", param.get("LOGIN_URL").toString());
				// 메일본문에 메일 수신자 임시 추가
				content.put("mailReceiverList", mailData.get("mailReceiverList") == null ? "&nbsp;" : mailData.get("mailReceiverList").toString());


				Map<String, Object> rowData = new HashMap<String, Object>();
				rowData.put("from_addr", "ews_desm@doosan.com");
				rowData.put("from_nm", "DESM Alarm Service");

				rowData.put("to_addr", (String) receiver.get("EMAIL"));
				rowData.put("TO_USER_AD", receiver.get("USER_AD"));

				if(i == 0) {
					if(!param.get("location").toString().equals("dev")) {
			        	String[] strArr = new String[2];
			        	strArr[0] = "jiwon.youn@doosan.com";
			        	strArr[1] = "juseong.kim@doosan.com";
			        	rowData.put("bcc_addr", strArr);
			          }
			        else {
			        	String[] strArr = new String[1];
			        	strArr[0] = "seunghwan2.jung@doosan.com";
			        	rowData.put("bcc_addr", strArr);
			        }
				}
				/*
				if(param.get("location").toString().equals("dev")) {
					rowData.put("to_addr", "seunghwan2.jung@doosan.com");
					//rowData.put("to_addr", "hanbyul1.lee@doosan.com");
					rowData.put("TO_USER_AD", "HANBYUL1.LEE");
				}
				*/



				rowData.put("title", "");
				rowData.put("data", content);
				String emailTitle = "[DESM MPR] " + content.get("status").toString() + " - New MPR Setup : " + content.get("company").toString();





				rowData.put("USER_AD", param.get("USER_AD"));
				rowData.put("host", param.get("host"));
				rowData.put("port", param.get("port"));
				rowData.put("encoding", param.get("encoding"));
				rowData.put("username", param.get("username"));
				rowData.put("password", param.get("password"));
				rowData.put("email_title", emailTitle);


				mailList.add(rowData);

			}

			cnt = desmService.addMail("DESM_MPR_SET_STS_CHANGE_MAIL", mailList);

		} catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		cnt = -2;
    		return cnt;
		}

		return cnt;
	}

	@Override
    public List<Map<String, Object>> getDesmMprDesign(Map<String, Object> paramMap) {
        return mprDAO.getDesmMprDesign(paramMap);
    }

	@Override
    public int deleteDesmDesign(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {

			JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
	    	for(int i = 0; i < deleteList.size(); i++) {
	    		JSONObject obj = (JSONObject)deleteList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		mprDAO.deleteDesmDesign(row);
	    	}

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

	@Override
    public List<Map<String, Object>> getDesmMprQuality(Map<String, Object> paramMap) {
        return mprDAO.getDesmMprQuality(paramMap);
    }

	@Override
    public int deleteDesmQuality(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {

			JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
	    	for(int i = 0; i < deleteList.size(); i++) {
	    		JSONObject obj = (JSONObject)deleteList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		mprDAO.deleteDesmQuality(row);
	    	}

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

	@Override
    public int saveDesmShippingMark(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
    		if(paramMap.get("HEADER_SEQ") == null || paramMap.get("HEADER_SEQ").toString().equals("")) {
    			List<Map<String, Object>> seqList = mprDAO.getDesmShippingMarkHeaderSeq(paramMap);
    			paramMap.put("HEADER_SEQ", seqList.get(0).get("SEQ"));
    		}

    		mprDAO.saveDesmShippingMarkHeader(paramMap);

			JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
	    	for(int i = 0; i < updateList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("HEADER_SEQ", paramMap.get("HEADER_SEQ"));
	    		mprDAO.saveDesmShippingMarkDetail(row);
	    	}

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

	@Override
    public List<Map<String, Object>> getDesmShippingMarkList(Map<String, Object> paramMap) {

		if(paramMap.get("SUPPLIER_YN").toString().equals("Y")) {
			paramMap.put("SUPPLIER_NAME", "");
		}
		else {
			paramMap.put("SUPPLIER_NO", "");
		}

        return mprDAO.getDesmShippingMarkList(paramMap);
    }

	@Override
    public int deleteDesmShippingMarkList(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {

			JSONArray deleteList = JSONArray.fromObject(paramMap.get("updateList").toString());
	    	for(int i = 0; i < deleteList.size(); i++) {
	    		JSONObject obj = (JSONObject)deleteList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		mprDAO.deleteDesmShippingMarkList(row);
	    	}

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

	@Override
    public int saveDesmShippingMarkReportList(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {

    		mprDAO.deleteDesmShippingMarkReportList(paramMap);
			JSONArray list = JSONArray.fromObject(paramMap.get("list").toString());
	    	for(int i = 0; i < list.size(); i++) {
	    		JSONObject obj = (JSONObject)list.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		mprDAO.saveDesmShippingMarkReportList(row);
	    	}

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

	@Override
    public List<Map<String, Object>> getDesmShippingMarkDetailList(Map<String, Object> paramMap) {
        return mprDAO.getDesmShippingMarkDetailList(paramMap);
    }

	@Override
    public int saveDesmSupplierSetupMemo(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {

			JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
	    	for(int i = 0; i < updateList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		mprDAO.saveDesmSupplierSetupMemo(row);
	    	}

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

	@Override
    public int deleteDesmShippingMarkDetail(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {

			JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
	    	for(int i = 0; i < deleteList.size(); i++) {
	    		JSONObject obj = (JSONObject)deleteList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);


	    		mprDAO.deleteDesmShippingMarkDetail(row);
	    	}

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

	@Override
    public List<Map<String, Object>> getDesmMprProcurePrev(Map<String, Object> paramMap) {
        return mprDAO.getDesmMprProcurePrev(paramMap);
    }

	@Override
    public List<Map<String, Object>> getDesmMprDesignPrev(Map<String, Object> paramMap) {
        return mprDAO.getDesmMprDesignPrev(paramMap);
    }

	@Override
    public List<Map<String, Object>> getDesmMprRemarkPrev(Map<String, Object> paramMap) {
        return mprDAO.getDesmMprRemarkPrev(paramMap);
    }

	@Override
    public List<Map<String, Object>> getDesmMprQualityPrev(Map<String, Object> paramMap) {
        return mprDAO.getDesmMprQualityPrev(paramMap);
    }

	@Override
    public List<Map<String, Object>> getRole(Map<String, Object> paramMap) {
        return mprDAO.getRole(paramMap);
    }

    @Override
    public List getMprTeam(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();

    	try {

        	list = mprDAO.getMprTeam(paramMap);

        	HashMap<String, Object> map = new HashMap<String, Object>();


        	for (Object el : list) {
        		HashMap<String, String> row = (HashMap)el;

        		map = new HashMap<String, Object>();
        		map.put("label",
            			row.get("ZORG_NM").toString()
            	);
        		map.put("value",
            			row.get("ZORG_ID").toString() + "|" +
            			row.get("ZORG_NM").toString()
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
    public Map<String, Object> saveDesmMprSetupMailData(Map<String, Object> paramMap) throws Exception {

    	Map<String, Object> resultMap = new HashMap<String, Object>();

    	try {

    		if(paramMap.get("MPR_NO") == null || paramMap.get("MPR_NO").toString().equals("")) {
    			List<Map<String, Object>> mprNoList = mprDAO.getMprNoList(paramMap);
    			paramMap.put("MPR_NO", mprNoList.get(0).get("MPR_NO"));
    		}

			JSONArray updateSupplierMailList = JSONArray.fromObject(paramMap.get("updateSupplierMailList").toString());
	    	for(int i = 0; i < updateSupplierMailList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateSupplierMailList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("TYPE_CODE", "S");
	    		row.put("MPR_NO", paramMap.get("MPR_NO"));
	    		mprDAO.saveDesmMprSetupMail(row);
	    	}

			JSONArray updateUserMailList = JSONArray.fromObject(paramMap.get("updateUserMailList").toString());
	    	for(int i = 0; i < updateUserMailList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateUserMailList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("TYPE_CODE", "D");
	    		row.put("MPR_NO", paramMap.get("MPR_NO"));
	    		mprDAO.saveDesmMprSetupMail(row);
	    	}

	    	mprDAO.saveDesmMprSetupProductName(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
    }

	@Override
    public List<Map<String, Object>> getDesmMprManufacture(Map<String, Object> paramMap) {
        return mprDAO.getDesmMprManufacture(paramMap);
    }

	@Override
    public int deleteDesmManufacture(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {

			JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
	    	for(int i = 0; i < deleteList.size(); i++) {
	    		JSONObject obj = (JSONObject)deleteList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);

	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		mprDAO.deleteDesmManufacture(row);
	    	}

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

	@Override
    public List<Map<String, Object>> getDesmMprManufacturePrev(Map<String, Object> paramMap) {
        return mprDAO.getDesmMprManufacturePrev(paramMap);
    }

}

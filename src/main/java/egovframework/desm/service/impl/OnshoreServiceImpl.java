package egovframework.desm.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.desm.service.DesmService;
import egovframework.desm.service.IdsmFileService;
import egovframework.desm.service.OnshoreService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service("onshoreService")
public class OnshoreServiceImpl extends EgovAbstractServiceImpl implements OnshoreService {

	@Resource(name = "onshoreDAO")
	private OnshoreDAO onshoreDAO;

	@Resource(name = "desmService")
	private DesmService desmService;

	@Resource(name = "idsmFileService")
	private IdsmFileService idsmFileService;
	
	@Override
	public List<Map<String, Object>> getDesmContractList(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
        return onshoreDAO.getDesmContractList(paramMap);
	}

	@Override
	public Map<String, Object> getDesmContractInfo(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
    	Map<String, Object> resultMap = new HashMap<String, Object>();
    	resultMap.put("headerInfo", onshoreDAO.getDesmContractHeader(paramMap));
    	resultMap.put("lineList", onshoreDAO.getDesmContractLineList(paramMap));
    	resultMap.put("contactList", onshoreDAO.getDesmContractContactList(paramMap));
    	resultMap.put("paymentList", onshoreDAO.getDesmContractPaymentList(paramMap));
        return resultMap;
	}

	@Override
	public Map<String, Object> saveDesmContractCreate(Map<String, Object> paramMap) throws Exception {
    	Map<String, Object> resultMap = new HashMap<String, Object>();
    	int cnt = 0;
    	try {
    		if(paramMap.get("CONTRACT_HEADER_ID") == null || paramMap.get("CONTRACT_HEADER_ID").toString().equals("")) {
    			List<Map<String, Object>> list = onshoreDAO.getDesmContractHeaderId(paramMap);
    			paramMap.put("CONTRACT_HEADER_ID", list.get(0).get("CONTRACT_HEADER_ID"));
    		}
    		resultMap.put("CONTRACT_HEADER_ID", paramMap.get("CONTRACT_HEADER_ID"));
			resultMap.put("STATUS", paramMap.get("STATUS"));

			JSONArray contactList = JSONArray.fromObject(paramMap.get("contactList").toString());
	    	for(int i = 0; i < contactList.size(); i++) {
	    		JSONObject obj = (JSONObject)contactList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("CONTRACT_HEADER_ID", paramMap.get("CONTRACT_HEADER_ID"));
	    		
	    		cnt = onshoreDAO.saveDesmContractContact(row);
	    	}

			JSONArray infoList = JSONArray.fromObject(paramMap.get("infoList").toString());
	    	for(int i = 0; i < infoList.size(); i++) {
	    		JSONObject obj = (JSONObject)infoList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("CONTRACT_HEADER_ID", paramMap.get("CONTRACT_HEADER_ID"));

	    		cnt = onshoreDAO.saveDesmContractPayment(row);
	    	}

			JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
	    	for(int i = 0; i < updateList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("CONTRACT_HEADER_ID", paramMap.get("CONTRACT_HEADER_ID"));

	    		if("true".equals(paramMap.get("IS_REVISION").toString())) {
	    			onshoreDAO.saveDesmContractLineHistory(row);
	    		}
	    		cnt = onshoreDAO.saveDesmContractLine(row);
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

    		if("true".equals(paramMap.get("IS_REVISION").toString())) {
    			onshoreDAO.saveDesmContractHeaderHistory(paramMap);
    		}
    		
	    	cnt = onshoreDAO.saveDesmContractHeader(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
	}

	@Override
	public Map<String, Object> saveDesmContractInfomation(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
    	Map<String, Object> resultMap = new HashMap<String, Object>();
    	int cnt = 0;
    	try {
			JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
	    	for(int i = 0; i < updateList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		
	    		cnt = onshoreDAO.saveDesmContractPayment(row);
	    	}
	    	
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
	}

	@Override
    public int saveDesmContractReject(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
    		cnt = onshoreDAO.saveDesmContractReject(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

    @Override
    public int saveDesmContractFileGrpCd(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
    		onshoreDAO.saveDesmContractFileGrpCd(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

	@Override
	public int deleteDesmContract(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
    	int cnt = 0;

    	try {
    		cnt = onshoreDAO.deleteDesmContractPayment(paramMap);
    		cnt = onshoreDAO.deleteDesmContractContact(paramMap);
    		cnt = onshoreDAO.deleteDesmContractLine(paramMap);
    		cnt = onshoreDAO.deleteDesmContractHeader(paramMap);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
	}

	@Override
	public int sendMailDesmContract(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
    	int cnt = 0;
    	try {

			cnt = this.sendMailDesmContractData(paramMap);

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

	public int sendMailDesmContractData(Map<String, Object> paramMap) {

		int cnt = 0;


		try {

			Map<String, Object> mailInfo = new HashMap<String, Object>();

			String mailReceiverList = "";

			List<Map<String, Object>> mailContentList = onshoreDAO.getDesmContractList(paramMap);
			Map<String, Object> mailContent = mailContentList.get(0);

			List<Map<String, Object>> dtlList = onshoreDAO.getDesmContractContactList(paramMap);


			List<Map<String, Object>> listMailReceiver = onshoreDAO.getMailContractReceiver(paramMap);



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


			cnt = this.sendMailDesmContractDataMailFormat(mailInfo);

		} catch (Exception e) {
			cnt = -2;
			e.printStackTrace();
		}



		return cnt;
	}
	
	
	public int sendMailDesmContractDataMailFormat(Map<String, Object> param) {
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
//	public Map<String, Object> getIdsmSetupDlgContractHeaderSearch(Map<String, Object> paramMap) {
	public List<Map<String, Object>> getIdsmSetupDlgContractHeaderSearch(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
//    	Map<String, Object> resultMap = new HashMap<String, Object>();
//    	resultMap.put("headerInfo", onshoreDAO.getDesmContractHeader(paramMap));
//    	resultMap.put("lineList", onshoreDAO.getDesmContractLineList(paramMap));
//        return resultMap;
        return onshoreDAO.getIdsmSetupDlgContractSearch(paramMap);
	}

	@Override
	public List<Map<String, Object>> getIdsmSetupDlgContractLineSearch(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
        return onshoreDAO.getDesmContractLineList(paramMap);
	}

	@Override
	public List<Map<String, Object>> getDesmOnshoreOrderList(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
        return onshoreDAO.getDesmOnshoreOrderHeaderList(paramMap);
	}

	@Override
	public Map<String, Object> getDesmOnshoreOrderInfo(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
    	Map<String, Object> resultMap = new HashMap<String, Object>();
    	resultMap.put("contractInfo", onshoreDAO.getDesmContractHeader(paramMap));
    	resultMap.put("headerInfo", onshoreDAO.getDesmOnshoreOrderHeaderInfo(paramMap));
    	resultMap.put("lineList", onshoreDAO.getDesmOnshoreOrderLineList(paramMap));
        return resultMap;
	}

	@Override
	public Map<String, Object> saveDesmOnshoreOrderCreate(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
    	Map<String, Object> resultMap = new HashMap<String, Object>();
    	int cnt = 0;
    	try {
    		if(paramMap.get("ORDER_HEADER_ID") == null || paramMap.get("ORDER_HEADER_ID").toString().equals("")) {
    			List<Map<String, Object>> list = onshoreDAO.getDesmOnshoreOrderHeaderId(paramMap);
    			paramMap.put("ORDER_HEADER_ID", list.get(0).get("ORDER_HEADER_ID"));
    		}
    		resultMap.put("ORDER_HEADER_ID", paramMap.get("ORDER_HEADER_ID"));
			resultMap.put("STATUS", paramMap.get("STATUS"));

			JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
	    	for(int i = 0; i < updateList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("ORDER_HEADER_ID", paramMap.get("ORDER_HEADER_ID"));

	    		cnt = onshoreDAO.saveDesmOnshoreOrderLine(row);
	    	}
	    	
	    	cnt = onshoreDAO.saveDesmOnshoreOrderHeader(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
	}

	@Override
	public Map<String, Object> getDesmOnshoreReceivedInfo(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
    	Map<String, Object> resultMap = new HashMap<String, Object>();
    	resultMap.put("headerInfo", onshoreDAO.getDesmOnshoreReceivedHeaderList(paramMap));
    	resultMap.put("lineList", onshoreDAO.getDesmOnshoreReceivedLineList(paramMap));
        return resultMap;
	}

	@Override
	public List<Map<String, Object>> getDesmOnshoreReceivedList(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
        return onshoreDAO.getDesmOnshoreReceivedHeaderList(paramMap);
	}

	@Override
	public Map<String, Object> saveDesmOnshoreReceivedCreate(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
    	Map<String, Object> resultMap = new HashMap<String, Object>();
    	int cnt = 0;
    	try {
    		if(paramMap.get("RECEIVED_HEADER_ID") == null || paramMap.get("RECEIVED_HEADER_ID").toString().equals("")) {
    			List<Map<String, Object>> list = onshoreDAO.getDesmOnshoreReceivedHeaderId(paramMap);
    			paramMap.put("RECEIVED_HEADER_ID", list.get(0).get("RECEIVED_HEADER_ID"));
    		}
    		resultMap.put("RECEIVED_HEADER_ID", paramMap.get("RECEIVED_HEADER_ID"));
			resultMap.put("STATUS", paramMap.get("STATUS"));

			JSONArray updateList = JSONArray.fromObject(paramMap.get("updateList").toString());
	    	for(int i = 0; i < updateList.size(); i++) {
	    		JSONObject obj = (JSONObject)updateList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD"));
	    		row.put("RECEIVED_HEADER_ID", paramMap.get("RECEIVED_HEADER_ID"));

	    		cnt = onshoreDAO.saveDesmOnshoreReceivedLine(row);
	    	}
	    	
	    	cnt = onshoreDAO.saveDesmOnshoreReceivedHeader(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return resultMap;
	}

}

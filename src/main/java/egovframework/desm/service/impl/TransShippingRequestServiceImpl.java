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

import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.desm.cmmn.MailSender;
import egovframework.desm.service.TransShippingRequestService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import freemarker.template.TemplateException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service("transShippingRequestService")
public class TransShippingRequestServiceImpl extends EgovAbstractServiceImpl implements TransShippingRequestService {

	private static final Logger LOGGER = LoggerFactory.getLogger(TransShippingRequestServiceImpl.class);

	
	@Resource(name = "transShippingRequestDAO")
	private TransShippingRequestDAO transShippingRequestDAO;

    
    @Override
    public List getTransShippingRequest(Map<String, Object> paramMap) {
    	
		transShippingRequestDAO.updateShippingRequestSetLanguage(null);
		return transShippingRequestDAO.getTransShippingRequest(paramMap);   
    }  
    
    @Override
    public List getTransShippingRequestVendor(Map<String, Object> paramMap) {
    	
    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
    	
    	try {
    		transShippingRequestDAO.updateShippingRequestSetLanguage(null);
    		List<Map<String, Object>> list = transShippingRequestDAO.getTransShippingRequestVendor(paramMap);
        	
        	
        	HashMap<String, Object> map = new HashMap<String, Object>();
        	
        	
        	for (Object el : list) {
        		HashMap<String, String> row = (HashMap)el;
        		
        		map = new HashMap<String, Object>();
        		map.put("label", 
            			row.get("VENDOR_CODE").toString() + "&nbsp;&nbsp;&nbsp;&nbsp;" + 
            			row.get("VENDOR_NAME").toString() + "&nbsp;&nbsp;&nbsp;&nbsp;" +
            			row.get("USR_NM").toString() + "&nbsp;&nbsp;&nbsp;&nbsp;" +
            			row.get("PHONE_NO").toString()
            	);
        		map.put("value", 
            			row.get("VENDOR_CODE").toString() + "|" +
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
    public List getTransShippingRequestVendorPopUp(Map<String, Object> paramMap) {
    	
		transShippingRequestDAO.updateShippingRequestSetLanguage(null);
		return transShippingRequestDAO.getTransShippingRequestVendorPopUp(paramMap);
    }	    
    
    @Override
    public List getTransShippingRequestDept(Map<String, Object> paramMap) {
    	
    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
    	
    	try {
    		transShippingRequestDAO.updateShippingRequestSetLanguage(null);
    		List<Map<String, Object>> list = transShippingRequestDAO.getTransShippingRequestDept(paramMap);
        	
        	
        	HashMap<String, Object> map = new HashMap<String, Object>();
        	
        	
        	for (Object el : list) {
        		HashMap<String, String> row = (HashMap)el;
        		
        		map = new HashMap<String, Object>();
        		map.put("label", 
            			row.get("DEPT_CODE").toString() + "&nbsp;&nbsp;&nbsp;&nbsp;" + 
            			row.get("DEPT_NAME").toString() + "&nbsp;&nbsp;&nbsp;&nbsp;" +
            			row.get("EMP_NAME").toString() + "&nbsp;&nbsp;&nbsp;&nbsp;" +
            			row.get("PHONE_NO").toString()
            	);
        		map.put("value", 
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
    public List getTransShippingRequestDeptPopUp(Map<String, Object> paramMap) {
    	
		transShippingRequestDAO.updateShippingRequestSetLanguage(null);
		return transShippingRequestDAO.getTransShippingRequestDeptPopUp(paramMap);    	
    	 
    }    
    
    @Override
    public int saveTransShippingRequest(Map<String, Object> paramMap) throws Exception {
    	
    	int cnt = 0;
    	try {
    		
    		if(paramMap.get("REQ_MASTER_ID") == null || paramMap.get("REQ_MASTER_ID").toString().equals("")) {
    			List<Map<String, Object>> seqList = transShippingRequestDAO.getTransShippingRequestSeq(null);
    			paramMap.put("REQ_MASTER_ID", seqList.get(0).get("SHIPPING_M_SEQ").toString());
    			paramMap.put("SHIPPING_REQ_FLAG", "");
    		}
    		
    		cnt = transShippingRequestDAO.saveTransShippingRequestMst(paramMap);
    		
    		JSONArray updatePackingList = JSONArray.fromObject(paramMap.get("updatePackingList").toString());
    		if(updatePackingList.size() > 0) {
    			cnt = transShippingRequestDAO.deleteTransShippingRequestPackingList(paramMap);
    	    	for(int i = 0; i < updatePackingList.size(); i++) {	    			
    	    		JSONObject obj = (JSONObject)updatePackingList.get(i);
    	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
    	    		row.put("REQ_MASTER_ID", paramMap.get("REQ_MASTER_ID").toString());
    	    		row.put("USER_AD", paramMap.get("USER_AD").toString());
    	    		
    	    		cnt = transShippingRequestDAO.insertTransShippingRequestPackingList(row);
    	    	}      			
    			
    		}
    		
    		
    		
			JSONArray deleteMailList = JSONArray.fromObject(paramMap.get("deleteMailList").toString());
	    	for(int i = 0; i < deleteMailList.size(); i++) {	    			
	    		JSONObject obj = (JSONObject)deleteMailList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("REQ_MASTER_ID", paramMap.get("REQ_MASTER_ID").toString());
	    		
	    		cnt = transShippingRequestDAO.deleteTransShippingRequestMailList(row);
	    	}     		
    		
			JSONArray mailList = JSONArray.fromObject(paramMap.get("mailList").toString());
	    	for(int i = 0; i < mailList.size(); i++) {	    			
	    		JSONObject obj = (JSONObject)mailList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD").toString());
	    		row.put("REQ_MASTER_ID", paramMap.get("REQ_MASTER_ID").toString());
	    		
	    		cnt = transShippingRequestDAO.saveTransShippingRequestMailList(row);
	    	}    		
    		
					
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }  
    
    @Override
    public List getTransShippingRequestMailEmp(Map<String, Object> paramMap) {
    	
    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
    	
    	try {
    		transShippingRequestDAO.updateShippingRequestSetLanguage(null);
    		List<Map<String, Object>> list = transShippingRequestDAO.getTransShippingRequestMailEmp(paramMap);
        	
        	
        	HashMap<String, Object> map = new HashMap<String, Object>();
        	
        	
        	for (Object el : list) {
        		HashMap<String, String> row = (HashMap)el;
        		
        		map = new HashMap<String, Object>();
        		map.put("label", 
            			row.get("EMP_NAME").toString() + "&nbsp;&nbsp;&nbsp;&nbsp;" + 
            			row.get("DEPT_NAME").toString() + "&nbsp;&nbsp;&nbsp;&nbsp;" +
            			row.get("EMP_AD").toString() + "&nbsp;&nbsp;&nbsp;&nbsp;" +
            			row.get("TRANS_COMPANY_YN").toString()
            	);
        		map.put("value", 
            			row.get("EMP_NAME").toString() + "|" +
            			row.get("DEPT_NAME").toString() + "|" +
            			row.get("EMP_AD").toString() + "|" +
            			row.get("TRANS_COMPANY_YN").toString()
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
    public List getTransShippingRequestDlgEditMailList(Map<String, Object> paramMap) {
    	
		transShippingRequestDAO.updateShippingRequestSetLanguage(null);
		return transShippingRequestDAO.getTransShippingRequestDlgEditMailList(paramMap);   
    } 
    
    @Override
    public List getTransShippingRequestDlgEditPackingDetailList(Map<String, Object> paramMap) {
    	
		transShippingRequestDAO.updateShippingRequestSetLanguage(null);
		return transShippingRequestDAO.getTransShippingRequestDlgEditPackingDetailList(paramMap);   
    }     
    
    @Override
    public int deleteTransShippingRequest(Map<String, Object> paramMap) throws Exception {
    	
    	int cnt = 0;
    	try {
    		transShippingRequestDAO.updateShippingRequestSetLanguage(null);
    		List<Map<String, Object>> voyageNoList = transShippingRequestDAO.getTransShippingRequestVoyageNo(paramMap);
    		if(voyageNoList.size() > 0) {
    			return -1;
    		}
    		  		
			if(!paramMap.get("STATUS").equals("임시저장")) {
				paramMap.put("isDelete", "true");
				cnt = this.sendMailShippingReqData(paramMap);
				
				if(cnt < 0) {
					return cnt;
				}
			}    
			
			cnt = transShippingRequestDAO.deleteTransShippingRequestDlgEditStrComment(paramMap);
			cnt = transShippingRequestDAO.deleteTransShippingRequestDlgEditStrDetail(paramMap);
			cnt = transShippingRequestDAO.deleteTransShippingRequestDlgEditStrAtt(paramMap);
			cnt = transShippingRequestDAO.deleteTransShippingRequestDlgEditStrMst(paramMap);
			
			cnt = transShippingRequestDAO.deleteTransShippingRequestDlgEditMailList(paramMap);
			cnt = transShippingRequestDAO.deleteTransShippingRequestPackingList(paramMap);
			cnt = transShippingRequestDAO.deleteTransShippingRequestDlgEditMst(paramMap);
			cnt = transShippingRequestDAO.deleteTransShippingRequestDlgEditInvoiceDisconnected(paramMap);
					
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }    

    @Override
    public int deleteTransShippingRequestFOB(Map<String, Object> paramMap) throws Exception {
    	
    	int cnt = 0;
    	try {
    		transShippingRequestDAO.updateShippingRequestSetLanguage(null);
    		List<Map<String, Object>> voyageNoList = transShippingRequestDAO.getTransShippingRequestVoyageNo(paramMap);
    		if(voyageNoList.size() > 0) {
    			return -1;
    		}
    		  		
//			if(!paramMap.get("STATUS").equals("임시저장")) {
//				paramMap.put("isDelete", "true");
//				cnt = this.sendMailShippingReqData(paramMap);
//				
//				if(cnt < 0) {
//					return cnt;
//				}
//			}    
			
			cnt = transShippingRequestDAO.deleteTransShippingRequestDlgEditStrComment(paramMap);
			cnt = transShippingRequestDAO.deleteTransShippingRequestDlgEditStrDetail(paramMap);
			cnt = transShippingRequestDAO.deleteTransShippingRequestDlgEditStrAtt(paramMap);
			cnt = transShippingRequestDAO.deleteTransShippingRequestDlgEditStrMst(paramMap);
			
			cnt = transShippingRequestDAO.deleteTransShippingRequestDlgEditMailList(paramMap);
			cnt = transShippingRequestDAO.deleteTransShippingRequestPackingList(paramMap);
			cnt = transShippingRequestDAO.deleteTransShippingRequestDlgEditMst(paramMap);
			cnt = transShippingRequestDAO.deleteTransShippingRequestDlgEditInvoiceDisconnected(paramMap);
					
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }    
    
	public int sendMailShippingReqData(Map<String, Object> paramMap) {
		transShippingRequestDAO.updateShippingRequestSetLanguage(null);
		int cnt = 0;				

		int revision_num = Integer.parseInt(paramMap.get("REVISION_NUM").toString());
		
		double sumShippingVolume = 0;
		double sumGrossWeightDiv = 0;
		double sumNetWeight = 0;
		double sumGrossWeight = 0;
		String revenueTon = null;
		
		// Mailing Service에 호출하는 Header Argument
		Map<String, Object> mailInfo = new HashMap<String, Object>();
		Map<String, Object> mailContent = new HashMap<String, Object>();
		
		// 메일 수신자 임시 추가
		String mailReceiverList = "";
		
		try {
			
			List<Map<String, Object>> reqDetail = new ArrayList<Map<String,Object>>();
			
			JSONArray packingList = JSONArray.fromObject(paramMap.get("packingList").toString());
	    	for(int i = 0; i < packingList.size(); i++) {	    			
	    		JSONObject obj = (JSONObject)packingList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		
	    		reqDetail.add(row);
	    	} 			
			
			List<Map<String, Object>> receiverMailList = transShippingRequestDAO.getTransShippingRequestReceiverMailList(paramMap);
			
			
			// mailData -> mailContent
			if(paramMap.get("INVOICE_NO") == null || paramMap.get("INVOICE_NO").equals("") || paramMap.get("INVOICE_NO").equals("null")) {
				List<Map<String, Object>> mailContentList = transShippingRequestDAO.getTransShippingRequestMailContentSr(paramMap);
				mailContent = mailContentList.get(0);
			}
			else {
				List<Map<String, Object>> mailContentList = transShippingRequestDAO.getTransShippingRequestMailContentSrInv(paramMap);
				
				if(mailContentList.size() == 0) {
					mailContentList = transShippingRequestDAO.getTransShippingRequestMailContentSr(paramMap);
					
					if(mailContentList.size() > 0) {
						mailContent = mailContentList.get(0);
					}
					
				}
				else {
					mailContent = mailContentList.get(0);
				}

				mailContent.put("TITLE", paramMap.get("TITLE"));
				mailContent.put("CONTENT", paramMap.get("CONTENT"));
			}
			
			if(mailContent.get("SUM_SHIPPING_VOLUME") != null) sumShippingVolume = Double.parseDouble(mailContent.get("SUM_SHIPPING_VOLUME").toString());
			if(mailContent.get("SUM_GROSS_WEIGHT_DIV") != null) sumGrossWeightDiv = Double.parseDouble(mailContent.get("SUM_GROSS_WEIGHT_DIV").toString());
			if (sumShippingVolume > sumGrossWeightDiv) revenueTon = this.formatSeperatedByComma(sumShippingVolume);
				else revenueTon = this.formatSeperatedByComma(sumGrossWeightDiv);
			if(mailContent.get("SUM_NET_WEIGHT") != null) sumNetWeight = Double.parseDouble(mailContent.get("SUM_NET_WEIGHT").toString());
			if(mailContent.get("SUM_GROSS_WEIGHT") != null) sumGrossWeight = Double.parseDouble(mailContent.get("SUM_GROSS_WEIGHT").toString());
			
			mailContent.put("SUM_SHIPPING_VOLUME", this.formatSeperatedByComma(sumShippingVolume));  //	Volume 합계
			mailContent.put("SUM_NET_WEIGHT", this.formatSeperatedByComma(sumNetWeight));  //Net Weight 합계	
			mailContent.put("SUM_GROSS_WEIGHT", this.formatSeperatedByComma(sumGrossWeight));  //Gross Weight 합계	
			mailContent.put("REVENUE_TON", revenueTon); //Revenue Ton 합계(Gross Weight 과 (Volume /1000 ) 중에 큰값을 보여준다)
			mailContent.put("CONTENTS01", paramMap.get("PROJECT_ID")+" / "+ paramMap.get("INVOICE_NO")+" / "+ paramMap.get("DESCRIPTION")+" / "+ paramMap.get("VENDOR_NAME") ); 
			
			if((paramMap.get("isDelete") != null) && (paramMap.get("isDelete").toString().equals("true"))) mailContent.put("STATE", "[출하요청][삭제]");
			else if((paramMap.get("isReject") != null) && (paramMap.get("isReject").toString().equals("true"))) mailContent.put("STATE", "[출하요청][반려]");
			else if(revision_num != 0) mailContent.put("STATE", "[출하요청][변경]");
			else if((revision_num == 0) && (paramMap.get("STATUS").toString().equals("출하승인"))) mailContent.put("STATE", "[출하승인]");
			else mailContent.put("STATE", "[출하요청]");
			
			mailContent.put("SENDER", paramMap.get("SENDER"));
			mailContent.put("SENDER_EMAIL", paramMap.get("SENDER_EMAIL"));
			
			// email 수신자 본문 추가(EMAIL)
			for (Map<String, Object> receiver : receiverMailList) {
				mailReceiverList += receiver.get("EMAIL").toString();
				mailReceiverList += "; ";
			}
			mailContent.put("mailReceiverList", mailReceiverList);
			
			mailInfo.put("mailData", mailContent);
			mailInfo.put("recivePerson", receiverMailList);
			mailInfo.put("reqDetail", reqDetail);
			mailInfo.put("LOGIN_URL", paramMap.get("LOGIN_URL").toString());
			mailInfo.put("USER_AD", paramMap.get("USER_AD").toString());
			mailInfo.put("location", paramMap.get("location"));
			mailInfo.put("host", paramMap.get("host"));
			mailInfo.put("port", paramMap.get("port"));
			mailInfo.put("encoding", paramMap.get("encoding"));
			mailInfo.put("username", paramMap.get("username"));
			mailInfo.put("password", paramMap.get("password"));

			
			cnt = this.sendMailShippingReq(mailInfo);
			
		} catch (Exception e) {
			cnt = -2;
			e.printStackTrace();
		}
		return cnt;
	}  
	
	public static String formatSeperatedByComma(double val) {
        NumberFormat format = NumberFormat.getNumberInstance();
        return format.format(val);
    }
	
	public int sendMailShippingReq(Map<String, Object> param) {
		int cnt = 0;
		
		Map<String, Object> mailData = (Map<String, Object>) param.get("mailData");  // 메일정보
		List<Map<String, Object>> personList = (List<Map<String, Object>>) param.get("recivePerson");  // 수신자 정보
	
		
		List<Map<String, Object>> mailList = new ArrayList<Map<String, Object>>();

		try {
			for (final Map<String, Object> receiver : personList) { 
				Map<String, Object> content = new HashMap<String, Object>(); 
	
					
					content.put("title", mailData.get("TITLE") == null ? "&nbsp;" : mailData.get("TITLE").toString());
					content.put("content", mailData.get("CONTENT") == null ? "&nbsp;" : mailData.get("CONTENT").toString());
					content.put("state", mailData.get("STATE") == null ? "&nbsp;" : mailData.get("STATE").toString());
					content.put("invoice_no", mailData.get("INVOICE_NO") == null ? "&nbsp;" : mailData.get("INVOICE_NO").toString());
					content.put("description", mailData.get("DESCRIPTION") == null ? "&nbsp;" : mailData.get("DESCRIPTION").toString());
					content.put("suppliers", mailData.get("SUPPLIERS") == null ? "&nbsp;" : mailData.get("SUPPLIERS").toString());
					content.put("contact_points", mailData.get("CONTACT_POINTS") == null ? "&nbsp;" : mailData.get("CONTACT_POINTS").toString());
					content.put("pkg", mailData.get("PKG") == null ? "&nbsp;" : mailData.get("PKG").toString());
					content.put("sum_net_weight", mailData.get("SUM_NET_WEIGHT") == null ? "&nbsp;" : mailData.get("SUM_NET_WEIGHT").toString());			
					content.put("sum_gross_weight", mailData.get("SUM_GROSS_WEIGHT") == null ? "&nbsp;" : mailData.get("SUM_GROSS_WEIGHT").toString());		
					content.put("sum_shipping_volume", mailData.get("SUM_SHIPPING_VOLUME") == null ? "&nbsp;" : mailData.get("SUM_SHIPPING_VOLUME").toString());
					content.put("shop_out_dates", mailData.get("SHOP_OUT_DATES") == null ? "&nbsp;" : mailData.get("SHOP_OUT_DATES").toString());
					content.put("delivery_terms", mailData.get("DELIVERY_TERMS") == null ? "&nbsp;" : mailData.get("DELIVERY_TERMS").toString()); // 구매인도조건
					content.put("danger_flag", mailData.get("DANGER_FLAG") == null ? "&nbsp;" : mailData.get("DANGER_FLAG").toString());
					content.put("attribute1", mailData.get("ATTRIBUTE1") == null ? "&nbsp;" : mailData.get("ATTRIBUTE1").toString());
					content.put("login_url", param.get("LOGIN_URL").toString());
					
					content.put("sender", mailData.get("SENDER") == null ? "&nbsp;" : mailData.get("SENDER").toString());
					content.put("senderEmail", mailData.get("SENDER_EMAIL") == null ? "&nbsp;" : mailData.get("SENDER_EMAIL").toString());
					
					content.put("mailReceiverList", mailData.get("mailReceiverList") == null ? "&nbsp;" : mailData.get("mailReceiverList").toString());
					
					
					Map<String, Object> rowData = new HashMap<String, Object>();
					rowData.put("from_addr", "ews_desm@doosan.com");
					rowData.put("from_nm", "DESM Alarm Service");
					
					rowData.put("to_addr", (String) receiver.get("EMAIL"));
					if(param.get("location").toString().equals("dev")) {
						//rowData.put("to_addr", "seunghwan2.jung@doosan.com");
						rowData.put("to_addr", "hanbyul1.lee@doosan.com");
					}
					
					
					
					rowData.put("email_title", content.get("title").toString());
					rowData.put("title", "");
					rowData.put("data", content);
					rowData.put("USER_AD", param.get("USER_AD"));
					rowData.put("host", param.get("host"));
					rowData.put("port", param.get("port"));
					rowData.put("encoding", param.get("encoding"));
					rowData.put("username", param.get("username"));
					rowData.put("password", param.get("password"));
					
					mailList.add(rowData);
	
			}
			
		} catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		cnt = -2;
		}		
		
		cnt = this.addMail("DESM_TRANS_REQ_MAIL", mailList);
		return cnt;
	}
	
	public int addMail(String mailKey, List<Map<String, Object>> mailList) {
		int cnt = 0;
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("MAIL_SET_ID", mailKey);
		
		List<Map<String, Object>> mailDetailList = transShippingRequestDAO.getTransShippingRequestMailByMailId(paramMap);
		
		Map<String, Object> mailDetail = mailDetailList.get(0);
		

		String useYn = (String) mailDetail.get("USE_YN");
		if("N".equals(useYn)) {
			return -2;
		}

		try {

			String mail_tit = mailDetail.get("MAIL_SET_NM").toString();
			for(Map<String, Object> row : mailList){
				if(row.get("email_title") != null) {
					String emailTitle = (String)row.get("email_title");
					String title = (String)row.get("title");
					
					mail_tit = mail_tit.replace("${email_title}", emailTitle);
					mail_tit = mail_tit.replace("${title}", title);
					
					
					if(row.get("logistics_type") != null && !row.get("logistics_type").toString().equals(""))
					{
						String logistics_type = (String)row.get("logistics_type");
						mail_tit = mail_tit.replace("${logistics_type}", logistics_type);
					}
					
					

				}
				row.put("mail_id"		, UUID.randomUUID().toString());
				row.put("mail_set_id"	, mailKey);
				row.put("mail_tit"		, mail_tit);
				row.put("to_nm"			, row.get("to_nm")); 	//수신자 이름
				row.put("to_addr"		, row.get("to_addr")); 	//수신자 주소
				row.put("from_nm"		, row.get("from_nm"));	//송신자 이름
				row.put("from_addr"		, row.get("from_addr"));//송신자 주소
				row.put("USER_AD"		, row.get("USER_AD"));//송신자 주소
				

				row.put("mail_cont"	, this.mailGenerate(mailKey, row.get("data")));
	
				//DB Insert
				transShippingRequestDAO.insertEsamail(row);
				
			}
			
			String sendClass = (String)mailDetail.get("SND_CLS");
			//실시간 전송, 배치일 경우 스케쥴러에 의해 전송
			if("R".equals(sendClass)) {  
				this.realTimeTransfer(mailList);
			}
		
		} catch (Exception e) {
			cnt = -2;
		}
	
		return cnt;
	}
	
	private void realTimeTransfer(List<Map<String, Object>> mailList) {
		for(Map<String, Object> row : mailList){
			send(row);
		}
	}	
	
	private void send(Map<String, Object> mail) {
		
		Map<String, Object> mailParam = new HashMap<String, Object>();  
		
		
		mailParam = ((List<Map<String, Object>>)transShippingRequestDAO.getTransShippingRequestMailById(mail)).get(0);
		MailSender mailSender = new MailSender(mail);
		try{
			mailSender.sendMail(mail);
			mailParam.put("snd_yn", "Y");
		} catch(Exception e) {
			mailParam.put("snd_yn", "N");
			e.printStackTrace();
		} finally {
			transShippingRequestDAO.updateTransShippingRequestMailSendComplete(mailParam);
		}
		
	}	
	
	public String mailGenerate(String mailKey, Object data) throws TemplateException, IOException{
		 
		//템플릿 아이디 값을 가지고 컨텐츠 내용 조회
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("MAIL_SET_ID", mailKey);
		Map<String, Object> template = ((List<Map<String, Object>>)transShippingRequestDAO.getTransShippingRequestMailByMailId(param)).get(0);
		String content = (String)template.get("TMP_CONT"); 
		
		return this.generate(mailKey,content,data);
	}
	
	public String generate(String appId, String content, Object data) throws TemplateException, IOException{
		StringWriter writer = new StringWriter();
		String replacedContent = replaceSpecialChars(content);
		freemarker.template.Template t = new freemarker.template.Template(appId, new StringReader(replacedContent), null);
		t.process(data, writer);

	
		String result = writer.toString();
		if (LOGGER.isErrorEnabled()) LOGGER.error("result : " + result);
		return result;
	}
	
	private String replaceSpecialChars(String str) {
		if(str == null)
		return null;

		String returnStr = str;
		returnStr = returnStr.replaceAll("<BR>", "\n");
		returnStr = returnStr.replaceAll("&amp;", "&");
		returnStr = returnStr.replaceAll("&gt;", ">");
		returnStr = returnStr.replaceAll("&lt;", "<");
		returnStr = returnStr.replaceAll("&quot;", "\"");
		returnStr = returnStr.replaceAll("&nbsp;", " ");

		return returnStr;
	}
	
    @Override
    public List getTransShippingRequestDlgAttList(Map<String, Object> paramMap) {
		
		return transShippingRequestDAO.getTransShippingRequestDlgAttList(paramMap);   
    }  
    
    @Override
    public int deleteTransShippingRequestDlgAttList(Map<String, Object> paramMap) throws Exception {
    	
    	int cnt = 0;
    	try {
			
			cnt = transShippingRequestDAO.deleteTransShippingRequestDlgAttList(paramMap);
					
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }
    
    @Override
    public List getTransShippingRequestFileCheckGrp(Map<String, Object> paramMap) {
		
		return transShippingRequestDAO.getTransShippingRequestFileCheckGrp(paramMap);   
    } 
    
    @Override
    public List getTransShippingRequestFileCheckId(Map<String, Object> paramMap) {
		
		return transShippingRequestDAO.getTransShippingRequestFileCheckId(paramMap);   
    }  
    
    @Override
    public int saveTransShippingRequestDlgAttList(Map<String, Object> paramMap) throws Exception {
    	
    	int cnt = 0;
    	try {
			
			cnt = transShippingRequestDAO.saveTransShippingRequestDlgAttList(paramMap);
					
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }
    
    @Override
    public int saveTransShippingRequestFileGrpCd(Map<String, Object> paramMap) throws Exception {
    	
    	int cnt = 0;
    	try {
			
			cnt = transShippingRequestDAO.saveTransShippingRequestFileGrpCd(paramMap);
					
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    } 
    
    @Override
    public int completeTransShippingRequest(Map<String, Object> paramMap) throws Exception {    	
    	int cnt = 0;
    	int strategicMasterId = 0;
    	try {
    		transShippingRequestDAO.updateShippingRequestSetLanguage(null);
    		boolean isAuthConfirm = Boolean.parseBoolean(paramMap.get("isAuthConfirm").toString());
    		
    		if(paramMap.get("isStrategicCreate") == null || (paramMap.get("isStrategicCreate") != null && !paramMap.get("isStrategicCreate").toString().equals("Y"))) {
				if(!this.isChangedShippingReq(paramMap)) {
					return -1;
				}
    			paramMap.put("SHIPPING_REQ_FLAG", "");
    		}

			if(isAuthConfirm) {
				// 수기 전략물자 생성건으로 추가, 수기 전략물자 생성건의 Invoice는 일단은 조건 상관없이 중복이면 다 튕구도록..
				if((paramMap.get("isStrategicCreate") != null && paramMap.get("isStrategicCreate").toString().equals("Y"))
						||(paramMap.get("DELIVERY_TERMS") != null && paramMap.get("DELIVERY_TERMS").toString().equals("Air Courier"))) {
					if(!this.isManualInvoiceDuplicate(paramMap)) {
						return -2;
					}
				}
				else {
					// Validation Invoice
					if(!this.isInvoiceDuplicate(paramMap)) {
						return -2;
					}
				}
			}
    			
			if(paramMap.get("VENDOR_NAME").toString().equals("TEST02")) {
			} else if(paramMap.get("isStrategicCreate") != null && paramMap.get("isStrategicCreate").toString().equals("Y")) {
			} else if(!this.isAttachShippingRequest(paramMap)) {
				return -3;
			}
			
    		if(paramMap.get("REQ_MASTER_ID") == null || paramMap.get("REQ_MASTER_ID").toString().equals("") || paramMap.get("REQ_MASTER_ID").toString().equals("null")) {
    			List<Map<String, Object>> seqList = transShippingRequestDAO.getTransShippingRequestSeq(null);
    			paramMap.put("REQ_MASTER_ID", seqList.get(0).get("SHIPPING_M_SEQ").toString());
    		}
    		
    		// ZSHP_SHIPPING_REQ_M 출하요청 MASTER 저장
    		if((paramMap.get("DELIVERY_TERMS") != null && paramMap.get("DELIVERY_TERMS").toString().equals("Air Courier"))) {
    			paramMap.put("ATTRIBUTE5", "Y");
    		}
    		else {
    			paramMap.put("ATTRIBUTE5", "N");
    		}
    		cnt = transShippingRequestDAO.saveTransShippingRequestMst(paramMap);	

    		if(paramMap.get("isStrategicCreate") == null || (paramMap.get("isStrategicCreate") != null && !paramMap.get("isStrategicCreate").toString().equals("Y"))) {
        		JSONArray updatePackingList = JSONArray.fromObject(paramMap.get("packingDetailList").toString());
        		if(updatePackingList.size() > 0) {
        			cnt = transShippingRequestDAO.deleteTransShippingRequestPackingList(paramMap);
        	    	for(int i = 0; i < updatePackingList.size(); i++) {	    			
        	    		JSONObject obj = (JSONObject)updatePackingList.get(i);
        	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
        	    		row.put("REQ_MASTER_ID", paramMap.get("REQ_MASTER_ID").toString());
        	    		row.put("USER_AD", paramMap.get("USER_AD").toString());
        	    		
        	    		cnt = transShippingRequestDAO.insertTransShippingRequestPackingList(row);
        	    	}
        		}    	
        		
    			JSONArray deleteMailList = JSONArray.fromObject(paramMap.get("deleteMailList").toString());
    	    	for(int i = 0; i < deleteMailList.size(); i++) {	    			
    	    		JSONObject obj = (JSONObject)deleteMailList.get(i);
    	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
    	    		row.put("REQ_MASTER_ID", paramMap.get("REQ_MASTER_ID").toString());
    	    		
    	    		cnt = transShippingRequestDAO.deleteTransShippingRequestMailList(row);
    	    	}     		
        		
    			JSONArray updateMailList = JSONArray.fromObject(paramMap.get("updateMailList").toString());
    	    	for(int i = 0; i < updateMailList.size(); i++) {	    			
    	    		JSONObject obj = (JSONObject)updateMailList.get(i);
    	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
    	    		row.put("USER_AD", paramMap.get("USER_AD").toString());
    	    		row.put("REQ_MASTER_ID", paramMap.get("REQ_MASTER_ID").toString());
    	    		
    	    		cnt = transShippingRequestDAO.saveTransShippingRequestMailList(row);
    	    	}

    		}	
    		
			if(isAuthConfirm) {
				if(!this.confirmInvoice(paramMap)) {
					return -4;
				}
			}

			if(isAuthConfirm) {
				List<Map<String, Object>> seqList = transShippingRequestDAO.getTransShippingRequestMstData(paramMap);

				System.out.println("seqList.size() " + seqList.size());
				if(seqList.size() == 0) {
					seqList = transShippingRequestDAO.getTransShippingRequestStrategicMasterSeq(null);
					
					paramMap.put("STRATEGIC_MASTER_ID", seqList.get(0).get("SEQ"));
					strategicMasterId = Integer.parseInt(seqList.get(0).get("SEQ").toString());
					paramMap.put("STATUS", "Incomplete");
					paramMap.put("STRATEGIC_ITEM_YN", paramMap.get("ATTRIBUTE1"));
					paramMap.put("strategicMasterId", seqList.get(0).get("SEQ"));
					
					cnt = transShippingRequestDAO.saveTransShippingRequestStrategicMaster(paramMap);
					cnt = transShippingRequestDAO.saveTransShippingRequestMstStrategicSeq(paramMap);					
				}
				else {
					strategicMasterId = Integer.parseInt(seqList.get(0).get("SEQ").toString());
				}
			}	
					
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        //return cnt;
    	if(paramMap.get("isStrategicCreate") != null && paramMap.get("isStrategicCreate").toString().equals("Y")) {
    		return strategicMasterId;
    	}
    	else {
    		return Integer.parseInt(paramMap.get("REQ_MASTER_ID").toString());
    	}
    	
    }  
    
	private boolean isChangedShippingReq (Map<String, Object> paramMap) {
		
		try {
				Map<String, Object> reqMaster = paramMap;
				
				Map<String, Object> reqMasterPrev = new ObjectMapper().readValue(paramMap.get("mstDataPrev").toString(), Map.class);
				
				List<Map<String, Object>> reqDetail = new ArrayList<Map<String,Object>>();
				JSONArray packingDetailList = JSONArray.fromObject(paramMap.get("packingDetailList").toString());
		    	for(int i = 0; i < packingDetailList.size(); i++) {	    			
		    		JSONObject obj = (JSONObject)packingDetailList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		reqDetail.add(row);
		    	}   
		    	
		    	List<Map<String, Object>> reqDetailPrev = new ArrayList<Map<String,Object>>();
				JSONArray packingDetailListPrev = JSONArray.fromObject(paramMap.get("packingDetailListPrev").toString());
		    	for(int i = 0; i < packingDetailListPrev.size(); i++) {	    			
		    		JSONObject obj = (JSONObject)packingDetailListPrev.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		reqDetailPrev.add(row);
		    	}  
		    	
		    	List<Map<String, Object>> mailingMemberNew = new ArrayList<Map<String,Object>>();
				JSONArray updateMailList = JSONArray.fromObject(paramMap.get("updateMailList").toString());
		    	for(int i = 0; i < updateMailList.size(); i++) {	    			
		    		JSONObject obj = (JSONObject)updateMailList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		mailingMemberNew.add(row);
		    	} 
		    	
		    	List<Map<String, Object>> mailingMemberRemove = new ArrayList<Map<String,Object>>();
				JSONArray deleteMailList = JSONArray.fromObject(paramMap.get("deleteMailList").toString());
		    	for(int i = 0; i < deleteMailList.size(); i++) {	    			
		    		JSONObject obj = (JSONObject)deleteMailList.get(i);
		    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
		    		mailingMemberRemove.add(row);
		    	}
				
				Set<String> detailKeyList = reqDetail.get(0).keySet();
				
				boolean isMasterChanged = false;
				boolean isDetailChanged = false;
				boolean isMailingChanged = false;
				
				boolean tempV = false;
				List<Boolean> isRowChangedL = new ArrayList<Boolean>();
				List<String> notCompareValue = new ArrayList<String>();
				
				notCompareValue.add("isAuthConfirm");
				notCompareValue.add("REVISION_NUM");
				notCompareValue.add("PREV_STATUS");
				notCompareValue.add("packingDetailList");
				notCompareValue.add("mailList");
				notCompareValue.add("updateMailList");
				notCompareValue.add("deleteMailList");
				notCompareValue.add("mstDataPrev");
				notCompareValue.add("packingDetailListPrev");
				notCompareValue.add("mstDataPrev");
				notCompareValue.add("DEPT_CD");
				notCompareValue.add("USER_AD");
				
				
				// reqMaster 비교
				for(String key: reqMaster.keySet()) {
					if(reqMaster.get(key) != null && !notCompareValue.contains(key)) {
						if(reqMasterPrev.get(key) == null)
						{
							isMasterChanged = true;
							break;
						}
						else if(!reqMaster.get(key).toString().equals(reqMasterPrev.get(key).toString())) {
							isMasterChanged = true;
							break;
						}
					}
				}
				
				// reqDetail 비교 - size
				if(reqDetail.size() != reqDetailPrev.size())
					isDetailChanged = true;
				else {
					// reqDetail 비교
					isDetailChanged = false;
					for(int i = 0; i < reqDetail.size(); i++) // 원 list
					{
						for(int t = 0; t < reqDetailPrev.size(); t++) // 비교 list
						{ 
							tempV = false;
							isRowChangedL.add(tempV);
							
							for(String key: detailKeyList) { // list 1 row의 key value
								// 원 list의 value가 비교 list 별 value 끼리 비교함.
								// 비교하여 모든 value가 일치하는 라인이 하나라도 있으면 일치하는 것으로 간주 
								//if(reqDetail.get(i).get(key) != null  && !notCompareValue.contains(key)) {
								if((reqDetail.get(i).get(key) != null && !reqDetail.get(i).get(key).equals(""))
										&& !notCompareValue.contains(key)) {
									if(reqDetailPrev.get(i) == null) {
										tempV = true;
										break;
									}
									if(!reqDetail.get(i).get(key).toString().equals(reqDetailPrev.get(i).get(key).toString())) {
										tempV = true;
										break;
									}
								}
							} // for line 별 비교
							
							// 모든 value가 일치할 경우에는 해당 Line은 일치한다고 간주하고, Line비교 종료
							if(!tempV) {
								isRowChangedL.set(i, false);
								break;
							}
							else
								isRowChangedL.set(i, true);
						} // 비교 list
					} // 원 list
					
					for(boolean rowB: isRowChangedL) {
						if(rowB) {
							isDetailChanged = true;
							break;
						}
					}
				}// reqDetail 비교 end
				
				// 메일은 현재 비교대상에서 넣지 않음..
				if((mailingMemberNew.size() != 0) || (mailingMemberRemove.size() != 0))
					isMailingChanged = true;
				
				if(isMasterChanged || isDetailChanged)
					return true;
				else
					return false;
		}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		return false;
		}
	}
	
	private boolean isInvoiceDuplicate(Map<String, Object> paramMap) {
		String isExistStr = "";
		String isCheckStr = "";
		
		int isExist = 0;
		int isCheck = 0;
		
		boolean isUsable = false;
		// Invoice 유뮤 존재 확인
		try {
			isExistStr = ((List<Map<String, Object>>)transShippingRequestDAO.getTransShippingRequestIsInvoiceExist(paramMap)).get(0).get("CNT").toString(); 
			isExist = Integer.parseInt(isExistStr);
			if(isExist > 0) {
				// 존재할 경우, 기존 Invoice에 등록될 출하요청건의 조건이 같은지 비교
				isCheckStr = ((List<Map<String, Object>>)transShippingRequestDAO.getTransShippingRequestIsInvoiceCheckInfo(paramMap)).get(0).get("CNT").toString();
				isCheck = Integer.parseInt(isCheckStr);
				
				if(isCheck > 0) isUsable = true;
				else isUsable = false;
			}
			else isUsable = true;
		} catch (Exception e) {
			System.out.println("!!!!!!" + e.toString());
			isUsable = false;
		}
		return isUsable;
	}
	
	private boolean isManualInvoiceDuplicate(Map<String, Object> paramMap) {
		String isExistStr = "";
		String isCheckStr = "";
		
		int isExist = 0;
		int isCheck = 0;
		
		boolean isUsable = false;
		
		try {
			isExistStr = ((List<Map<String, Object>>)transShippingRequestDAO.getTransShippingRequestIsInvoiceExist(paramMap)).get(0).get("CNT").toString(); 
			isExist = Integer.parseInt(isExistStr);
			if(isExist > 0) {
				if(paramMap.get("REQ_MASTER_ID") == null || paramMap.get("REQ_MASTER_ID").toString().equals("") || paramMap.get("REQ_MASTER_ID").toString().equals("null")) {
					isUsable = false;
				}
				else {
					int myInvoiceCnt = transShippingRequestDAO.getManualStrategicMyInvCheck(paramMap);
					if(myInvoiceCnt > 0) {
						isUsable = true;
					}
					else {
						isUsable = false;
					}
				}
			}
			else {
				isUsable = true;
			}
		} catch (Exception e) {
			System.out.println("!!!!!!" + e.toString());
			isUsable = false;
		}
		return isUsable;
	}
	
	private boolean isAttachShippingRequest(Map<String, Object> paramMap) {
		boolean isAttached = true;
		String r_attach_code = "";
		String attach_code = "";
		try {
			paramMap.put("FILE_GRP_CD", paramMap.get("DOCUMENT_GRP_ID"));
			
			List<Map<String, Object>> attachFileList = transShippingRequestDAO.getTransShippingRequestDlgAttList(paramMap);
			
			if(attachFileList.size() > 0)
			{
				isAttached = true;
			}
			else
			{
				isAttached = false;
			}			
			
			
		} catch (Exception e) {
			System.out.println("!!!!!!" + e.toString());
			isAttached = false;
		}
		
		return isAttached;
	}
		
	private boolean confirmInvoice(Map<String, Object> paramMap) {
		boolean isSuccess = false;
		String invoiceNoId = "";
		
		try {
			// invoice_no_id get
			List<Map<String, Object>> invoiceNoIdList = transShippingRequestDAO.getTransShippingRequestInvoiceNoId(paramMap);
			
			if(invoiceNoIdList.size() > 0) {
				invoiceNoId = invoiceNoIdList.get(0).get("INVOICE_NO_ID").toString();
				
				if(invoiceNoId.equals("0")) {
					invoiceNoId = ((List<Map<String, Object>>)transShippingRequestDAO.getTransShippingRequestInvoiceNoId2(paramMap)).get(0).get("INVOICE_NO_ID").toString();
				}
			}
			else {
				invoiceNoId = ((List<Map<String, Object>>)transShippingRequestDAO.getTransShippingRequestInvoiceNoId2(paramMap)).get(0).get("INVOICE_NO_ID").toString();
			}

			paramMap.put("INVOICE_NO_ID", invoiceNoId);
			transShippingRequestDAO.updateTransShippingRequestMergeInvoiceNo(paramMap);
			transShippingRequestDAO.updateTransShippingRequestInvoice(paramMap);			
		
			
			transShippingRequestDAO.deleteTransShippingRequestDlgEditInvoiceDisconnected(paramMap);
			
			isSuccess = true;
		} catch (Exception e) {
			System.out.println("!!!!!!" + e.toString());
			isSuccess = false;
		}
		return isSuccess;
	}
	
    @Override
    public int rejectTransShippingRequest(Map<String, Object> paramMap) throws Exception {    	
    	int cnt = 0;
    	try {
    		transShippingRequestDAO.updateShippingRequestSetLanguage(null);
    		
    		
    		cnt = transShippingRequestDAO.rejectTransShippingRequest(paramMap);
    		
    		paramMap.put("isReject", "true");
			cnt = this.sendMailShippingReqData(paramMap);
			
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
    
    @Override
    public int sendMailTransShippingRequest(Map<String, Object> paramMap) throws Exception {    	
    	int cnt = 0;
    	try {
    		
			cnt = this.sendMailShippingReqData(paramMap);
			
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

}



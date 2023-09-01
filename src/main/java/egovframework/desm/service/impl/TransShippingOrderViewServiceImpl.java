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
import java.util.UUID;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.desm.cmmn.MailSender;
import egovframework.desm.service.TransShippingOrderViewService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import freemarker.template.TemplateException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service("transShippingOrderViewService")
public class TransShippingOrderViewServiceImpl extends EgovAbstractServiceImpl implements TransShippingOrderViewService {

	private static final Logger LOGGER = LoggerFactory.getLogger(TransShippingOrderViewServiceImpl.class);

	
	@Resource(name = "transShippingOrderViewDAO")
	private TransShippingOrderViewDAO transShippingOrderViewDAO;
	
	@Resource(name = "transDAO")
	private TransDAO transDAO;
	
	@Resource(name = "transShippingInvoiceDAO")
	private TransShippingInvoiceDAO transShippingInvoiceDAO;
	
	@Resource(name = "transShippingRequestDAO")
	private TransShippingRequestDAO transShippingRequestDAO;	
	
    @Override
    public List getTransShippingOrderView(Map<String, Object> paramMap) {
    	transDAO.updateTransSetLanguage(null);
    	
    	List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
    	
    	List<Map<String, Object>> list = transShippingOrderViewDAO.getTransShippingOrderView(paramMap);   
    	
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

    		
    		if(row.get("OPER_ORG_CD").toString().equals(tmpRow.get("UP_OPER_ORG_CD").toString())) {
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
    public List getTransDlgTransRequestInvoiceGridView(Map<String, Object> paramMap) {
    	transDAO.updateTransSetLanguage(null);
    	return transShippingOrderViewDAO.getTransDlgTransRequestInvoiceGridView(paramMap);
    } 
    
    @Override
    public List getTransDlgTransRequestMailGridView(Map<String, Object> paramMap) {
    	transDAO.updateTransSetLanguage(null);
    	return transShippingOrderViewDAO.getTransDlgTransRequestMailGridView(paramMap);
    }
    
    @Override
    public int cancelTransDlgTransRequestInvoice(Map<String, Object> paramMap) throws Exception {    	
    	int cnt = 0;
    	try {
    		
			cnt = this.cancelTransDlgTransRequestInvoiceData(paramMap);
			
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
    
	public int cancelTransDlgTransRequestInvoiceData(Map<String, Object> paramMap) {
		transDAO.updateTransSetLanguage(null);
		int cnt = 0;				

		
		try {
			
			Map<String, Object> mailInfo = new HashMap<String, Object>();
			
			String mailReceiverList = "";
			
			double aggregatePkg = 0;
			double aggregateNetWeight = 0;
			double aggregateGrossWeight = 0;
			double aggregateShippingVolume = 0;	
			
			List<Map<String, Object>> mailContentList = transShippingInvoiceDAO.getTransShippingInvoiceMailContentShippingOrder(paramMap); 
			Map<String, Object> mailContent = mailContentList.get(0);
			
			List<Map<String, Object>> invoiceList = transShippingInvoiceDAO.getTransShippingInvoiceMailContentSrInv(paramMap);
			for(Map<String, Object> inv : invoiceList) {
				if(inv.get("PKG") != null)
					aggregatePkg += Double.parseDouble(inv.get("PKG").toString());
				if(inv.get("SUM_NET_WEIGHT") != null)
					aggregateNetWeight += Double.parseDouble(inv.get("SUM_NET_WEIGHT").toString());
				if(inv.get("SUM_GROSS_WEIGHT") != null)
					aggregateGrossWeight += Double.parseDouble(inv.get("SUM_GROSS_WEIGHT").toString());
				if(inv.get("SUM_SHIPPING_VOLUME") != null)
					aggregateShippingVolume += Double.parseDouble(inv.get("SUM_SHIPPING_VOLUME").toString());
			}
			
			mailContent.put("aggregatePkg", formatSeperatedByComma(aggregatePkg));
			mailContent.put("aggregateNetWeight", formatSeperatedByComma(aggregateNetWeight));
			mailContent.put("aggregateGrossWeight", formatSeperatedByComma(aggregateGrossWeight));
			mailContent.put("aggregateShippingVolume", formatSeperatedByComma(aggregateShippingVolume));
			
			List<Map<String, Object>> listMailReceiver = transShippingInvoiceDAO.getTransShippingInvoiceOrderReceiver(paramMap);
			
			mailContent.put("FINAL_DESTINATION_ADDR", paramMap.get("FINAL_DESTINATION_ADDR") == null ? "&nbsp;" : paramMap.get("FINAL_DESTINATION_ADDR").toString());
			mailContent.put("STATE", "운송요청 취소(삭제)");			
			
			mailContent.put("SENDER", paramMap.get("SENDER"));
			mailContent.put("SENDER_EMAIL", paramMap.get("SENDER_EMAIL"));
			
			for (Map<String, Object> receiver : listMailReceiver) {
				mailReceiverList += receiver.get("EMAIL").toString();
				mailReceiverList += "; ";
			}
			mailContent.put("mailReceiverList", mailReceiverList);			
		
			mailInfo.put("mailData", mailContent);
			mailInfo.put("receivePerson", listMailReceiver);
			mailInfo.put("invoiceList", invoiceList);
		
			mailInfo.put("LOGIN_URL", paramMap.get("LOGIN_URL").toString());
			mailInfo.put("USER_AD", paramMap.get("USER_AD").toString());
			mailInfo.put("location", paramMap.get("location"));
			mailInfo.put("host", paramMap.get("host"));
			mailInfo.put("port", paramMap.get("port"));
			mailInfo.put("encoding", paramMap.get("encoding"));
			mailInfo.put("username", paramMap.get("username"));
			mailInfo.put("password", paramMap.get("password"));

			
			cnt = this.sendTransDlgTransRequestInvoiceMail(mailInfo);
			
			transShippingOrderViewDAO.deleteTransDlgTransRequestMailGridView(paramMap);
			transShippingOrderViewDAO.deleteTransDlgTransRequestMailGridViewInInvoice(paramMap);
			transShippingOrderViewDAO.deleteTransDlgTransRequestMailGridViewMail(paramMap);
						
			
			
		} catch (Exception e) {
			cnt = -2;
		}
		return cnt;
	} 
	
    private String formatSeperatedByComma(double val) {
        NumberFormat format = NumberFormat.getNumberInstance();
        return format.format(val);
    }
    
	public int sendTransDlgTransRequestInvoiceMail(Map<String, Object> param) {
		int cnt = 0;
		
		final Map<String, Object> paramInfo = new HashMap<String, Object>();
		
		Map<String, Object> mailData = (Map<String, Object>) param.get("mailData");  // 메일정보
		List<Map<String, Object>> personList = (List<Map<String, Object>>) param.get("receivePerson");  // 수신자 정보
		List<Map<String, Object>> invoiceList = (List<Map<String, Object>>) param.get("invoiceList");  // Invoice List
		List<Map<String, Object>> mailList = new ArrayList<Map<String, Object>>();

		try {
			
			for (final Map<String, Object> invoiceRow : invoiceList) {
				
				invoiceRow.put("rnum", invoiceRow.get("RNUM"));
				invoiceRow.put("invoice_no", invoiceRow.get("INVOICE_NO"));
				invoiceRow.put("description", invoiceRow.get("DESCRIPTION"));
				invoiceRow.put("suppliers", invoiceRow.get("SUPPLIERS"));
				invoiceRow.put("contact_points", invoiceRow.get("CONTACT_POINTS"));
				invoiceRow.put("pkg", invoiceRow.get("PKG"));
				invoiceRow.put("sum_net_weight", invoiceRow.get("SUM_NET_WEIGHT"));
				invoiceRow.put("sum_gross_weight", invoiceRow.get("SUM_GROSS_WEIGHT"));
				invoiceRow.put("sum_shipping_volumn", invoiceRow.get("SUM_SHIPPING_VOLUME"));
				invoiceRow.put("shop_out_dates", invoiceRow.get("SHOP_OUT_DATES"));
				invoiceRow.put("delivery_terms", invoiceRow.get("DELIVERY_TERMS"));
				invoiceRow.put("danger_flag", invoiceRow.get("DANGER_FLAG"));
			}

			
			for (final Map<String, Object> receiver : personList) { 
				Map<String, Object> content = new HashMap<String, Object>();
				
				content.put("title", mailData.get("TITLE") == null ? "&nbsp;" : mailData.get("TITLE").toString());
				content.put("content", mailData.get("CONTENT") == null ? "&nbsp;" : mailData.get("CONTENT").toString());
				content.put("transport_type", mailData.get("TRANSPORT_TYPE_NAME") == null ? "&nbsp;" : mailData.get("TRANSPORT_TYPE_NAME").toString()); // 운송타입
				content.put("transport_method", mailData.get("TRANSPORT_METHOD_NAME") == null ? "&nbsp;" : mailData.get("TRANSPORT_METHOD_NAME").toString()); // 운송방법
				content.put("transport_terms", mailData.get("TRANSPORT_TERMS_NAME") == null ? "&nbsp;" : mailData.get("TRANSPORT_TERMS_NAME").toString()); // 운송조건
				content.put("cargo_ready_date", mailData.get("M_CARGO_READY_DATE") == null ? "&nbsp;" : mailData.get("M_CARGO_READY_DATE").toString());
				content.put("loading_port", mailData.get("LOADING_PORT") == null ? "&nbsp;" : mailData.get("LOADING_PORT").toString());
				content.put("destination_port", mailData.get("DESTINATION_PORT") == null ? "&nbsp;" : mailData.get("DESTINATION_PORT").toString());
				content.put("final_destination_addr",mailData.get("FINAL_DESTINATION_ADDR") == null ? "&nbsp;" : mailData.get("FINAL_DESTINATION_ADDR").toString());
				content.put("contact_point", mailData.get("CONTACT_POINT") == null ? "&nbsp;" : mailData.get("CONTACT_POINT").toString());
				
				content.put("shippingOrderTitle", "[" + mailData.get("STATE").toString() + "]" + " " + mailData.get("VOYAGE_NO").toString());
				content.put("list_data", invoiceList);
				
				
				
				content.put("login_url", param.get("LOGIN_URL").toString());
				
				content.put("sender", mailData.get("SENDER") == null ? "&nbsp;" : mailData.get("SENDER").toString());
				content.put("senderEmail", mailData.get("SENDER_EMAIL") == null ? "&nbsp;" : mailData.get("SENDER_EMAIL").toString());
				// 메일본문에 메일 수신자 임시 추가
				content.put("mailReceiverList", mailData.get("mailReceiverList") == null ? "&nbsp;" : mailData.get("mailReceiverList").toString());
				
				content.put("aggregatePkg", mailData.get("aggregatePkg") == null ? "&nbsp;" : mailData.get("aggregatePkg").toString());
				content.put("aggregateNetWeight", mailData.get("aggregateNetWeight") == null ? "&nbsp;" : mailData.get("aggregateNetWeight").toString());
				content.put("aggregateGrossWeight", mailData.get("aggregateGrossWeight") == null ? "&nbsp;" : mailData.get("aggregateGrossWeight").toString());
				content.put("aggregateShippingVolume", mailData.get("aggregateShippingVolume") == null ? "&nbsp;" : mailData.get("aggregateShippingVolume").toString());
					
					
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
		
		cnt = this.addMail("DESM_TRANS_REQ_GP_MAIL", mailList);
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
		} finally {
			transShippingRequestDAO.updateTransShippingRequestMailSendComplete(mailParam);
		}
		
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
    public List getTransShippingOrderViewPackage(Map<String, Object> paramMap) {
    	transDAO.updateTransSetLanguage(null);
    	return  transShippingOrderViewDAO.getTransShippingOrderViewPackage(paramMap);   
    } 
}





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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.desm.cmmn.MailSender;
import egovframework.desm.cmmn.firebase.FirebaseService;
import egovframework.desm.service.DesmService;
import egovframework.desm.service.DesmVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import freemarker.template.TemplateException;
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

@Service("desmService")
public class DesmServiceImpl extends EgovAbstractServiceImpl implements DesmService {

	private static final Logger logger = LoggerFactory.getLogger(DesmServiceImpl.class);
	
	
	@Resource(name = "desmDAO")
	private DesmDAO desmDAO;

	@Resource(name = "firebaseService")
	FirebaseService firebaseService;

	@Override
	public DesmVO chkLogin(Map<String, Object> paramMap) throws Exception {
		return (DesmVO)desmDAO.chkLogin(paramMap);
	}
	
    @Override
    public List getLeftMenu(Map<String, Object> paramMap) {
        return desmDAO.getLeftMenu(paramMap);
    }	
	
    @Override
    public List getCheckMenu(Map<String, Object> paramMap) {
        return desmDAO.getCheckMenu(paramMap);
    }	
	
    @Override
    public List getComCode(Map<String, Object> paramMap) {
        return desmDAO.getComCode(paramMap);
    }
    
    @Override
    public List getComDay(Map<String, Object> paramMap) {
        return desmDAO.getComDay(paramMap);
    }		    
	
    @Override
    public int insertUserLog(Map<String, Object> paramMap) {
        return desmDAO.insertUserLog(paramMap);
    }
    
    @Override
    public Map<String, Object> getCodeCombo(Map<String, Object> paramMap) {
    	
    	Map<String, Object> reaultMap = new HashMap<String, Object>();
    	JSONArray paramList = JSONArray.fromObject(paramMap.get("paramList").toString());
    	
    	for(int i = 0; i < paramList.size(); i++) {
    		JSONObject obj = (JSONObject)paramList.get(i);
    		Map<String, Object> row = new HashMap<String, Object>();
    		
    		row.put("lang", paramMap.get("lang").toString());
    		row.put("CODE", obj.get("CODE").toString());
    		
    		reaultMap.put(obj.get("CODE").toString(), desmDAO.getComCode(row));
    	}   
    	
    	reaultMap.put("DAY", desmDAO.getComDay(paramMap));
    	reaultMap.put("USER", desmDAO.getComUser(paramMap));
    	
        return reaultMap;
    }	
	
    @Override
    public List getMenuAuthCheckList(Map<String, Object> paramMap) {
        return desmDAO.getMenuAuthCheckList(paramMap);
    }	
	
    @Override
    public List getInitDefailProject(Map<String, Object> paramMap) {
        return desmDAO.getInitDefailProject(paramMap);
    }
    
    @Override
    public List getInitDefaultCountry(Map<String, Object> paramMap) {
        return desmDAO.getInitDefaultCountry(paramMap);
    }	
	
	public int addMail(String mailKey, List<Map<String, Object>> mailList) {
		int cnt = 0;
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("MAIL_SET_ID", mailKey);
		
		List<Map<String, Object>> mailDetailList = desmDAO.getMailByMailId(paramMap);
		
		Map<String, Object> mailDetail = mailDetailList.get(0);
		

		String useYn = (String) mailDetail.get("USE_YN");
		if("N".equals(useYn)) {
			return -2;
		}

		try {

			String mail_tit = mailDetail.get("MAIL_SET_NM").toString();
			for(Map<String, Object> row : mailList){	
				
				if(row.get("rsi_name") != null) {
					String rsi_name = (String)row.get("rsi_name");
					mail_tit = mail_tit.replace("${rsi_name}", rsi_name);
				}
				
				if(row.get("mrf_name") != null) {
					String mrf_name = (String)row.get("mrf_name");
					mail_tit = mail_tit.replace("${mrf_name}", mrf_name);
				}
				
				if(row.get("mrr_name") != null) {
					String mrr_name = (String)row.get("mrr_name");
					mail_tit = mail_tit.replace("${mrr_name}", mrr_name);
				}

				if(row.get("mir_name") != null) {
					String mir_name = (String)row.get("mir_name");
					mail_tit = mail_tit.replace("${mir_name}", mir_name);
				}

				if(row.get("status") != null) {
					String status = (String)row.get("status");
					mail_tit = mail_tit.replace("${status}", status);
				}

				if(row.get("email_title") != null) {
					String email_title = (String)row.get("email_title");
					mail_tit = mail_tit.replace("${email_title}", email_title);
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
				desmDAO.insertEsamail(row);
				
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
		Map<String, Object> template = ((List<Map<String, Object>>)desmDAO.getMailByMailId(param)).get(0);
		String content = (String)template.get("TMP_CONT"); 
		
		return this.generate(mailKey,content,data);
	}
	
	public String generate(String appId, String content, Object data) throws TemplateException, IOException{
		StringWriter writer = new StringWriter();
		String replacedContent = replaceSpecialChars(content);
		freemarker.template.Template t = new freemarker.template.Template(appId, new StringReader(replacedContent), null);
		t.process(data, writer);

	
		String result = writer.toString();
		if (logger.isErrorEnabled()) logger.error("result : " + result);
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
	
	private void realTimeTransfer(List<Map<String, Object>> mailList) {
		for(Map<String, Object> row : mailList){
			send(row);
		}
	}		
	
	private void send(Map<String, Object> mail) {
		
		Map<String, Object> mailParam = new HashMap<String, Object>();  
		
		
		mailParam = ((List<Map<String, Object>>)desmDAO.getMailById(mail)).get(0);
		MailSender mailSender = new MailSender(mail);
		try{
			mailSender.sendMail(mail);
			mailParam.put("snd_yn", "Y");
		} catch(Exception e) {
			mailParam.put("snd_yn", "N");
			e.printStackTrace();
		} finally {
			desmDAO.updateMailSendComplete(mailParam);
		}
		
	}
	
	public int sendFcm(String fcmType ,List<Map<String, Object>> mailList) {
		int cnt = 0;
		
		for(Map<String, Object> row : mailList){
			
			List<Map<String, Object>> fcmTokenList = desmDAO.getfcmToken(row);
			
			if(fcmTokenList.size() > 0) {
				
				Map<String, Object> fcmTokenRow = fcmTokenList.get(0);
				if(fcmType.equals("RSI")) {
					fcmTokenRow.put("TITLE", "DESM RSI : " + row.get("RSI_NO").toString()); // TODO: RSI 번호 추가 DESM RSI : RSI2022000009
					fcmTokenRow.put("BODY", "RSI Approval Status Changed");
				}
				else if(fcmType.equals("MRF")) {
					fcmTokenRow.put("TITLE", "DESM MRF : " + row.get("MRF_NO").toString()); // TODO: MRF 번호 추가
					fcmTokenRow.put("BODY", "MRF Approval Status Changed");
				}							
				else if(fcmType.equals("MRR")) {
					fcmTokenRow.put("TITLE", "DESM MRR : " + row.get("MRR_NO").toString()); // TODO: DESM MRR 번호 추가
					fcmTokenRow.put("BODY", "MRR Approval Status Changed");
				}						
				else if(fcmType.equals("MIR")) {
					fcmTokenRow.put("TITLE", "DESM MIR : " + row.get("MIR_NO").toString()); // TODO: DESM MIR 번호 추가
					fcmTokenRow.put("BODY", "MIR Approval Status Changed");
				}
				
				String response = firebaseService.sendByFcmToken(fcmTokenRow.get("FCM_TOKEN").toString(), fcmTokenRow.get("TITLE").toString(), fcmTokenRow.get("BODY").toString());
				fcmTokenRow.put("RESPONSE", response);
				fcmTokenRow.put("PROJECT_NO", row.get("PROJECT_NO"));
				
				firebaseService.saveFcmTokenHistory(fcmTokenRow);
			}
		}
	
		return cnt;
	}	
	
    @Override
    public int saveDesmServiceLog(Map<String, Object> paramMap) {
        return desmDAO.saveDesmServiceLog(paramMap);
    }
	
    
	
	
	
	
	
	
	
    @Override
    public List getStatusCardInfo(Map<String, Object> paramMap) {
        return desmDAO.getStatusCardInfo(paramMap);
    }

    @Override
    public List getMyRequestInfo(Map<String, Object> paramMap) {
        return desmDAO.getMyRequestInfo(paramMap);
    }
    
    @Override
    public List getNotice(Map<String, Object> paramMap) {
        return desmDAO.getNotice(paramMap);
    }
    
    @Override
    public List getNoticeContents(Map<String, Object> paramMap) {
        return desmDAO.getNoticeContents(paramMap);
    }
    
    @Override
    public List selectInvoiceAttach(Map<String, Object> paramMap) {
        return desmDAO.selectInvoiceAttach(paramMap);
    }

    @Override
    public List getRealTimeNotice(Map<String, Object> paramMap) {
        return desmDAO.getRealTimeNotice(paramMap);
    }
    
    @Override
    public int setSessionLang(Map<String, Object> paramMap) {
        return desmDAO.setSessionLang(paramMap);
    }
    
    @Override
    public List getOrgList(Map<String, Object> paramMap) {
        return desmDAO.getOrgList(paramMap);
    }
    
    @Override
    public List getAllUserList(Map<String, Object> paramMap) {
        return desmDAO.getAllUserList(paramMap);
    }
    
    @Override
    public int insertNotice(Map<String, Object> paramMap) {
    	this.scriptCheck(paramMap);
        return desmDAO.insertNotice(paramMap);
    }
    
    @Override
    public int deleteNotice(Map<String, Object> paramMap) {
        return desmDAO.deleteNotice(paramMap);
    }
    
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
    public List getIsSubon(Map<String, Object> paramMap) {
        return desmDAO.getIsSubon(paramMap);
    }
	
	@Override
	public String getRedirectLang(Map<String, Object> paramMap) {
		return desmDAO.getRedirectLang(paramMap);
	}
}

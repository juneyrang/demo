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
import egovframework.desm.service.DesmService;
import egovframework.desm.service.TestService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.property.EgovPropertyService;
import freemarker.template.TemplateException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service("testService")
public class TestServiceImpl extends EgovAbstractServiceImpl implements TestService {

	private static final Logger LOGGER = LoggerFactory.getLogger(TestServiceImpl.class);
	
	@Resource(name = "testDAO")
	private TestDAO testDAO;
	
	@Resource(name="propertiesService")
	protected EgovPropertyService propertiesService;
	
	@Resource(name = "desmService")
	private DesmService desmService;
	
	@Override
	public List getTestGridView(Map<String, Object> paramMap) {
		testDAO.updateSetLanguage(null);
		return testDAO.getTestGridView(paramMap);
	}
	
	@Override
	public List getTestDataList(Map<String, Object> paramMap) {
		
		return testDAO.getTestDataList(paramMap);
	}
	
	@Override
	public void sendMailSupplySummaryTest(Map<String, Object> paramMap) {
		Map<String, Object> mailInfo = new HashMap<String, Object>();
		String mailReceiverList = "";
		try {
			//test
			String loc = propertiesService.getString("location");
			paramMap.put("location", loc);
	    	paramMap.put("LOGIN_URL", propertiesService.getString("mail.login.url.prod"));
	    	if(loc.equals("dev")) {
	    		paramMap.put("LOGIN_URL", propertiesService.getString("mail.login.url.dev"));
	    	}
	    	paramMap.put("host", propertiesService.getString("mail.host"));
	    	paramMap.put("port", propertiesService.getString("mail.port"));
	    	paramMap.put("encoding", propertiesService.getString("mail.encoding"));
	    	paramMap.put("username", propertiesService.getString("mail.username"));
	    	paramMap.put("password", propertiesService.getString("mail.password"));
			//
			Map<String, Object> mailContent = testDAO.getContentSupplySummary(paramMap);
			
			List<Map<String, Object>> listMailReceiver = testDAO.getMailSupplySummaryReceeiver(paramMap);
			
			for (Map<String, Object> receiver : listMailReceiver) {
				mailReceiverList += receiver.get("EMAIL").toString();
				mailReceiverList += "; ";
			}
			
			mailContent.put("mailReceiverList", mailReceiverList);
			mailInfo.put("mailData", mailContent);
			mailInfo.put("receivePerson", listMailReceiver);
			mailInfo.put("LOGIN_URL", paramMap.get("LOGIN_URL").toString());
			mailInfo.put("USER_AD", "HANBYUL1.LEE");

			mailInfo.put("location", paramMap.get("location"));
			mailInfo.put("host", paramMap.get("host"));
			mailInfo.put("port", paramMap.get("port"));
			mailInfo.put("encoding", paramMap.get("encoding"));
			mailInfo.put("username", paramMap.get("username"));
			mailInfo.put("password", paramMap.get("password"));
			
			this.sendMailSupplySummaryTestAdd(mailInfo);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private void sendMailSupplySummaryTestAdd(Map<String, Object> param) {
		List<Map<String, Object>> mailList = new ArrayList<Map<String, Object>>();
		
		try {
			Map<String, Object> mailData = (Map<String, Object>) param.get("mailData");
			List<Map<String, Object>> personList = (List<Map<String, Object>>) param.get("receivePerson");  // 수신자 정보
			
			for(int i = 0; i < personList.size(); i++) {
				Map<String, Object> content = new HashMap<String, Object>();
				Map<String, Object> receiver = personList.get(i);
				
				content.put("project_no", "T19020");
				content.put("project_name", "Jawa9&10");
				content.put("pmc", mailData.get("PMC") == null ? "&nbsp;" : mailData.get("PMC").toString());
				content.put("emc", mailData.get("EMC") == null ? "&nbsp;" : mailData.get("EMC").toString());
				content.put("ptc", mailData.get("PTC") == null ? "&nbsp;" : mailData.get("PTC").toString());
				content.put("etc", mailData.get("ETC") == null ? "&nbsp;" : mailData.get("ETC").toString());
				content.put("ppc", mailData.get("PPC") == null ? "&nbsp;" : mailData.get("PPC").toString());
				content.put("epc", mailData.get("EPC") == null ? "&nbsp;" : mailData.get("EPC").toString());
				content.put("pcc", mailData.get("PCC") == null ? "&nbsp;" : mailData.get("PCC").toString());
				content.put("ecc", mailData.get("ECC") == null ? "&nbsp;" : mailData.get("ECC").toString());
				content.put("pfc", mailData.get("PFC") == null ? "&nbsp;" : mailData.get("PFC").toString());
				content.put("efc", mailData.get("EFC") == null ? "&nbsp;" : mailData.get("EFC").toString());
				content.put("poc", mailData.get("POC") == null ? "&nbsp;" : mailData.get("POC").toString());
				content.put("eoc", mailData.get("EOC") == null ? "&nbsp;" : mailData.get("EOC").toString());
				content.put("mpmc", mailData.get("MPMC") == null ? "&nbsp;" : mailData.get("MPMC").toString());
				content.put("memc", mailData.get("MEMC") == null ? "&nbsp;" : mailData.get("MEMC").toString());
				content.put("mbuyerc", mailData.get("MBUYERC") == null ? "&nbsp;" : mailData.get("MBUYERC").toString());
				content.put("msmc", mailData.get("MSMC") == null ? "&nbsp;" : mailData.get("MSMC").toString());
				content.put("mqcc", mailData.get("MQCC") == null ? "&nbsp;" : mailData.get("MQCC").toString());

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
				rowData.put("email_title", "[DESM " + content.get("project_name").toString() + "] 공급일정 및 담당자 입력 현황");

				mailList.add(rowData);

			}

			desmService.addMail("DESM_SUPPLY_SUMMARY_MAIL", mailList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public List getTestTable(Map<String, Object> paramMap) {
		testDAO.updateSetLanguage(null);
		return testDAO.getTestTable(paramMap);
	}
	
	@Override
	public int saveDesmTestTableFileGrpCd(Map<String, Object> paramMap) throws Exception {
		int cnt = 0;

    	try {
    		testDAO.saveDesmTestTableFileGrpCd(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;

	}
}

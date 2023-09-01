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
package egovframework.desm.cmmn.scheduler.biz;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.quartz.SchedulerException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.desm.cmmn.scheduler.SchedulerMangement;
import egovframework.desm.service.DesmService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.property.EgovPropertyService;

/**
 * @Class Name : SchedulerServiceImpl.java
 * @Description : DESM Scheduler Business Implement Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2023. 05.17           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2023. 05.17
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
@Service("schedulerService")
public class SchedulerServiceImpl extends EgovAbstractServiceImpl implements SchedulerService {

	private static final Logger logger = LoggerFactory.getLogger(SchedulerServiceImpl.class);
	
	@Resource(name = "schedulerDAO")
	private SchedulerDAO schedulerDAO;

	@Resource(name = "schedulerMangement")
	private SchedulerMangement schedulerMangement;

	@Resource(name="propertiesService")
	protected EgovPropertyService propertiesService;

	@Resource(name = "desmService")
	private DesmService desmService;

	@Override
	public List<Map<String, Object>> getScheduleList(Map<String, Object> paramMap) {
		return schedulerDAO.getScheduleList(paramMap);
	}

    @Override
    public void desmMprMailSend(Map<String, Object> paramMap) {
    	logger.info("desmMprMailSend Start");
		try {
	    	this.scriptCheck(paramMap);

			String loc = propertiesService.getString("location");
	    	String loginUrl = loc.equals("dev") ? propertiesService.getString("mail.login.url.dev") : propertiesService.getString("mail.login.url.prod");

			List<Map<String, Object>> mailList;
			List<Map<String, Object>> mailSendList = null; // 메일 보낼 때 최상위 레벨 데이터, List로 가지만 보통 하나만 담아서 보냄
			
			Map<String, Object> data;
			Map<String, Object> rowData;

			List<Map<String, Object>> checkList = schedulerDAO.searchMprCheckList(paramMap);
			if(checkList.get(0) == null || checkList.get(0).get("mpr_date").toString().equals("")) {
				return;
			}
			paramMap.put("mpr_date", checkList.get(0).get("mpr_date"));
			List<Map<String, Object>> dataList = schedulerDAO.searchMprDataList(paramMap);
			for(int i = 0; i < dataList.size(); i++) {
				mailList = new ArrayList<Map<String, Object>>();
				mailSendList = new ArrayList<>();
				Map<String, Object> dataRow = dataList.get(i);
				dataRow.put("mpr_date", paramMap.get("mpr_date"));
				List<Map<String, Object>> mailInfoList = schedulerDAO.searchMprInfoList(dataRow);
				
				Map<String, Object> mailInfoRow = mailInfoList.get(0);
				String company = mailInfoRow.get("supplier_name") == null ? "&nbsp;" : mailInfoRow.get("supplier_name").toString();
				String product_name = mailInfoRow.get("product_name") == null ? "&nbsp;" : mailInfoRow.get("product_name").toString();
				String po_no = mailInfoRow.get("po_no") == null ? "&nbsp;" : mailInfoRow.get("po_no").toString();
				String po_description = mailInfoRow.get("po_description") == null ? "&nbsp;" : mailInfoRow.get("po_description").toString();
				String mpr_no = mailInfoRow.get("mpr_no") == null ? "&nbsp;" : mailInfoRow.get("mpr_no").toString();

				String mprRound = mailInfoRow.get("MPR_ROUND") == null ? "&nbsp;" : (mailInfoRow.get("MPR_ROUND").toString().equals("2")) ? "2nd" : "1st";

				String mpr_date_1 = mailInfoRow.get("mpr_date_1") == null ? "&nbsp;" : mailInfoRow.get("mpr_date_1").toString();
				String mpr_date_2 = mailInfoRow.get("mpr_date_2") == null ? "&nbsp;" : mailInfoRow.get("mpr_date_2").toString();
				String mpr_date_3 = mailInfoRow.get("mpr_date_3") == null ? "&nbsp;" : mailInfoRow.get("mpr_date_3").toString();
				String mpr_date_4 = mailInfoRow.get("mpr_date_4") == null ? "&nbsp;" : mailInfoRow.get("mpr_date_4").toString();
				String mpr_date_5 = mailInfoRow.get("mpr_date_5") == null ? "&nbsp;" : mailInfoRow.get("mpr_date_5").toString();
				String mpr_date_6 = mailInfoRow.get("mpr_date_6") == null ? "&nbsp;" : mailInfoRow.get("mpr_date_6").toString();
				String mpr_status_1 = mailInfoRow.get("status_1") == null ? "&nbsp;" : mailInfoRow.get("status_1").toString();
				String mpr_status_2 = mailInfoRow.get("status_2") == null ? "&nbsp;" : mailInfoRow.get("status_2").toString();
				String mpr_status_3 = mailInfoRow.get("status_3") == null ? "&nbsp;" : mailInfoRow.get("status_3").toString();
				String mpr_status_4 = mailInfoRow.get("status_4") == null ? "&nbsp;" : mailInfoRow.get("status_4").toString();
				String mpr_status_5 = mailInfoRow.get("status_5") == null ? "&nbsp;" : mailInfoRow.get("status_5").toString();
				String mpr_status_6 = mailInfoRow.get("status_6") == null ? "&nbsp;" : mailInfoRow.get("status_6").toString();
				String manager_mail = mailInfoRow.get("manager_mail") == null ? "&nbsp;" : mailInfoRow.get("manager_mail").toString();
				
				logger.info("MPR_NO :: " + mpr_no);
				
				data = new HashMap<String, Object>();
				data.put("company", company);
				data.put("product_name", product_name);
				data.put("po_no", po_no);
				data.put("po_description", po_description);
				data.put("mpr_no", mpr_no);
				data.put("mpr_round", mprRound);
				data.put("mpr_date_1", mpr_date_1);
				data.put("mpr_date_2", mpr_date_2);
				data.put("mpr_date_3", mpr_date_3);
				data.put("mpr_date_4", mpr_date_4);
				data.put("mpr_date_5", mpr_date_5);
				data.put("mpr_date_6", mpr_date_6);
				data.put("mpr_status_1", mpr_status_1);
				data.put("mpr_status_2", mpr_status_2);
				data.put("mpr_status_3", mpr_status_3);
				data.put("mpr_status_4", mpr_status_4);
				data.put("mpr_status_5", mpr_status_5);
				data.put("mpr_status_6", mpr_status_6);
				data.put("manager_mail", manager_mail);
				
				data.put("title", "");

				List<Map<String, String>> personList = schedulerDAO.searchMprPersonList(dataRow); // 수신자 정보
				// Mail 수신자 리스트로 Loop 돌면서 개별 발송
				// TODO: 수신자 List to_list_addr로 일괄 발송
				for(Map<String, String> receiver : personList){
					rowData = new HashMap<String, Object>();
					rowData.put("from_addr", "ews_desm@doosan.com");
					rowData.put("from_nm", "DESM Alarm Service");
					rowData.put("to_addr", receiver.get("mail")); // 수신자 메일주소
					//rowData.put("to_addr", "seunghwan2.jung@doosan.com");

					logger.info("MPR_NO :: " + mpr_no + " - to_addr :: " + receiver.get("mail"));
					
					if(loc.equals("dev")) {
						rowData.put("to_addr", "juneshik.yang@doosan.com");
						rowData.put("USER_AD", "HANBYUL1.LEE");
					}

					rowData.put("data", data); // content 입력

					mailSendList.add(rowData);
				}
				// TODO end
				
				desmService.addMail("DESM_MPR_NOTICE_MAIL", mailList);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
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
	public int saveSchedule(Map<String, Object> paramMap) {
    	this.scriptCheck(paramMap);
		int iRslt = schedulerDAO.saveSchedule(paramMap);
		schedulerMangement.addJob(paramMap);
        return iRslt;
	}

	@Override
	public int deleteSchedule(Map<String, Object> paramMap) {
		int iRslt = schedulerDAO.deleteSchedule(paramMap);
		schedulerMangement.deleteJob(paramMap.get("SCHE_NAME").toString());
        return iRslt;
	}

	@Override
	public int chgStatusSchedule(Map<String, Object> paramMap) {
		try {
			schedulerMangement.chgStatusJob(paramMap.get("SCHE_STATUS").toString(), paramMap.get("SCHE_NAME").toString());
			schedulerDAO.chgStatusSchedule(paramMap);
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
	        return -1;
		}
        return 0;
	}

	@Override
	public List<Map<String, Object>> getHistoryList(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
		return schedulerDAO.getHistoryList(paramMap);
	}

	@Override
	public int saveHistory(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
		return schedulerDAO.saveHistory(paramMap);
	}

	@Override
	public List<Map<String, Object>> getAsyncUser(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
		return schedulerDAO.getAsyncUser(paramMap);
	}

	@Override
	public int updateAsyncUser(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
		return schedulerDAO.updateAsyncUser(paramMap);
	}

	@Override
	public int updateDeniedUser(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
		return schedulerDAO.updateDeniedUser(paramMap);
	}

}

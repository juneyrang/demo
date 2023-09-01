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
package egovframework.desm.service;

import java.util.List;
import java.util.Map;


public interface DesmService {
	public DesmVO chkLogin(Map<String, Object> paramMap) throws Exception;
	
	public List getLeftMenu(Map<String, Object> paramMap);
	
	public List getCheckMenu(Map<String, Object> paramMap);
	
	public List getComCode(Map<String, Object> paramMap);
	
	public List getComDay(Map<String, Object> paramMap);
	
	public int insertUserLog(Map<String, Object> paramMap);
	
	public Map<String, Object> getCodeCombo(Map<String, Object> paramMap);
	
	public List getMenuAuthCheckList(Map<String, Object> paramMap);
	
	public List getInitDefailProject(Map<String, Object> paramMap);
	
	public List getInitDefaultCountry(Map<String, Object> paramMap);
	
	public int addMail(String mailKey, List<Map<String, Object>> mailList) throws Exception;
	
	public int sendFcm(String fcmType, List<Map<String, Object>> mailList) throws Exception;
	
	public int saveDesmServiceLog(Map<String, Object> paramMap);
	
	
	
	
	
	
	

	public List getStatusCardInfo(Map<String, Object> paramMap);

	public List getMyRequestInfo(Map<String, Object> paramMap);
	
	public List getNotice(Map<String, Object> paramMap);
	
	public List getNoticeContents(Map<String, Object> paramMap);
	
	public List selectInvoiceAttach(Map<String, Object> paramMap);

	public List getRealTimeNotice(Map<String, Object> paramMap);
	
	public int setSessionLang(Map<String, Object> paramMap);
	
	public List getOrgList(Map<String, Object> paramMap);
	
	public List getAllUserList(Map<String, Object> paramMap);
	
	public int insertNotice(Map<String, Object> paramMap);
	
	public int deleteNotice(Map<String, Object> paramMap);
	
	public List getIsSubon(Map<String, Object> paramMap);
	
	public String getRedirectLang(Map<String, Object> paramMap);
}

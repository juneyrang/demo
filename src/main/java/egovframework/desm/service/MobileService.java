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


public interface MobileService {

	public Map<String, Object> getMobileLeftMenu(String param) throws Exception;

	public Map<String, Object> getMobileInitDefaultProject(String param) throws Exception;

	public Map<String, Object> getMobileMenuAuthCheckList(String param) throws Exception;

	public Map<String, Object> getMobileToDoList(String param) throws Exception;

	public Map<String, Object> getMobileRsiHeaderList(String param) throws Exception;

	public Map<String, Object> getMobileRsiLineList(String param) throws Exception;

	public int saveAccessTokenDelegate(Map<String, Object> paramMap) throws Exception;

	public Map<String, Object> getAccessToken(String param) throws Exception;

	public Map<String, Object> getMobileMrfHeaderList(String param) throws Exception;

	public Map<String, Object> getMobileMrfLineList(String param) throws Exception;

	public Map<String, Object> saveMobileRsi(String param, Map<String, Object> paramMailMap) throws Exception;

	public Map<String, Object> saveMobileRsiReject(String param, Map<String, Object> paramMailMap) throws Exception;

	public Map<String, Object> saveMobileMrf(String param, Map<String, Object> paramMailMap) throws Exception;

	public Map<String, Object> saveMobileMrfReject(String param, Map<String, Object> paramMailMap) throws Exception;

	public Map<String, Object> getMobileMapList(String param) throws Exception;

	public Map<String, Object> saveMobileMap(String param) throws Exception;

	public Map<String, Object> getMobileQrCodePackageInfo(String param) throws Exception;

	public Map<String, Object> getMobileSearchList(String param) throws Exception;

	public Map<String, Object> getMobileOutgoingList(String param) throws Exception;

	public Map<String, Object> saveMobileOutgoing(String param) throws Exception;

	public Map<String, Object> saveMobileOutgoingList(String param) throws Exception;

	public Map<String, Object> getMobileReturnList(String param) throws Exception;

	public Map<String, Object> saveMobileReturn(String param) throws Exception;

	public Map<String, Object> getMobileCodeList(String param) throws Exception;

	public Map<String, Object> getMobileSubconInfo(String param) throws Exception;

	public Map<String, Object> getMobileMapViewDataList(String param) throws Exception;

	public Map<String, Object> getMobileMapViewDataCnt(String param) throws Exception;

	public Map<String, Object> getAppVersion() throws Exception;

	public Map<String, Object> getMobileDetailItemList(String param) throws Exception;

	public Map<String, Object> getMobileVinaQrCodeDetailItemList(String param) throws Exception;

	public Map<String, Object> getMobileOutgoingReturnList(String param) throws Exception;

	public Map<String, Object> saveMobileDetailItemInfo(String param) throws Exception;

	public Map<String, Object> getMobileShippingStatusList(String param) throws Exception;

	public Map<String, Object> getMobileMprPoList(String param) throws Exception;

	public Map<String, Object> getMobileMprProjectList(String param) throws Exception;

	public Map<String, Object> getMobileMprSupplierList(String param) throws Exception;

	public Map<String, Object> getMobileMprList(String param) throws Exception;

	public Map<String, Object> getMobileMprSupplierAuth(String param) throws Exception;

	public Map<String, Object> saveMobileMapCheck(String param) throws Exception;
	
	public Map<String, Object> getMobileMprDetailList(String param) throws Exception;

	/**
	 * MRR 추가 - 2023.02.16
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> getMobileMrrList(String param) throws Exception;

	public Map<String, Object> getMobileMrrHeaderList(String param) throws Exception;

	public Map<String, Object> getMobileMrrLineList(String param) throws Exception;

	public Map<String, Object> saveMobileMrr(String param, Map<String, Object> paramMailMap) throws Exception;

	public Map<String, Object> saveMobileMrrReject(String param, Map<String, Object> paramMailMap) throws Exception;

	public Map<String, Object> getIdsmOsSummaryMrrMobileList(String param) throws Exception;
	
	public Map<String, Object> saveMobileMrrDelete(String param) throws Exception;
	
	public Map<String, Object> saveMobileMrrLineDelete(String param) throws Exception;
	
	public Map<String, Object> getMobileMrrHeaderAttachList(String param) throws Exception;
	
	public Map<String, Object> getMobileAttachList(String param) throws Exception;
	
	public List<Map<String, Object>> getMobileUserList(String paramString);
	
	public String getMobileAttachGrpCd(String paramString);

}

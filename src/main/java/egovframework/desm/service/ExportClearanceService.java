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

public interface ExportClearanceService {	


	public Map<String, Object> getErpCodeCombo(Map<String, Object> paramMap);
	public List<Map<String, Object>> getUnitCodeList(Map<String, Object> paramMap);
	
	public List getErpProject(Map<String, Object> paramMap);
	public List<Map<String, Object>> getErpProjectDlg(Map<String, Object> paramMap);
	
	public List getErpEpcProject(Map<String, Object> paramMap);
	public List<Map<String, Object>> getErpEpcProjectDlg(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getExportClearance(Map<String, Object> paramMap);

	public List<Map<String, Object>> getSearchExportNo(Map<String, Object> paramMap);
	public List<Map<String, Object>> getSearchExportNoDlg(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getSearchErpInvoiceNo(Map<String, Object> paramMap);
	public List<Map<String, Object>> getSearchErpInvoiceNoDlg(Map<String, Object> paramMap);

	public List<Map<String, Object>> getSearchErpEmployee(Map<String, Object> paramMap);
	public List<Map<String, Object>> getSearchErpEmployeeDlg(Map<String, Object> paramMap);

	public List<Map<String, Object>> getSearchTaskNo(Map<String, Object> paramMap);
	public List<Map<String, Object>> getSearchExchangeType(Map<String, Object> paramMap);
	public List<Map<String, Object>> getSearchPriceTerm(Map<String, Object> paramMap);
	public List<Map<String, Object>> getSearchCurrency(Map<String, Object> paramMap);
	public List<Map<String, Object>> getSearchLicenseNo(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getChargeAccountItem(Map<String, Object> paramMap);
	public List<Map<String, Object>> getCodeCombinationId(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getSearchErpProjectEmp(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getSearchManufacturer(Map<String, Object> paramMap);

	public List<Map<String, Object>> getNewExpHeaderID(Map<String, Object> paramMap);
	public List<Map<String, Object>> getNewExpNo(Map<String, Object> paramMap);
	
	public Map<String, Object> exportValidation(Map<String, Object> paramMap) throws Exception;
	public int saveExportClearance(Map<String, Object> paramMap) throws Exception;
	public int updateExportStatus(Map<String, Object> paramMap) throws Exception;
	public int deleteExportClearance(Map<String, Object> paramMap) throws Exception;
	public int saveExportClearanceFileGrpCd(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> getExportRequestStatus(Map<String, Object> paramMap);
	public int deleteRelatedData(Map<String, Object> paramMap) throws Exception;
	
	//사급PO
	public List<Map<String, Object>> getPOStatus(Map<String, Object> paramMap);
	public List<Map<String, Object>> getPrivatePOList(Map<String, Object> paramMap);
	public int deletePrivatePO(Map<String, Object> paramMap) throws Exception;
	public int savePrivatePO(Map<String, Object> paramMap) throws Exception;
	
	// 전자결재 관련
	public Map<String, Object> getExportReportInfo(Map<String, Object> param);
	public Map<String, Object> setExportApprovalInterface(Map<String, Object> param); // For Test, Guide Code
	public Map<String, Object> getExpFileInfo(Map<String, Object> param);
	// 전자결재 관련 end

}

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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.desm.cmmn.MailSender;
import egovframework.desm.service.ExportClearanceService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.property.EgovPropertyService;
import freemarker.template.TemplateException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service("exportClearanceService")
public class ExportClearanceServiceImpl extends EgovAbstractServiceImpl implements ExportClearanceService {

	private static final Logger LOGGER = LoggerFactory.getLogger(ExportClearanceServiceImpl.class);

	
	@Resource(name = "exportClearanceDAO")
	private ExportClearanceDAO exportClearanceDAO;
	
	@Resource(name = "transShippingInvoiceDAO")
	private TransShippingInvoiceDAO transShippingInvoiceDAO;
	
	@Resource(name = "transShippingRequestDAO")
	private TransShippingRequestDAO transShippingRequestDAO;
	
	@Resource(name="propertiesService")
	protected EgovPropertyService propertiesService;
	
	@Autowired
	protected PlatformTransactionManager txManager;
	
	@Override
    public Map<String, Object> getErpCodeCombo(Map<String, Object> paramMap) {
    	
    	Map<String, Object> reaultMap = new HashMap<String, Object>();
    	JSONArray paramList = JSONArray.fromObject(paramMap.get("paramList").toString());
    	
    	for(int i = 0; i < paramList.size(); i++) {
    		JSONObject obj = (JSONObject)paramList.get(i);
    		Map<String, Object> row = new HashMap<String, Object>();
    		
			row.put("lang", paramMap.get("lang").toString());
    		row.put("LOOKUP_TYPE", obj.get("LOOKUP_TYPE").toString());
    		reaultMap.put(obj.get("LOOKUP_TYPE").toString(), exportClearanceDAO.getErpCodeCombo(row));
    	}   
    	
    	//reaultMap.put("DAY", exportClearanceDAO.getTransComDay(paramMap));
    	
        return reaultMap;
    }
	
    @Override
    public List getUnitCodeList(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getUnitCodeList(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}
        return list;   
    }
	
	
    @Override
    public List getErpProject(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
    	
    	try {
        	list = exportClearanceDAO.getErpProject(paramMap);
        	
        	HashMap<String, Object> map = new HashMap<String, Object>();
        	
        	
        	for (Object el : list) {
        		HashMap<String, String> row = (HashMap)el;
        		
        		map = new HashMap<String, Object>();
        		map.put("label", 
            			row.get("PROJECT_NO").toString() + "&nbsp;&nbsp;" + 
            			row.get("PROJECT_NAME").toString()
            	);
        		map.put("value", 
            			row.get("PROJECT_ID").toString() + "|" +
            			row.get("PROJECT_NO").toString() + "|" +
            			row.get("PROJECT_NAME").toString()  
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
    public List getErpProjectDlg(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getErpProject(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}
        return list;   
    }
    
    @Override
    public List getErpEpcProject(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
    	
    	try {
        	list = exportClearanceDAO.getErpEpcProject(paramMap);
        	
        	HashMap<String, Object> map = new HashMap<String, Object>();
        	
        	
        	for (Object el : list) {
        		HashMap<String, String> row = (HashMap)el;
        		
        		map = new HashMap<String, Object>();
        		map.put("label", 
            			row.get("PROJECT_NO").toString() + "&nbsp;&nbsp;" + 
            			row.get("PROJECT_NAME").toString()
            	);
        		map.put("value", 
            			row.get("PROJECT_ID").toString() + "|" +
            			row.get("PROJECT_NO").toString() + "|" +
            			row.get("PROJECT_NAME").toString()  
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
    public List getErpEpcProjectDlg(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getErpEpcProject(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}
        return list;   
    }    
    
    
    @Override
    public List getExportClearance(Map<String, Object> paramMap) {
    	exportClearanceDAO.updateSetLanguage(null);
    	return exportClearanceDAO.getExportClearance(paramMap);   
    } 

    @Override
    public List getSearchExportNo(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getSearchExportNo(paramMap);
        	
        	HashMap<String, Object> map = new HashMap<String, Object>();
        	
        	for (Object el : list) {
        		HashMap<String, String> row = (HashMap)el;
        		
        		map = new HashMap<String, Object>();
        		map.put("label", 
            			row.get("EXPORT_NO").toString() + "&nbsp;&nbsp;" + 
            			row.get("STATUS").toString() + "&nbsp;&nbsp;" + 
						row.get("EXPORT_HEADER_ID").toString()
            	);
        		map.put("value", 
            			row.get("EXPORT_NO").toString() + "|" +
            			row.get("STATUS").toString() + "|" +
            			row.get("EXPORT_HEADER_ID").toString()  
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
    public List getSearchExportNoDlg(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getSearchExportNo(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}
        return list;   
    }
    
    @Override
    public List getSearchErpInvoiceNo(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getSearchErpInvoiceNo(paramMap);
        	
        	HashMap<String, Object> map = new HashMap<String, Object>();
        	
        	for (Object el : list) {
        		HashMap<String, String> row = (HashMap)el;
        		
        		map = new HashMap<String, Object>();
        		map.put("label", 
            			row.get("INVOICE_NO").toString() + "&nbsp;&nbsp;" + 
            			row.get("EXPORT_NO").toString() + "&nbsp;&nbsp;" + 
            			row.get("STATUS").toString()
            	);
        		map.put("value", 
            			row.get("INVOICE_NO").toString() + "|" +
            			row.get("EXPORT_NO").toString() + "|" +
            			row.get("STATUS").toString()
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
    public List getSearchErpInvoiceNoDlg(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getSearchErpInvoiceNo(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}
        return list;   
    }
    
    @Override
    public List getSearchErpEmployee(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getSearchErpEmployee(paramMap);
        	
        	HashMap<String, Object> map = new HashMap<String, Object>();
        	
        	for (Object el : list) {
        		HashMap<String, String> row = (HashMap)el;
        		
        		map = new HashMap<String, Object>();
        		map.put("label", 
            			row.get("NAME").toString() + "(" + 
            			row.get("EMPLOYEE_NUMBER").toString() + ")&nbsp;&nbsp;" + 
            			row.get("DEPT_NAME").toString()
            	);
        		map.put("value", 
            			row.get("NAME").toString() + "|" +
            			row.get("EMPLOYEE_NUMBER").toString() + "|" +
            			row.get("USER_ID").toString() + "|" +
            			row.get("DEPT_NAME").toString() + "|" +
            			row.get("EMAIL_ADDRESS").toString()
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
    public List getSearchErpEmployeeDlg(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getSearchErpEmployee(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}
        return list;   
    }    

    @Override
    public List getSearchTaskNo(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getSearchTaskNo(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}
        return list;   
    }   
    
    @Override
    public List getSearchExchangeType(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getSearchExchangeType(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}
        return list;   
    }   
    
    @Override
    public List getSearchPriceTerm(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getSearchPriceTerm(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}
        return list;   
    }   
    
    @Override
    public List getSearchCurrency(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getSearchCurrency(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}
        return list;   
    }
    
    @Override
    public List getSearchLicenseNo(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getSearchLicenseNo(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}
        return list;   
    }
    
    @Override
    public List getChargeAccountItem(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getChargeAccountItem(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}
        return list;   
    }
    
    @Override
    public List getCodeCombinationId(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getCodeCombinationId(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}
        return list;   
    }
    
    @Override
    public List getSearchErpProjectEmp(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getSearchErpProjectEmp(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}
        return list;   
    }
    
    @Override
    public List getSearchManufacturer(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getSearchManufacturer(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}
        return list;   
    }
    
    @Override
    public List getNewExpHeaderID(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getNewExpHeaderID(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}
        return list;   
    }    
    
    @Override
    public List getNewExpNo(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getNewExpNo(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}
        return list;   
    }    
    
    @Override
    public Map<String, Object> exportValidation(Map<String, Object> paramMap) throws Exception {
    	Map<String, Object> resultMap = new HashMap<String, Object>();
    	try {
    		// check Invoice No 중복
    		int invoiceNoCnt = exportClearanceDAO.validationInvoiceNoDuplication(paramMap);
    		if(invoiceNoCnt != 0) {
    			resultMap.put("Result", "Fail");
    			resultMap.put("Message", "Invoice No는 중복으로 생성할 수 없습니다.");
    			return resultMap;
    		}
    		
    		resultMap.put("Result", "Success");
    		return resultMap;
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
    }
    
    @Override
    public int saveExportClearance(Map<String, Object> paramMap) throws Exception {
    	
    	int cnt = 0;
    	
    	try {
    		cnt = exportClearanceDAO.saveExportClearance(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }
    
    @Override
    public int updateExportStatus(Map<String, Object> paramMap) throws Exception {
    	
    	int cnt = 0;
    	
    	try {
    		cnt = exportClearanceDAO.updateExportStatus(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }
    
    @Override
    public int saveExportClearanceFileGrpCd(Map<String, Object> paramMap) throws Exception {
    	
    	int cnt = 0;
    	
    	try {
    		cnt = exportClearanceDAO.saveExportClearanceFileGrpCd(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }
    
    @Override
    public int deleteExportClearance(Map<String, Object> paramMap) throws Exception {
    	
    	int cnt = 0;
    	
    	try {
    		cnt = exportClearanceDAO.deleteExportClearance(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }
    
    @Override
    public List getExportRequestStatus(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getExportRequestStatus(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}
        return list;   
    }   
    
    @Override
    public int deleteRelatedData(Map<String, Object> paramMap) throws Exception {
    	
    	int cnt = 0;
    	
    	try {
    		cnt = exportClearanceDAO.deleteRelatedData(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }
    
    //사급PO
    @Override
    public List getPOStatus(Map<String, Object> paramMap)
    {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getPOStatus(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}
        return list;   
    }

    @Override
    public List getPrivatePOList(Map<String, Object> paramMap)
    {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	
    	try {
    		exportClearanceDAO.updateSetLanguage(null);
   			list = exportClearanceDAO.getPrivatePOList(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}
        return list;   
    }
    
    @Override
    public int deletePrivatePO(Map<String, Object> paramMap) throws Exception {
    	
    	int cnt = 0;
    	
    	try {
    		cnt = exportClearanceDAO.deletePrivatePO(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }
    
    @Override
    public int savePrivatePO(Map<String, Object> paramMap) throws Exception {
    	
    	int cnt = 0;
    	
    	try {
    		cnt = exportClearanceDAO.savePrivatePO(paramMap);
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }    
    
    // 전자결재 관련
    /// 전자결재에 사용될 품의서 양식 정보를 가져와서 리턴시켜줌.
    /// showExpDoc.jsp에서 사용
    @Override
    public Map<String, Object> getExportReportInfo(Map<String, Object> param)
    {
    	Map<String, Object> resultMap = new HashMap<String, Object>();
    	
    	exportClearanceDAO.updateSetLanguage(null);
    	Map<String, Object> exportInfo = exportClearanceDAO.getExportReportInfo(param);
    	
    	List<Map<String, Object>> attachList = null;
    	if(exportInfo.get("ATTACH_GRP_CD") != null) attachList = exportClearanceDAO.getExpAttachList(exportInfo);
    	
    	//Map<String, Object> approvalInfo = exportClearanceDAO.getExportApprovalInfo(param);
    	
    	String portalInterface = "";
    	if(propertiesService.getString("location").equals("prod")) {
    		portalInterface = "http://dherp.doosanheavy.com:8018/OA_HTML/dhi/zscm/portal_interface/resultUpdate.jsp"; // 가동계
    		exportInfo.put("CC_USER_ID", "H681608"); // 관리)물류운영팀 최희선 과장 우선 고정
    		exportInfo.put("FILE_URL", "http://dhbppap1.corp.doosan.com:7140/expFileDownload.do?fileId=");
    	}
    	else {
    		portalInterface = "http://10.224.46.195:8029/OA_HTML/dhi/zscm/portal_interface/resultUpdate.jsp"; // DHDEV (DHDEU, 8059)
    		exportInfo.put("CC_USER_ID", "H112475"); // PI/EI 서정훈 차장
    		exportInfo.put("FILE_URL", "http://dhbppdev.corp.doosan.com:7140/expFileDownload.do?fileId=");
    	}

    	resultMap.put("exportInfo", exportInfo);
    	resultMap.put("portalInterface", portalInterface);
    	resultMap.put("attachList", attachList);
    	
    	return resultMap;
    }
    
    /// 결재 상신했을 때 처리되는 부분
    /// ZOAS 테이블에 데이터 넣기 -> 수출통관의뢰 테이블 수정 -> 결재I/F Procedure 호출
    @Override
    public Map<String, Object> setExportApprovalInterface(Map<String, Object> param) {
    	DefaultTransactionDefinition def = new DefaultTransactionDefinition();
    	def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRES_NEW);
    	TransactionStatus status = txManager.getTransaction(def);
    	
    	try {
    		// TODO: param에 들어와야할 정보는 수출통관의뢰 관련 정보, 화면호출시 넘겨받거나, 다시 쿼리해야함
    		
    		// 1. 전자결재 연동 master_sequence_id 생성
        	int masterSequenceId = exportClearanceDAO.getMasterSequenceIdNextval();
        	// 2. Interface관련 정보 전자결재 연동 TABLE에 Insert
        	param.put("MASTER_SEQUENCE_ID", Integer.toString(masterSequenceId));
        	// param.put("CREATED_BY", "");
        	// param.put("EXPORT_HEADER_ID", "");
        	// param.put("EXPORT_NO", "");
        	if(propertiesService.getString("location").equals("prod"))
        		param.put("URL", "http://dhbppap1.corp.doosan.com:7140/showExpDoc.do?exportHeaderId=" + param.get("EXPORT_HEADER_ID").toString()); // 가동계
        	else
        		param.put("URL", "http://dhbppdev.corp.doosan.com:7140/showExpDoc.do?exportHeaderId=" + param.get("EXPORT_HEADER_ID").toString()); // 개발계
        	
        	exportClearanceDAO.insertZoasOtDhnetMaster(param);
        	// 3. Export Header에 master_sequence_id Update
        	// 3. Export 상태 Update
        	param.put("STATUS", "In Process");
        	exportClearanceDAO.updateExportHeader(param);
        	txManager.commit(status);
        	
        	// 4. ZOAS_PORTAL_INTERFACE_PKG.DOC_TRANSFER() 호출
        	param.put("P_DRAFT_TYPE", "EXP");
        	param.put("ERRBUF", "");
        	param.put("RETCODE", 0);
        	exportClearanceDAO.callPortalInterface(param);
        	
    		//txManager.commit(status);
    		System.out.println("[Info][ExportClearanceServiceImpl][setExportApprovalInterface] Success");
    	}
    	catch (Exception e) {
    		System.out.println("[Error][ExportClearanceServiceImpl][setExportApprovalInterface] Error");
    		e.printStackTrace();
    		txManager.rollback(status);
    	}
    	return null;
    }
    
    @Override
    public Map<String, Object> getExpFileInfo(Map<String, Object> param) {
    	return exportClearanceDAO.getExpFileInfo(param);
    }
    // 전자결재 관련 end
}
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

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;



@Repository("exportClearanceDAO")
public class ExportClearanceDAO extends EgovAbstractMapper {
	
	private final String MainMapper = "sql.ExportClearanceMapper";
	
	public int updateSetLanguage(Map<String, Object> paramMap) {
        return update(MainMapper + ".updateSetLanguage",paramMap);
    }
	
    public List getUnitCodeList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getUnitCodeList",paramMap);
    }	
	
    public List getErpCodeCombo(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getErpCodeCombo",paramMap);
    }	

    public List getErpProject(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getErpProject",paramMap);
    }	

    public List getErpEpcProject(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getErpEpcProject",paramMap);
    }	
    
    public List getExportClearance(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getExportClearance",paramMap);	
    }

    public List getSearchExportNo(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getSearchExportNo",paramMap);	
    }

    public List getSearchErpInvoiceNo(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getSearchErpInvoiceNo",paramMap);	
    }
    
    public List getSearchErpEmployee(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getSearchErpEmployee",paramMap);	
    }
    
    
    public List getSearchTaskNo(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getSearchTaskNo",paramMap);	
    }
    
    public List getSearchExchangeType(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getSearchExchangeType",paramMap);	
    }
    
    public List getSearchPriceTerm(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getSearchPriceTerm",paramMap);	
    }   

    public List getSearchCurrency(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getSearchCurrency",paramMap);	
    }
    
    public List getSearchLicenseNo(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getSearchLicenseNo",paramMap);	
    }

    public List getChargeAccountItem(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getChargeAccountItem",paramMap);	
    }
    
    public List getCodeCombinationId(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getCodeCombinationId",paramMap);	
    }
        
    public List getSearchErpProjectEmp(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getSearchErpProjectEmp",paramMap);	
    }
    
    public List getSearchManufacturer(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getSearchManufacturer",paramMap);	
    }
    
    public List getNewExpHeaderID(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getNewExpHeaderID",paramMap);	
    }
    
    public List getNewExpNo(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getNewExpNo",paramMap);	
    }
    
    public int validationInvoiceNoDuplication(Map<String, Object> paramMap) {
    	return selectOne(MainMapper + ".validationInvoiceNoDuplication", paramMap);
    }
    
    public int saveExportClearance(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveExportClearance",paramMap);
    }
    
    public int updateExportStatus(Map<String, Object> paramMap) {
        return update(MainMapper + ".updateExportStatus",paramMap);
    }
        
    public int deleteExportClearance(Map<String, Object> paramMap) {
        return update(MainMapper + ".deleteExportClearance",paramMap);
    }
   
    public int saveExportClearanceFileGrpCd(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveExportClearanceFileGrpCd",paramMap);
    }
    
    public List getExportRequestStatus(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getExportRequestStatus",paramMap);	
    }
    
    public int deleteRelatedData(Map<String, Object> paramMap) {
        return update(MainMapper + ".deleteRelatedData",paramMap);
    }
    
    //사급PO
    public List getPOStatus(Map<String, Object> param) {
    	return selectList(MainMapper + ".getPOStatus", param);
    };
    
    public List getPrivatePOList(Map<String, Object> param) {
    	return selectList(MainMapper + ".getPrivatePOList", param);
    };
        
    public int deletePrivatePO(Map<String, Object> paramMap) {
        return update(MainMapper + ".deletePrivatePO",paramMap);
    }
   
    public int savePrivatePO(Map<String, Object> paramMap) {
        return update(MainMapper + ".savePrivatePO",paramMap);
    }    
    
    // 전자결재 관련
    public Map<String, Object> getExportReportInfo(Map<String, Object> param) {
    	return selectOne(MainMapper + ".getExportReportInfo", param);
    };
    
    public int getMasterSequenceIdNextval() {
    	return selectOne(MainMapper + ".getMasterSequenceIdNextval");
    }
    
    public int insertZoasOtDhnetMaster(Map<String, Object> param) {
    	return insert(MainMapper + ".insertZoasOtDhnetMaster", param);	
    }
    
    public int updateExportHeader(Map<String, Object> param) {
    	return update(MainMapper + ".updateExportHeader", param);
    }
    
    public void callPortalInterface(Map<String, Object> param) {
    	selectOne(MainMapper + ".callPortalInterface", param);
    }
    
    public Map<String, Object> getExpFileInfo(Map<String, Object> param) {
    	return selectOne(MainMapper + ".getExpFileInfo", param);
    }
    
    public List<Map<String, Object>> getExpAttachList(Map<String, Object> param) {
    	return selectList(MainMapper + ".getExpAttachList", param);
    }
    // 전자결재 관련 end
}

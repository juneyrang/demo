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

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;



@Repository("transShippingRequestDAO")
public class TransShippingRequestDAO extends EgovAbstractMapper {
	
	private final String MainMapper = "sql.TransShippingRequestMapper";
	
	
    public int updateShippingRequestSetLanguage(Map<String, Object> paramMap) {
        return update(MainMapper + ".updateShippingRequestSetLanguage",paramMap);
    }
    
    public List getTransShippingRequest(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequest",paramMap);	
    }
    
    public List getTransShippingRequestVendor(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestVendor",paramMap);	
    }
    
    public List getTransShippingRequestVendorPopUp(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestVendorPopUp",paramMap);	
    }
    
    public List getTransShippingRequestDept(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestDept",paramMap);	
    }   
    
    public List getTransShippingRequestDeptPopUp(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestDeptPopUp",paramMap);	
    }       
    
    public List getTransShippingRequestSeq(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestSeq",paramMap);	
    }   
    
    public int saveTransShippingRequestMst(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveTransShippingRequestMst",paramMap);
    }
    
    public List getTransShippingRequestMailEmp(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestMailEmp",paramMap);	
    } 
    
    public int saveTransShippingRequestMailList(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveTransShippingRequestMailList",paramMap);
    }
    
    public int deleteTransShippingRequestMailList(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteTransShippingRequestMailList",paramMap);
    }
    
    public List getTransShippingRequestDlgEditMailList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestDlgEditMailList",paramMap);	
    } 
    
    public List getTransShippingRequestDlgEditPackingDetailList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestDlgEditPackingDetailList",paramMap);	
    }
    
    public int deleteTransShippingRequestPackingList(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteTransShippingRequestPackingList",paramMap);
    }
    
    public int insertTransShippingRequestPackingList(Map<String, Object> paramMap) {
        return insert(MainMapper + ".insertTransShippingRequestPackingList",paramMap);
    }
    
    public List getTransShippingRequestVoyageNo(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestVoyageNo",paramMap);	
    }
    
    public int deleteTransShippingRequestDlgEditMailList(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteTransShippingRequestDlgEditMailList",paramMap);
    }
    
    public int deleteTransShippingRequestDlgEditMst(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteTransShippingRequestDlgEditMst",paramMap);
    }
    
    public int deleteTransShippingRequestDlgEditInvoiceDisconnected(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteTransShippingRequestDlgEditInvoiceDisconnected",paramMap);
    }
    
    public List getTransShippingRequestReceiverMailList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestReceiverMailList",paramMap);	
    }
    
    public List getTransShippingRequestMailContentSr(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestMailContentSr",paramMap);	
    } 
    
    public List getTransShippingRequestMailContentSrInv(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestMailContentSrInv",paramMap);	
    }    
    
    public List getTransShippingRequestMailByMailId(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestMailByMailId",paramMap);	
    } 
    
    public int insertEsamail(Map<String, Object> paramMap) {
        return insert(MainMapper + ".insertEsamail",paramMap);
    }
    
    public List getTransShippingRequestMailById(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestMailById",paramMap);	
    }  
    
    public int updateTransShippingRequestMailSendComplete(Map<String, Object> paramMap) {
        return insert(MainMapper + ".updateTransShippingRequestMailSendComplete",paramMap);
    }    
    
    public List getTransShippingRequestDlgAttList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestDlgAttList",paramMap);	
    }
    
    public int deleteTransShippingRequestDlgAttList(Map<String, Object> paramMap) {
        return update(MainMapper + ".deleteTransShippingRequestDlgAttList",paramMap);
    } 
    
    public List getTransShippingRequestFileCheckGrp(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestFileCheckGrp",paramMap);	
    }
    
    public List getTransShippingRequestFileCheckId(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestFileCheckId",paramMap);	
    }
    
    public int saveTransShippingRequestDlgAttList(Map<String, Object> paramMap) {
        return insert(MainMapper + ".saveTransShippingRequestDlgAttList",paramMap);
    }   
    
    public int saveTransShippingRequestFileGrpCd(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveTransShippingRequestFileGrpCd",paramMap);
    }  
    
    public List getTransShippingRequestIsInvoiceExist(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestIsInvoiceExist",paramMap);	
    }
    
    public int getManualStrategicMyInvCheck(Map<String, Object> paramMap) {
        return selectOne(MainMapper + ".getManualStrategicMyInvCheck",paramMap);	
    }
    
    public List getTransShippingRequestIsInvoiceCheckInfo(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestIsInvoiceCheckInfo",paramMap);	
    }   
    
    public List getTransShippingRequestInvoiceNoId(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestInvoiceNoId",paramMap);	
    }  
    
    public int updateTransShippingRequestMergeInvoiceNo(Map<String, Object> paramMap) {
        return update(MainMapper + ".updateTransShippingRequestMergeInvoiceNo",paramMap);
    }
    
    public int updateTransShippingRequestInvoice(Map<String, Object> paramMap) {
        return update(MainMapper + ".updateTransShippingRequestInvoice",paramMap);
    }
    
    public List getTransShippingRequestInvoiceNoId2(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestInvoiceNoId2",paramMap);	
    }
    
    public int rejectTransShippingRequest(Map<String, Object> paramMap) {
        return update(MainMapper + ".rejectTransShippingRequest",paramMap);
    } 
    
    public int saveTransShippingRequestStrategicMaster(Map<String, Object> paramMap) {
        return insert(MainMapper + ".saveTransShippingRequestStrategicMaster",paramMap);
    } 
    
    public List getTransShippingRequestStrategicMasterSeq(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestStrategicMasterSeq",paramMap);	
    }
    
    public List getTransShippingRequestMstData(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingRequestMstData",paramMap);	
    }
    
    public int saveTransShippingRequestMstStrategicSeq(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveTransShippingRequestMstStrategicSeq",paramMap);
    } 
    
    public int deleteTransShippingRequestDlgEditStrComment(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteTransShippingRequestDlgEditStrComment",paramMap);
    }
    
    public int deleteTransShippingRequestDlgEditStrDetail(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteTransShippingRequestDlgEditStrDetail",paramMap);
    }
    
    public int deleteTransShippingRequestDlgEditStrAtt(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteTransShippingRequestDlgEditStrAtt",paramMap);
    }
    
    public int deleteTransShippingRequestDlgEditStrMst(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteTransShippingRequestDlgEditStrMst",paramMap);
    }    
}

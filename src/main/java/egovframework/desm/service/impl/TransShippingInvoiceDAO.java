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



@Repository("transShippingInvoiceDAO")
public class TransShippingInvoiceDAO extends EgovAbstractMapper {
	
	private final String MainMapper = "sql.TransShippingInvoiceMapper";  
	
    public List getTransShippingInvoice(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingInvoice",paramMap);	
    }
    
    public List getTransShippingInvoiceDlgDetailRequest(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingInvoiceDlgDetailRequest",paramMap);	
    }
    
    public List getTransShippingInvoiceDlgDetailPackingList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingInvoiceDlgDetailPackingList",paramMap);	
    }
    
    public int saveTransShippingInvoiceDlgAttList(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveTransShippingInvoiceDlgAttList",paramMap);
    } 
    
    public List getTransShippingInvoiceMainProject(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingInvoiceMainProject",paramMap);	
    }
    
    public List getTransShippingInvoiceSubProject(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingInvoiceSubProject",paramMap);	
    }    
    
    public List getTransShippingInvoiceMainProjectInfo(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingInvoiceMainProjectInfo",paramMap);	
    }   
    
    public List getTransShippingInvoiceProjectInfo(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingInvoiceProjectInfo",paramMap);	
    }      
    
    public List getTransShippingInvoiceDlgTransRequestMailList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingInvoiceDlgTransRequestMailList",paramMap);	
    }  
    
    public List getTransShippingInvoiceDlgTransRequestInvoiceList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingInvoiceDlgTransRequestInvoiceList",paramMap);	
    }  
    
    public List getTransShippingInvoiceDlgPort(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingInvoiceDlgPort",paramMap);	
    }    
    
    public List getTransShippingInvoiceDuplicateVoyage(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingInvoiceDuplicateVoyage",paramMap);	
    }
    
    public List getTransShippingInvoiceJudanVoyageNo(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingInvoiceJudanVoyageNo",paramMap);	
    }   
    
    public List getTransShippingInvoiceOrderSeq(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingInvoiceOrderSeq",paramMap);	
    }  
    
    public int saveTransShippingInvoiceNewOrder(Map<String, Object> paramMap) {
        return insert(MainMapper + ".saveTransShippingInvoiceNewOrder",paramMap);
    }
    
    public int saveTransShippingInvoiceOrder(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveTransShippingInvoiceOrder",paramMap);
    } 
    
    public int saveTransShippingInvoiceOrderMail(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveTransShippingInvoiceOrderMail",paramMap);
    }  
    
    public List getTransShippingInvoiceVoyageHistory(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingInvoiceVoyageHistory",paramMap);	
    } 
    
    public int saveTransShippingInvoiceVoyageHistory(Map<String, Object> paramMap) {
        return insert(MainMapper + ".saveTransShippingInvoiceVoyageHistory",paramMap);
    }
    
    public List getTransShippingInvoiceMailContentShippingOrder(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingInvoiceMailContentShippingOrder",paramMap);	
    }   
    
    public List getTransShippingInvoiceMailContentSrInv(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingInvoiceMailContentSrInv",paramMap);	
    }  
    
    public List getTransShippingInvoiceOrderReceiver(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingInvoiceOrderReceiver",paramMap);	
    } 
    
    public List getTransShippingInvoiceStrategicCheck(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingInvoiceStrategicCheck",paramMap);	
    } 
    
    public List getTransShippingInvoiceMainProjectInfo2(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingInvoiceMainProjectInfo2",paramMap);	
    }   
    
}

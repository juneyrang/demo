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



@Repository("transShippingOrderViewDAO")
public class TransShippingOrderViewDAO extends EgovAbstractMapper {
	
	private final String MainMapper = "sql.TransShippingOrderViewMapper";  
	
    public List getTransShippingOrderView(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingOrderView",paramMap);	
    }
    
    public List getTransDlgTransRequestInvoiceGridView(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransDlgTransRequestInvoiceGridView",paramMap);	
    }
    
    public List getTransDlgTransRequestMailGridView(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransDlgTransRequestMailGridView",paramMap);	
    }
    
    public List getTransDlgTransRequestInvoiceGridViewMailContent(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransDlgTransRequestInvoiceGridViewMailContent",paramMap);	
    }
    
    public int deleteTransDlgTransRequestMailGridView(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteTransDlgTransRequestMailGridView",paramMap);
    }
    
    public int deleteTransDlgTransRequestMailGridViewInInvoice(Map<String, Object> paramMap) {
        return update(MainMapper + ".deleteTransDlgTransRequestMailGridViewInInvoice",paramMap);
    }
    
    public int deleteTransDlgTransRequestMailGridViewMail(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteTransDlgTransRequestMailGridViewMail",paramMap);
    }  
    
    public List getTransShippingOrderViewPackage(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransShippingOrderViewPackage",paramMap);	
    }
}

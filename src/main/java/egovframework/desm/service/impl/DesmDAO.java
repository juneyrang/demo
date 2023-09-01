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

import egovframework.desm.service.DesmVO;
import egovframework.rte.psl.dataaccess.EgovAbstractMapper;



@Repository("desmDAO")
public class DesmDAO extends EgovAbstractMapper {

	private final String MainMapper = "sql.DesmMapper";
    
	public DesmVO chkLogin(Map<String, Object> paramMap) throws Exception {
		return (DesmVO) selectOne(MainMapper + ".chkLogin", paramMap);
	}
	
    public List getLeftMenu(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getLeftMenu",paramMap);
    }	
	
    public List getCheckMenu(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getCheckMenu",paramMap);
    }	
	
    public List getComCode(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getComCode",paramMap);
    }	
    
    public List getComDay(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getComDay",paramMap);
    }    
	
    public int insertUserLog(Map<String, Object> paramMap) {
        return insert(MainMapper + ".insertUserLog",paramMap);
    }
	
    public List getMenuAuthCheckList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getMenuAuthCheckList",paramMap);
    }  	
	
    public List getInitDefailProject(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getInitDefailProject",paramMap);
    }  	    
    
    public List getInitDefaultCountry(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getInitDefaultCountry",paramMap);
    }  
	
    public List getMailByMailId(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getMailByMailId",paramMap);
    }  	     
	
    public int insertEsamail(Map<String, Object> paramMap) {
        return insert(MainMapper + ".insertEsamailData",paramMap);
    }
	
    public List getMailById(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getMailById",paramMap);
    }  
    
    public int updateMailSendComplete(Map<String, Object> paramMap) {
        return update(MainMapper + ".updateMailSendComplete",paramMap);
    }
	
    public List getfcmToken(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getfcmToken",paramMap);
    }  
    
    public int saveDesmServiceLog(Map<String, Object> paramMap) {
        return insert(MainMapper + ".saveDesmServiceLog",paramMap);
    }
    
    
    
	
	
	
    public List getStatusCardInfo(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getStatusCardInfo",paramMap);
    }
    
    public List getMyRequestInfo(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getMyRequestInfo",paramMap);
    }
    
    public List getNotice(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getNotice",paramMap);
    }
    
    public List getNoticeContents(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getNoticeContents",paramMap);
    }

    public List selectInvoiceAttach(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".selectInvoiceAttach",paramMap);
    }

    public List getRealTimeNotice(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getRealTimeNotice",paramMap);
    }
    
    public int setSessionLang(Map<String, Object> paramMap) {
        return update(MainMapper + ".setSessionLang",paramMap);
    }
    
    public List getOrgList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getOrgList",paramMap);
    }
    
    public List getAllUserList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getAllUserList",paramMap);
    }
    
    public int insertNotice(Map<String, Object> paramMap) {
        return insert(MainMapper + ".insertNotice",paramMap);
    }
    
    public int deleteNotice(Map<String, Object> paramMap) {
        return update(MainMapper + ".deleteNotice",paramMap);
    }
    
    public List getComUser(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getComUser",paramMap);
    }
    
    public List getIsSubon(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getIsSubon",paramMap);
    }
    
    public String getRedirectLang(Map<String, Object> paramMap) {
    	return selectOne(MainMapper + ".getRedirectLang",paramMap);
    }
}

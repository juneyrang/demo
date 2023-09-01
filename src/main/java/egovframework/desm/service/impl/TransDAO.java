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



@Repository("transDAO")
public class TransDAO extends EgovAbstractMapper {

	
	private final String MainMapper = "sql.TransMapper";
	
	
    public List getTransCodeCombo(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransCodeCombo",paramMap);
    }	
    
    public List getTransComDay(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransComDay",paramMap);
    } 	
    
    public List chkUser(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".chkUser",paramMap);	
    } 
    
    public int updateTransSetLanguage(Map<String, Object> paramMap) {
        return update(MainMapper + ".updateTransSetLanguage",paramMap);
    }
    
    public List getTransProject(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransProject",paramMap);	
    }
    
    public List getTransSRProject(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransSRProject",paramMap);	
    }
    
    public List getTransVendorProject(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTransVendorProject",paramMap);	
    }
    
    public List<Map<String, Object>> geTransFileById(Map<String, Object> paramMap) {    	
        return selectList(MainMapper + ".geTransFileById",paramMap);	
    }   
    
}

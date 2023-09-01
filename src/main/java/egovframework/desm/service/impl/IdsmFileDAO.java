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



@Repository("idsmFileDAO")
public class IdsmFileDAO extends EgovAbstractMapper {
	

	
	private final String MainMapper = "sql.IdsmFileMapper";	
	
    public List<Map<String, Object>> getIdsmSetupDlgItemScheduleFile(Map<String, Object> paramMap) {    	
        return selectList(MainMapper + ".getIdsmSetupDlgItemScheduleFile",paramMap);	
    }
    
    public List<Map<String, Object>> getIdsmSetupDlgItemScheduleFileById(Map<String, Object> paramMap) {    	
        return selectList(MainMapper + ".getIdsmSetupDlgItemScheduleFileById",paramMap);	
    }    
    
    public int deleteIdsmSetupDlgItemScheduleFile(Map<String, Object> paramMap) {    	
        return update(MainMapper + ".deleteIdsmSetupDlgItemScheduleFile",paramMap);	
    } 
    
    public int saveIdsmSetupDlgItemScheduleFile(Map<String, Object> paramMap) {    	
        return update(MainMapper + ".saveIdsmSetupDlgItemScheduleFile",paramMap);	
    }   
    
    public List<Map<String, Object>> getIdsmSetupDlgItemScheduleFileCheckGrp(Map<String, Object> paramMap) {    	
        return selectList(MainMapper + ".getIdsmSetupDlgItemScheduleFileCheckGrp",paramMap);	
    }
    
    public List<Map<String, Object>> getIdsmSetupDlgItemScheduleFileCheckId(Map<String, Object> paramMap) {    	
        return selectList(MainMapper + ".getIdsmSetupDlgItemScheduleFileCheckId",paramMap);	
    }
}

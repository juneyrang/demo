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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.desm.service.IdsmFileService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("idsmFileService")
public class IdsmFileServiceImpl extends EgovAbstractServiceImpl implements IdsmFileService {

	private static final Logger LOGGER = LoggerFactory.getLogger(IdsmFileServiceImpl.class);
	
	@Resource(name = "idsmFileDAO")
	private IdsmFileDAO idsmFileDAO;

    @Override
    public List<Map<String, Object>> getIdsmSetupDlgItemScheduleFile(Map<String, Object> paramMap) {    	
        return idsmFileDAO.getIdsmSetupDlgItemScheduleFile(paramMap); 
    }
    
    @Override
    public List<Map<String, Object>> getIdsmSetupDlgItemScheduleFileById(Map<String, Object> paramMap) {    	
        return idsmFileDAO.getIdsmSetupDlgItemScheduleFileById(paramMap); 
    }   
    
    @Override
    public int deleteIdsmSetupDlgItemScheduleFile(Map<String, Object> paramMap) {    	
        return idsmFileDAO.deleteIdsmSetupDlgItemScheduleFile(paramMap); 
    } 
    
    @Override
    public int saveIdsmSetupDlgItemScheduleFile(Map<String, Object> paramMap) {    	
        return idsmFileDAO.saveIdsmSetupDlgItemScheduleFile(paramMap); 
    }  
    
    @Override
    public List<Map<String, Object>> getIdsmSetupDlgItemScheduleFileCheckGrp(Map<String, Object> paramMap) {    	
        return idsmFileDAO.getIdsmSetupDlgItemScheduleFileCheckGrp(paramMap); 
    }
    
    @Override
    public List<Map<String, Object>> getIdsmSetupDlgItemScheduleFileCheckId(Map<String, Object> paramMap) {    	
        return idsmFileDAO.getIdsmSetupDlgItemScheduleFileCheckId(paramMap); 
    }
}

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
import java.util.Set;
import java.util.UUID;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.desm.cmmn.MailSender;
import egovframework.desm.service.AttachService;
import egovframework.desm.service.TransShippingRequestService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import freemarker.template.TemplateException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service("attachService")
public class AttachServiceImpl extends EgovAbstractServiceImpl implements AttachService {

	private static final Logger LOGGER = LoggerFactory.getLogger(TransShippingRequestServiceImpl.class);

	
	@Resource(name = "attachDAO")
	private AttachDAO attachDAO;

    @Override
    public List getAttachList(Map<String, Object> paramMap) {
		
		return attachDAO.getAttachList(paramMap);   
    }  
    
    @Override
    public int deleteAttachList(Map<String, Object> paramMap) throws Exception {
    	
    	int cnt = 0;
    	try {
			
			cnt = attachDAO.deleteAttachList(paramMap);
					
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }
    
    @Override
    public List getFileCheckGrp(Map<String, Object> paramMap) {
		
		return attachDAO.getFileCheckGrp(paramMap);   
    } 
    
    @Override
    public List getFileCheckId(Map<String, Object> paramMap) {
		
		return attachDAO.getFileCheckId(paramMap);   
    }  
    
    @Override
    public int saveAttachList(Map<String, Object> paramMap) throws Exception {
    	
    	int cnt = 0;
    	try {
			
			cnt = attachDAO.saveAttachList(paramMap);
					
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }
    
    @Override
    public List<Map<String, Object>> getFileById(Map<String, Object> paramMap) {    	
        return attachDAO.getFileById(paramMap); 
    }
}



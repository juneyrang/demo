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
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.desm.cmmn.MailSender;
import egovframework.desm.service.TransService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import freemarker.template.TemplateException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service("transService")
public class TransServiceImpl extends EgovAbstractServiceImpl implements TransService {

	private static final Logger LOGGER = LoggerFactory.getLogger(TransServiceImpl.class);

	
	@Resource(name = "transDAO")
	private TransDAO transDAO;
	
	
    @Override
    public Map<String, Object> getTransCodeCombo(Map<String, Object> paramMap) {
    	
    	Map<String, Object> reaultMap = new HashMap<String, Object>();
    	JSONArray paramList = JSONArray.fromObject(paramMap.get("paramList").toString());
    	
    	for(int i = 0; i < paramList.size(); i++) {
    		JSONObject obj = (JSONObject)paramList.get(i);
    		Map<String, Object> row = new HashMap<String, Object>();
    		
    		row.put("lang", paramMap.get("lang").toString());
    		row.put("CODE", obj.get("CODE").toString());
    		
    		reaultMap.put(obj.get("CODE").toString(), transDAO.getTransCodeCombo(row));
    	}   
    	
    	reaultMap.put("DAY", transDAO.getTransComDay(paramMap));
    	
        return reaultMap;
    }		
	
	
    @Override
    public List chkUser(Map<String, Object> paramMap) {
        return transDAO.chkUser(paramMap);
    }
    
    @Override
    public List getTransProject(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
    	
    	try {
    		transDAO.updateTransSetLanguage(null);
    		
    		String favorite = null;
    		String menu_name = null;
    		String prj_role_cd = (String)paramMap.get("TRANS_PRJ_ROLE_CD");
    		String vd_cd = (String)paramMap.get("TRANS_VD_CD");
    		String bg_code = (String)paramMap.get("TRANS_BG_CODE");
    		
    		if(favorite != null && favorite.equals("Y")) {
    			
    		}
    		else if(prj_role_cd.equals("A")) { // 관리자
    			
    			list = transDAO.getTransProject(paramMap);
    		}
    		else if(prj_role_cd.equals("S")) {
    			if((menu_name != null) && (menu_name.equals("ShippingActDetail"))) {
    				
    				list = transDAO.getTransSRProject(paramMap);
    			}	
    			else {
    				
    				list = transDAO.getTransProject(paramMap);
    			}	    			
    		}
    		else if(prj_role_cd.equals("V")) {
    			if(vd_cd != null && vd_cd != "") {
    				paramMap.put("TRANS_VD_CD", vd_cd);
    			}
    			
    			list = transDAO.getTransVendorProject(paramMap);
    		}
    		else if(prj_role_cd.equals("P")) {
    			if(bg_code.equals("J00")) {
    				paramMap.put("TRANS_BG_CODE", bg_code);    				
    			}
    			list = transDAO.getTransProject(paramMap);
    				    			
    		}
        	
        	
        	HashMap<String, Object> map = new HashMap<String, Object>();
        	
        	
        	for (Object el : list) {
        		HashMap<String, String> row = (HashMap)el;
        		
        		map = new HashMap<String, Object>();
        		map.put("label", 
            			row.get("PROJECT_CODE").toString() + "&nbsp;&nbsp;" + 
            			row.get("PROJECT_DESC").toString()
            	);
        		map.put("value", 
            			row.get("PROJECT_ID").toString() + "|" +
            			row.get("PROJECT_CODE").toString() + "|" +
            			row.get("PROJECT_DESC").toString()  
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
    public List getTransDlgProject(Map<String, Object> paramMap) {
    	List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	
    	
    	try {
    		transDAO.updateTransSetLanguage(null);
    		
    		String favorite = null;
    		String menu_name = null;
    		String prj_role_cd = (String)paramMap.get("TRANS_PRJ_ROLE_CD");
    		String vd_cd = (String)paramMap.get("TRANS_VD_CD");
    		String bg_code = (String)paramMap.get("TRANS_BG_CODE");
    		
    		if(favorite != null && favorite.equals("Y")) {
    			
    		}
    		else if(prj_role_cd.equals("A")) { // 관리자
    			
    			list = transDAO.getTransProject(paramMap);
    		}
    		else if(prj_role_cd.equals("S")) {
    			if((menu_name != null) && (menu_name.equals("ShippingActDetail"))) {
    				
    				list = transDAO.getTransSRProject(paramMap);
    			}	
    			else {
    				
    				list = transDAO.getTransProject(paramMap);
    			}	    			
    		}
    		else if(prj_role_cd.equals("V")) {
    			if(vd_cd != null && vd_cd != "") {
    				paramMap.put("TRANS_VD_CD", vd_cd);
    			}
    			
    			list = transDAO.getTransVendorProject(paramMap);
    		}
    		else if(prj_role_cd.equals("P")) {
    			if(bg_code.equals("J00")) {
    				paramMap.put("TRANS_BG_CODE", bg_code);    				
    			}
    			list = transDAO.getTransProject(paramMap);
    				    			
    		}
        	    		
    	}
    	catch (Exception e) {
    		System.out.println("!!!!" + e.toString());
		}
  	
    	
        return list;   
    }   
    
    @Override
    public List<Map<String, Object>> geTransFileById(Map<String, Object> paramMap) {    	
        return transDAO.geTransFileById(paramMap); 
    } 
 
}

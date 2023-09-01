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

import egovframework.desm.service.ManageService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("manageService")
public class ManageServiceImpl extends EgovAbstractServiceImpl implements ManageService {

	private static final Logger LOGGER = LoggerFactory.getLogger(ManageServiceImpl.class);

	
	@Resource(name = "manageDAO")
	private ManageDAO manageDAO;

	

    @Override
    public List selectOperatorList(Map<String, Object> paramMap) {
        return manageDAO.selectOperatorList(paramMap);
    }
    
    @Override
    public int saveOperatorInfo(Map<String, Object> paramMap) {
        return manageDAO.saveOperatorInfo(paramMap);
    }
    
    @Override
    public int deleteOperatorInfo(Map<String, Object> paramMap) {
        return manageDAO.deleteOperatorInfo(paramMap);
    }    
}

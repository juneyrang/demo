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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.desm.cmmn.MailSender;
import egovframework.desm.cmmn.firebase.FirebaseService;
import egovframework.desm.service.DashboardService;
import egovframework.desm.service.DesmService;
import egovframework.desm.service.DesmVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import freemarker.template.TemplateException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


@Service("dashboardService")
public class DashboardServiceImpl extends EgovAbstractServiceImpl implements DashboardService {

	private static final Logger logger = LoggerFactory.getLogger(DashboardServiceImpl.class);
	
	
	@Resource(name = "dashboardDAO")
	private DashboardDAO dashboardDAO;

    @Override
    public List getPackageSummary(Map<String, Object> paramMap) {
        return dashboardDAO.getPackageSummary(paramMap);
    }

    @Override
    public List getMrrChartSummary(Map<String, Object> paramMap) {
        return dashboardDAO.getMrrChartSummary(paramMap);
    }

    @Override
    public List getMirChartSummary(Map<String, Object> paramMap) {
        return dashboardDAO.getMirChartSummary(paramMap);
    }
}

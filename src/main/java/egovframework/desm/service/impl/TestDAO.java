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

@Repository("testDAO")
public class TestDAO extends EgovAbstractMapper {	
	private final String MainMapper = "sql.TestMapper";
	
	public int updateSetLanguage(Map<String, Object> paramMap) {
        return update(MainMapper + ".updateSetLanguage",paramMap);
    }
	
	public List getTestGridView(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTestGridView",paramMap);	
    }
	
	public List getTestDataList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTestDataList",paramMap);	
    }
	
	public Map<String, Object> getContentSupplySummary(Map<String, Object> paramMap) {
		return selectOne(MainMapper + ".getContentSupplySummary", paramMap);
	}
	
	public List<Map<String, Object>> getMailSupplySummaryReceeiver(Map<String, Object> paramMap) {
		return selectList(MainMapper + ".getMailSupplySummaryReceeiver", paramMap);
	}
	
	public List getTestTable(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTestTable",paramMap);	
    }
	
	public int saveDesmTestTableFileGrpCd(Map<String, Object> paramMap) {
		return update(MainMapper + ".saveDesmTestTableFileGrpCd",paramMap);

	}
}

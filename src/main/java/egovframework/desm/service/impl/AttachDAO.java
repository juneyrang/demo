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

@Repository("attachDAO")
public class AttachDAO extends EgovAbstractMapper {
	
	private final String MainMapper = "sql.AttachMapper";
	
	public List getAttachList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getAttachList",paramMap);
    }
	
	public int deleteAttachList(Map<String, Object> paramMap) {
        return update(MainMapper + ".deleteAttachList",paramMap);
    }
	
	public List getFileCheckGrp(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getFileCheckGrp",paramMap);	
    }
	
	public List getFileCheckId(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getFileCheckId",paramMap);	
    }
	
	public int saveAttachList(Map<String, Object> paramMap) {
        return insert(MainMapper + ".saveAttachList",paramMap);
    }
	
	public List<Map<String, Object>> getFileById(Map<String, Object> paramMap) {    	
        return selectList(MainMapper + ".getFileById",paramMap);	
    }
}

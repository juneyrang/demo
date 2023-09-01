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
package egovframework.desm.service;

import java.util.List;
import java.util.Map;


public interface AdminService {

	public List getMenu(Map<String, Object> paramMap);

	public int insertMenu(Map<String, Object> paramMap);

	public int insertMenuAuth(Map<String, Object> paramMap);

	public int deleteMenu(Map<String, Object> paramMap);

	public int deleteMenuAuth(Map<String, Object> paramMap);

	public int insertPermission(Map<String, Object> paramMap);

	public List getPermission(Map<String, Object> paramMap);

	public List getMenuAuthList(Map<String, Object> paramMap);

	public int deletePermission(Map<String, Object> paramMap);

	public int insertPermissionMenu(Map<String, Object> paramMap);

	public int insertPermissionMenuAuth(Map<String, Object> paramMap);

	public List getPermissionMenu(Map<String, Object> paramMap);

	public List getMenuAuthUseList(Map<String, Object> paramMap);

	public List getUser(Map<String, Object> paramMap);

	public List getUserCheckList(Map<String, Object> paramMap);

	public int insertUser(Map<String, Object> paramMap) throws Exception ;

	public int deleteUser(Map<String, Object> paramMap);

	public List getUserPermission(Map<String, Object> paramMap);

	public int insertUserPermission(Map<String, Object> paramMap);

	public List getCode(Map<String, Object> paramMap);

	public int insertCode(Map<String, Object> paramMap);

	public List getCodeDetail(Map<String, Object> paramMap);

	public int insertCodeDetail(Map<String, Object> paramMap);

	public List getTest(Map<String, Object> paramMap);

	public Map<String, Object> saveDesmPwdChange(Map<String, Object> paramMap) throws Exception;

	public List getDesmDefaultProject(Map<String, Object> paramMap);

	public int saveDesmDefaultProjectSave(Map<String, Object> paramMap);

	public int initDesmPwd(Map<String, Object> paramMap) throws Exception;

	public List getDesmDefaultCountry(Map<String, Object> paramMap);

	public int saveDesmDefaultCountrySave(Map<String, Object> paramMap);

	public int sendFcmRole(Map<String, Object> paramMap) throws Exception;

	public int updateUserPwNull(Map<String, Object> paramMap) throws Exception;

	public List getMail(Map<String, Object> paramMap) throws Exception;

	public List getProjectSupplyScope(Map<String, Object> paramMap) throws Exception;

	int insertMail(Map<String, Object> paramMap) throws Exception;

	public Map<String, Object> mailSend(Map<String, Object> paramMap) throws Exception;

	public Map<String, Object> mailSendUser(Map<String, Object> paramMap) throws Exception;

	public int deleteMail(Map<String, Object> paramMap);

	public List getMaterialSetup(Map<String, Object> paramMap) throws Exception;
	
	int saveMaterialSetup(Map<String, Object> paramMap) throws Exception;
	
	public int deleteMaterialSetup(Map<String, Object> paramMap);
}

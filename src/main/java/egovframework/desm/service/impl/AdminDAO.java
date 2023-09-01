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

import org.springframework.stereotype.Repository;

import egovframework.desm.service.DesmVO;
import egovframework.rte.psl.dataaccess.EgovAbstractMapper;



@Repository("adminDAO")
public class AdminDAO extends EgovAbstractMapper {

	private final String MainMapper = "sql.AdminMapper";

    public List getMenu(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getMenu",paramMap);
    }

    public int insertMenu(Map<String, Object> paramMap) {
        return insert(MainMapper + ".insertMenu",paramMap);
    }

    public int insertMenuAuth(Map<String, Object> paramMap) {
        return insert(MainMapper + ".insertMenuAuth",paramMap);
    }

    public int deleteMenu(Map<String, Object> paramMap) {
        return update(MainMapper + ".deleteMenu",paramMap);
    }

    public int deleteMenuAuth(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteMenuAuth",paramMap);
    }

    public int insertPermission(Map<String, Object> paramMap) {
        return insert(MainMapper + ".insertPermission",paramMap);
    }

    public List getPermission(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getPermission",paramMap);
    }

    public List getMenuAuthList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getMenuAuthList",paramMap);
    }

    public int deletePermission(Map<String, Object> paramMap) {
        return update(MainMapper + ".deletePermission",paramMap);
    }

    public int insertPermissionMenu(Map<String, Object> paramMap) {
        return insert(MainMapper + ".insertPermissionMenu",paramMap);
    }

    public int insertPermissionMenuAuth(Map<String, Object> paramMap) {
        return insert(MainMapper + ".insertPermissionMenuAuth",paramMap);
    }

    public int deletePermissionMenu(Map<String, Object> paramMap) {
        return update(MainMapper + ".deletePermissionMenu",paramMap);
    }

    public int deletePermissionMenuAuth(Map<String, Object> paramMap) {
        return update(MainMapper + ".deletePermissionMenuAuth",paramMap);
    }

    public List getPermissionMenu(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getPermissionMenu",paramMap);
    }

    public List getMenuAuthUseList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getMenuAuthUseList",paramMap);
    }

    public List getUser(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getUser",paramMap);
    }

    public List getUserCheckList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getUserCheckList",paramMap);
    }

    public int insertUser(Map<String, Object> paramMap) {
        return insert(MainMapper + ".insertUser",paramMap);
    }

    public int deleteUser(Map<String, Object> paramMap) {
        return update(MainMapper + ".deleteUser",paramMap);
    }

    public List getUserPermission(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getUserPermission",paramMap);
    }

    public int deleteUserPermission(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteUserPermission",paramMap);
    }

    public int insertUserPermission(Map<String, Object> paramMap) {
        return insert(MainMapper + ".insertUserPermission",paramMap);
    }

    public List getCode(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getCode",paramMap);
    }

    public int insertCode(Map<String, Object> paramMap) {
        return insert(MainMapper + ".insertCode",paramMap);
    }

    public List getCodeDetail(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getCodeDetail",paramMap);
    }

    public int insertCodeDetail(Map<String, Object> paramMap) {
        return insert(MainMapper + ".insertCodeDetail",paramMap);
    }

    public List getTest(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getTest",paramMap);
    }

    public int updatePwdUser(Map<String, Object> paramMap) {
        return update(MainMapper + ".updatePwdUser",paramMap);
    }

    public int updatePwdEditYn(Map<String, Object> paramMap) {
        return update(MainMapper + ".updatePwdEditYn",paramMap);
    }

    public List getDesmDefaultProject(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getDesmDefaultProject",paramMap);
    }

    public List getDesmDefaultCountry(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getDesmDefaultCountry",paramMap);
    }

    public int deleteDesmDefaultProject(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteDesmDefaultProject",paramMap);
    }

    public int saveDesmDefaultProject(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveDesmDefaultProject",paramMap);
    }

    public int deleteDesmDefaultCountry(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteDesmDefaultCountry",paramMap);
    }

    public int saveDesmDefaultCountry(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveDesmDefaultCountry",paramMap);
    }

    public List getRolefcmToken(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getRolefcmToken",paramMap);
    }

    public int updateUserPwNull(Map<String, Object> paramMap) {
        return update(MainMapper + ".updateUserPwNull",paramMap);
    }

    public List getMail(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getMail",paramMap);
    }

    public List getMailLower(Map<String, Object> paramMap) {
    	return selectList(MainMapper + ".getMailLower",paramMap);
    }

    public List getProjectSupplyScope(Map<String, Object> paramMap) {
    	return selectList(MainMapper + ".getProjectSupplyScope",paramMap);
    }

	public int insertMail(Map<String, Object> paramMap) {
		return insert(MainMapper + ".insertMail",paramMap);
	}

	public List mailList(Map<String, String> paramMap) {
		return selectList(MainMapper + ".mailList",paramMap);
	}

	public int deleteMail(Map<String, Object> paramMap) {
		return delete(MainMapper + ".deleteMail",paramMap);
	}

	public List mailReceiverList(Map<String, String> paramMap) {
		return selectList(MainMapper + ".mailReceiverList",paramMap);
	}

	public List<Map<String, Object>> teamList(Map<String, String> paramMap) {
		return selectList(MainMapper + ".teamList",paramMap);
	}

	public List<Map<String, Object>> l1ItemList(Map<String, String> paramMap) {
		return selectList(MainMapper + ".l1ItemList",paramMap);
	}
	
	public List getMaterialSetup(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getMaterialSetup",paramMap);
    }
	
	public int saveMaterialSetup(Map<String, Object> paramMap) {
		return insert(MainMapper + ".saveMaterialSetup",paramMap);
	}
	
	public int deleteMaterialSetup(Map<String, Object> paramMap) {
		return delete(MainMapper + ".deleteMaterialSetup",paramMap);
	}
}

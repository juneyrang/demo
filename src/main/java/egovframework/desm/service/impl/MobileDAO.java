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



@Repository("mobileDAO")
public class MobileDAO extends EgovAbstractMapper {
	
	
	private final String MainMapper = "sql.MobileMapper";
	
    public List getLeftMenu(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getLeftMenu",paramMap);	
    }
    
    public List getMenuAuthCheckList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMenuAuthCheckList",paramMap);	
    }
    
    public List getMobileToDoList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileToDoList",paramMap);	
    }
    
    public List getMobileRsiHeaderList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileRsiHeaderList",paramMap);	
    }
    
    public List getMobileRsiLineList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileRsiLineList",paramMap);	
    }
    
    public int insertAccessTokenDelegate(Map<String, Object> paramMap) {
        return insert(MainMapper + ".insertAccessTokenDelegate", paramMap);
    }
    
    public Map<String, Object> selectAccessToken(Map<String, Object> paramMap) {
    	return selectOne(MainMapper + ".selectAccessToken", paramMap);
    }
    
    public List getMobileMrfHeaderList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileMrfHeaderList",paramMap);	
    }
    
    public List getMobileMrfLineList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileMrfLineList",paramMap);	
    }
    
    public int saveMobileRsi(Map<String, Object> paramMap) {
        return insert(MainMapper + ".saveMobileRsi", paramMap);
    }
    
    public int saveMobileMrf(Map<String, Object> paramMap) {
        return insert(MainMapper + ".saveMobileMrf", paramMap);
    }    
    
    public List getMobileQrCodePackageInfo(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileQrCodePackageInfo",paramMap);	
    }
    
    public List getMobileQrCodeDetailItemInfo(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileQrCodeDetailItemInfo",paramMap);	
    }
    
    public List getMobileSearchRsiList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileSearchRsiList",paramMap);	
    }   
    
    public List getMobileSearchMrfList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileSearchMrfList",paramMap);	
    }  
    
    public List getMobileSearchSummaryList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileSearchSummaryList",paramMap);	
    }  
    
    public List getMobileSearchDetailList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileSearchDetailList",paramMap);	
    }  
    
    public List getMobileOutgoingList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileOutgoingList",paramMap);	
    }   
    
    public List getMobileReturnList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileReturnList",paramMap);	
    }    
    
    public List getMobileCodeList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileCodeList",paramMap);	
    }   
    
    public List getMobileSubconInfo(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileSubconInfo",paramMap);	
    }
    
    public Map<String, Object> getAppVersion() {
    	return selectOne(MainMapper + ".getAppVersion");
    } 
    
    public List getMobileDetailItemList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileDetailItemList",paramMap);	
    }
    
    public List<Map<String, Object>> getMobileVinaQrCodeDetailItemList(Map<String, Object> paramMap) {
    	return selectList(MainMapper + ".getMobileVinaQrCodeDetailItemList", paramMap);
    }
   
	public List<Map<String, Object>> getDesmDesmMapLocationSummaryCnt(Map<String, Object> paramMap) {
		return selectList(MainMapper + ".getDesmDesmMapLocationSummaryCnt", paramMap);
	}
	
	public List<Map<String, Object>> getDesmDesmMapLocationDetailCnt(Map<String, Object> paramMap) {
		return selectList(MainMapper + ".getDesmDesmMapLocationDetailCnt", paramMap);
	}
	
	public List<Map<String, Object>> getDesmDesmMapLocationSummaryList(Map<String, Object> paramMap) {
		return selectList(MainMapper + ".getDesmDesmMapLocationSummaryList", paramMap);
	}
	
	public List<Map<String, Object>> getDesmDesmMapLocationDetailList(Map<String, Object> paramMap) {
		return selectList(MainMapper + ".getDesmDesmMapLocationDetailList", paramMap);
	}
	
	public List<Map<String, Object>> getMobileOutgoingReturnList(Map<String, Object> paramMap) {
		return selectList(MainMapper + ".getMobileOutgoingReturnList", paramMap);
	}
	
    public List getMobileShippingStatusList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileShippingStatusList",paramMap);	
    }
    
    public List getMobileMprPoList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileMprPoList",paramMap);	
    }
    
    public List getMobileMprProjectList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileMprProjectList",paramMap);	
    }
    
    public List getMobileMprSupplierList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileMprSupplierList",paramMap);	
    }
    
    public List getMobileMprList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileMprList",paramMap);	
    }
    
    public List getMobileMprDetailHeaderList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileMprDetailHeaderList",paramMap);	
    }

    public List getMobileMprDetailSummaryList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileMprDetailSummaryList",paramMap);	
    }
    
    public List getMobileMprDetailNoteList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileMprDetailNoteList",paramMap);	
    }
    
    public List getMobileMprDetailRemarksList(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileMprDetailRemarksList",paramMap);	
    }    

	/**
	 * MRR 추가 - 2023.02.16
	 * @param param
	 * @return
	 * @throws Exception
	 */
    public List getMobileMrrList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getMobileMrrList",paramMap);	
    }
    
	public List<Map<String, Object>> getMobileMrrHeaderList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getMobileMrrHeaderList",paramMap);	
	}

	public List<Map<String, Object>> getMobileMrrLineList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getMobileMrrLineList",paramMap);	
	}

    public int saveMobileMrrHeaderSave(Map<String, Object> paramMap) {
        return insert(MainMapper + ".saveMobileMrrHeaderSave", paramMap);
    }

    public int saveMobileMrrLineSave(Map<String, Object> paramMap) {
        return insert(MainMapper + ".saveMobileMrrLineSave", paramMap);
    }

    public int saveMobileMrrReject(Map<String, Object> paramMap) {
        return insert(MainMapper + ".saveMobileMrrReject", paramMap);
    }

	public List<Map<String, Object>> getIdsmOsSummaryMrrMobileList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getIdsmOsSummaryMrrMobileList",paramMap);	
	}
	
	public List getMobileSearchMrrPackageSearch(Map<String, Object> paramMap) {
    	
        return selectList(MainMapper + ".getMobileSearchMrrPackageSearch",paramMap);	
    } 
	
	public List getMobileMrrHeaderAttachList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getMobileMrrHeaderAttachList",paramMap);	
    }
	
	public Map<String, Object> getMobileMrrLineId(Map<String, Object> paramMap) {
		return selectOne(MainMapper + ".getMobileMrrLineId", paramMap);
	}
	
	public List getMobileAttachList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getMobileAttachList",paramMap);	
    }
	
	public List<Map<String, Object>> getMobileUserList(Map<String, Object> paramMap) {
		return selectList(MainMapper + ".getMobileUserList", paramMap);
	}

}

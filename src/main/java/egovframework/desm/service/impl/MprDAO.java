package egovframework.desm.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

@Repository("mprDAO")
public class MprDAO extends EgovAbstractMapper {

	public int saveDesmMprSetupDate(Map<String, Object> paramMap) {
		return update("MprMapper.saveDesmMprSetupDate",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprSetupDate(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprSetupDate",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprSetupColDataList(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprSetupColDataList",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprSetupDataList(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprSetupDataList",paramMap);
	}

	public List<Map<String, Object>> getDesmMprSetupDataListNew(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprSetupDataListNew",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprFirstSetupDataList(Map<String, Object> paramMap) {
//		return selectList("MprMapper.getDesmMprFirstSetupDataListNew",paramMap);
		return selectList("MprMapper.getDesmMprFirstSetupDataList",paramMap);
	}
	
	public int saveDesmMprSetupData(Map<String, Object> paramMap) {
		return update("MprMapper.saveDesmMprSetupData",paramMap);
//		return update("MprMapper.saveDesmMprSetupDataNew",paramMap);
	}

	public int saveDesmMprSetupRemark(Map<String, Object> paramMap) {
		return update("MprMapper.saveDesmMprSetupRemark",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprSeq(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprSeq",paramMap);
	}
	
	public int saveDesmMprHeader(Map<String, Object> paramMap) {
		return update("MprMapper.saveDesmMprHeader",paramMap);
	}

	public List<Map<String, Object>> getDesmMprCheckList(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprCheckList",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprList(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprList",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprData(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprData",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprDetailProgressCurrentChekcList(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprDetailProgressCurrentChekcList",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprDetailProgressLastChekcList(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprDetailProgressLastChekcList",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprDetailProgressCurrentList(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprDetailProgressCurrentList",paramMap);
	}
	
	public int updateDesmMprDetailnProgress(Map<String, Object> paramMap) {
		return update("MprMapper.updateDesmMprDetailnProgress",paramMap);
	}
	
	public int saveDesmMprDetailnProgress(Map<String, Object> paramMap) {
		return update("MprMapper.saveDesmMprDetailnProgress",paramMap);
	}	
	
	public int updateDesmMprDetailnProgressRemark(Map<String, Object> paramMap) {
		return update("MprMapper.updateDesmMprDetailnProgressRemark",paramMap);
	}
	
	public int saveDesmMprDetailnProgressRemark(Map<String, Object> paramMap) {
		return update("MprMapper.saveDesmMprDetailnProgressRemark",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprSetupList(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprSetupList",paramMap);
	}
	
	public int saveDesmMprStatus(Map<String, Object> paramMap) {
		return update("MprMapper.saveDesmMprStatus",paramMap);
	}
	
	public List<Map<String, Object>> getSupplier(Map<String, Object> paramMap) {
		return selectList("MprMapper.getSupplier",paramMap);
	}

	public List<Map<String, Object>> getMprSupplier(Map<String, Object> paramMap) {
		return selectList("MprMapper.getMprSupplier",paramMap);
	}
	
	public List<Map<String, Object>> getDesmSupplierSetupPoList(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmSupplierSetupPoList",paramMap);
	}
	
	public int getDesmManualPoCount(Map<String, Object> paramMap) {
		return selectOne("MprMapper.getDesmManualPoCount",paramMap);
	}

	public int saveDesmManualPoCreationData(Map<String, Object> paramMap) {
		return insert("MprMapper.saveDesmManualPoCreationData",paramMap);
	}

	public int insertDesmSupplierSetupData(Map<String, Object> paramMap) {
		return insert("MprMapper.insertDesmSupplierSetupData",paramMap);
	}
	
	public List<Map<String, Object>> getDesmSupplierSetupList(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmSupplierSetupList",paramMap);
	}
	
	public int deleteDesmSupplierSetupData(Map<String, Object> paramMap) {
		return delete("MprMapper.deleteDesmSupplierSetupData",paramMap);
	}	
	
	public List<Map<String, Object>> getDesmMprSetupSupplierList(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprSetupSupplierList",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprSetupUserList(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprSetupUserList",paramMap);
	}
	
	public int saveDesmMprSetupMail(Map<String, Object> paramMap) {
		return update("MprMapper.saveDesmMprSetupMail",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprSetupMail(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprSetupMail",paramMap);
	}
	
	public int deleteDesmMprSetupMail(Map<String, Object> paramMap) {
		return delete("MprMapper.deleteDesmMprSetupMail",paramMap);
	}
	
	public List<Map<String, Object>> getSupplierAuth(Map<String, Object> paramMap) {
		return selectList("MprMapper.getSupplierAuth",paramMap);
	}
	
	public int saveDesmMprProgressNote(Map<String, Object> paramMap) {
		return update("MprMapper.saveDesmMprProgressNote",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprProgressNote(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprProgressNote",paramMap);
	}
	
	public int deleteDesmMprProgressNote(Map<String, Object> paramMap) {
		return delete("MprMapper.deleteDesmMprProgressNote",paramMap);
	}
	
	public int saveDesmMprMainRemarks(Map<String, Object> paramMap) {
		return update("MprMapper.saveDesmMprMainRemarks",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprRemarks(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprRemarks",paramMap);
	}
	
	public int deleteDesmMprRemarks(Map<String, Object> paramMap) {
		return delete("MprMapper.deleteDesmMprRemarks",paramMap);
	}
	
	public int saveDesmMprProcure(Map<String, Object> paramMap) {
		return update("MprMapper.saveDesmMprProcure",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprProcure(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprProcure",paramMap);
	}
	
	public int deleteDesmProcure(Map<String, Object> paramMap) {
		return delete("MprMapper.deleteDesmProcure",paramMap);
	}
	
	public int saveDesmMprImgTxt(Map<String, Object> paramMap) {
		return update("MprMapper.saveDesmMprImgTxt",paramMap);
	}
	
	public int saveDesmMprSetupProductName(Map<String, Object> paramMap) {
		return update("MprMapper.saveDesmMprSetupProductName",paramMap);
	}

	public int saveDesmMprSetupSubmisstionPeriod(Map<String, Object> paramMap) {
		return update("MprMapper.saveDesmMprSetupSubmisstionPeriod",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprSetupCheckDateList(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprSetupCheckDateList",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprPayments(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprPayments",paramMap);
	}
	
	public Map<String, Object> getDesmMprPoRemarks(Map<String, Object> paramMap) {
		return selectOne("MprMapper.getDesmMprPoRemarks",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprStatus(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprStatus",paramMap);
	}
	
	public int deleteDesmMprList(Map<String, Object> paramMap) {
		return delete("MprMapper.deleteDesmMprList",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprSaveList(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprSaveList",paramMap);
	}
	
	public int deleteDesmMprSetupList(Map<String, Object> paramMap) {
		return delete("MprMapper.deleteDesmMprSetupList",paramMap);
	}

	public List<Map<String, Object>> getMprNoList(Map<String, Object> paramMap) {
		return selectList("MprMapper.getMprNoList",paramMap);
	}
	
    public List getDesmMprPo(Map<String, Object> paramMap) {
    	
        return selectList("MprMapper.getDesmMprPo",paramMap);	
    }

    public List getDesmMprNoPo(Map<String, Object> paramMap) {
    	
        return selectList("MprMapper.getDesmMprNoPo",paramMap);	
    }
    
    public List getDesmMprProgressSummary(Map<String, Object> paramMap) {
    	
        return selectList("MprMapper.getDesmMprProgressSummary",paramMap);	
    }
    
    public List getMailMprSupplierReceiver(Map<String, Object> paramMap) {
    	
        return selectList("MprMapper.getMailMprSupplierReceiver",paramMap);	
    } 
    
    public List getMailMprSetupReceiver(Map<String, Object> paramMap) {
    	
        return selectList("MprMapper.getMailMprSetupReceiver",paramMap);	
    } 
    
    public int saveDesmMprSupplierFileGrpCd(Map<String, Object> paramMap) {
        return update("MprMapper.saveDesmMprSupplierFileGrpCd",paramMap);
    }  
    
	public int saveDesmMprSetupStatus(Map<String, Object> paramMap) {
		return update("MprMapper.saveDesmMprSetupStatus",paramMap);
	}
	
	public int updateDesmSupplierSetupData(Map<String, Object> paramMap) {
		return update("MprMapper.updateDesmSupplierSetupData",paramMap);
	}
	
    public List getMailMprSupplierMstData(Map<String, Object> paramMap) {
    	
        return selectList("MprMapper.getMailMprSupplierMstData",paramMap);	
    } 
    
    public List getMailMprSetupMstData(Map<String, Object> paramMap) {
    	
        return selectList("MprMapper.getMailMprSetupMstData",paramMap);	
    } 
    
	public List<Map<String, Object>> getDesmMprSetupStatus(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprSetupStatus",paramMap);
	}
	
	public List<Map<String, Object>> getMailMprRequestMstData(Map<String, Object> paramMap) {
		return selectList("MprMapper.getMailMprRequestMstData",paramMap);
	}
	
	public List<Map<String, Object>> getMailMprMstData(Map<String, Object> paramMap) {
		return selectList("MprMapper.getMailMprMstData",paramMap);
	}
	
	public int saveDesmMprDesign(Map<String, Object> paramMap) {
		return update("MprMapper.saveDesmMprDesign",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprDesign(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprDesign",paramMap);
	}
	
	public int deleteDesmDesign(Map<String, Object> paramMap) {
		return delete("MprMapper.deleteDesmDesign",paramMap);
	}
	
	public int saveDesmMprQuality(Map<String, Object> paramMap) {
		return update("MprMapper.saveDesmMprQuality",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprQuality(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprQuality",paramMap);
	}
	
	public int deleteDesmQuality(Map<String, Object> paramMap) {
		return delete("MprMapper.deleteDesmQuality",paramMap);
	}
	
	public List<Map<String, Object>> getDesmShippingMarkList(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmShippingMarkList",paramMap);
	}
	
	public int deleteDesmShippingMarkList(Map<String, Object> paramMap) {
		return delete("MprMapper.deleteDesmShippingMarkList",paramMap);
	}
	
	public int deleteDesmShippingMarkReportList(Map<String, Object> paramMap) {
		return delete("MprMapper.deleteDesmShippingMarkReportList",paramMap);
	}
	
	public int saveDesmShippingMarkReportList(Map<String, Object> paramMap) {
		return insert("MprMapper.saveDesmShippingMarkReportList",paramMap);
	}
	
	public int saveDesmShippingMarkHeader(Map<String, Object> paramMap) {
		return update("MprMapper.saveDesmShippingMarkHeader",paramMap);
	}
	
	public int saveDesmShippingMarkDetail(Map<String, Object> paramMap) {
		return update("MprMapper.saveDesmShippingMarkDetail",paramMap);
	}
	
	public List<Map<String, Object>> getDesmShippingMarkHeaderSeq(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmShippingMarkHeaderSeq",paramMap);
	}
	
	public int deleteDesmShippingMarkDetail(Map<String, Object> paramMap) {
		return delete("MprMapper.deleteDesmShippingMarkDetail",paramMap);
	}	
	
	public List<Map<String, Object>> getDesmShippingMarkDetailList(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmShippingMarkDetailList",paramMap);
	}
	
	public int saveDesmSupplierSetupMemo(Map<String, Object> paramMap) {
		return update("MprMapper.saveDesmSupplierSetupMemo",paramMap);
	}	
	
	public List<Map<String, Object>> getDesmSupplierSetupCheckList(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmSupplierSetupCheckList",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprProcurePrev(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprProcurePrev",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprDesignPrev(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprDesignPrev",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprRemarkPrev(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprRemarkPrev",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprQualityPrev(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprQualityPrev",paramMap);
	}
	
	public List<Map<String, Object>> getRole(Map<String, Object> paramMap) {
		return selectList("MprMapper.getRole",paramMap);
	}
	
    public List getMprTeam(Map<String, Object> paramMap) {
        return selectList("MprMapper.getMprTeam",paramMap);
    }

	public int saveDesmMprManufacture(Map<String, Object> paramMap) {
		return update("MprMapper.saveDesmMprManufacture",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMprManufacture(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprManufacture",paramMap);
	}
	
	public int deleteDesmManufacture(Map<String, Object> paramMap) {
		return delete("MprMapper.deleteDesmManufacture",paramMap);
	}

	public List<Map<String, Object>> getDesmMprManufacturePrev(Map<String, Object> paramMap) {
		return selectList("MprMapper.getDesmMprManufacturePrev",paramMap);
	}
	
}

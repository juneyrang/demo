package egovframework.desm.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

@Repository("materialDAO")
public class MaterialDAO extends EgovAbstractMapper {

	/*
	 * 항차 리스트
	 */
	public List<Map<String, Object>> getVoyageList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getVoyageList",paramMap);
	}

	/*
	 * 현장자재관리 리스트
	 */
	public List<Map<String, Object>> getPackingList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getPackingList",paramMap);
	}

	public List<Map<String, Object>> getIdsmOsSummaryList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getIdsmOsSummaryList",paramMap);
	}

	public List<Map<String, Object>> getIdsmOsDetailList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getIdsmOsDetailList",paramMap);
	}

	public List<Map<String, Object>> getIdsmOsSummaryListMirCheck(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getIdsmOsSummaryListMirCheck",paramMap);
	}

	public List<Map<String, Object>> getIdsmOsSummaryListMirAcceptCheck(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getIdsmOsSummaryListMirAcceptCheck",paramMap);
	}

	public List<Map<String, Object>> getIdsmOsSummaryListMirNo(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getIdsmOsSummaryListMirNo",paramMap);
	}

	public int saveIdsmOsSummaryListMirCreation(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveIdsmOsSummaryListMirCreation",paramMap);
	}

	public List<Map<String, Object>> getIdsmOsSummaryListMirCancelCheck(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getIdsmOsSummaryListMirCancelCheck",paramMap);
	}

	public int saveIdsmOsSummaryListMirCancel(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveIdsmOsSummaryListMirStatus",paramMap);
	}

	public int saveIdsmOsSummaryListMirAccept(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveIdsmOsSummaryListMirStatus",paramMap);
	}

	public int saveIdsmOsSummaryListConfirmMaterial(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveIdsmOsSummaryListConfirmMaterial",paramMap);
	}

	public int saveIdsmOsSummaryList(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveIdsmOsSummaryList",paramMap);
	}

	public List<Map<String, Object>> getIdsmOsSummaryListRfiCheck(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getIdsmOsSummaryListRfiCheck",paramMap);
	}

	public List<Map<String, Object>> getIdsmOsSummaryListRfiNo(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getIdsmOsSummaryListRfiNo",paramMap);
	}

	public int saveIdsmOsSummaryListRfiCreation(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveIdsmOsSummaryListRfiCreation",paramMap);
	}

	public List<Map<String, Object>> getIdsmOsSummaryListRfiCancelCheck(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getIdsmOsSummaryListRfiCancelCheck",paramMap);
	}

	public int saveIdsmOsSummaryListRfiCancel(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveIdsmOsSummaryListRfiStatus",paramMap);
	}

	public List<Map<String, Object>> getIdsmOsSummaryListRfiAcceptCheck(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getIdsmOsSummaryListRfiAcceptCheck",paramMap);
	}

	public int saveIdsmOsSummaryListRfiAccept(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveIdsmOsSummaryListRfiStatus",paramMap);
	}

	public int saveIdsmRfiCreationSetUpAppliedProcedure(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveIdsmRfiCreationSetUpAppliedProcedure",paramMap);
	}

	public int saveIdsmRfiCreationSetUpProcedure(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveIdsmRfiCreationSetUpProcedure",paramMap);
	}

	public int saveIdsmRfiCreationSetUpInspection(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveIdsmRfiCreationSetUpInspection",paramMap);
	}

	public int saveIdsmRfiCreationSetUpAttachments(Map<String, Object> paramMap) {
		return insert("MaterialMapper.saveIdsmRfiCreationSetUpAttachments",paramMap);
	}

	public List<Map<String, Object>> getIdsmRfiCreationSetUpAppliedProcedure(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getIdsmRfiCreationSetUpAppliedProcedure",paramMap);
	}

	public List<Map<String, Object>> getIdsmRfiCreationSetUpProcedure(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getIdsmRfiCreationSetUpProcedure",paramMap);
	}

	public List<Map<String, Object>> getIdsmRfiCreationSetUpInspection(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getIdsmRfiCreationSetUpInspection",paramMap);
	}

	public List<Map<String, Object>> getIdsmRfiCreationSetUpAttachments(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getIdsmRfiCreationSetUpAttachments",paramMap);
	}

    public int deleteIdsmCreateItemSetupAppliedProcedure(Map<String, Object> paramMap) {
        return update("MaterialMapper.deleteIdsmCreateItemSetupAppliedProcedure",paramMap);
    }

    public int deleteIdsmCreateItemSetupProcedure(Map<String, Object> paramMap) {
        return update("MaterialMapper.deleteIdsmCreateItemSetupProcedure",paramMap);
    }

    public int deleteIdsmCreateItemSetupInspection(Map<String, Object> paramMap) {
        return update("MaterialMapper.deleteIdsmCreateItemSetupInspection",paramMap);
    }

	public List<Map<String, Object>> getIdsmRfiCreationLoginInfoList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getIdsmRfiCreationLoginInfoList",paramMap);
	}

	public List<Map<String, Object>> getIdsmRfiCreationDtList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getIdsmRfiCreationDtList",paramMap);
	}

	public List<Map<String, Object>> getIdsmMirCreationLastData(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getIdsmMirCreationLastData",paramMap);
	}

	public List<Map<String, Object>> getDesmRsiPlDetailList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmRsiPlDetailList",paramMap);
	}

	public List<Map<String, Object>> getDesmRsiHeaderData(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmRsiHeaderData",paramMap);
	}

	public List<Map<String, Object>> getDesmRsiLineData(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmRsiLineData",paramMap);
	}

    public int saveDesmRsiLineSave(Map<String, Object> paramMap) {
        return update("MaterialMapper.saveDesmRsiLineSave",paramMap);
    }

    public int saveDesmRsiHeaderSave(Map<String, Object> paramMap) {
        return update("MaterialMapper.saveDesmRsiHeaderSave",paramMap);
    }

	public List<Map<String, Object>> getDesmRsiLineQtyList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmRsiLineQtyList",paramMap);
	}

    public int saveDesmRsiQtySave(Map<String, Object> paramMap) {
        return update("MaterialMapper.saveDesmRsiQtySave",paramMap);
    }

	public List<Map<String, Object>> getDesmRsiList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmRsiList",paramMap);
	}

	public List<Map<String, Object>> getDesmRsiHeaderList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmRsiHeaderList",paramMap);
	}

	public List<Map<String, Object>> getDesmRsiLineList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmRsiLineList",paramMap);
	}

    public int saveDesmRsiFileGrpCd(Map<String, Object> paramMap) {
        return update("MaterialMapper.saveDesmRsiFileGrpCd",paramMap);
    }

	public int deleteDesmRsiDtl(Map<String, Object> paramMap) {
		return delete("MaterialMapper.deleteDesmRsiDtl",paramMap);
	}

	public int saveDesmRsiReject(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveDesmRsiReject",paramMap);
	}

    public int saveDesmRsiOutQtySave(Map<String, Object> paramMap) {
        return update("MaterialMapper.saveDesmRsiOutQtySave",paramMap);
    }

	public List<Map<String, Object>> getDesmRsiUserList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmRsiUserList",paramMap);
	}

    public int saveDesmRsiHeaderProjectSave(Map<String, Object> paramMap) {
        return update("MaterialMapper.saveDesmRsiHeaderProjectSave",paramMap);
    }

	public List<Map<String, Object>> getDesmOutGoingCreationList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmOutGoingCreationList",paramMap);
	}

	public List<Map<String, Object>> getDesmRsiLineOutQtyList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmRsiLineOutQtyList",paramMap);
	}

    public int saveDesmRsiOutGoingSave(Map<String, Object> paramMap) {
        return insert("MaterialMapper.saveDesmRsiOutGoingSave",paramMap);
    }
    
    public int saveDesmRsiOutGoingSaveM(Map<String, Object> paramMap) {
        return insert("MaterialMapper.saveDesmRsiOutGoingSaveM",paramMap);
    }

	public List<Map<String, Object>> getDesmRsiOutGoingList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmRsiOutGoingList",paramMap);
	}

	public int deleteDesmRsiOut(Map<String, Object> paramMap) {
		return delete("MaterialMapper.deleteDesmRsiOut",paramMap);
	}

	public List<Map<String, Object>> getDesmSubconUser(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmSubconUser",paramMap);
	}

    public int insertSubcontUser(Map<String, Object> paramMap) {
        return insert("MaterialMapper.insertSubcontUser",paramMap);
    }

    //20220820 :: insert desm_user_project, insert desm_user_default_project
    public String selectProjectId(Map<String, Object> paramMap) {
    	return selectOne("MaterialMapper.selectProjectId", paramMap);
    }

    public int mergeSubconUserProject(Map<String, Object> paramMap) {
    	return update("MaterialMapper.mergeSubconUserProject", paramMap);
    }

    public int mergeSubconUserDefaultProject(Map<String, Object> paramMap) {
    	return update("MaterialMapper.mergeSubconUserDefaultProject", paramMap);
    }
    //20220820 :: insert desm_user_project, insert desm_user_default_project end

	public List<Map<String, Object>> getDesmSubconList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmSubconList",paramMap);
	}

    public int deleteSubcontUser(Map<String, Object> paramMap) {
        return delete("MaterialMapper.deleteSubcontUser",paramMap);
    }

	public List<Map<String, Object>> getDesmSubconRoleList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmSubconRoleList",paramMap);
	}

    public int deleteSubcontUserRole(Map<String, Object> paramMap) {
        return delete("MaterialMapper.deleteSubcontUserRole",paramMap);
    }

	public List<Map<String, Object>> getDesmRsiLineOutQtyCheckList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmRsiLineOutQtyCheckList",paramMap);
	}

    public int saveIdsmOsSummaryListCancelMaterial(Map<String, Object> paramMap) {
        return delete("MaterialMapper.saveIdsmOsSummaryListCancelMaterial",paramMap);
    }

    public int updateSetLanguage(Map<String, Object> paramMap) {
        return update("MaterialMapper.updateSetLanguage",paramMap);
    }

    public List getDesmSiteProjectList(Map<String, Object> paramMap) {

        return selectList("MaterialMapper.getDesmSiteProjectList",paramMap);
    }

    public List getDesmSiteProjectUserList(Map<String, Object> paramMap) {

        return selectList("MaterialMapper.getDesmSiteProjectUserList",paramMap);
    }

    public List getDeleteDesmRsiList(Map<String, Object> paramMap) {

        return selectList("MaterialMapper.getDeleteDesmRsiList",paramMap);
    }

    public int deleteDesmRsiMst(Map<String, Object> paramMap) {
        return delete("MaterialMapper.deleteDesmRsiMst",paramMap);
    }

	public List<Map<String, Object>> getDesmRsiViewList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmRsiViewList",paramMap);
	}

	public List<Map<String, Object>> getMailRsiMstData(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getMailRsiMstData",paramMap);
	}

	public List<Map<String, Object>> getMailRsiDtlData(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getMailRsiDtlData",paramMap);
	}

	public List<Map<String, Object>> getMailRsiReceiver(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getMailRsiReceiver",paramMap);
	}

    public int saveDesmRsiOutQtyCloseSave(Map<String, Object> paramMap) {
        return insert("MaterialMapper.saveDesmRsiOutQtyCloseSave",paramMap);
    }

	public int saveIdsmOsDetailList(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveIdsmOsDetailList",paramMap);
	}

	public int saveIdsmOsDetailListLog(Map<String, Object> paramMap) {
		return insert("MaterialMapper.saveIdsmOsDetailListLog",paramMap);
	}

	public List<Map<String, Object>> getDesmPlDetailEditLogList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmPlDetailEditLogList",paramMap);
	}

	public int saveIdsmOsSummaryEditLogList(Map<String, Object> paramMap) {
		return insert("MaterialMapper.saveIdsmOsSummaryEditLogList",paramMap);
	}

	public List<Map<String, Object>> getDesmPlSummaryEditLogList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmPlSummaryEditLogList",paramMap);
	}

	public List<Map<String, Object>> getDesmMrfPlDetailList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMrfPlDetailList",paramMap);
	}

	public List<Map<String, Object>> getDesmMrfHeaderData(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMrfHeaderData",paramMap);
	}

	public List<Map<String, Object>> getDesmMrfLineQtyList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMrfLineQtyList",paramMap);
	}

    public int saveDesmMrfLineSave(Map<String, Object> paramMap) {
        return update("MaterialMapper.saveDesmMrfLineSave",paramMap);
    }

    public int saveDesmMrfQtySave(Map<String, Object> paramMap) {
        return update("MaterialMapper.saveDesmMrfQtySave",paramMap);
    }

    public int saveDesmMrfHeaderSave(Map<String, Object> paramMap) {
        return update("MaterialMapper.saveDesmMrfHeaderSave",paramMap);
    }

	public List<Map<String, Object>> getDesmMrfList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMrfList",paramMap);
	}

	public List<Map<String, Object>> getDesmMrfHeaderList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMrfHeaderList",paramMap);
	}

	public List<Map<String, Object>> getDesmMrfLineList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMrfLineList",paramMap);
	}

	public int saveDesmMrfReject(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveDesmMrfReject",paramMap);
	}

	public int deleteDesmMrfDtl(Map<String, Object> paramMap) {
		return delete("MaterialMapper.deleteDesmMrfDtl",paramMap);
	}

    public int saveDesmMrfFileGrpCd(Map<String, Object> paramMap) {
        return update("MaterialMapper.saveDesmMrfFileGrpCd",paramMap);
    }

    public List getDeleteDesmMrfList(Map<String, Object> paramMap) {

        return selectList("MaterialMapper.getDeleteDesmMrfList",paramMap);
    }

    public int deleteDesmMrfMst(Map<String, Object> paramMap) {
        return delete("MaterialMapper.deleteDesmMrfMst",paramMap);
    }

	public List<Map<String, Object>> getDesmReturnCreationList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmReturnCreationList",paramMap);
	}

	public List<Map<String, Object>> getDesmMrfLineReturnList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMrfLineReturnList",paramMap);
	}

    public int saveDesmMrfReturnSave(Map<String, Object> paramMap) {
        return insert("MaterialMapper.saveDesmMrfReturnSave",paramMap);
    }

    public int saveDesmMrfReturnQtySave(Map<String, Object> paramMap) {
        return update("MaterialMapper.saveDesmMrfReturnQtySave",paramMap);
    }

    public int saveDesmMrfReturnQtyCloseSave(Map<String, Object> paramMap) {
        return insert("MaterialMapper.saveDesmMrfReturnQtyCloseSave",paramMap);
    }

	public List<Map<String, Object>> getDesmMrfLineReturnQtyList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMrfLineReturnQtyList",paramMap);
	}

	public List<Map<String, Object>> getDesmMrfReturnList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMrfReturnList",paramMap);
	}

	public int deleteDesmMrfReturn(Map<String, Object> paramMap) {
		return delete("MaterialMapper.deleteDesmMrfReturn",paramMap);
	}

	public List<Map<String, Object>> getCheckMrfList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getCheckMrfList",paramMap);
	}

	public int deleteIdsmQrCodeList(Map<String, Object> paramMap) {
		return delete("MaterialMapper.deleteIdsmQrCodeList",paramMap);
	}

	public int saveIdsmQrCodeList(Map<String, Object> paramMap) {
		return insert("MaterialMapper.saveIdsmQrCodeList",paramMap);
	}

	public List<Map<String, Object>> getMailMrfMstData(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getMailMrfMstData",paramMap);
	}

	public List<Map<String, Object>> getMailMrfDtlData(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getMailMrfDtlData",paramMap);
	}

	public List<Map<String, Object>> getMailMrfReceiver(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getMailMrfReceiver",paramMap);
	}

	public int saveDesmMapCreation(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveDesmMapCreation",paramMap);
	}

	public List<Map<String, Object>> getDesmMapCreationList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMapCreationList",paramMap);
	}

	public int deleteDesmMapCreation(Map<String, Object> paramMap) {
		return update("MaterialMapper.deleteDesmMapCreation",paramMap);
	}

	public List<Map<String, Object>> getDesmMapMstInfoList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMapMstInfoList",paramMap);
	}

	public List<Map<String, Object>> getDesmMapDtlInfoList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMapDtlInfoList",paramMap);
	}

	public int saveDesmMapAreaCreation(Map<String, Object> paramMap) {
		return insert("MaterialMapper.saveDesmMapAreaCreation",paramMap);
	}

	public int deleteDesmMapAreaCreation(Map<String, Object> paramMap) {
		return update("MaterialMapper.deleteDesmMapAreaCreation",paramMap);
	}

	public int saveDesmLocation(Map<String, Object> paramMap) {
		return insert("MaterialMapper.saveDesmLocation",paramMap);
	}

	public List<Map<String, Object>> getDesmDesmMapLocationSummaryList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmDesmMapLocationSummaryList",paramMap);
	}

	public List<Map<String, Object>> getDesmDesmMapLocationDetailList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmDesmMapLocationDetailList",paramMap);
	}

	public int saveDesmLocationSummary(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveDesmLocationSummary",paramMap);
	}

	public int saveDesmLocationSummaryDetail(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveDesmLocationSummaryDetail",paramMap);
	}

	public int saveDesmLocationDetail(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveDesmLocationDetail",paramMap);
	}

	public List<Map<String, Object>> getDesmLocationCheckDetail(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmLocationCheckDetail",paramMap);
	}

	public List<Map<String, Object>> getDesmMapSearchSummaryMstInfoList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMapSearchSummaryMstInfoList",paramMap);
	}

	public List<Map<String, Object>> getDesmMapSearchSummaryDtlInfoList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMapSearchSummaryDtlInfoList",paramMap);
	}

	public List<Map<String, Object>> getDesmMapSearchDetailMstInfoList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMapSearchDetailMstInfoList",paramMap);
	}

	public List<Map<String, Object>> getDesmMapSearchDetailDtlInfoList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMapSearchDetailDtlInfoList",paramMap);
	}

	public int deleteDesmLocationSummary(Map<String, Object> paramMap) {
		return delete("MaterialMapper.deleteDesmLocationSummary",paramMap);
	}

	public int updateDesmLocationSummary(Map<String, Object> paramMap) {
		return delete("MaterialMapper.updateDesmLocationSummary",paramMap);
	}

	public int deleteDesmLocationDetail(Map<String, Object> paramMap) {
		return delete("MaterialMapper.deleteDesmLocationDetail",paramMap);
	}

	public int updateDesmLocationDetail(Map<String, Object> paramMap) {
		return delete("MaterialMapper.updateDesmLocationDetail",paramMap);
	}

	public List<Map<String, Object>> getDesmDesmMapLocationDataList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmDesmMapLocationDataList",paramMap);
	}

	public List<Map<String, Object>> getLocationCodeList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getLocationCodeList",paramMap);
	}

	public int saveIdsmOsSummaryReport(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveIdsmOsSummaryReport",paramMap);
	}

	public List<Map<String, Object>> getDesmDetailItemCreationMaterialCode(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmDetailItemCreationMaterialCode",paramMap);
	}

	public int saveDesmDetailItemCreation(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveDesmDetailItemCreation",paramMap);
	}

	public int saveDesmLocationSummaryDetailLog(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveDesmLocationSummaryDetailLog",paramMap);
	}

	public int deleteDesmLocationSummaryDetail(Map<String, Object> paramMap) {
		return update("MaterialMapper.deleteDesmLocationSummaryDetail",paramMap);
	}

	public List<Map<String, Object>> getIdsmOsManageList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getIdsmOsManageList",paramMap);
	}

	public List<Map<String, Object>> getDesmMaterialManageCreationList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMaterialManageCreationList",paramMap);
	}

	public int saveDesmMaterialManageSave(Map<String, Object> paramMap) {
		return insert("MaterialMapper.saveDesmMaterialManageSave",paramMap);
	}

	public int saveIdsmOsManageList(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveIdsmOsManageList",paramMap);
	}

	public int deleteMaterialManage(Map<String, Object> paramMap) {
		return update("MaterialMapper.deleteMaterialManage",paramMap);
	}

	public List<Map<String, Object>> saveDesmLocationSummaryDetailCheck(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.saveDesmLocationSummaryDetailCheck",paramMap);
	}

	public int saveDesmRsiOutDetailLog(Map<String, Object> paramMap) {
		return insert("MaterialMapper.saveDesmRsiOutDetailLog",paramMap);
	}

	public List<Map<String, Object>> getDesmRsiOutPackageQtyList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmRsiOutPackageQtyList",paramMap);
	}
	
	public List<Map<String, Object>> getDesmRsiOutPackageQtyListM(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmRsiOutPackageQtyListM",paramMap);
	}

	public int updateDesmRsiOpen(Map<String, Object> paramMap) {
		return update("MaterialMapper.updateDesmRsiOpen",paramMap);

	}

	public List<Map<String, Object>> getDesmTransactionHistoryList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmTransactionHistoryList",paramMap);
	}

	public int saveDesmMaterialManagementFileGrpCd(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveDesmMaterialManagementFileGrpCd",paramMap);

	}

	public Map<String, Object> getDesmProjectPackageInfo(Map<String, Object> paramMap) {
		return selectOne("MaterialMapper.getDesmProjectPackageInfo", paramMap);
	}

	public Map<String, Object> getRsiReqQty(Map<String, Object> paramMap) {
		return selectOne("MaterialMapper.getRsiReqQty", paramMap);
	}
	
	public List<Map<String, Object>> getDesmMrrList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMrrList",paramMap);
	}
	
	public List<Map<String, Object>> getDesmMrrHeaderData(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMrrHeaderData",paramMap);
	}
	
	public int saveDesmMrrLineSave(Map<String, Object> paramMap) {
        return update("MaterialMapper.saveDesmMrrLineSave",paramMap);
    }

    public int saveDesmMrrHeaderSave(Map<String, Object> paramMap) {
        return update("MaterialMapper.saveDesmMrrHeaderSave",paramMap);
    }
    
    public int saveDesmMrrHeaderProjectSave(Map<String, Object> paramMap) {
        return update("MaterialMapper.saveDesmMrrHeaderProjectSave",paramMap);
    }
    
    public List<Map<String, Object>> getDesmMrrHeaderList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMrrHeaderList",paramMap);
	}
    
    public List<Map<String, Object>> getDesmMrrLineList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMrrLineList",paramMap);
	}
    
    public int deleteDesmMrrDtl(Map<String, Object> paramMap) {
		return delete("MaterialMapper.deleteDesmMrrDtl",paramMap);
	}
    
    public int saveDesmMrrReject(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveDesmMrrReject",paramMap);
	}
    
    public List getDeleteDesmMrrList(Map<String, Object> paramMap) {
        return selectList("MaterialMapper.getDeleteDesmMrrList",paramMap);
    }
    
    public int deleteDesmMrrMst(Map<String, Object> paramMap) {
        return delete("MaterialMapper.deleteDesmMrrMst",paramMap);
    }

    public int deleteDesmMrrDtlAll(Map<String, Object> paramMap) {
        return delete("MaterialMapper.deleteDesmMrrDtlAll",paramMap);
    }
    
    public List<Map<String, Object>> getMailMrrMstData(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getMailMrrMstData",paramMap);
	}
    
    public List<Map<String, Object>> getMailMrrDtlData(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getMailMrrDtlData",paramMap);
	}
    
    public List<Map<String, Object>> getMailMrrReceiver(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getMailMrrReceiver",paramMap);
	}
    
    public List<Map<String, Object>> getIdsmOsSummaryMrrList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getIdsmOsSummaryMrrList",paramMap);
	}

	public List<Map<String, Object>> getDesmMirList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMirList",paramMap);
	}

    public List<Map<String, Object>> getIdsmOsSummaryMirList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getIdsmOsSummaryMirList",paramMap);
	}

    public List<Map<String, Object>> getIdsmOsSummaryMirItemList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getIdsmOsSummaryMirItemList",paramMap);
	}

	public List<Map<String, Object>> getDesmMirHeaderData(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMirHeaderData",paramMap);
	}
	
	public int saveDesmMirLineSave(Map<String, Object> paramMap) {
        return update("MaterialMapper.saveDesmMirLineSave",paramMap);
    }

    public int saveDesmMirHeaderSave(Map<String, Object> paramMap) {
        return update("MaterialMapper.saveDesmMirHeaderSave",paramMap);
    }

    public int saveDesmMirHeaderProjectSave(Map<String, Object> paramMap) {
        return update("MaterialMapper.saveDesmMirHeaderProjectSave",paramMap);
    }

    public List<Map<String, Object>> getDesmMirHeaderList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMirHeaderList",paramMap);
	}
    
    public List<Map<String, Object>> getDesmMirLineList(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getDesmMirLineList",paramMap);
	}
    
    public int deleteDesmMirDtl(Map<String, Object> paramMap) {
		return delete("MaterialMapper.deleteDesmMirDtl",paramMap);
	}
    
    public int saveDesmMirReject(Map<String, Object> paramMap) {
		return update("MaterialMapper.saveDesmMirReject",paramMap);
	}

    public int deleteDesmMirMst(Map<String, Object> paramMap) {
        return delete("MaterialMapper.deleteDesmMirMst",paramMap);
    }

    public int deleteDesmMirDtlAll(Map<String, Object> paramMap) {
        return delete("MaterialMapper.deleteDesmMirDtlAll",paramMap);
    }

    public List<Map<String, Object>> getMailMirMstData(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getMailMirMstData",paramMap);
	}
    
    public List<Map<String, Object>> getMailMirDtlData(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getMailMirDtlData",paramMap);
	}
    
    public List<Map<String, Object>> getMailMirReceiver(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getMailMirReceiver",paramMap);
	}
    
    public List<Map<String, Object>> getMailMirUpdateReceiver(Map<String, Object> paramMap) {
		return selectList("MaterialMapper.getMailMirUpdateReceiver",paramMap);
	}
    
    public List getDeleteDesmMirList(Map<String, Object> paramMap) {
        return selectList("MaterialMapper.getDeleteDesmMirList",paramMap);
    }
    
    public int updateMirClientComments(Map<String, Object> paramMap) {
        return update("MaterialMapper.updateMirClientComments",paramMap);
    }
    
    public int updateMirLineRemarks(Map<String, Object> paramMap) {
        return update("MaterialMapper.updateMirLineRemarks",paramMap);
    }

    public int saveMirLineConfirmMaterial(Map<String, Object> paramMap) {
        return update("MaterialMapper.saveMirLineConfirmMaterial",paramMap);
    }

}

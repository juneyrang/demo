package egovframework.desm.service;

import java.util.List;
import java.util.Map;

public interface MaterialService {

	/*
	 * 항차 리스트
	 */
	public List<Map<String, Object>> getVoyageList(Map<String, Object> paramMap);

	/*
	 * 현장자재관리 리스트
	 */
	public List<Map<String, Object>> getPackingList(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmOsSummaryList(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmOsDetailList(Map<String, Object> paramMap);

	public Map<String, Object> getIdsmOsSummaryListMirCheck(Map<String, Object> paramMap)  throws Exception;

	public Map<String, Object> saveIdsmOsSummaryListMirCreation(Map<String, Object> paramMap) throws Exception;

	public Map<String, Object> getIdsmOsSummaryListMirCancelCheck(Map<String, Object> paramMap)  throws Exception;

	public int saveIdsmOsSummaryListMirCancel(Map<String, Object> paramMap) throws Exception;

	public int saveIdsmOsSummaryListMirAccept(Map<String, Object> paramMap) throws Exception;

	public int saveIdsmOsSummaryListConfirmMaterial(Map<String, Object> paramMap) throws Exception;

	public Map<String, Object> getIdsmOsSummaryListMirAcceptCheck(Map<String, Object> paramMap)  throws Exception;

	public int saveIdsmOsSummaryList(Map<String, Object> paramMap) throws Exception;

	public Map<String, Object> getIdsmOsSummaryListRfiCheck(Map<String, Object> paramMap)  throws Exception;

	public Map<String, Object> saveIdsmOsSummaryListRfiCreation(Map<String, Object> paramMap) throws Exception;

	public Map<String, Object> getIdsmOsSummaryListRfiCancelCheck(Map<String, Object> paramMap)  throws Exception;

	public int saveIdsmOsSummaryListRfiCancel(Map<String, Object> paramMap) throws Exception;

	public Map<String, Object> getIdsmOsSummaryListRfiAcceptCheck(Map<String, Object> paramMap)  throws Exception;

	public int saveIdsmOsSummaryListRfiAccept(Map<String, Object> paramMap) throws Exception;

	public int saveIdsmRfiCreationSetUp(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getIdsmRfiCreationSetUpAppliedProcedure(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmRfiCreationSetUpProcedure(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmRfiCreationSetUpInspection(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmRfiCreationSetUpAttachments(Map<String, Object> paramMap);

	public int deleteIdsmCreateItemSetupAppliedProcedure(Map<String, Object> paramMap) throws Exception;

	public int deleteIdsmCreateItemSetupProcedure(Map<String, Object> paramMap) throws Exception;

	public int deleteIdsmCreateItemSetupInspection(Map<String, Object> paramMap) throws Exception;

	public Map<String, Object> getIdsmRfiCreationCode(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmMirCreationLastData(Map<String, Object> paramMap);

	public List<Map<String, Object>> getDesmRsiPlDetailList(Map<String, Object> paramMap);

	public Map<String, Object> saveDesmRsiSave(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getDesmRsiList(Map<String, Object> paramMap);

	public Map<String, Object> getDesmRsiInfoList(Map<String, Object> paramMap);

	public int saveDesmRsiFileGrpCd(Map<String, Object> paramMap) throws Exception;

	public int deleteDesmRsiDtl(Map<String, Object> paramMap) throws Exception;

	public int saveDesmRsiReject(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getDesmRsiUserList(Map<String, Object> paramMap);

	public List<Map<String, Object>> getDesmRsiUserSubconList(Map<String, Object> paramMap);

	public List<Map<String, Object>> getDesmOutGoingCreationList(Map<String, Object> paramMap);

	public Map<String, Object> saveDesmRsiOutSave(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getDesmRsiOutGoingList(Map<String, Object> paramMap);

	public Map<String, Object> deleteDesmRsiOut(Map<String, Object> paramMap) throws Exception;

	public Map<String, Object> saveDesmSubconSave(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getDesmSubconList(Map<String, Object> paramMap);

	public int deleteDesmSubconList(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getDesmSubconRoleList(Map<String, Object> paramMap);

	public Map<String, Object> saveIdsmOsSummaryListCancelMaterial(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getDesmSiteProjectList(Map<String, Object> paramMap);

	public List<Map<String, Object>> getDesmSiteProjectDlgProject(Map<String, Object> paramMap);

	public List<Map<String, Object>> getDesmSiteProjectUserList(Map<String, Object> paramMap);

	public int deleteDesmRsi(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getDesmRsiViewList(Map<String, Object> paramMap);

	public int sendMailDesmRsi(Map<String, Object> paramMap) throws Exception;

	public int saveIdsmOsDetailList(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getDesmPlDetailEditLogList(Map<String, Object> paramMap);

	public List<Map<String, Object>> getDesmPlSummaryEditLogList(Map<String, Object> paramMap);

	public List<Map<String, Object>> getDesmMrfPlDetailList(Map<String, Object> paramMap);

	public Map<String, Object> saveDesmMrfSave(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getDesmMrfList(Map<String, Object> paramMap);

	public Map<String, Object> getDesmMrfInfoList(Map<String, Object> paramMap);

	public int saveDesmMrfReject(Map<String, Object> paramMap) throws Exception;

	public int deleteDesmMrfDtl(Map<String, Object> paramMap) throws Exception;

	public int saveDesmMrfFileGrpCd(Map<String, Object> paramMap) throws Exception;

	public int deleteDesmMrf(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getDesmReturnCreationList(Map<String, Object> paramMap);

	public Map<String, Object> saveDesmMrfReturnSave(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getDesmMrfReturnList(Map<String, Object> paramMap);

	public int deleteDesmMrfReturn(Map<String, Object> paramMap) throws Exception;

	public int saveIdsmQrCodeList(Map<String, Object> paramMap) throws Exception;

	public int sendMailDesmMrf(Map<String, Object> paramMap) throws Exception;

	public int saveDesmMapCreation(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getDesmMapCreationList(Map<String, Object> paramMap);

	public int deleteDesmMapCreation(Map<String, Object> paramMap) throws Exception;

	public Map<String, Object> getDesmMapInfoList(Map<String, Object> paramMap);

	public int saveDesmMapAreaCreation(Map<String, Object> paramMap) throws Exception;

	public int deleteDesmMapAreaCreation(Map<String, Object> paramMap) throws Exception;

	public Map<String, Object> saveDesmLocation(Map<String, Object> paramMap) throws Exception;

	public Map<String, Object> getDesmDesmMapLocationList(Map<String, Object> paramMap);

	public Map<String, Object> getDesmMapSearchInfoList(Map<String, Object> paramMap);

	public int deleteDesmLocation(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getLocationCodeList(Map<String, Object> paramMap);

	public int saveDesmDetailItemCreation(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getIdsmOsManageList(Map<String, Object> paramMap);

	public int saveIdsmOsManageList(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getDesmMaterialManageCreationList(Map<String, Object> paramMap);

	public Map<String, Object> saveDesmMaterialManageSave(Map<String, Object> paramMap) throws Exception;

	public Map<String, Object> deleteMaterialManage(Map<String, Object> paramMap)  throws Exception;

	public Map<String, Object> saveDesmLocationCheck(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getDesmTransactionHistoryList(Map<String, Object> paramMap) throws Exception;

	public int saveDesmMaterialManagementFileGrpCd(Map<String, Object> paramMap) throws Exception;

	public Map<String, Object> getDesmProjectPackageInfo(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> getDesmMrrList(Map<String, Object> paramMap);
	
	public Map<String, Object> saveDesmMrrSave(Map<String, Object> paramMap) throws Exception;
	
	public Map<String, Object> getDesmMrrInfoList(Map<String, Object> paramMap);
	
	public int deleteDesmMrrDtl(Map<String, Object> paramMap) throws Exception;
	
	public int saveDesmMrrReject(Map<String, Object> paramMap) throws Exception;
	
	public int deleteDesmMrr(Map<String, Object> paramMap) throws Exception;
	
	public int sendMailDesmMrr(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> getIdsmOsSummaryMrrList(Map<String, Object> paramMap);

	public List<Map<String, Object>> getDesmMirList(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmOsSummaryMirList(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmOsSummaryMirItemList(Map<String, Object> paramMap) throws Exception;

	public Map<String, Object> saveDesmMirSave(Map<String, Object> paramMap) throws Exception;

	public Map<String, Object> getDesmMirInfoList(Map<String, Object> paramMap);
	
	public int deleteDesmMirDtl(Map<String, Object> paramMap) throws Exception;
	
	public int saveDesmMirReject(Map<String, Object> paramMap) throws Exception;
	
	public int deleteDesmMir(Map<String, Object> paramMap) throws Exception;

	public int sendMailDesmMir(Map<String, Object> paramMap) throws Exception;
	
	public Map<String, Object> updateMirAfterChecked(Map<String, Object> paramMap) throws Exception;
}

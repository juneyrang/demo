package egovframework.desm.service;

import java.util.List;
import java.util.Map;

public interface MprService {

	public Map<String, Object> saveDesmMprSetupDate(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> getDesmMprSetupDate(Map<String, Object> paramMap);
	
	public Map<String, Object> getDesmMprSetupData(Map<String, Object> paramMap);
	
	public Map<String, Object> saveDesmMprSetupData(Map<String, Object> paramMap) throws Exception;
	
	public Map<String, Object> saveDesmMprHeader(Map<String, Object> paramMap, List<Map<String, Object>> imgTxtList) throws Exception;
	
	public Map<String, Object> saveDesmMprDetail(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> getDesmMprCheckList(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getDesmMprList(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getDesmMprData(Map<String, Object> paramMap);
	
	public Map<String, Object> getDesmMprDetailProgressData(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getDesmMprSetupList(Map<String, Object> paramMap);
	
	public int saveDesmMprStatus(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> getSupplier(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getDesmSupplierSetupPoList(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getDesmDlgSupplierList(Map<String, Object> paramMap);

	public List<Map<String, Object>> getDesmDlgMprSupplierList(Map<String, Object> paramMap);
	
	public int saveDesmSupplierSetupData(Map<String, Object> paramMap) throws Exception;

	public int saveDesmManualPoCreationData(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getDesmSupplierSetupList(Map<String, Object> paramMap);
	
	public int deleteDesmSupplierSetupData(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> getDesmMprSetupSupplierList(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getDesmMprSetupUserList(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getDesmMprSetupMail(Map<String, Object> paramMap);
	
	public int deleteDesmMprSetupMail(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> getSupplierAuth(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getDesmMprProgressNote(Map<String, Object> paramMap);
	
	public int deleteDesmMprProgressNote(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> getDesmMprRemarks(Map<String, Object> paramMap);
	
	public int deleteDesmMprRemarks(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> getDesmMprProcure(Map<String, Object> paramMap);
	
	public int deleteDesmProcure(Map<String, Object> paramMap) throws Exception;
	
	public Map<String, Object> getDesmMprPayments(Map<String, Object> paramMap);
	
	public int deleteDesmMprList(Map<String, Object> paramMap) throws Exception;
	
	public Map<String, Object> deleteDesmMprSetupList(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> getDesmMprPo(Map<String, Object> paramMap);

	public List<Map<String, Object>> getDesmMprPoList(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getDesmMprNoPo(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getDesmMprProgressSummary(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getDesmMprNoPoList(Map<String, Object> paramMap);
	
	public int saveDesmMprSupplierFileGrpCd(Map<String, Object> paramMap) throws Exception;
	
	public int saveDesmMprSetupStatus(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> getDesmMprDesign(Map<String, Object> paramMap);
	
	public int deleteDesmDesign(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> getDesmMprQuality(Map<String, Object> paramMap);
	
	public int deleteDesmQuality(Map<String, Object> paramMap) throws Exception;
	
	public int saveDesmShippingMark(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> getDesmShippingMarkList(Map<String, Object> paramMap);
	
	public int deleteDesmShippingMarkList(Map<String, Object> paramMap) throws Exception;
	
	public int saveDesmShippingMarkReportList(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> getDesmShippingMarkDetailList(Map<String, Object> paramMap);
	
	public int saveDesmSupplierSetupMemo(Map<String, Object> paramMap) throws Exception;
	
	public int deleteDesmShippingMarkDetail(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> getDesmMprProcurePrev(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getDesmMprDesignPrev(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getDesmMprRemarkPrev(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getDesmMprQualityPrev(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getRole(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getMprTeam(Map<String, Object> paramMap);
	
	public Map<String, Object> saveDesmMprSetupMailData(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getDesmMprManufacture(Map<String, Object> paramMap);

	public int deleteDesmManufacture(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getDesmMprManufacturePrev(Map<String, Object> paramMap);
	
}

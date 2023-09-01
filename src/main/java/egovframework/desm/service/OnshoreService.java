package egovframework.desm.service;

import java.util.List;
import java.util.Map;

public interface OnshoreService {

	public List<Map<String, Object>> getDesmContractList(Map<String, Object> paramMap);

	public Map<String, Object> getDesmContractInfo(Map<String, Object> paramMap);

	public Map<String, Object> saveDesmContractCreate(Map<String, Object> paramMap) throws Exception;

	public Map<String, Object> saveDesmContractInfomation(Map<String, Object> paramMap) throws Exception;

	public int saveDesmContractReject(Map<String, Object> paramMap) throws Exception;

	public int saveDesmContractFileGrpCd(Map<String, Object> paramMap) throws Exception;

	public int deleteDesmContract(Map<String, Object> paramMap) throws Exception;

	public int sendMailDesmContract(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getIdsmSetupDlgContractHeaderSearch(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmSetupDlgContractLineSearch(Map<String, Object> paramMap);

	public List<Map<String, Object>> getDesmOnshoreOrderList(Map<String, Object> paramMap);

	public Map<String, Object> getDesmOnshoreOrderInfo(Map<String, Object> paramMap);

	public Map<String, Object> saveDesmOnshoreOrderCreate(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getDesmOnshoreReceivedList(Map<String, Object> paramMap);

	public Map<String, Object> getDesmOnshoreReceivedInfo(Map<String, Object> paramMap);

	public Map<String, Object> saveDesmOnshoreReceivedCreate(Map<String, Object> paramMap) throws Exception;

}

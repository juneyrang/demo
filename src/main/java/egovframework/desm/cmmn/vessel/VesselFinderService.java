package egovframework.desm.cmmn.vessel;

import java.util.List;
import java.util.Map;

public interface VesselFinderService {

	public void init();

	public List<Map<String, Object>> getVessels(Map<String, Object> paramMap);

	public List<Map<String, Object>> getVesselsList(Map<String, Object> paramMap);

	public List<Map<String, Object>> getLiveData(Map<String, Object> paramMap);

	public List<Map<String, Object>> getPortCalls(Map<String, Object> paramMap);

	public List<Map<String, Object>> getExpectedArrivals(Map<String, Object> paramMap);

	public List<Map<String, Object>> getMasterData(Map<String, Object> paramMap);

	public List<Map<String, Object>> getStatus(Map<String, Object> paramMap);

	public List<Map<String, Object>> getListManager(Map<String, Object> paramMap);

	public List<Map<String, Object>> getDistance(Map<String, Object> paramMap);
	
}

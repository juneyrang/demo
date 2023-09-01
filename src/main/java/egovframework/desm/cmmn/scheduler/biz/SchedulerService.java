package egovframework.desm.cmmn.scheduler.biz;

import java.util.List;
import java.util.Map;

public interface SchedulerService {

	public List<Map<String, Object>> getScheduleList(Map<String, Object> paramMap);

	public int saveSchedule(Map<String, Object> paramMap);
	
	public int deleteSchedule(Map<String, Object> paramMap);

	public int chgStatusSchedule(Map<String, Object> paramMap);

	public List<Map<String, Object>> getHistoryList(Map<String, Object> paramMap);

	public int saveHistory(Map<String, Object> paramMap);
	
	public void desmMprMailSend(Map<String, Object> paramMap);

	public List<Map<String, Object>> getAsyncUser(Map<String, Object> paramMap);

	public int updateAsyncUser(Map<String, Object> paramMap);

	public int updateDeniedUser(Map<String, Object> paramMap);
	
}

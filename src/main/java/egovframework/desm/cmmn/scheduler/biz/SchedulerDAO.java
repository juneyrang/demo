package egovframework.desm.cmmn.scheduler.biz;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

@Repository("schedulerDAO")
public class SchedulerDAO extends EgovAbstractMapper {

	private final String MainMapper = "sql.SchedulerMapper";

    public List<Map<String, Object>> getScheduleList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getScheduleList", paramMap);
    }

    public int saveSchedule(Map<String, Object> paramMap) {
        return insert(MainMapper + ".saveSchedule", paramMap);
    }
    
    public int deleteSchedule(Map<String, Object> paramMap) {
        return update(MainMapper + ".deleteSchedule", paramMap);
    }

    public int chgStatusSchedule(Map<String, Object> paramMap) {
        return update(MainMapper + ".chgStatusSchedule", paramMap);
    }

    public List<Map<String, Object>> getHistoryList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getHistoryList", paramMap);
    }

    public int saveHistory(Map<String, Object> paramMap) {
        return insert(MainMapper + ".saveHistory", paramMap);
    }
    
    public List<Map<String, Object>> searchMprCheckList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".searchMprCheckList", paramMap);
    }

    public List<Map<String, Object>> searchMprDataList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".searchMprDataList", paramMap);
    }

    public List<Map<String, Object>> searchMprInfoList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".searchMprInfoList", paramMap);
    }

    public List<Map<String, String>> searchMprPersonList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".searchMprPersonList", paramMap);
    }

    public List<Map<String, Object>> getAsyncUser(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getAsyncUser", paramMap);
    }

    public int updateAsyncUser(Map<String, Object> paramMap) {
        return update(MainMapper + ".updateAsyncUser", paramMap);
    }

    public int updateDeniedUser(Map<String, Object> paramMap) {
        return update(MainMapper + ".updateDeniedUser", paramMap);
    }

}

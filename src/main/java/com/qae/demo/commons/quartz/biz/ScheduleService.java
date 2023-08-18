package com.qae.demo.commons.quartz.biz;

import java.util.List;
import java.util.Map;

public interface ScheduleService {

    public List<Map<String, Object>> getScheduleList(Map<String, Object> paramMap);

    public int saveSchedule(Map<String, Object> paramMap);

    public int deleteSchedule(Map<String, Object> paramMap);

    public int chgStatusSchedule(Map<String, Object> paramMap);

    public List<Map<String, Object>> getHistoryList(Map<String, Object> paramMap);

    public int saveHistory(Map<String, Object> paramMap);

}

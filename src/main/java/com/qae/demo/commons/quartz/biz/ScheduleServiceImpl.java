package com.qae.demo.commons.quartz.biz;

import com.qae.demo.commons.quartz.ScheduleManager;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("scheduleService")
public class ScheduleServiceImpl implements ScheduleService {

    private static final Logger logger = LoggerFactory.getLogger(ScheduleServiceImpl.class);

    @Resource(name = "scheduleManager")
    private ScheduleManager scheduleManager;

    @Override
    public List<Map<String, Object>> getScheduleList(Map<String, Object> paramMap) {
        return null;
    }

    @Override
    public int saveSchedule(Map<String, Object> paramMap) {
        return 0;
    }

    @Override
    public int deleteSchedule(Map<String, Object> paramMap) {
        return 0;
    }

    @Override
    public int chgStatusSchedule(Map<String, Object> paramMap) {
        return 0;
    }

    @Override
    public List<Map<String, Object>> getHistoryList(Map<String, Object> paramMap) {
        return null;
    }

    @Override
    public int saveHistory(Map<String, Object> paramMap) {
        return 0;
    }
}

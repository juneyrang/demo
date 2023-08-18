package com.qae.demo.commons.quartz.listener;

import com.qae.demo.commons.quartz.biz.ScheduleService;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.JobListener;
import org.springframework.stereotype.Component;

@Component
public class QuartzJobListener implements JobListener {

    private String name = "quartzJobListener";

    private ScheduleService scheduleService;

    public void addService(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public void jobToBeExecuted(JobExecutionContext context) {

    }

    @Override
    public void jobExecutionVetoed(JobExecutionContext context) {

    }

    @Override
    public void jobWasExecuted(JobExecutionContext context, JobExecutionException jobException) {

    }
}

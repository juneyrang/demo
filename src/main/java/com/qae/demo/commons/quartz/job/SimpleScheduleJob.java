package com.qae.demo.commons.quartz.job;

import org.quartz.JobExecutionContext;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

@Component
public class SimpleScheduleJob extends BaseJob {
    @Override
    protected void doExecute(JobExecutionContext context) {
        ApplicationContext appCtx = (ApplicationContext) context.getJobDetail()
                .getJobDataMap().get("appContext");
//        quartzService = appCtx.getBean(QuartzService.class);
    }
}

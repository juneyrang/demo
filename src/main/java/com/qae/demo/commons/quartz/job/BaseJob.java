package com.qae.demo.commons.quartz.job;

import com.qae.demo.commons.quartz.biz.ScheduleService;
import org.quartz.InterruptableJob;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.UnableToInterruptJobException;
import org.springframework.context.ApplicationContext;
import org.springframework.scheduling.quartz.QuartzJobBean;

public abstract class BaseJob extends QuartzJobBean implements InterruptableJob {

    private Thread currentThread = null;

    protected ScheduleService jobService;

    @Override
    protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        this.currentThread = Thread.currentThread();

        if(jobService == null) {
            ApplicationContext appCtx = (ApplicationContext) jobExecutionContext.getJobDetail()
                    .getJobDataMap().get("appContext");
            jobService = appCtx.getBean(ScheduleService.class);
        }
        doExecute(jobExecutionContext);
    }

    protected abstract void doExecute(JobExecutionContext context);

    @Override
    public void interrupt() throws UnableToInterruptJobException {
        if( this.currentThread != null ) {
            this.currentThread.interrupt();
        }
    }

}

package egovframework.desm.cmmn.scheduler.job;

import org.quartz.InterruptableJob;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.UnableToInterruptJobException;
import org.springframework.context.ApplicationContext;
import org.springframework.scheduling.quartz.QuartzJobBean;

import egovframework.desm.cmmn.scheduler.biz.SchedulerService;

public abstract class BaseJob extends QuartzJobBean implements InterruptableJob {
	
	private Thread currentThread = null;
	
	protected SchedulerService jobService;
	
	@Override
	protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {
		this.currentThread = Thread.currentThread();

        if(jobService == null) { 
            ApplicationContext appCtx = (ApplicationContext) jobExecutionContext.getJobDetail()
                .getJobDataMap().get("appContext");
            jobService = appCtx.getBean(SchedulerService.class); 
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

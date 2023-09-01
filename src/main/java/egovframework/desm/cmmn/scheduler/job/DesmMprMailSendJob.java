package egovframework.desm.cmmn.scheduler.job;

import org.quartz.JobExecutionContext;
import org.springframework.stereotype.Component;

@Component
public class DesmMprMailSendJob extends BaseJob {

	@Override
	protected void doExecute(JobExecutionContext context) {
		// TODO Auto-generated method stub
    	java.text.SimpleDateFormat sdf1 = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		System.out.println("[test MprMailSendJob]===> " + sdf1.format(new java.util.Date()));
	}

}

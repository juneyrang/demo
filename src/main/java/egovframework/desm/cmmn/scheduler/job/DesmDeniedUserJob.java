package egovframework.desm.cmmn.scheduler.job;

import org.quartz.JobExecutionContext;
import org.springframework.stereotype.Component;

@Component
public class DesmDeniedUserJob extends BaseJob {

	@Override
	protected void doExecute(JobExecutionContext context) {
		// TODO Auto-generated method stub
		deniedUser();
	}

	private void deniedUser() {
		jobService.updateDeniedUser(null);
	}

}

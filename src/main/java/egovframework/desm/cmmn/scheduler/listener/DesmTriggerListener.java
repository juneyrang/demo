package egovframework.desm.cmmn.scheduler.listener;

import org.quartz.JobExecutionContext;
import org.quartz.Trigger;
import org.quartz.Trigger.CompletedExecutionInstruction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.quartz.TriggerListener;

@Component
public class DesmTriggerListener implements TriggerListener {

	private static final Logger logger = LoggerFactory.getLogger(DesmTriggerListener.class);

	private String name = "desmTriggerListener";

	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return name;
	}

	@Override
	public void triggerFired(Trigger trigger, JobExecutionContext context) {
		// TODO Auto-generated method stub
//		logger.info("triggerFired at {} :: jobKey ===> {}", trigger.getStartTime(), trigger.getJobKey());
	}

	@Override
	public boolean vetoJobExecution(Trigger trigger, JobExecutionContext context) {
		// TODO Auto-generated method stub
//		logger.info("vetoJobExecution at {} :: jobKey ===> {}", trigger.getStartTime(), trigger.getJobKey());
		return false;
	}

	@Override
	public void triggerMisfired(Trigger trigger) {
		// TODO Auto-generated method stub
//		logger.info("triggerMisfired at {} :: jobKey ===> {}", trigger.getStartTime(), trigger.getJobKey());
	}

	@Override
	public void triggerComplete(Trigger trigger, JobExecutionContext context,
			CompletedExecutionInstruction triggerInstructionCode) {
		// TODO Auto-generated method stub	
//		logger.info("StartTime at {} :: jobKey ===> {}", trigger.getStartTime(), trigger.getJobKey());
	}
	
}

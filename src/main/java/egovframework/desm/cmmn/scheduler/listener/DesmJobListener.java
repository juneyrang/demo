package egovframework.desm.cmmn.scheduler.listener;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.JobListener;
import org.springframework.stereotype.Component;

import egovframework.desm.cmmn.scheduler.biz.SchedulerService;

@Component
public class DesmJobListener implements JobListener {

	private String name = "desmJobListener";

	private SchedulerService schedulerService;
	
	public void addService(SchedulerService schedulerService) {
		this.schedulerService = schedulerService;
	}
	
	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return name;
	}

	@Override
	public void jobToBeExecuted(JobExecutionContext context) {
		// TODO Auto-generated method stub
	}

	@Override
	public void jobExecutionVetoed(JobExecutionContext context) {
		// TODO Auto-generated method stub
	}

	@Override
	public void jobWasExecuted(JobExecutionContext context, JobExecutionException jobException) {
		// TODO Auto-generated method stub
//		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		Map<String, Object> paramMap = new HashMap<>();
//		paramMap.put("SCHE_NO"				, context.getJobDetail().getJobDataMap().get("SCHE_NO")	);
//		paramMap.put("JOB_KEY"				, context.getJobDetail().getKey().toString()			);
//		paramMap.put("JOB_FIRETIME"			, format.format(context.getFireTime())					);
//		paramMap.put("JOB_RUNTIME"			, context.getJobRunTime()								);
//		paramMap.put("JOB_NEXT_FIRETIME"	, format.format(context.getNextFireTime())				);
//		paramMap.put("JOB_STATUS"			, jobException == null ? "Success" : "Fail"				);
//		paramMap.put("ERROR_MESSAGE"		, jobException == null ? "" : jobException.getMessage()	);
//		schedulerService.saveHistory(paramMap);
	}

}

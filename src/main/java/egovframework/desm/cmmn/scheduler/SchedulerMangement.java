package egovframework.desm.cmmn.scheduler;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

import javax.annotation.Resource;

import org.quartz.CronScheduleBuilder;
import org.quartz.Job;
import org.quartz.JobBuilder;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.SimpleScheduleBuilder;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.TriggerKey;
import org.quartz.UnableToInterruptJobException;
import org.quartz.impl.StdSchedulerFactory;
import org.quartz.impl.matchers.GroupMatcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import egovframework.desm.cmmn.scheduler.biz.SchedulerService;
import egovframework.desm.cmmn.scheduler.listener.DesmJobListener;
import egovframework.desm.cmmn.scheduler.listener.DesmTriggerListener;
import egovframework.rte.fdl.property.EgovPropertyService;

@Component("schedulerMangement")
public class SchedulerMangement implements ApplicationListener<ApplicationEvent> {
	private static final Logger logger = LoggerFactory.getLogger(SchedulerMangement.class);

	private final String JOB_CLASS_PREFIX = "egovframework.desm.cmmn.scheduler.job.";
	
	@Autowired
	private ApplicationContext appContext;

	@Resource(name="propertiesService")
	protected EgovPropertyService propertiesService;
	
	@Resource
	private DesmJobListener jobListener;
	@Resource
	private DesmTriggerListener triggerListener;

	public Scheduler scheduler;
	private SchedulerFactory schedulerFactory;
	
	private SchedulerService schedulerService;

	@Override
	public void onApplicationEvent(ApplicationEvent event) {
		// TODO Auto-generated method stub
		if(event instanceof ContextRefreshedEvent) {
			if(appContext != ((ContextRefreshedEvent) event).getApplicationContext()) {
				if("Y".equalsIgnoreCase(propertiesService.getString("quartz.schedule.use"))) {
					start();
				}
			}
		} else if(event instanceof ContextClosedEvent) {
			stop();
		}
	}

    public void start() {
        logger.info("[scheduler] start");
		try {
	        schedulerFactory = new StdSchedulerFactory();
	        scheduler = schedulerFactory.getScheduler();
	        scheduler.start();

	        jobListener.addService(schedulerService);
	        scheduler.getListenerManager().addJobListener(jobListener);
	        scheduler.getListenerManager().addTriggerListener(triggerListener);

	        List<Map<String, Object>> scheduleList = schedulerService.getScheduleList(null);
            if(scheduleList != null) {
    	        for(Map<String, Object> schedule : scheduleList) {
    	            if("Y".equals(schedule.get("IS_USE"))) {
    	            	Map<String, Object> paramMap = new HashMap<>();
    	            	paramMap.put("SCHE_NO", schedule.get("SCHE_NO").toString());
    	    			addJob(schedule, paramMap);
    	            }
    	        }
            }
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }

    public void stop() {
        logger.info("[scheduler] stop " + scheduler);
		try {
	    	if(scheduler != null && !scheduler.isShutdown()) {
		        Set<JobKey> allJobKeys = scheduler.getJobKeys(GroupMatcher.anyGroup());
		        allJobKeys.forEach((jobKey) -> {
		            try {
		                scheduler.interrupt(jobKey);
		            } catch (UnableToInterruptJobException e) {
		                e.printStackTrace();
		            }
		        });
	        
	    		scheduler.shutdown(true);
	    	}
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
    
	@Resource(name = "schedulerService")
	public void setSchedulerService(SchedulerService schedulerService) {
		this.schedulerService = schedulerService;
    }
	
	public void addJob(Map<String, Object> jobMap) {
    	try {
        	deleteJob(jobMap.get("SCHE_NAME").toString());
  			addJob(jobMap, null);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void addJob(Map<String, Object> jobMap, Map<String, Object> paramMap) {
    	try {
        	String identity 	= jobMap.get("SCHE_NAME").toString();
        	String type 		= jobMap.get("SCHE_TYPE").toString();
        	String value 		= jobMap.get("SCHE_VALUE").toString();
        	String jobClass 	= jobMap.get("JOB_CLASS").toString();

        	JobDetail jobDetail = getJobDetail(identity, jobClass, paramMap);
        	Trigger trigger = getTrigger(identity, type, value);
        	
	        scheduler.scheduleJob(jobDetail, trigger);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
    
	public void deleteJob(String identity) {
		try {
			JobKey jobKey = getJobKey(identity);
			if(scheduler.checkExists(jobKey)) {
	            try {
	                scheduler.interrupt(jobKey);
	            } catch (UnableToInterruptJobException e) {
	                e.printStackTrace();
	            }
				scheduler.deleteJob(jobKey);
			}
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void chgStatusJob(String status, String identity) throws SchedulerException {
		if("0".equals(status)) {
			resumeJob(identity);
		} else {
			pauseJob(identity);
		}
	}
	
	private void resumeJob(String identity) throws SchedulerException {
		scheduler.resumeJob(getJobKey(identity));
        scheduler.resumeTrigger(getTriggerKey(identity));
	}

	private void pauseJob(String identity) throws SchedulerException {
		scheduler.pauseJob(getJobKey(identity));
        scheduler.pauseTrigger(getTriggerKey(identity));
	}
	
	private JobKey getJobKey(String identity) {
		JobKey jobKey = null;
		try {
	        Set<JobKey> allJobKeys = scheduler.getJobKeys(GroupMatcher.anyGroup());
	        Iterator<JobKey> jobKeys = allJobKeys.iterator();
	        while(jobKeys.hasNext()) {
	        	JobKey key = jobKeys.next();
	        	if (Objects.equals(identity, key.getName())) {
	        		jobKey = key;
		        }
	        }
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return jobKey;
	}

	private TriggerKey getTriggerKey(String identity) {
		TriggerKey triggerKey = null;
		try {
	        Set<TriggerKey> allTriggerKeys = scheduler.getTriggerKeys(GroupMatcher.anyGroup());
	        Iterator<TriggerKey> triggerKeys = allTriggerKeys.iterator();
	        while(triggerKeys.hasNext()) {
	        	TriggerKey key = triggerKeys.next();
	        	if (Objects.equals(identity, key.getName())) {
	        		triggerKey = key;
		        }
	        }
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return triggerKey;
	}

	@SuppressWarnings("unchecked")
	private JobDetail getJobDetail(String identity, String jobClass, Map<String, Object> paramMap) throws ClassNotFoundException {
        JobDataMap jobDataMap = new JobDataMap();
        jobDataMap.put("appContext", appContext);
        if(paramMap != null) {
            for( String key : paramMap.keySet() ){
            	jobDataMap.put(key, paramMap.get(key));
            }
        }
        
        return JobBuilder.newJob((Class<? extends Job>) Class.forName(JOB_CLASS_PREFIX + jobClass))
    			.withIdentity(identity)
    			.usingJobData(jobDataMap)
    			.build();
	}
	
	private Trigger getTrigger(String identity, String type, String value) {
		return (type.toUpperCase().equals("CRON")) ? 
					TriggerBuilder.newTrigger()
	    	  		.withIdentity(new TriggerKey(identity))  
	  	  		    .withSchedule(CronScheduleBuilder.cronSchedule(value))
	      			.build()
      			:
	  				TriggerBuilder.newTrigger()
	  	  		    .withIdentity(new TriggerKey(identity))
	  		        .startNow()
	  		        .withSchedule(SimpleScheduleBuilder.simpleSchedule()
					  		        .withIntervalInSeconds(Integer.parseInt(value))
					  		        .repeatForever())            
	  		        .build();
	}

}

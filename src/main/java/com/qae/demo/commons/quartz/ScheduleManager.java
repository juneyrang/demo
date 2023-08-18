package com.qae.demo.commons.quartz;

import com.qae.demo.commons.quartz.biz.ScheduleService;
import com.qae.demo.commons.quartz.listener.QuartzJobListener;
import com.qae.demo.commons.quartz.listener.QuartzTriggerListener;
import jakarta.annotation.Resource;
import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;
import org.quartz.impl.matchers.GroupMatcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.*;

@Component("scheduleManager")
public class ScheduleManager implements ApplicationListener<ApplicationEvent> {

    private static final Logger logger = LoggerFactory.getLogger(ScheduleManager.class);

    @Autowired
    private ApplicationContext appContext;

    @Resource
    private QuartzJobListener jobListener;
    @Resource
    private QuartzTriggerListener triggerListener;

    public Scheduler scheduler;
    private SchedulerFactory schedulerFactory;

    @Autowired
    @Lazy
    private ScheduleService scheduleService;

//    @Resource(name = "scheduleService")
//    public void setSchedulerService(ScheduleService scheduleService) {
//        this.scheduleService = scheduleService;
//    }

    @Override
    public void onApplicationEvent(ApplicationEvent event) {
        if(event instanceof ContextRefreshedEvent) {
//            if(appContext != ((ContextRefreshedEvent) event).getApplicationContext()) {
                start();
//            }
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

            jobListener.addService(scheduleService);
            scheduler.getListenerManager().addJobListener(jobListener);
            scheduler.getListenerManager().addTriggerListener(triggerListener);

            List<Map<String, Object>> scheduleList = scheduleService.getScheduleList(null);
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

    @SuppressWarnings("unchecked")
    private JobDetail getJobDetail(String identity, String jobClass, Map<String, Object> paramMap) throws ClassNotFoundException {
        JobDataMap jobDataMap = new JobDataMap();
        jobDataMap.put("appContext", appContext);
        if(paramMap != null) {
            for( String key : paramMap.keySet() ){
                jobDataMap.put(key, paramMap.get(key));
            }
        }

        return JobBuilder.newJob((Class<? extends Job>) Class.forName(jobClass))
                .withIdentity(identity)
                .usingJobData(jobDataMap)
                .build();
    }

}

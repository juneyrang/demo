package egovframework.desm.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
public class DesmScheduleController {
	private static final Logger logger = LoggerFactory.getLogger(DesmScheduleController.class);

	//@Scheduled(cron = "*/5 * * * * *") 
	//@RequestMapping(value = "/aa.do", method = RequestMethod.GET)
	//public void test2() { 
		//System.out.println("dely 5000"); 
	//}

}

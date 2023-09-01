package egovframework.desm.cmmn.scheduler.biz;

import java.io.UnsupportedEncodingException;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SchedulerController {
	private static final Logger logger = LoggerFactory.getLogger(SchedulerController.class);

	@Resource(name = "schedulerService")
	private SchedulerService schedulerService;

	@Resource(name = "txManager")
	protected DataSourceTransactionManager txManager;

	@RequestMapping(value={"/getScheduleList.do"}, method=RequestMethod.POST)
	public ModelAndView getScheduleList(@RequestParam Map<String, Object> paramMap) throws UnsupportedEncodingException{
		logger.info("getScheduleList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", schedulerService.getScheduleList(paramMap));
		
		return mav;
	}

	@RequestMapping(value={"/chgStatusSchedule.do"}, method=RequestMethod.POST)
	public ModelAndView chgStatusSchedule(@RequestParam Map<String, Object> paramMap) throws UnsupportedEncodingException{
		logger.info("chgStatusSchedule.do" + paramMap);

		ModelAndView mav = new ModelAndView("jsonView");
		try {
			int iRslt = schedulerService.chgStatusSchedule(paramMap);
			logger.info("chgStatusSchedule ===> " + iRslt);
			mav.addObject("success", "OK");
		} catch(Exception e){
			mav.addObject("error", e.getMessage());
		}
		
		return mav;
	}

	@RequestMapping(value="/saveSchedule.do", method=RequestMethod.POST)
	public ModelAndView saveSchedule(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpServletRequest request, HttpSession session) throws Exception{
		logger.info("saveSchedule.do");

		ModelAndView mav = new ModelAndView("jsonView");

		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);

		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	schedulerService.saveSchedule(paramMap);
	    	
			txManager.commit(txStatus);

			mav.addObject("success", paramMap.get("jobCode"));

			return mav;
		} catch(Exception e){
			mav.addObject("error", e.getMessage());
			txManager.rollback(txStatus);
			return mav;
		}
	}

	@RequestMapping(value="/deleteSchedule.do", method=RequestMethod.POST)
	public ModelAndView deleteSchedule(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpSession session) throws Exception{
		logger.info("deleteSchedule.do");

		ModelAndView mav = new ModelAndView("jsonView");

		try {
			schedulerService.deleteSchedule(paramMap);

			mav.addObject("success", true);
			return mav;
		} catch(Exception e){

			mav.addObject("error", e.getMessage());
			return mav;
		}
	}

	@RequestMapping(value={"/getHistoryList.do"}, method=RequestMethod.POST)
	public ModelAndView getHistoryList(@RequestParam Map<String, Object> paramMap) throws UnsupportedEncodingException{
		logger.info("getHistoryList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", schedulerService.getHistoryList(paramMap));
		
		return mav;
	}

	@RequestMapping(value={"/desmMprMailSend.do"}, method=RequestMethod.POST)
	public ModelAndView desmMprMailSend(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("desmMprMailSend.do");

		ModelAndView mav = new ModelAndView("jsonView");
		try {
			schedulerService.desmMprMailSend(paramMap);
			mav.addObject("success", "OK");
		} catch(Exception e){
			mav.addObject("error", e.getMessage());
			return mav;
		}
		return mav;
	}

}

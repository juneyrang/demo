package egovframework.desm.cmmn.firebase;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/*
 * Web에서 Firebase관련 CRUD가 필요할 경우 사용.
 * ex) 공지메세지 Push, fcmToken Refresh 등
 * 
 * 사용 테이블
 * # desm_fcm_token
 * - project_no / user_ad / fcm_token / creation_date / last_update_date / is_validation / platform
 * # desm_fcm_history
 * - project_no / user_ad / fcm_token / type / sent_date / title / body / data / response / platform
 * */
@Controller
@RequestMapping(value = "/firebase")
public class FirebaseController {
	private static final Logger logger = LoggerFactory.getLogger(FirebaseController.class);
	
	@Resource(name = "firebaseService")
	FirebaseService firebaseService;
	
	@Resource(name = "txManager") 
	protected DataSourceTransactionManager txManager;
	
	@RequestMapping(value="/sendFcmByWebTest.do", method=RequestMethod.POST)
	public ModelAndView sendFcmByWebTest(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("/firebase/sendFcmByWebTest.do");
		//USER_AD, TITLE, BODY
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			resultMap = firebaseService.sendFcmByWebTest(paramMap);
			mav.addObject("result", resultMap);
			return mav;
		} catch(Exception e) {	
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
    		mav.addObject("result", resultMap);
			return mav;
		}
	}
}

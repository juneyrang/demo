package egovframework.desm.web;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import egovframework.desm.service.DesmService;
import egovframework.desm.service.ManageService;



@Controller
public class ManageController {
	private static final Logger logger = LoggerFactory.getLogger(ManageController.class);

	@Resource(name = "desmService")
	private DesmService desmService;
	
	@Resource(name = "manageService")
	private ManageService manageService;	
	
	@RequestMapping(value = {"/operator.do"} , method = RequestMethod.GET)
	public String inddex() {
		logger.info("OP 관리 페이지: operator.jsp");
		return "desm/operator";
	}
	
	@RequestMapping(value={"/selectOperatorList.do"}, method=RequestMethod.POST)
	public ModelAndView selectOperatorList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("selectOperatorList.do");
		
		desmService.setSessionLang(null);		//JDBC 사용시 코드 관련 문제로 오류 발생하면 주석 해제
    	
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", manageService.selectOperatorList(paramMap));	
		
		return mav;
	}
	
	@RequestMapping(value="/saveOperatorInfo.do", method=RequestMethod.POST)
	public ModelAndView saveOperatorInfo(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpSession session) {
		
		logger.info("saveOperatorInfo.do"); 
		System.out.println("#### View JSON : " + paramMap);

		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			//기본데이터 저장
	    	paramMap.put("ssoUserAD", session.getAttribute("SSOID"));
	    	paramMap.put("ssoErpID", session.getAttribute("SSOUSERERPID"));
	    	
	    	paramMap.put("jobCode", URLDecoder.decode(paramMap.get("jobCode").toString(),"UTF-8"));
	    	paramMap.put("deptCode", URLDecoder.decode(paramMap.get("deptCode").toString(),"UTF-8"));
	    	paramMap.put("opAD", URLDecoder.decode(paramMap.get("opAD").toString(),"UTF-8"));
	    	paramMap.put("opSubAD", URLDecoder.decode(paramMap.get("opSubAD").toString(),"UTF-8"));
	    	

	    	manageService.saveOperatorInfo(paramMap);
	    	
	    	
	    	mav.addObject("success", paramMap.get("jobCode"));
			
			return mav;
			
		} catch(Exception e){
			
			mav.addObject("error", e.getMessage());
			mav.addObject("jobcode", paramMap.get("jobCode"));

			return mav;
		}				
	}
	
	@RequestMapping(value="/deleteOperatorInfo.do", method=RequestMethod.POST)
	public ModelAndView deleteOperatorInfo(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {
		
		logger.info("deleteOperatorInfo.do"); 
		System.out.println("#### View JSON : " + paramMap);

		ModelAndView mav = new ModelAndView("jsonView");
		try {
			//삭제
			manageService.deleteOperatorInfo(paramMap);
			
			mav.addObject("success", paramMap.get("jobCode"));
			
			return mav;
			
		} catch(Exception e){
			mav.addObject("error", e.getMessage());
			mav.addObject("jobcode", paramMap.get("jobCode"));
			return mav;
		}				
	}		
	
}

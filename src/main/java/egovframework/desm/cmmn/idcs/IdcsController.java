package egovframework.desm.cmmn.idcs;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import net.sf.json.JSONObject;

/*
 * IDCS Admin 관리용 Application에 Rest API로 접근해서 Handling하기 위함.
 * */
@Controller
public class IdcsController {
	private static final Logger logger = LoggerFactory.getLogger(IdcsController.class);

	@Autowired
	IdcsService idcsService;

	@RequestMapping(value={"/getIdcsUserListTest.do"}, method=RequestMethod.POST)
	public ModelAndView getIdcsUserList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdcsUserListTest.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", idcsService.getIdcsUserListTest());

		return mav;
	}

	@RequestMapping(value={"/searchIDCSUser.do"}, method=RequestMethod.POST)
	public ModelAndView searchIDCSUser(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("searchIDCSUser.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", idcsService.searchIDCSUser(paramMap));

		return mav;
	}

	@RequestMapping(value={"/createIDCSUser.do"}, method=RequestMethod.POST)
	public ModelAndView createIDCSUser(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("createIDCSUser.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", idcsService.createIDCSUser(paramMap));

		return mav;
	}

	@RequestMapping(value={"/updateIDCSUser.do"}, method=RequestMethod.POST)
	public ModelAndView updateIDCSUser(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("updateIDCSUser.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", idcsService.updateIDCSUser(paramMap));

		return mav;
	}

	@RequestMapping(value={"/resetIDCSPassword.do"}, method=RequestMethod.POST)
	public ModelAndView resetIDCSPassword(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("resetIDCSPassword.do");
		ModelAndView mav = new ModelAndView("jsonView");
		//로그인 사용자 정보
    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", idcsService.resetIDCSPassword(paramMap));

		return mav;
	}


	@RequestMapping(value={"/updateUserIDCSYn.do"}, method=RequestMethod.POST)
	public ModelAndView updateUserIDCSYn(@RequestBody String paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("updateUserIDCSYn.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", idcsService.updateUserIDCSYn(JSONObject.fromObject(paramMap)));
		return mav;
	}

}

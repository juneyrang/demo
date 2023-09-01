package egovframework.desm.web;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import egovframework.desm.service.TestService;
import egovframework.rte.fdl.property.EgovPropertyService;

@Controller
public class TestController {
	private static final Logger logger = LoggerFactory.getLogger(TestController.class);

	@Resource(name = "testService")
	private TestService testService;
	
	@Resource(name = "txManager") 
	protected DataSourceTransactionManager txManager;
	
	@RequestMapping(value={"/getTestGridView.do"}, method=RequestMethod.POST)
	public ModelAndView getTestGridView(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTestGridView.do");
		ModelAndView mav = new ModelAndView("jsonView");		
		mav.addObject("results", testService.getTestGridView(paramMap));
		return mav;
	}
	
	@RequestMapping(value={"/getTestDataList.do"}, method=RequestMethod.POST)
	public ModelAndView getTestDataList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTestDataList.do");
		ModelAndView mav = new ModelAndView("jsonView");		
		mav.addObject("results", testService.getTestDataList(paramMap));
		return mav;
	}
	
	@RequestMapping(value={"/sendMailSupplySummaryTest.do"}, method=RequestMethod.POST)
	public ModelAndView sendMailSupplySummaryTest(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("sendMailSupplySummaryTest.do");
		
		
		testService.sendMailSupplySummaryTest(paramMap);
		
		ModelAndView mav = new ModelAndView("jsonView");		
		mav.addObject("results", "finish");
		return mav;
	}
	
	@RequestMapping(value={"/getTestTable.do"}, method=RequestMethod.POST)
	public ModelAndView getTestTable(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTestGridView.do");
		ModelAndView mav = new ModelAndView("jsonView");		
		mav.addObject("results", testService.getTestTable(paramMap));
		return mav;
	}
}

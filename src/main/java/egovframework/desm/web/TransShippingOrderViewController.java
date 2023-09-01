package egovframework.desm.web;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ModelAndView;

import egovframework.desm.service.TransShippingOrderViewService;
import egovframework.rte.fdl.property.EgovPropertyService;



@Controller
public class TransShippingOrderViewController {
	private static final Logger logger = LoggerFactory.getLogger(TransShippingOrderViewController.class);
	
	@Resource(name="propertiesService")
	protected EgovPropertyService propertiesService ;
	
	@Resource(name = "multipartResolver")
	CommonsMultipartResolver multipartResolver;
	
	@Resource(name = "txManager") 
	protected DataSourceTransactionManager txManager;	
	
	@Resource(name = "transShippingOrderViewService")
	private TransShippingOrderViewService transShippingOrderViewService;
	
	@RequestMapping(value={"/getTransShippingOrderView.do"}, method=RequestMethod.POST)
	public ModelAndView getTransShippingOrderView(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransShippingOrderView.do");
		
		ModelAndView mav = new ModelAndView("jsonView");		
		mav.addObject("results", transShippingOrderViewService.getTransShippingOrderView(paramMap));
		
		return mav;
	}	
	
	@RequestMapping(value={"/getTransDlgTransRequestInvoiceGridView.do"}, method=RequestMethod.POST)
	public ModelAndView getTransDlgTransRequestInvoiceGridView(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransDlgTransRequestInvoiceGridView.do");
		
		ModelAndView mav = new ModelAndView("jsonView");		
		mav.addObject("results", transShippingOrderViewService.getTransDlgTransRequestInvoiceGridView(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getTransDlgTransRequestMailGridView.do"}, method=RequestMethod.POST)
	public ModelAndView getTransDlgTransRequestMailGridView(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransDlgTransRequestMailGridView.do");
		
		ModelAndView mav = new ModelAndView("jsonView");		
		mav.addObject("results", transShippingOrderViewService.getTransDlgTransRequestMailGridView(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value="/cancelTransDlgTransRequestInvoice.do", method=RequestMethod.POST)
	public ModelAndView cancelTransDlgTransRequestInvoice(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("cancelTransDlgTransRequestInvoice.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
			int cnt = 0;
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("TRANS_USR_ID"));
	    	paramMap.put("SENDER", session.getAttribute("TRANS_USR_ID"));
	    	paramMap.put("SENDER_EMAIL", session.getAttribute("TRANS_EMAIL"));
	    	
	    	String loc = propertiesService.getString("location");
	    	paramMap.put("location", loc);
	    	paramMap.put("LOGIN_URL", propertiesService.getString("mail.login.url.prod"));
	    	if(loc.equals("dev")) {
	    		paramMap.put("LOGIN_URL", propertiesService.getString("mail.login.url.dev"));
	    	}
	    	paramMap.put("host", propertiesService.getString("mail.host"));
	    	paramMap.put("port", propertiesService.getString("mail.port"));
	    	paramMap.put("encoding", propertiesService.getString("mail.encoding"));
	    	paramMap.put("username", propertiesService.getString("mail.username"));
	    	paramMap.put("password", propertiesService.getString("mail.password"));	 
	    	

			//기본데이터 저장	    	
	    	cnt = transShippingOrderViewService.cancelTransDlgTransRequestInvoice(paramMap);
	    	
	    	if(cnt < 0) {
	    		txManager.rollback(txStatus);			
				mav.addObject("success", "OK");
				mav.addObject("error_code", cnt);
	    	}
	    	else {
		    	txManager.commit(txStatus);			
				mav.addObject("success", "OK");
	    	}
			
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}	
	
	@RequestMapping(value={"/getTransShippingOrderViewPackage.do"}, method=RequestMethod.POST)
	public ModelAndView getTransShippingOrderViewPackage(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransShippingOrderViewPackage.do");
		
		ModelAndView mav = new ModelAndView("jsonView");		
		mav.addObject("results", transShippingOrderViewService.getTransShippingOrderViewPackage(paramMap));
		
		return mav;
	}	

}

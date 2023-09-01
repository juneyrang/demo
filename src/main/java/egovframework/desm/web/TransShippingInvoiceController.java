package egovframework.desm.web;

import java.io.File;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;

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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ModelAndView;

import egovframework.desm.service.TransShippingInvoiceService;
import egovframework.desm.service.TransShippingRequestService;
import egovframework.rte.fdl.property.EgovPropertyService;



@Controller
public class TransShippingInvoiceController {
	private static final Logger logger = LoggerFactory.getLogger(TransShippingInvoiceController.class);

	@Resource(name = "transShippingInvoiceService")
	private TransShippingInvoiceService transShippingInvoiceService;
	
	@Resource(name = "transShippingRequestService")
	private TransShippingRequestService transShippingRequestService;	
	
	@Resource(name="propertiesService")
	protected EgovPropertyService propertiesService ;
	
	@Resource(name = "multipartResolver")
	CommonsMultipartResolver multipartResolver;
	
	@Resource(name = "txManager") 
	protected DataSourceTransactionManager txManager;	
	
	
	
	@RequestMapping(value={"/getTransShippingInvoice.do"}, method=RequestMethod.POST)
	public ModelAndView getTransShippingInvoice(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransShippingInvoice.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		String bg_name = session.getAttribute("TRANS_BG_NAME") == null ? "" : (String)session.getAttribute("TRANS_BG_NAME");
		String bg_code = session.getAttribute("TRANS_BG_CODE") == null ? "" : (String)session.getAttribute("TRANS_BG_CODE");
		String usr_id = session.getAttribute("TRANS_USR_ID") == null ? "" : (String)session.getAttribute("TRANS_USR_ID");
		String pjt_role_cd = session.getAttribute("TRANS_PRJ_ROLE_CD") == null ? "" : (String)session.getAttribute("TRANS_PRJ_ROLE_CD");
		
		
		paramMap.put("TRANS_BG_NAME", bg_name);
		paramMap.put("TRANS_BG_CODE", bg_code);
		paramMap.put("TRANS_USR_ID", usr_id);
		paramMap.put("TRANS_PRJ_ROLE_CD", pjt_role_cd);	
		
		mav.addObject("results", transShippingInvoiceService.getTransShippingInvoice(paramMap));		
		
		
		return mav;
	}
	
	@RequestMapping(value={"/getTransShippingInvoiceDlgDetailRequest.do"}, method=RequestMethod.POST)
	public ModelAndView getTransShippingInvoiceDlgDetailRequest(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransShippingInvoiceDlgDetailRequest.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		String dept_cd = session.getAttribute("TRANS_DEPT_CD") == null ? "" : (String)session.getAttribute("TRANS_DEPT_CD");
		paramMap.put("TRANS_DEPT_CD", dept_cd);
		
		mav.addObject("results", transShippingInvoiceService.getTransShippingInvoiceDlgDetailRequest(paramMap));
		
		
		return mav;
	}	

	@RequestMapping(value={"/getTransShippingInvoiceDlgDetailPackingList.do"}, method=RequestMethod.POST)
	public ModelAndView getTransShippingInvoiceDlgDetailPackingList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransShippingInvoiceDlgDetailPackingList.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		mav.addObject("results", transShippingInvoiceService.getTransShippingInvoiceDlgDetailPackingList(paramMap));
		
		
		return mav;
	}
	
	@RequestMapping(value="/saveTransShippingInvoiceDlgAttList.do", method=RequestMethod.POST)
	public ModelAndView saveTransShippingInvoiceDlgAttList(@RequestParam Map<String, Object> paramMap , @RequestParam MultipartFile[] txtAttachFile, HttpServletRequest request, HttpSession session) throws Exception{
		
		logger.info("saveTransShippingInvoiceDlgAttList.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {

	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
	    	
	    	MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
			Map<String, MultipartFile> files = multiRequest.getFileMap();
			Iterator<Entry<String, MultipartFile>> itr = files.entrySet().iterator();
			
			
    		boolean whileCheck = true;
    		if(paramMap.get("FILE_GRP_CD") == null || paramMap.get("FILE_GRP_CD").toString().equals("") || paramMap.get("FILE_GRP_CD").toString().equals("null")) {
    			whileCheck = true;
    			while(whileCheck) {
	    			paramMap.put("FILE_GRP_CD", UUID.randomUUID().toString());
	    			List<Map<String, Object>> fileCheckList = transShippingRequestService.getTransShippingRequestFileCheckGrp(paramMap);
	    			
	    			if(fileCheckList.size() == 0) {
	    				whileCheck = false;
	    			}
    			}
    		}	
    		
    		boolean checkfileNm = false;
    		while (itr.hasNext()) {
				Entry<String, MultipartFile> entry = itr.next(); 
				MultipartFile myfile = entry.getValue();    	
				
    			if(myfile.isEmpty()){   
		      		logger.info("empty");
		            break;  
		    	}else{ 
	    			String fileName = new String(myfile.getOriginalFilename().getBytes("UTF-8"),"UTF-8");
	    			fileName = fileName.toUpperCase();
	    			String[] fileNameArr = fileName.split("\\.");
	    			
	    			if(fileNameArr.length > 1) {
		    			String ex = fileNameArr[fileNameArr.length - 1];
		    			if(ex.equals("ASP") || ex.equals("ASPX") || ex.equals("JSP") || ex.equals("PHP") || ex.equals("INC") || ex.equals("CGI") ||
		    			   ex.equals("HTML") || ex.equals("HTM") || ex.equals("JS") || ex.equals("JAR") || ex.equals("JHTML") || ex.equals("PHP3") || ex.equals("PHTML")) {
		    				
		    				checkfileNm = true;
		    			}	    				
	    			}		    		
		    	}
    		}
    		
    		if(checkfileNm) {
    			txManager.rollback(txStatus);
    			mav.addObject("error", "-4");
    			return mav;    			
    		}    		
    		
    		itr = files.entrySet().iterator();      		
    		while (itr.hasNext()) {
				Entry<String, MultipartFile> entry = itr.next();
				
			 
				MultipartFile myfile = entry.getValue();
		    	if(myfile.isEmpty()){   
		      		logger.info("empty");
		            break;  
		    	}else{      		    		
	    			whileCheck = true;
	    			while(whileCheck) {
		    			paramMap.put("ATT_ID", UUID.randomUUID().toString() + "-file");
		    			List<Map<String, Object>> fileCheckList = transShippingRequestService.getTransShippingRequestFileCheckId(paramMap);
		    			
		    			if(fileCheckList.size() == 0) {
		    				whileCheck = false;
		    			}
	    			}	    	
		    		
	    			paramMap.put("ORGN_FILE_NM", new String(myfile.getOriginalFilename().getBytes("UTF-8"),"UTF-8"));
	    			paramMap.put("ATT_FILE_NM", paramMap.get("ATT_ID").toString());
	    			
	    			String[] dateArr = paramMap.get("TO_DAY").toString().split("/");
	    			paramMap.put("ATT_FILE_PATH", dateArr[0] + "\\" + dateArr[1] + "\\" + dateArr[2] + "\\" + paramMap.get("ATT_ID").toString());
	    			paramMap.put("ATT_FILE_SIZ", myfile.getSize());
	    			
	    			String uploadDir = propertiesService.getString("file.upload.path") + "\\" + dateArr[0] + "\\" + dateArr[1] + "\\" + dateArr[2];
	    			String[] uploadDirArr = uploadDir.split("\\\\");
	    			
	    			String forderDir = "";
	    			for(int i = 1; i < uploadDirArr.length; i++) {
	    				
	    				if( i == 1) {
	    					forderDir = uploadDirArr[0];
	    				}
	    				forderDir += "\\" + uploadDirArr[i];
	    				
		    			File Folder = new File(forderDir);
		    	    	if (!Folder.exists()) {
		    	    		Folder.mkdir();     
		    	    	}	    				
	    			}
	    			

	    			
		        	String path = propertiesService.getString("file.upload.path") + "\\" + paramMap.get("ATT_FILE_PATH").toString();
		    		
		        	
		        	File uploadFile = new File(path);
		        	myfile.transferTo(uploadFile);
		        	
		        	transShippingRequestService.saveTransShippingRequestDlgAttList(paramMap);
		    	}
			} 
    		
    		if(paramMap.get("INVOICE_NO_ID") != null && !paramMap.get("INVOICE_NO_ID").toString().equals("") && !paramMap.get("INVOICE_NO_ID").toString().equals("null")) {
    			transShippingInvoiceService.saveTransShippingInvoiceDlgAttList(paramMap);
    		}
	    	
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			mav.addObject("FILE_GRP_CD", paramMap.get("FILE_GRP_CD"));
			
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value={"/getTransShippingInvoiceMainProject.do"}, method=RequestMethod.POST)
	public ModelAndView getTransShippingInvoiceMainProject(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransShippingInvoiceMainProject.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		mav.addObject("results", transShippingInvoiceService.getTransShippingInvoiceMainProject(paramMap));

		
		
		return mav;
	}
	
	@RequestMapping(value={"/getTransShippingInvoiceProjectInfo.do"}, method=RequestMethod.POST)
	public ModelAndView getTransShippingInvoiceProjectInfo(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransShippingInvoiceProjectInfo.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		mav.addObject("results", transShippingInvoiceService.getTransShippingInvoiceProjectInfo(paramMap));

		
		
		return mav;
	}	
	
	@RequestMapping(value={"/getTransShippingInvoiceDlgTransRequestMailList.do"}, method=RequestMethod.POST)
	public ModelAndView getTransShippingInvoiceDlgTransRequestMailList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransShippingInvoiceDlgTransRequestMailList.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		mav.addObject("results", transShippingInvoiceService.getTransShippingInvoiceDlgTransRequestMailList(paramMap));

		
		
		return mav;
	}
	
	@RequestMapping(value={"/getTransShippingInvoiceDlgTransRequestInvoiceList.do"}, method=RequestMethod.POST)
	public ModelAndView getTransShippingInvoiceDlgTransRequestInvoiceList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransShippingInvoiceDlgTransRequestInvoiceList.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		mav.addObject("results", transShippingInvoiceService.getTransShippingInvoiceDlgTransRequestInvoiceList(paramMap));

		
		
		return mav;
	}
	
	@RequestMapping(value={"/getTransShippingInvoiceDlgPort.do"}, method=RequestMethod.POST)
	public ModelAndView getTransShippingInvoiceDlgPort(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransShippingInvoiceDlgPort.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		mav.addObject("results", transShippingInvoiceService.getTransShippingInvoiceDlgPort(paramMap));

		
		
		return mav;
	}	
	
	@RequestMapping(value="/completeTransShippingInvoice.do", method=RequestMethod.POST)
	public ModelAndView completeTransShippingInvoice(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("completeTransShippingInvoice.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {

	    	paramMap.put("USER_AD", session.getAttribute("TRANS_USR_ID"));
	    	
	    	
	    	resultMap = transShippingInvoiceService.completeTransShippingInvoice(paramMap);
	    	
	    	
	    	if(resultMap.get("result_status").toString().equals("S")) {
	    		txManager.commit(txStatus);	
	    	}
	    	else {
	    		txManager.rollback(txStatus);
	    	}
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			
		}	
		
		mav.addObject("resultMap", resultMap);
		return mav;
	}	
	
	@RequestMapping(value="/sendMailTransShippingInvoice.do", method=RequestMethod.POST)
	public ModelAndView sendMailTransShippingInvoice(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("sendMailTransShippingInvoice.do"); 
		
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
	    	cnt = transShippingInvoiceService.sendMailTransShippingInvoice(paramMap);
	    	
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
}

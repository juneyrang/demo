package egovframework.desm.web;

import java.io.File;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.Map.Entry;

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
import org.springframework.web.servlet.ModelAndView;

import egovframework.desm.service.IdsmFileService;
import egovframework.desm.service.OnshoreService;
import egovframework.rte.fdl.property.EgovPropertyService;

@Controller
public class OnshoreController {
	private static final Logger logger = LoggerFactory.getLogger(OnshoreController.class);

	@Resource(name = "onshoreService")
	private OnshoreService onshoreService;
	
	@Resource(name = "txManager") 
	protected DataSourceTransactionManager txManager;
	
	@Resource(name="propertiesService")
	protected EgovPropertyService propertiesService;	
	
	@Resource(name = "idsmFileService")
	private IdsmFileService idsmFileService;	

	@RequestMapping(value = "getDesmContractList.do")
	public ModelAndView getDesmContractList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		logger.info("getDesmContractList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", onshoreService.getDesmContractList(paramMap));
		return mav;
	}	

	@RequestMapping(value = "getDesmContractInfo.do")
	public ModelAndView getDesmContractInfo(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		logger.info("getDesmContractInfo.do");
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", onshoreService.getDesmContractInfo(paramMap));
		return mav;
	}	

	@RequestMapping(value="/saveDesmContractCreate.do", method=RequestMethod.POST)
	public ModelAndView saveDesmContractCreate(@RequestParam Map<String, Object> paramMap , @RequestParam MultipartFile[] txtAttachFile, HttpServletRequest request, HttpSession session) throws Exception {
		logger.info("saveDesmContractCreate.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			boolean whileCheck = true;
			if(paramMap.get("FILE_GRP_CD") == null || paramMap.get("FILE_GRP_CD").toString().equals("") || paramMap.get("FILE_GRP_CD").toString().equals("null")) {
				whileCheck = true;
				while(whileCheck) {
					paramMap.put("FILE_GRP_CD", UUID.randomUUID().toString());
					List<Map< String, Object >> fileCheckList = idsmFileService.getIdsmSetupDlgItemScheduleFileCheckGrp(paramMap);

					if(fileCheckList.size() == 0) {
						whileCheck = false;
					}
				}
			}

			MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
			Map<String, MultipartFile> files = multiRequest.getFileMap();
			Iterator<Entry<String, MultipartFile>> itr = files.entrySet().iterator();

    		boolean checkfileNm = false;
    		boolean checkfilePhotoNm = false;
			while (itr.hasNext()) {
				Entry<String, MultipartFile> entry = itr.next();
				MultipartFile myfile = entry.getValue();
				
				if(myfile.isEmpty()) {
			  		logger.info("empty");
					break;
				} else { 
	    			String fileName = new String(myfile.getOriginalFilename().getBytes("UTF-8"),"UTF-8");
	    			fileName = fileName.toUpperCase();
	    			String[] fileNameArr = fileName.split("\\.");
	    			
	    			String[] gubun = entry.getKey().split("_");
	    			
	    			if(fileNameArr.length > 1) {
		    			String ex = fileNameArr[fileNameArr.length - 1];

		    			if(ex.equals("ASP") || ex.equals("ASPX") || ex.equals("JSP") || ex.equals("PHP") || ex.equals("INC") || ex.equals("CGI") ||
				    	   ex.equals("HTML") || ex.equals("HTM") || ex.equals("JS") || ex.equals("JAR") || ex.equals("JHTML") || ex.equals("PHP3") || ex.equals("PHTML")) {		    				
				    			checkfileNm = true;
						}	
		    			
		    			if(gubun[0].equals("PHOTO")) {
			    			if(!ex.equals("GIF") && !ex.equals("BMP") && !ex.equals("PNG") && !ex.equals("JPEG") && !ex.equals("JPG") && !ex.equals("ICO")) {		    				
			    				checkfilePhotoNm = true;
							}		    				
		    			}    				
	    			}
				}
			}
    		
    		if(checkfileNm) {
    			txManager.rollback(txStatus);
    			mav.addObject("error", "-2");
    			return mav;    			
    		}  
    		
    		if(checkfilePhotoNm) {
    			txManager.rollback(txStatus);
    			mav.addObject("error", "-3");
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
		    			List<Map<String, Object>> fileCheckList = idsmFileService.getIdsmSetupDlgItemScheduleFileCheckId(paramMap);
		    			
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
	        		paramMap.put("FILE_GRP_CD", paramMap.get("ATTACH_GRP_CD"));
		        	
		        	File uploadFile = new File(path);
		        	myfile.transferTo(uploadFile);
		        	logger.info("!!!!!!!!" + paramMap);
		        	idsmFileService.saveIdsmSetupDlgItemScheduleFile(paramMap);
		    	}
			}


			//기본데이터 저장
	    	Map<String, Object> resultMap = onshoreService.saveDesmContractCreate(paramMap);

	    	if(resultMap.get("error") != null && !resultMap.get("error").toString().equals("")) {
				txManager.rollback(txStatus);
				mav.addObject("error", resultMap.get("error"));
				//mav.addObject("PACKAGE_NO", resultMap.get("PACKAGE_NO"));
				//mav.addObject("REQ_AVAILABLE_QTY", resultMap.get("REQ_AVAILABLE_QTY"));
				return mav;
	    	}

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			mav.addObject("CONTRACT_HEADER_ID", resultMap.get("CONTRACT_HEADER_ID"));
			mav.addObject("STATUS", resultMap.get("STATUS"));
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveDesmContractInfomation.do", method=RequestMethod.POST)
	public ModelAndView saveDesmContractInfomation(@RequestParam Map<String, Object> paramMap ,  ModelMap model, HttpSession session) throws Exception {
		logger.info("saveDesmContractInfomation.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	Map<String, Object> resultMap = onshoreService.saveDesmContractInfomation(paramMap);

	    	if(resultMap.get("error") != null && !resultMap.get("error").toString().equals("")) {
				txManager.rollback(txStatus);
				mav.addObject("error", resultMap.get("error"));
				//mav.addObject("PACKAGE_NO", resultMap.get("PACKAGE_NO"));
				//mav.addObject("REQ_AVAILABLE_QTY", resultMap.get("REQ_AVAILABLE_QTY"));
				return mav;
	    	}

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			mav.addObject("CONTRACT_HEADER_ID", resultMap.get("CONTRACT_HEADER_ID"));
			mav.addObject("STATUS", resultMap.get("STATUS"));
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveDesmContractReject.do", method=RequestMethod.POST)
	public ModelAndView saveDesmContractReject(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveDesmContractReject.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	onshoreService.saveDesmContractReject(paramMap);

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}
	
	@RequestMapping(value="/deleteDesmContractCreate.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmContractCreate(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteDesmContractCreate.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	onshoreService.deleteDesmContract(paramMap);

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}
	
	@RequestMapping(value="/sendMailDesmOnshoreContract.do", method=RequestMethod.POST)
	public ModelAndView sendMailDesmOnshoreContract(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("sendMailDesmOnshoreContract.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
			int cnt = 0;

	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

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
	    	cnt = onshoreService.sendMailDesmContract(paramMap);

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

	@RequestMapping(value = "getIdsmSetupDlgContractHeaderSearch.do")
	public ModelAndView getIdsmSetupDlgContractHeaderSearch(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		logger.info("getIdsmSetupDlgContractHeaderSearch.do");
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", onshoreService.getIdsmSetupDlgContractHeaderSearch(paramMap));
		return mav;
	}	

	@RequestMapping(value = "getIdsmSetupDlgContractLineSearch.do")
	public ModelAndView getIdsmSetupDlgContractLineSearch(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		logger.info("getIdsmSetupDlgContractLineSearch.do");
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", onshoreService.getIdsmSetupDlgContractLineSearch(paramMap));
		return mav;
	}	

	@RequestMapping(value = "getDesmOnshoreOrderList.do")
	public ModelAndView getDesmOnshoreOrderList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		logger.info("getDesmOnshoreOrderList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", onshoreService.getDesmOnshoreOrderList(paramMap));
		return mav;
	}	

	@RequestMapping(value = "getDesmOnshoreOrderInfo.do")
	public ModelAndView getDesmOnshoreOrderInfo(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		logger.info("getDesmOnshoreOrderInfo.do");
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", onshoreService.getDesmOnshoreOrderInfo(paramMap));
		return mav;
	}	

	@RequestMapping(value="/saveDesmOnshoreOrderCreate.do", method=RequestMethod.POST)
	public ModelAndView saveDesmOnshoreOrderCreate(@RequestParam Map<String, Object> paramMap , @RequestParam MultipartFile[] txtAttachFile, HttpServletRequest request, HttpSession session) throws Exception {
		logger.info("saveDesmOnshoreOrderCreate.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
	    	System.out.println(paramMap);

			//기본데이터 저장
	    	Map<String, Object> resultMap = onshoreService.saveDesmOnshoreOrderCreate(paramMap);

	    	if(resultMap.get("error") != null && !resultMap.get("error").toString().equals("")) {
				txManager.rollback(txStatus);
				mav.addObject("error", resultMap.get("error"));
				//mav.addObject("PACKAGE_NO", resultMap.get("PACKAGE_NO"));
				//mav.addObject("REQ_AVAILABLE_QTY", resultMap.get("REQ_AVAILABLE_QTY"));
				return mav;
	    	}

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			mav.addObject("ORDER_HEADER_ID", resultMap.get("ORDER_HEADER_ID"));
			mav.addObject("STATUS", resultMap.get("STATUS"));
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value = "getDesmOnshoreReceivedList.do")
	public ModelAndView getDesmOnshoreReceivedList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		logger.info("getDesmOnshoreReceivedList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", onshoreService.getDesmOnshoreReceivedList(paramMap));
		return mav;
	}	

	@RequestMapping(value = "getDesmOnshoreReceivedInfo.do")
	public ModelAndView getDesmOnshoreReceivedInfo(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		logger.info("getDesmOnshoreReceivedInfo.do");
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", onshoreService.getDesmOnshoreReceivedInfo(paramMap));
		return mav;
	}	

	@RequestMapping(value="/saveDesmOnshoreReceivedCreate.do", method=RequestMethod.POST)
	public ModelAndView saveDesmOnshoreReceivedCreate(@RequestParam Map<String, Object> paramMap , @RequestParam MultipartFile[] txtAttachFile, HttpServletRequest request, HttpSession session) throws Exception {
		logger.info("saveDesmOnshoreReceivedCreate.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	Map<String, Object> resultMap = onshoreService.saveDesmOnshoreReceivedCreate(paramMap);

	    	if(resultMap.get("error") != null && !resultMap.get("error").toString().equals("")) {
				txManager.rollback(txStatus);
				mav.addObject("error", resultMap.get("error"));
				//mav.addObject("PACKAGE_NO", resultMap.get("PACKAGE_NO"));
				//mav.addObject("REQ_AVAILABLE_QTY", resultMap.get("REQ_AVAILABLE_QTY"));
				return mav;
	    	}

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			mav.addObject("RECEIVED_HEADER_ID", resultMap.get("RECEIVED_HEADER_ID"));
			mav.addObject("STATUS", resultMap.get("STATUS"));
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

}

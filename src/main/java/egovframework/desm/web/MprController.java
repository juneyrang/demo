package egovframework.desm.web;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.desm.service.IdsmFileService;
import egovframework.desm.service.MprService;
import egovframework.rte.fdl.property.EgovPropertyService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
public class MprController {
	private static final Logger logger = LoggerFactory.getLogger(MprController.class);
	
	@Resource(name = "mprService")
	private MprService mprService;
	
	@Resource(name = "txManager") 
	protected DataSourceTransactionManager txManager;
	
	@Resource(name="propertiesService")
	protected EgovPropertyService propertiesService;	
	
	@Resource(name = "idsmFileService")
	private IdsmFileService idsmFileService;	

	@RequestMapping(value="/saveDesmMprSetupDate.do", method=RequestMethod.POST)
	public ModelAndView saveDesmMprSetupDate(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("saveDesmMprSetupDate.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	Map<String, Object> reulstMap = mprService.saveDesmMprSetupDate(paramMap);
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			mav.addObject("MPR_NO", reulstMap.get("MPR_NO"));
			
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value = "getDesmMprSetupDate.do")
	public ModelAndView getDesmMprSetupDate(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		logger.info("getDesmMprSetupDate.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", mprService.getDesmMprSetupDate(paramMap));
		return mav;
	}	
	
	@RequestMapping(value = "getDesmMprSetupData.do")
	public ModelAndView getDesmMprSetupData(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		logger.info("getDesmMprSetupData.do"); 
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("LANG", session.getAttribute("LANG"));
		mav.addObject("results", mprService.getDesmMprSetupData(paramMap));
		return mav;
	}
	
	@RequestMapping(value="/saveDesmMprSetupData.do", method=RequestMethod.POST)
	public ModelAndView saveDesmMprSetupData(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("saveDesmMprSetupData.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
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
	    	Map<String, Object> resultMap = mprService.saveDesmMprSetupData(paramMap);
	    	
	    	if(resultMap.get("Err") != null) {
				txManager.rollback(txStatus);
				mav.addObject("error", resultMap.get("Err"));
				return mav;	    		
	    	}
	    	
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			mav.addObject("MPR_NO", resultMap.get("MPR_NO"));
			
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value="/saveDesmMprHeader.do", method=RequestMethod.POST)
	public ModelAndView saveDesmMprHeader(@RequestParam Map<String, Object> paramMap , @RequestParam MultipartFile[] txtAttachFile, HttpServletRequest request, HttpSession session) throws Exception{
		
		logger.info("saveDesmMprHeader.do");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);		
		
		ModelAndView mav = new ModelAndView("jsonView");

		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
	    	
	    	List<Map<String, Object>> imgTxtList = new ArrayList<Map<String,Object>>();
	    	
			JSONArray imgFielTxtList = JSONArray.fromObject(paramMap.get("imgFielTxtList").toString());
	    	for(int i = 0; i < imgFielTxtList.size(); i++) {	    			
	    		JSONObject obj = (JSONObject)imgFielTxtList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		
	    		imgTxtList.add(row);		
	    	} 	    	
	    	
	    	if(paramMap.get("MPR_SEQ") == null) {
		    	List<Map<String, Object>> checkList = mprService.getDesmMprCheckList(paramMap);
		    	if(checkList.size() > 0) {
	    			txManager.rollback(txStatus);
	    			mav.addObject("error", "-1");
	    			mav.addObject("MPR_DATE", checkList.get(0).get("MPR_DATE"));
	    			mav.addObject("M", checkList.get(0).get("M"));
	    			return mav;
		    	}
	    	}
	    	
    		boolean whileCheck = true;
    		if(paramMap.get("ATTACH_GRP_CD") == null || paramMap.get("ATTACH_GRP_CD").toString().equals("") || paramMap.get("ATTACH_GRP_CD").toString().equals("null")) {
    			whileCheck = true;
    			while(whileCheck) {
	    			paramMap.put("ATTACH_GRP_CD", UUID.randomUUID().toString());
	    			paramMap.put("FILE_GRP_CD", paramMap.get("ATTACH_GRP_CD"));	    			
	    			List<Map<String, Object>> fileCheckList = idsmFileService.getIdsmSetupDlgItemScheduleFileCheckGrp(paramMap);
	    			
	    			if(fileCheckList.size() == 0) {
	    				whileCheck = false;
	    			}
    			}
    		}
    		
    		whileCheck = true;
    		if(paramMap.get("DESIGN_GRP_CD") == null || paramMap.get("DESIGN_GRP_CD").toString().equals("") || paramMap.get("DESIGN_GRP_CD").toString().equals("null")) {
    			whileCheck = true;
    			while(whileCheck) {
	    			paramMap.put("DESIGN_GRP_CD", UUID.randomUUID().toString());
	    			paramMap.put("FILE_GRP_CD", paramMap.get("DESIGN_GRP_CD"));	    			
	    			List<Map<String, Object>> fileCheckList = idsmFileService.getIdsmSetupDlgItemScheduleFileCheckGrp(paramMap);
	    			
	    			if(fileCheckList.size() == 0) {
	    				whileCheck = false;
	    			}
    			}
    		}  
    		
    		whileCheck = true;
    		if(paramMap.get("QUALITY_GRP_CD") == null || paramMap.get("QUALITY_GRP_CD").toString().equals("") || paramMap.get("QUALITY_GRP_CD").toString().equals("null")) {
    			whileCheck = true;
    			while(whileCheck) {
	    			paramMap.put("QUALITY_GRP_CD", UUID.randomUUID().toString());
	    			paramMap.put("FILE_GRP_CD", paramMap.get("QUALITY_GRP_CD"));	    			
	    			List<Map<String, Object>> fileCheckList = idsmFileService.getIdsmSetupDlgItemScheduleFileCheckGrp(paramMap);
	    			
	    			if(fileCheckList.size() == 0) {
	    				whileCheck = false;
	    			}
    			}
    		}      		
    		
    		if(paramMap.get("PHOTO_GRP_CD") == null || paramMap.get("PHOTO_GRP_CD").toString().equals("") || paramMap.get("PHOTO_GRP_CD").toString().equals("null")) {
    			whileCheck = true;
    			while(whileCheck) {
	    			paramMap.put("PHOTO_GRP_CD", UUID.randomUUID().toString());
	    			paramMap.put("FILE_GRP_CD", paramMap.get("PHOTO_GRP_CD"));
	    			List<Map<String, Object>> fileCheckList = idsmFileService.getIdsmSetupDlgItemScheduleFileCheckGrp(paramMap);
	    			
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
				
    			if(myfile.isEmpty()){   
		      		logger.info("empty");
		            break;  
		    	}else{ 
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
		    		
		        	String[] gubun = entry.getKey().split("_");
		        	if(gubun[0].equals("PHOTO")) {
		        		paramMap.put("FILE_GRP_CD", paramMap.get("PHOTO_GRP_CD"));
		        		
		        		for(int i = 0; i < imgTxtList.size(); i++) {
		        			Map<String, Object> imgTxtRow = imgTxtList.get(i);
		        			if(imgTxtRow.get("ID").toString().equals("PHOTO_TXT_" + gubun[1])) {
		        				imgTxtRow.put("ID", paramMap.get("ATT_ID"));
		        			}
		        		}
		        	}
		        	else if(gubun[0].equals("DESIGN")) {
		        		paramMap.put("FILE_GRP_CD", paramMap.get("DESIGN_GRP_CD"));
		        	}
		        	else if(gubun[0].equals("QUALITY")) {
		        		paramMap.put("FILE_GRP_CD", paramMap.get("QUALITY_GRP_CD"));
		        	}		        	
		        	else {
		        		paramMap.put("FILE_GRP_CD", paramMap.get("ATTACH_GRP_CD"));
		        	}		        	
		        	
		        	File uploadFile = new File(path);
		        	myfile.transferTo(uploadFile);
		        	logger.info("!!!!!!!!" + paramMap);
		        	idsmFileService.saveIdsmSetupDlgItemScheduleFile(paramMap);
		    	}
			}

	    	Map<String, Object> resultMap = mprService.saveDesmMprHeader(paramMap, imgTxtList);
	    	
	    	if(resultMap.get("Err") != null) {
				txManager.rollback(txStatus);
				mav.addObject("error", resultMap.get("Err"));
				return mav;
	    	}
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			mav.addObject("resultMap", resultMap);
			return mav;
			
		} catch(Exception e){		
			logger.info("!!!!!!!!" + e.toString());
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value="/saveDesmMprDetail.do", method=RequestMethod.POST)
	public ModelAndView saveDesmMprDetail(@RequestParam Map<String, Object> paramMap , @RequestParam MultipartFile[] txtAttachFile, HttpServletRequest request, HttpSession session) throws Exception{
		
		logger.info("saveDesmMprDetail.do");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);		
		
		ModelAndView mav = new ModelAndView("jsonView");

		try {
	    	//로그인 사용자 정보
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

	    	Map<String, Object> resultMap = mprService.saveDesmMprDetail(paramMap);
	    	
	    	if(resultMap.get("Err") != null) {
				txManager.rollback(txStatus);
				mav.addObject("error", resultMap.get("Err"));
				return mav;
	    	}
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			mav.addObject("resultMap", resultMap);
			return mav;
			
		} catch(Exception e){		
			logger.info("!!!!!!!!" + e.toString());
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}	
	
	/*
	@RequestMapping(value="/saveDesmMpr.do", method=RequestMethod.POST)
	public ModelAndView saveDesmMpr(@RequestParam Map<String, Object> paramMap , @RequestParam MultipartFile[] txtAttachFile, HttpServletRequest request, HttpSession session) throws Exception{
		
		logger.info("saveDesmMpr.do");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);		
		
		ModelAndView mav = new ModelAndView("jsonView");

		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
	    	
	    	List<Map<String, Object>> imgTxtList = new ArrayList<Map<String,Object>>();
	    	
			JSONArray imgFielTxtList = JSONArray.fromObject(paramMap.get("imgFielTxtList").toString());
	    	for(int i = 0; i < imgFielTxtList.size(); i++) {	    			
	    		JSONObject obj = (JSONObject)imgFielTxtList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		
	    		imgTxtList.add(row);		
	    	} 	    	
	    	
	    	if(paramMap.get("MPR_SEQ") == null) {
		    	List<Map<String, Object>> checkList = mprService.getDesmMprCheckList(paramMap);
		    	if(checkList.size() > 0) {
	    			txManager.rollback(txStatus);
	    			mav.addObject("error", "-1");
	    			mav.addObject("MPR_DATE", checkList.get(0).get("MPR_DATE"));
	    			return mav;    
		    	}	    		
	    	}
	    	
    		boolean whileCheck = true;
    		if(paramMap.get("ATTACH_GRP_CD") == null || paramMap.get("ATTACH_GRP_CD").toString().equals("") || paramMap.get("ATTACH_GRP_CD").toString().equals("null")) {
    			whileCheck = true;
    			while(whileCheck) {
	    			paramMap.put("ATTACH_GRP_CD", UUID.randomUUID().toString());
	    			paramMap.put("FILE_GRP_CD", paramMap.get("ATTACH_GRP_CD"));	    			
	    			List<Map<String, Object>> fileCheckList = idsmFileService.getIdsmSetupDlgItemScheduleFileCheckGrp(paramMap);
	    			
	    			if(fileCheckList.size() == 0) {
	    				whileCheck = false;
	    			}
    			}
    		}
    		
    		if(paramMap.get("PHOTO_GRP_CD") == null || paramMap.get("PHOTO_GRP_CD").toString().equals("") || paramMap.get("PHOTO_GRP_CD").toString().equals("null")) {
    			whileCheck = true;
    			while(whileCheck) {
	    			paramMap.put("PHOTO_GRP_CD", UUID.randomUUID().toString());
	    			paramMap.put("FILE_GRP_CD", paramMap.get("PHOTO_GRP_CD"));
	    			List<Map<String, Object>> fileCheckList = idsmFileService.getIdsmSetupDlgItemScheduleFileCheckGrp(paramMap);
	    			
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
				
    			if(myfile.isEmpty()){   
		      		logger.info("empty");
		            break;  
		    	}else{ 
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
		    		
		        	String[] gubun = entry.getKey().split("_");
		        	if(gubun[0].equals("PHOTO")) {
		        		paramMap.put("FILE_GRP_CD", paramMap.get("PHOTO_GRP_CD"));
		        		
		        		for(int i = 0; i < imgTxtList.size(); i++) {
		        			Map<String, Object> imgTxtRow = imgTxtList.get(i);
		        			if(imgTxtRow.get("ID").toString().equals("PHOTO_TXT_" + gubun[1])) {
		        				imgTxtRow.put("ID", paramMap.get("ATT_ID"));
		        			}
		        		}
		        	}
		        	else {
		        		paramMap.put("FILE_GRP_CD", paramMap.get("ATTACH_GRP_CD"));
		        	}		        	
		        	
		        	File uploadFile = new File(path);
		        	myfile.transferTo(uploadFile);
		        	logger.info("!!!!!!!!" + paramMap);
		        	idsmFileService.saveIdsmSetupDlgItemScheduleFile(paramMap);
		    	}
			}
			
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

	    	Map<String, Object> resultMap = mprService.saveDesmMpr(paramMap, imgTxtList);
	    	
	    	if(resultMap.get("Err") != null) {
				txManager.rollback(txStatus);
				mav.addObject("error", resultMap.get("Err"));
				return mav;
	    	}
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			mav.addObject("resultMap", resultMap);
			return mav;
			
		} catch(Exception e){		
			logger.info("!!!!!!!!" + e.toString());
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	*/
	
	@RequestMapping(value = "getDesmMprList.do")
	public ModelAndView getDesmMprList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		logger.info("getDesmMprList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getDesmMprList(paramMap));
		return mav;
	}
	
	@RequestMapping(value = "getDesmMprData.do")
	public ModelAndView getDesmMprData(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		logger.info("getDesmMprData.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", mprService.getDesmMprData(paramMap));
		return mav;
	}
	
	@RequestMapping(value = "getDesmMprDetailProgressData.do")
	public ModelAndView getDesmMprDetailProgressData(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		logger.info("getDesmMprDetailProgressData.do");
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("LANG", session.getAttribute("LANG"));
		mav.addObject("results", mprService.getDesmMprDetailProgressData(paramMap));
		return mav;
	}
	
	@RequestMapping(value = "getDesmMprSetupList.do")
	public ModelAndView getDesmMprSetupList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		logger.info("getDesmMprSetupList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getDesmMprSetupList(paramMap));
		return mav;
	}
	
	@RequestMapping(value="/saveDesmMprStatus.do", method=RequestMethod.POST)
	public ModelAndView saveDesmMprStatus(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("saveDesmMprStatus.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
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

//    		if(paramMap.get("STATUS").toString().equals("Confirmed") || paramMap.get("STATUS").toString().equals("Returned")) {
//	    		SimpleDateFormat format = new SimpleDateFormat("yyyy.MM.dd");
//	    		StringBuilder reviewerInfo = new StringBuilder();
//	    		reviewerInfo.append(" (");
//	    		reviewerInfo.append(" ").append(paramMap.get("STATUS"));
//	    		reviewerInfo.append(" ").append(format.format(new Date()));
//	    		reviewerInfo.append(" ").append(session.getAttribute("SSOID"));
//	    		reviewerInfo.append(" / ").append(session.getAttribute("ROLE_NAME"));
//	    		reviewerInfo.append(" ").append(")");
//		        paramMap.put("REVIEWER", reviewerInfo.toString());
//    		}

			//기본데이터 저장
	    	int cnt = mprService.saveDesmMprStatus(paramMap);
	    	if(cnt < 0) {
				txManager.rollback(txStatus);
				mav.addObject("error", cnt);
				return mav;
	    	}
	    	
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value={"/getSupplier.do"}, method=RequestMethod.POST)
	public ModelAndView getSupplier(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getSupplier.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getSupplier(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value = "getDesmSupplierSetupPoList.do")
	public ModelAndView getDesmSupplierSetupPoList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		logger.info("getDesmSupplierSetupPoList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", mprService.getDesmSupplierSetupPoList(paramMap));
		return mav;
	}
	
	@RequestMapping(value={"/getDesmDlgSupplierList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmDlgSupplierList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmDlgSupplierList.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getDesmDlgSupplierList(paramMap));
		
		return mav;
	}

	@RequestMapping(value={"/getDesmDlgMprSupplierList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmDlgMprSupplierList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmDlgMprSupplierList.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getDesmDlgMprSupplierList(paramMap));
		
		return mav;
	}

	@RequestMapping(value="/saveDesmManualPoCreationData.do", method=RequestMethod.POST)
	public ModelAndView saveDesmManualPoCreationData(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveDesmManualPoCreationData.do"); 

		ModelAndView mav = new ModelAndView("jsonView");
		try {
			
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
	    	
	    	int cnt = mprService.saveDesmManualPoCreationData(paramMap);
	    	if(cnt < 0) {
				mav.addObject("error", cnt);
				return mav;	    		
	    	}
	
			mav.addObject("success", "OK");
			return mav;
			
		} catch(Exception e){		
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value="/saveDesmSupplierSetupData.do", method=RequestMethod.POST)
	public ModelAndView saveDesmSupplierSetupData(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("saveDesmSupplierSetupData.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	
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
			
	    	int cnt = mprService.saveDesmSupplierSetupData(paramMap);
	    	if(cnt < 0) {
				txManager.rollback(txStatus);
				mav.addObject("error", cnt);
				return mav;	    		
	    	}
	
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value={"/getDesmSupplierSetupList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmSupplierSetupList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmSupplierSetupList.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", mprService.getDesmSupplierSetupList(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value="/deleteDesmSupplierSetupData.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmSupplierSetupData(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("deleteDesmSupplierSetupData.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
			
	    	mprService.deleteDesmSupplierSetupData(paramMap);	    	
	
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value={"/getDesmMprSetupSupplierList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMprSetupSupplierList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMprSetupSupplierList.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", mprService.getDesmMprSetupSupplierList(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getDesmMprSetupUserList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMprSetupUserList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMprSetupUserList.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", mprService.getDesmMprSetupUserList(paramMap));
		
		return mav;
	}	
	
	@RequestMapping(value={"/getDesmMprSetupSupplierMail.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMprSetupSupplierMail(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMprSetupSupplierMail.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("TYPE_CODE", "S");
		mav.addObject("results", mprService.getDesmMprSetupMail(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getDesmMprSetupUserMail.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMprSetupUserMail(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMprSetupUserMail.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("TYPE_CODE", "D");
		mav.addObject("results", mprService.getDesmMprSetupMail(paramMap));
		
		return mav;
	}	
	
	@RequestMapping(value="/deleteDesmMprSetupSupplierMail.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmMprSetupSupplierMail(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("deleteDesmMprSetupSupplierMail.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
	    	paramMap.put("TYPE_CODE", "S");
			
	    	mprService.deleteDesmMprSetupMail(paramMap);	    	
	
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value="/deleteDesmMprSetupUserMail.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmMprSetupUserMail(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("deleteDesmMprSetupUserMail.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
	    	paramMap.put("TYPE_CODE", "D");
			
	    	mprService.deleteDesmMprSetupMail(paramMap);	    	
	
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value={"/getSupplierAuth.do"}, method=RequestMethod.POST)
	public ModelAndView getSupplierAuth(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getSupplierAuth.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getSupplierAuth(paramMap));
		
		return mav;
	}	
	
	@RequestMapping(value={"/getDesmMprProgressNote.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMprProgressNote(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMprProgressNote.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getDesmMprProgressNote(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value="/deleteDesmMprProgressNote.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmMprProgressNote(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("deleteDesmMprProgressNote.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
			
	    	mprService.deleteDesmMprProgressNote(paramMap);	    	
	
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value={"/getDesmMprRemarks.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMprRemarks(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMprRemarks.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getDesmMprRemarks(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value="/deleteDesmMprRemarks.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmMprRemarks(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("deleteDesmMprRemarks.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
			
	    	mprService.deleteDesmMprRemarks(paramMap);	    	
	
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value={"/getDesmMprProcure.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMprProcure(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMprProcure.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getDesmMprProcure(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value="/deleteDesmProcure.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmProcure(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("deleteDesmProcure.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
			
	    	mprService.deleteDesmProcure(paramMap);	    	
	
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value={"/getDesmMprPayments.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMprPayments(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMprPayments.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getDesmMprPayments(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value="/deleteDesmMprList.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmMprList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("deleteDesmMprList.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
			
	    	int resultCnt = mprService.deleteDesmMprList(paramMap);	    	
	    	
	    	if(resultCnt < 0) {
				txManager.rollback(txStatus);
				mav.addObject("error", resultCnt);
				return mav;
	    	}
	    	
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value="/deleteDesmMprSetupList.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmMprSetupList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("deleteDesmMprSetupList.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
			
	    	Map<String, Object> resultMap = mprService.deleteDesmMprSetupList(paramMap);	    	
	    	
	    	if(resultMap.get("PO_NO") != null && !resultMap.get("PO_NO").toString().equals("")) {
				txManager.rollback(txStatus);
				mav.addObject("error", "-1");
				mav.addObject("PO_NO", resultMap.get("PO_NO"));
				return mav;
	    	}
	    	
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value={"/getDesmMprPo.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMprPo(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMprPo.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getDesmMprPo(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getDesmMprPoList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMprPoList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMprPoList.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getDesmMprPoList(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getDesmMprNoPo.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMprNoPo(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMprNoPo.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getDesmMprNoPo(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getDesmMprProgressSummary.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMprProgressSummary(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMprProgressSummary.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		paramMap.put("LANG", session.getAttribute("LANG"));
		mav.addObject("results", mprService.getDesmMprProgressSummary(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getDesmMprNoPoList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMprNoPoList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMprNoPoList.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getDesmMprNoPoList(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value="/saveDesmMprSetupStatus.do", method=RequestMethod.POST)
	public ModelAndView saveDesmMprSetupStatus(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("saveDesmMprSetupStatus.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
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
	    	int cnt = mprService.saveDesmMprSetupStatus(paramMap);
	    	if(cnt < 0) {
				txManager.rollback(txStatus);
				mav.addObject("error", cnt);
				return mav;
	    	}
	    	
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}	
	
	@RequestMapping(value={"/getDesmMprDesign.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMprDesign(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMprDesign.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getDesmMprDesign(paramMap));
		
		return mav;
	}	
	
	@RequestMapping(value="/deleteDesmDesign.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmDesign(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("deleteDesmDesign.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
			
	    	mprService.deleteDesmDesign(paramMap);	    	
	
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value={"/getDesmMprQuality.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMprQuality(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMprQuality.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getDesmMprQuality(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value="/deleteDesmQuality.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmQuality(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("deleteDesmQuality.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
			
	    	mprService.deleteDesmQuality(paramMap);	    	
	
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value="/saveDesmShippingMark.do", method=RequestMethod.POST)
	public ModelAndView saveDesmShippingMark(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("saveDesmShippingMark.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	mprService.saveDesmShippingMark(paramMap);
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			
			
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value = "getDesmShippingMarkList.do")
	public ModelAndView getDesmShippingMarkList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		logger.info("getDesmShippingMarkList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getDesmShippingMarkList(paramMap));
		return mav;
	}
	
	@RequestMapping(value="/deleteDesmShippingMarkList.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmShippingMarkList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("deleteDesmShippingMarkList.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
			
	    	int resultCnt = mprService.deleteDesmShippingMarkList(paramMap);
	    	
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value="/saveDesmShippingMarkReportList.do", method=RequestMethod.POST)
	public ModelAndView saveDesmShippingMarkReportList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("saveDesmShippingMarkReportList.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
			
	    	int resultCnt = mprService.saveDesmShippingMarkReportList(paramMap);
	    	
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}	
	
	@RequestMapping(value = "/shippingMarkMrd.do", method = RequestMethod.GET)
	public String qrCodeMrd(@RequestParam String fileNm , ModelMap model, HttpSession session, HttpServletRequest request) {

    	String loc = propertiesService.getString("location");
    	String CREATED_BY = session.getAttribute("SSOID").toString();
    	String rp = "/rp " + "[" + CREATED_BY + "]";
    	model.put("rp", rp);
		model.put("fileNm", fileNm);
		model.put("severNm", "zshpDS");
    	if(loc.equals("dev")) {
    		model.put("severNm", "zshpDEV");
    	}

    	if(request.getHeader("host").equals("desm.doosanenerbility.com"))
    		return "desm/mrdProxy";
    	else
    		return "desm/mrd";
	}
	
	@RequestMapping(value = "getDesmShippingMarkDetailList.do")
	public ModelAndView getDesmShippingMarkDetailList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		logger.info("getDesmShippingMarkDetailList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getDesmShippingMarkDetailList(paramMap));
		return mav;
	}	
	
	@RequestMapping(value="/saveDesmSupplierSetupMemo.do", method=RequestMethod.POST)
	public ModelAndView saveDesmSupplierSetupMemo(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("saveDesmSupplierSetupMemo.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
			
	    	int resultCnt = mprService.saveDesmSupplierSetupMemo(paramMap);
	    	
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}	
	
	@RequestMapping(value="/deleteDesmShippingMarkDetail.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmShippingMarkDetail(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("deleteDesmShippingMarkDetail.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	mprService.deleteDesmShippingMarkDetail(paramMap);
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			
			
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value={"/getDesmMprProcurePrev.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMprProcurePrev(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMprProcurePrev.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getDesmMprProcurePrev(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getDesmMprDesignPrev.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMprDesignPrev(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMprDesignPrev.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getDesmMprDesignPrev(paramMap));
		mav.addObject("resultRemark", mprService.getDesmMprRemarkPrev(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getDesmMprQualityPrev.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMprQualityPrev(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMprQualityPrev.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getDesmMprQualityPrev(paramMap));
		mav.addObject("resultRemark", mprService.getDesmMprRemarkPrev(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getRole.do"}, method=RequestMethod.POST)
	public ModelAndView getRole(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getRole.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getRole(paramMap));
		
		return mav;
	}	
	
	@RequestMapping(value={"/getMprTeam.do"}, method=RequestMethod.POST)
	public ModelAndView getMprTeam(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getMprTeam.do");

		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getMprTeam(paramMap));

		return mav;
	}
	
	@RequestMapping(value="/saveDesmMprSetupMailData.do", method=RequestMethod.POST)
	public ModelAndView saveDesmMprSetupMailData(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("saveDesmMprSetupMailData.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
	    	

			//기본데이터 저장
	    	Map<String, Object> resultMap = mprService.saveDesmMprSetupMailData(paramMap);
	    	
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			mav.addObject("MPR_NO", resultMap.get("MPR_NO"));
			
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}

	@RequestMapping(value={"/getDesmMprManufacture.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMprManufacture(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMprManufacture.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getDesmMprManufacture(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value="/deleteDesmManufacture.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmManufacture(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("deleteDesmManufacture.do"); 
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
			
	    	mprService.deleteDesmManufacture(paramMap);	    	
	
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			return mav;
			
		} catch(Exception e){		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}

	@RequestMapping(value={"/getDesmMprManufacturePrev.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMprManufacturePrev(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMprManufacturePrev.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", mprService.getDesmMprManufacturePrev(paramMap));
		mav.addObject("resultRemark", mprService.getDesmMprRemarkPrev(paramMap));
		
		return mav;
	}
	
}

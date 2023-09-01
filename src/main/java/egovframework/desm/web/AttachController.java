package egovframework.desm.web;

import java.io.File;
import java.net.URLDecoder;
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

import egovframework.desm.cmmn.FileResizeUtil;
import egovframework.desm.service.AttachService;
import egovframework.desm.service.MaterialService;
import egovframework.desm.service.MprService;
import egovframework.desm.service.OnshoreService;
import egovframework.desm.service.TestService;
import egovframework.rte.fdl.property.EgovPropertyService;

@Controller
@RequestMapping(value = "/attach")
public class AttachController {
	private static final Logger logger = LoggerFactory.getLogger(TransShippingRequestController.class);

	@Resource(name = "attachService")
	private AttachService attachService;

	@Resource(name = "materialService")
	private MaterialService materialService;

	@Resource(name = "onshoreService")
	private OnshoreService onshoreService;

	@Resource(name="propertiesService")
	protected EgovPropertyService propertiesService ;

	@Resource(name = "multipartResolver")
	CommonsMultipartResolver multipartResolver;

	@Resource(name = "txManager")
	protected DataSourceTransactionManager txManager;

	@Resource(name = "mprService")
	private MprService mprService;
	
	@Resource(name = "testService")
	private TestService testService;

	// TransShippingRequestController.getTransShippingRequestDlgAttList.do
	@RequestMapping(value={"/getAttachList.do"}, method=RequestMethod.POST)
	public ModelAndView getAttachList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getAttachList.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", attachService.getAttachList(paramMap));

		return mav;
	}

	// TransShippingRequestController.deleteTransShippingRequestDlgAttList.do
	@RequestMapping(value="/deleteAttachList.do", method=RequestMethod.POST)
	public ModelAndView deleteAttachList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("deleteAttachList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
	    	int cnt = attachService.deleteAttachList(paramMap);

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

	// TransShippingRequestController.saveTransShippingRequestDlgAttList.do
	@RequestMapping(value="/saveAttachList.do", method=RequestMethod.POST)
	public ModelAndView saveAttachList(@RequestParam Map<String, Object> paramMap , @RequestParam MultipartFile[] txtAttachFile, HttpServletRequest request, HttpSession session) throws Exception{
		logger.info("saveAttachList.do");

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
	    			List<Map<String, Object>> fileCheckList = attachService.getFileCheckGrp(paramMap);

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
		    			List<Map<String, Object>> fileCheckList = attachService.getFileCheckId(paramMap);

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
	        		File uploadFile = new File(path); // 파일 생성

	        		new FileResizeUtil().imageFileResize( myfile, uploadFile, paramMap ); // 리사이징

	        		// TODO: 다른 리전 AP Server에 파일 전송(실시간 동기화를 위함)
	        		
	        		attachService.saveAttachList(paramMap);
		    	}
			}

    		if(paramMap.get("RSI_HEADER_ID") != null && !paramMap.get("RSI_HEADER_ID").toString().equals("") && !paramMap.get("RSI_HEADER_ID").toString().equals("null")) {
    			materialService.saveDesmRsiFileGrpCd(paramMap); //FILE_GRP_CD
    		}

    		if(paramMap.get("MRF_HEADER_ID") != null && !paramMap.get("MRF_HEADER_ID").toString().equals("") && !paramMap.get("MRF_HEADER_ID").toString().equals("null")) {
    			materialService.saveDesmMrfFileGrpCd(paramMap); //FILE_GRP_CD
    		}

    		if(paramMap.get("CONTRACT_HEADER_ID") != null && !paramMap.get("CONTRACT_HEADER_ID").toString().equals("") && !paramMap.get("CONTRACT_HEADER_ID").toString().equals("null")) {
    			onshoreService.saveDesmContractFileGrpCd(paramMap); //FILE_GRP_CD
    		}

    		if(paramMap.get("P_USER_AD") != null && !paramMap.get("P_USER_AD").toString().equals("") && paramMap.get("MPR_SUPPLIER_YN") != null && paramMap.get("MPR_SUPPLIER_YN").toString().equals("Y")) {
    			mprService.saveDesmMprSupplierFileGrpCd(paramMap); //FILE_GRP_CD
    		}

    		if("Y".equals(paramMap.get("MATERIAL_MANAGEMENT_YN"))) {
    			materialService.saveDesmMaterialManagementFileGrpCd(paramMap); //FILE_GRP_CD
    		}
    		
    		if("Y".equals(paramMap.get("TEST_TABLE_YN"))) {
    			testService.saveDesmTestTableFileGrpCd(paramMap); //FILE_GRP_CD
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
	
	// TransController.getTransAttachDownload.do
	@RequestMapping("/getAttachDownload.do")
	public ModelAndView getAttachDownload(@RequestParam String code, ModelAndView mv) {
		logger.info("getAttachDownload : file code : " + code);

		Map<String, Object> paramMap = new HashMap<String, Object>(); 
		paramMap.put("ATT_ID", code);

    	List<Map<String, Object>> fileList = attachService.getFileById(paramMap);

    	String fileCode = "";
    	String filePath = "";
    	String fileName = "";
    	String fileExt = "";
    	String fileNameOrg = "";
    	String fileSize = "";
    	
    	
    	for (Object el : fileList) {
    		HashMap<String, String> row = (HashMap)el;
    		
        	fileCode = row.get("ID").toString();
        	filePath = row.get("REFERENCE").toString();
        	fileName = row.get("ID").toString();
        	fileExt = row.get("EXT").toString();
        	fileNameOrg = row.get("NAME").toString();
        	fileSize = row.get("FILE_SIZE").toString();
        	break;
    	}
    	
		String fullPath = propertiesService.getString("file.upload.path") + "\\" + filePath;
		File file = new File(fullPath);
		
		mv.setViewName("fileDownloadService");
		mv.addObject("downloadFile", file);
		mv.addObject("fileNameOrg", fileNameOrg);
		return mv;
	}
	
	// TransController.getTransAttachPreview.do
	@RequestMapping("/getAttachPreview.do")
	public ModelAndView getAttachPreview(@RequestParam String code, ModelAndView mv) {
		logger.info("getAttachPreview : file code : " + code);

		Map<String, Object> paramMap = new HashMap<String, Object>(); 
		paramMap.put("ATT_ID", code);

		List<Map<String, Object>> fileList = attachService.getFileById(paramMap);

    	String fileCode = "";
    	String filePath = "";
    	String fileName = "";
    	String fileExt = "";
    	String fileNameOrg = "";
    	String fileSize = "";
    	
    	
    	for (Object el : fileList) {
    		HashMap<String, String> row = (HashMap)el;
    		
        	fileCode = row.get("ID").toString();
        	filePath = row.get("REFERENCE").toString();
        	fileName = row.get("ID").toString();
        	fileExt = row.get("EXT").toString();
        	fileNameOrg = row.get("NAME").toString();
        	fileSize = row.get("FILE_SIZE").toString();
        	break;
    	}
    	
    	String fullPath = propertiesService.getString("file.upload.path") + "\\" + filePath;
		File file = new File(fullPath);
		
		mv.setViewName("filePreviewService");
		mv.addObject("downloadFile", file);
		mv.addObject("fileNameOrg", fileNameOrg);
		mv.addObject("fileExt", fileExt);
		return mv;
	}
	
	// TransController.getTransAttachPreview.do
	@RequestMapping("/getRdImg.do")
	public ModelAndView getRdImg(@RequestParam String code, ModelAndView mv) {
		logger.info("getAttachPreview : file code : " + code);

		Map<String, Object> paramMap = new HashMap<String, Object>(); 
		paramMap.put("ATT_ID", code);

		List<Map<String, Object>> fileList = attachService.getFileById(paramMap);

    	String fileCode = "";
    	String filePath = "";
    	String fileName = "";
    	String fileExt = "";
    	String fileNameOrg = "";
    	String fileSize = "";
    	
    	
    	for (Object el : fileList) {
    		HashMap<String, String> row = (HashMap)el;
    		
        	fileCode = row.get("ID").toString();
        	filePath = row.get("REFERENCE").toString();
        	fileName = row.get("ID").toString();
        	fileExt = row.get("EXT").toString();
        	fileNameOrg = row.get("NAME").toString();
        	fileSize = row.get("FILE_SIZE").toString();
        	break;
    	}
    	
    	String fullPath = propertiesService.getString("file.upload.path") + "\\" + filePath;
		File file = new File(fullPath);
		
		mv.setViewName("filePreviewService");
		mv.addObject("downloadFile", file);
		mv.addObject("fileNameOrg", fileNameOrg);
		mv.addObject("fileExt", fileExt);
		return mv;
	}	
}

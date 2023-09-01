package egovframework.desm.web;

import java.io.File;
import java.net.URLDecoder;
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
import egovframework.desm.service.MaterialService;
import egovframework.desm.service.MprService;
import egovframework.desm.service.TransShippingRequestService;
import egovframework.rte.fdl.property.EgovPropertyService;



@Controller
public class TransShippingRequestController {
	private static final Logger logger = LoggerFactory.getLogger(TransShippingRequestController.class);

	@Resource(name = "transShippingRequestService")
	private TransShippingRequestService transShippingRequestService;

	@Resource(name = "materialService")
	private MaterialService materialService;

	@Resource(name="propertiesService")
	protected EgovPropertyService propertiesService ;

	@Resource(name = "multipartResolver")
	CommonsMultipartResolver multipartResolver;

	@Resource(name = "txManager")
	protected DataSourceTransactionManager txManager;

	@Resource(name = "mprService")
	private MprService mprService;

	@RequestMapping(value={"/getTransShippingRequest.do"}, method=RequestMethod.POST)
	public ModelAndView getTransShippingRequest(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransShippingRequest.do");

		ModelAndView mav = new ModelAndView("jsonView");

		String dept_cd = session.getAttribute("TRANS_DEPT_CD") == null ? "" : (String)session.getAttribute("TRANS_DEPT_CD");
		String usr_id = session.getAttribute("TRANS_USR_ID") == null ? "" : (String)session.getAttribute("TRANS_USR_ID");
		String user_name = session.getAttribute("TRANS_USER_NAME") == null ? "" : (String)session.getAttribute("TRANS_USER_NAME");
		String usr_cls = session.getAttribute("TRANS_USR_CLS") == null ? "" : (String)session.getAttribute("TRANS_USR_CLS");
		String role_cd = session.getAttribute("TRANS_ROLE_CD") == null ? "" : (String)session.getAttribute("TRANS_ROLE_CD");



		paramMap.put("TRANS_DEPT_CD", dept_cd);
		paramMap.put("TRANS_USR_ID", usr_id);
		paramMap.put("TRANS_USER_NAME", user_name);
		paramMap.put("TRANS_USR_CLS", usr_cls);
		paramMap.put("TRANS_ROLE_CD", role_cd);

		mav.addObject("results", transShippingRequestService.getTransShippingRequest(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getTransShippingRequestVendor.do"}, method=RequestMethod.POST)
	public ModelAndView getTransShippingRequestVendor(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransShippingRequestVendor.do");

		ModelAndView mav = new ModelAndView("jsonView");

		if (paramMap.containsKey("keyword"))
		{
			paramMap.put("keyword", URLDecoder.decode(paramMap.get("keyword").toString(),"UTF-8"));
		}


		mav.addObject("results", transShippingRequestService.getTransShippingRequestVendor(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getTransShippingRequestVendorPopUp.do"}, method=RequestMethod.POST)
	public ModelAndView getTransShippingRequestVendorPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransShippingRequestVendorPopUp.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", transShippingRequestService.getTransShippingRequestVendorPopUp(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getTransShippingRequestDept.do"}, method=RequestMethod.POST)
	public ModelAndView getTransShippingRequestDept(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransShippingRequestDept.do");

		ModelAndView mav = new ModelAndView("jsonView");

		if (paramMap.containsKey("keyword"))
		{
			paramMap.put("keyword", URLDecoder.decode(paramMap.get("keyword").toString(),"UTF-8"));
		}


		mav.addObject("results", transShippingRequestService.getTransShippingRequestDept(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getTransShippingRequestDeptPopUp.do"}, method=RequestMethod.POST)
	public ModelAndView getTransShippingRequestDeptPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransShippingRequestDeptPopUp.do");

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", transShippingRequestService.getTransShippingRequestDeptPopUp(paramMap));

		return mav;
	}

	@RequestMapping(value="/saveTransShippingRequest.do", method=RequestMethod.POST)
	public ModelAndView saveTransShippingRequest(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveTransShippingRequest.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("TRANS_USR_ID"));

			//기본데이터 저장
	    	transShippingRequestService.saveTransShippingRequest(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getTransShippingRequestMailEmp.do"}, method=RequestMethod.POST)
	public ModelAndView getTransShippingRequestMailEmp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransShippingRequestMailEmp.do");

		ModelAndView mav = new ModelAndView("jsonView");

		if (paramMap.containsKey("keyword"))
		{
			paramMap.put("keyword", URLDecoder.decode(paramMap.get("keyword").toString(),"UTF-8"));
		}


		mav.addObject("results", transShippingRequestService.getTransShippingRequestMailEmp(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getTransShippingRequestDlgEditMailList.do"}, method=RequestMethod.POST)
	public ModelAndView getTransShippingRequestDlgEditMailList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransShippingRequestDlgEditMailList.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", transShippingRequestService.getTransShippingRequestDlgEditMailList(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getTransShippingRequestDlgEditPackingDetailList.do"}, method=RequestMethod.POST)
	public ModelAndView getTransShippingRequestDlgEditPackingDetailList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransShippingRequestDlgEditPackingDetailList.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", transShippingRequestService.getTransShippingRequestDlgEditPackingDetailList(paramMap));

		return mav;
	}

	@RequestMapping(value="/deleteTransShippingRequest.do", method=RequestMethod.POST)
	public ModelAndView deleteTransShippingRequest(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteTransShippingRequest.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("TRANS_USR_ID"));
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
	    	int cnt = transShippingRequestService.deleteTransShippingRequest(paramMap);

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

	@RequestMapping(value={"/getTransShippingRequestDlgAttList.do"}, method=RequestMethod.POST)
	public ModelAndView getTransShippingRequestDlgAttList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransShippingRequestDlgAttList.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", transShippingRequestService.getTransShippingRequestDlgAttList(paramMap));

		return mav;
	}

	@RequestMapping(value="/deleteTransShippingRequestDlgAttList.do", method=RequestMethod.POST)
	public ModelAndView deleteTransShippingRequestDlgAttList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteTransShippingRequestDlgAttList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {

	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

	    	int cnt = transShippingRequestService.deleteTransShippingRequestDlgAttList(paramMap);

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

	@RequestMapping(value="/saveTransShippingRequestDlgAttList.do", method=RequestMethod.POST)
	public ModelAndView saveTransShippingRequestDlgAttList(@RequestParam Map<String, Object> paramMap , @RequestParam MultipartFile[] txtAttachFile, HttpServletRequest request, HttpSession session) throws Exception{

		logger.info("saveTransShippingRequestDlgAttList.do");

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

	        		new FileResizeUtil().imageFileResize( myfile, uploadFile, paramMap );

		        	transShippingRequestService.saveTransShippingRequestDlgAttList(paramMap);
		    	}
			}

    		if(paramMap.get("REQ_MASTER_ID") != null && !paramMap.get("REQ_MASTER_ID").toString().equals("") && !paramMap.get("REQ_MASTER_ID").toString().equals("null")) {
    			transShippingRequestService.saveTransShippingRequestFileGrpCd(paramMap);
    		}

    		if(paramMap.get("RSI_HEADER_ID") != null && !paramMap.get("RSI_HEADER_ID").toString().equals("") && !paramMap.get("RSI_HEADER_ID").toString().equals("null")) {
    			materialService.saveDesmRsiFileGrpCd(paramMap); //FILE_GRP_CD
    		}

    		if(paramMap.get("MRF_HEADER_ID") != null && !paramMap.get("MRF_HEADER_ID").toString().equals("") && !paramMap.get("MRF_HEADER_ID").toString().equals("null")) {
    			materialService.saveDesmMrfFileGrpCd(paramMap); //FILE_GRP_CD
    		}

    		if(paramMap.get("P_USER_AD") != null && !paramMap.get("P_USER_AD").toString().equals("") && paramMap.get("MPR_SUPPLIER_YN") != null && paramMap.get("MPR_SUPPLIER_YN").toString().equals("Y")) {
    			mprService.saveDesmMprSupplierFileGrpCd(paramMap); //FILE_GRP_CD
    		}

    		if("Y".equals(paramMap.get("MATERIAL_MANAGEMENT_YN"))) {
    			materialService.saveDesmMaterialManagementFileGrpCd(paramMap); //FILE_GRP_CD
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

	@RequestMapping(value="/completeTransShippingRequest.do", method=RequestMethod.POST)
	public ModelAndView completeTransShippingRequest(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("completeTransShippingRequest.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
			int cnt = 0;
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("TRANS_USR_ID"));

			//기본데이터 저장
	    	cnt = transShippingRequestService.completeTransShippingRequest(paramMap);

	    	if(cnt < 0) {
				txManager.rollback(txStatus);
				mav.addObject("success", "OK");
				mav.addObject("error_code", cnt);
	    	}
	    	else {
		    	txManager.commit(txStatus);
		    	mav.addObject("success", "OK");
		    	mav.addObject("COMPLETE_REQ_MASTER_ID", cnt);
	    	}

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/rejectTransShippingRequest.do", method=RequestMethod.POST)
	public ModelAndView rejectTransShippingRequest(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("rejectTransShippingRequest.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
			int cnt = 0;
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("TRANS_USR_ID"));
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
	    	cnt = transShippingRequestService.rejectTransShippingRequest(paramMap);

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

	@RequestMapping(value="/sendMailTransShippingRequest.do", method=RequestMethod.POST)
	public ModelAndView sendMailTransShippingRequest(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("sendMailTransShippingRequest.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
			int cnt = 0;
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("TRANS_USR_ID"));
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
	    	cnt = transShippingRequestService.sendMailTransShippingRequest(paramMap);

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

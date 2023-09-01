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

import com.google.common.collect.Iterators;

import egovframework.desm.service.IdsmFileService;
import egovframework.desm.service.IdsmService;
import egovframework.rte.fdl.property.EgovPropertyService;



@Controller
public class IdsmController {
	private static final Logger logger = LoggerFactory.getLogger(IdsmController.class);

	@Resource(name = "idsmService")
	private IdsmService idsmService;

	@Resource(name = "multipartResolver")
	CommonsMultipartResolver multipartResolver;

	@Resource(name = "idsmFileService")
	private IdsmFileService idsmFileService;

	@Resource(name="propertiesService")
	protected EgovPropertyService propertiesService ;


	@Resource(name = "txManager")
	protected DataSourceTransactionManager txManager;

	@RequestMapping(value={"/getIdsmSetupProject.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmSetupProject(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSetupProject.do");

		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", idsmService.getIdsmSetupProject(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getPo.do"}, method=RequestMethod.POST)
	public ModelAndView getPo(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getPo.do");

		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", idsmService.getPo(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getDesmDlgPoList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmDlgPoList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmDlgPoList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", idsmService.getDesmDlgPoList(paramMap));

		return mav;
	}


	@RequestMapping(value={"/getIdsmProjectMgtProject.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmProjectMgtProject(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmProjectMgtProject.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmProjectMgtProject(paramMap));

		return mav;
	}


	@RequestMapping(value={"/getBlrSchmapProject.do"}, method=RequestMethod.POST)
	public ModelAndView getBlrSchmapProject(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getBlrSchmapProject.do");

		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", idsmService.getBlrSchmapProject(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getIdsmSetup.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmSetup(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSetup.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmSetup(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getIdsmSchedule.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmSchedule(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSchedule.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", idsmService.getIdsmSchedule(paramMap));
		return mav;
	}

	@RequestMapping(value="/saveIdsmSetup.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmSetup(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmSetup.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
//	    	int cnt = idsmService.saveIdsmSetup(paramMap);
	    	List<Map<String, Object>> dataList = idsmService.saveIdsmSetupSeq(paramMap);

	    	idsmService.deleteIdsmSetupDifferentName();
	    	
	    	if(dataList == null) {
	    		txManager.rollback(txStatus);
	    		mav.addObject("error", "-1");
	    	} else {
		    	txManager.commit(txStatus);
				mav.addObject("success", "OK");
				mav.addObject("results", dataList);
	    	}

//	    	if(cnt < 0) {
//	    		txManager.rollback(txStatus);
//	    		mav.addObject("error", Integer.toString(cnt));
//	    	}
//	    	else {
//		    	txManager.commit(txStatus);
//				mav.addObject("success", "OK");
//	    	}

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getIdsmSetupDlgInvEdit.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmSetupDlgInvEdit(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSetupDlgInvEdit.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmSetupDlgInvEdit(paramMap));

		return mav;
	}

	@RequestMapping(value="/deleteIdsmSetupDlgInvEdit.do", method=RequestMethod.POST)
	public ModelAndView deleteIdsmSetupDlgInvEdit(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteIdsmSetupDlgInvEdit.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	idsmService.deleteIdsmSetupDlgInvEdit(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveIdsmSetupDlgInvEdit.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmSetupDlgInvEdit(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmSetupDlgInvEdit.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	int cnt = idsmService.saveIdsmSetupDlgInvEdit(paramMap);

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveIdsmProjectMgt.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmProjectMgt(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmSetupDlgInvEdit.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	idsmService.saveIdsmProjectMgt(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getIdsmSetupDlgCreateItemProject.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmSetupDlgCreateItemProject(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSetupDlgCreateItemProject.do");

		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", idsmService.getIdsmSetupDlgCreateItemProject(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getIdsmSetupDlgItemScheduleItem.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmSetupDlgItemScheduleItem(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSetupDlgItemScheduleItem.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmSetupDlgItemScheduleItem(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getIdsmSetupDlgItemScheduleItemTreeName.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmSetupDlgItemScheduleItemTreeName(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSetupDlgItemScheduleItemTreeName.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmSetupDlgItemScheduleItemTreeName(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getIdsmSetupDlgItemScheduleAdmin.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmSetupDlgItemScheduleAdmin(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSetupDlgItemScheduleAdmin.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmSetupDlgItemScheduleAdmin(paramMap));

		return mav;
	}

	@RequestMapping(value="/saveIdsmSetupDlgItemScheduleItemEdit.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmSetupDlgItemScheduleItemEdit(@RequestParam Map<String, Object> paramMap , @RequestParam MultipartFile[] txtAttachFile, HttpServletRequest request, HttpSession session) throws Exception{

		logger.info("saveIdsmSetupDlgItemScheduleItemEdit.do");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);

		ModelAndView mav = new ModelAndView("jsonView");

		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
	    	paramMap.put("CHECK_YN", "Y");
			String file_grp_cd = (paramMap.get("FILE_GRP_CD") == null || "null".equals(paramMap.get("FILE_GRP_CD")) ? "" : paramMap.get("FILE_GRP_CD").toString());
			MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
			Map<String, MultipartFile> files = multiRequest.getFileMap();
			Iterator<Entry<String, MultipartFile>> itr = files.entrySet().iterator();


    		boolean whileCheck = true;
    		if(paramMap.get("FILE_GRP_CD") == null || paramMap.get("FILE_GRP_CD").toString().equals("") || paramMap.get("FILE_GRP_CD").toString().equals("null")) {
    			whileCheck = true;
    			file_grp_cd = UUID.randomUUID().toString();
    			paramMap.put("FILE_GRP_CD", file_grp_cd);
    			while(whileCheck) {
	    			List<Map<String, Object>> fileCheckList = idsmFileService.getIdsmSetupDlgItemScheduleFileCheckGrp(paramMap);

	    			if(fileCheckList.size() == 0) {
	    				whileCheck = false;
	    			}
    			}
    		}

    		boolean checkFile = false;

    		boolean checkfileNm = false;
    		while (itr.hasNext()) {
    			checkFile = true;
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

    		if(checkFile) {
    			List<Map<String, Object>> invCheckList = idsmService.getIdsmSetupDlgItemScheduleInvCheck(paramMap);

    			if(Integer.parseInt(invCheckList.get(0).get("CNT").toString()) == 0) {
        			txManager.rollback(txStatus);
        			mav.addObject("error", "-5");
        			return mav;
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


		        	File uploadFile = new File(path);
		        	myfile.transferTo(uploadFile);
		        	logger.info("!!!!!!!!" + paramMap);
		        	idsmFileService.saveIdsmSetupDlgItemScheduleFile(paramMap);
		    	}
			}

			List<Map<String, Object>> dataCheckList = idsmService.getIdsmSetupDlgItemScheduleItemEditCheck(paramMap);

			if(dataCheckList.size() > 0) {
				txManager.rollback(txStatus);
				mav.addObject("error", "-1");
			}
			else {
				idsmService.saveIdsmSetupDlgItemScheduleItemEdit(paramMap);
		    	idsmService.saveIdsmSetupDlgItemScheduleAttach(paramMap);

		    	idsmService.saveIdsmSetupDlgItemScheduleAdmin(paramMap);

		    	//시퀀스 추가 로직
		    	idsmService.saveIdsmSetupDlgItemSequence(paramMap);

		    	idsmService.deleteIdsmSetupDifferentName();
		    	txManager.commit(txStatus);
				mav.addObject("success", "OK");
				if(!file_grp_cd.equals("")){
					mav.addObject("FILE_GRP_CD", file_grp_cd);
				}
			}


			return mav;

		} catch(Exception e){
			logger.info("!!!!!!!!" + e.toString());
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getIdsmSetupDlgAdminAddList.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmSetupDlgAdminAddList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSetupDlgAdminAddList.do");

		ModelAndView mav = new ModelAndView("jsonView");

		if (paramMap.containsKey("keyword"))
		{
			paramMap.put("keyword", URLDecoder.decode(paramMap.get("keyword").toString(),"UTF-8"));
		}

		mav.addObject("results", idsmService.getIdsmSetupDlgAdminAddList(paramMap));

		return mav;
	}

	@RequestMapping(value="/deleteIdsmSetupDlgItemScheduleAdmin.do", method=RequestMethod.POST)
	public ModelAndView deleteIdsmSetupDlgItemScheduleAdmin(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteIdsmSetupDlgItemScheduleAdmin.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	idsmService.deleteIdsmSetupDlgItemScheduleAdmin(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveIdsmSetupDlgCreateItem.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmSetupDlgCreateItem(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmSetupDlgCreateItem.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);

		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	int cnt = idsmService.saveIdsmSetupDlgCreateItem(paramMap);

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

	@RequestMapping(value="/deleteIdsmSetup.do", method=RequestMethod.POST)
	public ModelAndView deleteIdsmSetup(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteIdsmSetup.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	int cnt = idsmService.deleteIdsmSetup(paramMap);

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

	@RequestMapping(value="/deleteIdsmProjectMgt.do", method=RequestMethod.POST)
	public ModelAndView deleteIdsmProjectMgt(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteIdsmProjectMgt.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	idsmService.deleteIdsmProjectMgt(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getIdsmSetupDlgExcelUploadDownload.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmSetupDlgExcelUploadDownload(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSetupDlgExcelUploadDownload.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmSetupDlgExcelUploadDownload(paramMap));

		return mav;
	}

	@RequestMapping(value="/saveIdsmSetupExceluploadSave.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmSetupExceluploadSave(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmSetupExceluploadSave.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);

		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	int cnt = idsmService.saveIdsmSetupExceluploadSave(paramMap);

	    	if(cnt < 0 ) {
				mav.addObject("error", cnt);
				txManager.rollback(txStatus);
				return mav;
	    	}

			mav.addObject("success", "OK");
			txManager.commit(txStatus);
			return mav;

		} catch(Exception e){

			mav.addObject("error", e.toString());
			txManager.rollback(txStatus);
			return mav;
		}
	}

	@RequestMapping(value={"/getIdsmSetupDlgProject.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmSetupDlgProject(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSetupDlgProject.do");

		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", idsmService.getIdsmSetupDlgProject(paramMap));

		return mav;
	}


	@RequestMapping(value={"/getIdsmSetupDlgMprProject.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmSetupDlgMprProject(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSetupDlgMprProject.do");

		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", idsmService.getIdsmSetupDlgMprProject(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getIdsmProjectMgtDlgProject.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmProjectMgtDlgProject(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSetupDlgProject.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmProjectMgtDlgProject(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getIdsmBlrDlgProject.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmBlrDlgProject(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmBlrDlgProject.do");

		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", idsmService.getIdsmBlrDlgProject(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getIdsmScheduleEtc.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmScheduleEtc(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmScheduleEtc.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmScheduleEtc(paramMap));

		return mav;
	}

	@RequestMapping(value="/saveIdsmSetupExceluploadUpdate.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmSetupExceluploadUpdate(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmSetupExceluploadUpdate.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);

		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	int cnt = idsmService.saveIdsmSetupExceluploadUpdate(paramMap);

	    	if(cnt < 0 ) {
				mav.addObject("error", cnt);
				txManager.rollback(txStatus);
				return mav;
	    	}

			mav.addObject("success", "OK");
			txManager.commit(txStatus);
			return mav;

		} catch(Exception e){

			mav.addObject("error", e.toString());
			txManager.rollback(txStatus);
			return mav;
		}
	}

	@RequestMapping(value={"/getIdsmSetupDlgInoviceSeqList.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmSetupDlgInoviceSeqList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSetupDlgInoviceSeqList.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmSetupDlgInoviceSeqList(paramMap));

		return mav;
	}

	@RequestMapping(value="/saveIdsmSetupDlgInoviceSeqList.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmSetupDlgInoviceSeqList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmSetupDlgInoviceSeqList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	idsmService.saveIdsmSetupDlgInoviceSeqList(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/deleteIdsmSetupDlgInoviceSeqList.do", method=RequestMethod.POST)
	public ModelAndView deleteIdsmSetupDlgInoviceSeqList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteIdsmSetupDlgInoviceSeqList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	idsmService.deleteIdsmSetupDlgInoviceSeqList(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getIdsmSetupDlgInvEditInvSeq.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmSetupDlgInvEditInvSeq(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSetupDlgInvEditInvSeq.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmSetupDlgInvEditInvSeq(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getIdsmSchmapList.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmSchmapList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSchmapList.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmSchmapList(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getIdsmBlrSchmapList.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmBlrSchmapList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmBlrSchmapList.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmBlrSchmapList(paramMap));

		return mav;
	}

	@RequestMapping(value="/saveIdsmBlrSchmapList.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmBlrSchmapList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmBlrSchmapList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	idsmService.saveIdsmBlrSchmapList(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveIdsmSchmapList.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmSchmapList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmSchmapList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	idsmService.saveIdsmSchmapList(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveIdsmSchmap.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmSchmap(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmSchmap.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	idsmService.saveIdsmSchmap(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveIdsmBlrSchmap.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmBlrSchmap(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmBlrSchmap.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	idsmService.saveIdsmBlrSchmap(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveIdsmSchmapExcelUpload.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmSchmapExcelUpload(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmSchmapExcelUpload.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	idsmService.saveIdsmSchmapExcelUpload(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveIdsmBlrSchmapExcelUpload.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmBlrSchmapExcelUpload(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmBlrSchmapExcelUpload.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	idsmService.saveIdsmBlrSchmapExcelUpload(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getIdsmSchmapViewList.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmSchmapViewList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSchmapViewList.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmSchmapViewList(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getIdsmProjectMgtUserList.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmProjectMgtUserList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmProjectMgtUserList.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmProjectMgtUserList(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getIdsmProjectMgtProjectList.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmProjectMgtProjectList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmProjectMgtProjectList.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmProjectMgtProjectList(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getIdsmSchmapViewDlgDetail.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmSchmapViewDlgDetail(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSchmapViewDlgDetail.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmSchmapViewDlgDetail(paramMap));

		return mav;
	}

	@RequestMapping(value="/syncIdsmSchmapView.do", method=RequestMethod.POST)
	public ModelAndView syncIdsmSchmapView(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("syncIdsmSchmapView.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장

	    	String msg = idsmService.syncIdsmSchmapView(paramMap);

	    	if(msg.equals("")) {
		    	txManager.commit(txStatus);
				mav.addObject("success", "OK");
	    	}
	    	else {
	    		txManager.rollback(txStatus);
				mav.addObject("error", msg);
	    	}



			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveIdsmSetupDlgMemo.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmSetupDlgMemo(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmSetupDlgMemo.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);

		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	idsmService.saveIdsmSetupDlgMemo(paramMap);

			mav.addObject("success", "OK");
			txManager.commit(txStatus);
			return mav;

		} catch(Exception e){

			mav.addObject("error", e.toString());
			txManager.rollback(txStatus);
			return mav;
		}
	}

	@RequestMapping(value={"/getIdsmSetupDlgMemo.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmSetupDlgMemo(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSetupDlgMemo.do");

		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", idsmService.getIdsmSetupDlgMemo(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getIdsmSetupDlgItemScheduleItemPL.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmSetupDlgItemScheduleItemPL(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSetupDlgItemScheduleItemPL.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmSetupDlgItemScheduleItemPL(paramMap));

		return mav;
	}
	
	@RequestMapping(value={"/getIdsmTaskList.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmTaskList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmTaskList.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmTaskList(paramMap));

		return mav;
	}
	
	@RequestMapping(value={"/getIdsmPrNoList.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmPrNoList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmPrNoList.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmPrNoList(paramMap));

		return mav;
	}
	
	@RequestMapping(value={"/getIdsmMprList.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmMprList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmMprList.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmMprList(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getIdsmSetupT.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmSetupT(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSetupT.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmSetupT(paramMap));

		return mav;
	}
	
	@RequestMapping(value="/saveIdsmSetupT.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmSetupT(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmSetupT.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	//int cnt = idsmService.saveIdsmSetupT(paramMap);
	    	List<Map<String, Object>> dataList = idsmService.saveIdsmSetupSeqT(paramMap);

	    	idsmService.deleteIdsmSetupDifferentName();
	    	
	    	if(dataList == null) {
	    		txManager.rollback(txStatus);
	    		mav.addObject("error", "-1");
	    	} else {
		    	txManager.commit(txStatus);
				mav.addObject("success", "OK");
				mav.addObject("results", dataList);
	    	}

//	    	if(cnt < 0) {
//	    		txManager.rollback(txStatus);
//	    		mav.addObject("error", Integer.toString(cnt));
//	    	}
//	    	else {
//		    	txManager.commit(txStatus);
//				mav.addObject("success", "OK");
//	    	}

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

    /** 
    	Spare part & Special Tool
    */  
	@RequestMapping(value={"/getIdsmSupplySpSt.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmSupplySpSt(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSupplySpSt.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmSupplySpSt(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getIdsmTrkItemSeq.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmTrkItemSeq(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmTrkItemSeq.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", idsmService.getIdsmTrkItemSeq(paramMap));

		return mav;
	}

	@RequestMapping(value="/saveIdsmItemSupplySpSt.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmItemSupplySpSt(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("saveIdsmItemSupplySpSt.do");

		ModelAndView mav = new ModelAndView("jsonView");
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	int cnt = idsmService.saveIdsmItemSupplySpSt(paramMap);

	    	if(cnt < 0) {
	    		mav.addObject("error", Integer.toString(cnt));
	    	}
	    	else {
				mav.addObject("success", "OK");
	    	}

			return mav;

		} catch(Exception e){
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/deleteIdsmItemSupplySpSt.do", method=RequestMethod.POST)
	public ModelAndView deleteIdsmItemSupplySpSt(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteIdsmItemSupplySpSt.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//삭제
	    	idsmService.deleteIdsmItemSupplySpSt(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveIdsmSupplySpStExceluploadUpdate.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmSupplySpStExceluploadUpdate(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmSupplySpStExceluploadUpdate.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);

		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	int cnt = idsmService.saveIdsmSupplySpStExceluploadUpdate(paramMap);

	    	if(cnt < 0 ) {
				mav.addObject("error", cnt);
				txManager.rollback(txStatus);
				return mav;
	    	}

			mav.addObject("success", "OK");
			txManager.commit(txStatus);
			return mav;

		} catch(Exception e){

			mav.addObject("error", e.toString());
			txManager.rollback(txStatus);
			return mav;
		}
	}
	
	@RequestMapping(value={"/getMprSeqRecent.do"}, method=RequestMethod.POST)
	public ModelAndView getMprSeqRecent(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getMprSeqRecent.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("result", idsmService.getMprSeqRecent(paramMap));

		return mav;
	}
}


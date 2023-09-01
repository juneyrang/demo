/**
 * 운송관리 > 전략물자관리
 */
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
import egovframework.desm.service.StrategicMgtService;
import egovframework.desm.service.TransShippingRequestService;
import egovframework.rte.fdl.property.EgovPropertyService;

@Controller
public class StrategicMgtController {
	private static final Logger logger = LoggerFactory.getLogger(StrategicMgtController.class);

	@Resource( name = "strategicMgtService" )
	private StrategicMgtService strategicMgtService;

	@Resource( name = "transShippingRequestService" )
	private TransShippingRequestService transShippingRequestService;

	@Resource(name = "txManager" )
	protected DataSourceTransactionManager txManager;

	@Resource(name = "idsmFileService")
	private IdsmFileService idsmFileService;

	@Resource(name="propertiesService")
	protected EgovPropertyService propertiesService;

	/**
	 * 운송관리 > 전략물자관리 > 목록 조회
	 */
	@RequestMapping( value= { "/selectStrategicMgtList.do" }, method=RequestMethod.POST )
	public ModelAndView selectStrategicMgtList( @RequestParam Map< String, Object > paramMap , ModelMap model, HttpSession session ) throws Exception{
		logger.info( "selectStrategicMgtList.do" );

		ModelAndView mav = new ModelAndView( "jsonView" );

		mav.addObject( "results", strategicMgtService.selectStrategicMgtList( paramMap ) );

		return mav;
	}

	/**
	 * 운송관리 > 전략물자관리 > 승인 상태 변경
	 */
	@RequestMapping(value="/updateStrategicMgtListStatus.do", method=RequestMethod.POST)
	public ModelAndView updateStrategicMgtListStatus( @RequestParam Map< String, Object > paramMap , ModelMap model, HttpSession session ) throws Exception{
		logger.info("updateStrategicMgtListStatus.do");

		ModelAndView					mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition	def = new DefaultTransactionDefinition();

		def.setPropagationBehavior( TransactionDefinition.PROPAGATION_REQUIRED );

		TransactionStatus txStatus = txManager.getTransaction( def );

		try {
			//로그인 사용자 정보
			paramMap.put( "USER_AD", session.getAttribute( "SSOID" ) );

			strategicMgtService.updateStrategicMgtListStatus( paramMap );

			txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 상세 조회
	 */
	@RequestMapping(value={"/selectStrategicMgtDetailPop.do"}, method=RequestMethod.POST)
	public ModelAndView selectStrategicMgtDetailPop( @RequestParam Map< String, Object > paramMap , ModelMap model, HttpSession session ) throws Exception{
		logger.info( "selectStrategicMgtDetailPop.do" );

		ModelAndView mav = new ModelAndView( "jsonView" );

		// 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 상세 조회
		mav.addObject( "results"				, strategicMgtService.selectStrategicMgtDetailPop(				paramMap ) );

		// 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 전략물자 판정 List 조회
		mav.addObject( "resultsPackageNoList"	, strategicMgtService.selectStrategicMgtDetailPopPackageNoList(	paramMap ) );

		// 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 코멘트 목록 조회
		mav.addObject( "resultsComment"			, strategicMgtService.selectStrategicMgtDetailPopComment(		paramMap ) );

		return mav;
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 전략물자 판정 List 삭제
	 */
	@RequestMapping(value="/deleteStrategicMgtDetailPopPackageNoList.do", method=RequestMethod.POST)
	public ModelAndView deleteStrategicMgtDetailPopPackageNoList( @RequestParam Map< String, Object > paramMap , ModelMap model, HttpSession session ) throws Exception{
		logger.info("deleteStrategicMgtDetailPopPackageNoList.do");

		ModelAndView					mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition	def = new DefaultTransactionDefinition();

		def.setPropagationBehavior( TransactionDefinition.PROPAGATION_REQUIRED );

		TransactionStatus txStatus = txManager.getTransaction( def );

		try {
			strategicMgtService.deleteStrategicMgtDetailPopPackageNoList( paramMap );

			txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 코멘트 목록 삭제
	 */
	@RequestMapping(value="/deleteStrategicMgtDetailPopComment.do", method=RequestMethod.POST)
	public ModelAndView deleteStrategicMgtDetailPopComment( @RequestParam Map< String, Object > paramMap , ModelMap model, HttpSession session ) throws Exception{
		logger.info("deleteStrategicMgtDetailPopComment.do");

		ModelAndView					mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition	def = new DefaultTransactionDefinition();

		def.setPropagationBehavior( TransactionDefinition.PROPAGATION_REQUIRED );

		TransactionStatus txStatus = txManager.getTransaction( def );

		try {
			strategicMgtService.deleteStrategicMgtDetailPopComment( paramMap );

			txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 수정
	 */
	@RequestMapping(value="/updateStrategicMgtDetailPop.do", method=RequestMethod.POST)
	public ModelAndView updateStrategicMgtDetailPop( @RequestParam Map< String, Object > paramMap , @RequestParam MultipartFile[] txtAttachFile, HttpServletRequest request, HttpSession session ) throws Exception{
		logger.info( "updateStrategicMgtDetailPop.do" + paramMap);
		DefaultTransactionDefinition	def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(		TransactionDefinition.PROPAGATION_REQUIRED	);
		TransactionStatus				txStatus = txManager.getTransaction( def );

		ModelAndView mav = new ModelAndView( "jsonView" );

		try {
			//로그인 사용자 정보
			paramMap.put( "USER_AD", session.getAttribute( "SSOID" ) );

			MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
			Map<String, MultipartFile> files = multiRequest.getFileMap();
			Iterator<Entry<String, MultipartFile>> itr = files.entrySet().iterator();


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
						List<Map< String, Object >> fileCheckList = idsmFileService.getIdsmSetupDlgItemScheduleFileCheckId(paramMap);

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

			// 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > FOB수출 저장
			//Map<String, Object> refParamMap = paramMap;
			int resultCnt = 0;
			if(paramMap.get("isStrategicCreate") != null && paramMap.get("isStrategicCreate").toString().equals("Y")) {
				resultCnt = transShippingRequestService.completeTransShippingRequest(paramMap);
				if(resultCnt < 0) {
					txManager.rollback(txStatus);
					mav.addObject("success", "OK");
					mav.addObject("error_code", resultCnt);
					return mav;
				}
				else {
					mav.addObject("COMPLETE_STRATEGIC_MASTER_ID", resultCnt);
				}
			}

			// 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 수정
			strategicMgtService.updateStrategicMgtDetailPop( paramMap );

			//운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 전략물자 판정 List 저장
			strategicMgtService.saveStrategicMgtDetailPopPackageNoList( paramMap );

			// 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 코멘트 목록 저장
			strategicMgtService.insertStrategicMgtDetailPopComment( paramMap );

			txManager.commit( txStatus );

			mav.addObject( "success", "OK" );

			return mav;

		} catch(Exception e){
			logger.info( "!!!!!!!!" + e.toString() );
			txManager.rollback(txStatus);
			mav.addObject( "error", e.toString() );
			return mav;
		}
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 삭제
	 */
	@RequestMapping(value="/deleteStrategicMgtDetailPop.do", method=RequestMethod.POST)
	public ModelAndView deleteStrategicMgtDetailPop( @RequestParam Map< String, Object > paramMap, HttpServletRequest request, HttpSession session ) throws Exception{
		logger.info( "deleteStrategicMgtDetailPop.do" + paramMap);
		DefaultTransactionDefinition	def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(		TransactionDefinition.PROPAGATION_REQUIRED	);
		TransactionStatus				txStatus = txManager.getTransaction( def );

		ModelAndView mav = new ModelAndView( "jsonView" );

		try {
			//로그인 사용자 정보
			paramMap.put( "USER_AD", session.getAttribute( "SSOID" ) );
//	    	paramMap.put("SENDER_EMAIL", session.getAttribute("TRANS_EMAIL"));
//
//	    	String loc = propertiesService.getString("location");
//	    	paramMap.put("location", loc);
//	    	paramMap.put("LOGIN_URL", propertiesService.getString("mail.login.url.prod"));
//	    	if(loc.equals("dev")) {
//	    		paramMap.put("LOGIN_URL", propertiesService.getString("mail.login.url.dev"));
//	    	}
//	    	paramMap.put("host", propertiesService.getString("mail.host"));
//	    	paramMap.put("port", propertiesService.getString("mail.port"));
//	    	paramMap.put("encoding", propertiesService.getString("mail.encoding"));
//	    	paramMap.put("username", propertiesService.getString("mail.username"));
//	    	paramMap.put("password", propertiesService.getString("mail.password"));

			int resultCnt = transShippingRequestService.deleteTransShippingRequestFOB(paramMap);
			if(resultCnt < 0) {
				txManager.rollback(txStatus);
				mav.addObject("success", "OK");
				mav.addObject("error_code", resultCnt);
				return mav;
			}

			// 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 코멘트 목록 삭제
			strategicMgtService.deleteAllStrategicMgtDetailPopComment( paramMap );
			
			//운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 전략물자 판정 List 삭제
			strategicMgtService.deleteAllStrategicMgtDetailPopPackageNoList( paramMap );

			// 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 첨부파일 삭제
			strategicMgtService.deleteDlgTransStrategicMgtAttCopyList( paramMap );
			
			// 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 삭제
			strategicMgtService.deleteStrategicMgtDetailPop( paramMap );

			txManager.commit( txStatus );

			mav.addObject( "success", "OK" );

			return mav;

		} catch(Exception e){
			logger.info( "!!!!!!!!" + e.toString() );
			txManager.rollback(txStatus);
			mav.addObject( "error", e.toString() );
			return mav;
		}
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 전략물자 판정 List 엑셀업로드 팝업 호출
	 */
	@RequestMapping(value = "/packageNoExcelUploadPopUp.do")
	public String packageNoExcelUploadPopUp( @RequestParam Map< String, Object > paramMap , ModelMap model, HttpSession session ) {
		logger.info( "packageNoExcelUploadPopUp.do" );
		return "/desm/popUp/packageNoExcelUploadPopUp";
	}
	
	@RequestMapping(value="/sendMailStrategicMgt.do", method=RequestMethod.POST)
	public ModelAndView sendMailStrategicMgt(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("sendMailStrategicMgt.do"); 
		
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
	    	cnt = strategicMgtService.sendMailStrategicMgt(paramMap);
	    	
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
	
	@RequestMapping( value= { "/getDlgTransStrategicMgtCopyList.do" }, method=RequestMethod.POST )
	public ModelAndView getDlgTransStrategicMgtCopyList( @RequestParam Map< String, Object > paramMap , ModelMap model, HttpSession session ) throws Exception{
		logger.info( "getDlgTransStrategicMgtCopyList.do" );

		ModelAndView mav = new ModelAndView( "jsonView" );

		mav.addObject( "results", strategicMgtService.getDlgTransStrategicMgtCopyList( paramMap ) );

		return mav;
	}
	
	@RequestMapping(value="/saveDlgTransStrategicMgtCopyList.do", method=RequestMethod.POST)
	public ModelAndView saveDlgTransStrategicMgtCopyList( @RequestParam Map< String, Object > paramMap , ModelMap model, HttpSession session ) throws Exception{
		logger.info("saveDlgTransStrategicMgtCopyList.do");

		ModelAndView					mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition	def = new DefaultTransactionDefinition();

		def.setPropagationBehavior( TransactionDefinition.PROPAGATION_REQUIRED );

		TransactionStatus txStatus = txManager.getTransaction( def );

		try {
			paramMap.put("USER_AD", session.getAttribute("TRANS_USR_ID"));	
			strategicMgtService.saveDlgTransStrategicMgtCopyList( paramMap );

			txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}	
	
	@RequestMapping( value= { "/getDlgTransStrategicMgtAttCopyList.do" }, method=RequestMethod.POST )
	public ModelAndView getDlgTransStrategicMgtAttCopyList( @RequestParam Map< String, Object > paramMap , ModelMap model, HttpSession session ) throws Exception{
		logger.info( "getDlgTransStrategicMgtAttCopyList.do" );

		ModelAndView mav = new ModelAndView( "jsonView" );

		mav.addObject( "results", strategicMgtService.getDlgTransStrategicMgtAttCopyList( paramMap ) );

		return mav;
	}	
	
	@RequestMapping(value="/saveDlgTransStrategicMgtAttCopyList.do", method=RequestMethod.POST)
	public ModelAndView saveDlgTransStrategicMgtAttCopyList( @RequestParam Map< String, Object > paramMap , ModelMap model, HttpSession session ) throws Exception{
		logger.info("saveDlgTransStrategicMgtAttCopyList.do");

		ModelAndView					mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition	def = new DefaultTransactionDefinition();

		def.setPropagationBehavior( TransactionDefinition.PROPAGATION_REQUIRED );

		TransactionStatus txStatus = txManager.getTransaction( def );

		try {
			paramMap.put("USER_AD", session.getAttribute("TRANS_USR_ID"));	
			
			boolean whileCheck = true;
			if(paramMap.get("ATTACH_GRP_CD") == null || paramMap.get("ATTACH_GRP_CD").toString().equals("") || paramMap.get("ATTACH_GRP_CD").toString().equals("null")) {
				whileCheck = true;
				while(whileCheck) {
					paramMap.put("FILE_GRP_CD", UUID.randomUUID().toString());
					List<Map< String, Object >> fileCheckList = idsmFileService.getIdsmSetupDlgItemScheduleFileCheckGrp(paramMap);

					if(fileCheckList.size() == 0) {
						whileCheck = false;
						paramMap.put("ATTACH_GRP_CD", paramMap.get("FILE_GRP_CD"));
						strategicMgtService.saveDlgTransStrategicMgtAttCopyListMstData( paramMap );
					}
				}
			}			
			
			strategicMgtService.saveDlgTransStrategicMgtAttCopyList( paramMap );

			txManager.commit(txStatus);
			mav.addObject("success", "OK");
			mav.addObject("ATTACH_GRP_CD", paramMap.get("ATTACH_GRP_CD").toString());

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}
	
	// 전략물자 EWS 수신자 리스트 가져오기
	@RequestMapping(value={"/getStrategicEwsList.do"}, method=RequestMethod.POST)
	public ModelAndView getStrategicEwsList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getStrategicEwsList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", strategicMgtService.getStrategicEwsList(paramMap));

		return mav;
	}
	
	@RequestMapping(value="/deleteStrategicEwsList.do", method=RequestMethod.POST)
	public ModelAndView deleteStrategicEwsList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("deleteStrategicEwsList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

	    	strategicMgtService.deleteStrategicEwsList(paramMap);
	    	
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}
	
	@RequestMapping(value="/saveStrategicEwsReceiver.do", method=RequestMethod.POST)
	public ModelAndView saveStrategicEwsReceiver(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("saveStrategicEwsReceiver.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

	    	int cnt = strategicMgtService.saveStrategicEwsReceiver(paramMap);
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
}
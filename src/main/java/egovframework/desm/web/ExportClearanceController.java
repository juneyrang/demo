package egovframework.desm.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import egovframework.desm.service.AttachService;
import egovframework.desm.service.ExportClearanceService;
import egovframework.desm.service.TransShippingRequestService;
import egovframework.rte.fdl.property.EgovPropertyService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


@Controller
public class ExportClearanceController {
	private static final Logger logger = LoggerFactory.getLogger(ExportClearanceController.class);
	
	@Resource(name="propertiesService")
	protected EgovPropertyService propertiesService ;
	
	@Resource(name = "multipartResolver")
	CommonsMultipartResolver multipartResolver;
	
	@Resource(name = "txManager") 
	protected DataSourceTransactionManager txManager;	
	
	@Resource(name = "exportClearanceService")
	private ExportClearanceService exportClearanceService;
	
	@Resource(name = "transShippingRequestService")
	private TransShippingRequestService transShippingRequestService;
	
	@Resource(name = "attachService")
	private AttachService attachService;
	
	@RequestMapping(value={"/getErpCodeCombo.do"}, method=RequestMethod.POST)
	public ModelAndView getErpCodeCombo(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getErpCodeCombo.do");
		
		paramMap.put("lang", session.getAttribute("LANG").toString());
		
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", exportClearanceService.getErpCodeCombo(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getUnitCodeList.do"}, method=RequestMethod.POST)
	public ModelAndView getUnitCodeList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getUnitCodeList.do");
		
		ModelAndView mav = new ModelAndView("jsonView");	
		
		mav.addObject("results", exportClearanceService.getUnitCodeList(paramMap));
		
		return mav;
	}	

	@RequestMapping(value={"/getErpProject.do"}, method=RequestMethod.POST)
	public ModelAndView getErpProject(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getErpProject.do");
		
		paramMap.put("lang", session.getAttribute("LANG").toString());

		if (paramMap.containsKey("keyword"))
		{
			paramMap.put("keyword", URLDecoder.decode(paramMap.get("keyword").toString(),"UTF-8"));
		}
		
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", exportClearanceService.getErpProject(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getErpProjectDlg.do"}, method=RequestMethod.POST)
	public ModelAndView getErpProjectDlg(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getErpProjectDlg.do");
		
		ModelAndView mav = new ModelAndView("jsonView");	
		
		mav.addObject("results", exportClearanceService.getErpProjectDlg(paramMap));
		
		return mav;
	}	
	
	@RequestMapping(value={"/getErpEpcProject.do"}, method=RequestMethod.POST)
	public ModelAndView getErpEpcProject(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getErpEpcProject.do");
		
		paramMap.put("lang", session.getAttribute("LANG").toString());

		if (paramMap.containsKey("keyword"))
		{
			paramMap.put("keyword", URLDecoder.decode(paramMap.get("keyword").toString(),"UTF-8"));
		}
		
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", exportClearanceService.getErpEpcProject(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getErpEpcProjectDlg.do"}, method=RequestMethod.POST)
	public ModelAndView getErpEpcProjectDlg(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getErpEpcProjectDlg.do");
		
		ModelAndView mav = new ModelAndView("jsonView");	
		
		mav.addObject("results", exportClearanceService.getErpEpcProjectDlg(paramMap));
		
		return mav;
	}	
		
	@RequestMapping(value={"/getExportClearance.do"}, method=RequestMethod.POST)
	public ModelAndView getExportClearance(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getExportClearance.do");
		
    	//로그인 사용자 정보
    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
    	
		ModelAndView mav = new ModelAndView("jsonView");		
		mav.addObject("results", exportClearanceService.getExportClearance(paramMap));
		
		return mav;
	}	

	@RequestMapping(value={"/getSearchExportNo.do"}, method=RequestMethod.POST)
	public ModelAndView getSearchExportNo(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getSearchExportNo.do");
		
		ModelAndView mav = new ModelAndView("jsonView");

		if (paramMap.containsKey("keyword"))
		{
			paramMap.put("keyword", URLDecoder.decode(paramMap.get("keyword").toString(),"UTF-8"));
		}
		
		if (paramMap.containsKey("keyword2"))
		{
			paramMap.put("keyword2", URLDecoder.decode(paramMap.get("keyword2").toString(),"UTF-8"));
		}
		
		mav.addObject("results", exportClearanceService.getSearchExportNo(paramMap));
		
		return mav;
	}

	@RequestMapping(value={"/getSearchExportNoDlg.do"}, method=RequestMethod.POST)
	public ModelAndView getSearchExportNoDlg(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getSearchExportNoDlg.do");
		
		ModelAndView mav = new ModelAndView("jsonView");	
		
		mav.addObject("results", exportClearanceService.getSearchExportNoDlg(paramMap));
		
		return mav;
	}	

	@RequestMapping(value={"/getSearchErpInvoiceNo.do"}, method=RequestMethod.POST)
	public ModelAndView getSearchErpInvoiceNo(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getSearchErpInvoiceNo.do");
		
		ModelAndView mav = new ModelAndView("jsonView");

		if (paramMap.containsKey("keyword"))
		{
			paramMap.put("keyword", URLDecoder.decode(paramMap.get("keyword").toString(),"UTF-8"));
		}
		
		if (paramMap.containsKey("keyword2"))
		{
			paramMap.put("keyword2", URLDecoder.decode(paramMap.get("keyword2").toString(),"UTF-8"));
		}
		
		mav.addObject("results", exportClearanceService.getSearchErpInvoiceNo(paramMap));
		
		return mav;
	}

	@RequestMapping(value={"/getSearchErpInvoiceNoDlg.do"}, method=RequestMethod.POST)
	public ModelAndView getSearchErpInvoiceNoDlg(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getSearchErpInvoiceNoDlg.do");
		
		ModelAndView mav = new ModelAndView("jsonView");	
		
		mav.addObject("results", exportClearanceService.getSearchErpInvoiceNoDlg(paramMap));
		
		return mav;
	}	
	
	@RequestMapping(value={"/getSearchErpEmployee.do"}, method=RequestMethod.POST)
	public ModelAndView erpEmpListPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("erpEmpListPopUp.do");
		
		ModelAndView mav = new ModelAndView("jsonView");

		if (paramMap.containsKey("keyword"))
		{
			paramMap.put("keyword", URLDecoder.decode(paramMap.get("keyword").toString(),"UTF-8"));
		}
		
		mav.addObject("results", exportClearanceService.getSearchErpEmployee(paramMap));
		
		return mav;
	}

	@RequestMapping(value={"/getSearchErpEmployeeDlg.do"}, method=RequestMethod.POST)
	public ModelAndView erpEmpListPopUpDlg(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("erpEmpListPopUpDlg.do");
		
		ModelAndView mav = new ModelAndView("jsonView");	
		
		mav.addObject("results", exportClearanceService.getSearchErpEmployeeDlg(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getSearchTaskNo.do"}, method=RequestMethod.POST)
	public ModelAndView getSearchTaskNo(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getSearchTaskNo.do");
		
		ModelAndView mav = new ModelAndView("jsonView");

		if (paramMap.containsKey("keyword"))
		{
			paramMap.put("keyword", URLDecoder.decode(paramMap.get("keyword").toString(),"UTF-8"));
		}
		
		mav.addObject("results", exportClearanceService.getSearchTaskNo(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getSearchExchangeType.do"}, method=RequestMethod.POST)
	public ModelAndView getSearchExchangeType(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getSearchExchangeType.do");
		
		ModelAndView mav = new ModelAndView("jsonView");

		if (paramMap.containsKey("keyword"))
		{
			paramMap.put("keyword", URLDecoder.decode(paramMap.get("keyword").toString(),"UTF-8"));
		}
		
		mav.addObject("results", exportClearanceService.getSearchExchangeType(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getSearchPriceTerm.do"}, method=RequestMethod.POST)
	public ModelAndView getSearchPriceTerm(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getSearchPriceTerm.do");
		
		ModelAndView mav = new ModelAndView("jsonView");

		if (paramMap.containsKey("keyword"))
		{
			paramMap.put("keyword", URLDecoder.decode(paramMap.get("keyword").toString(),"UTF-8"));
		}
		
		mav.addObject("results", exportClearanceService.getSearchPriceTerm(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getSearchCurrency.do"}, method=RequestMethod.POST)
	public ModelAndView getSearchCurrency(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getSearchCurrency.do");
		
		ModelAndView mav = new ModelAndView("jsonView");

		if (paramMap.containsKey("keyword"))
		{
			paramMap.put("keyword", URLDecoder.decode(paramMap.get("keyword").toString(),"UTF-8"));
		}
		
		mav.addObject("results", exportClearanceService.getSearchCurrency(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getSearchLicenseNo.do"}, method=RequestMethod.POST)
	public ModelAndView getSearchLicenseNo(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getSearchLicenseNo.do");
		
		ModelAndView mav = new ModelAndView("jsonView");

		if (paramMap.containsKey("keyword"))
		{
			paramMap.put("keyword", URLDecoder.decode(paramMap.get("keyword").toString(),"UTF-8"));
		}
		
		mav.addObject("results", exportClearanceService.getSearchLicenseNo(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getChargeAccountItem.do"}, method=RequestMethod.POST)
	public ModelAndView getChargeAccountItem(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getChargeAccountItem.do");
		
		ModelAndView mav = new ModelAndView("jsonView");

		if (paramMap.containsKey("keyword"))
		{
			paramMap.put("keyword", URLDecoder.decode(paramMap.get("keyword").toString(),"UTF-8"));
		}
		
		mav.addObject("results", exportClearanceService.getChargeAccountItem(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getCodeCombinationId.do"}, method=RequestMethod.POST)
	public ModelAndView getCodeCombinationId(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getCodeCombinationId.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", exportClearanceService.getCodeCombinationId(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getSearchErpProjectEmp.do"}, method=RequestMethod.POST)
	public ModelAndView getSearchErpProjectEmp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getSearchErpProjectEmp.do");
		
		ModelAndView mav = new ModelAndView("jsonView");

		if (paramMap.containsKey("keyword"))
		{
			paramMap.put("keyword", URLDecoder.decode(paramMap.get("keyword").toString(),"UTF-8"));
		}
		
		mav.addObject("results", exportClearanceService.getSearchErpProjectEmp(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getSearchManufacturer.do"}, method=RequestMethod.POST)
	public ModelAndView getSearchManufacturer(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getSearchManufacturer.do");
		
		ModelAndView mav = new ModelAndView("jsonView");

		if (paramMap.containsKey("keyword"))
		{
			paramMap.put("keyword", URLDecoder.decode(paramMap.get("keyword").toString(),"UTF-8"));
		}
		
		mav.addObject("results", exportClearanceService.getSearchManufacturer(paramMap));
		
		return mav;
	}
	
	// 20220721 : Validation Method 추가
	@RequestMapping(value="/exportValidation.do", method=RequestMethod.POST)
	public ModelAndView exportValidation(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		logger.info("exportValidation.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		try {
			mav.addObject("results", exportClearanceService.exportValidation(paramMap));
			return mav;
		} catch(Exception e) {
			e.printStackTrace();
			mav.addObject("error", e.toString());
			return mav;
		}
	}
	
	
	@RequestMapping(value="/saveExportClearance.do", method=RequestMethod.POST)
	public ModelAndView saveExportClearance(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("saveExportClearance.do"); 
    	System.out.println("#### View paramMap : " + paramMap);
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		/* 테스트용 sleep 
		mav.addObject("success", "OK");
		mav.addObject("results", paramMap);
		logger.info("sleep 5s"); 
		Thread.sleep(5000); 
		return mav;
		테스트용 sleep END */
		
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		
		try {
			String action = "";
			String exportHeaderId = "";
			String exportNo = "";
			
		    if (paramMap.containsKey("ACTION"))
			{
		    	action = URLDecoder.decode(paramMap.get("ACTION").toString(),"UTF-8");
			}

		    if (paramMap.containsKey("EXPORT_NO"))
			{
		    	exportNo = URLDecoder.decode(paramMap.get("EXPORT_NO").toString(),"UTF-8");
			}

		    if (paramMap.containsKey("EXPORT_HEADER_ID"))
			{
		    	exportHeaderId = URLDecoder.decode(paramMap.get("EXPORT_HEADER_ID").toString(),"UTF-8");
			}
		    
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
	    	
		    //수정가능여부 점검
	    	if (!exportNo.isEmpty()) {
	    		Map<String, Object> chkParamMap = new HashMap<String, Object>();
	    		chkParamMap.put("EXPORT_NO", exportNo);
	    		chkParamMap.put("USER_AD", session.getAttribute("SSOID"));
	    		
	    		List<Map<String, Object>> prevData = exportClearanceService.getExportClearance(chkParamMap);
	    		
	    		Boolean authEdit = true;
	    		if(prevData.size() > 0) {
	    			if (prevData.get(0).get("STATUS").toString().equals("")) authEdit = false;
	    			if (!prevData.get(0).get("STATUS").toString().equals("Incomplete") && !prevData.get(0).get("STATUS").toString().equals("Incomplete,Rejected")) authEdit = false;
	    		}
	    		
	    		if (paramMap.containsKey("CREATED_BY_CODE") && !paramMap.get("CREATED_BY_CODE").toString().equals("") && !paramMap.get("CREATED_BY_CODE").toString().toUpperCase().equals(session.getAttribute("SSOID").toString().toUpperCase())) {
	    			authEdit = false;
	    		}
		    	
			    //수정권한이 없을 경우
	    		if (!authEdit)
			    {
			    	logger.info("수정권한 없음");
					txManager.rollback(txStatus);
					mav.addObject("error", "권한이 없거나 수정가능한 상태가 아닙니다");
					return mav;
			    }
	    	}
	    	
	    	if (exportHeaderId.isEmpty())
	    	{
		    	logger.info("Make New Export Header ID");
	        	List newId = exportClearanceService.getNewExpHeaderID(paramMap);
	        	paramMap.put("EXPORT_HEADER_ID", ((HashMap)newId.get(0)).get("NEXTVAL").toString());
	    	}

	    	if (exportNo.isEmpty())
	    	{
		    	logger.info("Make New Export No");
	        	List newId = exportClearanceService.getNewExpNo(paramMap);
	        	paramMap.put("EXPORT_NO", ((HashMap)newId.get(0)).get("NEXTVAL").toString());
	    	}

		    if (action.equals("SAVE"))
		    {
	        	logger.info("INSERT or UPDATE");
	        	System.out.println("#### View paramMap : " + paramMap);
		    	exportClearanceService.saveExportClearance(paramMap);
		    }
		    else if (action.equals("DELETE") && !exportNo.isEmpty())
		    {
		    	logger.info("DELETE");
		    	exportClearanceService.deleteExportClearance(paramMap);
		    }
		    else if (action.equals("APPROVE"))
		    {
		    	logger.info("INSERT or UPDATE");
		    	exportClearanceService.saveExportClearance(paramMap);
		    	txManager.commit(txStatus);
		    	
		    	//TODO: 승인권자 찾아서 ERP권한 존재하는지 확인.
		    	
		    	//List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
	   			//list = exportClearanceService.getExportClearance(paramMap);
	   			//paramMap.put("CREATED_BY",  ((HashMap)list.get(0)).get("CREATED_BY").toString());
	   			paramMap.put("CREATED_AD", session.getAttribute("SSOID"));

		    	logger.info("APPROVE");
		    	exportClearanceService.setExportApprovalInterface(paramMap);
		    }

		    if (!action.equals("APPROVE"))
		    {
		    	txManager.commit(txStatus);
		    }
			mav.addObject("success", "OK");
			mav.addObject("results", paramMap);
    	
			return mav;
		
		} catch(Exception e) {
			e.printStackTrace();
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value="/updateExportStatus.do", method=RequestMethod.POST)
	public ModelAndView updateExportStatus(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("updateExportStatus.do"); 
    	System.out.println("#### View paramMap : " + paramMap);
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		
		try {
	    	exportClearanceService.updateExportStatus(paramMap);
	    	txManager.commit(txStatus);

	    	mav.addObject("success", "OK");
			mav.addObject("results", paramMap);
    	
			return mav;
		
		} catch(Exception e) {		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value="/cancelExportClearance.do", method=RequestMethod.POST)
	public ModelAndView cancelExportClearance(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("cancelExportClearance.do"); 
    	System.out.println("#### View paramMap : " + paramMap);
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		
		try {
	    	paramMap.put("STATUS", "Cancelled");
    		paramMap.put("USER_AD", session.getAttribute("SSOID"));
    		
			//Cancel 가능여부 확인 후 처리 
	    	logger.info("item상태 & 수출입 신고서 상태조회");

	    	//main 상태정보 조회 ('Approved' 상태만 가능)
    		List<Map<String, Object>> prevData = exportClearanceService.getExportClearance(paramMap);
    		String EC_Status = prevData.get(0).get("STATUS").toString();

    		//수출입 신고서 상태조회 ('ENT','SRD', 'ZZZ','REQUEST' 상태만 가능)
    		List<Map<String, Object>> statusData = exportClearanceService.getExportRequestStatus(paramMap);
    		String H_Status = statusData.get(0).get("H_STATUS").toString();
    		String LIC_SN =  statusData.get(0).get("SN").toString();
    		
    		Boolean authEdit = false;
    		//해당 STATUS 일때만 처리 가능
    		if(statusData.size() > 0) {
    			if (EC_Status.equals("Approved") && H_Status.equals("ENT")) authEdit = true;
    			if (EC_Status.equals("Approved") && H_Status.equals("SRD")) authEdit = true;
    			if (EC_Status.equals("Approved") && H_Status.equals("ZZZ")) authEdit = true;
    			if (EC_Status.equals("Approved") && H_Status.equals("REQUEST")) authEdit = true;
    		}
    		
			if (!authEdit) {
		    	logger.info("Cancel 불가능 상태");
				txManager.rollback(txStatus);
				mav.addObject("error", "Cancel 가능한 상태가 아닙니다.[e-Trade >> Customs >> 수입신고서 상태확인 요망]");
				return mav;
			}
			
			//연관데이터 삭제, 삭제 대상 확인 후 수정 필요함
			/*
			paramMap.put("LIC_SN", LIC_SN);
			exportClearanceService.deleteRelatedData(paramMap);
			*/
			
			//수출통관의뢰 상태 변경
	    	exportClearanceService.updateExportStatus(paramMap);
	    	txManager.commit(txStatus);

	    	mav.addObject("success", "OK");
			mav.addObject("results", paramMap);
    	
			return mav;
		
		} catch(Exception e) {		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}				
	}
	
	@RequestMapping(value="/saveExportClearanceDlgAttList.do", method=RequestMethod.POST)
	public ModelAndView saveExportClearanceDlgAttList(@RequestParam Map<String, Object> paramMap , @RequestParam MultipartFile[] txtAttachFile, HttpServletRequest request, HttpSession session) throws Exception{
		
		logger.info("saveExportClearanceDlgAttList.do"); 
		
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
	    			//List<Map<String, Object>> fileCheckList = transShippingRequestService.getTransShippingRequestFileCheckGrp(paramMap);
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
		    			//List<Map<String, Object>> fileCheckList = transShippingRequestService.getTransShippingRequestFileCheckId(paramMap);
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
		        	
		        	File uploadFile = new File(path);
		        	myfile.transferTo(uploadFile);
		        	
		        	//transShippingRequestService.saveTransShippingRequestDlgAttList(paramMap); // AttachController 분리
		        	attachService.saveAttachList(paramMap);
		    	}
			} 
    		
    		if(paramMap.get("EXPORT_NO") != null && !paramMap.get("EXPORT_NO").toString().equals("") && !paramMap.get("EXPORT_NO").toString().equals("null")) {
    			//File GRP_CD 를 ATTRIBUTE7에 update
    			exportClearanceService.saveExportClearanceFileGrpCd(paramMap);
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
		
	private String decodeUTFString(String sEncoded) throws Exception {
		return URLDecoder.decode(sEncoded,"UTF-8");
	}
	
	@RequestMapping(value="/ckImageUpload.do", method=RequestMethod.POST)
	public ModelAndView ckImageUpload(HttpServletRequest request, @RequestParam MultipartFile upload) throws Exception{

		logger.info("ckImageUpload.do");
		
		OutputStream out = null;
		Map<String, Object> data = new HashMap<String, Object>();
		ModelAndView mav = new ModelAndView("jsonView");
		
		String fileUrl = "";
		String uploadPath = "";
		
		try {
			String fileName = UUID.randomUUID().toString() + ".png";
			byte[] bytes = upload.getBytes();
			uploadPath = request.getSession().getServletContext().getRealPath("/") + "resources\\files\\" + fileName;
			out = new FileOutputStream(new File(uploadPath));
			out.write(bytes);
			fileUrl = request.getContextPath() + "/resources/files/" + fileName;
			mav.addObject("fileName", uploadPath);
			mav.addObject("uploaded", 1);
			mav.addObject("url", fileUrl);

		} catch(Exception e) {
			//throw e;
		}
		
		logger.info("ckImageUpload.do||||" + data);
		return mav;
	}
	
	//사급PO
	@RequestMapping(value={"/getPOStatus.do"}, method=RequestMethod.POST)
	public ModelAndView getPOStatus(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getPOStatus.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", exportClearanceService.getPOStatus(paramMap));
		
		return mav;
	}
	
	@RequestMapping(value={"/getPrivatePOList.do"}, method=RequestMethod.POST)
	public ModelAndView getPrivatePOList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getPrivatePOList.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", exportClearanceService.getPrivatePOList(paramMap));
		
		return mav;
	}

	@RequestMapping(value="/savePrivatePO.do", method=RequestMethod.POST)
	public ModelAndView savePrivatePO(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("savePrivatePO.do"); 
    	System.out.println("#### View paramMap : " + paramMap);
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		/* 테스트용 sleep 
		mav.addObject("success", "OK");
		mav.addObject("results", paramMap);
		logger.info("sleep 5s"); 
		Thread.sleep(5000); 
		return mav;
		테스트용 sleep END */
		
		DefaultTransactionDefinition def = new DefaultTransactionDefinition(); 
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED); 
		TransactionStatus txStatus = txManager.getTransaction(def);
		
    	//로그인 사용자 정보
    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
    	
		try {
	    	logger.info("DELETE");
	    	exportClearanceService.deletePrivatePO(paramMap);
	
	    	logger.info("INSERT");
    		JSONArray poList = JSONArray.fromObject(paramMap.get("PO_LIST").toString());
    		for(int j = 0; j < poList.size(); j++) {	    
    			JSONObject poObj = (JSONObject)poList.get(j);
    			Map<String, Object> poRow = new ObjectMapper().readValue(poObj.toString(), Map.class);
    			poRow.put("USER_AD", paramMap.get("USER_AD").toString());
    			poRow.put("EXPORT_HEADER_ID", paramMap.get("EXPORT_HEADER_ID").toString());
    			
    	    	exportClearanceService.savePrivatePO(poRow);
    		}
    		
	    	txManager.commit(txStatus);			
			mav.addObject("success", "OK");
			mav.addObject("results", paramMap);
    	
			return mav;
		
		} catch(Exception e) {		
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}			
	}
		
	// 전자결재 관련
	// hanbyul1.lee, 수출통관의뢰 전자결재 xml 파일 생성
	@RequestMapping(value = "/showExpDoc.do", method = RequestMethod.GET)
	//public String showExpDoc(HttpSession session, HttpServletRequest request) throws Exception {
	public ModelAndView showExpDoc(@RequestParam(value="exportHeaderId", required = true) String export_header_id) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("EXPORT_HEADER_ID", export_header_id);
		
		Map<String, Object> result = exportClearanceService.getExportReportInfo(param);
		ModelAndView mv = new ModelAndView("desm/trans/showExpDoc", result);
		return mv;
		//return "desm/trans/showExpDoc";
	}
	
	// File Download URL
	@RequestMapping(value = "/expFileDownload.do", method = RequestMethod.GET)
	public void expFileDownload(@RequestParam(value="fileId", required = true) String file_id, HttpServletResponse response, HttpServletRequest request) {
		//TODO: file 없을 때, exception시 에러 페이지 안내하기..
		Map<String, Object> param = new HashMap<String, Object> ();
		param.put("FILE_ID", file_id);
		
		try {
			Map<String, Object> fileInfo = exportClearanceService.getExpFileInfo(param);
			String fullPath = propertiesService.getString("file.upload.path") + "\\" + fileInfo.get("ATT_FILE_PATH").toString();
			
			File file = new File(fullPath);
			if(file.exists()) {
				response.setHeader("Content-Disposition", "attachment;filename=" + getFileNameOfBrowser(request.getHeader("User-Agent"), fileInfo.get("ORGN_FILE_NM").toString()));
				
				FileInputStream fileInputStream = new FileInputStream(fullPath); // 파일 읽어오기 
	        	OutputStream out = response.getOutputStream();
	        	
	        	int read = 0;
                byte[] buffer = new byte[1024];
                while ((read = fileInputStream.read(buffer)) != -1) { // 1024바이트씩 계속 읽으면서 outputStream에 저장, -1이 나오면 더이상 읽을 파일이 없음
                    out.write(buffer, 0, read);
                }
			}
			else {
				logger.info("path : " + fullPath + ", not found file.");
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	private String getFileNameOfBrowser(String userAgent, String fileName)
	{
		//String userAgent = request.getHeader("User-Agent");
		String browser = "";
		String reFileName = "";
		if(userAgent.indexOf("MISE") > -1 || userAgent.indexOf("Trident") > -1 || userAgent.indexOf("Edge") > -1) browser = "MSIE";
		else if(userAgent.indexOf("Chrome") > -1) browser = "Chrome";
		else if(userAgent.indexOf("Opera") > -1) browser = "Opera";
		else if(userAgent.indexOf("Safari") > -1) browser = "Safari"; 
		else if(userAgent.indexOf("Firefox") > -1) browser = "Firefox";
		else browser = "";
		
		try {
			switch(browser) {
				case"MISE":
					reFileName = URLEncoder.encode(fileName, "UTF-8").replaceAll("\\+", "%20");
					break;
				case"Chrome":
					StringBuffer sb = new StringBuffer();
					for (int i = 0; i < fileName.length(); i++) {
						char c = fileName.charAt(i);
						if (c > '~') {
							sb.append(URLEncoder.encode(Character.toString(c), "UTF-8"));
						} else {
							sb.append(c);
						}
					}
					reFileName = sb.toString();
					break;
				default:
					reFileName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
					//reFileName = fileName;
					break;
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		}
		return reFileName;
	}
}

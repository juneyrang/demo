package egovframework.desm.web;

import java.net.URLDecoder;
import java.util.HashMap;
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
import org.springframework.web.servlet.ModelAndView;

import egovframework.desm.service.MaterialService;
import egovframework.rte.fdl.property.EgovPropertyService;

@Controller
public class MaterialController {
	private static final Logger logger = LoggerFactory.getLogger(MaterialController.class);

	@Resource(name = "materialService")
	private MaterialService materialService;

	@Resource(name = "txManager")
	protected DataSourceTransactionManager txManager;

	@Resource(name="propertiesService")
	protected EgovPropertyService propertiesService;

	/**
	 *
	 *
	 * @메소드명 	: getVoyageList
	 * @날짜 		: 2021. 10. 21 오전 11:40:13
	 * @작성자 		: Cho HeumJun
	 * @설명
	 * <pre>
	 *		항차 리스트
	 * </pre>
	 *
	 * @param paramMap
	 * @param model
	 * @param session
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "getVoyageList.do")
	public ModelAndView getVoyageList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getVoyageList(paramMap));
		return mav;
	}

	/**
	 *
	 *
	 * @메소드명 	: getMaterialList
	 * @날짜 		: 2021. 10. 21 오전 11:40:13
	 * @작성자 		: Cho HeumJun
	 * @설명
	 * <pre>
	 *		현장자재관리 리스트
	 * </pre>
	 *
	 * @param paramMap
	 * @param model
	 * @param session
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "getPackingList.do")
	public ModelAndView getPackingList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		logger.info("getPackingList, all packing list include detail items with zvts item");
		logger.info("call user ad :: " +  session.getAttribute("SSOID"));
		logger.info("call paramMap :: " + paramMap);
		
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getPackingList(paramMap));
		return mav;
	}

	@RequestMapping(value={"/getIdsmOsSummaryList.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmOsSummaryList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmOsSummaryList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getIdsmOsSummaryList(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getIdsmOsDetailList.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmOsDetailList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmOsDetailList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getIdsmOsDetailList(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getIdsmOsSummaryListMirCheck.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmOsSummaryListMirCheck(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmOsSummaryListMirCheck.do");
		ModelAndView mav = new ModelAndView("jsonView");
		try {
	    	//로그인 사용자 정보
			mav.addObject("results", materialService.getIdsmOsSummaryListMirCheck(paramMap));
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveIdsmOsSummaryListMirCreation.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmOsSummaryListMirCreation(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmOsSummaryListMirCreation.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	Map<String, Object> reulstMap = materialService.saveIdsmOsSummaryListMirCreation(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			mav.addObject("MIR_NO", reulstMap.get("MIR_NO"));

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getIdsmOsSummaryListMirCancelCheck.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmOsSummaryListMirCancelCheck(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmOsSummaryListMirCancelCheck.do");
		ModelAndView mav = new ModelAndView("jsonView");
		try {
	    	//로그인 사용자 정보
			mav.addObject("results", materialService.getIdsmOsSummaryListMirCancelCheck(paramMap));
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveIdsmOsSummaryListMirCancel.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmOsSummaryListMirCancel(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmOsSummaryListMirCancel.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.saveIdsmOsSummaryListMirCancel(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveIdsmOsSummaryListMirAccept.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmOsSummaryListMirAccept(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmOsSummaryListMirAccept.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.saveIdsmOsSummaryListMirAccept(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getIdsmOsSummaryListMirAcceptCheck.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmOsSummaryListMirAcceptCheck(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmOsSummaryListMirAcceptCheck.do");
		ModelAndView mav = new ModelAndView("jsonView");
		try {
	    	//로그인 사용자 정보
			mav.addObject("results", materialService.getIdsmOsSummaryListMirAcceptCheck(paramMap));
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveIdsmOsSummaryList.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmOsSummaryList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmOsSummaryList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.saveIdsmOsSummaryList(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getIdsmOsSummaryListRfiCheck.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmOsSummaryListRfiCheck(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmOsSummaryListRfiCheck.do");
		ModelAndView mav = new ModelAndView("jsonView");
		try {
	    	//로그인 사용자 정보
			mav.addObject("results", materialService.getIdsmOsSummaryListRfiCheck(paramMap));
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveIdsmOsSummaryListRfiCreation.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmOsSummaryListRfiCreation(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmOsSummaryListRfiCreation.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	Map<String, Object> reulstMap = materialService.saveIdsmOsSummaryListRfiCreation(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			mav.addObject("MIR_NO", reulstMap.get("MIR_NO"));

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getIdsmOsSummaryListRfiCancelCheck.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmOsSummaryListRfiCancelCheck(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmOsSummaryListRfiCancelCheck.do");
		ModelAndView mav = new ModelAndView("jsonView");
		try {
	    	//로그인 사용자 정보
			mav.addObject("results", materialService.getIdsmOsSummaryListRfiCancelCheck(paramMap));
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveIdsmOsSummaryListRfiCancel.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmOsSummaryListRfiCancel(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmOsSummaryListRfiCancel.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.saveIdsmOsSummaryListRfiCancel(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getIdsmOsSummaryListRfiAcceptCheck.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmOsSummaryListRfiAcceptCheck(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmOsSummaryListRfiAcceptCheck.do");
		ModelAndView mav = new ModelAndView("jsonView");
		try {
	    	//로그인 사용자 정보
			mav.addObject("results", materialService.getIdsmOsSummaryListRfiAcceptCheck(paramMap));
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveIdsmOsSummaryListRfiAccept.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmOsSummaryListRfiAccept(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmOsSummaryListRfiAccept.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.saveIdsmOsSummaryListRfiAccept(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveIdsmRfiCreationSetUp.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmRfiCreationSetUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmRfiCreationSetUp.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.saveIdsmRfiCreationSetUp(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value = "getIdsmRfiCreationSetUpAppliedProcedure.do")
	public ModelAndView getIdsmRfiCreationSetUpAppliedProcedure(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getIdsmRfiCreationSetUpAppliedProcedure(paramMap));
		return mav;
	}

	@RequestMapping(value = "getIdsmRfiCreationSetUpProcedure.do")
	public ModelAndView getIdsmRfiCreationSetUpProcedure(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getIdsmRfiCreationSetUpProcedure(paramMap));
		return mav;
	}

	@RequestMapping(value = "getIdsmRfiCreationSetUpInspection.do")
	public ModelAndView getIdsmRfiCreationSetUpInspection(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getIdsmRfiCreationSetUpInspection(paramMap));
		return mav;
	}

	@RequestMapping(value = "getIdsmRfiCreationSetUpAttachments.do")
	public ModelAndView getIdsmRfiCreationSetUpAttachments(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getIdsmRfiCreationSetUpAttachments(paramMap));
		return mav;
	}

	@RequestMapping(value="/deleteIdsmCreateItemSetupAppliedProcedure.do", method=RequestMethod.POST)
	public ModelAndView deleteIdsmCreateItemSetupAppliedProcedure(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteIdsmCreateItemSetupAppliedProcedure.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.deleteIdsmCreateItemSetupAppliedProcedure(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/deleteIdsmCreateItemSetupProcedure.do", method=RequestMethod.POST)
	public ModelAndView deleteIdsmCreateItemSetupProcedure(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteIdsmCreateItemSetupProcedure.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.deleteIdsmCreateItemSetupProcedure(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/deleteIdsmCreateItemSetupInspection.do", method=RequestMethod.POST)
	public ModelAndView deleteIdsmCreateItemSetupInspection(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteIdsmCreateItemSetupInspection.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.deleteIdsmCreateItemSetupInspection(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value = "getIdsmRfiCreationCode.do")
	public ModelAndView getIdsmRfiCreationCode(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", materialService.getIdsmRfiCreationCode(paramMap));
		return mav;
	}

	@RequestMapping(value = "getIdsmMirCreationLastData.do")
	public ModelAndView getIdsmMirCreationLastData(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception {
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", materialService.getIdsmMirCreationLastData(paramMap));
		return mav;
	}

	@RequestMapping(value="/saveIdsmOsSummaryListConfirmMaterial.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmOsSummaryListConfirmMaterial(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmOsSummaryListConfirmMaterial.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.saveIdsmOsSummaryListConfirmMaterial(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getDesmRsiPlDetailList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmRsiPlDetailList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmRsiPlDetailList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getDesmRsiPlDetailList(paramMap));

		return mav;
	}

	@RequestMapping(value="/saveDesmRsiSave.do", method=RequestMethod.POST)
	public ModelAndView saveDesmRsiSave(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveDesmRsiSave.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	Map<String, Object> resultMap = materialService.saveDesmRsiSave(paramMap);

	    	if(resultMap.get("error") != null && !resultMap.get("error").toString().equals("")) {
				txManager.rollback(txStatus);
				mav.addObject("error", resultMap.get("error"));
				mav.addObject("MATERIAL_CODE", resultMap.get("MATERIAL_CODE"));
				mav.addObject("REQ_AVAILABLE_QTY", resultMap.get("REQ_AVAILABLE_QTY"));
				return mav;
	    	}

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			mav.addObject("RSI_HEADER_ID", resultMap.get("RSI_HEADER_ID"));
			mav.addObject("STATUS", resultMap.get("STATUS"));
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getDesmRsiList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmRsiList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmRsiList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", materialService.getDesmRsiList(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getDesmRsiInfoList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmRsiInfoList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmRsiInfoList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", materialService.getDesmRsiInfoList(paramMap));

		return mav;
	}

	@RequestMapping(value="/deleteDesmRsiDtl.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmRsiDtl(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteDesmRsiDtl.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.deleteDesmRsiDtl(paramMap);

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveDesmRsiReject.do", method=RequestMethod.POST)
	public ModelAndView saveDesmRsiReject(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveDesmRsiReject.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.saveDesmRsiReject(paramMap);

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getDesmRsiUserList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmRsiUserList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmRsiUserList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		if (paramMap.containsKey("keyword"))
		{
			paramMap.put("keyword", URLDecoder.decode(paramMap.get("keyword").toString(),"UTF-8"));
		}

		mav.addObject("results", materialService.getDesmRsiUserList(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getDesmRsiUserSubconList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmRsiUserSubconList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmRsiUserSubconList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		paramMap.put("P_USER_AD", session.getAttribute("SSOID"));


		mav.addObject("results", materialService.getDesmRsiUserSubconList(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getDesmOutGoingCreationList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmOutGoingCreationList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmOutGoingCreationList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getDesmOutGoingCreationList(paramMap));

		return mav;
	}

	@RequestMapping(value="/saveDesmRsiOutSave.do", method=RequestMethod.POST)
	public ModelAndView saveDesmRsiOutSave(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveDesmRsiOutSave.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	Map<String, Object> resultMap = materialService.saveDesmRsiOutSave(paramMap);

	    	if(resultMap.get("error") != null && !resultMap.get("error").toString().equals("")) {
				txManager.rollback(txStatus);
				mav.addObject("error", resultMap.get("error"));
				mav.addObject("RSI_LINE_ID", resultMap.get("RSI_LINE_ID"));
				mav.addObject("HANDOVER_AVAILABLE_QTY", resultMap.get("HANDOVER_AVAILABLE_QTY"));
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

	@RequestMapping(value={"/getDesmRsiOutGoingList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmRsiOutGoingList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmRsiOutGoingList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getDesmRsiOutGoingList(paramMap));

		return mav;
	}

	@RequestMapping(value="/deleteDesmRsiOut.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmRsiOut(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteDesmRsiOut.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	Map<String, Object> resultMap = materialService.deleteDesmRsiOut(paramMap);

	    	if(resultMap.get("error") != null && !resultMap.get("error").toString().equals("")) {
				txManager.rollback(txStatus);
				mav.addObject("error", resultMap.get("error"));
				mav.addObject("RSI_OUTGOING_ID", resultMap.get("RSI_OUTGOING_ID"));
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

	@RequestMapping(value="/saveDesmSubconSave.do", method=RequestMethod.POST)
	public ModelAndView saveDesmSubconSave(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveDesmSubconSave.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	Map<String, Object> resultMap = materialService.saveDesmSubconSave(paramMap);

	    	if(resultMap.get("error") != null && !resultMap.get("error").toString().equals("")) {
				txManager.rollback(txStatus);
				mav.addObject("error", resultMap.get("error"));
				mav.addObject("USER_AD", resultMap.get("USER_AD"));
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

	@RequestMapping(value={"/getDesmSubconList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmSubconList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmSubconList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getDesmSubconList(paramMap));

		return mav;
	}

	@RequestMapping(value="/deleteDesmSubconList.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmSubconList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteDesmSubconList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

	    	materialService.deleteDesmSubconList(paramMap);
	    	//기본데이터 저장


	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getDesmSubconRoleList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmSubconRoleList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmSubconRoleList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getDesmSubconRoleList(paramMap));

		return mav;
	}

	@RequestMapping(value="/saveIdsmOsSummaryListCancelMaterial.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmOsSummaryListCancelMaterial(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmOsSummaryListCancelMaterial.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));


	    	Map<String, Object> resultMap = materialService.saveIdsmOsSummaryListCancelMaterial(paramMap);

	    	if(resultMap.get("error") != null && !resultMap.get("error").toString().equals("")) {
				txManager.rollback(txStatus);
				mav.addObject("error", resultMap.get("error"));
				mav.addObject("PACKAGE_NO", resultMap.get("PACKAGE_NO"));

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

	@RequestMapping(value={"/getDesmSiteProjectList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmSiteProjectList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmSiteProjectList.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", materialService.getDesmSiteProjectList(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getDesmSiteProjectDlgProject.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmSiteProjectDlgProject(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmSiteProjectDlgProject.do");

		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", materialService.getDesmSiteProjectDlgProject(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getDesmSiteProjectUserList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmSiteProjectUserList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmSiteProjectUserList.do");

		ModelAndView mav = new ModelAndView("jsonView");

		mav.addObject("results", materialService.getDesmSiteProjectUserList(paramMap));

		return mav;
	}

	@RequestMapping(value="/deleteDesmRsi.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmRsi(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteDesmRsi.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.deleteDesmRsi(paramMap);

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getDesmRsiViewList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmRsiViewList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmRsiViewList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getDesmRsiViewList(paramMap));

		return mav;
	}

	@RequestMapping(value="/sendMailDesmRsi.do", method=RequestMethod.POST)
	public ModelAndView sendMailDesmRsi(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("sendMailDesmRsi.do");

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
	    	cnt = materialService.sendMailDesmRsi(paramMap);

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

	@RequestMapping(value="/saveIdsmOsDetailList.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmOsDetailList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmOsDetailList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.saveIdsmOsDetailList(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getDesmPlDetailEditLogList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmPlDetailEditLogList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmPlDetailEditLogList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getDesmPlDetailEditLogList(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getDesmPlSummaryEditLogList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmPlSummaryEditLogList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmPlSummaryEditLogList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getDesmPlSummaryEditLogList(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getDesmMrfPlDetailList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMrfPlDetailList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMrfPlDetailList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getDesmMrfPlDetailList(paramMap));

		return mav;
	}

	@RequestMapping(value="/saveDesmMrfSave.do", method=RequestMethod.POST)
	public ModelAndView saveDesmMrfSave(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveDesmMrfSave.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	Map<String, Object> resultMap = materialService.saveDesmMrfSave(paramMap);

	    	if(resultMap.get("error") != null && !resultMap.get("error").toString().equals("")) {
				txManager.rollback(txStatus);

				mav.addObject("error", resultMap.get("error"));
				mav.addObject("RSI_LINE_ID", resultMap.get("RSI_LINE_ID"));
				mav.addObject("RSI_OUTGOING_ID", resultMap.get("RSI_OUTGOING_ID"));
				mav.addObject("MATERIAL_CODE", resultMap.get("MATERIAL_CODE"));
				mav.addObject("RETURN_TYPE", resultMap.get("RETURN_TYPE"));
				mav.addObject("RETURN_AVAILABLE_QTY", resultMap.get("RETURN_AVAILABLE_QTY"));
				return mav;
	    	}

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			mav.addObject("MRF_HEADER_ID", resultMap.get("MRF_HEADER_ID"));
			mav.addObject("STATUS", resultMap.get("STATUS"));
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getDesmMrfList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMrfList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMrfList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", materialService.getDesmMrfList(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getDesmMrfInfoList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMrfInfoList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMrfInfoList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", materialService.getDesmMrfInfoList(paramMap));

		return mav;
	}

	@RequestMapping(value="/saveDesmMrfReject.do", method=RequestMethod.POST)
	public ModelAndView saveDesmMrfReject(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveDesmMrfReject.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.saveDesmMrfReject(paramMap);

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/deleteDesmMrfDtl.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmMrfDtl(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteDesmMrfDtl.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.deleteDesmMrfDtl(paramMap);

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/deleteDesmMrf.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmMrf(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteDesmMrf.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.deleteDesmMrf(paramMap);

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getDesmReturnCreationList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmReturnCreationList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmReturnCreationList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getDesmReturnCreationList(paramMap));

		return mav;
	}

	@RequestMapping(value="/saveDesmMrfReturnSave.do", method=RequestMethod.POST)
	public ModelAndView saveDesmMrfReturnSave(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveDesmMrfReturnSave.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	Map<String, Object> resultMap = materialService.saveDesmMrfReturnSave(paramMap);

	    	if(resultMap.get("error") != null && !resultMap.get("error").toString().equals("")) {
				txManager.rollback(txStatus);
				mav.addObject("error", resultMap.get("error"));
				mav.addObject("MRF_LINE_ID", resultMap.get("MRF_LINE_ID"));
				mav.addObject("RETURN_AVAILABLE_QTY", resultMap.get("RETURN_AVAILABLE_QTY"));
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

	@RequestMapping(value={"/getDesmMrfReturnList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMrfReturnList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMrfReturnList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getDesmMrfReturnList(paramMap));

		return mav;
	}

	@RequestMapping(value="/deleteDesmMrfReturn.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmMrfReturn(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteDesmMrfReturn.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.deleteDesmMrfReturn(paramMap);

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveIdsmQrCodeList.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmQrCodeList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmQrCodeList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.saveIdsmQrCodeList(paramMap);

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/sendMailDesmMrf.do", method=RequestMethod.POST)
	public ModelAndView sendMailDesmMrf(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("sendMailDesmMrf.do");

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
	    	cnt = materialService.sendMailDesmMrf(paramMap);

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

	@RequestMapping(value="/saveDesmMapCreation.do", method=RequestMethod.POST)
	public ModelAndView saveDesmMapCreation(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveDesmMapCreation.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.saveDesmMapCreation(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getDesmMapCreationList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMapCreationList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMapCreationList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getDesmMapCreationList(paramMap));

		return mav;
	}

	@RequestMapping(value="/deleteDesmMapCreation.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmMapCreation(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteDesmMapCreation.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.deleteDesmMapCreation(paramMap);

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getDesmMapInfoList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMapInfoList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMapInfoList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getDesmMapInfoList(paramMap));

		return mav;
	}


	@RequestMapping(value="/saveDesmMapAreaCreation.do", method=RequestMethod.POST)
	public ModelAndView saveDesmMapAreaCreation(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveDesmMapAreaCreation.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.saveDesmMapAreaCreation(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/deleteDesmMapAreaCreation.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmMapAreaCreation(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteDesmMapAreaCreation.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.deleteDesmMapAreaCreation(paramMap);

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveDesmLocation.do", method=RequestMethod.POST)
	public ModelAndView saveDesmLocation(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveDesmLocation.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	resultMap = materialService.saveDesmLocation(paramMap);
	    	if(resultMap.get("QTY_ZERO") != null){
	    		txManager.rollback(txStatus);
				mav.addObject("error", "qtyCheckErr");
				mav.addObject("PACKAGE_NO", resultMap.get("PACKAGE_NO"));
	    	}else {
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

	@RequestMapping(value="/saveDesmLocationCheck.do", method=RequestMethod.POST)
	public ModelAndView saveDesmLocationCheck(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveDesmLocationCheck.do");

		ModelAndView mav = new ModelAndView("jsonView");
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

	    	resultMap = materialService.saveDesmLocationCheck(paramMap);
	    	if(resultMap.get("LOCATION_DIFF") != null) {
				mav.addObject("LOCATION_DIFF", "LOCATION_DIFF");
				mav.addObject("PACKAGE_NO", resultMap.get("PACKAGE_NO"));
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

	@RequestMapping(value={"/getDesmDesmMapLocationList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmDesmMapLocationList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmDesmMapLocationList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getDesmDesmMapLocationList(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getDesmMapSearchInfoList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMapSearchInfoList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMapSearchInfoList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getDesmMapSearchInfoList(paramMap));

		return mav;
	}

	@RequestMapping(value="/deleteDesmLocation.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmLocation(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteDesmLocation.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.deleteDesmLocation(paramMap);
    		txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);

			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getLocationCodeList.do"}, method=RequestMethod.POST)
	public ModelAndView getLocationCodeList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getLocationCodeList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getLocationCodeList(paramMap));

		return mav;
	}

	@RequestMapping(value="/saveDesmDetailItemCreation.do", method=RequestMethod.POST)
	public ModelAndView saveDesmDetailItemCreation(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveDesmDetailItemCreation.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.saveDesmDetailItemCreation(paramMap);

    		txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getIdsmOsManageList.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmOsManageList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmOsManageList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getIdsmOsManageList(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getDesmMaterialManageCreationList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMaterialManageCreationList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmOutGoingCreationList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getDesmMaterialManageCreationList(paramMap));

		return mav;
	}

	@RequestMapping(value="/saveDesmMaterialManageSave.do", method=RequestMethod.POST)
	public ModelAndView saveDesmMaterialManageSave(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveDesmMaterialManageSave.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
			//로그인 사용자 정보
			paramMap.put("USER_AD", session.getAttribute("SSOID"));
			//기본데이터 저장
			materialService.saveDesmMaterialManageSave(paramMap);

			txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveIdsmOsManageList.do", method=RequestMethod.POST)
	public ModelAndView saveIdsmOsManageList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveIdsmOsManageList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
			//로그인 사용자 정보
			paramMap.put("USER_AD", session.getAttribute("SSOID"));
			//기본데이터 저장
			materialService.saveIdsmOsManageList(paramMap);

			txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/deleteMaterialManage.do", method=RequestMethod.POST)
	public ModelAndView deleteMaterialManage(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteMaterialManage.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
			//기본데이터 저장
			materialService.deleteMaterialManage(paramMap);

			txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getDesmTransactionHistoryList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmTransactionHistoryList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmTransactionHistoryList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getDesmTransactionHistoryList(paramMap));

		return mav;
	}
	
	@RequestMapping(value={"/getDesmProjectPackageInfo.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmProjectPackageInfo(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmProjectPackageInfo.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("result", materialService.getDesmProjectPackageInfo(paramMap));

		return mav;
	}
	
	@RequestMapping(value={"/getDesmMrrList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMrrList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMrrList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", materialService.getDesmMrrList(paramMap));

		return mav;
	}
	
	@RequestMapping(value="/saveDesmMrrSave.do", method=RequestMethod.POST)
	public ModelAndView saveDesmMrrSave(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveDesmMrrSave.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	Map<String, Object> resultMap = materialService.saveDesmMrrSave(paramMap);

	    	if(resultMap.get("error") != null && !resultMap.get("error").toString().equals("")) {
				txManager.rollback(txStatus);
				mav.addObject("error", resultMap.get("error"));
				//mav.addObject("PACKAGE_NO", resultMap.get("PACKAGE_NO"));
				//mav.addObject("REQ_AVAILABLE_QTY", resultMap.get("REQ_AVAILABLE_QTY"));
				return mav;
	    	}

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			mav.addObject("MRR_HEADER_ID", resultMap.get("MRR_HEADER_ID"));
			mav.addObject("STATUS", resultMap.get("STATUS"));
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}
	
	
	@RequestMapping(value={"/getDesmMrrInfoList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMrrInfoList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMrrInfoList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", materialService.getDesmMrrInfoList(paramMap));

		return mav;
	}
	
	@RequestMapping(value="/deleteDesmMrrDtl.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmMrrDtl(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteDesmMrrDtl.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.deleteDesmMrrDtl(paramMap);

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}
	
	@RequestMapping(value="/saveDesmMrrReject.do", method=RequestMethod.POST)
	public ModelAndView saveDesmMrrReject(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveDesmMrrReject.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.saveDesmMrrReject(paramMap);

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}
	
	
	@RequestMapping(value="/deleteDesmMrr.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmMrr(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteDesmMrr.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.deleteDesmMrr(paramMap);

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}
	
	@RequestMapping(value="/sendMailDesmMrr.do", method=RequestMethod.POST)
	public ModelAndView sendMailDesmMrr(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("sendMailDesmMrr.do");

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
	    	cnt = materialService.sendMailDesmMrr(paramMap);

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
	
	@RequestMapping(value={"/getIdsmOsSummaryMrrList.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmOsSummaryMrrList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmOsSummaryMrrList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getIdsmOsSummaryMrrList(paramMap));

		return mav;
	}
	

	@RequestMapping(value={"/getDesmMirList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMirList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMirList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", materialService.getDesmMirList(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getIdsmOsSummaryMirList.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmOsSummaryMirList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmOsSummaryMirList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getIdsmOsSummaryMirList(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getIdsmOsSummaryMirItemList.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmOsSummaryMirItemList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmOsSummaryMirItemList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getIdsmOsSummaryMirItemList(paramMap));

		return mav;
	}

	@RequestMapping(value="/saveDesmMirSave.do", method=RequestMethod.POST)
	public ModelAndView saveDesmMirSave(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("saveDesmMirSave.do");
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	Map<String, Object> resultMap = materialService.saveDesmMirSave(paramMap);

	    	if(resultMap.get("error") != null && !resultMap.get("error").toString().equals("")) {
				txManager.rollback(txStatus);
				mav.addObject("error", resultMap.get("error"));
				//mav.addObject("PACKAGE_NO", resultMap.get("PACKAGE_NO"));
				//mav.addObject("REQ_AVAILABLE_QTY", resultMap.get("REQ_AVAILABLE_QTY"));
				return mav;
	    	}

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			mav.addObject("MIR_HEADER_ID", resultMap.get("MIR_HEADER_ID"));
			mav.addObject("STATUS", resultMap.get("STATUS"));
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/deleteDesmMirDtl.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmMirDtl(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteDesmMirDtl.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.deleteDesmMirDtl(paramMap);

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}
	
	@RequestMapping(value="/saveDesmMirReject.do", method=RequestMethod.POST)
	public ModelAndView saveDesmMirReject(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveDesmMirReject.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.saveDesmMirReject(paramMap);

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}
	
	@RequestMapping(value={"/getDesmMirInfoList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMirInfoList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getDesmMirInfoList.do");
		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", materialService.getDesmMirInfoList(paramMap));

		return mav;
	}
	
	
	@RequestMapping(value="/deleteDesmMir.do", method=RequestMethod.POST)
	public ModelAndView deleteDesmMir(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("deleteDesmMir.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	materialService.deleteDesmMir(paramMap);

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/sendMailDesmMir.do", method=RequestMethod.POST)
	public ModelAndView sendMailDesmMir(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("sendMailDesmMir.do");

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
	    	cnt = materialService.sendMailDesmMir(paramMap);

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
	
	@RequestMapping(value="/updateMirAfterChecked.do", method=RequestMethod.POST)
	public ModelAndView updateMirAfterChecked(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("updateMirAfterChecked.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	Map<String, Object> resultMap = materialService.updateMirAfterChecked(paramMap);

	    	if(resultMap.get("error") != null && !resultMap.get("error").toString().equals("")) {
				txManager.rollback(txStatus);
				mav.addObject("error", resultMap.get("error"));
				return mav;
	    	}

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			mav.addObject("MIR_HEADER_ID", resultMap.get("MIR_HEADER_ID"));
			mav.addObject("STATUS", resultMap.get("STATUS"));
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

}

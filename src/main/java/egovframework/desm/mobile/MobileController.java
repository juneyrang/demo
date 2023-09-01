package egovframework.desm.mobile;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.desm.cmmn.FileResizeUtil;
import egovframework.desm.cmmn.firebase.FirebaseService;
import egovframework.desm.service.AttachService;
import egovframework.desm.service.MaterialService;
import egovframework.desm.service.MobileService;
import egovframework.rte.fdl.property.EgovPropertyService;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Controller
@RequestMapping(value = "/mobile")
public class MobileController {
	private static final Logger logger = LoggerFactory.getLogger(MobileController.class);

	@Resource(name="propertiesService")
	protected EgovPropertyService propertiesService;

	@Resource(name = "mobileService")
	private MobileService mobileService;

	@Resource(name = "materialService")
	private MaterialService materialService;

	@Resource(name = "firebaseService")
	private FirebaseService firebaseService;

	@Resource(name = "txManager")
	protected DataSourceTransactionManager txManager;
	
	@Resource(name = "attachService")
	private AttachService attachService;

	@RequestMapping(value={"/getAccessToken.do"}, method=RequestMethod.POST)
	public ModelAndView getAccessToken(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("[getAccessToken]Start");


		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : USER_AD, RSI_HEADER_ID
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getAccessToken(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value = "/getLocation.do", method = RequestMethod.GET)
	public ModelAndView getLocation(HttpServletRequest request) throws Exception {
		logger.info("[getLocation]Start");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("result", propertiesService.getString("location"));
		return mav;
	}

	@RequestMapping(value={"/getMobileLeftMenu.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileLeftMenu(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileLeftMenu.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : USER_AD
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileLeftMenu(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileInitDefaultProject.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileInitDefaultProject(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileInitDefaultProject.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : USER_AD
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileInitDefaultProject(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileMenuAuthCheckList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileMenuAuthCheckList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileMenuAuthCheckList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : USER_AD, MENU_SEQ
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileMenuAuthCheckList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileToDoList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileToDoList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileToDoList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : USER_AD
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileToDoList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileRsiHeaderList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileRsiHeaderList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileRsiHeaderList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : USER_AD, RSI_HEADER_ID
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileRsiHeaderList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileRsiLineList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileRsiLineList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileRsiLineList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : RSI_HEADER_ID
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileRsiLineList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileMrfHeaderList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileMrfHeaderList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileMrfHeaderList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : USER_AD, MRF_HEADER_ID
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileMrfHeaderList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileMrfLineList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileMrfLineList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileMrfLineList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : MRF_HEADER_ID
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileMrfLineList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/saveMobileRsi.do"}, method=RequestMethod.POST)
	public ModelAndView saveMobileRsi(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/saveMobileRsi.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : TRANS_TYPE (Pre-Checked, Pre-Confirmed, Pre-Approved, Approved), RSI_HEADER_ID, USER_AD, REMARK
		ModelAndView mav = new ModelAndView("jsonView");

		Map<String, Object> paramMailMap = new HashMap<String, Object>();
    	String loc = propertiesService.getString("location");
    	paramMailMap.put("location", loc);
    	paramMailMap.put("LOGIN_URL", propertiesService.getString("mail.login.url.prod"));
    	if(loc.equals("dev")) {
    		paramMailMap.put("LOGIN_URL", propertiesService.getString("mail.login.url.dev"));
    	}
    	paramMailMap.put("host", propertiesService.getString("mail.host"));
    	paramMailMap.put("port", propertiesService.getString("mail.port"));
    	paramMailMap.put("encoding", propertiesService.getString("mail.encoding"));
    	paramMailMap.put("username", propertiesService.getString("mail.username"));
    	paramMailMap.put("password", propertiesService.getString("mail.password"));

		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);

		try {
			resultMap = mobileService.saveMobileRsi(param, paramMailMap);
			txManager.commit(txStatus);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
    		mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/saveMobileRsiReject.do"}, method=RequestMethod.POST)
	public ModelAndView saveMobileRsiReject(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/saveMobileRsiReject.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : RSI_HEADER_ID, USER_AD, STATUS
		ModelAndView mav = new ModelAndView("jsonView");

		Map<String, Object> paramMailMap = new HashMap<String, Object>();
    	String loc = propertiesService.getString("location");
    	paramMailMap.put("location", loc);
    	paramMailMap.put("LOGIN_URL", propertiesService.getString("mail.login.url.prod"));
    	if(loc.equals("dev")) {
    		paramMailMap.put("LOGIN_URL", propertiesService.getString("mail.login.url.dev"));
    	}
    	paramMailMap.put("host", propertiesService.getString("mail.host"));
    	paramMailMap.put("port", propertiesService.getString("mail.port"));
    	paramMailMap.put("encoding", propertiesService.getString("mail.encoding"));
    	paramMailMap.put("username", propertiesService.getString("mail.username"));
    	paramMailMap.put("password", propertiesService.getString("mail.password"));

		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);

		try {
			resultMap = mobileService.saveMobileRsiReject(param, paramMailMap);
			txManager.commit(txStatus);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
    		mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/saveMobileMrf.do"}, method=RequestMethod.POST)
	public ModelAndView saveMobileMrf(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/saveMobileMrf.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : TRANS_TYPE (Pre-Checked, Pre-Confirmed, Pre-Approved, Approved), MRF_HEADER_ID, USER_AD, PROJECT_NO, REMARK
		ModelAndView mav = new ModelAndView("jsonView");

		Map<String, Object> paramMailMap = new HashMap<String, Object>();
    	String loc = propertiesService.getString("location");
    	paramMailMap.put("location", loc);
    	paramMailMap.put("LOGIN_URL", propertiesService.getString("mail.login.url.prod"));
    	if(loc.equals("dev")) {
    		paramMailMap.put("LOGIN_URL", propertiesService.getString("mail.login.url.dev"));
    	}
    	paramMailMap.put("host", propertiesService.getString("mail.host"));
    	paramMailMap.put("port", propertiesService.getString("mail.port"));
    	paramMailMap.put("encoding", propertiesService.getString("mail.encoding"));
    	paramMailMap.put("username", propertiesService.getString("mail.username"));
    	paramMailMap.put("password", propertiesService.getString("mail.password"));

		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);

		try {
			resultMap = mobileService.saveMobileMrf(param, paramMailMap);
			txManager.commit(txStatus);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
    		mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/saveMobileMrfReject.do"}, method=RequestMethod.POST)
	public ModelAndView saveMobileMrfReject(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/saveMobileMrfReject.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : MRF_HEADER_ID, USER_AD, STATUS, REMARK
		ModelAndView mav = new ModelAndView("jsonView");

		Map<String, Object> paramMailMap = new HashMap<String, Object>();
    	String loc = propertiesService.getString("location");
    	paramMailMap.put("location", loc);
    	paramMailMap.put("LOGIN_URL", propertiesService.getString("mail.login.url.prod"));
    	if(loc.equals("dev")) {
    		paramMailMap.put("LOGIN_URL", propertiesService.getString("mail.login.url.dev"));
    	}
    	paramMailMap.put("host", propertiesService.getString("mail.host"));
    	paramMailMap.put("port", propertiesService.getString("mail.port"));
    	paramMailMap.put("encoding", propertiesService.getString("mail.encoding"));
    	paramMailMap.put("username", propertiesService.getString("mail.username"));
    	paramMailMap.put("password", propertiesService.getString("mail.password"));

		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);

		try {
			resultMap = mobileService.saveMobileMrfReject(param, paramMailMap);
			txManager.commit(txStatus);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
    		mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileMapList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileMapList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileMapList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : PROJECT_NO
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileMapList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/saveMobileMap.do"}, method=RequestMethod.POST)
	public ModelAndView saveMobileMap(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/saveMobileMap.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : PROJECT_NO, TRK_ITEM_NAME, PACKAGE_NO, MATERIAL_CODE, MAP_MST_ID, MAP_DTL_ID, USER_AD, CODE_TYPE
		ModelAndView mav = new ModelAndView("jsonView");

		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);

		try {
			resultMap = mobileService.saveMobileMap(param);

			if(!resultMap.get("status").toString().equals("success")) {
				txManager.rollback(txStatus);
			}else {
				txManager.commit(txStatus);
			}
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
    		mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/saveMobileMapCheck.do"}, method=RequestMethod.POST)
	public ModelAndView saveMobileMapCheck(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/saveMobileMapCheck.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : PROJECT_NO, TRK_ITEM_NAME, PACKAGE_NO, MATERIAL_CODE, MAP_MST_ID, MAP_DTL_ID, USER_AD, CODE_TYPE
		ModelAndView mav = new ModelAndView("jsonView");

		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);

		try {
			resultMap = mobileService.saveMobileMapCheck(param);
			if(resultMap.get("LOCATION_DIFF") != null) {
				mav.addObject("LOCATION_DIFF", "LOCATION_DIFF");
	    	}

			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
    		mav.addObject("result", resultMap);
			return mav;
		}
	}


	@RequestMapping(value = "/getMobileMap.do", method = RequestMethod.GET)
	public String getMobileMap(@RequestParam String MAP_MST_ID, HttpServletRequest request, ModelMap model ) throws Exception {
		logger.info("/mobile/getMobileMap.do");

		model.put("MAP_MST_ID", MAP_MST_ID);
		model.put("idcs_service_url", request.getHeader("idcs_service_url"));

		return "desm/material/plMobileMap";

	}

	@RequestMapping(value={"/getDesmMapInfoList.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmMapInfoList(@RequestParam Map<String, Object> paramMap) throws Exception{
		logger.info("/mobile/getDesmMapInfoList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getDesmMapInfoList(paramMap));

		return mav;
	}

	@RequestMapping(value = "/getAccessTokenDelegate.do", method = RequestMethod.GET)
	public String getAccessTokenDelegate(@RequestParam(value="type", required=true) String type, @RequestParam(value="code", required = true) String code, ModelMap model, HttpServletRequest request) throws Exception {
		logger.info("/mobile/getAccessTokenDelegate.do");

		model.put("type", type);
		model.put("code", code);
		model.put("idcs_service_url", request.getHeader("idcs_service_url"));
		//return "desm/getAccessTokenDelegate";
		return "desm/getAccessTokenDelegateWeb";
	}

	@RequestMapping(value={"/saveAccessTokenDelegate.do"}, method=RequestMethod.POST)
	public ModelAndView saveAccessTokenDelegate(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("/mobile/saveAccessTokenDelegate.do");

		logger.info("before urlDecoder");
		logger.info(paramMap.toString());

		ModelAndView mav = new ModelAndView("jsonView");
		try {
			paramMap.put("access_token", paramMap.get("response[access_token]"));
			paramMap.put("expires_in", paramMap.get("response[expires_in]"));
			paramMap.put("token_type", paramMap.get("response[token_type]"));

			logger.info("after urlDecoder");
			logger.info(paramMap.toString());

			mav.addObject("status", (mobileService.saveAccessTokenDelegate(paramMap) == 1) ? "success" : "fail");
			return mav;

		} catch(Exception e){
    		e.printStackTrace();
    		mav.addObject("status", "fail");
    		mav.addObject("data", e.getMessage());
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileQrCodePackageInfo.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileQrCodePackageInfo(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileQrCodePackageInfo.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param :  CODE_TYPE, PROJECT_NO, TRK_ITEM_NAME, PACKAGE_NO, MATERIAL_CODE
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileQrCodePackageInfo(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileSearchList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileSearchList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileSearchList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param :  S_TYPE(RSI), PROJECT_NO, USER_AD, PAGE_NUM, RSI_NO, RSI_NAME, SUBCONTRACTOR, START_HANDOVER_DATE, END_HANDOVER_DATE, MATERIAL_CODE, ATTRIBUTE10, STATUS, CLOSED_CODE
		//param :  S_TYPE(MRF), PROJECT_NO, USER_AD, PAGE_NUM, MRF_NO, MRF_NAME, SUBCONTRACTOR, MATERIAL_CODE, START_RETURN_REQ_DATE, END_RETURN_REQ_DATE, STATUS, CLOSED_CODE
		//param :  S_TYPE(SUMMARY), PROJECT_NO, USER_AD, PAGE_NUM, PACKAGE_LIST_NO, ATTRIBUTE10, PACKAGE_NO, DESCRIPTION, TRK_ITEM_NAME, LV3_ITEM_NAME_F, LV3_ITEM_NAME_S, LV4_ITEM_NAME_F, LV4_ITEM_NAME_S
		//param :  S_TYPE(DETAIL), PROJECT_NO, USER_AD, PAGE_NUM, PACKAGE_LIST_NO, PACKAGE_NO, DESCRIPTION, DRAWING_NO, TAG_NO, MATERIAL, MATERIAL_CODE, RSI_NO, MRF_NO, TRK_ITEM_NAME, LV3_ITEM_NAME_F, LV3_ITEM_NAME_S, LV4_ITEM_NAME_F, LV4_ITEM_NAME_S
		//param :  S_TYPE(MRR_PACKAGE_SEARCH), PROJECT_NO, USER_AD, PAGE_NUM, PACKAGE_LIST_NO, ATTRIBUTE10, PACKAGE_NO, DESCRIPTION, TRK_ITEM_NAME, LV3_ITEM_NAME_F, LV3_ITEM_NAME_S, LV4_ITEM_NAME_F, LV4_ITEM_NAME_S
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileSearchList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileOutgoingList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileOutgoingList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileOutgoingList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param :  PROJECT_NO, MATERIAL_CODE(DETAIL ITEM), RSI_LINE_ID(RSI)
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileOutgoingList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/saveMobileOutgoing.do"}, method=RequestMethod.POST)
	public ModelAndView saveMobileOutgoing(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/saveMobileOutgoing.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : USER_AD, RSI_HEADER_ID, RSI_LINE_ID, HANDOVER_QTY, HANDOVER_DATE, MATERIAL_CODE
		ModelAndView mav = new ModelAndView("jsonView");

		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);

		try {
			resultMap = mobileService.saveMobileOutgoing(param);

			if(resultMap.get("status").toString().equals("qtyErr")) {
				txManager.rollback(txStatus);
	    		mav.addObject("result", resultMap);
			}
			else {
				txManager.commit(txStatus);
				mav.addObject("result", resultMap);
			}
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
    		mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/saveMobileOutgoingList.do"}, method=RequestMethod.POST)
	public ModelAndView saveMobileOutgoingList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/saveMobileOutgoingList.do");
		logger.info("PARAM : " + param);
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : [{USER_AD, RSI_HEADER_ID, RSI_LINE_ID, HANDOVER_QTY, HANDOVER_DATE, MATERIAL_CODE}]
		ModelAndView mav = new ModelAndView("jsonView");

		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);

		try {
			resultMap = mobileService.saveMobileOutgoingList(param);

			if(resultMap.get("status").toString().equals("qtyErr")) {
				txManager.rollback(txStatus);
	    		mav.addObject("result", resultMap);
			}
			else {
				txManager.commit(txStatus);
				mav.addObject("result", resultMap);
			}
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
    		mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileReturnList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileReturnList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileReturnList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param :  PROJECT_NO, MATERIAL_CODE(DETAIL ITEM), MRF_LINE_ID(MRF)
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileReturnList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/saveMobileReturn.do"}, method=RequestMethod.POST)
	public ModelAndView saveMobileReturn(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/saveMobileReturn.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : USER_AD, MRF_HEADER_ID, MRF_LINE_ID, RSI_LINE_ID, RETURN_QTY, RETURN_DATE, MATERIAL_CODE, PROJECT_NO
		ModelAndView mav = new ModelAndView("jsonView");

		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);

		try {
			resultMap = mobileService.saveMobileReturn(param);

			if(resultMap.get("status").toString().equals("qtyErr")) {
				txManager.rollback(txStatus);
	    		mav.addObject("result", resultMap);
			}
			else {
				txManager.commit(txStatus);
				mav.addObject("result", resultMap);
			}
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
    		mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileCodeList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileCodeList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileCodeList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param :
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileCodeList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileSubconInfo.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileSubconInfo(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileSubconInfo.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : USER_AD
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileSubconInfo(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	// User After Login시에 기기 FcmToken 저장
	@RequestMapping(value= {"/saveFcmToken.do"}, method=RequestMethod.POST)
	public ModelAndView saveFcmToken(@RequestBody String param, ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/saveFcmToken.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : USER_AD, lang, FCM_TOKEN
		ModelAndView mav = new ModelAndView("jsonView");

		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);

		try {
			resultMap = firebaseService.saveFcmToken(param);
			txManager.commit(txStatus);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
    		mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value = "/getMobileMapViewDetail.do", method = RequestMethod.GET)
	public String getMobileMapViewDetail(@RequestParam String PROJECT_NO, @RequestParam String MATERIAL_CODE, HttpServletRequest request, ModelMap model ) throws Exception {
		logger.info("/mobile/getMobileMapViewDetail.do");
		//param : PROJECT_NO, TRK_ITEM_NAME, MATERIAL_CODE
		model.put("CODE_TYPE", "DETAIL");
		model.put("PROJECT_NO", PROJECT_NO);
		//model.put("TRK_ITEM_NAME", URLDecoder.decode(TRK_ITEM_NAME,"UTF-8"));
		model.put("MATERIAL_CODE", MATERIAL_CODE);
		model.put("PACKAGE_NO", "");
		model.put("idcs_service_url", request.getHeader("idcs_service_url"));


		return "desm/material/plMobileMapView";

	}

	@RequestMapping(value = "/getMobileMapViewSummary.do", method = RequestMethod.GET)
	public String getMobileMapViewSummary(@RequestParam String PROJECT_NO, @RequestParam String PACKAGE_NO, HttpServletRequest request, ModelMap model ) throws Exception {
		logger.info("/mobile/getMobileMapViewSummary.do");
		//param : PROJECT_NO, TRK_ITEM_NAME, PACKAGE_NO
		model.put("CODE_TYPE", "SUMMARY");
		model.put("PROJECT_NO", PROJECT_NO);
		//model.put("TRK_ITEM_NAME", URLDecoder.decode(TRK_ITEM_NAME,"UTF-8"));
		model.put("PACKAGE_NO", PACKAGE_NO);
		model.put("MATERIAL_CODE", "");
		model.put("idcs_service_url", request.getHeader("idcs_service_url"));

		return "desm/material/plMobileMapView";

	}

	@RequestMapping(value={"/getMobileMapViewInfoList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileMapViewInfoList(@RequestParam Map<String, Object> paramMap) throws Exception{
		logger.info("/mobile/getMobileMapViewInfoList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", materialService.getDesmMapSearchInfoList(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getMobileMapViewDataList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileMapViewDataList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileMapViewDataList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : CODE_TYPE(SUMMARY,DETAIL), MAP_DTL_ID, PAGE_NUM
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileMapViewDataList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileMapViewDataCnt.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileMapViewDataCnt(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileMapViewDataCnt.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : MAP_DTL_ID
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileMapViewDataCnt(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value = "/getAppVersion.do", method = RequestMethod.GET)
	public ModelAndView getAppVersion(ModelMap model, HttpServletRequest request) throws Exception {
		logger.info("/mobile/getAppVersion.do");
		ModelAndView mav = new ModelAndView("jsonView");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		try {
			resultMap = mobileService.getAppVersion();
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileDetailItemList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileDetailItemList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileDetailItemList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param :  PROJECT_NO, TRK_ITEM_NAME, PACKAGE_NO, PAGE_NUM
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileDetailItemList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}


	@RequestMapping(value={"/getMobileVinaQrCodeDetailItemList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileVinaQrCodeDetailItemList(@RequestBody String param, ModelMap model, HttpSession session) throws Exception {
		logger.info("/mobile/getMobileVinaQrCodeDetailItemList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param :  QR_CODE, PAGE_NUM, PROJECT_NO
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileVinaQrCodeDetailItemList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileOutgoingReturnList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileOutgoingReturnList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileOutgoingReturnList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param :  PROJECT_NO, PAGE_NUM, START_HANDOVER_DATE, END_HANDOVER_DATE, START_RETURN_DATE, END_RETURN_DATE, USER_AD, SUBCONTRACTOR
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileOutgoingReturnList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/saveMobileDetailItemInfo.do"}, method=RequestMethod.POST)
	public ModelAndView saveMobileDetailItemInfo(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/saveMobileDetailItemInfo.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : USER_AD, PROJECT_NO, TRK_ITEM_NAME, PACKAGE_NO, MATERIAL_CODE, REPORT_SHORT, REPORT_OVER, REPORT_DMG, REPORT_MISSING, REMARKS
		ModelAndView mav = new ModelAndView("jsonView");

		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);

		try {
			resultMap = mobileService.saveMobileDetailItemInfo(param);
			txManager.commit(txStatus);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
    		mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileShippingStatusList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileShippingStatusList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileShippingStatusList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param :  PROJECT_NO, USER_AD, INV_NO
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileShippingStatusList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileMprPoList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileMprPoList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileMprPoList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param :  PO_NO, PO_DESCRIPTION, SUPPLIER_NUMBER
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileMprPoList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileMprProjectList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileMprProjectList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileMprProjectList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param :  PROJECT_CODE, PROJECT_NAME, SUPPLIER_NUMBER
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileMprProjectList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileMprSupplierList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileMprSupplierList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileMprSupplierList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param :  SUPPLIER_NUMBER, SUPPLIER_NAME
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileMprSupplierList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileMprList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileMprList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileMprList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param :  PO_NO, PROJECT_CODE, SUPPLIER_NUMBER, START_MPR_DATE, END_MPR_DATE, RESULT_YN(Y,N), STATUS, MANAGER, SUPPLIER_NAME
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileMprList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileMprSupplierAuth.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileMprSupplierAuth(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileMprSupplierAuth.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param :  USER_AD
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileMprSupplierAuth(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}
	
	@RequestMapping(value={"/getMobileMprDetailList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileMprDetailList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileMprDetailList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param :  MPR_SEQ
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileMprDetailList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
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

	    	//paramMap.put("USER_AD", session.getAttribute("SSOID"));

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
	        		File uploadFile = new File(path);

	        		new FileResizeUtil().imageFileResize( myfile, uploadFile, paramMap );

					logger.info("" + paramMap);
	        		attachService.saveAttachList(paramMap);
		    	}
			}

//	    		if(paramMap.get("RSI_HEADER_ID") != null && !paramMap.get("RSI_HEADER_ID").toString().equals("") && !paramMap.get("RSI_HEADER_ID").toString().equals("null")) {
//	    			materialService.saveDesmRsiFileGrpCd(paramMap); //FILE_GRP_CD
//	    		}
//
//	    		if(paramMap.get("MRF_HEADER_ID") != null && !paramMap.get("MRF_HEADER_ID").toString().equals("") && !paramMap.get("MRF_HEADER_ID").toString().equals("null")) {
//	    			materialService.saveDesmMrfFileGrpCd(paramMap); //FILE_GRP_CD
//	    		}
//
//	    		if(paramMap.get("P_USER_AD") != null && !paramMap.get("P_USER_AD").toString().equals("") && paramMap.get("MPR_SUPPLIER_YN") != null && paramMap.get("MPR_SUPPLIER_YN").toString().equals("Y")) {
//	    			mprService.saveDesmMprSupplierFileGrpCd(paramMap); //FILE_GRP_CD
//	    		}
//
//	    		if("Y".equals(paramMap.get("MATERIAL_MANAGEMENT_YN"))) {
//	    			materialService.saveDesmMaterialManagementFileGrpCd(paramMap); //FILE_GRP_CD
//	    		}
//	    		
//	    		if("Y".equals(paramMap.get("TEST_TABLE_YN"))) {
//	    			testService.saveDesmTestTableFileGrpCd(paramMap); //FILE_GRP_CD
//	    		}

	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			mav.addObject("FILE_GRP_CD", paramMap.get("FILE_GRP_CD"));
			mav.addObject("ATT_ID", paramMap.get("ATT_ID"));

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			e.printStackTrace();
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
	
	//여기서 부터 mobile attach start
	@RequestMapping(value="/saveMobileAttachList.do", method=RequestMethod.POST)
	public ModelAndView saveMobileAttachList(@RequestParam String paramMapAtth , @RequestParam MultipartFile[] txtAttachFile, HttpServletRequest request, HttpSession session) throws Exception{
		logger.info("saveMobileAttachList.do");
		
		LocalDate now = LocalDate.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
		String formatedNow = now.format(formatter);
		//param : USER_AD
		//return param : FILE_GRP_CD,  ATT_ID
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
			Map<String, Object> paramMap = new ObjectMapper().readValue(paramMapAtth, Map.class);
	    	
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
	    			
	    			//String[] dateArr = paramMap.get("TO_DAY").toString().split("/");
	    			String[] dateArr = formatedNow.split("/");
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

	        		attachService.saveAttachList(paramMap);
		    	}
			}


	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
			mav.addObject("FILE_GRP_CD", paramMap.get("FILE_GRP_CD"));
			mav.addObject("ATT_ID", paramMap.get("ATT_ID"));
			
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}
	
	@RequestMapping(value={"/getMobileAttachList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileAttachList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileAttachList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param :  FILE_GRP_CD
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileAttachList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}
	
	@RequestMapping(value="/deleteMobileAttachList.do", method=RequestMethod.POST)
	public ModelAndView deleteAttachList(@RequestBody String paramMapAtth , ModelMap model, HttpSession session) throws Exception{
		logger.info("deleteMobileAttachList.do");
//		Map<String, Object> paramMap = new ObjectMapper().readValue(paramMapAtth, Map.class);
		Map<String, Object> paramMap = new ObjectMapper().readValue(URLDecoder.decode(paramMapAtth, "UTF-8"), Map.class);
		paramMap.put("key", paramMap.get("ATT_ID"));
		
		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {
	    	//paramMap.put("USER_AD", session.getAttribute("SSOID"));
	    	//int cnt = attachService.deleteAttachList(paramMap);
			attachService.deleteAttachList(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");
	    	return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}
	
	@RequestMapping("/getMobileAttachDownload.do")
	public ModelAndView getMobileAttachDownload(@RequestParam String paramMapAtth, ModelAndView mv, HttpSession session) throws Exception{
		//logger.info("getMobileAttachDownload : file code : " + code);
		logger.info("getMobileAttachDownload.do");
		Map<String, Object> paramMap = new ObjectMapper().readValue(paramMapAtth, Map.class);
		
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
	@RequestMapping("/getMobileAttachPreview.do")
	public ModelAndView getMobileAttachPreview(@RequestParam String paramMapAtth, ModelAndView mv, HttpSession session) throws Exception{
		logger.info("getMobileAttachPreview.do");

		Map<String, Object> paramMap = new ObjectMapper().readValue(paramMapAtth, Map.class);

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
	
	@RequestMapping(value={"/getMobileMrrHeaderAttachList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileMrrHeaderAttachList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileMrrHeaderAttachList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param :  FILE_GRP_CD
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileMrrHeaderAttachList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}
	
	//mobile attach end
	


	@RequestMapping(value={"/getMobileMrrList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileMrrList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileMrrList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param :  PO_NO, PROJECT_CODE, SUPPLIER_NUMBER, START_MPR_DATE, END_MPR_DATE, RESULT_YN(Y,N), STATUS, MANAGER, SUPPLIER_NAME
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileMrrList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileMrrHeaderList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileMrrHeaderList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileMrrHeaderList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : USER_AD, RSI_HEADER_ID
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileMrrHeaderList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileMrrLineList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileMrrLineList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileMrrLineList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : RSI_HEADER_ID
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getMobileMrrLineList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/saveMobileMrr.do"}, method=RequestMethod.POST)
	public ModelAndView saveMobileMrr(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/saveMobileMrr.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : TRANS_TYPE (Incomplete : 저장 , Pre-Confirmed:  Confirmed 요청,  Confirmed: Confirmed 완료, Rejected: 반려)
		//param 추가 : CONFIRMED_BY
		//updatelist에 ATTACH_GRP_CD가 있을 경우 같이 줘야 함
		ModelAndView mav = new ModelAndView("jsonView");

		Map<String, Object> paramMailMap = new HashMap<String, Object>();
    	String loc = propertiesService.getString("location");
    	paramMailMap.put("location", loc);
    	paramMailMap.put("LOGIN_URL", propertiesService.getString("mail.login.url.prod"));
    	if(loc.equals("dev")) {
    		paramMailMap.put("LOGIN_URL", propertiesService.getString("mail.login.url.dev"));
    	}
    	paramMailMap.put("host", propertiesService.getString("mail.host"));
    	paramMailMap.put("port", propertiesService.getString("mail.port"));
    	paramMailMap.put("encoding", propertiesService.getString("mail.encoding"));
    	paramMailMap.put("username", propertiesService.getString("mail.username"));
    	paramMailMap.put("password", propertiesService.getString("mail.password"));

		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);

		try {
			resultMap = mobileService.saveMobileMrr(param, paramMailMap);
			txManager.commit(txStatus);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
    		mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/saveMobileMrrReject.do"}, method=RequestMethod.POST)
	public ModelAndView saveMobileMrrReject(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/saveMobileMrrReject.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : RSI_HEADER_ID, USER_AD, STATUS
		ModelAndView mav = new ModelAndView("jsonView");

		Map<String, Object> paramMailMap = new HashMap<String, Object>();
    	String loc = propertiesService.getString("location");
    	paramMailMap.put("location", loc);
    	paramMailMap.put("LOGIN_URL", propertiesService.getString("mail.login.url.prod"));
    	if(loc.equals("dev")) {
    		paramMailMap.put("LOGIN_URL", propertiesService.getString("mail.login.url.dev"));
    	}
    	paramMailMap.put("host", propertiesService.getString("mail.host"));
    	paramMailMap.put("port", propertiesService.getString("mail.port"));
    	paramMailMap.put("encoding", propertiesService.getString("mail.encoding"));
    	paramMailMap.put("username", propertiesService.getString("mail.username"));
    	paramMailMap.put("password", propertiesService.getString("mail.password"));

		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);

		try {
			resultMap = mobileService.saveMobileMrrReject(param, paramMailMap);
			txManager.commit(txStatus);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
    		mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getIdsmOsSummaryMrrMobileList.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmOsSummaryMrrMobileList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getIdsmOsSummaryMrrMobileList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		ModelAndView mav = new ModelAndView("jsonView");

		try {
			resultMap = mobileService.getIdsmOsSummaryMrrMobileList(param);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}
	
	@RequestMapping(value={"/saveMobileMrrDelete.do"}, method=RequestMethod.POST)
	public ModelAndView saveMobileMrrDelete(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/saveMobileMrrDelete.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : USER_AD, PROJECT_NO, TRK_ITEM_NAME, PACKAGE_NO, MATERIAL_CODE, REPORT_SHORT, REPORT_OVER, REPORT_DMG, REPORT_MISSING, REMARKS
		ModelAndView mav = new ModelAndView("jsonView");

		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);

		try {
			resultMap = mobileService.saveMobileMrrDelete(param);
			txManager.commit(txStatus);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
    		mav.addObject("result", resultMap);
			return mav;
		}
	}
	
	@RequestMapping(value={"/saveMobileMrrLineDelete.do"}, method=RequestMethod.POST)
	public ModelAndView saveMobileMrrLineDelete(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/saveMobileMrrDelete.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : USER_AD, PROJECT_NO, TRK_ITEM_NAME, PACKAGE_NO, MATERIAL_CODE, REPORT_SHORT, REPORT_OVER, REPORT_DMG, REPORT_MISSING, REMARKS
		ModelAndView mav = new ModelAndView("jsonView");

		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);

		try {
			resultMap = mobileService.saveMobileMrrLineDelete(param);
			txManager.commit(txStatus);
			mav.addObject("result", resultMap);
			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
    		mav.addObject("result", resultMap);
			return mav;
		}
	}
	
	@RequestMapping(value={"/getMobileUserList.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileUserList(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileUserList.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//param : USER_AD, KEYWORD
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			List<Map<String, Object>> resultList = mobileService.getMobileUserList(param);
			mav.addObject("results", resultList);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}

	@RequestMapping(value={"/getMobileAttachGrpCd.do"}, method=RequestMethod.POST)
	public ModelAndView getMobileAttachGrpCd(@RequestBody String param, ModelMap model, HttpSession session) throws Exception{
		logger.info("/mobile/getMobileAttachGrpCd.do");
		Map<String, Object> resultMap = new HashMap<String, Object>();
		// param : USER_AD, PROJECT_NO
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			String result = mobileService.getMobileAttachGrpCd(param);
			mav.addObject("result", result);
			return mav;

		} catch(Exception e){
    		resultMap.put("status", "error");
    		resultMap.put("data", e.toString());
			mav.addObject("result", resultMap);
			return mav;
		}
	}
}

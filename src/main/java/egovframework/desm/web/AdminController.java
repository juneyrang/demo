package egovframework.desm.web;

import java.io.UnsupportedEncodingException;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.desm.service.AdminService;
import net.sf.json.JSONObject;



@Controller
public class AdminController {
	private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

	@Resource(name = "adminService")
	private AdminService adminService;

	@Resource(name = "txManager")
	protected DataSourceTransactionManager txManager;

	@RequestMapping(value={"/getMenu.do"}, method=RequestMethod.POST)
	public ModelAndView getMenu(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getMenu.do");

		paramMap.put("lang", session.getAttribute("LANG").toString());

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", adminService.getMenu(paramMap));

		return mav;
	}

	@RequestMapping(value="/saveMenu.do", method=RequestMethod.POST)
	public ModelAndView saveMenu(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveMenu.do");

		ModelAndView mav = new ModelAndView("jsonView");

		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	adminService.insertMenu(paramMap);

			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){

			mav.addObject("error", e.getMessage());
			return mav;
		}
	}

	@RequestMapping(value="/saveMenuAuth.do", method=RequestMethod.POST)
	public ModelAndView saveMenuAuth(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveMenuAuth.do");

		ModelAndView mav = new ModelAndView("jsonView");

		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	adminService.insertMenuAuth(paramMap);

			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){

			mav.addObject("error", e.getMessage());
			return mav;
		}
	}

	@RequestMapping(value="/deleteMenu.do", method=RequestMethod.POST)
	public ModelAndView deleteMenu(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpSession session) throws Exception{
		logger.info("deleteMenu.do");


		ModelAndView mav = new ModelAndView("jsonView");

		try {
			paramMap.put("USER_AD", session.getAttribute("SSOID"));
			adminService.deleteMenu(paramMap);

			mav.addObject("success", true);
			return mav;
		} catch(Exception e){

			mav.addObject("error", e.getMessage());
			return mav;
		}
	}

	@RequestMapping(value="/deleteMenuAuth.do", method=RequestMethod.POST)
	public ModelAndView deleteMenuAuth(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpSession session) throws Exception{
		logger.info("deleteMenuAuth.do");


		ModelAndView mav = new ModelAndView("jsonView");

		try {
			paramMap.put("USER_AD", session.getAttribute("SSOID"));
			adminService.deleteMenuAuth(paramMap);

			mav.addObject("success", true);
			return mav;
		} catch(Exception e){

			mav.addObject("error", e.getMessage());
			return mav;
		}
	}

	@RequestMapping(value="/savePermission.do", method=RequestMethod.POST)
	public ModelAndView savePermission(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("savePermission.do");

		ModelAndView mav = new ModelAndView("jsonView");

		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	adminService.insertPermission(paramMap);

			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){

			mav.addObject("error", e.getMessage());
			return mav;
		}
	}

	@RequestMapping(value={"/getPermission.do"}, method=RequestMethod.POST)
	public ModelAndView getPermission(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getPermission.do");

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", adminService.getPermission(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getMenuAuthList.do"}, method=RequestMethod.POST)
	public ModelAndView getMenuAuthList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getMenuAuthList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", adminService.getMenuAuthList(paramMap));

		return mav;
	}

	@RequestMapping(value="/deletePermission.do", method=RequestMethod.POST)
	public ModelAndView deletePermission(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpSession session) throws Exception{
		logger.info("deletePermission.do");


		ModelAndView mav = new ModelAndView("jsonView");

		try {
			paramMap.put("USER_AD", session.getAttribute("SSOID"));
			adminService.deletePermission(paramMap);

			mav.addObject("success", true);
			return mav;
		} catch(Exception e){

			mav.addObject("error", e.getMessage());
			return mav;
		}
	}

	@RequestMapping(value="/savePermissionMenu.do", method=RequestMethod.POST)
	public ModelAndView savePermissionMenu(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("savePermissionMenu.do");

		ModelAndView mav = new ModelAndView("jsonView");

		try {

	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	adminService.insertPermissionMenu(paramMap);

			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){

			mav.addObject("error", e.getMessage());
			return mav;
		}
	}

	@RequestMapping(value="/savePermissionMenuAuth.do", method=RequestMethod.POST)
	public ModelAndView savePermissionMenuAuth(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("savePermissionMenuAuth.do");

		ModelAndView mav = new ModelAndView("jsonView");

		try {

	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	adminService.insertPermissionMenuAuth(paramMap);

			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){

			mav.addObject("error", e.getMessage());
			return mav;
		}
	}

	@RequestMapping(value={"/getPermissionMenu.do"}, method=RequestMethod.POST)
	public ModelAndView getPermissionMenu(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getPermissionMenu.do");

		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("lang", session.getAttribute("LANG").toString());
		mav.addObject("results", adminService.getPermissionMenu(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getMenuAuthUseList.do"}, method=RequestMethod.POST)
	public ModelAndView getMenuAuthUseList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getMenuAuthUseList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("lang", session.getAttribute("LANG").toString());
		mav.addObject("results", adminService.getMenuAuthUseList(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getUser.do"}, method=RequestMethod.POST)
	public ModelAndView getUser(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getUser.do");

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", adminService.getUser(paramMap));

		return mav;
	}

	@RequestMapping(value="/saveUser.do", method=RequestMethod.POST)
	public ModelAndView saveUser(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveUser.do");

		ModelAndView mav = new ModelAndView("jsonView");

		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	adminService.insertUser(paramMap);

			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){

			mav.addObject("error", e.getMessage());
			return mav;
		}
	}


	@RequestMapping(value="/deleteUser.do", method=RequestMethod.POST)
	public ModelAndView deleteUser(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpSession session) throws Exception{
		logger.info("deleteUser.do");


		ModelAndView mav = new ModelAndView("jsonView");

		try {
			paramMap.put("USER_AD", session.getAttribute("SSOID"));
			adminService.deleteUser(paramMap);

			mav.addObject("success", true);
			return mav;
		} catch(Exception e){

			mav.addObject("error", e.getMessage());
			return mav;
		}
	}

	@RequestMapping(value={"/getUserPermission.do"}, method=RequestMethod.POST)
	public ModelAndView getUserPermission(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getUserPermission.do");

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", adminService.getUserPermission(paramMap));

		return mav;
	}

	@RequestMapping(value="/saveUserPermission.do", method=RequestMethod.POST)
	public ModelAndView saveUserPermission(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveUserPermission.do");

		ModelAndView mav = new ModelAndView("jsonView");

		try {

	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	adminService.insertUserPermission(paramMap);

			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){

			mav.addObject("error", e.getMessage());
			return mav;
		}
	}

	@RequestMapping(value={"/getCode.do"}, method=RequestMethod.POST)
	public ModelAndView getCode(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getCode.do");

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", adminService.getCode(paramMap));

		return mav;
	}

	@RequestMapping(value="/saveCode.do", method=RequestMethod.POST)
	public ModelAndView saveCode(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveCode.do");

		ModelAndView mav = new ModelAndView("jsonView");

		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));


			//기본데이터 저장
	    	adminService.insertCode(paramMap);

			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){

			mav.addObject("error", e.getMessage());
			return mav;
		}
	}

	@RequestMapping(value={"/getCodeDetail.do"}, method=RequestMethod.POST)
	public ModelAndView getCodeDetail(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getCodeDetail.do");

		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("lang", session.getAttribute("LANG").toString());

		mav.addObject("results", adminService.getCodeDetail(paramMap));

		return mav;
	}

	@RequestMapping(value="/saveCodeDetail.do", method=RequestMethod.POST)
	public ModelAndView saveCodeDetail(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveCodeDetail.do");

		ModelAndView mav = new ModelAndView("jsonView");

		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
	    	System.out.println("!!!!!" + paramMap);
			//기본데이터 저장
	    	adminService.insertCodeDetail(paramMap);

			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){

			mav.addObject("error", e.getMessage());
			return mav;
		}
	}

	@RequestMapping(value={"/getTest.do"}, method=RequestMethod.POST)
	public ModelAndView getTest(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getTest.do");

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", adminService.getTest(paramMap));

		return mav;
	}

	@RequestMapping(value="/saveDesmPwdChange.do", method=RequestMethod.POST)
	public ModelAndView saveDesmPwdChange(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveDesmPwdChange.do");

		ModelAndView mav = new ModelAndView("jsonView");

		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	Map<String, Object> resultMap = adminService.saveDesmPwdChange(paramMap);

	    	if(resultMap.get("error") != null && !resultMap.get("error").toString().equals("")) {
				mav.addObject("error", resultMap.get("error"));
				return mav;
	    	}
	    	session.setAttribute("PWS_EDIT_YN"		, "Y");
			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getDesmDefaultCountry.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmDefaultCountry(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getDesmDefaultCountry.do");

		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", adminService.getDesmDefaultCountry(paramMap));

		return mav;
	}


	@RequestMapping(value={"/getDesmDefaultProject.do"}, method=RequestMethod.POST)
	public ModelAndView getDesmDefaultProject(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getDesmDefaultProject.do");

		ModelAndView mav = new ModelAndView("jsonView");
		paramMap.put("USER_AD", session.getAttribute("SSOID"));
		mav.addObject("results", adminService.getDesmDefaultProject(paramMap));

		return mav;
	}



	@RequestMapping(value="/saveDesmDefaultProjectSave.do", method=RequestMethod.POST)
	public ModelAndView saveDesmDefaultProjectSave(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveDesmDefaultProjectSave.do");

		ModelAndView mav = new ModelAndView("jsonView");

		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));


			//기본데이터 저장
	    	adminService.saveDesmDefaultProjectSave(paramMap);

			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/saveDesmDefaultCountrySave.do", method=RequestMethod.POST)
	public ModelAndView saveDesmDefaultCountrySave(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("saveDesmDefaultCountrySave.do");

		ModelAndView mav = new ModelAndView("jsonView");

		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));


			//기본데이터 저장
	    	adminService.saveDesmDefaultCountrySave(paramMap);

			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/initDesmPwd.do", method=RequestMethod.POST)
	public ModelAndView initDesmPwd(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("initDesmPwd.do");

		ModelAndView mav = new ModelAndView("jsonView");

		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	adminService.initDesmPwd(paramMap);

			mav.addObject("success", "OK");
			return mav;

		} catch(Exception e){
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value="/sendFcmRole.do", method=RequestMethod.POST)
	public ModelAndView sendFcmRole(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{

		logger.info("sendFcmRole.do");

		ModelAndView mav = new ModelAndView("jsonView");
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);
		try {

	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

	    	adminService.sendFcmRole(paramMap);
	    	txManager.commit(txStatus);
			mav.addObject("success", "OK");

			return mav;

		} catch(Exception e){
			txManager.rollback(txStatus);
			mav.addObject("error", e.toString());
			return mav;
		}
	}

	@RequestMapping(value={"/getMail.do"}, method=RequestMethod.POST)
	public ModelAndView getMail(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getMail.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", adminService.getMail(paramMap));
		return mav;
	}

	@RequestMapping(value={"/getProjectSupplyScope.do"}, method=RequestMethod.POST)
	public ModelAndView getProjectSupplyScope(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getMail.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", adminService.getProjectSupplyScope(paramMap));
		return mav;
	}

	@RequestMapping(value="/saveMail.do", method=RequestMethod.POST)
	public ModelAndView saveMail(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("saveCode.do");
		ModelAndView mav = new ModelAndView("jsonView");
		try {
			Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class) ;
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
			//기본데이터 저장
	    	int rtn = adminService.insertMail(paramMap);
	    	if(rtn == -1){
	    		mav.addObject("error", "-1");
	    	}else{
	    		mav.addObject("success", "OK");
	    	}
			return mav;
		} catch(Exception e){
			mav.addObject("error", e.getMessage());
			return mav;
		}
	}

	@RequestMapping(value="/mailSend.do", method=RequestMethod.POST)
	public ModelAndView mailSend(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("mailSend.do");
		ModelAndView mav = new ModelAndView("jsonView");
		try {
			paramMap.put("USER_AD", session.getAttribute("SSOID"));
			mav.addObject("results", adminService.mailSend(paramMap));
			mav.addObject("success", "OK");
			return mav;
		} catch(Exception e){
			e.printStackTrace();
			mav.addObject("error", e.getMessage());
			return mav;
		}
	}

	@RequestMapping(value="/mailSendUser.do", method=RequestMethod.POST)
	public ModelAndView mailSendUser(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("mailSendUser.do");
		ModelAndView mav = new ModelAndView("jsonView");
		try {
			paramMap.put("USER_AD", session.getAttribute("SSOID"));
			mav.addObject("results", adminService.mailSendUser(paramMap));
			mav.addObject("success", "OK");
			return mav;
		} catch(Exception e){
			e.printStackTrace();
			mav.addObject("error", e.getMessage());
			return mav;
		}
	}

	@RequestMapping(value="/deleteMail.do", method=RequestMethod.POST)
	public ModelAndView deleteMail(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("deleteMail.do");
		ModelAndView mav = new ModelAndView("jsonView");
		try {
			paramMap.put("USER_AD", session.getAttribute("SSOID"));
			mav.addObject("results", adminService.deleteMail(paramMap));
			mav.addObject("success", "OK");
			return mav;
		} catch(Exception e){
			mav.addObject("error", e.getMessage());
			return mav;
		}
	}

	@RequestMapping(value={"/getMaterialSetup.do"}, method=RequestMethod.POST)
	public ModelAndView getMaterialSetup(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getMaterialSetup.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", adminService.getMaterialSetup(paramMap));
		return mav;
	}
	
	@RequestMapping(value="/saveMaterialSetup.do", method=RequestMethod.POST)
	public ModelAndView saveMaterialSetup(@RequestBody String param , ModelMap model, HttpSession session) throws Exception{
		logger.info("saveMaterialSetup.do");
		ModelAndView mav = new ModelAndView("jsonView");
		try {
			Map<String, Object> paramMap = new ObjectMapper().readValue(param, Map.class) ;
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));
			//기본데이터 저장
	    	int rtn = adminService.saveMaterialSetup(paramMap);
	    	if(rtn == -1){
	    		mav.addObject("error", "-1");
	    	}else{
	    		mav.addObject("success", "OK");
	    	}
			return mav;
		} catch(Exception e){
			mav.addObject("error", e.getMessage());
			return mav;
		}
	}
	
	@RequestMapping(value="/deleteMaterialSetup.do", method=RequestMethod.POST)
	public ModelAndView deleteMaterialSetup(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("deleteMaterialSetup.do");
		ModelAndView mav = new ModelAndView("jsonView");
		try {
			paramMap.put("USER_AD", session.getAttribute("SSOID"));
			mav.addObject("results", adminService.deleteMaterialSetup(paramMap));
			mav.addObject("success", "OK");
			return mav;
		} catch(Exception e){
			mav.addObject("error", e.getMessage());
			return mav;
		}
	}
}

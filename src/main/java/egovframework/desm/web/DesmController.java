package egovframework.desm.web;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;

import javax.annotation.Resource;
import javax.net.ssl.SSLContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.binary.Base64;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.TrustStrategy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.support.RequestContextUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.desm.cmmn.UserPasword;
import egovframework.desm.cmmn.idcs.IdcsService;
import egovframework.desm.service.AdminService;
import egovframework.desm.service.DesmService;
import egovframework.desm.service.DesmVO;
import egovframework.desm.service.IdsmFileService;
import egovframework.desm.service.MobileService;
import egovframework.desm.service.MprService;
import egovframework.desm.service.TransService;
import egovframework.rte.fdl.property.EgovPropertyService;
import net.sf.json.JSONObject;



@Controller
public class DesmController {
	private static final Logger logger = LoggerFactory.getLogger(DesmController.class);

	@Resource(name = "desmService")
	private DesmService desmService;

	@Resource(name = "adminService")
	private AdminService adminService;

	@Resource(name = "transService")
	private TransService transService;

	@Resource(name = "idsmFileService")
	private IdsmFileService idsmFileService;

	@Resource(name="propertiesService")
	protected EgovPropertyService propertiesService;

	@Resource(name="mobileService")
	private MobileService mobileService;

	@Resource(name = "mprService")
	private MprService mprService;

	@Resource(name = "txManager")
	protected DataSourceTransactionManager txManager;

	@Autowired
	IdcsService idcsService;

	private String logoutUrl = "https://81BBCFEF17F642AB93973D87DA8C3C58.mobile.ocp.oraclecloud.com:443/mobile/custom";

	@RequestMapping(value = "/logout.do", method = RequestMethod.GET)
	public String logout(HttpSession session, HttpServletRequest request) throws Exception {

//		try {
//			if(!"".equals(session.getAttribute("LOGIN_TOKEN"))){
//				// restTemplate Setup
//				TrustStrategy acceptingTrustStrategy = (X509Certificate[] chain, String authType) -> true;
//
//		        SSLContext sslContext = org.apache.http.ssl.SSLContexts.custom()
//								        	.loadTrustMaterial(null, acceptingTrustStrategy)
//								        	.build();
//
//		        SSLConnectionSocketFactory csf = new SSLConnectionSocketFactory(sslContext, new NoopHostnameVerifier());
//
//		        CloseableHttpClient httpClient = HttpClients.custom()
//											    	.setSSLSocketFactory(csf)
//											    	.build();
//
//		        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
//
//		        factory.setHttpClient(httpClient);
//				factory.setReadTimeout(300000); // 300 * 1000, 300sec, 5min
//				factory.setConnectTimeout(5000); // 5 * 1000, 5sec
//				RestTemplate restTemplate = new RestTemplate(factory);
//
//				JSONObject json = new JSONObject();
//				HttpHeaders headers = new HttpHeaders();
//				headers.set("Authorization", "Bearer " + session.getAttribute("LOGIN_TOKEN"));
//				headers.set("Content-Type", "application/json");
//				HttpEntity<JSONObject> reqEntity = new HttpEntity<>(json,headers);
//
//				restTemplate.exchange(logoutUrl+"/mcsCommon_accessTokenBeforeLogin/login/mDESM/"+session.getAttribute("SSOID")+"?accessTokenOld="+session.getAttribute("LOGIN_TOKEN"), HttpMethod.DELETE, reqEntity, JSONObject.class);
////				restTemplate.delete(logoutUrl+"/mcsCommon_accessTokenBeforeLogin/login/mDESM/"+session.getAttribute("SSOID")+"?accessTokenOld="+session.getAttribute("LOGIN_TOKEN"));
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}


		session.setAttribute("SSOID"		, "");
		session.setAttribute("SSONAME"		, "");
		session.setAttribute("LANG"	, "");
		session.setAttribute("NAME_TXT"	, "");
		session.setAttribute("LOG"		, "");
		session.setAttribute("GRIDLANG"		, "");
		session.setAttribute("ROLE_SEQ"		, "");
		session.setAttribute("ROLE_NAME"		, "");
		session.setAttribute("PWS_EDIT_YN"		, "");
		session.setAttribute("SUBCON_YN"		, "");
		session.setAttribute("DEPT_NAME"		, "");
		session.setAttribute("LOGIN_TOKEN"		, "");

		session.setAttribute("TRANS_USR_ID"		, "");
		session.setAttribute("TRANS_USER_NAME"		, "");
		session.setAttribute("TRANS_USR_CLS"		, "");
		session.setAttribute("TRANS_EMP_NO"		, "");
		session.setAttribute("TRANS_DEPT_CD"		, "");
		session.setAttribute("TRANS_DEPT_NM"		, "");
		session.setAttribute("TRANS_VD_CD"		, "");
		session.setAttribute("TRANS_EMAIL"		, "");
		session.setAttribute("TRANS_PRJ_ROLE_CD"		, "");
		session.setAttribute("TRANS_ROLE_CD"		, "");
		session.setAttribute("TRANS_BG_CODE"		, "");
		session.setAttribute("TRANS_BG_NAME"		, "");

		return "desm/logout";
	}

	@RequestMapping(value = "/login_admin.do", method = RequestMethod.GET)
	public String login_admin(HttpSession session, HttpServletRequest request, HttpServletResponse response ) throws Exception {

		// dns 추가되는 항목 전부 처리용도
		String requestDns = request.getRequestURL().toString().replace(request.getRequestURI(), "");
		//System.out.println("[Info][DesmController][login]requestDns : " + requestDns);
		requestDns = requestDns.substring(0, requestDns.length() - 5);

		String add = (requestDns.equals(propertiesService.getString("prod.defaultdns").substring(0, propertiesService.getString("prod.defaultdns").length() - 5)))
				? propertiesService.getString("prod.defaultdns") + "/login.do"
				: propertiesService.getString("prod.customdns") + "/login.do";
		String ssoPort = propertiesService.getString("sso.port");

		if(session.getAttribute("SSOID") != null && !session.getAttribute("SSOID").toString().trim().equals("")) {
			if(request.getServerPort() == Integer.parseInt(ssoPort)) {
				response.sendRedirect(add);
			}

			return "forward:/main.do?lang=ko";
		}
		else {

			session.setAttribute("SSOID"		, "");
			session.setAttribute("SSONAME"		, "");
			session.setAttribute("LANG"	, "");
			session.setAttribute("NAME_TXT"	, "");
			session.setAttribute("LOG"		, "");
			session.setAttribute("GRIDLANG"		, "");
			session.setAttribute("ROLE_SEQ"		, "");
			session.setAttribute("ROLE_NAME"		, "");
			session.setAttribute("PWS_EDIT_YN"		, "");
			session.setAttribute("SUBCON_YN"		, "");
			session.setAttribute("DEPT_NAME"		, "");

			session.setAttribute("TRANS_USR_ID"		, "");
			session.setAttribute("TRANS_USER_NAME"		, "");
			session.setAttribute("TRANS_USR_CLS"		, "");
			session.setAttribute("TRANS_EMP_NO"		, "");
			session.setAttribute("TRANS_DEPT_CD"		, "");
			session.setAttribute("TRANS_DEPT_NM"		, "");
			session.setAttribute("TRANS_VD_CD"		, "");
			session.setAttribute("TRANS_EMAIL"		, "");
			session.setAttribute("TRANS_PRJ_ROLE_CD"		, "");
			session.setAttribute("TRANS_ROLE_CD"		, "");
			session.setAttribute("TRANS_BG_CODE"		, "");
			session.setAttribute("TRANS_BG_NAME"		, "");


			if(request.getHeader("SSOID") != null) {

				Map<String, Object> paramMap = new HashMap<String, Object>();
				paramMap.put("USER_ID", request.getHeader("SSOID").toString().trim().toUpperCase());
				paramMap.put("IP", this.getIp(request));
				DesmVO chklogin = desmService.chkLogin(paramMap);

				if(chklogin != null) {
					session.setAttribute("SSOID"		, chklogin.getUSER_AD());
					session.setAttribute("SSONAME"		, chklogin.getUSER_NAME());
					session.setAttribute("LOG"		    , chklogin.getLOG_DATE());
					session.setAttribute("ROLE_SEQ"		, chklogin.getROLE_SEQ());
					session.setAttribute("ROLE_NAME"	, chklogin.getROLE_NAME());
					session.setAttribute("PWS_EDIT_YN"		, chklogin.getPWS_EDIT_YN());
					session.setAttribute("SUBCON_YN"		, chklogin.getSUBCON_YN());
					session.setAttribute("DEPT_NAME"		, chklogin.getDEPT_NAME());

					paramMap.put("USER_ID", chklogin.getUSER_AD());



					List<Map<String, Object>> userInfoList = transService.chkUser(paramMap);

					if(userInfoList.size() > 0) {
						session.setAttribute("TRANS_USR_ID"		, userInfoList.get(0).get("USR_ID"));
						session.setAttribute("TRANS_USER_NAME"		, userInfoList.get(0).get("USER_NAME"));
						session.setAttribute("TRANS_USR_CLS"		, userInfoList.get(0).get("USR_CLS"));
						session.setAttribute("TRANS_EMP_NO"		, userInfoList.get(0).get("EMP_NO"));
						session.setAttribute("TRANS_DEPT_CD"		, userInfoList.get(0).get("DEPT_CD"));
						session.setAttribute("TRANS_DEPT_NM"		, userInfoList.get(0).get("DEPT_NM"));
						session.setAttribute("TRANS_VD_CD"		, userInfoList.get(0).get("VD_CD"));
						session.setAttribute("TRANS_EMAIL"		, userInfoList.get(0).get("EMAIL"));
						session.setAttribute("TRANS_PRJ_ROLE_CD"		, userInfoList.get(0).get("PRJ_ROLE_CD"));
						session.setAttribute("TRANS_ROLE_CD"		, userInfoList.get(0).get("ROLE_CD"));
						session.setAttribute("TRANS_BG_CODE"		, userInfoList.get(0).get("BG_CODE"));
						session.setAttribute("TRANS_BG_NAME"		, userInfoList.get(0).get("BG_NAME"));
					}

					desmService.insertUserLog(paramMap);
					if(request.getServerPort() == Integer.parseInt(ssoPort)) {
						response.sendRedirect(add);
					}

					return "forward:/main.do?lang=ko";
				}
			}
		}

		return "desm/login_admin";

	}

	@RequestMapping(value = "/login.do", method = RequestMethod.GET)
	public String login_idcs(HttpSession session, HttpServletRequest request, HttpServletResponse response ) throws Exception {

		// dns 추가되는 항목 전부 처리용도
		String requestDns = request.getRequestURL().toString().replace(request.getRequestURI(), "");
		//System.out.println("[Info][DesmController][login]requestDns : " + requestDns);
		requestDns = requestDns.substring(0, requestDns.length() - 5);

		String add = (requestDns.equals(propertiesService.getString("prod.defaultdns").substring(0, propertiesService.getString("prod.defaultdns").length() - 5)))
				? propertiesService.getString("prod.defaultdns") + "/login.do"
				: propertiesService.getString("prod.customdns") + "/login.do";
		String ssoPort = propertiesService.getString("sso.port");

		if(session.getAttribute("SSOID") != null && !session.getAttribute("SSOID").toString().trim().equals("")) {
			if(request.getServerPort() == Integer.parseInt(ssoPort)) {
				response.sendRedirect(add);
			}

			return "forward:/main.do?lang=ko";
		}
		else {

			session.setAttribute("SSOID"		, "");
			session.setAttribute("SSONAME"		, "");
			session.setAttribute("LANG"	, "");
			session.setAttribute("NAME_TXT"	, "");
			session.setAttribute("LOG"		, "");
			session.setAttribute("GRIDLANG"		, "");
			session.setAttribute("ROLE_SEQ"		, "");
			session.setAttribute("ROLE_NAME"		, "");
			session.setAttribute("PWS_EDIT_YN"		, "");
			session.setAttribute("SUBCON_YN"		, "");
			session.setAttribute("DEPT_NAME"		, "");

			session.setAttribute("TRANS_USR_ID"		, "");
			session.setAttribute("TRANS_USER_NAME"		, "");
			session.setAttribute("TRANS_USR_CLS"		, "");
			session.setAttribute("TRANS_EMP_NO"		, "");
			session.setAttribute("TRANS_DEPT_CD"		, "");
			session.setAttribute("TRANS_DEPT_NM"		, "");
			session.setAttribute("TRANS_VD_CD"		, "");
			session.setAttribute("TRANS_EMAIL"		, "");
			session.setAttribute("TRANS_PRJ_ROLE_CD"		, "");
			session.setAttribute("TRANS_ROLE_CD"		, "");
			session.setAttribute("TRANS_BG_CODE"		, "");
			session.setAttribute("TRANS_BG_NAME"		, "");


			if(request.getHeader("SSOID") != null) {

				Map<String, Object> paramMap = new HashMap<String, Object>();
				paramMap.put("USER_ID", request.getHeader("SSOID").toString().trim().toUpperCase());
				paramMap.put("IP", this.getIp(request));
				DesmVO chklogin = desmService.chkLogin(paramMap);

				if(chklogin != null) {
					session.setAttribute("SSOID"		, chklogin.getUSER_AD());
					session.setAttribute("SSONAME"		, chklogin.getUSER_NAME());
					session.setAttribute("LOG"		    , chklogin.getLOG_DATE());
					session.setAttribute("ROLE_SEQ"		, chklogin.getROLE_SEQ());
					session.setAttribute("ROLE_NAME"	, chklogin.getROLE_NAME());
					session.setAttribute("PWS_EDIT_YN"		, chklogin.getPWS_EDIT_YN());
					session.setAttribute("SUBCON_YN"		, chklogin.getSUBCON_YN());
					session.setAttribute("DEPT_NAME"		, chklogin.getDEPT_NAME());

					paramMap.put("USER_ID", chklogin.getUSER_AD());



					List<Map<String, Object>> userInfoList = transService.chkUser(paramMap);

					if(userInfoList.size() > 0) {
						session.setAttribute("TRANS_USR_ID"		, userInfoList.get(0).get("USR_ID"));
						session.setAttribute("TRANS_USER_NAME"		, userInfoList.get(0).get("USER_NAME"));
						session.setAttribute("TRANS_USR_CLS"		, userInfoList.get(0).get("USR_CLS"));
						session.setAttribute("TRANS_EMP_NO"		, userInfoList.get(0).get("EMP_NO"));
						session.setAttribute("TRANS_DEPT_CD"		, userInfoList.get(0).get("DEPT_CD"));
						session.setAttribute("TRANS_DEPT_NM"		, userInfoList.get(0).get("DEPT_NM"));
						session.setAttribute("TRANS_VD_CD"		, userInfoList.get(0).get("VD_CD"));
						session.setAttribute("TRANS_EMAIL"		, userInfoList.get(0).get("EMAIL"));
						session.setAttribute("TRANS_PRJ_ROLE_CD"		, userInfoList.get(0).get("PRJ_ROLE_CD"));
						session.setAttribute("TRANS_ROLE_CD"		, userInfoList.get(0).get("ROLE_CD"));
						session.setAttribute("TRANS_BG_CODE"		, userInfoList.get(0).get("BG_CODE"));
						session.setAttribute("TRANS_BG_NAME"		, userInfoList.get(0).get("BG_NAME"));
					}

					desmService.insertUserLog(paramMap);
					if(request.getServerPort() == Integer.parseInt(ssoPort)) {
						response.sendRedirect(add);
					}

					return "forward:/main.do?lang=ko";
				}
			}
		}

		return "desm/login";

	}

	public String getIp(HttpServletRequest request) {

		String ip = null;

	    ip = request.getHeader("X-Forwarded-For");

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-RealIP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("REMOTE_ADDR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }

        return ip;
	}

	@RequestMapping(value = "/chkLogin_admin.do", method = RequestMethod.POST)
	public ModelAndView chkLogin_admin(@RequestParam Map<String, Object> paramMap, HttpSession session, ModelMap model, HttpServletRequest request) throws Exception {

		ModelAndView mav = new ModelAndView("jsonView");

		session.setAttribute("SSOID"		, "");
		session.setAttribute("SSONAME"		, "");
		session.setAttribute("LANG"	, "");
		session.setAttribute("NAME_TXT"	, "");
		session.setAttribute("LOG"		, "");
		session.setAttribute("GRIDLANG"		, "");
		session.setAttribute("ROLE_SEQ"		, "");
		session.setAttribute("ROLE_NAME"		, "");
		session.setAttribute("PWS_EDIT_YN"		, "");
		session.setAttribute("SUBCON_YN"		, "");
		session.setAttribute("DEPT_NAME"		, "");

		session.setAttribute("TRANS_USR_ID"		, "");
		session.setAttribute("TRANS_USER_NAME"		, "");
		session.setAttribute("TRANS_USR_CLS"		, "");
		session.setAttribute("TRANS_EMP_NO"		, "");
		session.setAttribute("TRANS_DEPT_CD"		, "");
		session.setAttribute("TRANS_DEPT_NM"		, "");
		session.setAttribute("TRANS_VD_CD"		, "");
		session.setAttribute("TRANS_EMAIL"		, "");
		session.setAttribute("TRANS_PRJ_ROLE_CD"		, "");
		session.setAttribute("TRANS_ROLE_CD"		, "");
		session.setAttribute("TRANS_BG_CODE"		, "");
		session.setAttribute("TRANS_BG_NAME"		, "");

		paramMap.put("IP", this.getIp(request));
		DesmVO chklogin = desmService.chkLogin(paramMap);
		paramMap.put("P_USER_AD", chklogin.getUSER_AD());

		List<Map<String, Object>> userInfoPwList = adminService.getUserCheckList(paramMap);

		if(userInfoPwList.size() > 0) {

    		UserPasword up = new UserPasword();
    		String user_pw = paramMap.get("PASSWORD").toString();
    		String user_pw_data = userInfoPwList.get(0).get("USER_PW") == null ? "" :  userInfoPwList.get(0).get("USER_PW").toString();
    		String SALT = userInfoPwList.get(0).get("USER_PW_SALT") == null ? "" : userInfoPwList.get(0).get("USER_PW_SALT").toString();
    		String pw = up.setHashing(up.setHashing(user_pw, SALT), SALT);

    		if(pw.equals(user_pw_data)) {

    			mav.addObject("results", chklogin);

    			session.setAttribute("SSOID",   chklogin.getUSER_AD());
    			session.setAttribute("SSONAME", chklogin.getUSER_NAME());
    			session.setAttribute("LOG"		    , chklogin.getLOG_DATE());
    			session.setAttribute("ROLE_SEQ"		, chklogin.getROLE_SEQ());
    			session.setAttribute("ROLE_NAME"		,chklogin.getROLE_NAME());
				session.setAttribute("PWS_EDIT_YN"		, chklogin.getPWS_EDIT_YN());
				session.setAttribute("SUBCON_YN"		, chklogin.getSUBCON_YN());
				session.setAttribute("DEPT_NAME"		, chklogin.getDEPT_NAME());

    			paramMap.put("USER_ID", chklogin.getUSER_AD());

    			List<Map<String, Object>> userInfoList = transService.chkUser(paramMap);

    			if(userInfoList.size() > 0) {
    				session.setAttribute("TRANS_USR_ID"		, userInfoList.get(0).get("USR_ID"));
    				session.setAttribute("TRANS_USER_NAME"		, userInfoList.get(0).get("USER_NAME"));
    				session.setAttribute("TRANS_USR_CLS"		, userInfoList.get(0).get("USR_CLS"));
    				session.setAttribute("TRANS_EMP_NO"		, userInfoList.get(0).get("EMP_NO"));
    				session.setAttribute("TRANS_DEPT_CD"		, userInfoList.get(0).get("DEPT_CD"));
    				session.setAttribute("TRANS_DEPT_NM"		, userInfoList.get(0).get("DEPT_NM"));
    				session.setAttribute("TRANS_VD_CD"		, userInfoList.get(0).get("VD_CD"));
    				session.setAttribute("TRANS_EMAIL"		, userInfoList.get(0).get("EMAIL"));
    				session.setAttribute("TRANS_PRJ_ROLE_CD"		, userInfoList.get(0).get("PRJ_ROLE_CD"));
    				session.setAttribute("TRANS_ROLE_CD"		, userInfoList.get(0).get("ROLE_CD"));
    				session.setAttribute("TRANS_BG_CODE"		, userInfoList.get(0).get("BG_CODE"));
    				session.setAttribute("TRANS_BG_NAME"		, userInfoList.get(0).get("BG_NAME"));
    			}


    			desmService.insertUserLog(paramMap);
    		}
    		else {
    			mav.addObject("results", null);
    		}

		}
		else {
			mav.addObject("results", null);
		}

		return mav;
	}

	@RequestMapping(value = "/main.do")
	public String main(@RequestParam("lang") String language, HttpServletRequest request, HttpServletResponse response, HttpSession session, ModelMap model) throws Exception {

		Locale locale = new Locale(language);
		LocaleResolver localeResolver = RequestContextUtils.getLocaleResolver(request);
		localeResolver.setLocale(request, response, locale);

		session.setAttribute("LANG", language);

		 if(language.equals("en")){
			 session.setAttribute("GRIDLANG", "en-US");
			 session.setAttribute("NAME_TXT", session.getAttribute("SSOID"));

			 Map<String, Object> paramMap = new HashMap<String, Object>();
			 paramMap.put("USER_AD", session.getAttribute("SSOID"));

			 List<Map<String, Object>> checkList = mprService.getSupplierAuth(paramMap);
			 if(checkList.get(0).get("SUPPLIER_YN").toString().equals("Y")) {
				 session.setAttribute("NAME_TXT", session.getAttribute("SSONAME"));
			 }

		 }
		 else if(language.equals("ko")){
			 session.setAttribute("GRIDLANG", "ko-KR");
			 session.setAttribute("NAME_TXT", session.getAttribute("SSONAME"));
		 }

		String gridCode = propertiesService.getString("grid.code");
		model.put("gridCode", gridCode);
		model.put("firstYn", "Y");

		return "desm/home";
	}

	@RequestMapping(value = "/error.do")
	public String error() throws Exception {

		return "desm/error";
	}

	@RequestMapping(value={"/getLeftMenu.do"}, method=RequestMethod.POST)
	public ModelAndView getLeftMenu(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getLeftMenu.do");

		paramMap.put("lang", session.getAttribute("LANG").toString());
		paramMap.put("USER_AD", session.getAttribute("SSOID").toString());

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", desmService.getLeftMenu(paramMap));

		return mav;
	}


	@RequestMapping(value = "/page_crt.do")
	public String move(@RequestParam("MENU_SEQ") String MENU_SEQ, HttpServletRequest request, HttpServletResponse response, HttpSession session, ModelMap model) throws Exception {

		String menu = "desm/error";

		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("MENU_SEQ", MENU_SEQ);
		paramMap.put("lang", session.getAttribute("LANG").toString());
		paramMap.put("USER_AD", session.getAttribute("SSOID").toString());

		List<Map<String, Object>> list = desmService.getCheckMenu(paramMap);

		if(list.size() > 0) {
			if(!list.get(0).get("MENU_PATH").toString().equals("")) {
				menu = list.get(0).get("MENU_PATH").toString();
			}

			logger.info("menu: [" + menu + "]");
			model.put("menu", list.get(0));

		}



		return menu;
	}

	@RequestMapping(value = "/home.do", method = RequestMethod.GET)
	public String home(ModelMap model) {
		String gridCode = propertiesService.getString("grid.code");
		model.put("gridCode", gridCode);
		return "desm/home";
	}

	@RequestMapping(value = "/video.do", method = RequestMethod.GET)
	public String video(ModelMap model) {
		String gridCode = propertiesService.getString("grid.code");
		model.put("gridCode", gridCode);
		return "desm/video";
	}

	@RequestMapping(value = "/dashboard.do", method = RequestMethod.GET)
	public String dashboard() {

		return "desm/home/dashboard";
	}

	@RequestMapping(value = "/swsb.do", method = RequestMethod.GET)
	public String swsb() {

		return "desm/home/swsb";
	}

	@RequestMapping(value = "/vts.do", method = RequestMethod.GET)
	public String vts() {

		return "desm/home/vts";
	}

	@RequestMapping(value = "/mpr.do", method = RequestMethod.GET)
	public String mpr() {

		return "desm/home/mpr";
	}


	@RequestMapping(value = "/simulation.do", method = RequestMethod.GET)
	public String simulation() {

		return "desm/simulation/mpr";
	}


	@RequestMapping(value={"/getComCode.do"}, method=RequestMethod.POST)
	public ModelAndView getComCode(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getComCode.do");

		paramMap.put("lang", session.getAttribute("LANG").toString());
		paramMap.put("USER_AD", session.getAttribute("SSOID").toString());

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", desmService.getComCode(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getCodeCombo.do"}, method=RequestMethod.POST)
	public ModelAndView getCodeCombo(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getCodeCombo.do");

		paramMap.put("lang", session.getAttribute("LANG").toString());
		paramMap.put("USER_AD", session.getAttribute("SSOID"));

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", desmService.getCodeCombo(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getMenuAuthCheckList.do"}, method=RequestMethod.POST)
	public ModelAndView getMenuAuthCheckList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getMenuAuthCheckList.do");

		paramMap.put("USER_AD", session.getAttribute("SSOID"));

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", desmService.getMenuAuthCheckList(paramMap));

		return mav;
	}

	@RequestMapping(value = "/mrd.do", method = RequestMethod.GET)
	public String mrd(@RequestParam String seq, @RequestParam String fileNm , ModelMap model, HttpSession session, HttpServletRequest request) {
    	String loc = propertiesService.getString("location");
    	String rp = "/rp " + "[" + seq + "]";
    	model.put("rp", rp);
		model.put("fileNm", fileNm);
		model.put("severNm", "zshpDS");
    	if(loc.equals("dev")) {
    		model.put("severNm", "zshpDEV");
    	}
		
    	/*
    	if(request.getHeader("host").equals("desm.doosanenerbility.com"))
    		return "desm/mrdProxy";
    	else
    		return "desm/mrd";
    	*/
    	return redirectMrdPath(request.getHeader("host"));
	}

	@RequestMapping(value = "/rsiMrd.do", method = RequestMethod.GET)
	public String rsiMrd(@RequestParam String seq, @RequestParam String fileNm , ModelMap model, HttpSession session, HttpServletRequest request) {

    	String loc = propertiesService.getString("location");
    	String rp = "/rp " + "[" + seq + "] [" + session.getAttribute("SSOID").toString() + "]";
    	model.put("rp", rp);
		model.put("fileNm", fileNm);
		model.put("severNm", "zshpDS");
    	if(loc.equals("dev")) {
    		model.put("severNm", "zshpDEV");
    	}

    	/*
    	if(request.getHeader("host").equals("desm.doosanenerbility.com"))
    		return "desm/mrdProxy";
    	else
    		return "desm/mrd";
    	*/
    	return redirectMrdPath(request.getHeader("host"));
	}

	@RequestMapping(value = "/rsiOutMrd.do", method = RequestMethod.GET)
	public String rsiOutMrd(@RequestParam String startHandoverDate, @RequestParam String endHandoverDate, @RequestParam String fileNm , @RequestParam String project, ModelMap model, HttpSession session, HttpServletRequest request) {

    	String loc = propertiesService.getString("location");
    	String rp = "/rp " + "[" + startHandoverDate.replaceAll("/", "") + "] [" + endHandoverDate.replaceAll("/", "") + "] [" + project + "]";
    	model.put("rp", rp);
		model.put("fileNm", fileNm);
		model.put("severNm", "zshpDS");
    	if(loc.equals("dev")) {
    		model.put("severNm", "zshpDEV");
    	}

    	/*
    	if(request.getHeader("host").equals("desm.doosanenerbility.com"))
    		return "desm/mrdProxy";
    	else
    		return "desm/mrd";
    	*/
    	return redirectMrdPath(request.getHeader("host"));
	}

	@RequestMapping(value = "/qrCodeMrd.do", method = RequestMethod.GET)
	public String qrCodeMrd(@RequestParam String codeType,@RequestParam String fileNm , ModelMap model, HttpSession session, HttpServletRequest request) {

    	String loc = propertiesService.getString("location");
    	String CREATED_BY = session.getAttribute("SSOID").toString();
    	String rp = "/rp " + "[" + codeType + "] [" + CREATED_BY + "]";
    	model.put("rp", rp);
		model.put("fileNm", fileNm);
		model.put("severNm", "zshpDS");
    	if(loc.equals("dev")) {
    		model.put("severNm", "zshpDEV");
    	}

    	/*
    	if(request.getHeader("host").equals("desm.doosanenerbility.com"))
    		return "desm/mrdProxy";
    	else
    		return "desm/mrd";
    	*/
    	return redirectMrdPath(request.getHeader("host"));
	}

	@RequestMapping(value={"/getInitDefailProject.do"}, method=RequestMethod.POST)
	public ModelAndView getInitDefailProject(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getInitDefailProject.do");

		paramMap.put("USER_AD", session.getAttribute("SSOID"));

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", desmService.getInitDefailProject(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getInitDefaultCountry.do"}, method=RequestMethod.POST)
	public ModelAndView getInitDefaultCountry(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getInitDefaultCountry.do");

		paramMap.put("USER_AD", session.getAttribute("SSOID"));

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", desmService.getInitDefaultCountry(paramMap));

		return mav;
	}
	
	@RequestMapping(value = "/mprMrd.do", method = RequestMethod.GET)
	public String mprMrd(@RequestParam String seq,@RequestParam String fileNm , ModelMap model, HttpSession session, HttpServletRequest request) {
		String loc = propertiesService.getString("location");
		String lang = session.getAttribute("LANG").toString();
		String rp = "/rp " + "[" + lang + "] [" + seq + "]";
		model.put("rp", rp);
		model.put("fileNm", fileNm);
		model.put("severNm", "zshpDS");
		if(loc.equals("dev")) {
			model.put("severNm", "zshpDEV");
		}
		/*
    	if(request.getHeader("host").equals("desm.doosanenerbility.com"))
    		return "desm/mrdProxy";
    	else
    		return "desm/mrd";
    	*/
    	return redirectMrdPath(request.getHeader("host"));
    }
	
	
	@RequestMapping(value = "/notice.do", method = RequestMethod.GET)
	public String notice(ModelMap model) {
		String gridCode = propertiesService.getString("grid.code");
		model.put("gridCode", gridCode);
		return "desm/notice";
	}


	//Dashboard - Card 상태별 조회
	@RequestMapping(value={"/getStatusCardInfo.do"}, method=RequestMethod.POST)
	public ModelAndView getStatusCardInfo(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session){
		logger.info("getStatusCardInfo.do");


		paramMap.put("userAD", session.getAttribute("SSOID"));		//사용자 계정

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", desmService.getStatusCardInfo(paramMap));
		return mav;
	}

	@RequestMapping(value={"/getMyRequestInfo.do"}, method=RequestMethod.POST)
	public ModelAndView getMyRequestInfo(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session){
		logger.info("getMyRequestInfo.do");


		paramMap.put("userAD", session.getAttribute("SSOID"));		//사용자 계정

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", desmService.getMyRequestInfo(paramMap));
		return mav;
	}

	@RequestMapping(value={"/getNotice.do"}, method=RequestMethod.POST)
	public ModelAndView getNotice(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getNotice.do");


		if (paramMap.containsKey("jobCode"))	paramMap.put("jobCode", URLDecoder.decode(paramMap.get("jobCode").toString(),"UTF-8").toUpperCase());

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", desmService.getNotice(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getNoticeContents.do"}, method=RequestMethod.POST)
	public ModelAndView getNoticeContents(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getNoticeContents.do");


		if (paramMap.containsKey("jobCode"))	paramMap.put("jobCode", URLDecoder.decode(paramMap.get("jobCode").toString(),"UTF-8").toUpperCase());

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", desmService.getNoticeContents(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getRealTimeNotice.do"}, method=RequestMethod.POST)
	public ModelAndView getRealTimeNotice(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getRealTimeNotice.do");

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", desmService.getRealTimeNotice(paramMap));

		return mav;
	}

	@RequestMapping(value={"/selectInvoiceAttach.do"}, method=RequestMethod.POST)
	public ModelAndView selectInvoiceAttach(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("selectInvoiceAttach.do");



		if (paramMap.containsKey("category"))
			paramMap.put("category", URLDecoder.decode(paramMap.get("category").toString(),"UTF-8"));

		if (paramMap.containsKey("jobCode"))
			paramMap.put("jobCode", URLDecoder.decode(paramMap.get("jobCode").toString(),"UTF-8"));

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", desmService.selectInvoiceAttach(paramMap));

		return mav;
	}

	@RequestMapping(value={"/getOrgList.do"}, method=RequestMethod.POST)
	public ModelAndView getOrgList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getOrgList.do");




		ModelAndView mav = new ModelAndView("jsonView");

		if (paramMap.containsKey("keyword"))
		{
			paramMap.put("keyword", URLDecoder.decode(paramMap.get("keyword").toString(),"UTF-8"));
		}

    	List orgList = desmService.getOrgList(paramMap);
    	List retList = new ArrayList();

    	HashMap<String, Object> orgMap = new HashMap<String, Object>();

    	for (Object el : orgList) {
    		HashMap<String, String> row = (HashMap)el;

        	orgMap = new HashMap<String, Object>();
        	orgMap.put("label", row.get("ORG_NM").toString() + " " + row.get("ORG_ID").toString());
        	orgMap.put("value", row.get("ORG_ID").toString() + "|" + row.get("ORG_NM").toString() + "|" + row.get("LEADER_NM").toString() + "|" + row.get("LEADER_AD").toString() + "|" + row.get("BG_NAME").toString());

        	retList.add(orgMap);
    	}

    	mav.addObject("results", retList);
		return mav;
	}

	@RequestMapping(value={"/getAllUserList.do"}, method=RequestMethod.POST)
	public ModelAndView getAllUserList(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException {
		logger.info("getAllUserList.do");


		ModelAndView mav = new ModelAndView("jsonView");

		paramMap.put("userAD", session.getAttribute("SSOID"));

		if (paramMap.containsKey("keyword"))
		{
			paramMap.put("keyword", URLDecoder.decode(paramMap.get("keyword").toString(),"UTF-8"));
		}

    	List empList = desmService.getAllUserList(paramMap);
    	List retList = new ArrayList();

    	HashMap<String, Object> empMap = new HashMap<String, Object>();

    	for (Object el : empList) {
    		HashMap<String, String> row = (HashMap)el;

        	empMap = new HashMap<String, Object>();
        	empMap.put("label",
        			row.get("USER_NAME").toString() + " " +
        			row.get("USER_ID").toString() + " " +
        			row.get("POS_TYPE").toString() + " / " +
        			row.get("DEPARTMENT_NAME").toString()
        	);
        	empMap.put("value",
        			row.get("USER_ID").toString() + "|" +
        			row.get("USER_NAME").toString() + "|" +
        			row.get("EMAIL_ADDRESS").toString() + "|" +
        			row.get("POS_TYPE").toString() + "|" +
        			row.get("DEPARTMENT_ID").toString() + "|" +
        			row.get("DEPARTMENT_NAME").toString() + "|" +
        			row.get("LEADER_AD").toString() + "|" +
        			row.get("LEADER_NAME").toString()
        	);
        	retList.add(empMap);
    	}

		mav.addObject("results", retList);

		return mav;
	}

	@RequestMapping(value="/saveNotice.do", method=RequestMethod.POST)
	public ModelAndView saveNotice(@RequestParam Map<String, Object> paramMap , ModelMap model, @RequestParam MultipartFile[] txtAttachFile, HttpServletRequest request, HttpSession session) throws Exception{

		logger.info("saveNotice.do");


		ModelAndView mav = new ModelAndView("jsonView");

		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = txManager.getTransaction(def);

		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
			Map<String, MultipartFile> files = multiRequest.getFileMap();
			Iterator<Entry<String, MultipartFile>> itr = files.entrySet().iterator();

    		boolean whileCheck = true;
    		if(paramMap.get("FILE_GRP_CD") == null || paramMap.get("FILE_GRP_CD").toString().equals("") || paramMap.get("FILE_GRP_CD").toString().equals("null")) {
    			whileCheck = true;
    			while(whileCheck) {
	    			paramMap.put("FILE_GRP_CD", UUID.randomUUID().toString());
	    			List<Map<String, Object>> fileCheckList = idsmFileService.getIdsmSetupDlgItemScheduleFileCheckGrp(paramMap);

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


			//기본데이터 저장
			desmService.insertNotice(paramMap);

			txManager.commit(txStatus);

			mav.addObject("success", paramMap.get("jobCode"));

			return mav;

		} catch(Exception e){

			mav.addObject("error", e.getMessage());
			mav.addObject("jobcode", paramMap.get("jobCode"));

			txManager.rollback(txStatus);
			return mav;
		}
	}

	@RequestMapping(value="/deleteNotice.do", method=RequestMethod.POST)
	public ModelAndView deleteNotice(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpSession session) throws Exception{
		logger.info("deleteNotice.do");


		ModelAndView mav = new ModelAndView("jsonView");

		try {
			//paramMap.put("jobCode", paramMap.get("jobCode"));
			desmService.deleteNotice(paramMap);

			mav.addObject("success", true);
			return mav;
		} catch(Exception e){

			mav.addObject("error", e.getMessage());
			return mav;
		}
	}


	@RequestMapping(value= {"/getLocation.do"}, method=RequestMethod.POST)
	public ModelAndView getLocation(ModelMap model, HttpSession session) {
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("result", propertiesService.getString("location"));
		return mav;
	}

	@RequestMapping(value = "/login_btn_click.do", method = RequestMethod.GET)
	public String login_btn_click(@RequestParam(value="id", required = true) String id, @RequestParam(value="menu_id", required = true) String menu_id, HttpSession session, HttpServletRequest request, HttpServletResponse response, ModelMap model ) throws Exception {

		model.put("id", id);
		model.put("menu_id", menu_id);

		return "desm/login_btn_click";
	}

	@RequestMapping(value = "/login_click.do", method = RequestMethod.POST)
	public ModelAndView login_click(@RequestParam Map<String, Object> paramMap, HttpSession session, ModelMap model, HttpServletRequest request) throws Exception {

		ModelAndView mav = new ModelAndView("jsonView");

		session.setAttribute("SSOID"		, "");
		session.setAttribute("SSONAME"		, "");
		session.setAttribute("LANG"	, "");
		session.setAttribute("NAME_TXT"	, "");
		session.setAttribute("LOG"		, "");
		session.setAttribute("GRIDLANG"		, "");
		session.setAttribute("ROLE_SEQ"		, "");
		session.setAttribute("ROLE_NAME"		, "");
		session.setAttribute("PWS_EDIT_YN"		, "");
		session.setAttribute("SUBCON_YN"		, "");
		session.setAttribute("DEPT_NAME"		, "");

		session.setAttribute("TRANS_USR_ID"		, "");
		session.setAttribute("TRANS_USER_NAME"		, "");
		session.setAttribute("TRANS_USR_CLS"		, "");
		session.setAttribute("TRANS_EMP_NO"		, "");
		session.setAttribute("TRANS_DEPT_CD"		, "");
		session.setAttribute("TRANS_DEPT_NM"		, "");
		session.setAttribute("TRANS_VD_CD"		, "");
		session.setAttribute("TRANS_EMAIL"		, "");
		session.setAttribute("TRANS_PRJ_ROLE_CD"		, "");
		session.setAttribute("TRANS_ROLE_CD"		, "");
		session.setAttribute("TRANS_BG_CODE"		, "");
		session.setAttribute("TRANS_BG_NAME"		, "");

		paramMap.put("IP", this.getIp(request));
		DesmVO chklogin = desmService.chkLogin(paramMap);
		paramMap.put("P_USER_AD", chklogin.getUSER_AD());

		List<Map<String, Object>> userInfoPwList = adminService.getUserCheckList(paramMap);

		if(userInfoPwList.size() > 0) {

    		/*UserPasword up = new UserPasword();
    		String user_pw = paramMap.get("PASSWORD").toString();
    		String user_pw_data = userInfoPwList.get(0).get("USER_PW") == null ? "" :  userInfoPwList.get(0).get("USER_PW").toString();
    		String SALT = userInfoPwList.get(0).get("USER_PW_SALT") == null ? "" : userInfoPwList.get(0).get("USER_PW_SALT").toString();
    		String pw = up.setHashing(up.setHashing(user_pw, SALT), SALT);*/

    		//if(pw.equals(user_pw_data)) {

    			mav.addObject("results", chklogin);

    			session.setAttribute("SSOID",   chklogin.getUSER_AD());
    			session.setAttribute("SSONAME", chklogin.getUSER_NAME());
    			session.setAttribute("LOG"		    , chklogin.getLOG_DATE());
    			session.setAttribute("ROLE_SEQ"		, chklogin.getROLE_SEQ());
    			session.setAttribute("ROLE_NAME"		,chklogin.getROLE_NAME());
				session.setAttribute("PWS_EDIT_YN"		, chklogin.getPWS_EDIT_YN());
				session.setAttribute("SUBCON_YN"		, chklogin.getSUBCON_YN());
				session.setAttribute("DEPT_NAME"		, chklogin.getDEPT_NAME());

    			paramMap.put("USER_ID", chklogin.getUSER_AD());

    			List<Map<String, Object>> userInfoList = transService.chkUser(paramMap);

    			if(userInfoList.size() > 0) {
    				session.setAttribute("TRANS_USR_ID"		, userInfoList.get(0).get("USR_ID"));
    				session.setAttribute("TRANS_USER_NAME"		, userInfoList.get(0).get("USER_NAME"));
    				session.setAttribute("TRANS_USR_CLS"		, userInfoList.get(0).get("USR_CLS"));
    				session.setAttribute("TRANS_EMP_NO"		, userInfoList.get(0).get("EMP_NO"));
    				session.setAttribute("TRANS_DEPT_CD"		, userInfoList.get(0).get("DEPT_CD"));
    				session.setAttribute("TRANS_DEPT_NM"		, userInfoList.get(0).get("DEPT_NM"));
    				session.setAttribute("TRANS_VD_CD"		, userInfoList.get(0).get("VD_CD"));
    				session.setAttribute("TRANS_EMAIL"		, userInfoList.get(0).get("EMAIL"));
    				session.setAttribute("TRANS_PRJ_ROLE_CD"		, userInfoList.get(0).get("PRJ_ROLE_CD"));
    				session.setAttribute("TRANS_ROLE_CD"		, userInfoList.get(0).get("ROLE_CD"));
    				session.setAttribute("TRANS_BG_CODE"		, userInfoList.get(0).get("BG_CODE"));
    				session.setAttribute("TRANS_BG_NAME"		, userInfoList.get(0).get("BG_NAME"));
    			}


    			desmService.insertUserLog(paramMap);
    		//}
    		//else {
    		//	mav.addObject("results", null);
    		//}

		}
		else {
			mav.addObject("results", null);
		}

		return mav;
	}

	@RequestMapping(value = "/main_click.do")
	public String main_click(@RequestParam("lang") String language, @RequestParam("menu_id") String menu_id, HttpServletRequest request, HttpServletResponse response, HttpSession session, ModelMap model) throws Exception {

		Locale locale = new Locale(language);
		LocaleResolver localeResolver = RequestContextUtils.getLocaleResolver(request);
		localeResolver.setLocale(request, response, locale);

		session.setAttribute("LANG", language);

		 if(language.equals("en")){
			 session.setAttribute("GRIDLANG", "en-US");
			 session.setAttribute("NAME_TXT", session.getAttribute("SSOID"));
		 }
		 else if(language.equals("ko")){
			 session.setAttribute("GRIDLANG", "ko-KR");
			 session.setAttribute("NAME_TXT", session.getAttribute("SSONAME"));
		 }

		String gridCode = propertiesService.getString("grid.code");
		model.put("gridCode", gridCode);
		model.put("firstYn", "Y");
		model.put("menu_id", menu_id);

		return "desm/home";
	}


	@RequestMapping(value={"/getApkDownload.do"}, method=RequestMethod.GET)
	public ModelAndView getApkDownload(ModelAndView mv) throws Exception{
		logger.info("getApkDownload.do");


    	String fileNameOrg = "mDESM.apk";

    	String fullPath = propertiesService.getString("file.apk.download.path");

		File file = new File(fullPath);

		mv.setViewName("fileApkDownloadService");
		mv.addObject("downloadFile", file);
		mv.addObject("fileNameOrg", fileNameOrg);
		return mv;
	}

	@RequestMapping(value={"/getApkDownloadDev.do"}, method=RequestMethod.GET)
	public ModelAndView getApkDownloadDev(ModelAndView mv) throws Exception{
		logger.info("getApkDownloadDev.do");


    	String fileNameOrg = "dev_mDESM.apk";

    	String fullPath = propertiesService.getString("file.apk.dev.download.path");

		File file = new File(fullPath);

		mv.setViewName("fileApkDownloadService");
		mv.addObject("downloadFile", file);
		mv.addObject("fileNameOrg", fileNameOrg);
		return mv;
	}

	// IDCS 임직원용 (Office User)
	@RequestMapping(value = "/login_idcs.do", method = RequestMethod.GET)
	public void login_idcs(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String loc = propertiesService.getString("location");
		String region = propertiesService.getString("region");

		String spinitateEndPoint = "https://idcs-4f17d54755df4b698b84d30191a87d33.identity.oraclecloud.com/fed/v1/sp/initiatesso?partnername=DHI_ADFS&returnurl=";
	    String oauthAuthEndPoint = "https://idcs-4f17d54755df4b698b84d30191a87d33.identity.oraclecloud.com/oauth2/v1/authorize";
	    String allowedScope = "https://81BBCFEF17F642AB93973D87DA8C3C58.mobile.ocp.oraclecloud.com:443urn:opc:resource:consumer::all";
	    //String clientIdInternal = "c1adf1bc77e643a589f51142a4bfa6be"; // IDCS Application만 있는 버전
	    //String oauthTokenEndpoint = "http://localhost:8090/idcs_result.do";
	    String clientIdWebIdcs = (loc.equals("dev")) ? "c1adf1bc77e643a589f51142a4bfa6be" : (region.equals("bah") ? "d344ceeb6cad41b1aa291c8e5e675e17" : "fc177d77c5504d5a9c5f7de5d5f88796");
	    String oauthTokenEndPoint = (loc.equals("dev")) ? "https://desm.doosanenerbility.com:712/idcs_result.do" : (region.equals("bah") ? "https://desmb.doosanenerbility.com/idcs_result.do" : "https://desm.doosanenerbility.com/idcs_result.do");

	    String uuid = UUID.randomUUID().toString();
	    String param = URLEncoder.encode(oauthAuthEndPoint + "?client_id=" + clientIdWebIdcs + "&response_type=code&redirect_uri=" + oauthTokenEndPoint + "&scope=" + allowedScope + "&nonce=" + uuid, "UTF-8");
	    String reqUrl = spinitateEndPoint + param;

		response.sendRedirect(reqUrl);
	}

	// IDCS 사외용(Constuction Site User)
	@RequestMapping(value = "/login_idcs_c.do", method = RequestMethod.GET)
	public void login_idcs_c(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String loc = propertiesService.getString("location");
		String region = propertiesService.getString("region");

	    String oauthAuthEndPoint = "https://idcs-4f17d54755df4b698b84d30191a87d33.identity.oraclecloud.com/oauth2/v1/authorize";
	    String allowedScope = "https://81BBCFEF17F642AB93973D87DA8C3C58.mobile.ocp.oraclecloud.com:443urn:opc:resource:consumer::all";
	    //String clientIdInternal = "c1adf1bc77e643a589f51142a4bfa6be"; // IDCS Application만 있는 버전, EX도 되는지 테스트
	    //String oauthTokenEndPoint = "http://localhost:8090/idcs_result.do";
	    String clientIdWebIdcs = (loc.equals("dev")) ? "c1adf1bc77e643a589f51142a4bfa6be" : (region.equals("bah") ? "d344ceeb6cad41b1aa291c8e5e675e17" : "fc177d77c5504d5a9c5f7de5d5f88796");
	    String oauthTokenEndPoint = (loc.equals("dev")) ? "https://desm.doosanenerbility.com:712/idcs_result.do" : (region.equals("bah") ? "https://desmb.doosanenerbility.com/idcs_result.do" : "https://desm.doosanenerbility.com/idcs_result.do");

	    String uuid = UUID.randomUUID().toString();
	    String param = "?client_id=" + clientIdWebIdcs + "&response_type=code&redirect_uri=" + URLEncoder.encode(oauthTokenEndPoint, "UTF-8") + "&scope=" + allowedScope + "&nonce=" + uuid;
	    String reqUrl = oauthAuthEndPoint + param;

		response.sendRedirect(reqUrl);
	}

	@RequestMapping(value = "/idcs_result.do", method = RequestMethod.GET)
	public String idcs_result(@RequestParam String code, HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		logger.info("/idcs_result.do");
		logger.info("call accessToken");

		String loc = propertiesService.getString("location");
		String region = propertiesService.getString("region");

		model.put("type", "in");
		model.put("code", code);
		model.put("loc", loc);
		model.put("region", region);
		model.put("idcs_service_url", request.getHeader("idcs_service_url"));

		return "desm/getAccessTokenDelegateIdcs";
	}

	@RequestMapping(value={"/idcs_login_success.do"}, method=RequestMethod.POST)
	public ModelAndView idcs_login_success(@RequestParam("token") String param, ModelMap model, HttpSession session, HttpServletRequest request) throws UnsupportedEncodingException{
		logger.info("idcs_login_success.do");
		ModelAndView mav = new ModelAndView("jsonView");
		try {
			System.out.println("token param :: ");
			System.out.println(param);
			System.out.println("------------ Decode JWT ------------");
	        String[] split_string = param.split("\\.");
	        String base64EncodedHeader = split_string[0];
	        String base64EncodedBody = split_string[1];
	        //String base64EncodedSignature = split_string[2];

	        System.out.println("~~~~~~~~~ JWT Header ~~~~~~~");
	        Base64 base64Url = new Base64(true);
	        String header = new String(base64Url.decode(base64EncodedHeader));
	        System.out.println("JWT Header : " + header);


	        System.out.println("~~~~~~~~~ JWT Body ~~~~~~~");
	        String body = new String(base64Url.decode(base64EncodedBody));
	        System.out.println("JWT Body : "+body);

			session.setAttribute("SSOID"		, "");
			session.setAttribute("SSONAME"		, "");
			session.setAttribute("LANG"	, "");
			session.setAttribute("NAME_TXT"	, "");
			session.setAttribute("LOG"		, "");
			session.setAttribute("GRIDLANG"		, "");
			session.setAttribute("ROLE_SEQ"		, "");
			session.setAttribute("ROLE_NAME"		, "");
			session.setAttribute("PWS_EDIT_YN"		, "");
			session.setAttribute("SUBCON_YN"		, "");
			session.setAttribute("DEPT_NAME"		, "");

			session.setAttribute("TRANS_USR_ID"		, "");
			session.setAttribute("TRANS_USER_NAME"		, "");
			session.setAttribute("TRANS_USR_CLS"		, "");
			session.setAttribute("TRANS_EMP_NO"		, "");
			session.setAttribute("TRANS_DEPT_CD"		, "");
			session.setAttribute("TRANS_DEPT_NM"		, "");
			session.setAttribute("TRANS_VD_CD"		, "");
			session.setAttribute("TRANS_EMAIL"		, "");
			session.setAttribute("TRANS_PRJ_ROLE_CD"		, "");
			session.setAttribute("TRANS_ROLE_CD"		, "");
			session.setAttribute("TRANS_BG_CODE"		, "");
			session.setAttribute("TRANS_BG_NAME"		, "");



	        Map<String, Object> paramMap = new ObjectMapper().readValue(body, Map.class);
			paramMap.put("USER_ID", paramMap.get("sub").toString().toUpperCase());
			paramMap.put("IP", this.getIp(request));
			DesmVO chklogin = desmService.chkLogin(paramMap);

			// TODO: Default Country (nvl은 한국)가 한국이 아니면 무조건 lang=en으로 보내기 
			if(chklogin != null) {
				session.setAttribute("SSOID"		, chklogin.getUSER_AD());
				session.setAttribute("SSONAME"		, chklogin.getUSER_NAME());
				session.setAttribute("LOG"		    , chklogin.getLOG_DATE());
				session.setAttribute("ROLE_SEQ"		, chklogin.getROLE_SEQ());
				session.setAttribute("ROLE_NAME"	, chklogin.getROLE_NAME());
				session.setAttribute("PWS_EDIT_YN"		, chklogin.getPWS_EDIT_YN());
				session.setAttribute("SUBCON_YN"		, chklogin.getSUBCON_YN());
				session.setAttribute("DEPT_NAME"		, chklogin.getDEPT_NAME());

				session.setAttribute("LOGIN_TOKEN"		, param);
				System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@"+param + " : " + chklogin.getUSER_AD());
				paramMap.put("USER_ID", chklogin.getUSER_AD());



				List<Map<String, Object>> userInfoList = transService.chkUser(paramMap);

				if(userInfoList.size() > 0) {
					session.setAttribute("TRANS_USR_ID"		, userInfoList.get(0).get("USR_ID"));
					session.setAttribute("TRANS_USER_NAME"		, userInfoList.get(0).get("USER_NAME"));
					session.setAttribute("TRANS_USR_CLS"		, userInfoList.get(0).get("USR_CLS"));
					session.setAttribute("TRANS_EMP_NO"		, userInfoList.get(0).get("EMP_NO"));
					session.setAttribute("TRANS_DEPT_CD"		, userInfoList.get(0).get("DEPT_CD"));
					session.setAttribute("TRANS_DEPT_NM"		, userInfoList.get(0).get("DEPT_NM"));
					session.setAttribute("TRANS_VD_CD"		, userInfoList.get(0).get("VD_CD"));
					session.setAttribute("TRANS_EMAIL"		, userInfoList.get(0).get("EMAIL"));
					session.setAttribute("TRANS_PRJ_ROLE_CD"		, userInfoList.get(0).get("PRJ_ROLE_CD"));
					session.setAttribute("TRANS_ROLE_CD"		, userInfoList.get(0).get("ROLE_CD"));
					session.setAttribute("TRANS_BG_CODE"		, userInfoList.get(0).get("BG_CODE"));
					session.setAttribute("TRANS_BG_NAME"		, userInfoList.get(0).get("BG_NAME"));
				}

				desmService.insertUserLog(paramMap);
				
				mav.addObject("success", "OK");
				mav.addObject("lang", desmService.getRedirectLang(paramMap));
		        //RequestDispatcher requestDispatehcer = request.getRequestDispatcher("/main.do?lang=ko");
				//requestDispatehcer.forward(request, response);
				return mav;
			}
			else {
				mav.addObject("error", "FAIL");
			}

		} catch (Exception e) {
			e.printStackTrace();
			mav.addObject("error", e.toString());
		}

		return mav;
	}
	
	private String redirectMrdPath(String host) {
		logger.info("mrd redirect host :: " + host);
		String resultPath = "desm/mrd";
		switch(host) {
			case "desm.doosanenerbility.com":
				resultPath = "desm/mrdProxy";
				break;
			case "bppdesm.doosanenerbility.com:7140":
				resultPath = "desm/mrd";
				break;
			case "desmb.doosanenerbility.com":
				resultPath = "desm/mrdProxyBah";
				break;
			case "bppdesmb.doosanenerbility.com:7140":
				resultPath = "desm/mrdBah";
				break;
			default:
				// dhbppdev.corp.doosan.com:7140
				// localhost:8090
				resultPath = "desm/mrd";
				break;
		}
		return resultPath;
	}
	
	private String getProxyCheck(String host) {
		// 대문자, L(local), S(sso), P(proxy)
		// 내부, 외부 접속 경로 확인하여.. Image등 path 호출 경로 지정해주기 위함..(rd 등에서)
		logger.info("proxy check host :: " + host);
		String proxyType = "L";
		switch(host) {
			case "desm.doosanenerbility.com":
			case "desmb.doosanenerbility.com":
				proxyType = "P";
				break;
			case "bppdesm.doosanenerbility.com:7140":
			case "bppdesmb.doosanenerbility.com:7140":
				proxyType = "S";
				break;
			case "localhost:8080":
			case "localhost:8090":
				proxyType = "L";
				break;
			default:
				proxyType = "L";
				break;
		}
		return proxyType;
	}

	@RequestMapping(value = "/mrrMrd.do", method = RequestMethod.GET)
	public String mrrMrd(@RequestParam String seq, @RequestParam String fileNm , ModelMap model, HttpSession session, HttpServletRequest request) {

    	String loc = propertiesService.getString("location");
    	String rp = "/rp " + "[" + seq + "] [" + session.getAttribute("SSOID").toString() + "] [" + getProxyCheck(request.getHeader("host")) + "]";
    	model.put("rp", rp);
		model.put("fileNm", fileNm);
		model.put("severNm", "zshpDS");
    	if(loc.equals("dev")) {
    		model.put("severNm", "zshpDEV");
    	}

    	/*
    	if(request.getHeader("host").equals("desm.doosanenerbility.com"))
    		return "desm/mrdProxy";
    	else
    		return "desm/mrd";
    	*/
    	return redirectMrdPath(request.getHeader("host"));
	}

	@RequestMapping(value = "/mirMrd.do", method = RequestMethod.GET)
	public String mirMrd(@RequestParam String seq, @RequestParam String fileNm , ModelMap model, HttpSession session, HttpServletRequest request) {

    	String loc = propertiesService.getString("location");
    	String rp = "/rp " + "[" + seq + "] [" + session.getAttribute("SSOID").toString() + "] [" + getProxyCheck(request.getHeader("host")) + "]";
    	model.put("rp", rp);
		model.put("fileNm", fileNm);
		model.put("severNm", "zshpDS");
    	if(loc.equals("dev")) {
    		model.put("severNm", "zshpDEV");
    	}

    	/*
    	if(request.getHeader("host").equals("desm.doosanenerbility.com"))
    		return "desm/mrdProxy";
    	else
    		return "desm/mrd";
    	*/
    	return redirectMrdPath(request.getHeader("host"));
	}
	
	@RequestMapping(value = "/mirOsdmMrd.do", method = RequestMethod.GET)
	public String mirOsdmMrd(@RequestParam String seq, @RequestParam String fileNm , ModelMap model, HttpSession session, HttpServletRequest request) {

    	String loc = propertiesService.getString("location");
    	String rp = "/rp " + "[" + seq + "] [" + session.getAttribute("SSOID").toString() + "] [" + getProxyCheck(request.getHeader("host")) + "]";
    	model.put("rp", rp);
		model.put("fileNm", fileNm);
		model.put("severNm", "zshpDS");
    	if(loc.equals("dev")) {
    		model.put("severNm", "zshpDEV");
    	}
    	return redirectMrdPath(request.getHeader("host"));
	}
	
	
	@RequestMapping(value={"/getIsSubon.do"}, method=RequestMethod.POST)
	public ModelAndView getIsSubon(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getIsSubon.do");

		paramMap.put("USER_AD", session.getAttribute("SSOID"));

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", desmService.getIsSubon(paramMap));

		return mav;
	}
}

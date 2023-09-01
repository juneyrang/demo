package egovframework.desm.web;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
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
import egovframework.desm.service.DashboardService;
import egovframework.desm.service.DesmService;
import egovframework.desm.service.DesmVO;
import egovframework.desm.service.IdsmFileService;
import egovframework.desm.service.MobileService;
import egovframework.desm.service.MprService;
import egovframework.desm.service.TransService;
import egovframework.rte.fdl.property.EgovPropertyService;

@Controller
public class DashboardController {
	private static final Logger logger = LoggerFactory.getLogger(DashboardController.class);

	@Resource(name = "txManager")
	protected DataSourceTransactionManager txManager;

	@Autowired
	DashboardService dashboardService;

	
	@RequestMapping(value={"/dashboard/getPackageSummary.do"}, method=RequestMethod.POST)
	public ModelAndView getPackageSummary(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getPackageSummary.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", dashboardService.getPackageSummary(paramMap));
		return mav;
	}
	
	@RequestMapping(value={"/dashboard/getMrrChartSummary.do"}, method=RequestMethod.POST)
	public ModelAndView getMrrChartSummary(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getMrrChartSummary.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", dashboardService.getMrrChartSummary(paramMap));
		return mav;
	}
	
	@RequestMapping(value={"/dashboard/getMirChartSummary.do"}, method=RequestMethod.POST)
	public ModelAndView getMirChartSummary(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getMirChartSummary.do");
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", dashboardService.getMirChartSummary(paramMap));
		return mav;
	}
}

package egovframework.desm.web;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import egovframework.desm.service.DesmService;
import egovframework.desm.service.TransService;
import egovframework.rte.fdl.property.EgovPropertyService;



@Controller
public class TransController {
	private static final Logger logger = LoggerFactory.getLogger(TransController.class);

	@Resource(name = "transService")
	private TransService transService;
	
	@Resource(name = "desmService")
	private DesmService desmService;	
	
	@Resource(name="propertiesService")
	protected EgovPropertyService propertiesService ;
	
	@Resource(name = "txManager") 
	protected DataSourceTransactionManager txManager;	
	
	
	
	@RequestMapping(value={"/getTransCodeCombo.do"}, method=RequestMethod.POST)
	public ModelAndView getTransCodeCombo(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws UnsupportedEncodingException{
		logger.info("getTransCodeCombo.do");
		
		paramMap.put("lang", session.getAttribute("LANG").toString());
		
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", transService.getTransCodeCombo(paramMap));
		
		return mav;
	}	
	
	@RequestMapping(value={"/getTransProject.do"}, method=RequestMethod.POST)
	public ModelAndView getTransProject(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransProject.do");
		
		ModelAndView mav = new ModelAndView("jsonView");

		if (paramMap.containsKey("keyword"))
		{
			paramMap.put("keyword", URLDecoder.decode(paramMap.get("keyword").toString(),"UTF-8"));
		}
		
		String prj_role_cd = session.getAttribute("TRANS_PRJ_ROLE_CD") == null ? "" : (String)session.getAttribute("TRANS_PRJ_ROLE_CD");
		String vd_cd = session.getAttribute("TRANS_VD_CD") == null ? "" : (String)session.getAttribute("TRANS_VD_CD");
		String bg_code = session.getAttribute("TRANS_BG_CODE") == null ? "" : (String)session.getAttribute("TRANS_BG_CODE");
		
		paramMap.put("TRANS_PRJ_ROLE_CD", prj_role_cd);
		paramMap.put("TRANS_VD_CD", vd_cd);
		paramMap.put("TRANS_BG_CODE", bg_code);
		
		mav.addObject("results", transService.getTransProject(paramMap));
		
		return mav;
	}	
	
	@RequestMapping(value={"/getTransDlgProject.do"}, method=RequestMethod.POST)
	public ModelAndView getTransDlgProject(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getTransDlgProject.do");
		
		ModelAndView mav = new ModelAndView("jsonView");	
		
		String prj_role_cd = session.getAttribute("TRANS_PRJ_ROLE_CD") == null ? "" : (String)session.getAttribute("TRANS_PRJ_ROLE_CD");
		String vd_cd = session.getAttribute("TRANS_VD_CD") == null ? "" : (String)session.getAttribute("TRANS_VD_CD");
		String bg_code = session.getAttribute("TRANS_BG_CODE") == null ? "" : (String)session.getAttribute("TRANS_BG_CODE");
		
		paramMap.put("TRANS_PRJ_ROLE_CD", prj_role_cd);
		paramMap.put("TRANS_VD_CD", vd_cd);
		paramMap.put("TRANS_BG_CODE", bg_code);
		
		mav.addObject("results", transService.getTransDlgProject(paramMap));
		
		return mav;
	}	
	
	@RequestMapping("/getTransAttachDownload.do")
	public ModelAndView getTransAttachDownload(@RequestParam String code, ModelAndView mv) {
		logger.info("getTransAttachDownload : file code : " + code);

		Map<String, Object> paramMap = new HashMap<String, Object>(); 
		paramMap.put("ATT_ID", code);

    	List<Map<String, Object>> fileList = transService.geTransFileById(paramMap);

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
	
	@RequestMapping("/getTransAttachPreview.do")
	public ModelAndView getTransAttachPreview(@RequestParam String code, ModelAndView mv) {
		logger.info("getTransAttachPreview : file code : " + code);

		Map<String, Object> paramMap = new HashMap<String, Object>(); 
		paramMap.put("ATT_ID", code);

		List<Map<String, Object>> fileList = transService.geTransFileById(paramMap);

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

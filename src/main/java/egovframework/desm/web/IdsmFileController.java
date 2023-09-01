package egovframework.desm.web;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import egovframework.desm.service.IdsmFileService;
import egovframework.rte.fdl.property.EgovPropertyService;



@Controller
public class IdsmFileController {
	private static final Logger logger = LoggerFactory.getLogger(IdsmFileController.class);

	@Resource(name = "idsmFileService")
	private IdsmFileService idsmFileService;
	
	@Resource(name="propertiesService")
	protected EgovPropertyService propertiesService ;
	
	@RequestMapping(value={"/getIdsmSetupDlgItemScheduleFile.do"}, method=RequestMethod.POST)
	public ModelAndView getIdsmSetupDlgItemScheduleFile(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		logger.info("getIdsmSetupDlgItemScheduleFile.do");
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		mav.addObject("results", idsmFileService.getIdsmSetupDlgItemScheduleFile(paramMap));
		
		return mav;
	}	
	
	@RequestMapping("/getIdsmAttachDownload.do")
	public ModelAndView getIdsmAttachDownload(@RequestParam String code, ModelAndView mv) {
		logger.info("getIdsmAttachDownload : file code : " + code);

		Map<String, Object> paramMap = new HashMap<String, Object>(); 
		paramMap.put("ATT_ID", code);

    	List<Map<String, Object>> fileList = idsmFileService.getIdsmSetupDlgItemScheduleFileById(paramMap);

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
	
	@RequestMapping("/getIdsmAttachPreview.do")
	public ModelAndView getIdsmAttachPreview(@RequestParam String code, ModelAndView mv) {
		logger.info("getIdsmAttachPreview : file code : " + code);

		Map<String, Object> paramMap = new HashMap<String, Object>(); 
		paramMap.put("ATT_ID", code);

		List<Map<String, Object>> fileList = idsmFileService.getIdsmSetupDlgItemScheduleFileById(paramMap);

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
	
	@RequestMapping(value="/deleteIdsmSetupDlgItemScheduleFile.do", method=RequestMethod.POST)
	public ModelAndView deleteIdsmSetupDlgItemScheduleFile(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) throws Exception{
		
		logger.info("deleteIdsmSetupDlgItemScheduleFile.do"  + paramMap); 
		
		ModelAndView mav = new ModelAndView("jsonView");

		try {
	    	//로그인 사용자 정보
	    	paramMap.put("USER_AD", session.getAttribute("SSOID"));

			//기본데이터 저장
	    	idsmFileService.deleteIdsmSetupDlgItemScheduleFile(paramMap);
			
			mav.addObject("success", true);
			
			return mav;
			
		} catch(Exception e){		
			
			mav.addObject("error", e.toString());
			return mav;
		}				
	}		
		
}	
	

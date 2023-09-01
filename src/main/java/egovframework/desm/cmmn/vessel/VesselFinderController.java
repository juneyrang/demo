package egovframework.desm.cmmn.vessel;

import java.io.UnsupportedEncodingException;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/vessel")
public class VesselFinderController {

	private static final Logger logger = LoggerFactory.getLogger(VesselFinderController.class);
	
	@Resource(name = "vesselFinderService")
	VesselFinderService vesselFinderService;
	
	@Resource(name = "txManager") 
	protected DataSourceTransactionManager txManager;

	@RequestMapping(value={"/getVessels.do"}, method=RequestMethod.POST)
	public ModelAndView getVessels(@RequestParam Map<String, Object> paramMap) throws UnsupportedEncodingException{
		logger.info("getVessels.do");

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", vesselFinderService.getVessels(paramMap));
		
		return mav;
	}

	@RequestMapping(value={"/getVesselsList.do"}, method=RequestMethod.POST)
	public ModelAndView getVesselsList(@RequestParam Map<String, Object> paramMap) throws UnsupportedEncodingException{
		logger.info("getVesselsList.do");

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", vesselFinderService.getVesselsList(paramMap));
		
		return mav;
	}

	@RequestMapping(value={"/getLiveData.do"}, method=RequestMethod.POST)
	public ModelAndView getLiveData(@RequestParam Map<String, Object> paramMap) throws UnsupportedEncodingException{
		logger.info("getLiveData.do");

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", vesselFinderService.getLiveData(paramMap));
		
		return mav;
	}

	@RequestMapping(value={"/getPortCalls.do"}, method=RequestMethod.POST)
	public ModelAndView getPortCalls(@RequestParam Map<String, Object> paramMap) throws UnsupportedEncodingException{
		logger.info("getPortCalls.do");

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", vesselFinderService.getPortCalls(paramMap));
		
		return mav;
	}

	@RequestMapping(value={"/getExpectedArrivals.do"}, method=RequestMethod.POST)
	public ModelAndView getExpectedArrivals(@RequestParam Map<String, Object> paramMap) throws UnsupportedEncodingException{
		logger.info("getExpectedArrivals.do");

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("results", vesselFinderService.getExpectedArrivals(paramMap));
		
		return mav;
	}

}

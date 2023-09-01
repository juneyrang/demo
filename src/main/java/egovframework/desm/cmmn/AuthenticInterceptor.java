package egovframework.desm.cmmn;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import egovframework.desm.service.DesmService;
import egovframework.rte.fdl.property.EgovPropertyService;



public class AuthenticInterceptor extends HandlerInterceptorAdapter {

	@Resource(name="propertiesService")
	protected EgovPropertyService propertiesService;

	@Resource(name = "desmService")
	private DesmService desmService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //System.out.println("preHandle >>>  Controller 실행 전 실행");

        String requestURI = request.getRequestURI();
        System.out.println("requestURI >>>  Controller 실행 전 실행!!!" + requestURI);
        if(requestURI.equals("/login.do") || requestURI.equals("/login_admin.do") || requestURI.equals("/chkLogin_admin.do") || requestURI.equals("/error.do") || requestURI.equals("/logout.do")
        		//|| requestURI.equals("/login_btn_click.do") || requestURI.equals("/login_click.do")
        		|| requestURI.equals("/showExpDoc.do") || requestURI.equals("/expFileDownload.do") || requestURI.contains("/resources/img") || requestURI.contains("/resources/images/MaterialMap")
        		|| requestURI.equals("/getApkDownload.do") || requestURI.equals("/getApkDownloadDev.do")
        		|| requestURI.equals("/login_idcs.do") || requestURI.equals("/login_idcs_c.do")  || requestURI.equals("/idcs_result.do") || requestURI.equals("/idcs_login_success.do")
        		|| requestURI.equals("/attach/getRdImg.do")
        		) {
        	System.out.println("true : "+requestURI);
        	return true;
        }
        else if(requestURI.indexOf("/mobile") != -1) {
        	// for log
        	/*
        	System.out.println("requestURI.toString()");
        	System.out.println(requestURI.toString());
        	Enumeration<String> e;
        	String name = "";
        	System.out.println("[Debug][AuthenticInterceptor][preHandle]request.getHeaderNames() >> enumeration");
        	e = request.getHeaderNames();
        	while(e.hasMoreElements()) {
        		name = e.nextElement();
        		System.out.print(name);
        		System.out.print(" :: ");
        		System.out.println(request.getHeader(name));
        	}
        	*/
        	// for log end
        	//return true;
        	boolean auth = false;
        	if(request.getHeader("idcs_service_url") != null) {
        		auth = (request.getHeader("idcs_service_url").equals(propertiesService.getString("prod.mobile.idcs.service.url")))
        				? true : false;
        	}
        	if(!auth) response.sendRedirect("/error.do");
        	return auth;
        }
        else {
        	HttpSession session = request.getSession();
        	//System.out.println("session >>>  Controller 실행 전 실행!!!" + session.getAttribute("SSOID").toString());
        	if(session.getAttribute("SSOID") != null && !session.getAttribute("SSOID").toString().trim().equals("")) {

        		/*
        		if(request.getHeader("AJAX") != null && request.getHeader("AJAX").toString().equals("true")) {
            		Map<String, Object> paramMap = new HashMap<String, Object>();
            		paramMap.put("NAME", requestURI);
            		paramMap.put("USER_AD", session.getAttribute("SSOID"));
            		desmService.saveDesmServiceLog(paramMap);
        		}*/

    			return true;
    		}
        	else {

        		if(request.getHeader("AJAX") != null && request.getHeader("AJAX").toString().equals("true")) {
        			response.sendError(503);
        		}
        		else {
        			response.sendRedirect("/logout.do");
        		}

        		return false;
        	}
        }
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modeAndView) throws Exception {
        //System.out.println("postHandle >>>  Controller 실행 후 실행");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex){
        //System.out.println("afterCompletion >>>  preHandle 메소드 return값이 true일 때 실행");
    }

}

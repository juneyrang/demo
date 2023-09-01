package egovframework.desm.cmmn;

import java.util.Random;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class CacheInitializer implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        // 캐시 데이터 초기화
        String releaseVersion = this.randomString();
        ServletContext servletContext = sce.getServletContext();
        servletContext.setAttribute("rv", releaseVersion);
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        // 캐시 데이터 해제
        ServletContext servletContext = sce.getServletContext();
        servletContext.removeAttribute("releaseVersion");
    }
    
    private String randomString() {
    	int leftLimit = 48; // numeral '0'
	    int rightLimit = 122; // letter 'z'
	    int targetStringLength = 10;
	    Random random = new Random();
	    String generatedString = random.ints(leftLimit, rightLimit + 1)
	                                   .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
	                                   .limit(targetStringLength)
	                                   .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
	                                   .toString();
	    System.out.println("[CacheInitializer][randomString] : " + generatedString);
	    return generatedString;
    }
}
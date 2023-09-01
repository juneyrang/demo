/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package egovframework.desm.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.servlet.view.AbstractView;

public class FilePreviewService extends AbstractView {

	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		File file = (File)model.get("downloadFile");
		String fileNameOrg = (String)model.get("fileNameOrg");
		String fileExt = (String)model.get("fileExt");
		
        if(file != null) {
            String fileName = null;
            String userAgent = request.getHeader("User-Agent");
            
            if(userAgent != null && (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1)){
                fileName = URLEncoder.encode(fileNameOrg, "utf-8").replaceAll("\\+", "%20");;
            } else if(userAgent != null && userAgent.indexOf("Chrome") > -1) {
            	StringBuffer sb = new StringBuffer();
            	for(int i=0; i<fileNameOrg.length(); i++) {
            		char c = fileNameOrg.charAt(i);
            		if(c > '~') {
            			sb.append(URLEncoder.encode(""+c, "UTF-8"));
            		}else {
            			sb.append(c);
            		}
            	}
            	fileName = sb.toString();
            }else {
            	fileName = new String(fileNameOrg.getBytes("utf-8"));
            }
            
            //response.setContentType(getContentType());
            response.setContentLength((int)file.length());
            response.setHeader("Content-Disposition", "filename=\"" + fileName + "\";");
            response.setHeader("Content-Transfer-Encoding", "binary");
            
            
        	if (fileExt.equals("pdf")) 		
        		response.setHeader("Content-Type", "application/pdf; charset=UTF-8");
        	else if (fileExt.equals("jpg") || fileExt.equals("jpeg")) 
        		response.setHeader("Content-Type", "image/jpeg; charset=UTF-8");
        	else if (fileExt.equals("png")) 		
        		response.setHeader("Content-Type", "image/png; charset=UTF-8");
        	else if (fileExt.equals("gif")) 		
        		response.setHeader("Content-Type", "image/gif; charset=UTF-8");
        	else if (fileExt.equals("htm") || fileExt.equals("html")) 
        		response.setHeader("Content-Type", "text/html; charset=UTF-8");
        	else if (fileExt.equals("txt") || fileExt.equals("ini")) 
        		response.setHeader("Content-Type", "text/plan; charset=UTF-8");
        	        	
            /*
        	else if (fileExt.equals("doc"))		
            	response.setHeader("Content-Type", "application/msword; charset=UTF-8");
            else if (fileExt.equals("docx") || fileExt.equals("xlsx") || fileExt.equals("pptx"))		
            	response.setHeader("Content-Type", "application/vnd.openxml; charset=UTF-8");
        	else if (fileExt.equals("xls")) 		
        		response.setHeader("Content-Type", "application/vnd.ms-excel; charset=UTF-8");
        	else if (fileExt.equals("ppt")) 		
        		response.setHeader("Content-Type", "application/vnd.ms-powerpoint; charset=UTF-8");
        	*/
            
        	else
        		response.setHeader("Content-Type", "application/octet-stream; charset=UTF-8");
        		
            OutputStream out = response.getOutputStream();
            FileInputStream fis = null;
            try {
                fis = new FileInputStream(file);
                FileCopyUtils.copy(fis, out);
            } catch(Exception e){
                e.printStackTrace();
            }finally{
                if(fis != null){
                    try{
                        fis.close();
                    }catch(Exception e){
                    	e.printStackTrace();
                    }
                }
                
                if(out != null) {
                	out.flush();
                }
            }
            
        }
	}
}
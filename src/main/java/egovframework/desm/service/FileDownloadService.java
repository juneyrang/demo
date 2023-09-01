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

public class FileDownloadService extends AbstractView {

	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		File file = (File)model.get("downloadFile");
		String fileNameOrg = (String)model.get("fileNameOrg");
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
            response.setContentType(getContentType());
            response.setContentLength((int)file.length());
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\";");
            response.setHeader("Content-Transfer-Encoding", "binary");
            
            //파일 종류별로 preview를 제공하기 위해서는 Content-Disposition 제거 및 아래의 Content-Type 파일에 맞게 설정 필요함
            //추후 필요에 따라 별도의 서비스로 분리하여 작업 
            //response.setHeader("Content-Type", "application/pdf; charset=UTF-8");
            
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
package egovframework.desm.cmmn;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

public class FileResizeUtil {
	private static final Logger logger = LoggerFactory.getLogger(FileResizeUtil.class);

	public void imageFileResize(MultipartFile myfile,File uploadFile, Map<String, Object> paramMap ) throws Exception{
		String imageCheckPath = System.getProperty("java.io.tmpdir") + "\\" + paramMap.get("ORGN_FILE_NM").toString();
    	File imageCheckFile = new File(imageCheckPath);
    	myfile.transferTo(imageCheckFile);

    	if(isImage(imageCheckPath)){
    		File resizeFile = imageCheckFile;
    		try{
        		if(500000 < imageCheckFile.length()){
        			resizeFile = imageFileResizeSetup(imageCheckFile ,imageCheckPath );
        			paramMap.put("ATT_FILE_SIZ", resizeFile.length());
        		}
    		}catch(Exception e){
    			e.printStackTrace();
    		}
    		resizeFile.renameTo(uploadFile);
    	}else{
    		myfile.transferTo(uploadFile);
    	}
	}
	
	private boolean isImage(String filepath){
        boolean result = false;
        File f = new File(filepath);
        try {
            BufferedImage buf = ImageIO.read(f);
            if(buf == null){
                result = false;
            } else {
                result = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

	private File imageFileResizeSetup(File uploadFile ,String path ) throws Exception {
	   logger.info("image original : " + uploadFile.length());

	   Image img = new ImageIcon(uploadFile.toString()).getImage(); // 파일 정보 추출
       int width = (int) (img.getWidth(null)*(0.7)); // 리사이즈할 가로 길이
       int height = (int) (img.getHeight(null)*(0.7)); // 리사이즈할 세로 길이
       while( width > 1980 ){
    	   width = (int) (width * 0.7);
    	   height = (int) (height * 0.7);
       }
       BufferedImage resizedImage = resize(uploadFile ,width , height );
       // 리사이즈 실행 메소드에 값을 넘겨준다.
       String type = path.split(".").length == 2 ? path.split(".")[1] : "jpg";
       ImageIO.write(resizedImage, type, new File(path));
       // 리사이즈된 파일, 포맷, 저장할 파일경로
       File resizeFile = new File(path);

       logger.info("image resize : " + resizeFile.length());
  	   logger.info("image resize file : " + path);
       return resizeFile;
	}

	private BufferedImage resize(File file, int width, int height)throws IOException {
		 InputStream inputStream = new FileInputStream(file);
	     BufferedImage inputImage = ImageIO.read(inputStream);  // 받은 이미지 읽기
	     BufferedImage outputImage = new BufferedImage(width, height, inputImage.getType());
	     Graphics2D graphics2D = outputImage.createGraphics();
	     /* Test Code
	     graphics2D.setComposite(AlphaComposite.Src);
	     Map<RenderingHints.Key,Object> hints = new HashMap<>();
	     hints.put(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
	     hints.put(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
	     hints.put(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
	     graphics2D.addRenderingHints(hints);
	      */
	     graphics2D.drawImage(inputImage, 0, 0, width, height, null); // 그리기
	     graphics2D.dispose(); // 자원해제
	     inputStream.close();
	     return outputImage;
	 }
}

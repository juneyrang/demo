package egovframework.desm.cmmn;

import java.security.MessageDigest;
import java.security.SecureRandom;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class UserPasword  {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserPasword.class);
	

    
    boolean debug;
	
	public UserPasword() {
        super();
       
   }
	
    public String getSALT() throws Exception {
		SecureRandom rnd = new SecureRandom();
		byte[] temp = new byte[16];
		rnd.nextBytes(temp);
		
		return Byte_to_String(temp);    	
    }
    
    public String setHashing(String pw, String Salt) throws Exception {
    	MessageDigest md = MessageDigest.getInstance("SHA-512");
    	byte[] password = null;
		//for(int i = 0; i < 10000; i++) {
			String temp = pw + Salt;						// 패스워드와 Salt 를 합쳐 새로운 문자열 생성 
			md.update(temp.getBytes());						// temp 의 문자열을 해싱하여 md 에 저장해둔다 
			password = md.digest();							// md 객체의 다이제스트를 얻어 password 를 갱신한다 
		//}    	
		
		return Byte_to_String(password);    	
    }    
    
    
    
    private String Byte_to_String(byte[] temp) throws Exception {
		StringBuilder sb = new StringBuilder();
		for(byte a : temp) {
			sb.append(String.format("%02x", a));
		}
		return sb.toString();   	
    } 	
	

}

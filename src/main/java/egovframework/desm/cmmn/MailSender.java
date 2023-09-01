package egovframework.desm.cmmn;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.mail.Address;
import javax.mail.Authenticator;
import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;
import javax.mail.util.ByteArrayDataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class MailSender  {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MailSender.class);
	
	private String host;
    private String port;
    private String encoding;
    private String username;
    private String password;
    
    boolean debug;
	
	public MailSender(Map<String, Object> mailMap) {
        super();
//        this.host = mailMap.get("host").toString();
//        this.port = mailMap.get("port").toString();
//        this.encoding = mailMap.get("encoding").toString();
//        this.username = mailMap.get("username").toString();
//        this.password = mailMap.get("password").toString();
        //하드코딩
        this.host = "krrelay.corp.doosan.com";
        this.port = "25";
        this.encoding = "EUC-KR";
        this.username = "";
        this.password = "";
   }
	
	protected boolean requireAuthenticate() {
		return username != null && password != null;
	}
	
	protected Properties createProperties() {
		Properties properties = new Properties();
		properties.put("mail.smtp.host", host);
		properties.put("mail.smtp.port", port);
		properties.put("mail.smtp.auth", requireAuthenticate());
		return properties;
	}
	
	protected Authenticator createAuthenticator() {
		return new DefaultAuthenticator(username, password);
	}
	
	public void sendMail(Map<String, Object> mailMap) throws MessagingException, UnsupportedEncodingException{
		Session session = null;
		if (requireAuthenticate()) {
			try {
				session = Session.getDefaultInstance(createProperties(), createAuthenticator());
			} catch (SecurityException exception) {
				LOGGER.debug("메일서버(SMTP)가 연동되어 있지 않습니다.");
			}
			 
		} else {
			session = Session.getDefaultInstance(createProperties());
		}	
		
		session.setDebug(debug);
		MimeMessage message = new MimeMessage(session);
		Multipart multiPart = new MimeMultipart();
		
		Address from = createAddress((String)mailMap.get("from_addr"), (String)mailMap.get("from_nm"));
		message.setFrom(from);
		message.setSubject(mailMap.get("mail_tit").toString(), encoding);
		
		// 숨은참조 리스트 처리
		if(mailMap.get("bcc_addr") != null) {
			String[] bccArr = (String[])mailMap.get("bcc_addr");
			InternetAddress[] bccAddr = new InternetAddress[bccArr.length];
			for(int i = 0; i < bccArr.length; i++) {
				bccAddr[i] = new InternetAddress (bccArr[i], "");
				
			}
			message.setRecipients(RecipientType.BCC, bccAddr);
		}
		
		// 수신 리스트 처리
		if(mailMap.get("to_list_addr") != null) {
			String[] toListArr = (String[])mailMap.get("to_list_addr");
			InternetAddress[] toListAddr = new InternetAddress[toListArr.length];
			for(int i = 0; i < toListArr.length; i++) {
				toListAddr[i] = new InternetAddress (toListArr[i], "");
			}
			message.setRecipients(RecipientType.TO, toListAddr);
		}
		
		// 참조 리스트 처리
		if(mailMap.get("cc_list_addr") != null) {
			String[] ccListArr = (String[])mailMap.get("bcc_addr");
			InternetAddress[] ccListAddr = new InternetAddress[ccListArr.length];
			for(int i = 0; i < ccListArr.length; i++) {
				ccListAddr[i] = new InternetAddress (ccListArr[i], "");
			}
			message.setRecipients(RecipientType.CC, ccListAddr);
		}
		
		// 수신 단일 처리
		if(mailMap.get("to_addr") != null) {
			message.addRecipient(RecipientType.TO, createAddress((String)mailMap.get("to_addr"), (String)mailMap.get("to_nm")));
		}
		
		// 참조 단일 처리
		if(mailMap.get("cc_addr") != null) {
			message.addRecipient(RecipientType.CC, createAddress((String)mailMap.get("cc_addr"), (String)mailMap.get("cc_nm")));
		}

		MimeBodyPart body = new MimeBodyPart();
		body.setHeader("Content-Transfer-Encoding", "base64");
		body.setContent((String)mailMap.get("mail_cont"), "text/html; charset=\"" + encoding + "\"");
		multiPart.addBodyPart(body);
		
		Map<String, Object> attFile = new HashMap<String, Object>();
		FileInputStream fis = null;
		File file = null;
		
		try {
			if(mailMap.get("attFile") != null) {
				attFile = (Map<String, Object>) mailMap.get("attFile");
				
				ByteArrayDataSource dataSource;
				fis = new FileInputStream(attFile.get("filePath").toString());
				file = new File(attFile.get("filePath").toString());
				
				dataSource = new ByteArrayDataSource(fis, "application/octet-stream");
				String attachmentName = MimeUtility.encodeText(
						attFile.get("file_name").toString(), encoding, "B");
				MimeBodyPart attachmentBody = new MimeBodyPart();
				attachmentBody.setHeader("Content-Transfer-Encoding", "base64");
				attachmentBody.setDataHandler(new DataHandler(dataSource));
				attachmentBody.setFileName(attachmentName);
		
				multiPart.addBodyPart(attachmentBody);
			}
		} catch (IOException e) {
			LOGGER.error(e.getMessage());
		} finally {
			try {
				if (fis != null)
					fis.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}		
		
		message.setContent(multiPart);
		message.setSentDate(new Date());
		
		Transport.send(message);
		
	}
	
	private Address createAddress(String address, String name) throws UnsupportedEncodingException {
		InternetAddress ia = new InternetAddress(address, name);
		
		String personal = ia.getPersonal();
		if(personal != null){
			ia.setPersonal(personal, encoding);
		}
		return ia;
	}
	
	public static class DefaultAuthenticator extends Authenticator {

		private final PasswordAuthentication authentication;

		public DefaultAuthenticator(String username, String password) {
			super();
			this.authentication = new PasswordAuthentication(username, password);
		}

		protected PasswordAuthentication getPasswordAuthentication() {
			return this.authentication;
		}
	}
}

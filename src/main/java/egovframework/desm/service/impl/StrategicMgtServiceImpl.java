/**
 * 운송관리 > 전략물자관리
 */
package egovframework.desm.service.impl;

import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.desm.cmmn.MailSender;
import egovframework.desm.service.StrategicMgtService;
import egovframework.desm.web.StrategicMgtController;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import freemarker.template.TemplateException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service( "strategicMgtService" )
public class StrategicMgtServiceImpl extends EgovAbstractServiceImpl implements StrategicMgtService {

	private static final Logger logger = LoggerFactory.getLogger(StrategicMgtServiceImpl.class);
	
	@Resource( name = "strategicMgtDAO" )
	private StrategicMgtDAO strategicMgtDAO;
	
	@Resource(name = "idsmFileDAO")
	private IdsmFileDAO idsmFileDAO;
	
	@Resource(name = "transShippingRequestDAO")
	private TransShippingRequestDAO transShippingRequestDAO;

	/**
	 * 운송관리 > 전략물자관리 > 목록 조회
	 */
	@Override
	public List< Map< String, Object > > selectStrategicMgtList( Map< String, Object > paramMap ) {
		return strategicMgtDAO.selectStrategicMgtList( paramMap );
	}

	/**
	 * 운송관리 > 전략물자관리 > 승인 상태 변경
	 */
	@SuppressWarnings("unchecked")
	@Override
	public int updateStrategicMgtListStatus( Map< String, Object > paramMap ) throws Exception{
		int cnt = 0;

		try {
			JSONArray parmList = JSONArray.fromObject( paramMap.get("parmList").toString() );

			for(int i = 0; i < parmList.size(); i++) {
				JSONObject			obj = (JSONObject)parmList.get(i);
				Map<String, Object>	row = new ObjectMapper().readValue(obj.toString(), Map.class);

				row.put( "USER_AD", paramMap.get("USER_AD").toString() );
				row.put( "btnType", paramMap.get("btnType").toString() );

				cnt = strategicMgtDAO.updateStrategicMgtListStatus( row );
			}
		}
		catch (Exception e) {
			System.out.println("!!!!!!" + e.toString());
			throw new Exception(e.toString());
		}
		return cnt;
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 상세 조회
	 */
	@Override
	public List< Map< String, Object > > selectStrategicMgtDetailPop(Map<String, Object> paramMap) {
		List<Map<String, Object>> resultList = strategicMgtDAO.selectStrategicMgtDetailPop(paramMap);

		return resultList;
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 전략물자 판정 List 조회
	 */
	@Override
	public List< Map< String, Object > > selectStrategicMgtDetailPopPackageNoList(Map<String, Object> paramMap) {
		List<Map<String, Object>> resultList = strategicMgtDAO.selectStrategicMgtDetailPopPackageNoList(paramMap);

		return resultList;
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 전략물자 판정 List 저장
	 */
	@SuppressWarnings("unchecked")
	public int saveStrategicMgtDetailPopPackageNoList( Map< String, Object > paramMap ) throws Exception {
		int		cnt		= 0;
		String	rowType	="";
		try {
			JSONArray insertList = JSONArray.fromObject( paramMap.get( "cuPackageNoList" ).toString() );

			for( int i=0; i<insertList.size(); i++ ) {
				JSONObject			obj = (JSONObject)insertList.get( i );
				Map<String, Object>	row = new ObjectMapper().readValue(obj.toString(), Map.class);

				row.put( "strategicMasterId", paramMap.get("strategicMasterId").toString()	);
				row.put( "USER_AD"			, paramMap.get("USER_AD").toString()			);

				rowType = row.get("rowType").toString();
				logger.info( "rowType: [" + rowType + "]");

				if( null != rowType && "i".equals( rowType ) ) {
					cnt = strategicMgtDAO.insertStrategicMgtDetailPopPackageNoList( row );
				} else {
					cnt = strategicMgtDAO.updateStrategicMgtDetailPopPackageNoList( row );
				}
			}
		}
		catch (Exception e) {
			System.out.println("!!!!!!" + e.toString());
			throw new Exception(e.toString());
		}
		return cnt;
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 전략물자 판정 List 삭제
	 */
	@SuppressWarnings("unchecked")
	@Override
	public int deleteStrategicMgtDetailPopPackageNoList( Map< String, Object > paramMap ) throws Exception{
		int cnt = 0;

		try {
			JSONArray deleteList = JSONArray.fromObject(paramMap.get("deletePackageNoList").toString());

			for(int i = 0; i < deleteList.size(); i++) {
				JSONObject			obj = (JSONObject)deleteList.get(i);
				Map<String, Object>	row = new ObjectMapper().readValue(obj.toString(), Map.class);

				cnt = strategicMgtDAO.deleteStrategicMgtDetailPopPackageNoList( row );
			}
		}
		catch (Exception e) {
			System.out.println("!!!!!!" + e.toString());
			throw new Exception(e.toString());
		}
		return cnt;
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 전략물자 판정 List 삭제
	 */
	@SuppressWarnings("unchecked")
	@Override
	public int deleteAllStrategicMgtDetailPopPackageNoList( Map< String, Object > paramMap ) throws Exception{
		int cnt = 0;

		try {
			cnt = strategicMgtDAO.deleteAllStrategicMgtDetailPopPackageNoList( paramMap );
		}
		catch (Exception e) {
			System.out.println("!!!!!!" + e.toString());
			throw new Exception(e.toString());
		}
		return cnt;
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 코멘트 목록 조회
	 */
	@Override
	public List< Map< String, Object > > selectStrategicMgtDetailPopComment( Map< String, Object > paramMap ) {
		return strategicMgtDAO.selectStrategicMgtDetailPopComment( paramMap );
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 코멘트 목록 저장
	 */
	@SuppressWarnings("unchecked")
	@Override
	public int insertStrategicMgtDetailPopComment( Map< String, Object > paramMap ) throws Exception {
		int cnt = 0;

		try {
			JSONArray insertList = JSONArray.fromObject( paramMap.get( "insertCommentList" ).toString() );

			for( int i=0; i<insertList.size(); i++ ) {
				JSONObject			obj = (JSONObject)insertList.get( i );
				Map<String, Object>	row = new ObjectMapper().readValue(obj.toString(), Map.class);

				row.put( "strategicMasterId", paramMap.get("strategicMasterId").toString()	);
				row.put( "USER_AD"			, paramMap.get("USER_AD").toString()			);

				cnt = strategicMgtDAO.insertStrategicMgtDetailPopComment( row );
			}
		}
		catch (Exception e) {
			System.out.println("!!!!!!" + e.toString());
			throw new Exception(e.toString());
		}
		return cnt;
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 코멘트 목록 삭제
	 */
	@SuppressWarnings("unchecked")
	@Override
	public int deleteStrategicMgtDetailPopComment( Map< String, Object > paramMap ) throws Exception{
		int cnt = 0;

		try {
			JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteCommentList").toString());

			for(int i = 0; i < deleteList.size(); i++) {
				JSONObject			obj = (JSONObject)deleteList.get(i);
				Map<String, Object>	row = new ObjectMapper().readValue(obj.toString(), Map.class);

				cnt = strategicMgtDAO.deleteStrategicMgtDetailPopComment( row );
			}
		}
		catch (Exception e) {
			System.out.println("!!!!!!" + e.toString());
			throw new Exception(e.toString());
		}
		return cnt;
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 코멘트 목록 삭제
	 */
	@SuppressWarnings("unchecked")
	@Override
	public int deleteAllStrategicMgtDetailPopComment( Map< String, Object > paramMap ) throws Exception{
		int cnt = 0;

		try {
			cnt = strategicMgtDAO.deleteAllStrategicMgtDetailPopComment( paramMap );
		}
		catch (Exception e) {
			System.out.println("!!!!!!" + e.toString());
			throw new Exception(e.toString());
		}
		return cnt;
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 첨부파일 삭제
	 */
	@SuppressWarnings("unchecked")
	@Override
	public int deleteDlgTransStrategicMgtAttCopyList( Map< String, Object > paramMap ) throws Exception{
		int cnt = 0;

		try {
			cnt = strategicMgtDAO.deleteDlgTransStrategicMgtAttCopyList( paramMap );
		}
		catch (Exception e) {
			System.out.println("!!!!!!" + e.toString());
			throw new Exception(e.toString());
		}
		return cnt;
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 수정
	 */
    @Override
    public int saveStrategicMgtDetailPop(Map<String, Object> paramMap) throws Exception {
    	
    	int cnt = 0;
    	try {
    		
    		if(paramMap.get("REQ_MASTER_ID") == null || paramMap.get("REQ_MASTER_ID").toString().equals("")) {
    			List<Map<String, Object>> seqList = transShippingRequestDAO.getTransShippingRequestSeq(null);
    			paramMap.put("REQ_MASTER_ID", seqList.get(0).get("SHIPPING_M_SEQ").toString());
    		}
    		
    		cnt = transShippingRequestDAO.saveTransShippingRequestMst(paramMap);		
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }
    		
    		
	@Override
	public int updateStrategicMgtDetailPop( Map<String, Object> paramMap ) throws Exception {
		int cnt = 0;
		try {

			cnt = strategicMgtDAO.updateStrategicMgtDetailPop( paramMap );
		}
		catch (Exception e) {
			System.out.println("!!!!!!" + e.toString());
			throw new Exception(e.toString());
		}
		return cnt;
	}
	
	@Override
	public int deleteStrategicMgtDetailPop( Map<String, Object> paramMap ) throws Exception {
		int cnt = 0;
		try {
	
			cnt = strategicMgtDAO.deleteStrategicMgtDetailPop( paramMap );
		}
		catch (Exception e) {
			System.out.println("!!!!!!" + e.toString());
			throw new Exception(e.toString());
		}
		return cnt;
	}

    @Override
    public int sendMailStrategicMgt(Map<String, Object> paramMap) throws Exception {    	
    	int cnt = 0;
    	try {
    		
			cnt = this.sendMailStrategicMgtMailData(paramMap);
			
			if(cnt < 0) {
				return cnt;
			}
					
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }
    
	public int sendMailStrategicMgtMailData(Map<String, Object> paramMap) {
		
		int cnt = 0;				

		
		try {
			
			Map<String, Object> mailInfo = new HashMap<String, Object>();
			
			String mailReceiverList = "";
			
			List<Map<String, Object>> mailContentList = strategicMgtDAO.getStrategicMgtMailMstData(paramMap); 
			Map<String, Object> mailContent = mailContentList.get(0);
			
			List<Map<String, Object>> commentList = strategicMgtDAO.getStrategicMgtMailCommentData(paramMap);
		
			
			List<Map<String, Object>> listMailReceiver = new ArrayList<Map<String,Object>>();
			if(mailContent.get("STATUS").toString().equals("Pre-Judgment") || mailContent.get("STATUS").toString().equals("Pre-Approved") || mailContent.get("STATUS").toString().equals("Pre-Conditional-Approved")) {
				mailContent.put("SENDER", mailContent.get("LAST_UPDATED_BY"));
				mailContent.put("SENDER_NM", mailContent.get("LAST_UPDATED_BY_NM"));
				mailContent.put("SENDER_EMAIL", mailContent.get("LAST_UPDATED_BY_EMAIL"));		
				
				listMailReceiver = strategicMgtDAO.getStrategicMgtMailReceiver(paramMap); // 전략물자담당자(51)권한자 리스트 가져옴
				
				Map<String, Object> mailReceiver = new HashMap<String, Object>();
				mailReceiver.put("EMAIL", mailContent.get("LAST_UPDATED_BY_EMAIL"));
				listMailReceiver.add(mailReceiver);	
				
				if(!mailContent.get("LAST_UPDATED_BY_EMAIL").toString().equals(mailContent.get("CREATED_BY_EMAIL").toString())) {
					mailReceiver.put("EMAIL", mailContent.get("CREATED_BY_EMAIL"));
					listMailReceiver.add(mailReceiver);	
				}
			}
			else if(mailContent.get("STATUS").toString().equals("Approved") || mailContent.get("STATUS").toString().equals("Conditional-Approved") || mailContent.get("STATUS").toString().equals("Rejected")) {
				
				String sender = mailContent.get("APPROVER") == null ? mailContent.get("JUDGED_BY").toString() : mailContent.get("APPROVER").toString();
				String senderNm = mailContent.get("APPROVER") == null ? mailContent.get("JUDGED_BY_NM").toString() : mailContent.get("APPROVER_NM").toString();
				String senderEmail = mailContent.get("APPROVER") == null ? mailContent.get("JUDGED_BY_EMAIL").toString() : mailContent.get("APPROVER_EMAIL").toString();
				
				mailContent.put("SENDER", sender);
				mailContent.put("SENDER_NM", senderNm);
				mailContent.put("SENDER_EMAIL", senderEmail);
				
				Map<String, Object> mailReceiver = new HashMap<String, Object>();
				mailReceiver.put("EMAIL", mailContent.get("LAST_UPDATED_BY_EMAIL"));
				listMailReceiver.add(mailReceiver);
				
				if(!mailContent.get("LAST_UPDATED_BY_EMAIL").toString().equals(mailContent.get("CREATED_BY_EMAIL").toString())) {
					mailReceiver.put("EMAIL", mailContent.get("CREATED_BY_EMAIL"));
					listMailReceiver.add(mailReceiver);	
				}				
				
			}
			else if(mailContent.get("STATUS").toString().equals("Judged")) {
				mailContent.put("SENDER", mailContent.get("JUDGED_BY"));
				mailContent.put("SENDER_NM", mailContent.get("JUDGED_BY_NM"));
				mailContent.put("SENDER_EMAIL", mailContent.get("JUDGED_BY_EMAIL"));
				
				Map<String, Object> mailReceiver = new HashMap<String, Object>();
				mailReceiver.put("EMAIL", mailContent.get("LAST_UPDATED_BY_EMAIL"));
				listMailReceiver.add(mailReceiver);
				
				if(!mailContent.get("LAST_UPDATED_BY_EMAIL").toString().equals(mailContent.get("CREATED_BY_EMAIL").toString())) {
					mailReceiver.put("EMAIL", mailContent.get("CREATED_BY_EMAIL"));
					listMailReceiver.add(mailReceiver);	
				}				
			}
			
			// 승인완료되었을 때에만 출하요청 수신담당자에게 메일 발송이 될 수 있도록 수정 (+ 글로넷 담당자 포함)
			// FOB건(ZSHP_SHIPPING_REQ_M.ATTRIBUTE4 = 'Y', 매뉴얼생성)에 대해서는 이윤숙 수석님이 수신되도록(매뉴얼 생성건은 메일수신자 테이블에 값이 없음)
			//List<Map<String, Object>> listMailReceiverAdd = strategicMgtDAO.getStrategicMgtMailReceiverAdd(paramMap); // 출하요청의 메일 수신자 포함시키기(글로넷은 제외되어있음).
			List<Map<String, Object>> listMailReceiverAdd = null;
			
			if(mailContent.get("STATUS").toString().equals("Approved")
					|| mailContent.get("STATUS").toString().equals("Conditional-Approved")
					|| mailContent.get("STATUS").toString().equals("Rejected")) {
				listMailReceiverAdd = strategicMgtDAO.getStrategicShippingReqReceiverList(paramMap);
			}
			
			if(listMailReceiverAdd != null && listMailReceiverAdd.size() != 0) {
				for (Map<String, Object> mailReceiverAdd : listMailReceiverAdd) {
					boolean mailCheck = true;
					for (Map<String, Object> receiver : listMailReceiver) {
						if(mailReceiverAdd.get("EMAIL").toString().equals(receiver.get("EMAIL").toString()))
						{
							mailCheck = false;
						}
					}
					
					if(mailCheck) {
						listMailReceiver.add(mailReceiverAdd);
					}
				}
			}
			
			for (Map<String, Object> receiver : listMailReceiver) {
				mailReceiverList += receiver.get("EMAIL").toString();
				mailReceiverList += "; ";
			}
			mailContent.put("mailReceiverList", mailReceiverList);			
		
			mailInfo.put("mailData", mailContent);
			mailInfo.put("receivePerson", listMailReceiver);
			mailInfo.put("commentList", commentList);
		
			mailInfo.put("LOGIN_URL", paramMap.get("LOGIN_URL").toString());
			mailInfo.put("USER_AD", paramMap.get("USER_AD").toString());
			
			mailInfo.put("location", paramMap.get("location"));
			mailInfo.put("host", paramMap.get("host"));
			mailInfo.put("port", paramMap.get("port"));
			mailInfo.put("encoding", paramMap.get("encoding"));
			mailInfo.put("username", paramMap.get("username"));
			mailInfo.put("password", paramMap.get("password"));

			
			cnt = this.sendMailStrategicMgtMail(mailInfo);
			
		} catch (Exception e) {
			cnt = -2;
			e.printStackTrace();
		}
		return cnt;
	} 
	
	public int sendMailStrategicMgtMail(Map<String, Object> param) {
		int cnt = 0;
		
		final Map<String, Object> paramInfo = new HashMap<String, Object>();
		
		Map<String, Object> mailData = (Map<String, Object>) param.get("mailData");  // 메일정보
		List<Map<String, Object>> personList = (List<Map<String, Object>>) param.get("receivePerson");  // 수신자 정보
		List<Map<String, Object>> commentList = (List<Map<String, Object>>) param.get("commentList");  // Invoice List
		List<Map<String, Object>> mailList = new ArrayList<Map<String, Object>>();

		try {
			
			for (final Map<String, Object> commentRow : commentList) {
				
				commentRow.put("no", commentRow.get("RN"));
				commentRow.put("comments", commentRow.get("COMMENTS"));
				commentRow.put("created_by", commentRow.get("CREATED_BY_NM"));
				commentRow.put("creation_date", commentRow.get("CREATION_DATE"));
			}

			
			for (final Map<String, Object> receiver : personList) { 
				Map<String, Object> content = new HashMap<String, Object>();
				
				content.put("shipping_req_no", mailData.get("SHIPPING_REQ_NO") == null ? "&nbsp;" : mailData.get("SHIPPING_REQ_NO").toString());
				content.put("invoice_no", mailData.get("INVOICE_NO") == null ? "&nbsp;" : mailData.get("INVOICE_NO").toString());
				content.put("last_updated_by", mailData.get("SENDER_NM") == null ? "&nbsp;" : mailData.get("SENDER_NM").toString());
				content.put("status", mailData.get("STATUS_NM") == null ? "&nbsp;" : mailData.get("STATUS_NM").toString());
				content.put("project_id", mailData.get("PROJECT_ID") == null ? "&nbsp;" : mailData.get("PROJECT_ID").toString());
				content.put("project_desc", mailData.get("PROJECT_DESC") == null ? "&nbsp;" : mailData.get("PROJECT_DESC").toString());
				content.put("description", mailData.get("DESCRIPTION") == null ? "&nbsp;" : mailData.get("DESCRIPTION").toString());
				content.put("attribute1", mailData.get("ATTRIBUTE1") == null ? "&nbsp;" : mailData.get("ATTRIBUTE1").toString());
				content.put("IsThirdCountry", mailData.get("IS_THIRD_COUNTRY") == null ? "&nbsp;" : mailData.get("IS_THIRD_COUNTRY").toString());
				
				content.put("isSpecialShipping", mailData.get("IS_SPECIAL_SHIPPING") == null ? "&nbsp;" : mailData.get("IS_SPECIAL_SHIPPING").toString()); //IS_SPECIAL_SHIPPING (특송)
				content.put("isFob", mailData.get("IS_FOB") == null ? "&nbsp;" : mailData.get("IS_FOB").toString()); // IS_FOB
				
				content.put("list_data", commentList);
				
				content.put("login_url", param.get("LOGIN_URL").toString());
				
				
				// 메일본문에 메일 수신자 임시 추가
				content.put("mailReceiverList", mailData.get("mailReceiverList") == null ? "&nbsp;" : mailData.get("mailReceiverList").toString());
					
					
				Map<String, Object> rowData = new HashMap<String, Object>();
				rowData.put("from_addr", "ews_desm@doosan.com");
				rowData.put("from_nm", "DESM Alarm Service");
				
				rowData.put("to_addr", (String) receiver.get("EMAIL"));
				
				if(param.get("location").toString().equals("dev")) {
					logger.info("Add receiver :: " + rowData.get("to_addr").toString());
					//rowData.put("to_addr", "seunghwan2.jung@doosan.com");
					rowData.put("to_addr", "hanbyul1.lee@doosan.com");
				}
				
				rowData.put("title", "");
				rowData.put("shipping_req_m", mailData.get("SHIPPING_REQ_NO") == null ? "&nbsp;" : mailData.get("SHIPPING_REQ_NO").toString());
				rowData.put("invoice_no", mailData.get("INVOICE_NO") == null ? "&nbsp;" : mailData.get("INVOICE_NO").toString());
				rowData.put("data", content);
				
				rowData.put("USER_AD", param.get("USER_AD"));
				rowData.put("host", param.get("host"));
				rowData.put("port", param.get("port"));
				rowData.put("encoding", param.get("encoding"));
				rowData.put("username", param.get("username"));
				rowData.put("password", param.get("password"));
				
				mailList.add(rowData);
	
			}
			
		} catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		cnt = -2;
    		return cnt;
		}		
		
		cnt = this.addMail("DESM_STRATEGIC_MANAGE_MAIL", mailList);
		return cnt;
	}
	
	public int addMail(String mailKey, List<Map<String, Object>> mailList) {
		int cnt = 0;
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("MAIL_SET_ID", mailKey);
		
		List<Map<String, Object>> mailDetailList = transShippingRequestDAO.getTransShippingRequestMailByMailId(paramMap);
		
		Map<String, Object> mailDetail = mailDetailList.get(0);
		

		String useYn = (String) mailDetail.get("USE_YN");
		if("N".equals(useYn)) {
			return -2;
		}

		try {

			String mail_tit = mailDetail.get("MAIL_SET_NM").toString();
			for(Map<String, Object> row : mailList){
				
				String shipping_req_m = (String)row.get("shipping_req_m");
				String invoice_no = (String)row.get("invoice_no");
				
				mail_tit = mail_tit.replace("${shipping_req_m}", shipping_req_m);
				mail_tit = mail_tit.replace("${invoice_no}", invoice_no);
					
					


				row.put("mail_id"		, UUID.randomUUID().toString());
				row.put("mail_set_id"	, mailKey);
				row.put("mail_tit"		, mail_tit);
				row.put("to_nm"			, row.get("to_nm")); 	//수신자 이름
				row.put("to_addr"		, row.get("to_addr")); 	//수신자 주소
				row.put("from_nm"		, row.get("from_nm"));	//송신자 이름
				row.put("from_addr"		, row.get("from_addr"));//송신자 주소
				row.put("USER_AD"		, row.get("USER_AD"));//송신자 주소
				

				row.put("mail_cont"	, this.mailGenerate(mailKey, row.get("data")));
	
				//DB Insert
				transShippingRequestDAO.insertEsamail(row);
				
			}
			
			String sendClass = (String)mailDetail.get("SND_CLS");
			//실시간 전송, 배치일 경우 스케쥴러에 의해 전송
			if("R".equals(sendClass)) {  
				this.realTimeTransfer(mailList);
			}
		
		} catch (Exception e) {
			cnt = -2;
		}
	
		return cnt;
	}	
	
	public String mailGenerate(String mailKey, Object data) throws TemplateException, IOException{
		 
		//템플릿 아이디 값을 가지고 컨텐츠 내용 조회
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("MAIL_SET_ID", mailKey);
		Map<String, Object> template = ((List<Map<String, Object>>)transShippingRequestDAO.getTransShippingRequestMailByMailId(param)).get(0);
		String content = (String)template.get("TMP_CONT"); 
		
		return this.generate(mailKey,content,data);
	}
	
	public String generate(String appId, String content, Object data) throws TemplateException, IOException{
		StringWriter writer = new StringWriter();
		String replacedContent = replaceSpecialChars(content);
		freemarker.template.Template t = new freemarker.template.Template(appId, new StringReader(replacedContent), null);
		t.process(data, writer);

	
		String result = writer.toString();
		if (logger.isErrorEnabled()) logger.error("result : " + result);
		return result;
	}
	
	private String replaceSpecialChars(String str) {
		if(str == null)
		return null;

		String returnStr = str;
		returnStr = returnStr.replaceAll("<BR>", "\n");
		returnStr = returnStr.replaceAll("&amp;", "&");
		returnStr = returnStr.replaceAll("&gt;", ">");
		returnStr = returnStr.replaceAll("&lt;", "<");
		returnStr = returnStr.replaceAll("&quot;", "\"");
		returnStr = returnStr.replaceAll("&nbsp;", " ");

		return returnStr;
	}
	
	private void realTimeTransfer(List<Map<String, Object>> mailList) {
		for(Map<String, Object> row : mailList){
			send(row);
		}
	}	
	
	private void send(Map<String, Object> mail) {
		
		Map<String, Object> mailParam = new HashMap<String, Object>();  
		
		
		mailParam = ((List<Map<String, Object>>)transShippingRequestDAO.getTransShippingRequestMailById(mail)).get(0);
		MailSender mailSender = new MailSender(mail);
		try{
			mailSender.sendMail(mail);
			mailParam.put("snd_yn", "Y");
		} catch(Exception e) {
			mailParam.put("snd_yn", "N");
			e.printStackTrace();
		} finally {
			transShippingRequestDAO.updateTransShippingRequestMailSendComplete(mailParam);
		}
		
	}
	
    private String formatSeperatedByComma(double val) {
        NumberFormat format = NumberFormat.getNumberInstance();
        return format.format(val);
    }
    
	@Override
	public List< Map< String, Object > > getDlgTransStrategicMgtCopyList( Map< String, Object > paramMap ) {
		return strategicMgtDAO.getDlgTransStrategicMgtCopyList( paramMap );
	}
	
	@Override
	public int saveDlgTransStrategicMgtCopyList( Map< String, Object > paramMap ) throws Exception {
		int cnt = 0;

		try {
			JSONArray insertList = JSONArray.fromObject( paramMap.get( "insertList" ).toString() );

			for( int i=0; i<insertList.size(); i++ ) {
				JSONObject			obj = (JSONObject)insertList.get( i );
				Map<String, Object>	row = new ObjectMapper().readValue(obj.toString(), Map.class);

				row.put( "STRATEGIC_MASTER_ID", paramMap.get("STRATEGIC_MASTER_ID")	);
				row.put( "USER_AD"			, paramMap.get("USER_AD")			);

				cnt = strategicMgtDAO.saveDlgTransStrategicMgtCopyList( row );
			}
		}
		catch (Exception e) {
			System.out.println("!!!!!!" + e.toString());
			throw new Exception(e.toString());
		}
		return cnt;
	}
	
	@Override
	public List< Map< String, Object > > getDlgTransStrategicMgtAttCopyList( Map< String, Object > paramMap ) {
		return strategicMgtDAO.getDlgTransStrategicMgtAttCopyList( paramMap );
	}	
	
	@Override
	public int saveDlgTransStrategicMgtAttCopyList( Map< String, Object > paramMap ) throws Exception {
		int cnt = 0;

		try {
			JSONArray insertList = JSONArray.fromObject( paramMap.get( "insertList" ).toString() );

			for( int i=0; i<insertList.size(); i++ ) {
				JSONObject			obj = (JSONObject)insertList.get( i );
				Map<String, Object>	row = new ObjectMapper().readValue(obj.toString(), Map.class);

				row.put( "ATTACH_GRP_CD", paramMap.get("ATTACH_GRP_CD")	);
				row.put( "USER_AD"			, paramMap.get("USER_AD")			);
				
				boolean whileCheck = true;
				while(whileCheck) {
					row.put("ATT_ID", UUID.randomUUID().toString() + "-file");
					List<Map< String, Object >> fileCheckList = idsmFileDAO.getIdsmSetupDlgItemScheduleFileCheckId(row); 

					if(fileCheckList.size() == 0) {
						whileCheck = false;
					}
				}				

				cnt = strategicMgtDAO.saveDlgTransStrategicMgtAttCopyList( row );
			}
		}
		catch (Exception e) {
			System.out.println("!!!!!!" + e.toString());
			throw new Exception(e.toString());
		}
		return cnt;
	}
	
	@Override
	public int saveDlgTransStrategicMgtAttCopyListMstData( Map< String, Object > paramMap ) throws Exception {
		int cnt = 0;

		try {
				cnt = strategicMgtDAO.saveDlgTransStrategicMgtAttCopyListMstData( paramMap );
		}
		catch (Exception e) {
			System.out.println("!!!!!!" + e.toString());
			throw new Exception(e.toString());
		}
		return cnt;
	}
	
	@Override
    public List<Map<String, Object>> getStrategicEwsList(Map<String, Object> paramMap) {
        return strategicMgtDAO.getStrategicEwsList(paramMap);
    }
	
	@Override
    public int deleteStrategicEwsList(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
			JSONArray deleteList = JSONArray.fromObject(paramMap.get("deleteList").toString());
	    	for(int i = 0; i < deleteList.size(); i++) {
	    		JSONObject obj = (JSONObject)deleteList.get(i);
	    		Map<String, Object> row = new ObjectMapper().readValue(obj.toString(), Map.class);
	    		row.put("USER_AD", paramMap.get("USER_AD").toString());
	    		row.put("P_USER_AD", row.get("P_USER_AD").toString());
	    		row.put("EWS_NAME", row.get("EWS_NAME").toString());

	    		cnt = strategicMgtDAO.deleteStrategicEwsUser(row);
	    	}
    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }
	
	@Override
    public int saveStrategicEwsReceiver(Map<String, Object> paramMap) throws Exception {

    	int cnt = 0;

    	try {
    		cnt = strategicMgtDAO.getStrategicEwsReceiverCount(paramMap);
    		
    		if(cnt > 0) {
    			return -3;
    		}
    		
    		cnt = strategicMgtDAO.insertStrategicEwsReceiver(paramMap);

    	}
    	catch (Exception e) {
    		System.out.println("!!!!!!" + e.toString());
    		throw new Exception(e.toString());
		}
        return cnt;
    }

}
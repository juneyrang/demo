<%
	// 수출통관의뢰 전자결재 Draft 문서 생성을 위한 jsp파일
	// ERP Concurrent를 같이 활용하는데 이 때 ERP관련 DB에 Draft문서를 갖고있는게 아니라 필요할 때 url을 호출하여 가져온다. 그러기 위한 용도
	// TestURL : http://localhost:8090/showExpDoc.do?exportHeaderId=67096
	// DEVURL : http://dhbppdev.corp.doosan.com:7140/showExpDoc.do?exportHeaderId=67096
	// DEVURL : http://dhbppdev.corp.doosan.com:7140/showExpDoc.do?exportHeaderId=67117 // 윤지원 차장
    response.setHeader("Pragma","no-cache");
    response.setDateHeader("Expires",0);
    response.setHeader("Cache-Control","no-store");
%>
<%@ page contentType="text/html;charset=euc-kr"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.net.*,java.io.*"%>
<%
	Map values = (Map)request.getAttribute("exportInfo");
	// 수출통관의뢰 관련 정보
	String project_no = String.valueOf(values.get("PROJECT_NO"));
	String project_name = String.valueOf(values.get("PROJECT_NAME"));
	String invoice_no = String.valueOf(values.get("INVOICE_NO"));
	String port_of_loading_desc = String.valueOf(values.get("PORT_OF_LOADING_DESC"));
	String port_of_destination_desc = String.valueOf(values.get("PORT_OF_DESTINATION_DESC"));
	String exporter = String.valueOf(values.get("EXPORTER"));
	String manufacturer = String.valueOf(values.get("MANUFACTURER"));
	String price_terms = String.valueOf(values.get("PRICE_TERMS"));
	String ship_name = String.valueOf(values.get("SHIP_NAME"));
	String customs_type = String.valueOf(values.get("CUSTOMS_TYPE"));
	String total_amount = String.valueOf(values.get("TOTAL_AMOUNT"));
	String currency_code = String.valueOf(values.get("CURRENCY_CODE"));
	String exchage_type = String.valueOf(values.get("EXCHAGE_TYPE"));
	String exchage_date = String.valueOf(values.get("EXCHAGE_DATE"));
	String main_item = String.valueOf(values.get("MAIN_ITEM"));
	String net_weight = String.valueOf(values.get("NET_WEIGHT"));
	String net_weight_unit = String.valueOf(values.get("NET_WEIGHT_UNIT"));
	String gross_weight = String.valueOf(values.get("GROSS_WEIGHT"));
	String gross_weight_unit = String.valueOf(values.get("GROSS_WEIGHT_UNIT"));
	String packing_count = String.valueOf(values.get("PACKING_COUNT"));
	String item_stored_place = String.valueOf(values.get("ITEM_STORED_PLACE"));
	String created_by_name = String.valueOf(values.get("CREATED_BY_NAME"));
	String creator_team = String.valueOf(values.get("CREATOR_TEAM"));
	String sageup_po = String.valueOf(values.get("SAGEUP_PO"));
	String remarks = String.valueOf(values.get("REMARKS"));
	String export_no = String.valueOf(values.get("EXPORT_NO"));
	String is_carried_in_yn = String.valueOf(values.get("IS_CARRIED_IN_YN"));
	String dangsahg_po = String.valueOf(values.get("DANGSAHG_PO"));
	String export_header_id = String.valueOf(values.get("EXPORT_HEADER_ID"));
	// 전자결재 관련 Final Value
	String moduleName = "EXP-211F514B-7472-4BA7-8BA4-75A42077F197";
	String webServerHost = (String)request.getAttribute("portalInterface");
	// 전자결재 관련 Value
	String erpUserId = String.valueOf(values.get("USER_AD"));
	String masterSequenceId = String.valueOf(values.get("MASTER_SEQUENCE_ID"));
	String currentDate 		= String.valueOf(values.get("CURRENT_DATE"));	//Tools.getToday("yyyy-MM-dd");
	String dueDate 			= String.valueOf(values.get("DUE_DATE"));			//Tools.addDate(currentDate, 'd', 3);
	String CurrentYear 		= String.valueOf(values.get("CURRENT_YEAR"));	//Tools.getToday("yyyy");
	String supervisorForerpUserId = String.valueOf(values.get("SUPERVISOR_ID"));
	// DESM관리필드 추가
	String is_re_export = String.valueOf(values.get("IS_RE_EXPORT"));
	String is_original_export = String.valueOf(values.get("IS_ORIGINAL_EXPORT"));
	String is_fta_origin = String.valueOf(values.get("IS_FTA_ORIGIN"));
	String loading_bonded_area = String.valueOf(values.get("LOADING_BONDED_AREA"));
	String certificate_duedate = String.valueOf(values.get("CERTIFICATE_DUEDATE"));
	String strategic_material = String.valueOf(values.get("IS_STRATEGIC_MATERIAL"));
	String export_license_number = String.valueOf(values.get("EXPORT_LICENSE_NUMBER"));
	String fta_name = String.valueOf(values.get("FTA_NAME"));
	// 전자결재 관련 추가 Value
	//String ccDeptCode = "";
	String ccUserId = String.valueOf(values.get("CC_USER_ID")); // 사용안함 아래 CCPOINT에 하드코딩함.
	// 첨부파일
	String fileUrl = String.valueOf(values.get("FILE_URL"));
	List attachList = (List) request.getAttribute("attachList");
	// 제조사 사업자번호
	String manufacturer_segment = String.valueOf(values.get("MANUFACTURER_SEGMENT"));
	manufacturer_segment = (manufacturer_segment.isEmpty() ? "" : " (" + manufacturer_segment + ")");

	StringBuffer contents = new StringBuffer();
	contents.append("<body>");
	contents.append("	<table border='1' style='background-color:#FFFFFF;border-collapse:collapse;border:1px solid #000000;color:#000000;width:80%;margin-top:20px;margin-left:20px;word-break:break-all;' cellpadding='10' cellspacing='1'>");
	contents.append("		<colgroup><col style='width:25%'><col style='width:25%'><col style='width:25%'><col style='width:25%'></colgroup>");
	contents.append("		<tr height='80' style='background-color:#ECECEC;font-weight:bold;font-size:1.5rem'><th colspan='4'>수출통관의뢰서[" + export_no + "]</th></tr>");
	contents.append("		<tr><th>PROJECT 명</th><td>" + project_name + "</td><th>PROJECT Code</th><td>" + project_no + "</td></tr>");
	contents.append("		<tr><th>제품명</th><td colspan='3'>" + main_item + "</td></tr>");
	contents.append("		<tr><th>Invoice No</th><td>" + invoice_no + "</td><th>목적국</th><td>" + port_of_destination_desc + "</td></tr>");
	contents.append("		<tr><th>수출자명</th><td>" + exporter + "</td><th>제조자명</th><td>" + manufacturer + manufacturer_segment + "</td></tr>");
	contents.append("		<tr><th>운송조건</th><td>" + price_terms + "</td><th>금액</th><td>" + total_amount + " " + currency_code + "</td></tr>");
	contents.append("		<tr><th>선명</th><td>" + ship_name + "</td><th>순중량</th><td>" + net_weight + " " + net_weight_unit + "</td></tr>");
	contents.append("		<tr><th>포장개수</th><td>" + packing_count + "</td><th>총중량</th><td>" + gross_weight + " " + gross_weight_unit + "</td></tr>");
	contents.append("		<tr><th>요청부서</th><td>" + creator_team + "</td><th>요청담당자</th><td>" + created_by_name + "</td></tr>");
	contents.append("		<tr><th>선적지</th><td>" + port_of_loading_desc + "</td><th>자재보관장소</th><td>" + item_stored_place + "</td></tr>");
	contents.append("		<tr><th>관세환급유무</th><td>" + customs_type + "</td><th>재반입여부</th><td>" + is_carried_in_yn + "</td></tr>");
	contents.append("		<tr><th>원상태 수출여부</th><td>" + is_original_export + "</td><th>재수출여부</th><td>" + is_re_export + "</td></tr>");
	contents.append("		<tr><th>FTA원산지 발급대상</th><td>" + is_fta_origin + "</td><th>서류마감시간</th><td>" + certificate_duedate + "</td></tr>");
	contents.append("		<tr><th>FTA Name</th><td>" + fta_name + "</td><th>적재예정 보세구역 코드</th><td>" + loading_bonded_area + "</td></tr>");
	contents.append("		<tr><th>수입PO No</th><td>" + dangsahg_po + "</td><th>사급자재 수출시 수입가공 PO No</th><td>" + sageup_po + "</td></tr>");
	contents.append("		<tr><th>전략물자 해당여부</th><td>" + strategic_material + "</td><th>수출허가번호</th><td>" + export_license_number + "</td></tr>");
	contents.append("		<tr height='150'><th>기타사항</th><td colspan='3'>" + remarks + "</td></tr>");
	contents.append("	</table>");
	// 첨부파일 링크 추가.. attach_group_id를 갖고와서 거기 list의 항목들을 다 넣어주는 쪽으로?
	if(attachList != null && attachList.size() > 0) {
		contents.append("	<div style='font-size:1.5rem;'");
		contents.append("		<h4>== Attachment == </h4>");
		contents.append("		<ul>");
		for(int i = 0; i < attachList.size(); i++) {
			Map attach = (Map)attachList.get(i);
			//contents.append("			<li><a href=http://dhbppap1.corp.doosan.com:7140/expFileDownload.do?fileId=" + String.valueOf(attach.get("ATT_ID")) + " target='_blank'>" + String.valueOf(attach.get("ORGN_FILE_NM")) + "</a></li>");
			//contents.append("			<li><a href=http://dhbppdev.corp.doosan.com:7140/expFileDownload.do?fileId=" + String.valueOf(attach.get("ATT_ID")) + " target='_blank'>" + String.valueOf(attach.get("ORGN_FILE_NM")) + "</a></li>");
			contents.append("			<li><a href=" + fileUrl + String.valueOf(attach.get("ATT_ID")) + " target='_blank'>" + String.valueOf(attach.get("ORGN_FILE_NM")) + "</a></li>");
		}
		contents.append("		</ul>");
		contents.append("	</div>");
	}
	contents.append("</body>");
	String contents_doc = contents.toString();
	contents_doc = contents_doc.replaceAll("null", "");
%>
<CONNROOT>
	<CONN>
		<KEYCODE><%=moduleName%></KEYCODE>
    	<UNIQUEID><%=masterSequenceId%></UNIQUEID>
    	<RETURNURL>
        	<URLPATH><%=webServerHost%></URLPATH>
        	<LOGINID></LOGINID>
        	<PASSWORD></PASSWORD>
        	<RETURNFIELDLIST>APRDOCSTATE,ACTION_USER,ACTION_DATE,ACTION_COMMENT,RESULT_TYPE,KEY_CODE,UNIQUEID,DOCID,APRDOCSTATE,APRDOCSTATEMESSAGE,APPROVER_USERID,APPROVER_PROCESSDATE,APPROVER_OPINION</RETURNFIELDLIST>
    	</RETURNURL>
    </CONN>
  	<DOC>
		<!-- <DOCTITLE><![CDATA[[수출통관의뢰 품의서] - <%=export_no%>]]></DOCTITLE> -->
		<DOCTITLE><![CDATA[[수출통관의뢰 품의서] - <%=invoice_no%>]]></DOCTITLE>
		<BODYTEXT><![CDATA[<br><%=contents_doc%><br>]]></BODYTEXT>
    	<DRAFTERUSERID><%=erpUserId%></DRAFTERUSERID>
    	<DRAFTEREMPNO></DRAFTEREMPNO>
    	<DRAFTERDEPTID></DRAFTERDEPTID>
    	<ISPUBLIC>N</ISPUBLIC>
    	<FORMNAME>의뢰품의서</FORMNAME>
  	</DOC>
	<EXTRA>
    	<!-- <ISTEMPSAVE>N</ISTEMPSAVE> 지원하지 않음으로 변경 -->
		<REDRAFT>Y</REDRAFT>
		<AUTODRAFT>Y</AUTODRAFT>
		<DRAFTSYNC>Y</DRAFTSYNC><!-- 추가 -->
		<PROCESSSYNC>Y</PROCESSSYNC>
		<RETURNSYNC>Y</RETURNSYNC> <!-- 추가 -->
		<ISAPRLINE>Y</ISAPRLINE>
		<ISRECIPIENTCC>Y</ISRECIPIENTCC>
		<ISPROPERTY>Y</ISPROPERTY>
		<!--<AUTOTEMPSAVE>Y</AUTOTEMPSAVE> 임시저장으로 전송할지 여부, 지원하지 않음으로 변경-->
	</EXTRA>
  	<PROPERTY>
    	<SECURITYCODE>200</SECURITYCODE>
    	<STORAGEPERIOD>10yr</STORAGEPERIOD>
    	<DUEDATE><%=dueDate%></DUEDATE>
    	<ISEDMS>Y</ISEDMS> <!-- EDMS 이관대상 여부, 문서관리 시스템(My Documents)에 장기보관 할 것인지 묻는 값으로 Y로 입력해야 함. -->
    	<TAG><![CDATA[구매,수출통관의뢰,<%=CurrentYear%>,<%=export_no%>,<%=invoice_no%>]]></TAG>
		<!-- <TASKCODE>18</TASKCODE> 지원하지 않음으로 변경 -->
        <!-- <SUBCODE></SUBCODE> 지원하지 않음으로 변경 -->
  	</PROPERTY>
	<%
		if(supervisorForerpUserId != null && supervisorForerpUserId != "null" && supervisorForerpUserId.trim().length() > 0) {
	%>
		<APRLINE>
	    	<APPROVER>
	      		<USERID><%=supervisorForerpUserId%></USERID>
	      		<EMPNO></EMPNO>
	      		<APRTYPE>Approve</APRTYPE>
	      		<DEPTID></DEPTID>
			</APPROVER>
		</APRLINE>
		<CC>
			<!--
			<CCPOINT TYPE="DEPT">
				<DEPTID><=ccDeptCode%></DEPTID>
			</CCPOINT>
			 -->
			<CCPOINT TYPE="USER">
				<USERID>H681608</USERID>
			</CCPOINT>
			<CCPOINT TYPE="USER">
				<USERID>H681742</USERID>
			</CCPOINT>
			<CCPOINT TYPE="USER">
				<USERID>SUNGWOOK2.KIM</USERID>
			</CCPOINT>
		</CC>
	<%
		}
	%>
</CONNROOT>
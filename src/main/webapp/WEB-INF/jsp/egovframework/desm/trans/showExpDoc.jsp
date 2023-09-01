<%
	// ��������Ƿ� ���ڰ��� Draft ���� ������ ���� jsp����
	// ERP Concurrent�� ���� Ȱ���ϴµ� �� �� ERP���� DB�� Draft������ �����ִ°� �ƴ϶� �ʿ��� �� url�� ȣ���Ͽ� �����´�. �׷��� ���� �뵵
	// TestURL : http://localhost:8090/showExpDoc.do?exportHeaderId=67096
	// DEVURL : http://dhbppdev.corp.doosan.com:7140/showExpDoc.do?exportHeaderId=67096
	// DEVURL : http://dhbppdev.corp.doosan.com:7140/showExpDoc.do?exportHeaderId=67117 // ������ ����
    response.setHeader("Pragma","no-cache");
    response.setDateHeader("Expires",0);
    response.setHeader("Cache-Control","no-store");
%>
<%@ page contentType="text/html;charset=euc-kr"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.net.*,java.io.*"%>
<%
	Map values = (Map)request.getAttribute("exportInfo");
	// ��������Ƿ� ���� ����
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
	// ���ڰ��� ���� Final Value
	String moduleName = "EXP-211F514B-7472-4BA7-8BA4-75A42077F197";
	String webServerHost = (String)request.getAttribute("portalInterface");
	// ���ڰ��� ���� Value
	String erpUserId = String.valueOf(values.get("USER_AD"));
	String masterSequenceId = String.valueOf(values.get("MASTER_SEQUENCE_ID"));
	String currentDate 		= String.valueOf(values.get("CURRENT_DATE"));	//Tools.getToday("yyyy-MM-dd");
	String dueDate 			= String.valueOf(values.get("DUE_DATE"));			//Tools.addDate(currentDate, 'd', 3);
	String CurrentYear 		= String.valueOf(values.get("CURRENT_YEAR"));	//Tools.getToday("yyyy");
	String supervisorForerpUserId = String.valueOf(values.get("SUPERVISOR_ID"));
	// DESM�����ʵ� �߰�
	String is_re_export = String.valueOf(values.get("IS_RE_EXPORT"));
	String is_original_export = String.valueOf(values.get("IS_ORIGINAL_EXPORT"));
	String is_fta_origin = String.valueOf(values.get("IS_FTA_ORIGIN"));
	String loading_bonded_area = String.valueOf(values.get("LOADING_BONDED_AREA"));
	String certificate_duedate = String.valueOf(values.get("CERTIFICATE_DUEDATE"));
	String strategic_material = String.valueOf(values.get("IS_STRATEGIC_MATERIAL"));
	String export_license_number = String.valueOf(values.get("EXPORT_LICENSE_NUMBER"));
	String fta_name = String.valueOf(values.get("FTA_NAME"));
	// ���ڰ��� ���� �߰� Value
	//String ccDeptCode = "";
	String ccUserId = String.valueOf(values.get("CC_USER_ID")); // ������ �Ʒ� CCPOINT�� �ϵ��ڵ���.
	// ÷������
	String fileUrl = String.valueOf(values.get("FILE_URL"));
	List attachList = (List) request.getAttribute("attachList");
	// ������ ����ڹ�ȣ
	String manufacturer_segment = String.valueOf(values.get("MANUFACTURER_SEGMENT"));
	manufacturer_segment = (manufacturer_segment.isEmpty() ? "" : " (" + manufacturer_segment + ")");

	StringBuffer contents = new StringBuffer();
	contents.append("<body>");
	contents.append("	<table border='1' style='background-color:#FFFFFF;border-collapse:collapse;border:1px solid #000000;color:#000000;width:80%;margin-top:20px;margin-left:20px;word-break:break-all;' cellpadding='10' cellspacing='1'>");
	contents.append("		<colgroup><col style='width:25%'><col style='width:25%'><col style='width:25%'><col style='width:25%'></colgroup>");
	contents.append("		<tr height='80' style='background-color:#ECECEC;font-weight:bold;font-size:1.5rem'><th colspan='4'>��������Ƿڼ�[" + export_no + "]</th></tr>");
	contents.append("		<tr><th>PROJECT ��</th><td>" + project_name + "</td><th>PROJECT Code</th><td>" + project_no + "</td></tr>");
	contents.append("		<tr><th>��ǰ��</th><td colspan='3'>" + main_item + "</td></tr>");
	contents.append("		<tr><th>Invoice No</th><td>" + invoice_no + "</td><th>������</th><td>" + port_of_destination_desc + "</td></tr>");
	contents.append("		<tr><th>�����ڸ�</th><td>" + exporter + "</td><th>�����ڸ�</th><td>" + manufacturer + manufacturer_segment + "</td></tr>");
	contents.append("		<tr><th>�������</th><td>" + price_terms + "</td><th>�ݾ�</th><td>" + total_amount + " " + currency_code + "</td></tr>");
	contents.append("		<tr><th>����</th><td>" + ship_name + "</td><th>���߷�</th><td>" + net_weight + " " + net_weight_unit + "</td></tr>");
	contents.append("		<tr><th>���尳��</th><td>" + packing_count + "</td><th>���߷�</th><td>" + gross_weight + " " + gross_weight_unit + "</td></tr>");
	contents.append("		<tr><th>��û�μ�</th><td>" + creator_team + "</td><th>��û�����</th><td>" + created_by_name + "</td></tr>");
	contents.append("		<tr><th>������</th><td>" + port_of_loading_desc + "</td><th>���纸�����</th><td>" + item_stored_place + "</td></tr>");
	contents.append("		<tr><th>����ȯ������</th><td>" + customs_type + "</td><th>����Կ���</th><td>" + is_carried_in_yn + "</td></tr>");
	contents.append("		<tr><th>������ ���⿩��</th><td>" + is_original_export + "</td><th>����⿩��</th><td>" + is_re_export + "</td></tr>");
	contents.append("		<tr><th>FTA������ �߱޴��</th><td>" + is_fta_origin + "</td><th>���������ð�</th><td>" + certificate_duedate + "</td></tr>");
	contents.append("		<tr><th>FTA Name</th><td>" + fta_name + "</td><th>���翹�� �������� �ڵ�</th><td>" + loading_bonded_area + "</td></tr>");
	contents.append("		<tr><th>����PO No</th><td>" + dangsahg_po + "</td><th>������� ����� ���԰��� PO No</th><td>" + sageup_po + "</td></tr>");
	contents.append("		<tr><th>�������� �ش翩��</th><td>" + strategic_material + "</td><th>�����㰡��ȣ</th><td>" + export_license_number + "</td></tr>");
	contents.append("		<tr height='150'><th>��Ÿ����</th><td colspan='3'>" + remarks + "</td></tr>");
	contents.append("	</table>");
	// ÷������ ��ũ �߰�.. attach_group_id�� ����ͼ� �ű� list�� �׸���� �� �־��ִ� ������?
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
		<!-- <DOCTITLE><![CDATA[[��������Ƿ� ǰ�Ǽ�] - <%=export_no%>]]></DOCTITLE> -->
		<DOCTITLE><![CDATA[[��������Ƿ� ǰ�Ǽ�] - <%=invoice_no%>]]></DOCTITLE>
		<BODYTEXT><![CDATA[<br><%=contents_doc%><br>]]></BODYTEXT>
    	<DRAFTERUSERID><%=erpUserId%></DRAFTERUSERID>
    	<DRAFTEREMPNO></DRAFTEREMPNO>
    	<DRAFTERDEPTID></DRAFTERDEPTID>
    	<ISPUBLIC>N</ISPUBLIC>
    	<FORMNAME>�Ƿ�ǰ�Ǽ�</FORMNAME>
  	</DOC>
	<EXTRA>
    	<!-- <ISTEMPSAVE>N</ISTEMPSAVE> �������� �������� ���� -->
		<REDRAFT>Y</REDRAFT>
		<AUTODRAFT>Y</AUTODRAFT>
		<DRAFTSYNC>Y</DRAFTSYNC><!-- �߰� -->
		<PROCESSSYNC>Y</PROCESSSYNC>
		<RETURNSYNC>Y</RETURNSYNC> <!-- �߰� -->
		<ISAPRLINE>Y</ISAPRLINE>
		<ISRECIPIENTCC>Y</ISRECIPIENTCC>
		<ISPROPERTY>Y</ISPROPERTY>
		<!--<AUTOTEMPSAVE>Y</AUTOTEMPSAVE> �ӽ��������� �������� ����, �������� �������� ����-->
	</EXTRA>
  	<PROPERTY>
    	<SECURITYCODE>200</SECURITYCODE>
    	<STORAGEPERIOD>10yr</STORAGEPERIOD>
    	<DUEDATE><%=dueDate%></DUEDATE>
    	<ISEDMS>Y</ISEDMS> <!-- EDMS �̰���� ����, �������� �ý���(My Documents)�� ��⺸�� �� ������ ���� ������ Y�� �Է��ؾ� ��. -->
    	<TAG><![CDATA[����,��������Ƿ�,<%=CurrentYear%>,<%=export_no%>,<%=invoice_no%>]]></TAG>
		<!-- <TASKCODE>18</TASKCODE> �������� �������� ���� -->
        <!-- <SUBCODE></SUBCODE> �������� �������� ���� -->
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
package egovframework.desm.web;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 *
 * @파일명		: DesmPopupController.java
 * @날짜		: 2021. 8. 20 오후 2:05:56
 * @작성자		: Cho HeumJun
 * @설명
 * <pre>
 *
 * </pre>
 */
/**
 * @author juneshik.yang
 *
 */
/**
 * @author juneshik.yang
 *
 */
@Controller
public class DesmPopupController {

	private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

	/**
	 *
	 *
	 * @메소드명 	: treeGridModal
	 * @날짜 		: 2021. 8. 20 오후 2:07:25
	 * @작성자 		: Cho HeumJun
	 * @설명
	 * <pre>
	 *
	 * </pre>
	 *
	 * @param paramMap
	 * @param model
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/treeGridModal.do")
	public String treeGridModal(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session)
	{
		model.put("TRK_ITEM_SEQ", paramMap.get("TRK_ITEM_SEQ"));
		return "/desm/popUp/treeGridPopUp";
	}

	/**
	 * @메소드명 	: treeGridModaltestSong
	 * @날짜 		: 2021. 8. 25.
	 * @작성자 	: song young su
	 * @설명		: 테스트팝업
	 * <pre>
	 * </pre>
	 *
	 * @param paramMap
	 * @param model
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/treeGridModalTestSong.do")
	public String treeGridModalTestSong(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		model.put("TRK_ITEM_SEQ", paramMap.get("TRK_ITEM_SEQ"));

		logger.info("url: /desm/popUp/treeGridPopUpTestSong.jsp");

		return "/desm/popUp/treeGridPopUpTestSong";
	}

	/**
	 * @메소드명 	: treeGridModaltestSong
	 * @날짜 		: 2021. 8. 25.
	 * @작성자 	: song young su
	 * @설명		: item 정보 세로 두줄 버전 등
	 * <pre>
	 * </pre>
	 *
	 * @param paramMap
	 * @param model
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/treeGridModalTestSong2.do")
	public String treeGridModalTestSong2(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		model.put("TRK_ITEM_SEQ", paramMap.get("TRK_ITEM_SEQ"));

		logger.info("url: /desm/popUp/treeGridPopUpTestSong2.jsp");

		return "/desm/popUp/treeGridPopUpTestSong2";
	}

	@RequestMapping(value = "/transProjectListPopup.do")
	public String transProjectListPopup(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/transProjectList";
	}

	@RequestMapping(value = "/transRequestPopUp.do")
	public String transRequestPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/transRequestPopUp";
	}

	@RequestMapping(value = "/transMailAddPopUp.do")
	public String transMailAddPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/transMailAddPopUp";
	}

	@RequestMapping(value = "/transInvoiceDetailPopUp.do")
	public String transInvoiceDetailPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/transInvoiceDetailPopUp";
	}

	@RequestMapping(value = "/transAttListPopUp.do")
	public String transAttListPopup(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/transAttListPopUp";
	}

	@RequestMapping(value = "/transRequestEditPopUp.do")
	public String transRequestEditPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/transRequestEditPopUp";
	}

	@RequestMapping(value = "/transExcelUploadPopUp.do")
	public String transExcelUploadPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/transExcelUploadPopUp";
	}

	@RequestMapping(value = "/transPackagePopUp.do")
	public String transPackagePopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/transPackagePopUp";
	}

	@RequestMapping(value = "/exportClearancePopUp.do")
	public String exportClearancePopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/exportClearancePopUp";
	}

	@RequestMapping(value = "/erpProjectListPopUp.do")
	public String erpProjectListPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/erpProjectListPopUp";
	}

	@RequestMapping(value = "/transPortPopUp.do")
	public String transPortPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/transPortPopUp";
	}

	@RequestMapping(value = "/erpEmpListPopUp.do")
	public String erpEmpListPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/erpEmpListPopUp";
	}

	@RequestMapping(value = "/exportNoPopUp.do")
	public String exportNoPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {
		logger.info("exportNoPopUp.do");
		return "/desm/popUp/exportNoPopUp";
	}

	@RequestMapping(value = "/erpInvNoListPopUp.do")
	public String erpInvNoListPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/erpInvNoListPopUp";
	}

	@RequestMapping(value = "/cmmSelectPopUp.do")
	public String cmmSelectPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/cmmSelectPopUp";
	}

	@RequestMapping(value = "/desmInvoiceNumberSeqListPopUp.do")
	public String desmInvoiceNumberSeqListPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmInvoiceNumberSeqListPopUp";
	}

	@RequestMapping(value = "/desmProjectListPopUp.do")
	public String desmProjectListPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmProjectListPopUp";
	}

	@RequestMapping(value = "/desmMprProjectListPopUp.do")
	public String desmMprProjectListPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMprProjectListPopUp";
	}

	@RequestMapping(value = "/desmMprDesignExcelUploadPopUp.do")
	public String desmMprDesignExcelUploadPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMprDesignExcelUploadPopUp";
	}

	@RequestMapping(value = "/desmBlrProjectListPopUp.do")
	public String desmBlrProjectListPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmBlrProjectListPopUp";
	}

	@RequestMapping(value = "/idsmSchmapExcelUploadPopUp.do")
	public String idsmSchmapExcelUploadPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/idsmSchmapExcelUploadPopUp";
	}

	@RequestMapping(value = "/exportAttListPopUp.do")
	public String exportAttListPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/exportAttListPopUp";
	}

	@RequestMapping(value = "/idsmMirCreationPopUp.do")
	public String idsmMirCreationPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/idsmMirCreationPopUp";
	}

	@RequestMapping(value = "/idsmRfiCreationPopUp.do")
	public String idsmRfiCreationPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/idsmRfiCreationPopUp";
	}

	@RequestMapping(value = "/idsmRfiCreationSetUpPopUp.do")
	public String idsmRfiCreationSetUpPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/idsmRfiCreationSetUpPopUp";
	}

	@RequestMapping(value = "/desmBlrSchmapExcelUploadPopUp.do")
	public String desmBlrSchmapExcelUploadPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmBlrSchmapExcelUploadPopUp";
	}

	@RequestMapping(value = "/idsmSchmapViewDetailPopUp.do")
	public String idsmSchmapViewDetailPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/idsmSchmapViewDetailPopUp";
	}

	@RequestMapping(value = "/idsmProjectMgtPopUp.do")
	public String idsmProjectMgtPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/idsmProjectMgtPopUp";
	}

	@RequestMapping(value = "/idsmProjectMgtAddPopUp.do")
	public String idsmProjectMgtAddPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/idsmProjectMgtAddPopUp";
	}

	@RequestMapping(value = "/transStrategicMgtCopyListPopUp.do")
	public String transStrategicMgtCopyListPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/transStrategicMgtCopyListPopUp";
	}

	@RequestMapping(value = "/transStrategicMgtAttCopyListPopUp.do")
	public String transStrategicMgtAttCopyListPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/transStrategicMgtAttCopyListPopUp";
	}

	@RequestMapping(value = "/transVendorPopUp.do")
	public String transVendorPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/transVendorPopUp";
	}

	@RequestMapping(value = "/transDeptUsrPopUp.do")
	public String transDeptUsrPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/transDeptUsrPopUp";
	}

	@RequestMapping(value = "/desmRsiCreationPopUp.do")
	public String desmRsiCreationPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmRsiCreationPopUp";
	}

	@RequestMapping(value = "/desmAttListPopUp.do")
	public String desmAttListPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmAttListPopUp";
	}

	@RequestMapping(value = "/desmRsiPlDtlPopUp.do")
	public String desmRsiPlDtlPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmRsiPlDtlPopUp";
	}

	@RequestMapping(value = "/desmOutGoingCreationPopUp.do")
	public String desmOutGoingCreationPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmOutGoingCreationPopUp";
	}

	@RequestMapping(value = "/desmOutGoingReportPopUp.do")
	public String desmOutGoingReportPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmOutGoingReportPopUp";
	}

	@RequestMapping(value = "/desmSubconCreationPopUp.do")
	public String desmSubconCreationPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmSubconCreationPopUp";
	}

	@RequestMapping(value = "/desmDefaultProjectListPopUp.do")
	public String desmDefaultProjectListPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmDefaultProjectListPopUp";
	}

	@RequestMapping(value = "/desmDefaultCountryListPopUp.do")
	public String desmDefaultCountryListPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmDefaultCountryListPopUp";
	}

	@RequestMapping(value = "/desmPlDtlEditLogPopUp.do")
	public String desmPlDtlEditLogPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmPlDtlEditLogPopUp";
	}

	@RequestMapping(value = "/desmPlSummaryEditLogPopUp.do")
	public String desmPlSummaryEditLogPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmPlSummaryEditLogPopUp";
	}

	@RequestMapping(value = "/desmPlSummaryHistoryPopUp.do")
	public String desmPlSummaryHistoryPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {
		return "/desm/popUp/desmPlSummaryHistoryPopUp";
	}

	@RequestMapping(value = "/desmMrfCreationPopUp.do")
	public String desmMrfCreationPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMrfCreationPopUp";
	}

	@RequestMapping(value = "/desmMrfPlDtlPopUp.do")
	public String desmMrfPlDtlPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMrfPlDtlPopUp";
	}

	@RequestMapping(value = "/desmReturnCreationPopUp.do")
	public String desmReturnCreationPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmReturnCreationPopUp";
	}

	@RequestMapping(value = "/desmReturnReportPopUp.do")
	public String desmReturnReportPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmReturnReportPopUp";
	}

	@RequestMapping(value = "/desmMapCreationPopUp.do")
	public String desmMapCreationPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMapCreationPopUp";
	}

	@RequestMapping(value = "/desmMapAreaCreationPopUp.do")
	public String desmMapAreaCreationPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMapAreaCreationPopUp";
	}

	@RequestMapping(value = "/desmLocationPopUp.do")
	public String desmLocationPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmLocationPopUp";
	}

	@RequestMapping(value = "/desmMapLocationPopUp.do")
	public String desmMapLocationPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMapLocationPopUp";
	}

	@RequestMapping(value = "/desmLocationSearchPopUp.do")
	public String desmLocationSearchPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmLocationSearchPopUp";
	}

	@RequestMapping(value = "/desmOutGoingDateChangePopUp.do")
	public String desmOutGoingDateChangePopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmOutGoingDateChangePopUp";
	}

	@RequestMapping(value = "/desmDetailItemCreationPopUp.do")
	public String desmDetailItemCreationPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmDetailItemCreationPopUp";
	}

	@RequestMapping(value = "/desmMprCreationPopUp.do")
	public String desmMprCreationPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMprCreationPopUp";
	}

	@RequestMapping(value = "/desmMprSetupPopUp.do")
	public String desmMprSetupPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMprSetupPopUp";
	}

	@RequestMapping(value = "/desmMprSetupDatePopUp.do")
	public String desmMprSetupDatePopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMprSetupDatePopUp";
	}

	@RequestMapping(value = "/desmPoListPopUp.do")
	public String desmPoListPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmPoListPopUp";
	}

	@RequestMapping(value = "/desmMprCommentsPopUp.do")
	public String desmMprCommentsPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMprCommentsPopUp";
	}

	@RequestMapping(value = "/desmSupplierSetupPopUp.do")
	public String desmSupplierSetupPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmSupplierSetupPopUp";
	}

	@RequestMapping(value = "/desmSupplierSetupPoSearchPopUp.do")
	public String desmSupplierSetupPoSearchPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmSupplierSetupPoSearchPopUp";
	}

	@RequestMapping(value = "/desmSupplierListPopUp.do")
	public String desmSupplierListPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmSupplierListPopUp";
	}

	@RequestMapping(value = "/desmMprSupplierListPopUp.do")
	public String desmMprSupplierListPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMprSupplierListPopUp";
	}

	@RequestMapping(value = "/desmMprSetupSupplierPopUp.do")
	public String desmMprSetupSupplierPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMprSetupSupplierPopUp";
	}

	@RequestMapping(value = "/desmMprSetupUserPopUp.do")
	public String desmMprSetupUserPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMprSetupUserPopUp";
	}

	@RequestMapping(value = "/desmMprCreationPhotoPreviewPopUp.do")
	public String desmMprCreationPhotoPreviewPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMprCreationPhotoPreviewPopUp";
	}

	@RequestMapping(value = "/desmPoMprNoListPopUp.do")
	public String desmPoMprNoListPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmPoMprNoListPopUp";
	}

	@RequestMapping(value = "/desmManualPoCreationPopUp.do")
	public String desmManualPoCreationPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmManualPoCreationPopUp";
	}

	@RequestMapping(value = "/desmMaterialManageCreationPopUp.do")
	public String desmMaterialManageCreationPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {
		return "/desm/popUp/desmMaterialManageCreationPopUp";
	}
	@RequestMapping(value = "/desmMaterialManageBatchType.do")
	public String desmMaterialManageBatchTypePopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {
		return "/desm/popUp/desmMaterialManageBatchType";
	}
	@RequestMapping(value = "/desmMaterialManageBatchCategory.do")
	public String desmMaterialManageBatchCategoryPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {
		return "/desm/popUp/desmMaterialManageBatchCategory";
	}
	@RequestMapping(value = "/desmMaterialManageBatchExpiredDate.do")
	public String desmMaterialManageBatchExpiredDate(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {
		return "/desm/popUp/desmMaterialManageBatchExpiredDate";
	}
	@RequestMapping(value = "/desmMaterialManageBatchRsiConfirm.do")
	public String desmMaterialManageBatchRsiConfirm(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {
		return "/desm/popUp/desmMaterialManageBatchRsiConfirm";
	}
	@RequestMapping(value = "/desmPackageDateChangePopUp.do")
	public String desmPackageDateChangePopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {
		return "/desm/popUp/desmPackageDateChangePopUp";
	}

	@RequestMapping(value = "/desmShippingMarkCreationPopUp.do")
	public String desmShippingMarkCreationPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {
		return "/desm/popUp/desmShippingMarkCreationPopUp";
	}
	@RequestMapping(value = "/desmTransactionHistoryPopUp.do")
	public String desmTransactionHistoryPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {
		return "/desm/popUp/desmTransactionHistoryPopUp";
	}

	@RequestMapping(value = "/testAttListPopUp.do")
	public String testAttListPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/testAttListPopUp";
	}
	
	@RequestMapping(value = "/desmMrrCreationPopUp.do")
	public String desmMrrCreationPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMrrCreationPopUp";
	}
	
	@RequestMapping(value = "/desmMrrPlDtlPopUp.do")
	public String desmMrrPlDtlPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMrrPlDtlPopUp";
	}

	@RequestMapping(value = "/desmLocationMrrPopUp.do")
	public String desmLocationMrrPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmLocationMrrPopUp";
	}

	@RequestMapping(value = "/desmMrrReceivedDatePopUp.do")
	public String desmMrrReceivedDatePopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMrrReceivedDatePopUp";
	}
	
	@RequestMapping(value = "/desmMrrVisualCheckPopUp.do")
	public String desmMrrVisualCheckPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMrrVisualCheckPopUp";
	}

	/**
	 * MIR 추가 2023.02.20
	 */
	@RequestMapping(value = "/desmMirCreationPopUp.do")
	public String desmMirCreationPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMirCreationPopUp";
	}

	@RequestMapping(value = "/desmMirPlDtlPopUp.do")
	public String desmMirPlDtlPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMirPlDtlPopUp";
	}

	@RequestMapping(value = "/desmMirInspectionResultPopUp.do")
	public String desmMirInspectionResultPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMirInspectionResultPopUp";
	}

	
	// 404.. ??
	@RequestMapping(value = "/desmMirReqChgQtyPopUp.do")
	public String desmMirReqChgQtyPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {
		//desmMirQtyfixYNPopup
		return "/desm/popUp/desmMirReqChgQtyPopUp";
	}
	
	@RequestMapping(value = "/desmMirRequiredChgQtyPopup.do")
	public String desmMirRequiredChgQtyPopup(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {
		return "/desm/popUp/desmMirRequiredChgQtyPopup";
	}

	@RequestMapping(value = "/desmMirPoNoPopUp.do")
	public String desmMirPoNoPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMirPoNoPopUp";
	}

	@RequestMapping(value = "/desmMirSetupPopUp.do")
	public String desmMirSetupPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmMirSetupPopUp";
	}
	
	@RequestMapping(value = "/desmOutGoingReceiverChangePopUp.do")
	public String desmOutGoingReceiverChangePopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {

		return "/desm/popUp/desmOutGoingReceiverChangePopUp";
	}
	
	@RequestMapping(value = "/desmStrategicEwsCreationPopUp.do")
	public String desmStrategicEwsCreationPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {
		return "/desm/popUp/desmStrategicEwsCreationPopUp";
	}

	@RequestMapping(value = "/desmContractCreationPopUp.do")
	public String desmContractCreationPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {
		return "/desm/popUp/desmContractCreationPopUp";
	}

	@RequestMapping(value = "/desmContractCreationContactPopUp.do")
	public String desmContractCreationContactPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {
		return "/desm/popUp/desmContractCreationContactPopUp";
	}

	@RequestMapping(value = "/desmContractHeaderSearchPopUp.do")
	public String desmContractHeaderSearchPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {
		return "/desm/popUp/desmContractHeaderSearchPopUp";
	}

	@RequestMapping(value = "/desmContractLineSearchPopUp.do")
	public String desmContractLineSearchPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {
		return "/desm/popUp/desmContractLineSearchPopUp";
	}

	@RequestMapping(value = "/desmContractExcelUploadPopUp.do")
	public String desmContractExcelUploadPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {
		return "/desm/popUp/desmContractExcelUploadPopUp";
	}

	@RequestMapping(value = "/desmOnshoreOrderCreationPopUp.do")
	public String desmOnshoreOrderCreationPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {
		return "/desm/popUp/desmOnshoreOrderCreationPopUp";
	}

	@RequestMapping(value = "/desmOnshoreReceivedCreationPopUp.do")
	public String desmOnshoreReceivedCreationPopUp(@RequestParam Map<String, Object> paramMap , ModelMap model, HttpSession session) {
		return "/desm/popUp/desmOnshoreReceivedCreationPopUp";
	}

}
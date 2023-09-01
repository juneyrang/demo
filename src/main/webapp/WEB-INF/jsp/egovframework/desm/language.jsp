<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>
<div>
<input id="alertSelectRow"				type="hidden" value="<spring:message code='alert.select.row'	/>"/>
<input id="alertValidate"				type="hidden" value="<spring:message code='alert.validate'		/>"/>
<input id="alertSave"					type="hidden" value="<spring:message code='alert.save'			/>"/>
<input id="alertSaveSuccess"			type="hidden" value="<spring:message code='alert.save.success'	/>"/>
<input id="alertDelete"					type="hidden" value="<spring:message code='alert.delete'		/>"/>
<input id="alertDeleteSuccess"			type="hidden" value="<spring:message code='alert.delete.success'/>"/>
<input id="alertEditCheck"				type="hidden" value="<spring:message code='alert.edit.check'/>"/>
<input id="alertSaveAlreadyInv"			type="hidden" value="<spring:message code='alert.save.already.inv'/>"/>
<input id="alertGridSelectDataAll"		type="hidden" value="<spring:message code='alert.grid.select.data.all'/>"/>
<input id="alertGridSelectDataNull"		type="hidden" value="<spring:message code='alert.grid.select.data.null'/>"/>
<input id="alertGridDataNull"			type="hidden" value="<spring:message code='alert.grid.data.null'/>"/>
<input id="alertGridEditDataNull"		type="hidden" value="<spring:message code='alert.grid.edit.data.null'/>"/>
<input id="alertGridCopyRowNull"		type="hidden" value="<spring:message code='alert.grid.copy.row.null'/>"/>
<input id="alertFileCheck"			    type="hidden" value="<spring:message code='alert.file.check'/>"/>
<input id="alertFileCheckEx"			    type="hidden" value="<spring:message code='alert.file.check.ex'/>"/>
<input id="alertGridCopyRowChildNode"	type="hidden" value="<spring:message code='alert.grid.copy.row.child.node'/>"/>
<input id="alertSuccess"	type="hidden" value="<spring:message code='alert.success'/>"/>
<input id="alertSaveAlreadyItem"			type="hidden" value="<spring:message code='alert.save.already.item'/>"/>
<input id="alertFileAtt"			    type="hidden" value="<spring:message code='alert.file.att'/>"/>
<input id="alertNnewData"			    type="hidden" value="<spring:message code='alert.new.data'/>"/>
<input id="alertSyncData"			    type="hidden" value="<spring:message code='alert.sync.data'/>"/>
<input id="alertSyncDate"			    type="hidden" value="<spring:message code='alert.sync.date'/>"/>
<input id="alertAlarm"			    type="hidden" value="<spring:message code='alert.alarm'/>"/>
<input id="alertSaveAlreadyData"			    type="hidden" value="<spring:message code='alert.save.already.data'/>"/>
<input id="alertCancel"			    type="hidden" value="<spring:message code='alert.cancel'/>"/>
<input id="alertAccept"			    type="hidden" value="<spring:message code='alert.accept'/>"/>
<input id="alertMirNotCreate"			    type="hidden" value="<spring:message code='alert.mir.not.create'/>"/>
<input id="alertRfiNotCreate"			    type="hidden" value="<spring:message code='alert.rfi.not.create'/>"/>
<input id="alertMirNotCancel"			    type="hidden" value="<spring:message code='alert.mir.not.cancel'/>"/>
<input id="alertRfiNotCancel"			    type="hidden" value="<spring:message code='alert.rfi.not.cancel'/>"/>
<input id="alertConfirm"			    type="hidden" value="<spring:message code='alert.confirm'/>"/>
<input id="alertFileExtensionErr"			    type="hidden" value="<spring:message code='alert.file.extension.err'/>"/>
<input id="alertFileNameErr"			    type="hidden" value="<spring:message code='alert.file.name.err'/>"/>
<input id="alertSaveAlreadyInvErr"			    type="hidden" value="<spring:message code='alert.save.already.inv.err'/>"/>
<input id="alertSaveFileInvErr"			    type="hidden" value="<spring:message code='alert.save.file.inv.err'/>"/>
<input id="alertSaveRsiQtyErr"			    type="hidden" value="<spring:message code='alert.save.rsi.qty.err'/>"/>
<input id="alertSaveRsiQtyNullErr"			    type="hidden" value="<spring:message code='alert.save.rsi.qty.null.err'/>"/>
<input id="alertReject"			    type="hidden" value="<spring:message code='alert.reject'/>"/>
<input id="alertRejectSuccess"			    type="hidden" value="<spring:message code='alert.reject.success'/>"/>
<input id="alertRequest"			    type="hidden" value="<spring:message code='alert.request'/>"/>
<input id="alertCheck"			    type="hidden" value="<spring:message code='alert.check'/>"/>
<input id="alertApprove"			    type="hidden" value="<spring:message code='alert.approve'/>"/>
<input id="alertRevision"			    type="hidden" value="<spring:message code='alert.revision'/>"/>
<input id="alertSearchTwo"			    type="hidden" value="<spring:message code='alert.search.two'/>"/>
<input id="alertAlreadyProject"			    type="hidden" value="<spring:message code='alert.already.project'/>"/>
<input id="alertSaveRsiUutQtyNullErr"			    type="hidden" value="<spring:message code='alert.save.rsi.out.qty.null.err'/>"/>
<input id="alertSaveRsiOutDateNullErr"			    type="hidden" value="<spring:message code='alert.save.rsi.out.date.null.err'/>"/>
<input id="alertSaveRsiOutQtyErr"			    type="hidden" value="<spring:message code='alert.save.rsi.out.qty.err'/>"/>
<input id="alertSaveSubconUserErr"			    type="hidden" value="<spring:message code='alert.save.subcon.user.err'/>"/>
<input id="alertSavePwdErr"			    type="hidden" value="<spring:message code='alert.save.pwd.err'/>"/>
<input id="alertSavePwdNotErr"			    type="hidden" value="<spring:message code='alert.save.pwd.not.err'/>"/>
<input id="alertRsiAleadyErr"			    type="hidden" value="<spring:message code='alert.rsi.aleady.err'/>"/>
<input id="alertTransAuth"			    type="hidden" value="<spring:message code='alert.trans.auth'/>"/>
<input id="alertDefaultProjectAuth"			    type="hidden" value="<spring:message code='alert.default.project.auth'/>"/>
<input id="alertMailFail" type="hidden" value="<spring:message code='alert.mail.fail'/>"/>
<input id="alertPlDetailQtyError" type="hidden" value="<spring:message code='alert.pl.detail.qty.error'/>"/>
<input id="alertSaveMrfQtyNullErr" type="hidden" value="<spring:message code='alert.save.mrf.qty.null.err'/>"/>
<input id="alertSaveMrfQtyErr" type="hidden" value="<spring:message code='alert.save.mrf.qty.err'/>"/>
<input id="alertSaveReturnDateNullErr" type="hidden" value="<spring:message code='alert.save.return.date.null.err'/>"/>
<input id="alertSaveReturnQtyNullErr" type="hidden" value="<spring:message code='alert.save.return.qty.null.err'/>"/>
<input id="alertSaveMrfReturnQtyErr" type="hidden" value="<spring:message code='alert.save.mrf.return.qty.err'/>"/>
<input id="alertSaveOutgoingDeleteCheckErr" type="hidden" value="<spring:message code='alert.save.outgoing.delete.check.err'/>"/>
<input id="alertMapModeSelectErr" type="hidden" value="<spring:message code='alert.map.mode.select.err'/>"/>
<input id="alertMapAreaAddErr" type="hidden" value="<spring:message code='alert.map.area.add.err'/>"/>
<input id="alertMapSaveDetailErr" type="hidden" value="<spring:message code='alert.map.save.detail.err'/>"/>
<input id="alertSaveIdsmDeleteCheckErr" type="hidden" value="<spring:message code='alert.save.idsm.delete.check.err'/>"/>
<input id="alertCreationDetailItemIsConfirm" type="hidden" value="<spring:message code='alert.creation.detail.item.is.confirm'/>"/>
<input id="alertSend" type="hidden" value="<spring:message code='alert.send'/>"/>
<input id="alertSendSuccess" type="hidden" value="<spring:message code='alert.send.success'/>"/>
<input id="alertReset" type="hidden" value="<spring:message code='alert.reset'/>"/>
<input id="alertSavePwdLengthErr" type="hidden" value="<spring:message code='alert.save.pwd.length.err'/>"/>
<input id="alertSavePwdNumberErr" type="hidden" value="<spring:message code='alert.save.pwd.number.err'/>"/>
<input id="alertSavePwdEnglishErr" type="hidden" value="<spring:message code='alert.save.pwd.english.err'/>"/>
<input id="alertSaveAlreadySequence"			type="hidden" value="<spring:message code='alert.save.already.sequence'/>"/>
<input id="alertPhotoFileCheckEx"			type="hidden" value="<spring:message code='alert.photo.file.check.ex'/>"/>
<input id="alertRejectErr"			type="hidden" value="<spring:message code='alert.reject.err'/>"/>
<input id="alertApproveErr"			type="hidden" value="<spring:message code='alert.approve.err'/>"/>
<input id="alertSupplierSave"			type="hidden" value="<spring:message code='alert.supplier.save'/>"/>
<input id="alertSaveMprDeleteCheckErr"			type="hidden" value="<spring:message code='alert.save.mpr.delete.check.err'/>"/>
<input id="alertSaveMprSetupPerCheckErr"			type="hidden" value="<spring:message code='alert.save.mpr.setup.per.check.err'/>"/>
<input id="alertSaveMprSetupPerOverCheckErr"			type="hidden" value="<spring:message code='alert.save.mpr.setup.per.over.check.err'/>"/>
<input id="alertSaveMprSetupPrevValCheckErr"			type="hidden" value="<spring:message code='alert.save.mpr.setup.prev.val.check.err'/>"/>
<input id="alertSaveMprSetupDeleteCheckErr"			type="hidden" value="<spring:message code='alert.save.mpr.setup.delete.check.err'/>"/>
<input id="alertMprSave"			type="hidden" value="<spring:message code='alert.mpr.save'/>"/>
<input id="alertMprConfirm"			type="hidden" value="<spring:message code='alert.mpr.confirm'/>"/>
<input id="alertMprConfirmErr"			type="hidden" value="<spring:message code='alert.mpr.confirm.err'/>"/>
<input id="alertMprPoSelectErr"			type="hidden" value="<spring:message code='alert.mpr.po.select.err'/>"/>
<input id="alertMprPoMonthErr"			type="hidden" value="<spring:message code='alert.mpr.po.month.err'/>"/>
<input id="alertMprSetupPoSelect"			type="hidden" value="<spring:message code='alert.mpr.setup.po.select'/>"/>
<input id="alertMprReturnSelectCheck"			type="hidden" value="<spring:message code='alert.mpr.return.select.check'/>"/>
<input id="alertSaveMprSetupWeightCheckErr"			type="hidden" value="<spring:message code='alert.save.mpr.setup.weight.check.err'/>"/>
<input id="alertSaveMprSetupDoosanMailExpediterCheckErr"			type="hidden" value="<spring:message code='alert.save.mpr.setup.doosan.mail.expediter.check.err'/>"/>
<input id="alertSaveMprSetupSubmissionPeriodCheckErr"			type="hidden" value="<spring:message code='alert.save.mpr.setup.submission.period.check.err'/>"/>
<input id="alertMprSetupEdit"			type="hidden" value="<spring:message code='alert.mpr.setup.edit'/>"/>
<input id="alertSvaeMprDetailProgressErr"			type="hidden" value="<spring:message code='alert.svae.mpr.detail.progress.err'/>"/>
<input id="alertSaveMprSupplier1"			type="hidden" value="<spring:message code='alert.save.mpr.supplier1'/>"/>
<input id="alertSaveMprSupplier2"			type="hidden" value="<spring:message code='alert.save.mpr.supplier2'/>"/>
<input id="alertSaveMprSupplier3"			type="hidden" value="<spring:message code='alert.save.mpr.supplier3'/>"/>
<input id="alertSaveMprSupplier4"			type="hidden" value="<spring:message code='alert.save.mpr.supplier4'/>"/>
<input id="alertSaveMprShippingMarkPakageNoCheck"			type="hidden" value="<spring:message code='alert.save.mpr.shipping.mark.pakage.no.check'/>"/>

<input id="alertSaveContractContactCheckErr"			type="hidden" value="<spring:message code='alert.save.contract.contact.check.err'/>"/>




<input id="selectNullTextAll"	    	type="hidden" value="<spring:message code='select.null.text.all'/>"/>
<input id="selectNullTextSel"			type="hidden" value="<spring:message code='select.null.text.sel'/>"/>



<input id="gridColItem"			type="hidden" value="<spring:message code='grid.col.item'/>"/>
<input id="gridColVendor"			type="hidden" value="<spring:message code='grid.col.vendor'/>"/>
<input id="gridColShippingCountry"			type="hidden" value="<spring:message code='grid.col.shipping.country'/>"/>
<input id="gridColShippingOrder"			type="hidden" value="<spring:message code='grid.col.shipping.order'/>"/>
<input id="gridColInvoiceNo"			type="hidden" value="<spring:message code='grid.col.invoice.no'/>"/>
<input id="gridColPl"			type="hidden" value="<spring:message code='grid.col.pl'/>"/>
<input id="gridColSupplyScope"			type="hidden" value="<spring:message code='grid.col.supply.scope'/>"/>
<input id="gridColMps"			type="hidden" value="<spring:message code='grid.col.mps'/>"/>
<input id="gridColTe"			type="hidden" value="<spring:message code='grid.col.te'/>"/>
<input id="gridColPo"			type="hidden" value="<spring:message code='grid.col.po'/>"/>
<input id="gridColCargoReady"			type="hidden" value="<spring:message code='grid.col.cargo.ready'/>"/>
<input id="gridColFob"			type="hidden" value="<spring:message code='grid.col.fob'/>"/>
<input id="gridColOnSite"			type="hidden" value="<spring:message code='grid.col.on.site'/>"/>
<input id="gridColPaymentMilestone"			type="hidden" value="<spring:message code='grid.col.payment.milestone'/>"/>
<input id="gridColActivity"			type="hidden" value="<spring:message code='grid.col.activity'/>"/>
<input id="gridColL3Id"			type="hidden" value="<spring:message code='grid.col.l3.id'/>"/>
<input id="gridColPerson"			type="hidden" value="<spring:message code='grid.col.person'/>"/>
<input id="gridColPlan"			type="hidden" value="<spring:message code='grid.col.plan'/>"/>
<input id="gridColPlanL3"			type="hidden" value="<spring:message code='grid.col.plan.l3'/>"/>
<input id="gridColExpected"			type="hidden" value="<spring:message code='grid.col.expected'/>"/>
<input id="gridColActual"			type="hidden" value="<spring:message code='grid.col.actual'/>"/>
<input id="gridColAtdEtd"			type="hidden" value="<spring:message code='grid.col.atd.etd'/>"/>
<input id="gridColPod"			type="hidden" value="<spring:message code='grid.col.pod'/>"/>
<input id="gridColHeaderNo"			type="hidden" value="<spring:message code='grid.col.header.no'/>"/>
<input id="gridColLineNo"			type="hidden" value="<spring:message code='grid.col.line.no'/>"/>
<input id="gridColSupplier"			type="hidden" value="<spring:message code='grid.col.supplier'/>"/>
<input id="gridColPm"			type="hidden" value="<spring:message code='grid.col.pm'/>"/>
<input id="gridColEm"			type="hidden" value="<spring:message code='grid.col.em'/>"/>
<input id="gridColBuyer"			type="hidden" value="<spring:message code='grid.col.buyer'/>"/>
<input id="gridColSm"			type="hidden" value="<spring:message code='grid.col.sm'/>"/>
<input id="gridColQc"			type="hidden" value="<spring:message code='grid.col.qc'/>"/>
<input id="gridColEmDept"			type="hidden" value="<spring:message code='grid.col.em.dept'/>"/>
<input id="gridColMprExpected"			type="hidden" value="<spring:message code='grid.col.mpr.expected'/>"/>
<input id="gridColMprActual"			type="hidden" value="<spring:message code='grid.col.mpr.actual'/>"/>

<input id="gridColUserJob"			type="hidden" value="<spring:message code='grid.col.user.job'/>"/>
<input id="gridColRrSchedule"			type="hidden" value="<spring:message code='grid.col.rr.schedule'/>"/>
<input id="gridColUserName"			type="hidden" value="<spring:message code='grid.col.user.name'/>"/>
<input id="gridColUserDeptName"			type="hidden" value="<spring:message code='grid.col.user.dept.name'/>"/>
<input id="gridColMng"			type="hidden" value="<spring:message code='grid.col.mng'/>"/>
<input id="gridColScheduleIssue"			type="hidden" value="<spring:message code='grid.col.schedule.issue'/>"/>
<input id="gridColStdPjt"			type="hidden" value="<spring:message code='grid.col.std.pjt'/>"/>
<input id="gridColPjt"			type="hidden" value="<spring:message code='grid.col.pjt'/>"/>
<input id="gridColTaskNo"			type="hidden" value="<spring:message code='grid.col.task.no'/>"/>
<input id="gridColItem1"			type="hidden" value="<spring:message code='grid.col.item1'/>"/>
<input id="gridColItem2"			type="hidden" value="<spring:message code='grid.col.item2'/>"/>
<input id="gridColItem3"			type="hidden" value="<spring:message code='grid.col.item3'/>"/>
<input id="gridColItem4"			type="hidden" value="<spring:message code='grid.col.item4'/>"/>
<input id="gridColCountry"			type="hidden" value="<spring:message code='grid.col.country'/>"/>
<input id="gridColPackingListNo"			type="hidden" value="<spring:message code='grid.col.packing.list.no'/>"/>
<input id="gridColInvoiceNo1"			type="hidden" value="<spring:message code='grid.col.invoice.no.1'/>"/>
<input id="gridColInvoiceNo2"			type="hidden" value="<spring:message code='grid.col.invoice.no.2'/>"/>
<input id="gridColInvoiceNo3"			type="hidden" value="<spring:message code='grid.col.invoice.no.3'/>"/>
<input id="gridColOnOffShore"			type="hidden" value="<spring:message code='grid.col.on.off.shore'/>"/>
<input id="gridColTeDuration"			type="hidden" value="<spring:message code='grid.col.te.duration'/>"/>
<input id="gridColPurchaseDuration"			type="hidden" value="<spring:message code='grid.col.purchase.duration'/>"/>
<input id="gridColMakeDuration"			type="hidden" value="<spring:message code='grid.col.make.duration'/>"/>
<input id="gridColCargoDuration"			type="hidden" value="<spring:message code='grid.col.cargo.duration'/>"/>
<input id="gridColShipmentDuration"			type="hidden" value="<spring:message code='grid.col.shipment.duration'/>"/>
<input id="gridColTransDuration"			type="hidden" value="<spring:message code='grid.col.trans.duration'/>"/>
<input id="gridColOnsiteDuration"			type="hidden" value="<spring:message code='grid.col.onsite.duration'/>"/>
<input id="gridColPmAd"			type="hidden" value="<spring:message code='grid.col.pm.ad'/>"/>
<input id="gridColEmAd"			type="hidden" value="<spring:message code='grid.col.em.ad'/>"/>
<input id="gridColBuyerAd"			type="hidden" value="<spring:message code='grid.col.buyer.ad'/>"/>
<input id="gridColSmAd"			type="hidden" value="<spring:message code='grid.col.sm.ad'/>"/>
<input id="gridColQcAd"			type="hidden" value="<spring:message code='grid.col.qc.ad'/>"/>
<input id="gridColSearch"			type="hidden" value="<spring:message code='grid.col.search'/>"/>
<input id="gridColTotalText"			type="hidden" value="<spring:message code='grid.col.total.text'/>"/>

<input id="gridColMprEm"			type="hidden" value="<spring:message code='grid.col.mpr.em'/>"/>
<input id="gridColMprBuyer"			type="hidden" value="<spring:message code='grid.col.mpr.buyer'/>"/>
<input id="gridColMprProduce"			type="hidden" value="<spring:message code='grid.col.mpr.produce'/>"/>
<input id="gridColMprTotal"			type="hidden" value="<spring:message code='grid.col.mpr.total'/>"/>

<input id="gridColMprType"			type="hidden" value="<spring:message code='grid.col.mpr.type'/>"/>
<input id="gridColMprIncrease"			type="hidden" value="<spring:message code='grid.col.mpr.increase'/>"/>
<input id="gridColMprLastMonth"			type="hidden" value="<spring:message code='grid.col.mpr.last.month'/>"/>
<input id="gridColMprMonth"			type="hidden" value="<spring:message code='grid.col.mpr.month'/>"/>
<input id="gridColMprNextMonth"			type="hidden" value="<spring:message code='grid.col.mpr.next.month'/>"/>
<input id="gridColMprPlan"			type="hidden" value="<spring:message code='grid.col.mpr.plan'/>"/>
<input id="gridColMprResult"			type="hidden" value="<spring:message code='grid.col.mpr.result'/>"/>
<input id="gridColMprContent"			type="hidden" value="<spring:message code='grid.col.mpr.content'/>"/>
<input id="gridColMprForecast"				type="hidden" value="<spring:message code='grid.col.mpr.forecast'/>"/>

<input id="gridColIdsmManufacturing"		type="hidden" value="<spring:message code='grid.col.idsm.manufacturing'/>"/>
<input id="gridColIdsmMpr"					type="hidden" value="<spring:message code='grid.col.idsm.mpr'/>"/>
<input id="gridColIdsmMprMds"				type="hidden" value="<spring:message code='grid.col.idsm.mpr.mds'/>"/>
<input id="gridColIdsmMprMda"				type="hidden" value="<spring:message code='grid.col.idsm.mpr.mda'/>"/>
<input id="gridColIdsmMprMtl"				type="hidden" value="<spring:message code='grid.col.idsm.mpr.mtl'/>"/>
<input id="gridColIdsmMprMfg"				type="hidden" value="<spring:message code='grid.col.idsm.mpr.mfg'/>"/>
<input id="gridColIdsmMprFat"				type="hidden" value="<spring:message code='grid.col.idsm.mpr.fat'/>"/>


<input id="fileSelectText"			type="hidden" value="<spring:message code='file.select.text'/>"/>
<input id="fileSelectDragText"			type="hidden" value="<spring:message code='file.select.drag.text'/>"/>
<input id="fileAttachedText"			type="hidden" value="<spring:message code='file.attached.text'/>"/>

<input id="alertSaveMaterialManageTypeNullErr"			type="hidden" value="<spring:message code='alert.save.material.manage.type.null.err'/>"/>
<input id="alertSaveMaterialManageCategroyNullErr"			type="hidden" value="<spring:message code='alert.save.material.manage.category.null.err'/>"/>
<input id="alertSaveMaterialManageSubCategoryNullErr"			type="hidden" value="<spring:message code='alert.save.material.manage.sub.category.null.err'/>"/>
<input id="alertSearchOneCriteria"			type="hidden" value="<spring:message code='alert.search.one.criteria'/>"/>
<input id="alertSearchPkgOneCriteria"			type="hidden" value="<spring:message code='alert.searchpkg.one.criteria'/>"/>
<input id="alertSearchPkgTwoCriteria"			type="hidden" value="<spring:message code='alert.searchpkg.two.criteria'/>"/>
<input id="alertSearchDtlOneCriteria"			type="hidden" value="<spring:message code='alert.searchdtl.one.criteria'/>"/>
<input id="alertSearchDtlTwoCriteria"			type="hidden" value="<spring:message code='alert.searchdtl.two.criteria'/>"/>
<input id="alertSaveMaterialManageRsiConfirmQtyErr"			type="hidden" value="<spring:message code='alert.save.material.manage.rsi.confirm.qty.err'/>"/>

<input id="alertLocationDuplication"					type="hidden" value="<spring:message code='alert.location.duplication'			/>"/>
<input id="alertLocationSaveQtyZero"					type="hidden" value="<spring:message code='alert.location.save.qty.zero'			/>"/>

<input id="alertIDCSSync"					type="hidden" value="<spring:message code='alert.idcs.sync'			/>"/>
<input id="alertIDCSCreateUserCheckError"					type="hidden" value="<spring:message code='alert.idcs.create.user.check.error'			/>"/>
<input id="alertIDCSCreateUserCheckErrorNoParam"					type="hidden" value="<spring:message code='alert.idcs.create.user.check.errornop'			/>"/>
<input id="alertIDCSResetPasswordError"					type="hidden" value="<spring:message code='alert.idcs.reset.password.error'			/>"/>
<input id="alertIDCSSave"					type="hidden" value="<spring:message code='alert.idcs.save'			/>"/>

<input id="alertManageRsiConfirmQty"					type="hidden" value="<spring:message code='alert.manage.rsi.confirm.qty'			/>"/>
<input id="alertManageRsiConfirmRemainQty"					type="hidden" value="<spring:message code='alert.manage.rsi.confirm.remain.qty'			/>"/>

<input id="alertManageMrrReceivedDateErr"					type="hidden" value="<spring:message code='alert.manage.mrr.reveiveddate.check.err'			/>"/>
<input id="alertManageMrrInspectionDateErr"					type="hidden" value="<spring:message code='alert.manage.mrr.inspectiondate.check.err'		/>"/>

<input id="alertManageMrrDtlReceivedDateNullErr"					type="hidden" value="<spring:message code='alert.manage.mrrdtl.reveiveddate.null.err'			/>"/>
<input id="alertManageMrrDtlReceivedDatRangeErr"					type="hidden" value="<spring:message code='alert.manage.mrrdtl.reveiveddate.range.err'			/>"/>
<input id="alertManageMrrDtlVisualNullErr"					type="hidden" value="<spring:message code='alert.manage.mrrdtl.visualcheck.null.err'		/>"/>

<input id="alertManageMirDtlOdslNullErr"					type="hidden" value="<spring:message code='alert.manage.mrrdtl.odslresult.null.err'		/>"/>
<input id="alertSubconHasNotRole"					type="hidden" value="<spring:message code='alert.manage.subcon.norole'		/>"/>

<input id="alertMirInspResultNullErrAll" type="hidden" value="<spring:message code='alert.manage.mirdtl.insp.null.err'/>"/>
<input id="alertMirInspDefectQtyNullErrAll" type="hidden" value="<spring:message code='alert.manage.mirdtl.inspdefectqty.null.err'/>"/>
<input id="alertMirInspDefectOsdmNullErrAll" type="hidden" value="<spring:message code='alert.manage.mirdtl.inspdefectosdm.null.err'/>"/>
<input id="alertMirInspDefectOsdmQtyNullErrAll" type="hidden" value="<spring:message code='alert.manage.mirdtl.inspdefectosdmqty.null.err'/>"/>

<input id="alertSaveAlreadyPoData"			    type="hidden" value="<spring:message code='alert.save.already.po.data'/>"/>

<input id="alertConfirmVtsTaskChange"			    type="hidden" value="<spring:message code='alert.confirm.vts.task.change'/>"/>
<input id="alertConfirmVtsTaskReset"			    type="hidden" value="<spring:message code='alert.confirm.vts.task.reset'/>"/>
<input id="alertVtsNoChangeTask"			    type="hidden" value="<spring:message code='alert.vts.no.task.change'/>"/>
<input id="alertConfirmVtsPrChange"			    type="hidden" value="<spring:message code='alert.confirm.vts.pr.change'/>"/>
<input id="alertConfirmVtsPrReset"			    type="hidden" value="<spring:message code='alert.confirm.vts.pr.reset'/>"/>
<input id="alertVtsNoChangePr"			    type="hidden" value="<spring:message code='alert.vts.no.pr.change'/>"/>

</div>
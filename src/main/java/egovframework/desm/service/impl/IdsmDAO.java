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
package egovframework.desm.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;



@Repository("idsmDAO")
public class IdsmDAO extends EgovAbstractMapper {


	private final String MainMapper = "sql.IdsmMapper";

    public int updateSetLanguage(Map<String, Object> paramMap) {
        return update(MainMapper + ".updateSetLanguage",paramMap);
    }

    public List getIdsmSetupProject(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getIdsmSetupProject",paramMap);
    }

    public List<Map<String, Object>> getIdsmSetupDlgMprProject(Map<String, Object> paramMap) {
    	 return selectList(MainMapper + ".getIdsmSetupDlgMprProject",paramMap);
	}

    public List getPo(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getPo",paramMap);
    }

    public List getIdsmProjectMgtProject(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getIdsmProjectMgtProject",paramMap);
    }

    public List getBlrSchmapProject(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getBlrSchmapProject",paramMap);
    }

    public List getIdsmSetup(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getIdsmSetup",paramMap);
    }

    public int saveIdsmSetup(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveIdsmSetup",paramMap);
    }

    public List getIdsmSetupDlgInvEditList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getIdsmSetupDlgInvEditList",paramMap);
    }

    public List getIdsmSetupDlgInvEditAllList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getIdsmSetupDlgInvEditAllList",paramMap);
    }

    public int deleteIdsmSetupDlgInvEdit(Map<String, Object> paramMap) {
        return update(MainMapper + ".deleteIdsmSetupDlgInvEdit",paramMap);
    }

    public int saveIdsmSetupDlgInvEdit(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveIdsmSetupDlgInvEdit",paramMap);
    }

    public List getIdsmSetupDlgCreateItemProject(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getIdsmSetupDlgCreateItemProject",paramMap);
    }

    public List getIdsmSetupDlgItemScheduleItem(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getIdsmSetupDlgItemScheduleItem",paramMap);
    }

    public List getIdsmSetupDlgItemScheduleItemTreeName(Map<String, Object> paramMap) {
    	return selectList(MainMapper + ".getIdsmSetupDlgItemScheduleItemTreeName",paramMap);
    }

    public int saveIdsmSetupDlgItemScheduleItemEdit(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveIdsmSetupDlgItemScheduleItemEdit",paramMap);
    }

    public int saveIdsmSetupDlgItemScheduleAttach(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveIdsmSetupDlgItemScheduleAttach",paramMap);
    }

    public List getIdsmSetupDlgItemScheduleAdmin(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getIdsmSetupDlgItemScheduleAdmin",paramMap);
    }

    public List getIdsmSetupDlgAdminAddList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getIdsmSetupDlgAdminAddList",paramMap);
    }

    public int deleteIdsmSetupDlgItemScheduleAdmin(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteIdsmSetupDlgItemScheduleAdmin",paramMap);
    }

    public int saveIdsmSetupDlgItemScheduleAdmin(Map<String, Object> paramMap) {
        return insert(MainMapper + ".saveIdsmSetupDlgItemScheduleAdmin",paramMap);
    }

    public int updateIdsmSetupDlgItemScheduleAdmin(Map<String, Object> paramMap) {
        return update(MainMapper + ".updateIdsmSetupDlgItemScheduleAdmin",paramMap);
    }

    public List getIdsmSetupDlgCreateItemMstSeq(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getIdsmSetupDlgCreateItemMstSeq",paramMap);
    }

    public int saveIdsmSetupDlgCreateItemMst(Map<String, Object> paramMap) {
        return insert(MainMapper + ".saveIdsmSetupDlgCreateItemMst",paramMap);
    }

    public int saveIdsmSetupDlgCreateItemMstBatch(Map<String, Object> paramMap) {
        return insert(MainMapper + ".saveIdsmSetupDlgCreateItemMstBatch",paramMap);
    }

    public int deleteIdsmSetup(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteIdsmSetup",paramMap);
    }

    public int deleteIdsmProjectMgt(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteIdsmProjectMgt",paramMap);
    }

    public int insertLogInfo(Map<String, Object> paramMap) {
        return insert(MainMapper + ".insertLogInfo",paramMap);
    }

    public List getIdsmSetupDlgExcelUploadDownload(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getIdsmSetupDlgExcelUploadDownload",paramMap);
    }

    public List getIdsmSetupExceluploadSeq(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getIdsmSetupExceluploadSeq",paramMap);
    }

    public int saveIdsmSetupExceluploadMst(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveIdsmSetupExceluploadMst",paramMap);
    }

    public int deleteIdsmSetupExceluploadAdmin(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteIdsmSetupExceluploadAdmin",paramMap);
    }

    public int svaeIdsmSetupExceluploadAdmin(Map<String, Object> paramMap) {
        return update(MainMapper + ".svaeIdsmSetupExceluploadAdmin",paramMap);
    }

    public int deleteIdsmSetupExceluploadInv(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteIdsmSetupExceluploadInv",paramMap);
    }

    public int saveIdsmSetupExceluploadInv(Map<String, Object> paramMap) {
        return insert(MainMapper + ".saveIdsmSetupExceluploadInv",paramMap);
    }

    public int deleteIdsmSetupExceluploadExcelData(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteIdsmSetupExceluploadExcelData",paramMap);
    }

    public int deleteIdsmSetupExceluploadItemMst(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteIdsmSetupExceluploadItemMst",paramMap);
    }

    public int saveIdsmSetupExceluploadExcelData(Map<String, Object> paramMap) {
        return insert(MainMapper + ".saveIdsmSetupExceluploadExcelData",paramMap);
    }

    public List getIdsmScheduleEtc(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getIdsmScheduleEtc",paramMap);
    }

    public List getIdsmSetupExceluploadUpdateSeq(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getIdsmSetupExceluploadUpdateSeq",paramMap);
    }

    public int saveIdsmSetupExceluploadMstUpdate(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveIdsmSetupExceluploadMstUpdate",paramMap);
    }

    public int deleteIdsmSetupExceluploadAdminUpdate(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteIdsmSetupExceluploadAdminUpdate",paramMap);
    }

    public int svaeIdsmSetupExceluploadAdminUpdate(Map<String, Object> paramMap) {
        return insert(MainMapper + ".svaeIdsmSetupExceluploadAdminUpdate",paramMap);
    }

    public int deleteIdsmSetupExceluploadInvUpdate(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteIdsmSetupExceluploadInvUpdate",paramMap);
    }

    public List getIdsmSetupDlgItemScheduleItemEditCheck(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getIdsmSetupDlgItemScheduleItemEditCheck",paramMap);
    }

    public List getIdsmSetupDlgInoviceSeqList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getIdsmSetupDlgInoviceSeqList",paramMap);
    }

    public int saveIdsmSetupDlgInoviceSeqList(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveIdsmSetupDlgInoviceSeqList",paramMap);
    }

    public int deleteIdsmSetupDlgInoviceSeqList(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteIdsmSetupDlgInoviceSeqList",paramMap);
    }

    public List getIdsmSetupDlgInvEditInvInfoList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getIdsmSetupDlgInvEditInvInfoList",paramMap);
    }

    public List getIdsmSetupDlgInvEditInvSeqList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getIdsmSetupDlgInvEditInvSeqList",paramMap);
    }

    public List getIdsmSchmapList(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getIdsmSchmapList",paramMap);
    }

    public List getIdsmSchmapInfo(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getIdsmSchmapInfo",paramMap);
    }

    public List getIdsmBlrSchmapList(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getIdsmBlrSchmapList",paramMap);
    }

    public List getIdsmBlrSchmapInfo(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getIdsmBlrSchmapInfo",paramMap);
    }

    public int createIdsmSchmapList(Map<String, Object> paramMap) {
        return insert(MainMapper + ".createIdsmSchmapList",paramMap);
    }

    public int syncIdsmSchmapList(Map<String, Object> paramMap) {
        return update(MainMapper + ".syncIdsmSchmapList",paramMap);
    }

    public int createIdsmBlrSchmapList(Map<String, Object> paramMap) {
        return insert(MainMapper + ".createIdsmBlrSchmapList",paramMap);
    }

    public int syncIdsmBlrSchmapList(Map<String, Object> paramMap) {
        return update(MainMapper + ".syncIdsmBlrSchmapList",paramMap);
    }

    public int saveIdsmSchmap(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveIdsmSchmap",paramMap);
    }

    public int saveIdsmBlrSchmap(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveIdsmBlrSchmap",paramMap);
    }

    public int saveIdsmSchmapExcelUpload(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveIdsmSchmapExcelUpload",paramMap);
    }

    public int saveIdsmBlrSchmapExcelUpload(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveIdsmBlrSchmapExcelUpload",paramMap);
    }

    public List getIdsmSchmapViewList(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getIdsmSchmapViewList",paramMap);
    }

    public List getIdsmProjectMgtUserList(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getIdsmProjectMgtUserList",paramMap);
    }

    public List getIdsmProjectMgtProjectList(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getIdsmProjectMgtProjectList",paramMap);
    }

    public List getIdsmSchmapViewDlgDetail(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getIdsmSchmapViewDlgDetail",paramMap);
    }

    public Map syncIdsmSchmapView(Map<String, Object> paramMap) {

        return selectOne(MainMapper + ".syncIdsmSchmapView",paramMap);
    }

    public int deleteIdsmProjectMgtUserList(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteIdsmProjectMgtUserList",paramMap);
    }

    public int updateIdsmProjectMgtUserList(Map<String, Object> paramMap) {
        return update(MainMapper + ".updateIdsmProjectMgtUserList",paramMap);
    }

    public int updateIdsmProjectMgtProjectList(Map<String, Object> paramMap) {
        return update(MainMapper + ".updateIdsmProjectMgtProjectList",paramMap);
    }

    public int saveIdsmSetupDlgMemo(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveIdsmSetupDlgMemo",paramMap);
    }

    public List getIdsmSetupDlgMemo(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getIdsmSetupDlgMemo",paramMap);
    }

    public List getIdsmSetupDlgItemScheduleInvCheck(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getIdsmSetupDlgItemScheduleInvCheck",paramMap);
    }

    public int updateIdsmProjectMgtProjectDefault(Map<String, Object> paramMap) {
        return update(MainMapper + ".updateIdsmProjectMgtProjectDefault",paramMap);
    }

    public List getIdsmProjectMgtSiteProjectList(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getIdsmProjectMgtSiteProjectList",paramMap);
    }

    public int deleteIdsmProjectMgtProjectDefault(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteIdsmProjectMgtProjectDefault",paramMap);
    }

    public List getIdsmSetupDlgItemScheduleItemPL(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getIdsmSetupDlgItemScheduleItemPL",paramMap);
    }

    public List getIdsmSetupSeq(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getIdsmSetupSeq",paramMap);
    }

    public int saveIdsmSetupAuth(Map<String, Object> paramMap) {
        return insert(MainMapper + ".saveIdsmSetupAuth",paramMap);
    }

    public List getIdsmSetupPlCheckList(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getIdsmSetupPlCheckList",paramMap);
    }

    public List getIdsmSetupDlgItemScheduleItemEditSequenceCheck(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getIdsmSetupDlgItemScheduleItemEditSequenceCheck",paramMap);
    }

    public List getIdsmSetupDlgItemSequenceCheckList(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getIdsmSetupDlgItemSequenceCheckList",paramMap);
    }

    public List getIdsmSetupDlgItemSequenceList(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getIdsmSetupDlgItemSequenceList",paramMap);
    }

    public int saveIdsmSetupDlgItemSequence(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveIdsmSetupDlgItemSequence",paramMap);
    }

	public void deleteIdsmSetupDifferentName() {
		 delete(MainMapper + ".deleteIdsmSetupDifferentName");
	}

	public List<Map<String, Object>> getIdsmSchedule(Map<String, Object> paramMap) {
		return selectList(MainMapper + ".getIdsmSchedule",paramMap);
	}
	
	public List getIdsmTaskList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getIdsmTaskList",paramMap);
    }
	
	public List getIdsmPrNoList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getIdsmPrNoList",paramMap);
    }
	
	public List getIdsmMprList(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getIdsmMprList",paramMap);
    }
	
	public List getIdsmSetupT(Map<String, Object> paramMap) {

        return selectList(MainMapper + ".getIdsmSetupT",paramMap);
    }
	
	public int saveIdsmSetupT(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveIdsmSetupT",paramMap);
    }

    /** 
    	Spare part & Special Tool
    */  
	public List getIdsmSupplySpSt(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getIdsmSupplySpSt",paramMap);
    }

	public List getIdsmTrkItemSeq(Map<String, Object> paramMap) {
        return selectList(MainMapper + ".getIdsmTrkItemSeq",paramMap);
    }
	
	public int saveIdsmItemSupplySpSt(Map<String, Object> paramMap) {
        return update(MainMapper + ".saveIdsmItemSupplySpSt",paramMap);
    }

	public int deleteIdsmItemSupplySpSt(Map<String, Object> paramMap) {
        return delete(MainMapper + ".deleteIdsmItemSupplySpSt",paramMap);
    }
	
	public Map<String, Object> getMprSeqRecent(Map<String, Object> paramMap) {
		return selectOne(MainMapper + ".getMprSeqRecent", paramMap);
	}
	
}

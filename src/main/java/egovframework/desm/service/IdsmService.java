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

import java.util.List;
import java.util.Map;


public interface IdsmService {

	public List<Map<String, Object>> getIdsmSetupProject(Map<String, Object> paramMap);

	public List<Map<String, Object>> getPo(Map<String, Object> paramMap);

	public List<Map<String, Object>> getDesmDlgPoList(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmProjectMgtProject(Map<String, Object> paramMap);

	public List<Map<String, Object>> getBlrSchmapProject(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmSetup(Map<String, Object> paramMap);

	public int saveIdsmSetup(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> saveIdsmSetupSeq(Map<String, Object> paramMap) throws Exception;

	public Map<String, Object> getIdsmSetupDlgInvEdit(Map<String, Object> paramMap);

	public int deleteIdsmSetupDlgInvEdit(Map<String, Object> paramMap) throws Exception;

	public int saveIdsmSetupDlgInvEdit(Map<String, Object> paramMap) throws Exception;

	public int saveIdsmProjectMgt(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getIdsmSetupDlgCreateItemProject(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmSetupDlgItemScheduleItem(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmSetupDlgItemScheduleItemTreeName(Map<String, Object> paramMap);

	public int saveIdsmSetupDlgItemScheduleItemEdit(Map<String, Object> paramMap) throws Exception;

	public int saveIdsmSetupDlgItemScheduleAttach(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getIdsmSetupDlgItemScheduleAdmin(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmSetupDlgAdminAddList(Map<String, Object> paramMap);

	public int deleteIdsmSetupDlgItemScheduleAdmin(Map<String, Object> paramMap) throws Exception;

	public int saveIdsmSetupDlgItemScheduleAdmin(Map<String, Object> paramMap) throws Exception;

	public int saveIdsmSetupDlgCreateItem(Map<String, Object> paramMap) throws Exception;

	public int deleteIdsmSetup(Map<String, Object> paramMap) throws Exception;

	public int deleteIdsmProjectMgt(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getIdsmSetupDlgExcelUploadDownload(Map<String, Object> paramMap);

	public int saveIdsmSetupExceluploadSave(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getIdsmSetupDlgProject(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmProjectMgtDlgProject(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmBlrDlgProject(Map<String, Object> paramMap);


	public List<Map<String, Object>> getIdsmScheduleEtc(Map<String, Object> paramMap);

	public int saveIdsmSetupExceluploadUpdate(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getIdsmSetupDlgItemScheduleItemEditCheck(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmSetupDlgInoviceSeqList(Map<String, Object> paramMap);

	public int saveIdsmSetupDlgInoviceSeqList(Map<String, Object> paramMap) throws Exception;

	public int deleteIdsmSetupDlgInoviceSeqList(Map<String, Object> paramMap) throws Exception;

	public Map<String, Object> getIdsmSetupDlgInvEditInvSeq(Map<String, Object> paramMap) throws Exception;

	public Map<String, Object> getIdsmSchmapList(Map<String, Object> paramMap);

	public Map<String, Object> getIdsmBlrSchmapList(Map<String, Object> paramMap);

	public int saveIdsmSchmapList(Map<String, Object> paramMap) throws Exception;

	public int saveIdsmBlrSchmapList(Map<String, Object> paramMap) throws Exception;

	public int saveIdsmSchmap(Map<String, Object> paramMap) throws Exception;

	public int saveIdsmBlrSchmap(Map<String, Object> paramMap) throws Exception;

	public int saveIdsmSchmapExcelUpload(Map<String, Object> paramMap) throws Exception;

	public int saveIdsmBlrSchmapExcelUpload(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getIdsmSchmapViewList(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmProjectMgtUserList(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmProjectMgtProjectList(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmSchmapViewDlgDetail(Map<String, Object> paramMap);

	public String syncIdsmSchmapView(Map<String, Object> paramMap) throws Exception;

	public int saveIdsmSetupDlgMemo(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getIdsmSetupDlgMemo(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmSetupDlgItemScheduleInvCheck(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmSetupDlgItemScheduleItemPL(Map<String, Object> paramMap);

	public List<Map<String, Object>> getIdsmSetupDlgItemScheduleItemEditSequenceCheck(Map<String, Object> paramMap);

	public int saveIdsmSetupDlgItemSequence(Map<String, Object> paramMap) throws Exception;

	public void deleteIdsmSetupDifferentName()  throws Exception;

	public List<Map<String, Object>> getIdsmSetupDlgMprProject(Map<String, Object> paramMap) throws Exception;

	public List<Map<String, Object>> getIdsmSchedule(Map<String, Object> paramMap) throws Exception;
	
	public Map<String, Object> getIdsmTaskList(Map<String, Object> paramMap);
	
	public Map<String, Object> getIdsmPrNoList(Map<String, Object> paramMap);
	
	public Map<String, Object> getIdsmMprList(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getIdsmSetupT(Map<String, Object> paramMap);
	
	public int saveIdsmSetupT(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> saveIdsmSetupSeqT(Map<String, Object> paramMap) throws Exception;

    /** 
    	Spare part & Special Tool
    */  
	public List<Map<String, Object>> getIdsmSupplySpSt(Map<String, Object> paramMap) throws Exception;
	public List<Map<String, Object>> getIdsmTrkItemSeq(Map<String, Object> paramMap) throws Exception;
	public int saveIdsmItemSupplySpSt(Map<String, Object> paramMap) throws Exception;
	public int deleteIdsmItemSupplySpSt(Map<String, Object> paramMap) throws Exception;
	public int saveIdsmSupplySpStExceluploadUpdate(Map<String, Object> paramMap) throws Exception;
	
	public Map<String, Object> getMprSeqRecent(Map<String, Object> paramMap) throws Exception;
	
}

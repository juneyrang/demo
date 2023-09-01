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

public interface TransShippingRequestService {
	
	public List<Map<String, Object>> getTransShippingRequest(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getTransShippingRequestVendor(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getTransShippingRequestVendorPopUp(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getTransShippingRequestDept(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getTransShippingRequestDeptPopUp(Map<String, Object> paramMap);
	
	public int saveTransShippingRequest(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> getTransShippingRequestMailEmp(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getTransShippingRequestDlgEditMailList(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getTransShippingRequestDlgEditPackingDetailList(Map<String, Object> paramMap);
	
	public int deleteTransShippingRequest(Map<String, Object> paramMap) throws Exception;

	public int deleteTransShippingRequestFOB(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> getTransShippingRequestDlgAttList(Map<String, Object> paramMap);
	
	public int deleteTransShippingRequestDlgAttList(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> getTransShippingRequestFileCheckGrp(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getTransShippingRequestFileCheckId(Map<String, Object> paramMap);
	
	public int saveTransShippingRequestDlgAttList(Map<String, Object> paramMap) throws Exception;
	
	public int saveTransShippingRequestFileGrpCd(Map<String, Object> paramMap) throws Exception;
	
	public int completeTransShippingRequest(Map<String, Object> paramMap) throws Exception;
	
	public int rejectTransShippingRequest(Map<String, Object> paramMap) throws Exception;
	
	public int sendMailTransShippingRequest(Map<String, Object> paramMap) throws Exception;
}

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

public interface AttachService {
	
	public List<Map<String, Object>> getAttachList(Map<String, Object> paramMap); // getTransShippingRequestDlgAttList
	
	public int deleteAttachList(Map<String, Object> paramMap) throws Exception; // deleteTransShippingRequestDlgAttList
	
	public List<Map<String, Object>> getFileCheckGrp(Map<String, Object> paramMap); // getTransShippingRequestFileCheckGrp
	
	public List<Map<String, Object>> getFileCheckId(Map<String, Object> paramMap); //getTransShippingRequestFileCheckId
	
	public int saveAttachList(Map<String, Object> paramMap) throws Exception; // saveAttachList
	
	public List<Map<String, Object>> getFileById(Map<String, Object> paramMap);
}

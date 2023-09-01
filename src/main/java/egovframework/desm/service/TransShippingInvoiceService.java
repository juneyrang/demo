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

public interface TransShippingInvoiceService {

	public List<Map<String, Object>> getTransShippingInvoice(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getTransShippingInvoiceDlgDetailRequest(Map<String, Object> paramMap);
	
	public List<Map<String, Object>> getTransShippingInvoiceDlgDetailPackingList(Map<String, Object> paramMap);
	
	public int saveTransShippingInvoiceDlgAttList(Map<String, Object> paramMap) throws Exception;
	
	public Map<String, Object> getTransShippingInvoiceMainProject(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> getTransShippingInvoiceDlgTransRequestMailList(Map<String, Object> paramMap);
	
	public Map<String, Object> getTransShippingInvoiceProjectInfo(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> getTransShippingInvoiceDlgTransRequestInvoiceList(Map<String, Object> paramMap) throws Exception;
	
	public List<Map<String, Object>> getTransShippingInvoiceDlgPort(Map<String, Object> paramMap);
	
	public Map<String, Object> completeTransShippingInvoice(Map<String, Object> paramMap) throws Exception;
	
	public int sendMailTransShippingInvoice(Map<String, Object> paramMap) throws Exception;

}

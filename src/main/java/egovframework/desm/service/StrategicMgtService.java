/**
 * 운송관리 > 전략물자관리
 */
package egovframework.desm.service;

import java.util.List;
import java.util.Map;

public interface StrategicMgtService {

	/**
	 * 운송관리 > 전략물자관리 > 목록 조회
	 */
	public List< Map< String, Object > > selectStrategicMgtList( Map< String, Object > paramMap );

	/**
	 * 운송관리 > 전략물자관리 > 승인 상태 변경
	 */
	public int updateStrategicMgtListStatus( Map< String, Object > paramMap ) throws Exception;

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 상세 조회
	 */
	public List< Map< String, Object > > selectStrategicMgtDetailPop( Map< String, Object > paramMap );
 
	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 전략물자 판정 List 조회
	 */
	public List< Map< String, Object > > selectStrategicMgtDetailPopPackageNoList( Map< String, Object > paramMap );

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 전략물자 판정 List 저장
	 */
	public int saveStrategicMgtDetailPopPackageNoList( Map< String, Object > paramMap ) throws Exception;

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 전략물자 판정 List 삭제
	 */
	public int deleteStrategicMgtDetailPopPackageNoList( Map< String, Object > paramMap ) throws Exception;

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 코멘트 목록 조회
	 */
	public List< Map< String, Object > > selectStrategicMgtDetailPopComment( Map< String, Object > paramMap );

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 코멘트 목록 저장
	 */
	public int insertStrategicMgtDetailPopComment( Map< String, Object > paramMap ) throws Exception;

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 코멘트 목록 삭제
	 */
	public int deleteStrategicMgtDetailPopComment( Map< String, Object > paramMap ) throws Exception;

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 수정 shippingRequestlInfo
	 */
	public int saveStrategicMgtDetailPop( Map< String, Object > paramMap ) throws Exception;
	
	public int updateStrategicMgtDetailPop( Map< String, Object > paramMap ) throws Exception;
	
	public int sendMailStrategicMgt(Map<String, Object> paramMap) throws Exception;
	
	public List< Map< String, Object > > getDlgTransStrategicMgtCopyList( Map< String, Object > paramMap );
	
	public int saveDlgTransStrategicMgtCopyList( Map< String, Object > paramMap ) throws Exception;
	
	public List< Map< String, Object > > getDlgTransStrategicMgtAttCopyList( Map< String, Object > paramMap );
	
	public int saveDlgTransStrategicMgtAttCopyList( Map< String, Object > paramMap ) throws Exception;
	
	public int saveDlgTransStrategicMgtAttCopyListMstData( Map< String, Object > paramMap ) throws Exception;

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 삭제
	 */
	public int deleteStrategicMgtDetailPop( Map< String, Object > paramMap ) throws Exception;
	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 전략물자 판정 List 삭제
	 */
	public int deleteAllStrategicMgtDetailPopPackageNoList( Map< String, Object > paramMap ) throws Exception;
	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 첨부파일 삭제
	 */
	public int deleteDlgTransStrategicMgtAttCopyList( Map< String, Object > paramMap ) throws Exception;
	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 코멘트 목록 삭제
	 */
	public int deleteAllStrategicMgtDetailPopComment( Map< String, Object > paramMap ) throws Exception;
	
	
	public List<Map<String, Object>> getStrategicEwsList(Map<String, Object> paramMap);
	
	public int deleteStrategicEwsList(Map<String, Object> paramMap) throws Exception;

	public int saveStrategicEwsReceiver(Map<String, Object> paramMap) throws Exception;
}

/**
 * 운송관리 > 전략물자관리
 */
package egovframework.desm.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

@Repository( "strategicMgtDAO" )
public class StrategicMgtDAO extends EgovAbstractMapper {

	private final String MainMapper = "sql.StrategicMgtMapper";	

	/**
	 * 운송관리 > 전략물자관리 > 목록 조회
	 */
	public List< Map< String, Object > > selectStrategicMgtList( Map<String, Object> paramMap ) {
		return selectList( MainMapper + ".selectStrategicMgtList", paramMap );	
	}

	/**
	 * 운송관리 > 전략물자관리 > 승인 상태 변경
	 */
	public int updateStrategicMgtListStatus( Map<String, Object> paramMap ) {
		return update(MainMapper + ".updateStrategicMgtListStatus", paramMap );
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 상세 조회
	 */
	public List< Map< String, Object > > selectStrategicMgtDetailPop( Map<String, Object> paramMap ) {
		return selectList( MainMapper + ".selectStrategicMgtDetailPop", paramMap );	
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 전략물자 판정 List 조회
	 */
	public List< Map< String, Object > > selectStrategicMgtDetailPopPackageNoList( Map<String, Object> paramMap ) {
		return selectList( MainMapper + ".selectStrategicMgtDetailPopPackageNoList", paramMap );	
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 전략물자 판정 List 생성
	 */
	public int insertStrategicMgtDetailPopPackageNoList( Map<String, Object> paramMap ) {
		return insert( MainMapper + ".insertStrategicMgtDetailPopPackageNoList", paramMap );
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 전략물자 판정 List 수정
	 */
	public int updateStrategicMgtDetailPopPackageNoList( Map<String, Object> paramMap ) {
		return insert( MainMapper + ".updateStrategicMgtDetailPopPackageNoList", paramMap );
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 전략물자 판정 List 삭제
	 */
	public int deleteStrategicMgtDetailPopPackageNoList(Map<String, Object> paramMap) {
		return delete(MainMapper + ".deleteStrategicMgtDetailPopPackageNoList",paramMap);
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 코멘트 목록 조회
	 */
	public List< Map< String, Object > > selectStrategicMgtDetailPopComment( Map<String, Object> paramMap ) {
		return selectList( MainMapper + ".selectStrategicMgtDetailPopComment", paramMap );	
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 코멘트 목록 저장
	 */
	public int insertStrategicMgtDetailPopComment( Map<String, Object> paramMap ) {
		return insert( MainMapper + ".insertStrategicMgtDetailPopComment", paramMap );
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 코멘트 목록 삭제
	 */
	public int deleteStrategicMgtDetailPopComment(Map<String, Object> paramMap) {
		return delete(MainMapper + ".deleteStrategicMgtDetailPopComment",paramMap);
	}

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 수정
	 */
	public int updateStrategicMgtDetailPop( Map<String, Object> paramMap ) {
		return update(MainMapper + ".updateStrategicMgtDetailPop", paramMap );
	}
	
	public List< Map< String, Object > > getStrategicMgtMailMstData( Map<String, Object> paramMap ) {
		return selectList( MainMapper + ".getStrategicMgtMailMstData", paramMap );	
	}
	
	public List< Map< String, Object > > getStrategicMgtMailCommentData( Map<String, Object> paramMap ) {
		return selectList( MainMapper + ".getStrategicMgtMailCommentData", paramMap );	
	}
	
	public List< Map< String, Object > > getStrategicMgtMailReceiver( Map<String, Object> paramMap ) {
		return selectList( MainMapper + ".getStrategicMgtMailReceiver", paramMap );	
	}
	
	public List< Map< String, Object > > getStrategicMgtMailReceiverAdd( Map<String, Object> paramMap ) {
		return selectList( MainMapper + ".getStrategicMgtMailReceiverAdd", paramMap );	
	}	
	
	public List< Map< String, Object > > getStrategicShippingReqReceiverList( Map<String, Object> paramMap ) {
		return selectList( MainMapper + ".getStrategicShippingReqReceiverList", paramMap );	
	}
	
	public List< Map< String, Object > > getDlgTransStrategicMgtCopyList( Map<String, Object> paramMap ) {
		return selectList( MainMapper + ".getDlgTransStrategicMgtCopyList", paramMap );	
	}	
	
	public int saveDlgTransStrategicMgtCopyList( Map<String, Object> paramMap ) {
		return insert( MainMapper + ".saveDlgTransStrategicMgtCopyList", paramMap );
	}	
	
	public List< Map< String, Object > > getDlgTransStrategicMgtAttCopyList( Map<String, Object> paramMap ) {
		return selectList( MainMapper + ".getDlgTransStrategicMgtAttCopyList", paramMap );	
	}	
	
	public int saveDlgTransStrategicMgtAttCopyList( Map<String, Object> paramMap ) {
		return insert( MainMapper + ".saveDlgTransStrategicMgtAttCopyList", paramMap );
	}
	
	public int saveDlgTransStrategicMgtAttCopyListMstData( Map<String, Object> paramMap ) {
		return update( MainMapper + ".saveDlgTransStrategicMgtAttCopyListMstData", paramMap );
	}	

	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 삭제
	 */
	public int deleteStrategicMgtDetailPop( Map<String, Object> paramMap ) {
		return delete(MainMapper + ".deleteStrategicMgtDetailPop", paramMap );
	}
	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 전략물자 판정 List 삭제
	 */
	public int deleteAllStrategicMgtDetailPopPackageNoList(Map<String, Object> paramMap) {
		return delete(MainMapper + ".deleteAllStrategicMgtDetailPopPackageNoList",paramMap);
	}
	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 첨부파일 삭제
	 */
	public int deleteDlgTransStrategicMgtAttCopyList(Map<String, Object> paramMap) {
		return delete(MainMapper + ".deleteDlgTransStrategicMgtAttCopyList",paramMap);
	}
	/**
	 * 운송관리 > 전략물자관리 > 전략물자관리 상세 팝업 > 코멘트 목록 삭제
	 */
	public int deleteAllStrategicMgtDetailPopComment(Map<String, Object> paramMap) {
		return delete(MainMapper + ".deleteAllStrategicMgtDetailPopComment",paramMap);
	}
	
	public List<Map<String, Object>> getStrategicEwsList(Map<String, Object> paramMap) {
		return selectList(MainMapper + ".getStrategicEwsList", paramMap);
	}
	
	public int deleteStrategicEwsUser(Map<String, Object> paramMap) {
        return delete(MainMapper +".deleteStrategicEwsUser", paramMap);
    }
	
	public int getStrategicEwsReceiverCount(Map<String, Object> paramMap) {
        return selectOne(MainMapper +".getStrategicEwsReceiverCount", paramMap);
    }
	
	public int insertStrategicEwsReceiver(Map<String, Object> paramMap) {
        return insert(MainMapper +".insertStrategicEwsReceiver", paramMap);
    }
	
	
}
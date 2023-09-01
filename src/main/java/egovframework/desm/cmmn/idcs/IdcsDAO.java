package egovframework.desm.cmmn.idcs;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

@Repository("idcsDAO")
public class IdcsDAO extends EgovAbstractMapper{
	private final String MainMapper = "sql.IdcsMapper";

	 public int updateUserIDCSYn(Map<String, Object> paramMap) {
	    	return update(MainMapper + ".updateUserIDCSYn",paramMap);
	 }

	public int saveResetPasswordHistory(Map<String, Object> paramMap) {
		return update(MainMapper + ".saveResetPasswordHistory",paramMap);
	}

}

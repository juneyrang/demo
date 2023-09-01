package egovframework.desm.cmmn.firebase;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

@Repository("firebaseDAO")
public class FirebaseDAO extends EgovAbstractMapper{
	private final String MainMapper = "sql.FirebaseMapper";
	
	public int saveFcmToken(Map<String, Object> paramMap) {
		return insert(MainMapper + ".saveFcmToken", paramMap);
	}
	
	public int saveFcmTokenHistory(Map<String, Object> paramMap) {
		return insert(MainMapper + ".saveFcmTokenHistory", paramMap);
	}
	
	public String selectTokenByUserAd(Map<String, Object> paramMap) {
		return selectOne(MainMapper + ".selectTokenByUserAd", paramMap);
	}

}

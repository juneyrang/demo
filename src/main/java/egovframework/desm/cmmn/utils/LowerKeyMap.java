package egovframework.desm.cmmn.utils;

import org.apache.commons.collections.map.ListOrderedMap;
import org.apache.commons.lang3.StringUtils;

/*
 * mybatis에서 Map으로 결과를 받아올 때 key는 보통 대문자로 받아온다.
 * 위의 case는 Oracle 및 그 외 해당하고 아닌 경우도 있다(postgresql은 소문자로 받아온다).
 * 
 * VO를 연결해줄 경우에는 자동으로 매핑하기 때문에 DTO에 명시된 소문자 값을 가져올 수 있지만,
 * 그렇지 않은 경우를 대응하기 위하여 클래스 추가함.
 * */
public class LowerKeyMap extends ListOrderedMap {
	/* */
	private static final long serialVersionUID = 3644623115993184144L;
	
	public Object put(Object key, Object value) {
		return super.put(StringUtils.lowerCase((String) key), value);
	}
}

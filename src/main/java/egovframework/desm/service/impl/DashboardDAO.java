package egovframework.desm.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

@Repository("dashboardDAO")
public class DashboardDAO extends EgovAbstractMapper {

	public List<Map<String, Object>> getPackageSummary(Map<String, Object> paramMap) {
		return selectList("DashboardMapper.getPackageSummary", paramMap);
	}

	public List<Map<String, Object>> getMrrChartSummary(Map<String, Object> paramMap) {
		return selectList("DashboardMapper.getMrrChartSummary", paramMap);
	}

	public List<Map<String, Object>> getMirChartSummary(Map<String, Object> paramMap) {
		return selectList("DashboardMapper.getMirChartSummary", paramMap);
	}


}

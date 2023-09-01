package egovframework.desm.cmmn.vessel;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.property.EgovPropertyService;

@Service("vesselFinderService")
public class VesselFinderServiceImpl extends EgovAbstractServiceImpl implements VesselFinderService {

	private static final Logger logger = LoggerFactory.getLogger(VesselFinderServiceImpl.class);

	@Resource(name="propertiesService")
	protected EgovPropertyService propertiesService;
	
	private String vesselApiURL = "";
	private String vesselUserKey = "";

	/*
	 * context-common.xml bean 등록 init-method, Server 최초 실행시 동작.
	 * */
	@Override
	public void init() {
		// TODO Auto-generated method stub
		vesselApiURL = propertiesService.getString("vessel.api.url");
		vesselUserKey = propertiesService.getString("vessel.user.key");
	}

	@Override
	public List<Map<String, Object>> getVessels(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> getVesselsList(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> getLiveData(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> getPortCalls(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> getExpectedArrivals(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> getMasterData(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> getStatus(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> getListManager(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> getDistance(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
		return null;
	}

}

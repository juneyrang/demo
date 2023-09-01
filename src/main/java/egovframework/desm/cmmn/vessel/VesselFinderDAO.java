package egovframework.desm.cmmn.vessel;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

@Repository("vesselFinderDAO")
public class VesselFinderDAO extends EgovAbstractMapper {

	private final String MainMapper = "sql.VesselFinderMapper";
	
}

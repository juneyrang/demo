package egovframework.desm.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

@Repository("onshoreDAO")
public class OnshoreDAO extends EgovAbstractMapper {

	public List<Map<String, Object>> getDesmContractHeaderId(Map<String, Object> paramMap) {
		return selectList("OnshoreMapper.getDesmContractHeaderId", null);
	}

	public Map<String, Object> getDesmContractHeader(Map<String, Object> paramMap) {
		return selectOne("OnshoreMapper.getDesmContractHeader", paramMap);
	}

	public List<Map<String, Object>> getDesmContractList(Map<String, Object> paramMap) {
		return selectList("OnshoreMapper.getDesmContractList", paramMap);
	}

	public List<Map<String, Object>> getDesmContractLineList(Map<String, Object> paramMap) {
		return selectList("OnshoreMapper.getDesmContractLineList", paramMap);
	}

	public List<Map<String, Object>> getDesmContractContactList(Map<String, Object> paramMap) {
		return selectList("OnshoreMapper.getDesmContractContactList", paramMap);
	}

	public List<Map<String, Object>> getDesmContractPaymentList(Map<String, Object> paramMap) {
		return selectList("OnshoreMapper.getDesmContractPaymentList", paramMap);
	}

    public int saveDesmContractHeader(Map<String, Object> paramMap) {
        return update("OnshoreMapper.saveDesmContractHeader", paramMap);
    }

	public int saveDesmContractContact(Map<String, Object> paramMap) {
        return update("OnshoreMapper.saveDesmContractContact", paramMap);
    }

	public int saveDesmContractInfomation(Map<String, Object> paramMap) {
        return update("OnshoreMapper.saveDesmContractInfomation", paramMap);
    }

	public int saveDesmContractLine(Map<String, Object> paramMap) {
        return update("OnshoreMapper.saveDesmContractLine", paramMap);
    }

	public int saveDesmContractPayment(Map<String, Object> paramMap) {
        return update("OnshoreMapper.saveDesmContractPayment", paramMap);
    }

	public int saveDesmContractStatus(Map<String, Object> paramMap) {
		return update("OnshoreMapper.saveDesmContractStatus", paramMap);
	}

    public int saveDesmContractReject(Map<String, Object> paramMap) {
		return update("OnshoreMapper.saveDesmContractReject",paramMap);
	}

    public int saveDesmContractHeaderHistory(Map<String, Object> paramMap) {
        return update("OnshoreMapper.saveDesmContractHeaderHistory", paramMap);
    }

    public int saveDesmContractLineHistory(Map<String, Object> paramMap) {
        return update("OnshoreMapper.saveDesmContractLineHistory", paramMap);
    }

    public int saveDesmContractFileGrpCd(Map<String, Object> paramMap) {
        return delete("OnshoreMapper.saveDesmContractFileGrpCd", paramMap);
    }

    public int deleteDesmContractHeader(Map<String, Object> paramMap) {
        return delete("OnshoreMapper.deleteDesmContractHeader", paramMap);
    }

    public int deleteDesmContractLine(Map<String, Object> paramMap) {
        return delete("OnshoreMapper.deleteDesmContractLine", paramMap);
    }

    public int deleteDesmContractContact(Map<String, Object> paramMap) {
        return delete("OnshoreMapper.deleteDesmContractContact", paramMap);
    }

    public int deleteDesmContractPayment(Map<String, Object> paramMap) {
        return delete("OnshoreMapper.deleteDesmContractPayment", paramMap);
    }
    
    public List<Map<String, Object>> getMailContractReceiver(Map<String, Object> paramMap) {
		return selectList("OnshoreMapper.getMailContractReceiver", paramMap);
	}

	public List<Map<String, Object>> getDesmOnshoreOrderHeaderId(Map<String, Object> paramMap) {
		return selectList("OnshoreMapper.getDesmOnshoreOrderHeaderId", null);
	}

	public Map<String, Object> getDesmOnshoreOrderHeaderInfo(Map<String, Object> paramMap) {
		return selectOne("OnshoreMapper.getDesmOnshoreOrderHeaderInfo", paramMap);
	}

	public List<Map<String, Object>> getDesmOnshoreOrderHeaderList(Map<String, Object> paramMap) {
		return selectList("OnshoreMapper.getDesmOnshoreOrderHeaderList", paramMap);
	}

	public List<Map<String, Object>> getDesmOnshoreOrderLineList(Map<String, Object> paramMap) {
		return selectList("OnshoreMapper.getDesmOnshoreOrderLineList", paramMap);
	}

    public int saveDesmOnshoreOrderHeader(Map<String, Object> paramMap) {
        return update("OnshoreMapper.saveDesmOnshoreOrderHeader", paramMap);
    }

	public int saveDesmOnshoreOrderLine(Map<String, Object> paramMap) {
        return update("OnshoreMapper.saveDesmOnshoreOrderLine", paramMap);
    }

	public List<Map<String, Object>> getIdsmSetupDlgContractSearch(Map<String, Object> paramMap) {
		return selectList("OnshoreMapper.getIdsmSetupDlgContractSearch", paramMap);
	}

	public List<Map<String, Object>> getDesmOnshoreReceivedHeaderId(Map<String, Object> paramMap) {
		return selectList("OnshoreMapper.getDesmOnshoreReceivedHeaderId", null);
	}

	public List<Map<String, Object>> getDesmOnshoreReceivedHeaderList(Map<String, Object> paramMap) {
		return selectList("OnshoreMapper.getDesmOnshoreReceivedHeaderList", paramMap);
	}

	public List<Map<String, Object>> getDesmOnshoreReceivedLineList(Map<String, Object> paramMap) {
		return selectList("OnshoreMapper.getDesmOnshoreReceivedLineList", paramMap);
	}

    public int saveDesmOnshoreReceivedHeader(Map<String, Object> paramMap) {
        return update("OnshoreMapper.saveDesmOnshoreReceivedHeader", paramMap);
    }

	public int saveDesmOnshoreReceivedLine(Map<String, Object> paramMap) {
        return update("OnshoreMapper.saveDesmOnshoreReceivedLine", paramMap);
    }

}

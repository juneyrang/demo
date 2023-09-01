package egovframework.desm.mobile;

import java.io.Serializable;
import java.util.Map;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class TestVO implements Serializable {

	private static final long serialVersionUID = 4909335075064017064L;
	
	private String stringValue;
	private int intValue;
	private Map<String, Object> mapValue;

	public String getStringValue() {
		return stringValue;
	}
	
	public int getIntValue() {
		return intValue;
	}
	
	public Map<String, Object> getMapValue() {
		return mapValue;
	}

	public void setStringValue(String value) {
		this.stringValue = value;
	}
	
	public void setIntValue(int value) {
		this.intValue = value;
	}
	
	public void setMapValue(Map<String, Object> value)
	{
		this.mapValue = value;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

}


package egovframework.desm.service;


public class DesmVO extends DefaultVO {

	private static final long serialVersionUID = 1L;

    
    private String USER_AD;      
    private String USER_NAME;
    private String LOG_DATE;
    private String ROLE_SEQ;
    private String ROLE_NAME;
    private String PWS_EDIT_YN;
    private String SUBCON_YN;
    private String DEPT_NAME;
    



	public String getUSER_AD() {
		return USER_AD;
	}

	public void setUSER_AD(String uSER_AD) {
		USER_AD = uSER_AD;
	}
	
	public String getUSER_NAME() {
		return USER_NAME;
	}

	public void setUSER_NAME(String uSER_NAME) {
		USER_NAME = uSER_NAME;
	}
	
	public String getLOG_DATE() {
		return LOG_DATE;
	}

	public void setLOG_DATE(String lOG_DATE) {
		LOG_DATE = lOG_DATE;
	}

	public String getROLE_SEQ() {
		return ROLE_SEQ;
	}

	public void setROLE_SEQ(String rOLE_SEQ) {
		ROLE_SEQ = rOLE_SEQ;
	}
		

	public String getROLE_NAME() {
		return ROLE_NAME;
	}
	
	public void setROLE_NAME(String rOLE_NAME) {
		ROLE_NAME = rOLE_NAME;
	}
	
	public String getPWS_EDIT_YN() {
		return PWS_EDIT_YN;
	}
	
	public void setPWS_EDIT_YN(String pWS_EDIT_YN) {
		PWS_EDIT_YN = pWS_EDIT_YN;
	}	
	
	public String getSUBCON_YN() {
		return SUBCON_YN;
	}
	
	public void setSUBCON_YN(String sUBCON_YN) {
		SUBCON_YN = sUBCON_YN;
	}	
	
	public String getDEPT_NAME() {
		return DEPT_NAME;
	}
	
	public void setDEPT_NAME(String dEPT_NAME) {
		DEPT_NAME = dEPT_NAME;
	}
}

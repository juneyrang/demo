package egovframework.desm.cmmn;

import java.io.StringReader;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.TypeHandler;


@MappedJdbcTypes(JdbcType.LONGVARCHAR)
public class LongHandler implements TypeHandler{


	@Override
	public void setParameter(PreparedStatement ps, int i, Object parameter, JdbcType jdbcType) throws SQLException {
	
		String s = (String) parameter;
		StringReader reader = new StringReader(s);
		ps.setCharacterStream(i, reader, s.length());
	}

	@Override
	public Object getResult(ResultSet rs, String columnName) throws SQLException {
		return rs.getString(columnName);
	}



	@Override
	public Object getResult(ResultSet arg0, int arg1) throws SQLException {
		return arg0.getObject(arg1);
	}



	@Override
	public Object getResult(CallableStatement arg0, int arg1) throws SQLException {
	// TODO Auto-generated method stub
		return arg0.getObject(arg1);
	}

}
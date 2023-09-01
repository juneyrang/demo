package egovframework.desm.cmmn.scheduler.job;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.quartz.JobExecutionContext;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.desm.cmmn.idcs.IdcsService;
import net.sf.json.JSONObject;

@Component
public class DesmManageUserJob extends BaseJob {

	private IdcsService idcsService;
	
	private boolean isAct = false;

	@Override
	protected void doExecute(JobExecutionContext context) {
		// TODO Auto-generated method stub
        if(idcsService == null) { 
            ApplicationContext appCtx = (ApplicationContext) context.getJobDetail()
                .getJobDataMap().get("appContext");
            idcsService = appCtx.getBean(IdcsService.class); 
        } 
		updateAsyncUser();
	}

	@SuppressWarnings("unchecked")
	private void updateAsyncUser() {
		try {
			if(!isAct) {
				isAct = true;
				Map<String, Object> paramMap = new HashMap<>();
				List<Map<String, Object>> userList = jobService.getAsyncUser(paramMap);
				if(userList != null && !userList.isEmpty()) {
					Map<String, Object> map = null;
					for(Map<String, Object> user : userList) {
						try {
							paramMap.put("userName", user.get("USER_AD").toString());
							JSONObject jsonObj = idcsService.searchIDCSUser(paramMap);
							map = new ObjectMapper().readValue(jsonObj.get("success").toString(), Map.class);
							if(map != null) {
								user.put("IDCS_YN", map.containsKey("id") ? map.get("id").toString() : "N");
								updateUser(user);
							}
					    } catch (Exception e) {
					        // TODO Auto-generated catch block
					        e.printStackTrace();
					    }
					}
				}
				isAct = false;
			}
		} catch(Exception e) {
			e.printStackTrace();
			isAct = false;
		}
	}
	
	private void updateUser(Map<String, Object> paramMap) {
		paramMap.put("DELEGATE_FLAG", "".equals(paramMap.get("IDCS_YN").toString()) ? "Y" : "N");
		String strDoosan = paramMap.get("MAIL") == null ? "" : paramMap.get("MAIL").toString().substring(paramMap.get("MAIL").toString().indexOf('@') + 1);
		paramMap.put("FEDERATED_YN", "".equals(strDoosan) ? "Y" : "N");
		jobService.updateAsyncUser(paramMap);
	}

}

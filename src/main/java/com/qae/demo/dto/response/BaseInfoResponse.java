package com.qae.demo.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@JsonInclude(JsonInclude.Include.ALWAYS)
public class BaseInfoResponse {
    @Parameter(name="userInfo", description = "사용자정보")
    private Map<String, Object> userInfo;

    @Parameter(name="codeList", description = "코드 리스트")
    private List<Map<String, Object>> codeList;

    @Parameter(name="authMenuList", description = "메뉴 리스트")
    private List<Map<String, Object>> authMenuList;

    @Parameter(name="actList", description = "액션 리스트")
    private List<Map<String, Object>> actList;

    public static BaseInfoResponse toDTO(Map<String, Object> entity) {
        if (entity == null) return null;
        return BaseInfoResponse.builder()
                .userInfo((Map<String, Object>) entity.get("userInfo"))
                .codeList((List<Map<String, Object>>) entity.get("codeList"))
                .authMenuList((List<Map<String, Object>>) entity.get("authMenuList"))
                .actList((List<Map<String, Object>>) entity.get("actList"))
                .build();
    }

}

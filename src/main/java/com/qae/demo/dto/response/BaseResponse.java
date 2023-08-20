package com.qae.demo.dto.response;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class BaseResponse {
    private Integer code;

    private String message;

    public static BaseResponse toDTO() {
        return BaseResponse.builder()
                .code(-1)
                .message("")
                .build();
    }
}

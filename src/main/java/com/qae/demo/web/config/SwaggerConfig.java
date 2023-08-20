package com.qae.demo.web.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
    info = @Info(title = "Job Schedule API 명세서",
            description = "Job Schedule 서비스 API 명세서",
            version = "v1")
)
@RequiredArgsConstructor
@Configuration
public class SwaggerConfig {

    @Bean
    public GroupedOpenApi restApi() {
        String[] paths = {"/api/**"};

        return GroupedOpenApi.builder()
                .group("Job Schedule API v1")
                .pathsToMatch(paths)
//                .packagesToScan("com.qae.demo")
                .build();
    }

}

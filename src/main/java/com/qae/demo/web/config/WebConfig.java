package com.qae.demo.web.config;

import com.qae.demo.web.interceptor.AuthenticInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private AuthenticInterceptor authenticInterceptor;

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {

    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/app/**")
                .addResourceLocations("classpath:/app/");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 인터셉터를 등록하는 메서드
        // CustomInterceptor를 등록하고, 모든 URL에 대해 인터셉터를 적용하도록 설정
        registry.addInterceptor(authenticInterceptor).addPathPatterns("/**");
    }

}

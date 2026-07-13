package com.ecom.dashboardservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Value("${cors.allowed-origins}") //Reads value from application.properties
    private String[] allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") //Apply this CORS rule to all endpoints.
                .allowedOrigins(allowedOrigins) //Allows all the values written in properties file
                .allowedMethods("*"); //Allows all the methods( get, post, delete etc.)
    }
}

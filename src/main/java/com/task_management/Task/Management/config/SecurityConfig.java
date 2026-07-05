//package com.task_management.Task.Management.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//    public SecurityFilterChain securityFilterChain(HttpSecurity http){
//        http.
//                sessionManagement(c ->
//                        c.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                )
//                .csrf(c -> c.disable())
//                .authorizeHttpRequests(c -> c.anyRequest().permitAll());
//
//        return null;
//
//    }
//}

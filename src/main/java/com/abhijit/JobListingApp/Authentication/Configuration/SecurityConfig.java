package com.abhijit.JobListingApp.Authentication.Configuration;

import com.abhijit.JobListingApp.Authentication.Filter.JWTFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserDetailsService UserDetailsService;

    @Autowired
    private JWTFilter jwtfilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http){

        http.csrf(customizer ->customizer.disable());
        http.authorizeHttpRequests(request -> request
                .requestMatchers("/register","/login").permitAll()
                .requestMatchers("/addpost","/delete/","/update/","/myposts").hasRole("COMPANY")
                .requestMatchers("/allposts","/posts/").hasAnyRole("COMPANY","JOBSEEKER")
                .anyRequest().authenticated());
        http.authenticationProvider(authenticationProvider());
        http.httpBasic(Customizer.withDefaults());
        http.addFilterBefore(jwtfilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider()
    {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(UserDetailsService);
        provider.setPasswordEncoder( new BCryptPasswordEncoder(12));
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
    {
        return config.getAuthenticationManager();
    }


}

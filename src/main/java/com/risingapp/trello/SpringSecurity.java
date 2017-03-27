package com.risingapp.trello;

import com.risingapp.trello.entity.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * Created by Zinoviy on 10/28/16.
 */
@Configuration
@EnableWebSecurity
public class SpringSecurity extends WebSecurityConfigurerAdapter {

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    public void registerGlobalAuthentication(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userDetailsService);
//                .passwordEncoder(getShaPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
//                    .antMatchers("/**").permitAll()
//                    .antMatchers("/rest/**").permitAll()
                .antMatchers("/rest/**").authenticated()
//                    .antMatchers("/rest/**").hasAnyRole(UserRole.PRODUCT_OWNER, UserRole.TEAM_LEAD, UserRole.DEVELOPER)
                .and()
                    .exceptionHandling().accessDeniedPage("/unauthorized")
                .and()
                    .formLogin()
                        .loginPage("/welcome")
                        .loginProcessingUrl("/login_check")
                        .defaultSuccessUrl("/index")
                        .failureUrl("/welcome?error")
                        .usernameParameter("email")
                        .passwordParameter("password")
                        .permitAll()
                .and()
                    .logout()
                    .permitAll()
                    .logoutUrl("/logout")
                    .logoutSuccessUrl("/welcome")
                    .invalidateHttpSession(true);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/resources/**"); // #3
    }

//    @Bean
//    public ShaPasswordEncoder getShaPasswordEncoder(){
//        return new ShaPasswordEncoder();
//    }
}
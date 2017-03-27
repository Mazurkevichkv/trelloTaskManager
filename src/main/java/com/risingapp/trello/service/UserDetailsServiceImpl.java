package com.risingapp.trello.service;

import com.risingapp.trello.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by Zinoviy on 9/27/16.
 */

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userService.getUserByEmail(username);
        if(user == null) {
            throw new UsernameNotFoundException(username + " not found");
        }
        Set<GrantedAuthority> roles = new HashSet<>();
        if (user instanceof Developer) {
            roles.add(new SimpleGrantedAuthority(UserRole.DEVELOPER));
            return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), roles);
        }
        if (user instanceof ProductOwner) {
            roles.add(new SimpleGrantedAuthority(UserRole.PRODUCT_OWNER));
            return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), roles);
        }
        if (user instanceof TeamLead) {
            roles.add(new SimpleGrantedAuthority(UserRole.TEAM_LEAD));
            return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), roles);
        }
        return null;
    }
}

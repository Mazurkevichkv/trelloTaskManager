package com.risingapp.trello.service;

import com.risingapp.trello.entity.User;
import com.risingapp.trello.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

/**
 * Created by zinoviyzubko on 27.03.17.
 */
@Component
public class SessionService {

    @Autowired
    private UserRepository userRepository;

    public User getCurrentUser() {

        org.springframework.security.core.userdetails.User sessionUser = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser = userRepository.findUserByEmail(sessionUser.getUsername());
        if (currentUser == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return currentUser;
    }
}

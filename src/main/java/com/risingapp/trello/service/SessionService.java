package com.risingapp.trello.service;

import com.risingapp.trello.entity.User;
import com.risingapp.trello.repository.DeveloperRepository;
import com.risingapp.trello.repository.ProductOwnerRepository;
import com.risingapp.trello.repository.TeamLeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by zinoviyzubko on 27.03.17.
 */
@Component
public class SessionService {

    @Autowired private DeveloperRepository developerRepository;
    @Autowired private TeamLeadRepository teamLeadRepository;
    @Autowired private ProductOwnerRepository productOwnerRepository;

    public User getCurrentUser() {

        org.springframework.security.core.userdetails.User sessionUser = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = getUserByEmail(sessionUser.getUsername());
        return user;
    }

    public User getUserByEmail(String email) {
        List<User> users = new ArrayList<>();
        users.addAll(developerRepository.findAll());
        users.addAll(teamLeadRepository.findAll());
        users.addAll(productOwnerRepository.findAll());
        for (User user : users) {
            if (email.equals(user.getEmail()))
                return user;
        }
        return null;
    }
}

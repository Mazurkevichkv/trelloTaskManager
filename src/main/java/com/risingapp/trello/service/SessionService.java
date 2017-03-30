package com.risingapp.trello.service;

import com.risingapp.trello.entity.User;
import com.risingapp.trello.repository.DeveloperRepository;
import com.risingapp.trello.repository.ProductOwnerRepository;
import com.risingapp.trello.repository.TeamLeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

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
        User user = developerRepository.findByEmail(email);
        if (user == null) {
            user = teamLeadRepository.findByEmail(email);
            if (user == null) {
                user = productOwnerRepository.findByEmail(email);
            }
        }
        return user;
    }
}

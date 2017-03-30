package com.risingapp.trello.service;

import com.risingapp.trello.entity.User;
import com.risingapp.trello.repository.DeveloperRepository;
import com.risingapp.trello.repository.ProductOwnerRepository;
import com.risingapp.trello.repository.TeamLeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
        User user = developerRepository.findByEmail(sessionUser.getUsername());
        if (user == null) {
            user = productOwnerRepository.findByEmail(sessionUser.getUsername());
            if (user == null) {
                user = teamLeadRepository.findByEmail(sessionUser.getUsername());
                if (user == null)
                    throw new UsernameNotFoundException("User not found");
            }
        }
        return user;
    }
}

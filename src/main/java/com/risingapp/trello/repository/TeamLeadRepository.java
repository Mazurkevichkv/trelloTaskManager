package com.risingapp.trello.repository;

import com.risingapp.trello.entity.TeamLead;
import com.risingapp.trello.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by zinoviyzubko on 30.03.17.
 */
@Repository
public interface TeamLeadRepository extends JpaRepository<TeamLead, Long> {
    TeamLead findByEmail(String email);
}

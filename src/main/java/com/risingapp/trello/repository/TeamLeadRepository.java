package com.risingapp.trello.repository;

import com.risingapp.trello.entity.Developer;
import com.risingapp.trello.entity.TeamLead;
import com.risingapp.trello.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Created by zinoviyzubko on 30.03.17.
 */
@Repository
public interface TeamLeadRepository extends JpaRepository<TeamLead, Long> {

    @Query("SELECT t FROM TeamLead t WHERE t.email = :email")
    TeamLead getByEmail(@Param("email") String email);
}

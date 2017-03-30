package com.risingapp.trello.repository;

import com.risingapp.trello.entity.Developer;
import com.risingapp.trello.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by zinoviyzubko on 30.03.17.
 */
@Repository
public interface DeveloperRepository extends JpaRepository<Developer, Long> {
    Developer findByEmail(String email);
}

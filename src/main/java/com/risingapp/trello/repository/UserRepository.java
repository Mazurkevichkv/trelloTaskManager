package com.risingapp.trello.repository;

import com.risingapp.trello.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by zinoviyzubko on 26.03.17.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByEmail(String email);
}

package com.risingapp.trello.repository;

import com.risingapp.trello.entity.TaskPriority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by zinoviyzubko on 29.03.17.
 */
@Repository
public interface PrioritiesRepository extends JpaRepository<TaskPriority, Long> {

    TaskPriority findByPriority(String priority);
}

package com.risingapp.trello.repository;

import com.risingapp.trello.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by zinoviyzubko on 27.03.17.
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}

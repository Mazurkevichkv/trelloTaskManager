package com.risingapp.trello.repository;

import com.risingapp.trello.entity.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by zinoviyzubko on 27.03.17.
 */
@Repository
public interface PhotoRepository extends JpaRepository <Photo, Long> {
}

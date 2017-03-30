package com.risingapp.trello.repository;

import com.risingapp.trello.entity.Developer;
import com.risingapp.trello.entity.ProductOwner;
import com.risingapp.trello.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Created by zinoviyzubko on 30.03.17.
 */
@Repository
public interface ProductOwnerRepository extends JpaRepository<ProductOwner, Long> {
    @Query("SELECT p FROM ProductOwner p WHERE p.email = :email")
    ProductOwner getByEmail(@Param("email") String email);
}

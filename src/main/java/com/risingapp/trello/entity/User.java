package com.risingapp.trello.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

/**
 * Created by zinoviyzubko on 26.03.17.
 */
@Data
@MappedSuperclass
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected Long id;
    protected String email;
    protected String password;
    protected String firstName;
    protected String lastName;
    protected String birthday;
    protected String registrationDay;
    protected String vkToken;

    protected Long photoId;
    @Enumerated(EnumType.STRING)
    protected UserRole userRole;
}

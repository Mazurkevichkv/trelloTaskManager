package com.risingapp.trello.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by zinoviyzubko on 26.03.17.
 */
@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    private long id;
    private String login;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private String imageBase64;
    private String birthday;

    private String vkToken;
}

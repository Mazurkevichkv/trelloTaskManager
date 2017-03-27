package com.risingapp.trello.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

/**
 * Created by zinoviyzubko on 26.03.17.
 */
@Data
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(
        name = "discriminator",
        discriminatorType = DiscriminatorType.STRING
)
@DiscriminatorValue(value = "User")
public class User {

    @Id
    @GeneratedValue
    private Long id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String birthday;
    private String registrationDay;
    private String vkToken;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "user")
    private Photo photo;

    @OneToMany(mappedBy = "solver", fetch = FetchType.LAZY)
    private List<Task> solvedTasks;
}

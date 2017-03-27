package com.risingapp.trello.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.List;

/**
 * Created by zinoviyzubko on 27.03.17.
 */
@Data
@EqualsAndHashCode(callSuper = false)

@Entity
@Table(name = "users")
@DiscriminatorValue(value = UserRole.DEVELOPER)
public class Developer extends User {

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "developer")
    private List<Task> tasks;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teamLead_id")
    private TeamLead teamLead;
}

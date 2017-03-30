package com.risingapp.trello.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by zinoviyzubko on 27.03.17.
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "team_leads")
public class TeamLead extends User {

    private Long productOwnerId;
    @Column
    @ElementCollection(targetClass=Integer.class)
    private List<Long> developerIds;

    public TeamLead(){
        this.userRole = UserRole.TEAM_LEAD;
        this.developerIds = new ArrayList<>();
//        this.solvedTasks = new ArrayList<>();
    }
}

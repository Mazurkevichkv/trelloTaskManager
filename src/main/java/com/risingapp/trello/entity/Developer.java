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
public class Developer extends User {

    @Column
    @ElementCollection(targetClass=Long.class)
    private List<Long> taskIds;
    private long teamLeadId;

    public Developer(){
        this.userRole = UserRole.DEVELOPER;
        this.taskIds = new ArrayList<>();
    }
}

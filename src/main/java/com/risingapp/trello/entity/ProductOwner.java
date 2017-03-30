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
@Table(name = "product_owners")
public class ProductOwner extends User {

    @Column
    @ElementCollection(targetClass=Long.class)
    private List<Long> teamLeadIds;
    @Column
    @ElementCollection(targetClass=Long.class)
    private List<Long> createdTaskIds;

    public ProductOwner(){
        this.userRole = UserRole.PRODUCT_OWNER;
//        this.solvedTasks = new ArrayList<>();
        this.teamLeadIds = new ArrayList<>();
        this.createdTaskIds = new ArrayList<>();
    }
}

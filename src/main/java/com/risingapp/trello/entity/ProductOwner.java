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
@DiscriminatorValue(value = UserRole.PRODUCT_OWNER)
public class ProductOwner extends User {

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "productOwner")
    private List<TeamLead> teamLeads;

    @OneToMany(mappedBy = "creator", fetch = FetchType.LAZY)
    private List<Task> createdTasks;
}

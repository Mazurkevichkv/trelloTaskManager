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
@DiscriminatorValue(value = UserRole.TEAM_LEAD)
public class TeamLead extends User {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productOwner_id")
    private ProductOwner productOwner;

    @OneToMany(mappedBy = "teamLead", fetch = FetchType.LAZY)
    private List<Developer> developers;
}

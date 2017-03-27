package com.risingapp.trello.entity;

import lombok.Data;

import javax.persistence.*;

/**
 * Created by zinoviyzubko on 27.03.17.
 */
@Data
@Entity
public class Task {

    @Id
    @GeneratedValue
    private Long id;
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id")
    private ProductOwner creator;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "developer_id")
    private Developer developer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "solver_id")
    private User solver;

    @Enumerated(EnumType.STRING)
    private TaskStatus status = TaskStatus.CREATED;
}

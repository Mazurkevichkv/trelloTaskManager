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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "priority_id")
    private TaskPriority priority;

    @Enumerated(EnumType.STRING)
    private TaskStatus status = TaskStatus.CREATED;
}

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
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    private String title;
    private String text;
    private Long creatorId;
    private Long developerId;

    private Long solverId;
    private Long priorityId;

    @Enumerated(EnumType.STRING)
    private TaskStatus status = TaskStatus.CREATED;
}

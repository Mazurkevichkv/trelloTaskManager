package com.risingapp.trello.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

/**
 * Created by zinoviyzubko on 29.03.17.
 */
@Data
@Entity
@Table(name = "priorities")
public class TaskPriority {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    private String priority;

    @OneToMany(mappedBy = "priority", fetch = FetchType.LAZY)
    private List<Task> tasks;
}

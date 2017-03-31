package com.risingapp.trello.model.common;

import com.risingapp.trello.entity.TaskStatus;
import lombok.Data;

/**
 * Created by zinoviyzubko on 30.03.17.
 */
@Data
public class TaskResponse {

    private Long id;
    private String title;
    private String text;
    private String priority;
    private TaskStatus status;
}

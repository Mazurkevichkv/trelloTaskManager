package com.risingapp.trello.model.common;

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
}

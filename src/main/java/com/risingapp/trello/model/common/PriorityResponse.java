package com.risingapp.trello.model.common;

import lombok.Data;

/**
 * Created by oleg on 30.03.17.
 */
@Data
public class PriorityResponse {
    private long id;
    private String priority;

    public PriorityResponse(long id, String priority) {
        this.id = id;
        this.priority = priority;
    }
}

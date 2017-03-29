package com.risingapp.trello.model.response;

import lombok.Data;

/**
 * Created by oleg on 29.03.17.
 */
@Data
public class GetPriorityResponse {

    private long id;
    private String priority;

    public GetPriorityResponse(long id, String priority) {
        this.id = id;
        this.priority = priority;
    }
}

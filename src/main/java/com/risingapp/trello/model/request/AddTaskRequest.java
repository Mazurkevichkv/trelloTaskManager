package com.risingapp.trello.model.request;

import lombok.Data;

/**
 * Created by zinoviyzubko on 27.03.17.
 */
@Data
public class AddTaskRequest {

    private String text;
    private String creatorEmail;
}

package com.risingapp.trello.model.common;

import lombok.Data;

import java.util.List;

/**
 * Created by zinoviyzubko on 30.03.17.
 */
@Data
public class UserResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String photoUrl;
    private List<TaskResponse> tasks;
}

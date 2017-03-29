package com.risingapp.trello.model.response;

import com.risingapp.trello.model.common.TaskResponse;
import com.risingapp.trello.model.common.UserResponse;
import lombok.Data;

import java.util.List;

/**
 * Created by zinoviyzubko on 30.03.17.
 */
@Data
public class GetBlackboardResponse {

    private List<UserResponse> users;
    private List<TaskResponse> queue;
}

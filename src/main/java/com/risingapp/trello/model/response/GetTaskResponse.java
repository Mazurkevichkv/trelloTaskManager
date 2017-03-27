package com.risingapp.trello.model.response;

import com.risingapp.trello.entity.TaskStatus;
import lombok.Data;

/**
 * Created by zinoviyzubko on 27.03.17.
 */
@Data
public class GetTaskResponse {

    private long id;
    private String text;
    private long creatorId;
    private long developerId;
    private TaskStatus status;
}

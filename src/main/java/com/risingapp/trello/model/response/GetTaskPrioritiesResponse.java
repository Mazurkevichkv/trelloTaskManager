package com.risingapp.trello.model.response;

import lombok.Data;

import java.util.List;

/**
 * Created by zinoviyzubko on 29.03.17.
 */
@Data
public class GetTaskPrioritiesResponse {

    private List<String> priorities;
}

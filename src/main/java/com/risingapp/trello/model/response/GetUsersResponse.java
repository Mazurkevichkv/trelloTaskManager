package com.risingapp.trello.model.response;

import lombok.Data;

import java.util.List;

/**
 * Created by zinoviyzubko on 27.03.17.
 */
@Data
public class GetUsersResponse {

    private List<GetUserResponse> users;
}

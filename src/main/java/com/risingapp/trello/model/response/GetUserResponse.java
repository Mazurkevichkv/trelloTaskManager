package com.risingapp.trello.model.response;

import lombok.Data;

/**
 * Created by zinoviyzubko on 27.03.17.
 */
@Data
public class GetUserResponse {

    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String photoUrl;
    private String birthday;
    private String registrationDay;
    private String role;
}

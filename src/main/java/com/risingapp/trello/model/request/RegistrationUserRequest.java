package com.risingapp.trello.model.request;

import com.risingapp.trello.entity.UserRole;
import lombok.Data;

/**
 * Created by zinoviyzubko on 27.03.17.
 */
@Data
public class RegistrationUserRequest {

    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String birthday;
    private UserRole role;
}

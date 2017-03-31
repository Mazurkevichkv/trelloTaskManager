package com.risingapp.trello.model.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * Created by oleg on 31.03.17.
 */
@Data
public class RandomUserResponse {
    private RandomUserName name;
    private RandomUserLogin login;
    private String registered;
    private String dob;
    private String email;



}

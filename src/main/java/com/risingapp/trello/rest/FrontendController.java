package com.risingapp.trello.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by zinoviyzubko on 26.03.17.
 */
@Controller
public class FrontendController {

    @RequestMapping(value = "/index")
    public String getIndex() {
        return "main.html";
    }

    @RequestMapping(value = "/welcome")
    public String getWelcome() {
        return "login.html";
    }
}

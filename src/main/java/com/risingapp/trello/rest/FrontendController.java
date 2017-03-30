package com.risingapp.trello.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by zinoviyzubko on 26.03.17.
 */
@Controller
public class FrontendController {

    @RequestMapping(value = "/home")
    public String getIndex() {
        return "index.html";
    }

    @RequestMapping(value = "/registration")
    public String getRegister() {
        return "register.html";
    }

    @RequestMapping(value = "/login")
    public String getWelcome() {
        return "welcome.html";
    }
}
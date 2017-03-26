package com.risingapp.trello.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by zinoviyzubko on 26.03.17.
 */
@Controller
public class FrontendController {

    @RequestMapping(value = "/index")
    public String index() {
        return "shop.html";
    }
}

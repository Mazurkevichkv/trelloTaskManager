package com.risingapp.trello.rest;

import com.risingapp.trello.model.response.GetBlackboardResponse;
import com.risingapp.trello.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by zinoviyzubko on 30.03.17.
 */
@Controller
@RequestMapping(value = "/rest")
public class CommonController {

    @Autowired private UserService userService;

    @RequestMapping(value = "/blackboard")
    public @ResponseBody GetBlackboardResponse getBlackboard() {
        return userService.getBlackboard();
    }
}

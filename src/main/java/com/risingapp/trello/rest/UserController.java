package com.risingapp.trello.rest;

import com.risingapp.trello.model.request.RegistrationUserRequest;
import com.risingapp.trello.model.response.AddPhotoResponse;
import com.risingapp.trello.model.response.GetUserResponse;
import com.risingapp.trello.model.response.GetUsersResponse;
import com.risingapp.trello.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by zinoviyzubko on 27.03.17.
 */
@Controller
@RequestMapping(value = "/rest/user")
public class UserController {

    @Autowired UserService userService;

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity<Void> registration(@RequestBody RegistrationUserRequest request) {
        return userService.registration(request);
    }

    @RequestMapping(value = "/get/{id}", method = RequestMethod.GET)
    public @ResponseBody GetUserResponse getUser(@PathVariable("id") long id) {
        return userService.getUser(id);
    }

    @RequestMapping(value = "/get/all", method = RequestMethod.GET)
    public @ResponseBody GetUsersResponse getAllUsers() {
        return userService.getAllUsers();
    }

    @RequestMapping(value = "/photo/add", method = RequestMethod.POST)
    public AddPhotoResponse addPhoto(@RequestParam(name = "photo") MultipartFile photo) throws IOException {
        return userService.addPhoto(photo);
    }

    @RequestMapping(value = "/photo/get/{id}")
    public ResponseEntity<Void> getPhoto(@PathVariable("id") long id, HttpServletResponse response) {
        return userService.getPhoto(response, id);
    }
}

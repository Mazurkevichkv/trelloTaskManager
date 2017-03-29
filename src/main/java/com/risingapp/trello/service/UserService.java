package com.risingapp.trello.service;

import com.risingapp.trello.entity.*;
import com.risingapp.trello.model.common.TaskResponse;
import com.risingapp.trello.model.common.UserResponse;
import com.risingapp.trello.model.request.RegistrationUserRequest;
import com.risingapp.trello.model.response.AddPhotoResponse;
import com.risingapp.trello.model.response.GetBlackboardResponse;
import com.risingapp.trello.model.response.GetUserResponse;
import com.risingapp.trello.model.response.GetUsersResponse;
import com.risingapp.trello.repository.PhotoRepository;
import com.risingapp.trello.repository.TaskRepository;
import com.risingapp.trello.repository.UserRepository;
import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by zinoviyzubko on 26.03.17.
 */
@Service
public class UserService {

    @Autowired private UserRepository userRepository;
    @Autowired private SessionService sessionService;
    @Autowired private PhotoRepository photoRepository;
    @Autowired private TaskRepository taskRepository;

    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    private static final String PHOTO_URL = "https://likeittrello.herokuapp.com/rest/photo/";

    @Transactional
    public GetUserResponse getCurrentUser() {
        User currentUser = sessionService.getCurrentUser();
        return convertUser(currentUser);
    }

    @Transactional
    public GetBlackboardResponse getBlackboard() {
        GetBlackboardResponse response = new GetBlackboardResponse();
        response.setQueue(new ArrayList<>());
        response.setDevelopers(new ArrayList<>());
        for (User user : userRepository.findAll()) {
            if (!(user instanceof Developer)) continue;
            UserResponse userResponse = convertDeveloper(user);
            response.getDevelopers().add(userResponse);
        }
        for (Task task : taskRepository.findAll()) {
            if (task.getDeveloper() != null) continue;
            response.getQueue().add(convertTask(task));
        }
        return response;
    }

    private UserResponse convertDeveloper(User user) {
        Developer developer = (Developer) user;
        UserResponse userResponse = new UserResponse();
        userResponse.setId(developer.getId());
        userResponse.setFirstName(developer.getFirstName());
        userResponse.setLastName(developer.getLastName());
        if (developer.getPhoto() != null)
            userResponse.setPhotoUrl(developer.getPhoto().getLink());
        userResponse.setTasks(new ArrayList<>());
        if (developer.getTasks() != null) {
            for (Task task : developer.getTasks()) {
                userResponse.getTasks().add(convertTask(task));
            }
        }
        return userResponse;
    }

    private TaskResponse convertTask(Task task) {

        TaskResponse taskResponse = new TaskResponse();
        taskResponse.setId(task.getId());
        taskResponse.setTitle(task.getTitle());
        taskResponse.setText(task.getText());
        if (task.getPriority() != null)
            taskResponse.setPriority(task.getPriority().getPriority());
        return taskResponse;
    }

    @Transactional
    public ResponseEntity<Void> registration(RegistrationUserRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setBirthday(request.getBirthday());
        user.setRegistrationDay(sdf.format(new Date()));
        switch (request.getRole()) {
            case UserRole.DEVELOPER :
                Developer developer = (Developer) user;
                userRepository.save(developer);
                break;
            case UserRole.PRODUCT_OWNER :
                ProductOwner productOwner = (ProductOwner) user;
                userRepository.save(productOwner);
                break;
            case UserRole.TEAM_LEAD :
                TeamLead teamLead = (TeamLead) user;
                userRepository.save(teamLead);
                break;
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @Transactional
    public GetUserResponse getUser(long id) {
        User user = userRepository.findOne(id);
        GetUserResponse response = convertUser(user);
        return response;
    }

    @Transactional
    public GetUsersResponse getAllUsers() {
        List<User> users = userRepository.findAll();
        GetUsersResponse response = new GetUsersResponse();
        response.setUsers(new ArrayList<>());
        for (User user : users) {
            response.getUsers().add(convertUser(user));
        }
        return response;
    }

    private GetUserResponse convertUser(User user) {
        GetUserResponse response = new GetUserResponse();
        Photo photo = user.getPhoto();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setBirthday(user.getBirthday());
        if (photo != null)
            response.setPhotoUrl(photo.getLink());
        if (user instanceof Developer) response.setRole(UserRole.DEVELOPER);
        if (user instanceof TeamLead) response.setRole(UserRole.TEAM_LEAD);
        if (user instanceof ProductOwner) response.setRole(UserRole.PRODUCT_OWNER);
        return response;
    }

    public User getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Transactional
    public AddPhotoResponse addPhoto(MultipartFile file) throws IOException {

        User currentUser = sessionService.getCurrentUser();
        String base64 = Base64.encode(file.getBytes());
        Photo photo = new Photo();
        photo.setUser(currentUser);
        photo.setBase64(base64);
        photoRepository.save(photo);
        photo.setLink(PHOTO_URL + currentUser.getId());
        currentUser.setPhoto(photo);
        userRepository.save(currentUser);
        AddPhotoResponse response = new AddPhotoResponse();
        response.setUrl(photo.getLink());
        return response;
    }

    @Transactional
    public ResponseEntity<Void> getPhoto(HttpServletResponse response, long userId) {
        try {
            User user = userRepository.findOne(userId);
            Photo photo = user.getPhoto();
            byte[] bytes = Base64.decode(photo.getBase64());
            response.setContentType("image/png");
            response.getOutputStream().write(bytes);
            return new ResponseEntity<Void>(HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }
    }
}

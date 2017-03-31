package com.risingapp.trello.service;

import com.risingapp.trello.entity.*;
import com.risingapp.trello.model.common.TaskResponse;
import com.risingapp.trello.model.common.UserResponse;
import com.risingapp.trello.model.request.RegistrationUserRequest;
import com.risingapp.trello.model.response.AddPhotoResponse;
import com.risingapp.trello.model.response.GetBlackboardResponse;
import com.risingapp.trello.model.response.GetUserResponse;
import com.risingapp.trello.model.response.GetUsersResponse;
import com.risingapp.trello.repository.*;
import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

    @Autowired private DeveloperRepository developerRepository;
    @Autowired private TeamLeadRepository teamLeadRepository;
    @Autowired private ProductOwnerRepository productOwnerRepository;

    @Autowired private SessionService sessionService;
    @Autowired private PhotoRepository photoRepository;
    @Autowired private TaskRepository taskRepository;
    @Autowired private PrioritiesRepository prioritiesRepository;

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
        List<Developer> developers = developerRepository.findAll();
        if (developers != null) {
            for (Developer developer : developers) {
                UserResponse userResponse = convertDeveloper(developer);
                response.getDevelopers().add(userResponse);
            }
        }
        for (Task task : taskRepository.findAll()) {
            if (task.getDeveloperId() != null) continue;
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
        if (developer.getPhotoId() != null) {
            Photo photo = photoRepository.findOne(developer.getPhotoId());
            userResponse.setPhotoUrl(photo.getLink());
        }
        userResponse.setTasks(new ArrayList<>());
        if (developer.getTaskIds() != null) {
            for (Long taskId : developer.getTaskIds()) {
                Task task = taskRepository.findOne(taskId);
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
        if (task.getPriorityId() != null) {
            TaskPriority priority = prioritiesRepository.findOne(task.getPriorityId());
            taskResponse.setPriority(priority.getPriority());
        }
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
            case PRODUCT_OWNER :
                ProductOwner productOwner = (ProductOwner) user;
                productOwnerRepository.save(productOwner);
                break;
            case TEAM_LEAD :
                TeamLead teamLead = (TeamLead) user;
                teamLeadRepository.save(teamLead);
            default:
                Developer developer = (Developer) user;
                developerRepository.save(developer);
                break;
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @Transactional
    public GetUserResponse getUser(long userId) {
        User user = developerRepository.findOne(userId);
        if (user == null) {
            user = productOwnerRepository.findOne(userId);
            if (user == null) {
                user = teamLeadRepository.findOne(userId);
                if (user == null)
                    return null;
            }
        }
        GetUserResponse response = convertUser(user);
        return response;
    }

    @Transactional
    public GetUsersResponse getDevelopers() {
        List<Developer> developers = developerRepository.findAll();
        GetUsersResponse response = new GetUsersResponse();
        response.setUsers(new ArrayList<>());
        for (Developer developer : developers) {
            response.getUsers().add(convertUser(developer));
        }
        return response;
    }

    @Transactional
    public GetUsersResponse getTeamLeads() {
        List<TeamLead> teamLeads = teamLeadRepository.findAll();
        GetUsersResponse response = new GetUsersResponse();
        response.setUsers(new ArrayList<>());
        for (TeamLead teamLead : teamLeads) {
            response.getUsers().add(convertUser(teamLead));
        }
        return response;
    }

    @Transactional
    public GetUsersResponse getProductOwners() {
        List<ProductOwner> productOwners = productOwnerRepository.findAll();
        GetUsersResponse response = new GetUsersResponse();
        response.setUsers(new ArrayList<>());
        for (ProductOwner productOwner : productOwners) {
            response.getUsers().add(convertUser(productOwner));
        }
        return response;
    }

    private GetUserResponse convertUser(User user) {
        GetUserResponse response = new GetUserResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setBirthday(user.getBirthday());
        if (user.getPhotoId() != null) {
            Photo photo = photoRepository.findOne(user.getPhotoId());
            response.setPhotoUrl(photo.getLink());
        }
        response.setRole(user.getUserRole());
        return response;
    }

    @Transactional
    public AddPhotoResponse addPhoto(MultipartFile file) throws IOException {

        User currentUser = sessionService.getCurrentUser();
        String base64 = Base64.encode(file.getBytes());
        Photo photo = new Photo();
        photo.setBase64(base64);
        photo.setLink(PHOTO_URL + currentUser.getId());
        photo.setUserId(currentUser.getId());
        currentUser.setPhotoId(photo.getId());
        photoRepository.save(photo);
        switch (currentUser.getUserRole()) {
            case DEVELOPER :
                Developer developer = (Developer) currentUser;
                developerRepository.save(developer);
                break;
            case PRODUCT_OWNER :
                ProductOwner productOwner = (ProductOwner) currentUser;
                productOwnerRepository.save(productOwner);
                break;
            case TEAM_LEAD :
                TeamLead teamLead = (TeamLead) currentUser;
                teamLeadRepository.save(teamLead);
                break;
        }
        AddPhotoResponse response = new AddPhotoResponse();
        response.setUrl(photo.getLink());
        return response;
    }

    @Transactional
    public ResponseEntity<Void> getPhoto(HttpServletResponse response, long userId) {
        try {
            User user = developerRepository.findOne(userId);
            if (user == null) {
                user = productOwnerRepository.findOne(userId);
                if (user == null) {
                    user = teamLeadRepository.findOne(userId);
                    if (user == null)
                        throw new Exception();
                }
            }
            Photo photo = photoRepository.findOne(user.getPhotoId());
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

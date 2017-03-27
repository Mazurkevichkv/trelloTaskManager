package com.risingapp.trello.service;

import com.risingapp.trello.entity.*;
import com.risingapp.trello.model.request.AddTaskRequest;
import com.risingapp.trello.model.response.GetTaskResponse;
import com.risingapp.trello.model.response.GetTasksResponse;
import com.risingapp.trello.repository.TaskRepository;
import com.risingapp.trello.repository.UserRepository;
import com.risingapp.trello.utils.FileProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by zinoviyzubko on 27.03.17.
 */
@Service
public class TaskService {

    @Autowired private TaskRepository taskRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private SessionService sessionService;

    @Transactional
    public ResponseEntity<Void> addTask(AddTaskRequest request) {

        ProductOwner productOwner = (ProductOwner) userRepository.findUserByEmail(request.getCreatorEmail());
        Task task = new Task();
        task.setText(request.getText());
        task.setCreator(productOwner);
        taskRepository.save(task);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //TODO
    @Transactional
    public ResponseEntity<Void> addTask(MultipartFile file) {
        FileProcessor processor = new FileProcessor(file);
        processor.process();
        if (!processor.hasErrors()) {
            taskRepository.save(processor.getTask());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    }

    @Transactional
    public GetTaskResponse getTask(long taskId) {
        Task task = taskRepository.findOne(taskId);
        return convertTask(task);
    }

    @Transactional
    public GetTasksResponse getAllTasks() {

        List<Task> tasks = taskRepository.findAll();
        GetTasksResponse response = new GetTasksResponse();
        response.setTasks(new ArrayList<>());
        for (Task task : tasks) {
            response.getTasks().add(convertTask(task));
        }
        return response;
    }

    private GetTaskResponse convertTask(Task task) {

        GetTaskResponse response = new GetTaskResponse();
        response.setId(task.getId());
        response.setText(task.getText());
        response.setStatus(task.getStatus());
        if (task.getCreator() != null)
            response.setCreatorId(task.getCreator().getId());
        if (task.getDeveloper() != null)
            response.setDeveloperId(task.getDeveloper().getId());
        return response;
    }
    @Transactional
    public ResponseEntity<Void> appointTask(long userId, long taskId) {

        Developer developer = (Developer) userRepository.findOne(userId);
        Task task = taskRepository.findOne(taskId);
        if (developer.getTasks() == null)
            developer.setTasks(new ArrayList<>());
        task.setStatus(TaskStatus.IN_PROGRESS);
        developer.getTasks().add(task);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<Void> approvedTask(long taskId) {

        User currentUser = sessionService.getCurrentUser();
        Task task = taskRepository.findOne(taskId);
        task.setSolver(currentUser);
        task.setStatus(TaskStatus.DONE);
        taskRepository.save(task);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<Void> deleteTask(long taskId) {
        taskRepository.delete(taskId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}

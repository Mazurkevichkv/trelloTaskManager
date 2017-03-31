package com.risingapp.trello.service;

import com.risingapp.trello.entity.*;
import com.risingapp.trello.model.request.AddTaskRequest;
import com.risingapp.trello.model.response.GetTaskPrioritiesResponse;
import com.risingapp.trello.model.response.GetTaskResponse;
import com.risingapp.trello.model.response.GetTasksResponse;
import com.risingapp.trello.repository.*;
import com.risingapp.trello.utils.FileProcessor;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by zinoviyzubko on 27.03.17.
 */
@Service
public class TaskService {

    @Autowired private DeveloperRepository developerRepository;
    @Autowired private TeamLeadRepository teamLeadRepository;
    @Autowired private ProductOwnerRepository productOwnerRepository;

    @Autowired private TaskRepository taskRepository;
    @Autowired private PrioritiesRepository prioritiesRepository;
    @Autowired private SessionService sessionService;

    Logger log = Logger.getLogger(TaskService.class);

    @Transactional
    public ResponseEntity<Void> addTask(AddTaskRequest request) {
        ProductOwner productOwner = (ProductOwner) sessionService.getCurrentUser();
        TaskPriority priority = prioritiesRepository.findByPriority(request.getPriority());
        if (priority == null) {
            priority = new TaskPriority();
            priority.setPriority(request.getPriority());
            prioritiesRepository.save(priority);
        }
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setText(request.getText());
        task.setCreatorId(productOwner.getId());
        task.setPriorityId(priority.getId());
        taskRepository.save(task);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //TODO
    @Transactional
    public ResponseEntity<Void> addTask(MultipartFile file) {
        ProductOwner productOwner = (ProductOwner) sessionService.getCurrentUser();
        FileProcessor processor = new FileProcessor(file, productOwner);
        processor.process();
        if (!processor.hasErrors()) {
            for (Task task : processor.getTaskList()) {
                taskRepository.save(task);
            }
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
            if (task != null) {
                response.getTasks().add(convertTask(task));
            }
        }
        return response;
    }

    private GetTaskResponse convertTask(Task task) {

        GetTaskResponse response = new GetTaskResponse();
        response.setId(task.getId());
        response.setText(task.getText());
        response.setStatus(task.getStatus());
        response.setCreatorId(task.getCreatorId());
        if (task.getDeveloperId() != null) {
            response.setDeveloperId(
                    task.getDeveloperId());
        }

        if (task.getPriorityId() != null) {
            TaskPriority priority = prioritiesRepository.findOne(task.getPriorityId());
            response.setPriority(priority.getPriority());
        }
        response.setTitle(task.getTitle());
        return response;
    }
    @Transactional
    public ResponseEntity<Void> appointTask(long userId, long taskId) {

        Developer developer =  developerRepository.findOne(userId);
        Task task = taskRepository.findOne(taskId);
        if (developer.getTaskIds() == null)
            developer.setTaskIds(new ArrayList<>());
        task.setDeveloperId(developer.getId());
        task.setStatus(TaskStatus.IN_PROGRESS);
        developer.getTaskIds().add(task.getId());
        taskRepository.save(task);
        developerRepository.save(developer);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<Void> unappointTask(long taskId) {

        Task task = taskRepository.findOne(taskId);
        Developer developer = developerRepository.findOne(task.getDeveloperId());
        developer.getTaskIds().remove(new Long(taskId));
        task.setDeveloperId(null);
        task.setStatus(TaskStatus.CREATED);
        taskRepository.save(task);
        developerRepository.save(developer);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<Void> approvedTask(long taskId) {

        User currentUser = sessionService.getCurrentUser();
        Task task = taskRepository.findOne(taskId);
        task.setSolverId(currentUser.getId());
        task.setStatus(TaskStatus.DONE);
        taskRepository.save(task);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<Void> deleteTask(long taskId) {
        taskRepository.delete(taskId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Transactional
    public GetTaskPrioritiesResponse getTaskPriorities() {
        GetTaskPrioritiesResponse response = new GetTaskPrioritiesResponse();
        response.setPriorities(new ArrayList<>());
        List<TaskPriority> priorities = prioritiesRepository.findAll();
        for (TaskPriority priority : priorities) {
            response.getPriorities().add(priority.getPriority());
        }
        return response;
    }
}

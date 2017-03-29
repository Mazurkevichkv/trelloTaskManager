package com.risingapp.trello.service;

import com.risingapp.trello.entity.*;
import com.risingapp.trello.model.request.AddTaskRequest;
import com.risingapp.trello.model.response.GetPriorityResponse;
import com.risingapp.trello.model.response.GetTaskPrioritiesResponse;
import com.risingapp.trello.model.response.GetTaskResponse;
import com.risingapp.trello.model.response.GetTasksResponse;
import com.risingapp.trello.repository.PrioritiesRepository;
import com.risingapp.trello.repository.TaskRepository;
import com.risingapp.trello.repository.UserRepository;
import com.risingapp.trello.utils.FileProcessor;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    static Logger log = Logger.getLogger(TaskService.class);

    @Autowired private TaskRepository taskRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private PrioritiesRepository prioritiesRepository;
    @Autowired private SessionService sessionService;
    @Autowired private FileProcessor processor;

    private FileProcessor.RepositoryHelper repositoryHelper = new FileProcessor.RepositoryHelper() {
        @Override
        public TaskPriority getPriority(String prior) {
            TaskPriority priority = prioritiesRepository.findByPriority(prior);
            if (priority == null) {
                priority = new TaskPriority();
                priority.setPriority(prior);
            }
            return priority;
        }

        @Override
        public ProductOwner getProductOwner() {
            return (ProductOwner) sessionService.getCurrentUser();
        }

        @Override
        public void saveTask(Task task) {
            taskRepository.save(task);
        }
    };

    @Transactional
    public ResponseEntity<Void> addTask(AddTaskRequest request) {
        ProductOwner productOwner = repositoryHelper.getProductOwner();
        TaskPriority priority = repositoryHelper.getPriority(request.getPriority());
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setText(request.getText());
        task.setCreator(productOwner);
        task.setPriority(priority);
        taskRepository.save(task);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //TODO
    @Transactional
    public ResponseEntity<Void> addTask(MultipartFile file) {

        processor.setFile(file);
        processor.process(repositoryHelper);
        if (!processor.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        log.error(processor.getMessage());
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
        if (task.getPriority() != null)
            response.setPriority(task.getPriority().getPriority());
        response.setTitle(task.getTitle());
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
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<Void> approvedTask(long taskId) {

        User currentUser = sessionService.getCurrentUser();
        Task task = taskRepository.findOne(taskId);
        task.setSolver(currentUser);
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
            response.getPriorities().add(new GetPriorityResponse(priority.getId(), priority.getPriority()));
        }
        return response;
    }
}

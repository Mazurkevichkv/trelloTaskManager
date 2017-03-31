package com.risingapp.trello.rest;

import com.risingapp.trello.entity.UserRole;
import com.risingapp.trello.model.request.AddTaskRequest;
import com.risingapp.trello.model.response.GetTaskPrioritiesResponse;
import com.risingapp.trello.model.response.GetTaskResponse;
import com.risingapp.trello.model.response.GetTasksResponse;
import com.risingapp.trello.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by zinoviyzubko on 27.03.17.
 */
@Controller
@RequestMapping(value = "/rest")
public class TaskController {

    @Autowired private TaskService taskService;

    @RequestMapping(value = "/task/{id}")
    public @ResponseBody GetTaskResponse getTask(@PathVariable("id") long id) {
        return taskService.getTask(id);
    }

    @RequestMapping(value = "/tasks")
    public @ResponseBody GetTasksResponse getTasks() {
        return taskService.getAllTasks();
    }

//    @Secured({"PRODUCT_OWNER"})
    @RequestMapping(value = "/task/form", method = RequestMethod.POST)
    public ResponseEntity<Void> addTask(@RequestBody AddTaskRequest request) {
        return taskService.addTask(request);
    }

//    @Secured({UserRole.PRODUCT_OWNER})
    @RequestMapping(value = "/task/file", method = RequestMethod.POST)
    public ResponseEntity<Void> addTask(@RequestParam(value = "file")MultipartFile file) {
        return taskService.addTask(file);
    }

//    @Secured({UserRole.PRODUCT_OWNER})
    @RequestMapping(value = "/task/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> removeTask(@PathVariable("id") long id) {
        return taskService.deleteTask(id);
    }

//    @Secured({UserRole.TEAM_LEAD})
    @RequestMapping(value = "/task/appoint/{task_id}/to/{user_id}")
    public ResponseEntity<Void> appointTask(@PathVariable("task_id") long taskId,
                                            @PathVariable("user_id") long userId) {
        return taskService.appointTask(userId, taskId);
    }

    @RequestMapping(value = "/task/unappoint/{task_id}", method = RequestMethod.POST)
    public ResponseEntity<Void> unappointTask(@PathVariable("task_id") long taskId) {
        return taskService.unappointTask(taskId);
    }

    @RequestMapping(value = "/task/approved/{task_id}")
    public ResponseEntity<Void> approvedTask(@PathVariable("task_id") long task_id) {
        return taskService.approvedTask(task_id);
    }

    @RequestMapping(value = "/task/priorities")
    public @ResponseBody GetTaskPrioritiesResponse getPriorities() {
        return taskService.getTaskPriorities();
    }
}

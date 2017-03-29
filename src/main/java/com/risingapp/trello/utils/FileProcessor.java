package com.risingapp.trello.utils;

import com.risingapp.trello.entity.ProductOwner;
import com.risingapp.trello.entity.Task;
import org.apache.log4j.Logger;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by oleg on 27.03.17.
 */
public class FileProcessor {

    private static final int TASK_ARGUMENTS_SIZE = 2;
    private static final int TASK_TITLE_ID = 0;
    private static final int TASK_CONTENT_ID = 1;
    private static final int TASK_PRIORITY_ID = 2;


    static Logger log = Logger.getLogger(FileProcessor.class);


    private MultipartFile file;
    private boolean errors;
    private String message;
    private List<Task> taskList;
    private ProductOwner owner;

    public FileProcessor(MultipartFile file, ProductOwner owner) {
        this.file = file;
        this.taskList = new ArrayList<>();
        this.owner = owner;
    }


    public void process() {
        if (!validate()) {
            errors = true;
            message = "Invalid name";
            return;
        }
        String line;
        try {
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(file.getInputStream()));
            while ((line = bufferedReader.readLine()) != null) {
                String[] args = line.split("\t");

                if (args.length < TASK_ARGUMENTS_SIZE) {
                    log.warn("Invalid task: " + line);
                    continue;
                }
                Task task = new Task();
                task.setCreator(owner);
                task.setText(args[TASK_CONTENT_ID]);
                taskList.add(task);
            }
        } catch (IOException e) {
            log.error(e.getMessage());
            message = e.getMessage();
            errors = true;

        }
    }

    public List<Task> getTaskList() {
        return taskList;
    }

    public boolean hasErrors() {
        return errors;
    }

    public String getMessage() {
        return message;
    }

    public boolean validate() {
        return file.getOriginalFilename().matches(".+[.](tl|csv)");

    }




}

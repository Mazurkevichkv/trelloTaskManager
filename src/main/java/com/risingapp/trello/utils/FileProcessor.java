package com.risingapp.trello.utils;

import com.risingapp.trello.entity.ProductOwner;
import com.risingapp.trello.entity.Task;
import com.risingapp.trello.entity.TaskPriority;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Created by oleg on 27.03.17.
 */
@Component
public class FileProcessor {

    private static final int TASK_ARGUMENTS_SIZE = 3;
    private static final int TASK_TITLE_ID = 0;
    private static final int TASK_CONTENT_ID = 1;
    private static final int TASK_PRIORITY_ID = 2;


    static Logger log = Logger.getLogger(FileProcessor.class);


    private MultipartFile file;
    private boolean errors;
    private String message;


    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public void process(RepositoryHelper repositoryHelper) {
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
                task.setText(args[TASK_CONTENT_ID]);
                task.setTitle(args[TASK_TITLE_ID]);
                task.setCreator(repositoryHelper.getProductOwner());
                task.setPriority(repositoryHelper.getPriority(args[TASK_PRIORITY_ID]));
                repositoryHelper.saveTask(task);

            }
        } catch (IOException e) {
            log.error(e.getMessage());
            message = e.getMessage();
            errors = true;

        }
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


    public interface RepositoryHelper {
        TaskPriority getPriority(String priority);
        ProductOwner getProductOwner();
        void saveTask(Task task);
    }
}

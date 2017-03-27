package com.risingapp.trello.utils;

import com.risingapp.trello.entity.Task;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Created by oleg on 27.03.17.
 */
public class FileProcessor {

    private MultipartFile file;
    private boolean errors;
    private String message;
    private Task task;

    public FileProcessor(MultipartFile file) {
        this.file = file;
        this.task = new Task();
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
                //TODO process file
            }
        } catch (IOException e) {
            e.printStackTrace();
            errors = true;
            message = e.getMessage();
        }
    }

    public Task getTask() {
        return task;
    }

    public boolean hasErrors() {
        return errors;
    }

    public boolean validate() {
        return file.getOriginalFilename().matches(".+[.]tl");

    }


}

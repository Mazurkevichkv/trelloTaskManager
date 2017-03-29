package com.risingapp.trello;

import com.risingapp.trello.entity.*;
import com.risingapp.trello.repository.TaskRepository;
import com.risingapp.trello.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.ArrayList;

/**
 * Created by zinoviyzubko on 27.03.17.
 */
@Component
public class MockCreator {

    @Autowired private UserRepository userRepository;
    @Autowired private TaskRepository taskRepository;

    @PostConstruct
    private void init() {
        Developer developer = creatDeveloper();
        userRepository.save(developer);
    }

    public Developer creatDeveloper() {
        Developer developer = new Developer();
        developer.setEmail("zinuk14@gmail.com");
        developer.setPassword("developer");
        developer.setBirthday("1996-11-12");
        developer.setFirstName("Zinoviy");
        developer.setLastName("Zubko");
        developer.setTasks(new ArrayList<>());
        Task task = createTask();
        developer.getTasks().add(task);
        developer.setTeamLead(createTeamLead(task));

        return developer;
    }

    private TeamLead createTeamLead(Task task) {
        TeamLead teamLead = new TeamLead();
        teamLead.setEmail("teamLead@gmail.com");
        teamLead.setPassword("teamLead");
        teamLead.setBirthday("teamLead");
        teamLead.setFirstName("ZinoviyTeamLead");
        teamLead.setLastName("ZubkoTeamLead");
        teamLead.setDevelopers(new ArrayList<>());
        teamLead.setProductOwner(createProductOwner(task));
        userRepository.save(teamLead);
        return teamLead;
    }

    public ProductOwner createProductOwner(Task task) {
        ProductOwner productOwner = new ProductOwner();
        productOwner.setEmail("teamOwner@gmail.com");
        productOwner.setPassword("productOwner");
        productOwner.setBirthday("productOwner");
        productOwner.setFirstName("ZinoviyProductOwner");
        productOwner.setLastName("ZubkoProductOwner");
        productOwner.setCreatedTasks(new ArrayList<>());
        productOwner.getCreatedTasks().add(task);
        userRepository.save(productOwner);
        return productOwner;
    }

    private Task createTask() {
        Task task = new Task();
        task.setText("FirstTask");
        taskRepository.save(task);
        return task;
    }
}

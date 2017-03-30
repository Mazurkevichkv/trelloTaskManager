package com.risingapp.trello;

import com.risingapp.trello.entity.*;
import com.risingapp.trello.repository.DeveloperRepository;
import com.risingapp.trello.repository.ProductOwnerRepository;
import com.risingapp.trello.repository.TaskRepository;
import com.risingapp.trello.repository.TeamLeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.ArrayList;

/**
 * Created by zinoviyzubko on 27.03.17.
 */
@Component
public class MockCreator {

    @Autowired private DeveloperRepository developerRepository;
    @Autowired private TeamLeadRepository teamLeadRepository;
    @Autowired private ProductOwnerRepository productOwnerRepository;
    @Autowired private TaskRepository taskRepository;

    @PostConstruct
    private void init() {
        Developer developer = creatDeveloper();
        developerRepository.save(developer);
    }

    public Developer creatDeveloper() {
        Developer developer = new Developer();
        developer.setEmail("zinu14@gmail.com");
        developer.setPassword("developer");
        developer.setBirthday("1996-11-12");
        developer.setFirstName("Zinoviy");
        developer.setLastName("Zubko");
        Task task = createTask();
        developer.getTaskIds().add(task.getId());
        developer.setTeamLeadId(createTeamLead(task).getProductOwnerId());

        return developer;
    }

    private TeamLead createTeamLead(Task task) {
        TeamLead teamLead = new TeamLead();
        teamLead.setEmail("teamLead@gmail.com");
        teamLead.setPassword("teamLead");
        teamLead.setBirthday("teamLead");
        teamLead.setFirstName("ZinoviyTeamLead");
        teamLead.setLastName("ZubkoTeamLead");
        teamLead.setDeveloperIds(new ArrayList<>());
        teamLead.setProductOwnerId(createProductOwner(task).getId());
        teamLeadRepository.save(teamLead);
        return teamLead;
    }

    public ProductOwner createProductOwner(Task task) {
        ProductOwner productOwner = new ProductOwner();
        productOwner.setEmail("teamOwner@gmail.com");
        productOwner.setPassword("productOwner");
        productOwner.setBirthday("productOwner");
        productOwner.setFirstName("ZinoviyProductOwner");
        productOwner.setLastName("ZubkoProductOwner");
        productOwner.getCreatedTaskIds().add(task.getId());
        productOwnerRepository.save(productOwner);
        return productOwner;
    }

    private Task createTask() {
        Task task = new Task();
        task.setText("FirstTask");
        taskRepository.save(task);
        return task;
    }
}

package com.risingapp.trello;

import com.risingapp.trello.entity.*;
import com.risingapp.trello.repository.PrioritiesRepository;
import com.risingapp.trello.repository.TaskRepository;
import com.risingapp.trello.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by zinoviyzubko on 27.03.17.
 */
@Component
public class MockCreator {

    @Autowired private UserRepository userRepository;
    @Autowired private TaskRepository taskRepository;
    @Autowired private PrioritiesRepository prioritiesRepository;

    @PostConstruct
    private void init() {
        getProductOwners(1);
    }



    private List<Task> getTaskList(int size) {
        List<Task> taskList = new ArrayList<>();
        for (int i = 0; i < size; i++) {

            Task task = new Task();
            task.setPriority(getPriority("priority" + i % 3));
            task.setTitle("task " + i);
            task.setText("TODO " + i);
            taskRepository.save(task);
            taskList.add(task);

        }
        return taskList;
    }

    private TaskPriority getPriority(String prior) {
        TaskPriority priority = prioritiesRepository.findByPriority(prior);
        if (priority == null) {
            priority = new TaskPriority();
            priority.setPriority(prior);
            prioritiesRepository.save(priority);
        }
        return priority;
    }

    private List<Developer> getDeveloperList(int size) {
        List<Developer> developers = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            Developer developer = new Developer();
            developer.setTasks(getTaskList(4));
            developer.setFirstName("Developer");
            developer.setLastName("Test");
            developer.setEmail(String.format("user%d@user.dev", i));
            developer.setPassword("12345");
            developer.setBirthday(String.format("199%d-11-12", i % 10));
            userRepository.save(developer);
            developers.add(developer);
        }
        return developers;
    }


    private List<TeamLead> getTeamLeads(int size) {
        List<TeamLead> teamLeads = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TeamLead teamLead = new TeamLead();
            teamLead.setDevelopers(getDeveloperList(5));
            teamLead.setFirstName("TeamLead");
            teamLead.setLastName("Mock");
            teamLead.setEmail(String.format("user%d@user.tm", i));
            teamLead.setPassword("12345");
            teamLead.setBirthday(String.format("199%d-11-12", i % 10));
            userRepository.save(teamLead);
            teamLeads.add(teamLead);
        }
        return teamLeads;
    }

    private List<ProductOwner> getProductOwners(int size) {
        List<ProductOwner> owners = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            ProductOwner owner = new ProductOwner();
            owner.setTeamLeads(getTeamLeads(3));
            owner.setFirstName("ProductOwner");
            owner.setLastName("MockTest");
            owner.setEmail(String.format("user%d@user.ownr", i));
            owner.setPassword("12345");
            owner.setBirthday(String.format("199%d-11-12", i % 10));
            userRepository.save(owner);
            owners.add(owner);
        }
        return owners;
    }
}

package com.risingapp.trello;

import com.risingapp.trello.entity.*;
import com.risingapp.trello.repository.*;
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
    @Autowired private DeveloperRepository developerRepository;
    @Autowired private TeamLeadRepository teamLeadRepository;
    @Autowired private ProductOwnerRepository productOwnerRepository;
    @Autowired private TaskRepository taskRepository;
    @Autowired private PrioritiesRepository prioritiesRepository;

    @PostConstruct
    private void init() {
        getProductOwnerIdList(2);
    }

    private List<Long> getTaskIdList(int size) {
        List<Long> taskList = new ArrayList<>();
        for (int i = 0; i < size; i++) {

            Task task = new Task();
            task.setPriorityId(getPriorityId("priority" + i % 3));
            task.setTitle("task " + i);
            task.setText("TODO " + i);
            taskRepository.save(task);
            taskList.add(task.getId());

        }
        return taskList;
    }

    private long getPriorityId(String prior) {
        TaskPriority priority = prioritiesRepository.findByPriority(prior);
        if (priority == null) {
            priority = new TaskPriority();
            priority.setPriority(prior);
            prioritiesRepository.save(priority);
        }
        return priority.getId();
    }

    private List<Long> getDeveloperIdList(int size) {
        List<Long> developers = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            Developer developer = new Developer();
            developer.setTaskIds(getTaskIdList(4));
            developer.setFirstName("Developer");
            developer.setLastName("Test");
            developer.setEmail(String.format("user%d@user.dev", i));
            developer.setPassword("12345");
            developer.setBirthday(String.format("199%d-11-12", i % 10));
            developerRepository.save(developer);
            developers.add(developer.getId());
        }
        return developers;
    }


    private List<Long> getTeamLeadsIdList(int size) {
        List<Long> teamLeads = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TeamLead teamLead = new TeamLead();
            teamLead.setDeveloperIds(getDeveloperIdList(5));
            teamLead.setFirstName("TeamLead");
            teamLead.setLastName("Mock");
            teamLead.setEmail(String.format("user%d@user.tm", i));
            teamLead.setPassword("12345");
            teamLead.setBirthday(String.format("199%d-11-12", i % 10));
            teamLeadRepository.save(teamLead);
            teamLeads.add(teamLead.getId());
        }
        return teamLeads;
    }

    private List<Long> getProductOwnerIdList(int size) {
        List<Long> owners = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            ProductOwner owner = new ProductOwner();
            owner.setTeamLeadIds(getTeamLeadsIdList(3));
            owner.setFirstName("ProductOwner");
            owner.setLastName("MockTest");
            owner.setEmail(String.format("user%d@user.ownr", i));
            owner.setPassword("12345");
            owner.setBirthday(String.format("199%d-11-12", i % 10));
            productOwnerRepository.save(owner);
            owners.add(owner.getId());
        }
        return owners;
    }
}

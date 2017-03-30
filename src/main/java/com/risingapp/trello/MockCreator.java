package com.risingapp.trello;

import com.risingapp.trello.entity.*;
import com.risingapp.trello.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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

    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    private static ProductOwner productOwner;

    private TeamLead teamLead1;
    private TeamLead teamLead2;

    private Developer developer1;
    private Developer developer2;
    private Developer developer3;

    private static Task task1;
    private static Task task2;
    private static Task task3;
    private static Task task4;
    private static Task task5;
    private static Task task6;
    private static Task task7;

    private static TaskPriority priority1;
    private static TaskPriority priority2;
    private static TaskPriority priority3;

    @PostConstruct
    private void init() {

        createTaskPriority();
        createProductOwner();
        createTeamLeads();
        createDevelopers();
        createTasks();

        developer1.getTaskIds().add(task1.getId());
        task1.setDeveloperId(developer1.getId());
        developer1.getTaskIds().add(task2.getId());
        task2.setDeveloperId(developer1.getId());
        developer2.getTaskIds().add(task3.getId());
        task3.setDeveloperId(developer2.getId());
        developer2.getTaskIds().add(task4.getId());
        task4.setDeveloperId(developer2.getId());
        developer3.getTaskIds().add(task5.getId());
        task5.setDeveloperId(developer3.getId());
        developer3.getTaskIds().add(task6.getId());
        task6.setDeveloperId(developer3.getId());
        developer3.getTaskIds().add(task7.getId());
        task7.setDeveloperId(developer3.getId());

        taskRepository.save(task1);
        taskRepository.save(task2);
        taskRepository.save(task3);
        taskRepository.save(task4);
        taskRepository.save(task5);
        taskRepository.save(task6);
        taskRepository.save(task7);

        developerRepository.save(developer1);
        developerRepository.save(developer2);
        developerRepository.save(developer3);
    }


    private void createTaskPriority() {
        priority1 = new TaskPriority();
        priority1.setPriority("LOW");
        priority2 = new TaskPriority();
        priority2.setPriority("MIDDLE");
        priority3 = new TaskPriority();
        priority3.setPriority("HIGH");
        prioritiesRepository.save(priority1);
        prioritiesRepository.save(priority2);
        prioritiesRepository.save(priority3);
    }

    private void createProductOwner() {
        productOwner = new ProductOwner();
        productOwner.setEmail("admin@gmail.com");
        productOwner.setPassword("admin");
        productOwner.setTeamLeadIds(new ArrayList<>());
//        for (TeamLead teamLead : teamLeads)
//            productOwner.getTeamLeadIds().add(teamLead.getId());
        productOwner.setCreatedTaskIds(new ArrayList<>());
//        for (Task task : tasks)
//            productOwner.getCreatedTaskIds().add(task.getId());
        productOwner.setBirthday("1996-12-11");
        productOwner.setFirstName("Mark");
        productOwner.setLastName("Labovski");
        productOwner.setRegistrationDay(sdf.format(new Date()));
        productOwner.setUserRole(UserRole.PRODUCT_OWNER);
        productOwnerRepository.save(productOwner);
    }

    private void createTeamLeads() {
        List<TeamLead> teamLeads = new ArrayList<>();
        teamLeads.add(teamLead1);
        teamLeads.add(teamLead2);
        int i = 0;
        for (TeamLead teamLead : teamLeads) {
            i++;
            teamLead.setEmail("teamLead" + i + "@gmail.com");
            teamLead.setPassword("admin");
            teamLead.setFirstName("Team" + i);
            teamLead.setLastName("Lead" + i);
            teamLead.setRegistrationDay(sdf.format(new Date()));
            teamLead.setProductOwnerId(productOwner.getId());
            teamLead.setUserRole(UserRole.TEAM_LEAD);
            teamLead.setDeveloperIds(new ArrayList<>());
            teamLeadRepository.save(teamLead);
        }
    }

    private void createDevelopers() {
        List<Developer> developers = new ArrayList<>();
        developers.add(developer1);
        developers.add(developer2);
        developers.add(developer3);
        int i = 0;
        for (Developer developer : developers) {
            i++;
            developer.setEmail("developer" + i + "@gmail.com");
            developer.setPassword("admin");
            developer.setRegistrationDay(sdf.format(new Date()));
            developer.setFirstName("Dev" + i);
            developer.setLastName("Senior" + i);
            developer.setUserRole(UserRole.DEVELOPER);
            developer.setTaskIds(new ArrayList<>());
            developerRepository.save(developer);
            if (i % 2 == 0) {
                developer.setTeamLeadId(teamLead1.getId());
                teamLead1.getDeveloperIds().add(developer.getId());
            }
            else {
                developer.setTeamLeadId(teamLead2.getId());
                teamLead2.getDeveloperIds().add(developer.getId());
            }

        }
    }

    private void createTasks() {
        List<Task> tasks = new ArrayList<>();
        tasks.add(task1);
        tasks.add(task2);
        tasks.add(task3);
        tasks.add(task4);
        tasks.add(task5);
        tasks.add(task6);
        tasks.add(task7);
        int i = 0;
        for (Task task : tasks) {
            task = new Task();
            task.setTitle("Task title №" + i );
            task.setText("Task text №" + i);
            task.setCreatorId(productOwner.getId());
            if (i % 2 == 0) task.setPriorityId(priority1.getId());
            else task.setPriorityId(priority2.getId());
            if (i == 6) task.setPriorityId(priority3.getId());
            taskRepository.save(task);
            productOwner.getCreatedTaskIds().add(task.getId());
            i++;
        }
    }
}

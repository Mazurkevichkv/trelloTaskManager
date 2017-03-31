package com.risingapp.trello;

import com.risingapp.trello.entity.*;
import com.risingapp.trello.repository.*;
import com.risingapp.trello.utils.MockGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

/**
 * Created by zinoviyzubko on 27.03.17.
 * */
@Component
public class MockCreator {

    @Autowired private DeveloperRepository developerRepository;
    @Autowired private TeamLeadRepository teamLeadRepository;
    @Autowired private ProductOwnerRepository productOwnerRepository;
    @Autowired private TaskRepository taskRepository;
    @Autowired private PrioritiesRepository prioritiesRepository;

    @Autowired private MockGenerator mockGenerator;

    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    private ProductOwner productOwner;

    private TeamLead teamLead1;
    private TeamLead teamLead2;

    private Developer developer1;
    private Developer developer2;
    private Developer developer3;

    private Task task1;
    private Task task2;
    private Task task3;
    private Task task4;
    private Task task5;
    private Task task6;

    private TaskPriority priority1;
    private TaskPriority priority2;
    private TaskPriority priority3;

    @PostConstruct
    private void init() {


        mockGenerator.mockDb();

//        createTaskPriority();
//        createProductOwner();
//        createTeamLeads();
//        createDevelopers();
//        createTasks();
//
//        developer1.getTaskIds().add(task1.getId());
//        task1.setDeveloperId(developer1.getId());
//        developer1.getTaskIds().add(task2.getId());
//        task2.setDeveloperId(developer1.getId());
//        developer2.getTaskIds().add(task3.getId());
//        task3.setDeveloperId(developer2.getId());
//        developer2.getTaskIds().add(task4.getId());
//        task4.setDeveloperId(developer2.getId());
//
//        taskRepository.save(task1);
//        taskRepository.save(task2);
//        taskRepository.save(task3);
//        taskRepository.save(task4);
//
//        developerRepository.save(developer1);
//        developerRepository.save(developer2);
//        developerRepository.save(developer3);
//
//        teamLeadRepository.save(teamLead1);
//        teamLeadRepository.save(teamLead2);
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
        teamLead1 = new TeamLead();
        teamLead1.setEmail("teamLead1@gmail.com");
        teamLead1.setPassword("admin");
        teamLead1.setFirstName("Jack");
        teamLead1.setLastName("Lead1");
        teamLead1.setRegistrationDay(sdf.format(new Date()));
        teamLead1.setProductOwnerId(productOwner.getId());
        teamLead1.setUserRole(UserRole.TEAM_LEAD);
        teamLead1.setDeveloperIds(new ArrayList<>());
        teamLeadRepository.save(teamLead1);

        teamLead2 = new TeamLead();
        teamLead2.setEmail("teamLead2@gmail.com");
        teamLead2.setPassword("admin");
        teamLead2.setFirstName("Team2");
        teamLead2.setLastName("Lead2");
        teamLead2.setRegistrationDay(sdf.format(new Date()));
        teamLead2.setProductOwnerId(productOwner.getId());
        teamLead2.setUserRole(UserRole.TEAM_LEAD);
        teamLead2.setDeveloperIds(new ArrayList<>());
        teamLeadRepository.save(teamLead2);
    }

    private void createDevelopers() {

        developer1 = new Developer();
        developer1.setEmail("developer1@gmail.com");
        developer1.setPassword("admin");
        developer1.setRegistrationDay(sdf.format(new Date()));
        developer1.setFirstName("Dev1" );
        developer1.setLastName("Senior1");
        developer1.setUserRole(UserRole.DEVELOPER);
        developer1.setTaskIds(new ArrayList<>());
        developerRepository.save(developer1);
        developer1.setTeamLeadId(teamLead1.getId());
        teamLead1.getDeveloperIds().add(developer1.getId());

        developer2 = new Developer();
        developer2.setEmail("developer2@gmail.com");
        developer2.setPassword("admin");
        developer2.setRegistrationDay(sdf.format(new Date()));
        developer2.setFirstName("Dev2" );
        developer2.setLastName("Senior2");
        developer2.setUserRole(UserRole.DEVELOPER);
        developer2.setTaskIds(new ArrayList<>());
        developerRepository.save(developer2);
        developer2.setTeamLeadId(teamLead2.getId());
        teamLead2.getDeveloperIds().add(developer2.getId());

        developer3 = new Developer();
        developer3.setEmail("developer3@gmail.com");
        developer3.setPassword("admin");
        developer3.setRegistrationDay(sdf.format(new Date()));
        developer3.setFirstName("Dev3" );
        developer3.setLastName("Senior3");
        developer3.setUserRole(UserRole.DEVELOPER);
        developer3.setTaskIds(new ArrayList<>());
        developerRepository.save(developer3);
        developer3.setTeamLeadId(teamLead2.getId());
        teamLead2.getDeveloperIds().add(developer3.getId());
    }

    private void createTasks() {
        task1 = new Task();
        task1.setTitle("Task title №1" );
        task1.setText("Task text №1");
        task1.setCreatorId(productOwner.getId());
        task1.setPriorityId(priority1.getId());
        taskRepository.save(task1);
        productOwner.getCreatedTaskIds().add(task1.getId());

        task2 = new Task();
        task2.setTitle("Task title №2" );
        task2.setText("Task text №2");
        task2.setCreatorId(productOwner.getId());
        task2.setPriorityId(priority2.getId());
        taskRepository.save(task2);
        productOwner.getCreatedTaskIds().add(task2.getId());

        task3 = new Task();
        task3.setTitle("Task title №3" );
        task3.setText("Task text №3");
        task3.setCreatorId(productOwner.getId());
        task3.setPriorityId(priority3.getId());
        taskRepository.save(task3);
        productOwner.getCreatedTaskIds().add(task3.getId());

        task4 = new Task();
        task4.setTitle("Task title №4" );
        task4.setText("Task text №4");
        task4.setCreatorId(productOwner.getId());
        task4.setPriorityId(priority1.getId());
        taskRepository.save(task4);
        productOwner.getCreatedTaskIds().add(task4.getId());

        task5 = new Task();
        task5.setTitle("Task title №5" );
        task5.setText("Task text №5");
        task5.setCreatorId(productOwner.getId());
        task5.setPriorityId(priority2.getId());
        taskRepository.save(task5);
        productOwner.getCreatedTaskIds().add(task5.getId());

        task6 = new Task();
        task6.setTitle("Task title №6" );
        task6.setText("Task text №6");
        task6.setCreatorId(productOwner.getId());
        task6.setPriorityId(priority3.getId());
        taskRepository.save(task6);
        productOwner.getCreatedTaskIds().add(task6.getId());
    }
}

package com.risingapp.trello.utils;

import com.risingapp.trello.entity.*;
import com.risingapp.trello.model.common.RandomUserResponse;
import com.risingapp.trello.model.response.GetRandomUsersResponse;
import com.risingapp.trello.repository.*;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Created by oleg on 31.03.17.
 */
@Component
public class MockGenerator {

    @Autowired private DeveloperRepository developerRepository;
    @Autowired private TeamLeadRepository teamLeadRepository;
    @Autowired private ProductOwnerRepository productOwnerRepository;
    @Autowired private TaskRepository taskRepository;
    @Autowired private PrioritiesRepository prioritiesRepository;

    static Logger log = Logger.getLogger(MockGenerator.class);
    private static final String[] contentComponents = new String[] {
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
            "Maecenas gravida commodo metus at elementum. ",
            "Nullam libero tellus, fringilla, posuere vitae magna. ",
            "Aenean mattis arcu ac nibh hendrerit sodales. ",
            "Donec egestas nibh justo, nec rutrum erat ornare at. ",
            "Fusce eget enim tellus. Vestibulum vitae suscipit. ",
            "Pellentesque eu mauris ac nisl faucibus. ",
            "Donec bibendum luctus purus ac finibus. "
    };

    private Random random = new Random();

    private ProductOwner owner;
    private List<TaskPriority> priorities;

    public <T extends User> List<T> requestRandomUsers(int size, Class<T> userClass) {
        RestTemplate template = new RestTemplate();
        GetRandomUsersResponse responseList = template.getForObject(String.format("https://randomuser.me/api/?results=%d", size), GetRandomUsersResponse.class);
        log.info(responseList);
        List<T> users = new ArrayList<>();
        for (RandomUserResponse response : responseList.getResults()) {
            users.add(randomUser(response, userClass));
        }
        return users;
    }

    public <T extends User> T requestRandomUser(Class<T> userClass) {
        RestTemplate template = new RestTemplate();
        GetRandomUsersResponse responseList = template.getForObject("https://randomuser.me/api/", GetRandomUsersResponse.class);
        log.info(responseList);
        return randomUser(responseList.getResults().get(0), userClass);
    }




    public <T extends User> T randomUser(RandomUserResponse response, Class<T> userClass) {
        User user = null;
        try {
            user = userClass.newInstance();
        } catch (InstantiationException | IllegalAccessException e) {
            e.printStackTrace();
        }
        if (user != null) {
            String firstName = response.getName().getFirst();
            firstName = firstName.substring(0, 1).toUpperCase() + firstName.substring(1);
            user.setFirstName(firstName);
            user.setLastName(response.getName().getLast());
            user.setEmail(response.getEmail());
            user.setBirthday(response.getDob());
            user.setRegistrationDay(response.getRegistered());
            user.setPassword(response.getLogin().getPassword());
            return (T) user;
        }
        return null;

    }

    public void createOwner() {
        owner = requestRandomUser(ProductOwner.class);
        owner.setEmail("admin@gmail.com");
        owner.setPassword("admin");
        owner.setTeamLeadIds(new ArrayList<>());
        productOwnerRepository.save(owner);
        for (TeamLead teamLead : getTeamLeadsList(1)) {
            owner.getTeamLeadIds().add(teamLead.getId());
        }
        productOwnerRepository.save(owner);
        getTaskList(5, -1);
        productOwnerRepository.save(owner);
    }

    public void createPriorities() {
        priorities = new ArrayList<>();

        TaskPriority high = new TaskPriority();
        high.setPriority("High");
        TaskPriority medium = new TaskPriority();
        high.setPriority("Medium");
        TaskPriority low = new TaskPriority();
        high.setPriority("Low");

        prioritiesRepository.save(high);
        prioritiesRepository.save(medium);
        prioritiesRepository.save(low);

        priorities.add(high);
        priorities.add(medium);
        priorities.add(low);

    }


    public Task getTask(long developer) {
        Task task = new Task();
        task.setText(getRandomContent());
        task.setTitle("Task#" + random.nextInt(100));
        TaskPriority randomPriority = priorities.get((new Random().nextInt(priorities.size())));
        task.setPriorityId(randomPriority.getId());
        task.setCreatorId(owner.getId());
        if (developer != -1) {
            task.setDeveloperId(developer);
        }
        taskRepository.save(task);
        owner.getCreatedTaskIds().add(task.getId());

        return task;
    }

    public List<Task> getTaskList(int size, long developer) {
        List<Task> taskList = new ArrayList<>(size);
        for (int i = 0; i < size; i++) {
            taskList.add(getTask(developer));
        }
        return taskList;
    }

    public List<TeamLead> getTeamLeadsList(int size) {
        List<TeamLead> teamLeads = requestRandomUsers(size, TeamLead.class);
        teamLeads.get(0).setPassword("teamlead");
        teamLeads.get(0).setEmail("teamlead@gmail.com");
        for (TeamLead teamLead: teamLeads) {
            teamLead.setUserRole(UserRole.TEAM_LEAD);
            teamLead.setProductOwnerId(owner.getId());
            teamLead.setDeveloperIds(new ArrayList<>());
            teamLeadRepository.save(teamLead);
            for (Developer developer : getDevelopersList(5, teamLead.getId())) {
                teamLead.getDeveloperIds().add(developer.getId());
            }
            teamLeadRepository.save(teamLead);
        }

        return teamLeads;
    }


    public List<Developer> getDevelopersList(int size, long teamLeadId) {
        List<Developer> developers = requestRandomUsers(size, Developer.class);
        developers.get(0).setEmail("developer@gmail.com");
        developers.get(0).setPassword("developer");
        for (Developer developer: developers) {
            developer.setUserRole(UserRole.DEVELOPER);
            developer.setTeamLeadId(teamLeadId);
            developer.setTaskIds(new ArrayList<>());
            developerRepository.save(developer);
            for (Task task: getTaskList(random.nextInt(4), developer.getId())) {
                developer.getTaskIds().add(task.getId());
            }
            developerRepository.save(developer);
        }
        return developers;
    }

    public static String getRandomContent() {
        Random rand = new Random();
        StringBuilder builder = new StringBuilder();
        int size = 1 + rand.nextInt(4);
        for (int i = 0; i < size; i++) {
            builder.append(contentComponents[rand.nextInt(contentComponents.length)]);
        }
        return builder.toString();
    }


    public void mockDb() {
        createPriorities();
        createOwner();
    }



}

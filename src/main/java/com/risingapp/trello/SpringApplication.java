package com.risingapp.trello;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

/**
 * Created by zinoviyzubko on 26.03.17.
 */
@SpringBootApplication
public class SpringApplication {

    public static void main(String[] args) {
        org.springframework.boot.SpringApplication.run(SpringApplication.class,args);
    }



//    @Bean
//    public CommandLineRunner demo(final UserService userService, final MockCreator mockCreator) {
//        return new CommandLineRunner() {
//            @Override
//            public void run(String... strings) throws Exception {
//                userService.registration(mockCreator.creatDeveloper());
//            }
//        };
//    }
}

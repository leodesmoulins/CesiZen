package cesi.zen.cesizen;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

import cesi.zen.cesizen.repository.RoleRepository;
import cesi.zen.cesizen.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "cesi.zen.cesizen.repository")
@RequiredArgsConstructor
@Slf4j
@EnableScheduling
public class CesizenApplication implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public static void main(String[] args) {
        SpringApplication.run(CesizenApplication.class, args);
    }

    @Override
    public void run(String... args) {
        log.info("Application started successfully!");
        log.info("Current user count: {}, role count: {}", userRepository.count(), roleRepository.count());
    }
}

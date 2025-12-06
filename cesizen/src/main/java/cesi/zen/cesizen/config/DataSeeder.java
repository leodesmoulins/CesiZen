package cesi.zen.cesizen.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import cesi.zen.cesizen.entity.RoleEntity;
import cesi.zen.cesizen.repository.RoleRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository roleRepo;

    public DataSeeder(RoleRepository roleRepo) {
        this.roleRepo = roleRepo;
    }

    @Override
    @Transactional
    public void run(String... args) {
        createRoleIfMissing("ROLE_USER");
        createRoleIfMissing("ROLE_ADMIN");
    }

    private void createRoleIfMissing(String name) {
        roleRepo.findByName(name).orElseGet(() -> roleRepo.save(
            RoleEntity.builder().name(name).build()
        ));
    }
}

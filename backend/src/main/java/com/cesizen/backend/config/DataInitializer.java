package com.cesizen.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.cesizen.backend.model.entity.Role;
import com.cesizen.backend.repository.RoleRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Initialisateur de données pour créer les rôles de base au démarrage de l'application
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        log.info("Initialisation des données de base...");
        
        // Créer le rôle USER s'il n'existe pas
        if (roleRepository.findByName("ROLE_USER") == null) {
            Role userRole = new Role();
            userRole.setName("ROLE_USER");
            userRole.setDescription("Utilisateur standard");
            roleRepository.save(userRole);
            log.info("Rôle ROLE_USER créé avec succès");
        } else {
            log.info("Rôle ROLE_USER existe déjà");
        }

        // Créer le rôle ADMIN s'il n'existe pas
        if (roleRepository.findByName("ROLE_ADMIN") == null) {
            Role adminRole = new Role();
            adminRole.setName("ROLE_ADMIN");
            adminRole.setDescription("Administrateur du système");
            roleRepository.save(adminRole);
            log.info("Rôle ROLE_ADMIN créé avec succès");
        } else {
            log.info("Rôle ROLE_ADMIN existe déjà");
        }

        log.info("Initialisation des données terminée");
    }
}

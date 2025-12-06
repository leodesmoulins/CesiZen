package cesi.zen.cesizen.service;

import java.util.Map;
import java.util.Set;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import cesi.zen.cesizen.entity.UserEntity;
import cesi.zen.cesizen.repository.RoleRepository;
import cesi.zen.cesizen.repository.UserRepository;
import cesi.zen.cesizen.security.JwtService;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthService(UserRepository userRepo, RoleRepository roleRepo, PasswordEncoder encoder, JwtService jwt) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    public String register(String email, String password, String firstName, String lastName) {
        if (userRepo.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already used");
        }

        var roleUser = roleRepo.findByName("ROLE_USER")
                .orElseThrow(() -> new IllegalStateException("ROLE_USER missing in DB"));

        var user = UserEntity.builder()
                .email(email)
                .passwordHash(encoder.encode(password))
                .firstName(firstName)
                .lastName(lastName)
                .isActive(true)
                .roles(Set.of(roleUser))
                .build();

        userRepo.save(user);

        return jwt.generateToken(user.getEmail(), Map.of("roles", user.getRoles().stream().map(r -> r.getName()).toList()));
    }

    public String login(String email, String password) {
        var user = userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Bad credentials"));

        if (!Boolean.TRUE.equals(user.getIsActive())) {
            throw new IllegalArgumentException("User disabled");
        }

        if (!encoder.matches(password, user.getPasswordHash())) {
            throw new IllegalArgumentException("Bad credentials");
        }

        return jwt.generateToken(user.getEmail(), Map.of("roles", user.getRoles().stream().map(r -> r.getName()).toList()));
    }
}

package cesi.zen.cesizen.controller;

import cesi.zen.cesizen.dto.MeResponse;
import cesi.zen.cesizen.entity.RoleEntity;
import cesi.zen.cesizen.entity.UserEntity;
import cesi.zen.cesizen.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MeController {

    private final UserRepository userRepository;

    @GetMapping("/me")
    public MeResponse me(Authentication auth) {
        String email = auth.getName();

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return new MeResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                Boolean.TRUE.equals(user.getIsActive()),
                user.getCreatedAt(),
                user.getUpdatedAt(),
                user.getRoles().stream().map(RoleEntity::getName).toList()
        );
    }
}

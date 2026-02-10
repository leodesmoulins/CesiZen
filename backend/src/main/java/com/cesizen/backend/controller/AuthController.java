package com.cesizen.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cesizen.backend.model.dto.AuthResponseDto;
import com.cesizen.backend.model.dto.ResetPasswordDto;
import com.cesizen.backend.model.dto.UserDto;
import com.cesizen.backend.model.dto.UserLoginDto;
import com.cesizen.backend.model.dto.UserRegistrationDto;
import com.cesizen.backend.service.AuthService;
import com.cesizen.backend.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "APIs pour l'authentification")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    /**
     * Inscription d'un nouvel utilisateur
     */
    @PostMapping("/register")
    @Operation(summary = "Inscription", description = "Créer un nouveau compte utilisateur")
    public ResponseEntity<UserDto> register(@Valid @RequestBody UserRegistrationDto registrationDto) {
        UserDto user = userService.register(registrationDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    /**
     * Connexion d'un utilisateur
     */
    @PostMapping("/login")
    @Operation(summary = "Connexion", description = "Authentification et génération du token JWT")
    public ResponseEntity<AuthResponseDto> login(@Valid @RequestBody UserLoginDto loginDto) {
        AuthResponseDto response = authService.login(loginDto);
        return ResponseEntity.ok(response);
    }

    /**
     * Demande de réinitialisation de mot de passe
     */
    @PostMapping("/reset-password")
    @Operation(summary = "Réinitialisation mot de passe", description = "Envoie un email de réinitialisation")
    public ResponseEntity<String> resetPassword(@Valid @RequestBody ResetPasswordDto resetDto) {
        authService.resetPassword(resetDto.getEmail());
        return ResponseEntity.ok("Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.");
    }
}

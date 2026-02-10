package com.cesizen.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cesizen.backend.model.dto.ChangePasswordDto;
import com.cesizen.backend.model.dto.UserDto;
import com.cesizen.backend.service.AuthService;
import com.cesizen.backend.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "APIs pour la gestion des utilisateurs")
@SecurityRequirement(name = "bearerAuth")
public class UserController {

    private final UserService userService;
    private final AuthService authService;

    /**
     * Récupérer le profil de l'utilisateur connecté
     */
    @GetMapping("/me")
    @Operation(summary = "Mon profil", description = "Récupère le profil de l'utilisateur connecté")
    public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        UserDto user = userService.getUserByEmail(userDetails.getUsername());
        return ResponseEntity.ok(user);
    }

    /**
     * Récupérer un utilisateur par son ID
     */
    @GetMapping("/{id}")
    @Operation(summary = "Détails utilisateur", description = "Récupère un utilisateur par son ID")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        UserDto user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    /**
     * Mettre à jour le profil de l'utilisateur connecté
     */
    @PutMapping("/me")
    @Operation(summary = "Modifier mon profil", description = "Met à jour le profil de l'utilisateur connecté")
    public ResponseEntity<UserDto> updateCurrentUser(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody UserDto userDto) {
        UserDto currentUser = userService.getUserByEmail(userDetails.getUsername());
        UserDto updatedUser = userService.updateProfile(currentUser.getId(), userDto);
        return ResponseEntity.ok(updatedUser);
    }

    /**
     * Mettre à jour un utilisateur par son ID
     */
    @PutMapping("/{id}")
    @Operation(summary = "Modifier utilisateur", description = "Met à jour un utilisateur par son ID")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserDto userDto) {
        UserDto updatedUser = userService.updateProfile(id, userDto);
        return ResponseEntity.ok(updatedUser);
    }

    /**
     * Changer le mot de passe de l'utilisateur connecté
     */
    @PutMapping("/me/password")
    @Operation(summary = "Changer mot de passe", description = "Change le mot de passe de l'utilisateur connecté")
    public ResponseEntity<String> changePassword(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody ChangePasswordDto changePasswordDto) {
        authService.changePassword(
                userDetails.getUsername(),
                changePasswordDto.getOldPassword(),
                changePasswordDto.getNewPassword()
        );
        return ResponseEntity.ok("Mot de passe modifié avec succès");
    }

    // ============ ENDPOINTS ADMIN ============

    /**
     * Récupérer tous les utilisateurs (Admin)
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Liste utilisateurs", description = "Récupère tous les utilisateurs (Admin)")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    /**
     * Désactiver un utilisateur (Admin)
     */
    @PatchMapping("/{id}/deactivate")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Désactiver utilisateur", description = "Désactive un compte utilisateur (Admin)")
    public ResponseEntity<UserDto> deactivateUser(@PathVariable Long id) {
        UserDto user = userService.deactivateUser(id);
        return ResponseEntity.ok(user);
    }

    /**
     * Activer un utilisateur (Admin)
     */
    @PatchMapping("/{id}/activate")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Activer utilisateur", description = "Active un compte utilisateur (Admin)")
    public ResponseEntity<UserDto> activateUser(@PathVariable Long id) {
        UserDto user = userService.activateUser(id);
        return ResponseEntity.ok(user);
    }

    /**
     * Supprimer un utilisateur (Admin)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Supprimer utilisateur", description = "Supprime un compte utilisateur (Admin)")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}

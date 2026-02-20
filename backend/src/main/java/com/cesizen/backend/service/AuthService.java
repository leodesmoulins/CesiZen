package com.cesizen.backend.service;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cesizen.backend.exception.RessourceNotFoundException;
import com.cesizen.backend.model.dto.AuthResponseDto;
import com.cesizen.backend.model.dto.UserDto;
import com.cesizen.backend.model.dto.UserLoginDto;
import com.cesizen.backend.model.entity.Role;
import com.cesizen.backend.model.entity.User;
import com.cesizen.backend.repository.UserRepository;
import com.cesizen.backend.security.JwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    /**
     * Authentification d'un utilisateur et génération du token JWT
     */
    public AuthResponseDto login(UserLoginDto loginDto) {
        try {
            // Authentification avec Spring Security
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getEmail(),
                            loginDto.getPassword()
                    )
            );

            // Récupérer l'utilisateur
            User user = userRepository.findByEmail(loginDto.getEmail());
            if (user == null) {
                throw new RessourceNotFoundException("Utilisateur non trouvé");
            }

            // Vérifier que le compte est actif
            if (!user.isActive()) {
                throw new BadCredentialsException("Ce compte a été désactivé");
            }

            // Générer le token JWT
            String token = jwtService.generateToken(user);

            // Construire la réponse
            UserDto userDto = convertToDto(user);
            return new AuthResponseDto(token, "Bearer", userDto);

        } catch (BadCredentialsException e) {
            log.warn("Tentative de connexion échouée pour l'email: {}", loginDto.getEmail());
            throw new BadCredentialsException("Email ou mot de passe incorrect");
        }
    }

    /**
     * Réinitialisation du mot de passe
     * Dans une vraie application, cela enverrait un email avec un lien de réinitialisation
     */
    @Transactional
    public void resetPassword(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            // Pour des raisons de sécurité, on ne révèle pas si l'email existe ou non
            log.info("Tentative de réinitialisation de mot de passe pour un email inexistant: {}", email);
            return;
        }

        // Générer un token de réinitialisation (à stocker en BDD dans une vraie implémentation)
        String resetToken = UUID.randomUUID().toString();
        
        // TODO: Implémenter l'envoi d'email avec le token
        // emailService.sendPasswordResetEmail(user.getEmail(), resetToken);
        
        log.info("Token de réinitialisation généré pour l'utilisateur: {} - Token: {}", 
                user.getEmail(), resetToken);
    }

    /**
     * Confirmer la réinitialisation du mot de passe avec le nouveau mot de passe
     */
    @Transactional
    public void confirmResetPassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RessourceNotFoundException("Utilisateur non trouvé avec l'email : " + email);
        }

        // Encoder et sauvegarder le nouveau mot de passe
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        log.info("Mot de passe réinitialisé pour l'utilisateur: {}", user.getEmail());
    }

    /**
     * Changement de mot de passe (utilisateur connecté)
     */
    @Transactional
    public void changePassword(String email, String oldPassword, String newPassword) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RessourceNotFoundException("Utilisateur non trouvé");
        }

        // Vérifier l'ancien mot de passe
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new BadCredentialsException("Mot de passe actuel incorrect");
        }

        // Encoder et sauvegarder le nouveau mot de passe
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        log.info("Mot de passe changé pour l'utilisateur: {}", user.getEmail());
    }

    /**
     * Rafraîchir le token JWT
     */
    public AuthResponseDto refreshToken(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RessourceNotFoundException("Utilisateur non trouvé");
        }

        if (!user.isActive()) {
            throw new BadCredentialsException("Ce compte a été désactivé");
        }

        String token = jwtService.generateToken(user);
        UserDto userDto = convertToDto(user);
        return new AuthResponseDto(token, "Bearer", userDto);
    }

    /**
     * Convertir User en UserDto
     */
    private UserDto convertToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setActive(user.isActive());
        dto.setRoles(user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet()));
        dto.setIsAdmin(user.getRoles().stream()
                .anyMatch(role -> "ROLE_ADMIN".equals(role.getName())));
        return dto;
    }
}

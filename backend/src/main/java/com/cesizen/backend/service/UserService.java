package com.cesizen.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cesizen.backend.exception.DuplicateResourceException;
import com.cesizen.backend.exception.RessourceNotFoundException;
import com.cesizen.backend.model.dto.UserDto;
import com.cesizen.backend.model.dto.UserRegistrationDto;
import com.cesizen.backend.model.entity.Role;
import com.cesizen.backend.model.entity.User;
import com.cesizen.backend.repository.RoleRepository;
import com.cesizen.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Charge un utilisateur par son email pour Spring Security
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("Utilisateur non trouvé avec l'email : " + email);
        }

        List<SimpleGrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                user.isActive(),
                true, // accountNonExpired
                true, // credentialsNonExpired
                true, // accountNonLocked
                authorities
        );
    }

    /**
     * Inscription d'un nouvel utilisateur
     */
    @Transactional
    public UserDto register(UserRegistrationDto registrationDto) {
        // Vérifier si l'email existe déjà
        if (userRepository.existsByEmail(registrationDto.getEmail())) {
            throw new DuplicateResourceException("Un compte avec cet email existe déjà");
        }

        // Récupérer le rôle USER par défaut
        Role userRole = roleRepository.findByName("ROLE_USER");
        if (userRole == null) {
            throw new RessourceNotFoundException("Rôle ROLE_USER non trouvé");
        }

        // Créer le nouvel utilisateur
        User user = new User();
        user.setEmail(registrationDto.getEmail());
        user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        user.setFirstName(registrationDto.getFirstName());
        user.setLastName(registrationDto.getLastName());
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        user.setRoles(Set.of(userRole));

        User savedUser = userRepository.save(user);
        return convertToDto(savedUser);
    }

    /**
     * Mise à jour du profil utilisateur
     */
    @Transactional
    public UserDto updateProfile(Long id, UserDto userDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Utilisateur non trouvé avec l'id : " + id));

        // Mettre à jour les champs modifiables
        if (userDto.getFirstName() != null) {
            user.setFirstName(userDto.getFirstName());
        }
        if (userDto.getLastName() != null) {
            user.setLastName(userDto.getLastName());
        }
        // L'email peut être modifié mais doit rester unique
        if (userDto.getEmail() != null && !userDto.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(userDto.getEmail())) {
                throw new DuplicateResourceException("Un compte avec cet email existe déjà");
            }
            user.setEmail(userDto.getEmail());
        }

        user.setUpdatedAt(LocalDateTime.now());
        User updatedUser = userRepository.save(user);
        return convertToDto(updatedUser);
    }

    /**
     * Désactiver un utilisateur (Admin)
     */
    @Transactional
    public UserDto deactivateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Utilisateur non trouvé avec l'id : " + id));

        user.setActive(false);
        user.setUpdatedAt(LocalDateTime.now());
        User updatedUser = userRepository.save(user);
        return convertToDto(updatedUser);
    }

    /**
     * Activer un utilisateur (Admin)
     */
    @Transactional
    public UserDto activateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Utilisateur non trouvé avec l'id : " + id));

        user.setActive(true);
        user.setUpdatedAt(LocalDateTime.now());
        User updatedUser = userRepository.save(user);
        return convertToDto(updatedUser);
    }

    /**
     * Supprimer un utilisateur (Admin)
     */
    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RessourceNotFoundException("Utilisateur non trouvé avec l'id : " + id);
        }
        userRepository.deleteById(id);
    }

    /**
     * Récupérer un utilisateur par son ID
     */
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Utilisateur non trouvé avec l'id : " + id));
        return convertToDto(user);
    }

    /**
     * Récupérer un utilisateur par son email
     */
    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RessourceNotFoundException("Utilisateur non trouvé avec l'email : " + email);
        }
        return convertToDto(user);
    }

    /**
     * Récupérer tous les utilisateurs (Admin)
     */
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Récupérer l'entité User par email (usage interne)
     */
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
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
        return dto;
    }
}

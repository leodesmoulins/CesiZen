package com.cesizen.backend.model.dto;

import java.util.Set;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private boolean isActive;
    private Set<String> roles;
    private Boolean isAdmin;
}

package com.cesizen.backend.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiagnosticQuestionDto {
    private Long id;

    @NotBlank(message = "Le nom de l'événement est obligatoire")
    private String eventName;

    @NotNull(message = "Les points sont obligatoires")
    private Integer points;

    private Integer order;

    private boolean isActive;
}

package com.cesizen.backend.model.dto;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class DiagnosticCalculateDto {
    @NotEmpty(message = "Vous devez sélectionner au moins un événement")
    private List<Long> selectedQuestionIds;
}

package com.cesizen.backend.model.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiagnosticResultDto {
    private Long id;
    private Long userId;
    private Integer totalScore;
    private String category;
    private String resultText;
    private LocalDateTime createdAt;
}

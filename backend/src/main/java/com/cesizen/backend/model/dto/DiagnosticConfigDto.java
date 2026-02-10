package com.cesizen.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiagnosticConfigDto {
    private Long id;
    private Integer minScoreLow;
    private Integer maxScoreLow;
    private Integer minScoreMedium;
    private Integer maxScoreMedium;
    private Integer minScoreHigh;
    private Integer maxScoreHigh;
    private String textLow;
    private String textMedium;
    private String textHigh;
}

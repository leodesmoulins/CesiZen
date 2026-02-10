package com.cesizen.backend.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "diagnostic_config")
public class DiagnosticConfig {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

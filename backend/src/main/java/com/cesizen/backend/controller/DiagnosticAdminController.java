package com.cesizen.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cesizen.backend.model.dto.DiagnosticConfigDto;
import com.cesizen.backend.model.dto.DiagnosticQuestionDto;
import com.cesizen.backend.service.DiagnosticService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/diagnostic")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Diagnostic Admin", description = "APIs d'administration du diagnostic")
@SecurityRequirement(name = "bearerAuth")
public class DiagnosticAdminController {

    private final DiagnosticService diagnosticService;

    // ============ GESTION DES QUESTIONS ============

    /**
     * Récupérer toutes les questions (actives et inactives)
     */
    @GetMapping("/questions")
    @Operation(summary = "Toutes les questions", description = "Récupère toutes les questions (Admin)")
    public ResponseEntity<List<DiagnosticQuestionDto>> getAllQuestions() {
        List<DiagnosticQuestionDto> questions = diagnosticService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }

    /**
     * Récupérer une question par ID
     */
    @GetMapping("/questions/{id}")
    @Operation(summary = "Détail question", description = "Récupère une question par son ID (Admin)")
    public ResponseEntity<DiagnosticQuestionDto> getQuestionById(@PathVariable Long id) {
        DiagnosticQuestionDto question = diagnosticService.getQuestionById(id);
        return ResponseEntity.ok(question);
    }

    /**
     * Créer une nouvelle question
     */
    @PostMapping("/questions")
    @Operation(summary = "Créer question", description = "Crée une nouvelle question (Admin)")
    public ResponseEntity<DiagnosticQuestionDto> createQuestion(
            @Valid @RequestBody DiagnosticQuestionDto dto) {
        DiagnosticQuestionDto created = diagnosticService.createQuestion(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Mettre à jour une question
     */
    @PutMapping("/questions/{id}")
    @Operation(summary = "Modifier question", description = "Met à jour une question (Admin)")
    public ResponseEntity<DiagnosticQuestionDto> updateQuestion(
            @PathVariable Long id,
            @Valid @RequestBody DiagnosticQuestionDto dto) {
        DiagnosticQuestionDto updated = diagnosticService.updateQuestion(id, dto);
        return ResponseEntity.ok(updated);
    }

    /**
     * Supprimer une question
     */
    @DeleteMapping("/questions/{id}")
    @Operation(summary = "Supprimer question", description = "Supprime une question (Admin)")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        diagnosticService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }

    // ============ GESTION DE LA CONFIGURATION ============

    /**
     * Récupérer la configuration du diagnostic
     */
    @GetMapping("/config")
    @Operation(summary = "Configuration", description = "Récupère la configuration des seuils (Admin)")
    public ResponseEntity<DiagnosticConfigDto> getConfig() {
        DiagnosticConfigDto config = diagnosticService.getConfig();
        return ResponseEntity.ok(config);
    }

    /**
     * Mettre à jour la configuration
     */
    @PutMapping("/config")
    @Operation(summary = "Modifier configuration", description = "Met à jour la configuration des seuils (Admin)")
    public ResponseEntity<DiagnosticConfigDto> updateConfig(
            @Valid @RequestBody DiagnosticConfigDto dto) {
        DiagnosticConfigDto updated = diagnosticService.updateConfig(dto);
        return ResponseEntity.ok(updated);
    }
}

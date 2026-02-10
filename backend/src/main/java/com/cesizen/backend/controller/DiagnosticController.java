package com.cesizen.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cesizen.backend.model.dto.DiagnosticCalculateDto;
import com.cesizen.backend.model.dto.DiagnosticQuestionDto;
import com.cesizen.backend.model.dto.DiagnosticResultDto;
import com.cesizen.backend.model.entity.User;
import com.cesizen.backend.service.DiagnosticService;
import com.cesizen.backend.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/diagnostic")
@RequiredArgsConstructor
@Tag(name = "Diagnostic", description = "APIs pour le questionnaire de diagnostic")
public class DiagnosticController {

    private final DiagnosticService diagnosticService;
    private final UserService userService;

    /**
     * Récupérer les questions actives du questionnaire (Public)
     */
    @GetMapping("/questions")
    @Operation(summary = "Questions du diagnostic", description = "Récupère toutes les questions actives")
    public ResponseEntity<List<DiagnosticQuestionDto>> getQuestions() {
        List<DiagnosticQuestionDto> questions = diagnosticService.getAllActiveQuestions();
        return ResponseEntity.ok(questions);
    }

    /**
     * Calculer le score (Public)
     */
    @PostMapping("/calculate")
    @Operation(summary = "Calculer le score", description = "Calcule le score basé sur les événements sélectionnés")
    public ResponseEntity<DiagnosticResultDto> calculateScore(
            @Valid @RequestBody DiagnosticCalculateDto dto) {
        DiagnosticResultDto result = diagnosticService.calculateScore(dto.getSelectedQuestionIds());
        return ResponseEntity.ok(result);
    }

    /**
     * Sauvegarder le résultat (Utilisateur authentifié)
     */
    @PostMapping("/save-result")
    @Operation(summary = "Sauvegarder le résultat", description = "Sauvegarde le résultat du diagnostic pour l'utilisateur connecté")
    public ResponseEntity<DiagnosticResultDto> saveResult(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody DiagnosticResultDto dto) {
        
        // Associer l'utilisateur au résultat
        if (userDetails != null) {
            User user = userService.findByEmail(userDetails.getUsername());
            if (user != null) {
                dto.setUserId(user.getId());
            }
        }
        
        DiagnosticResultDto saved = diagnosticService.saveResult(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /**
     * Récupérer l'historique des résultats (Utilisateur authentifié)
     */
    @GetMapping("/results")
    @Operation(summary = "Historique des résultats", description = "Récupère l'historique des diagnostics de l'utilisateur")
    public ResponseEntity<List<DiagnosticResultDto>> getUserResults(
            @AuthenticationPrincipal UserDetails userDetails) {
        
        User user = userService.findByEmail(userDetails.getUsername());
        List<DiagnosticResultDto> results = diagnosticService.getUserResults(user.getId());
        return ResponseEntity.ok(results);
    }
}

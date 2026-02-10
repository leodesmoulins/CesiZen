package com.cesizen.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cesizen.backend.exception.RessourceNotFoundException;
import com.cesizen.backend.model.dto.DiagnosticConfigDto;
import com.cesizen.backend.model.dto.DiagnosticQuestionDto;
import com.cesizen.backend.model.dto.DiagnosticResultDto;
import com.cesizen.backend.model.entity.DiagnosticConfig;
import com.cesizen.backend.model.entity.DiagnosticQuestion;
import com.cesizen.backend.model.entity.DiagnosticResult;
import com.cesizen.backend.repository.DiagnosticConfigRepository;
import com.cesizen.backend.repository.DiagnosticQuestionRepository;
import com.cesizen.backend.repository.DiagnosticResultRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DiagnosticService {

    private final DiagnosticQuestionRepository questionRepository;
    private final DiagnosticResultRepository resultRepository;
    private final DiagnosticConfigRepository configRepository;

    // ============ QUESTIONS ============

    /**
     * Récupérer toutes les questions actives (pour le questionnaire public)
     */
    public List<DiagnosticQuestionDto> getAllActiveQuestions() {
        return questionRepository.findByIsActiveTrueOrderByOrderAsc().stream()
                .map(this::convertQuestionToDto)
                .collect(Collectors.toList());
    }

    /**
     * Récupérer toutes les questions (Admin)
     */
    public List<DiagnosticQuestionDto> getAllQuestions() {
        return questionRepository.findAll().stream()
                .map(this::convertQuestionToDto)
                .collect(Collectors.toList());
    }

    /**
     * Récupérer une question par ID (Admin)
     */
    public DiagnosticQuestionDto getQuestionById(Long id) {
        DiagnosticQuestion question = questionRepository.findById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Question non trouvée avec l'id : " + id));
        return convertQuestionToDto(question);
    }

    /**
     * Créer une question (Admin)
     */
    @Transactional
    public DiagnosticQuestionDto createQuestion(DiagnosticQuestionDto dto) {
        DiagnosticQuestion question = new DiagnosticQuestion();
        question.setEventName(dto.getEventName());
        question.setPoints(dto.getPoints());
        question.setOrder(dto.getOrder() != null ? dto.getOrder() : 0);
        question.setActive(dto.isActive());

        DiagnosticQuestion saved = questionRepository.save(question);
        return convertQuestionToDto(saved);
    }

    /**
     * Mettre à jour une question (Admin)
     */
    @Transactional
    public DiagnosticQuestionDto updateQuestion(Long id, DiagnosticQuestionDto dto) {
        DiagnosticQuestion question = questionRepository.findById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Question non trouvée avec l'id : " + id));

        question.setEventName(dto.getEventName());
        question.setPoints(dto.getPoints());
        question.setOrder(dto.getOrder());
        question.setActive(dto.isActive());

        DiagnosticQuestion updated = questionRepository.save(question);
        return convertQuestionToDto(updated);
    }

    /**
     * Supprimer une question (Admin)
     */
    @Transactional
    public void deleteQuestion(Long id) {
        if (!questionRepository.existsById(id)) {
            throw new RessourceNotFoundException("Question non trouvée avec l'id : " + id);
        }
        questionRepository.deleteById(id);
    }

    // ============ CALCUL SCORE ============

    /**
     * Calculer le score basé sur les questions sélectionnées
     */
    public DiagnosticResultDto calculateScore(List<Long> selectedQuestionIds) {
        // Récupérer les questions sélectionnées
        List<DiagnosticQuestion> selectedQuestions = questionRepository.findAllById(selectedQuestionIds);

        // Calculer le score total
        int totalScore = selectedQuestions.stream()
                .mapToInt(DiagnosticQuestion::getPoints)
                .sum();

        // Déterminer la catégorie
        String category = getResultCategory(totalScore);

        // Récupérer le texte de conseil correspondant
        String resultText = getResultText(category);

        return DiagnosticResultDto.builder()
                .totalScore(totalScore)
                .category(category)
                .resultText(resultText)
                .createdAt(LocalDateTime.now())
                .build();
    }

    /**
     * Déterminer la catégorie de stress selon le score
     */
    public String getResultCategory(int score) {
        DiagnosticConfig config = getActiveConfig();

        if (score >= config.getMinScoreLow() && score <= config.getMaxScoreLow()) {
            return "FAIBLE";
        } else if (score >= config.getMinScoreMedium() && score <= config.getMaxScoreMedium()) {
            return "MOYEN";
        } else {
            return "ÉLEVÉ";
        }
    }

    /**
     * Récupérer le texte de conseil selon la catégorie
     */
    private String getResultText(String category) {
        DiagnosticConfig config = getActiveConfig();

        return switch (category) {
            case "FAIBLE" -> config.getTextLow();
            case "MOYEN" -> config.getTextMedium();
            case "ÉLEVÉ" -> config.getTextHigh();
            default -> "Consultez un professionnel pour une évaluation personnalisée.";
        };
    }

    // ============ RÉSULTATS ============

    /**
     * Sauvegarder un résultat de diagnostic
     */
    @Transactional
    public DiagnosticResultDto saveResult(DiagnosticResultDto dto) {
        DiagnosticResult result = new DiagnosticResult();
        result.setUserId(dto.getUserId());
        result.setTotalScore(dto.getTotalScore());
        result.setCategory(dto.getCategory());
        result.setResultText(dto.getResultText());
        result.setCreatedAt(LocalDateTime.now());

        DiagnosticResult saved = resultRepository.save(result);
        return convertResultToDto(saved);
    }

    /**
     * Récupérer l'historique des résultats d'un utilisateur
     */
    public List<DiagnosticResultDto> getUserResults(Long userId) {
        return resultRepository.findByUserId(userId).stream()
                .map(this::convertResultToDto)
                .collect(Collectors.toList());
    }

    // ============ CONFIGURATION ============

    /**
     * Récupérer la configuration active
     */
    public DiagnosticConfigDto getConfig() {
        DiagnosticConfig config = getActiveConfig();
        return convertConfigToDto(config);
    }

    /**
     * Mettre à jour la configuration (Admin)
     */
    @Transactional
    public DiagnosticConfigDto updateConfig(DiagnosticConfigDto dto) {
        DiagnosticConfig config = configRepository.findAll().stream().findFirst()
                .orElse(new DiagnosticConfig());

        config.setMinScoreLow(dto.getMinScoreLow());
        config.setMaxScoreLow(dto.getMaxScoreLow());
        config.setMinScoreMedium(dto.getMinScoreMedium());
        config.setMaxScoreMedium(dto.getMaxScoreMedium());
        config.setMinScoreHigh(dto.getMinScoreHigh());
        config.setMaxScoreHigh(dto.getMaxScoreHigh());
        config.setTextLow(dto.getTextLow());
        config.setTextMedium(dto.getTextMedium());
        config.setTextHigh(dto.getTextHigh());

        DiagnosticConfig saved = configRepository.save(config);
        return convertConfigToDto(saved);
    }

    /**
     * Récupérer la configuration active (usage interne)
     */
    private DiagnosticConfig getActiveConfig() {
        return configRepository.findAll().stream().findFirst()
                .orElseThrow(() -> new RessourceNotFoundException("Configuration du diagnostic non trouvée"));
    }

    // ============ CONVERTISSEURS ============

    private DiagnosticQuestionDto convertQuestionToDto(DiagnosticQuestion question) {
        return DiagnosticQuestionDto.builder()
                .id(question.getId())
                .eventName(question.getEventName())
                .points(question.getPoints())
                .order(question.getOrder())
                .isActive(question.isActive())
                .build();
    }

    private DiagnosticResultDto convertResultToDto(DiagnosticResult result) {
        return DiagnosticResultDto.builder()
                .id(result.getId())
                .userId(result.getUserId())
                .totalScore(result.getTotalScore())
                .category(result.getCategory())
                .resultText(result.getResultText())
                .createdAt(result.getCreatedAt())
                .build();
    }

    private DiagnosticConfigDto convertConfigToDto(DiagnosticConfig config) {
        return DiagnosticConfigDto.builder()
                .id(config.getId())
                .minScoreLow(config.getMinScoreLow())
                .maxScoreLow(config.getMaxScoreLow())
                .minScoreMedium(config.getMinScoreMedium())
                .maxScoreMedium(config.getMaxScoreMedium())
                .minScoreHigh(config.getMinScoreHigh())
                .maxScoreHigh(config.getMaxScoreHigh())
                .textLow(config.getTextLow())
                .textMedium(config.getTextMedium())
                .textHigh(config.getTextHigh())
                .build();
    }
}

package com.cesizen.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cesizen.backend.model.dto.InfoPageDto;
import com.cesizen.backend.service.InfoPageService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/pages")
@RequiredArgsConstructor
@Tag(name = "Pages d'information", description = "APIs pour les pages d'information")
public class InfoPageController {

    private final InfoPageService infoPageService;

    /**
     * Récupérer toutes les pages publiées (Public)
     */
    @GetMapping
    @Operation(summary = "Liste des pages", description = "Récupère toutes les pages publiées")
    public ResponseEntity<List<InfoPageDto>> getAllPublishedPages() {
        List<InfoPageDto> pages = infoPageService.getAllPublishedPages();
        return ResponseEntity.ok(pages);
    }

    /**
     * Récupérer une page par son slug (Public)
     */
    @GetMapping("/{slug}")
    @Operation(summary = "Détail d'une page", description = "Récupère une page par son slug")
    public ResponseEntity<InfoPageDto> getPageBySlug(@PathVariable String slug) {
        InfoPageDto page = infoPageService.getPageBySlug(slug);
        return ResponseEntity.ok(page);
    }

    /**
     * Créer une nouvelle page (Admin)
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Créer une page", description = "Crée une nouvelle page (Admin)")
    public ResponseEntity<InfoPageDto> createPage(@Valid @RequestBody InfoPageDto dto) {
        InfoPageDto created = infoPageService.createPage(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Mettre à jour une page (Admin)
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Modifier une page", description = "Met à jour une page existante (Admin)")
    public ResponseEntity<InfoPageDto> updatePage(
            @PathVariable Long id,
            @Valid @RequestBody InfoPageDto dto) {
        InfoPageDto updated = infoPageService.updatePage(id, dto);
        return ResponseEntity.ok(updated);
    }

    /**
     * Publier/Dépublier une page (Admin)
     */
    @PatchMapping("/{id}/publish")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Publier/Dépublier", description = "Change le statut de publication d'une page (Admin)")
    public ResponseEntity<InfoPageDto> togglePublish(@PathVariable Long id) {
        InfoPageDto updated = infoPageService.togglePublish(id);
        return ResponseEntity.ok(updated);
    }

    /**
     * Supprimer une page (Admin)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Supprimer une page", description = "Supprime une page (Admin)")
    public ResponseEntity<Void> deletePage(@PathVariable Long id) {
        infoPageService.deletePage(id);
        return ResponseEntity.noContent().build();
    }
}

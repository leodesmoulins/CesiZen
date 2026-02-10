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

import com.cesizen.backend.model.dto.MenuDto;
import com.cesizen.backend.service.MenuService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/menus")
@RequiredArgsConstructor
@Tag(name = "Menus", description = "APIs pour la gestion des menus")
public class MenuController {

    private final MenuService menuService;

    /**
     * Récupérer tous les menus (Public)
     */
    @GetMapping
    @Operation(summary = "Liste des menus", description = "Récupère tous les menus ordonnés")
    public ResponseEntity<List<MenuDto>> getAllMenus() {
        List<MenuDto> menus = menuService.getAllMenus();
        return ResponseEntity.ok(menus);
    }

    /**
     * Récupérer un menu par son ID
     */
    @GetMapping("/{id}")
    @Operation(summary = "Détail d'un menu", description = "Récupère un menu par son ID")
    public ResponseEntity<MenuDto> getMenuById(@PathVariable Long id) {
        MenuDto menu = menuService.getMenuById(id);
        return ResponseEntity.ok(menu);
    }

    /**
     * Créer un nouveau menu (Admin)
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Créer un menu", description = "Crée un nouveau menu (Admin)")
    public ResponseEntity<MenuDto> createMenu(@Valid @RequestBody MenuDto dto) {
        MenuDto created = menuService.createMenu(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Mettre à jour un menu (Admin)
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Modifier un menu", description = "Met à jour un menu existant (Admin)")
    public ResponseEntity<MenuDto> updateMenu(
            @PathVariable Long id,
            @Valid @RequestBody MenuDto dto) {
        MenuDto updated = menuService.updateMenu(id, dto);
        return ResponseEntity.ok(updated);
    }

    /**
     * Supprimer un menu (Admin)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Supprimer un menu", description = "Supprime un menu (Admin)")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long id) {
        menuService.deleteMenu(id);
        return ResponseEntity.noContent().build();
    }
}

package com.cesizen.backend.service;

import com.cesizen.backend.exception.DuplicateResourceException;
import com.cesizen.backend.exception.RessourceNotFoundException;
import com.cesizen.backend.model.dto.InfoPageDto;
import com.cesizen.backend.model.entity.InfoPage;
import com.cesizen.backend.model.entity.Menu;
import com.cesizen.backend.repository.InfoPageRepository;
import com.cesizen.backend.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InfoPageService {

    private final InfoPageRepository infoPageRepository;
    private final MenuRepository menuRepository;

    /**
     * Récupère toutes les pages publiées
     */
    public List<InfoPageDto> getAllPublishedPages() {
        List<InfoPage> pages = infoPageRepository.findByPublished(true);
        return pages.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Récupère une page par son slug
     * @param slug
     * @return
     */
    public InfoPageDto getPageBySlug(String slug) {
        List<InfoPage> pages = infoPageRepository.findBySlug(slug);

        if (pages.isEmpty()) {
            throw new RessourceNotFoundException("Page non trouvée avec le slug:" + slug);
        }

        // Prendre la première page si plusieurs (normalement slug  unique)
        return convertToDto(pages.get(0));
    }

    /**
     * Créer une nouvelle page (Admin uniquement)
     */
    @Transactional
    public InfoPageDto createPage(InfoPageDto dto) {
        
        // Vérifier si le slug existe déjà
        List<InfoPage> existingPages = infoPageRepository.findBySlug(dto.getSlug());
        if (!existingPages.isEmpty()) {
            throw new DuplicateResourceException("Une page avec ce slug existe déjà: " + dto.getSlug());
        }

        InfoPage infoPage = new InfoPage();
        infoPage.setTitle(dto.getTitle());
        infoPage.setSlug(dto.getSlug());
        infoPage.setContent(dto.getContent());
        infoPage.setPublished(false);
        infoPage.setCreatedAt(LocalDateTime.now());
        infoPage.setUpdatedAt(LocalDateTime.now());

        // Associer le menu si fourni
        if (dto.getMenuId() != null) {
            Menu menu = menuRepository.findById(dto.getMenuId())
                    .orElseThrow(() -> new RessourceNotFoundException("Menu non trouvé avec l'id:" + dto.getMenuId()));
            infoPage.setMenu(menu);
        }

        InfoPage savedPage = infoPageRepository.save(infoPage);
        return convertToDto(savedPage);
    }

    /**
     * Mettre à jour une page (Admin uniquement)
     */
    @Transactional
    public InfoPageDto updatePage(Long id, InfoPageDto dto) {
        InfoPage infoPage = infoPageRepository.findById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Page non trouvée avec l'id : " + id));
        
        // Vérifier si le nouveau slug n'est pas déjà utilisé par une autre page
        if (!infoPage.getSlug().equals(dto.getSlug())) {
            List<InfoPage> existingPages = infoPageRepository.findBySlug(dto.getSlug());
            if (!existingPages.isEmpty() && !existingPages.get(0).getId().equals(id)) {
                throw new DuplicateResourceException("Le slug est déjè utilisé par une autre page");
            }
        }

        infoPage.setTitle(dto.getTitle());
        infoPage.setSlug(dto.getSlug());
        infoPage.setContent(dto.getContent());
        infoPage.setUpdatedAt(LocalDateTime.now());

        // Mettre à jour le menu si fourni
        if (dto.getMenuId() != null) {
            Menu menu = menuRepository.findById(dto.getMenuId())
                    .orElseThrow(() -> new RessourceNotFoundException("Menu non trouvé avec l'id:" + dto.getMenuId()));
            infoPage.setMenu(menu);
        } else {
            infoPage.setMenu(null);
        }

        InfoPage updatedPage = infoPageRepository.save(infoPage);
        return convertToDto(updatedPage);
    }

    /**
     * Publier/Dépublier une page (Admin uniquement)
     */
    @Transactional
    public InfoPageDto publishPage(Long id) {
        InfoPage infoPage = infoPageRepository.findById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Page non trouvée avec l'id:" + id));
        
        // Toggle du status de publication
        infoPage.setPublished(!infoPage.isPublished());
        infoPage.setUpdatedAt(LocalDateTime.now());

        InfoPage updatedPage = infoPageRepository.save(infoPage);
        return convertToDto(updatedPage);
    }

    /**
     * Alias pour publishPage (toggle)
     */
    @Transactional
    public InfoPageDto togglePublish(Long id) {
        return publishPage(id);
    }

    /**
     * Supprimer une page (Admin uniquement)
     */
    @Transactional
    public void deletePage(Long id) {
        if (!infoPageRepository.existsById(id)) {
            throw new RessourceNotFoundException("Page non trouvée avec l'id : " + id);
        }
        infoPageRepository.deleteById(id);
    }

    /**
     * Convertit une entité InfoPage en DTO
     */
    private InfoPageDto convertToDto(InfoPage infoPage) {
        InfoPageDto dto = new InfoPageDto();
        dto.setId(infoPage.getId());
        dto.setTitle(infoPage.getTitle());
        dto.setSlug(infoPage.getSlug());
        dto.setContent(infoPage.getContent());
        dto.setPublished(infoPage.isPublished());
        dto.setCreatedAt(infoPage.getCreatedAt());
        dto.setUpdatedAt(infoPage.getUpdatedAt());

        if (infoPage.getMenu() != null) {
            dto.setMenuId(infoPage.getMenu().getId());
        }

        return dto;
    }
 
    
}

package com.cesizen.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cesizen.backend.exception.DuplicateResourceException;
import com.cesizen.backend.exception.RessourceNotFoundException;
import com.cesizen.backend.model.dto.MenuDto;
import com.cesizen.backend.model.entity.Menu;
import com.cesizen.backend.repository.MenuRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuRepository menuRepository;

    /**
     * Récupérer tous les menus ordonnés
     */
    public List<MenuDto> getAllMenus() {
        return menuRepository.findByOrderByOrderAsc().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Récupérer un menu par son ID
     */
    public MenuDto getMenuById(Long id) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Menu non trouvé avec l'id : " + id));
        return convertToDto(menu);
    }

    /**
     * Créer un nouveau menu (Admin)
     */
    @Transactional
    public MenuDto createMenu(MenuDto dto) {
        // Vérifier que le slug n'existe pas déjà
        if (menuRepository.findAll().stream().anyMatch(m -> m.getSlug().equals(dto.getSlug()))) {
            throw new DuplicateResourceException("Un menu avec ce slug existe déjà : " + dto.getSlug());
        }

        Menu menu = new Menu();
        menu.setTitle(dto.getTitle());
        menu.setSlug(dto.getSlug());
        menu.setOrder(dto.getOrder() != null ? dto.getOrder() : 0);

        // Associer le parent si fourni
        if (dto.getParentId() != null) {
            Menu parent = menuRepository.findById(dto.getParentId())
                    .orElseThrow(() -> new RessourceNotFoundException("Menu parent non trouvé avec l'id : " + dto.getParentId()));
            menu.setParent(parent);
        }

        Menu savedMenu = menuRepository.save(menu);
        return convertToDto(savedMenu);
    }

    /**
     * Mettre à jour un menu (Admin)
     */
    @Transactional
    public MenuDto updateMenu(Long id, MenuDto dto) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Menu non trouvé avec l'id : " + id));

        // Vérifier que le nouveau slug n'est pas utilisé par un autre menu
        if (!menu.getSlug().equals(dto.getSlug())) {
            if (menuRepository.findAll().stream().anyMatch(m -> m.getSlug().equals(dto.getSlug()) && !m.getId().equals(id))) {
                throw new DuplicateResourceException("Ce slug est déjà utilisé par un autre menu");
            }
        }

        menu.setTitle(dto.getTitle());
        menu.setSlug(dto.getSlug());
        menu.setOrder(dto.getOrder());

        // Mettre à jour le parent
        if (dto.getParentId() != null) {
            // Éviter les références circulaires
            if (dto.getParentId().equals(id)) {
                throw new IllegalArgumentException("Un menu ne peut pas être son propre parent");
            }
            Menu parent = menuRepository.findById(dto.getParentId())
                    .orElseThrow(() -> new RessourceNotFoundException("Menu parent non trouvé avec l'id : " + dto.getParentId()));
            menu.setParent(parent);
        } else {
            menu.setParent(null);
        }

        Menu updatedMenu = menuRepository.save(menu);
        return convertToDto(updatedMenu);
    }

    /**
     * Supprimer un menu (Admin)
     */
    @Transactional
    public void deleteMenu(Long id) {
        if (!menuRepository.existsById(id)) {
            throw new RessourceNotFoundException("Menu non trouvé avec l'id : " + id);
        }
        menuRepository.deleteById(id);
    }

    /**
     * Convertir Menu en MenuDto
     */
    private MenuDto convertToDto(Menu menu) {
        return MenuDto.builder()
                .id(menu.getId())
                .title(menu.getTitle())
                .slug(menu.getSlug())
                .order(menu.getOrder())
                .parentId(menu.getParent() != null ? menu.getParent().getId() : null)
                .build();
    }
}

package com.cesizen.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cesizen.backend.model.entity.InfoPage;
import java.util.List;

@Repository
public interface InfoPageRepository extends JpaRepository<InfoPage, Long> {
    List<InfoPage> findBySlug(String slug);
    List<InfoPage> findByPublished(boolean published);
}

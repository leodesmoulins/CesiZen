package com.cesizen.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cesizen.backend.model.entity.DiagnosticConfig;

@Repository
public interface DiagnosticConfigRepository extends JpaRepository<DiagnosticConfig, Long> {
    
}

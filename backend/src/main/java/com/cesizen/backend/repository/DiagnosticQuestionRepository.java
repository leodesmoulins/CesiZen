package com.cesizen.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cesizen.backend.model.entity.DiagnosticQuestion;

@Repository
public interface DiagnosticQuestionRepository extends JpaRepository<DiagnosticQuestion, Long> {
    List<DiagnosticQuestion> findByIsActiveTrueOrderByOrderAsc();
}

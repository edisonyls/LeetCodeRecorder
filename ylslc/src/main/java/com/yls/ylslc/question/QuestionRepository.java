package com.yls.ylslc.question;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository
        extends JpaRepository<QuestionEntity, Long> {

    // SELECT * FROM question WHERE number = ?
    List<QuestionEntity> findQuestionEntitiesByUsername(String username);
}

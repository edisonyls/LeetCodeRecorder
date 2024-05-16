package com.yls.ylslc.question;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

// @Service and @Component is the same, but we want to specify that
// this is a service component
public interface QuestionService {

    Page<QuestionEntity> getQuestionsByUser(Pageable pageable, Sort sort);

    QuestionEntity createQuestion(QuestionEntity questionEntity);

    Optional<QuestionEntity> findOne(UUID id, String username);

    void delete(UUID id);

    boolean isExist(UUID id);

    QuestionEntity partialUpdate(UUID id, QuestionEntity questionEntity);

    byte[] getImage(Integer questionNumber, String imageId);

    void deleteImage(Integer questionNumber, String imageId);

    QuestionEntity getQuestionById(UUID id);

    QuestionEntity updateStar(UUID id);

    Page<QuestionEntity> searchQuestions(String searchQuery, Pageable pageable);

    public List<Map<String, Object>> getDifficultyDistributionForUser(UUID userId);

    long countQuestion(UUID userId);

}

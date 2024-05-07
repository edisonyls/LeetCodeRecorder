package com.yls.ylslc.question;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

// @Service and @Component is the same, but we want to specify that
// this is a service component
public interface QuestionService {

    List<QuestionEntity> getQuestions();

    List<QuestionEntity> getQuestionsByUser();

    QuestionEntity createQuestion(QuestionEntity questionEntity);

    Optional<QuestionEntity> findOne(UUID id, String username);

    void delete(UUID id);

    boolean isExist(UUID id);

    QuestionEntity partialUpdate(UUID id, QuestionEntity questionEntity);

    byte[] getImage(Integer questionNumber, String imageId);

    QuestionEntity getQuestionById(UUID id);

    long countQuestion();
}

package com.yls.ylslc.question;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

// @Service and @Component is the same, but we want to specify that
// this is a service component
public interface QuestionService {

    List<QuestionEntity> getQuestions();

    List<QuestionEntity> getQuestionsByUser();

    QuestionEntity createQuestion(QuestionEntity questionEntity);

    Optional<QuestionEntity> findOne(Long id, String username);

    void delete(Long id);

    boolean isExist(Long id);

    QuestionEntity partialUpdate(Long id, QuestionEntity questionEntity);


    void uploadQuestionImage(Long id, MultipartFile file);

    byte[] getQuestionImage(Long id);

    QuestionEntity getQuestionById(Long id);
}

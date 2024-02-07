package com.yls.ylslc.question;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

// @Service and @Component is the same, but we want to specify that
// this is a service component
public interface QuestionService {

    List<QuestionEntity> getQuestions();

    QuestionEntity createQuestion(QuestionEntity questionEntity);

    Optional<QuestionEntity> findOne(Long id);

    void delete(Long id);

    boolean isExist(Long id);

    public QuestionEntity partialUpdate(Long id, QuestionEntity questionEntity);
}

package com.yls.ylslc.question;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

// @Service and @Component is the same, but we want to specify that
// this is a service component
@Service
public class QuestionService {
    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository theQuestionRepository){
        this.questionRepository = theQuestionRepository;
    }
    public List<QuestionEntity> getQuestions(){
        return new ArrayList<>(questionRepository.findAll());
    }

    public QuestionEntity createQuestion(QuestionEntity questionEntity) {
        return questionRepository.save(questionEntity);
    }

    public Optional<QuestionEntity> findOne(Long id) {
        return questionRepository.findById(id);
    }
}

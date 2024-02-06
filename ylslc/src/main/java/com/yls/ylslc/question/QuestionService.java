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

    public void delete(Long id) {
        questionRepository.deleteById(id);
    }

    public boolean isExist(Long id) {
        return questionRepository.existsById(id);
    }

    public QuestionEntity partialUpdate(Long id, QuestionEntity questionEntity) {
        questionEntity.setId(id);
        return questionRepository.findById(id).map(existingQuestion -> {
            Optional.ofNullable(questionEntity.getNumber()).ifPresent(existingQuestion::setNumber);
            Optional.ofNullable(questionEntity.getTitle()).ifPresent(existingQuestion::setTitle);
            Optional.ofNullable(questionEntity.getDifficulty()).ifPresent(existingQuestion::setDifficulty);
            Optional.ofNullable(questionEntity.getDateOfCompletion()).ifPresent(existingQuestion::setDateOfCompletion);
            Optional.ofNullable(questionEntity.getSuccess()).ifPresent(existingQuestion::setSuccess);
            Optional.ofNullable(questionEntity.getAttempts()).ifPresent(existingQuestion::setAttempts);
            Optional.ofNullable(questionEntity.getTimeOfCompletion()).ifPresent(existingQuestion::setTimeOfCompletion);
            Optional.ofNullable(questionEntity.getThinkingProcess()).ifPresent(existingQuestion::setThinkingProcess);
            return questionRepository.save(existingQuestion);
        }).orElseThrow(() -> new RuntimeException("Question update failed"));
    }
}

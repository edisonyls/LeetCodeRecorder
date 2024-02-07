package com.yls.ylslc.question;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService{
    private final QuestionRepository questionRepository;

    public QuestionServiceImpl(QuestionRepository theQuestionRepository){
        this.questionRepository = theQuestionRepository;
    }

    @Override
    public List<QuestionEntity> getQuestions(){
        return new ArrayList<>(questionRepository.findAll());
    }

    @Override
    public QuestionEntity createQuestion(QuestionEntity questionEntity) {
        return questionRepository.save(questionEntity);
    }

    @Override
    public Optional<QuestionEntity> findOne(Long id) {
        return questionRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        questionRepository.deleteById(id);
    }

    @Override
    public boolean isExist(Long id) {
        return questionRepository.existsById(id);
    }

    @Override
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

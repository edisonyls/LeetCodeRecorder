package com.yls.ylslc.question;

import com.yls.ylslc.user.UserEntity;
import com.yls.ylslc.user.UserRepository;
import com.yls.ylslc.user.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository questionRepository;
    private final UserService userService;

    public QuestionServiceImpl(QuestionRepository theQuestionRepository, UserService theUserService){
        this.questionRepository = theQuestionRepository;
        this.userService = theUserService;
    }

    @Override
    public List<QuestionEntity> getQuestions(){
        return new ArrayList<>(questionRepository.findAll());
    }

    @Override
    public List<QuestionEntity> getQuestionsByUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<UserEntity> currentUser = userService.findOneByUsername(username);
        return currentUser
                .map(questionRepository::findByUser)
                .orElse(Collections.emptyList());
    }


    @Override
    public QuestionEntity createQuestion(QuestionEntity questionEntity) {
        UserEntity userEntity = userService.getCurrentUser();
        questionEntity.setUser(userEntity);
        return questionRepository.save(questionEntity);
    }

    @Override
    public Optional<QuestionEntity> findOne(Long id, String username) {
        return questionRepository.findByIdAndUsername(id, username);
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

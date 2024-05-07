package com.yls.ylslc.question;

import com.yls.ylslc.config.s3.S3Buckets;
import com.yls.ylslc.config.s3.S3Service;
import com.yls.ylslc.user.UserEntity;
import com.yls.ylslc.user.UserRepository;
import com.yls.ylslc.user.UserService;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository questionRepository;
    private final UserService userService;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;

    public QuestionServiceImpl(QuestionRepository theQuestionRepository,
                               UserService theUserService,
                               S3Service s3Service, S3Buckets s3Buckets){
        this.questionRepository = theQuestionRepository;
        this.userService = theUserService;
        this.s3Service = s3Service;
        this.s3Buckets = s3Buckets;
    }

    @Override
    public List<QuestionEntity> getQuestions(){
        List<QuestionEntity> questions = questionRepository.findAll();
        questions.sort(Comparator.comparing(QuestionEntity::getCreatedAt).reversed());
        return questions;
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
    public Optional<QuestionEntity> findOne(UUID id, String username) {
        return questionRepository.findByIdAndUsername(id, username);
    }

    @Override
    public void delete(UUID id) {
        questionRepository.deleteById(id);
    }

    @Override
    public boolean isExist(UUID id) {
        return questionRepository.existsById(id);
    }

    @Override
    public QuestionEntity partialUpdate(UUID id, QuestionEntity questionEntity) {
        questionEntity.setId(id);
        return questionRepository.findById(id).map(existingQuestion -> {
            Optional.ofNullable(questionEntity.getNumber()).ifPresent(existingQuestion::setNumber);
            Optional.ofNullable(questionEntity.getTitle()).ifPresent(existingQuestion::setTitle);
            Optional.ofNullable(questionEntity.getDifficulty()).ifPresent(existingQuestion::setDifficulty);
            Optional.ofNullable(questionEntity.getDateOfCompletion()).ifPresent(existingQuestion::setDateOfCompletion);
            Optional.ofNullable(questionEntity.getSuccess()).ifPresent(existingQuestion::setSuccess);
            Optional.ofNullable(questionEntity.getAttempts()).ifPresent(existingQuestion::setAttempts);
            Optional.ofNullable(questionEntity.getTimeOfCompletion()).ifPresent(existingQuestion::setTimeOfCompletion);
            return questionRepository.save(existingQuestion);
        }).orElseThrow(() -> new RuntimeException("Question update failed"));
    }

    @Override
    public byte[] getImage(Integer questionNumber, String imageId) {
        String username = userService.getCurrentUser().getUsername();
        return s3Service.getObject(
                s3Buckets.getStorageLocation(),
                "ylslc-question-images/%s/%d/%s".formatted(username, questionNumber, imageId)
        );
    }


    @Override
    public QuestionEntity getQuestionById(UUID id) {
            // Fetch the question entity by ID
            return questionRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));
    }

    @Override
    public QuestionEntity updateStar(UUID id) {
        return questionRepository.findById(id).map(question -> {
            Boolean currentStar = question.getStar();
            if (currentStar == null) {
                question.setStar(true);  // Set to true if currently null
            } else {
                question.setStar(!currentStar);  // Toggle between true and false
            }
            return questionRepository.save(question);
        }).orElseThrow(() -> new RuntimeException("Question not found"));
    }



    @Override
    public long countQuestion() {
        return questionRepository.count();
    }


}

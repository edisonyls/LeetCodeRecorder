package com.yls.ylslc.question;

import com.yls.ylslc.config.s3.S3Buckets;
import com.yls.ylslc.config.s3.S3Service;
import com.yls.ylslc.question.solution.SolutionService;
import com.yls.ylslc.user.UserEntity;
import com.yls.ylslc.user.UserRepository;
import com.yls.ylslc.user.UserService;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    private final SolutionService solutionService;

    public QuestionServiceImpl(QuestionRepository theQuestionRepository,
                               UserService theUserService,
                               S3Service s3Service, S3Buckets s3Buckets, SolutionService solutionService){
        this.questionRepository = theQuestionRepository;
        this.userService = theUserService;
        this.s3Service = s3Service;
        this.s3Buckets = s3Buckets;
        this.solutionService = solutionService;
    }

    public Page<QuestionEntity> searchQuestions(String searchQuery, Pageable pageable) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<UserEntity> currentUser = userService.findOneByUsername(username);
        return currentUser
                .map(user -> questionRepository.searchByTitleOrNumber(user, searchQuery, pageable))
                .orElse(Page.empty());
    }

    @Override
    public Page<QuestionEntity> getQuestionsByUser(Pageable pageable, Sort sort) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<UserEntity> currentUser = userService.findOneByUsername(username);
        return currentUser
                .map(user -> questionRepository.findByUser(user, PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort)))
                .orElse(Page.empty());
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
        // delete bucket if exist
        String username = userService.getCurrentUser().getUsername();
        QuestionEntity question = questionRepository.findById(id) .orElseThrow(()
                -> new RuntimeException("Question not found with id: " + id));
        s3Service.deleteObjectsInFolder(
                s3Buckets.getStorageLocation(),
                "ylslc-question-images/%s/%d".formatted(username, question.getNumber())
        );
        questionRepository.deleteById(id);
    }

    @Override
    public boolean isExist(UUID id) {
        return questionRepository.existsById(id);
    }

    @Override
    @Transactional
    public QuestionEntity partialUpdate(UUID id, QuestionEntity questionEntity) {
        return questionRepository.findById(id).map(existingQuestion -> {
            Optional.ofNullable(questionEntity.getNumber()).ifPresent(existingQuestion::setNumber);
            Optional.ofNullable(questionEntity.getTitle()).ifPresent(existingQuestion::setTitle);
            Optional.ofNullable(questionEntity.getDifficulty()).ifPresent(existingQuestion::setDifficulty);
            Optional.ofNullable(questionEntity.getDateOfCompletion()).ifPresent(existingQuestion::setDateOfCompletion);
            Optional.ofNullable(questionEntity.getSuccess()).ifPresent(existingQuestion::setSuccess);
            Optional.ofNullable(questionEntity.getAttempts()).ifPresent(existingQuestion::setAttempts);
            Optional.ofNullable(questionEntity.getTimeOfCompletion()).ifPresent(existingQuestion::setTimeOfCompletion);
            Optional.ofNullable(questionEntity.getStar()).ifPresent(existingQuestion::setStar);
            Optional.ofNullable(questionEntity.getReasonOfFail()).ifPresent(existingQuestion::setReasonOfFail);
            solutionService.updateSolutions(existingQuestion, questionEntity.getSolutions());
            return questionRepository.save(existingQuestion);
        }).orElseThrow(() -> new RuntimeException("Question not found"));
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
    public void deleteImage(Integer questionNumber, String imageId){
        String username = userService.getCurrentUser().getUsername();
        s3Service.deleteObject(
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

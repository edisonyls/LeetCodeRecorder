package com.yls.ylslc.question;

import com.yls.ylslc.config.s3.S3Buckets;
import com.yls.ylslc.config.s3.S3Service;
import com.yls.ylslc.user.UserEntity;
import com.yls.ylslc.user.UserRepository;
import com.yls.ylslc.user.UserService;
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

    @Override
    public void uploadQuestionImage(Long id, MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        String fileExtension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String questionImageId = UUID.randomUUID().toString() + fileExtension;
        String contentType = file.getContentType() != null ? file.getContentType() : "application/octet-stream";

        try {
            s3Service.putObject(
                    s3Buckets.getCustomer(),
                    String.format("question-images/%s/%s", id, questionImageId),
                    file.getBytes(),
                    contentType // Pass the content type here
            );
            QuestionEntity questionEntity = questionRepository.findById(id).orElseThrow(() -> new RuntimeException("Question not found"));
            questionEntity.setQuestionImageId(questionImageId);
            questionRepository.save(questionEntity);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public byte[] getQuestionImage(Long id) {
        // TODO: Check if questionImageId is empty or null
        QuestionEntity questionEntity = questionRepository.findById(id).orElseThrow(() -> new RuntimeException("Question not found"));
        String questionImageId = questionEntity.getQuestionImageId();
        if (questionImageId == null || questionImageId.isEmpty()) {
            throw new RuntimeException("Image not found");
        }

        return s3Service.getObject(
                s3Buckets.getCustomer(),
                "question-images/%s/%s".formatted(id, questionImageId)
        );
    }

    @Override
    public QuestionEntity getQuestionById(Long id) {
            // Fetch the question entity by ID
            return questionRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));
    }

}

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
            Optional.ofNullable(questionEntity.getThinkingProcess()).ifPresent(existingQuestion::setThinkingProcess);
            return questionRepository.save(existingQuestion);
        }).orElseThrow(() -> new RuntimeException("Question update failed"));
    }


    @Override
    @Transactional
    public void uploadQuestionImage(QuestionEntity questionEntity, MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        String fileExtension = "";

        // get the suffix of the file
        if (originalFilename != null && originalFilename.contains(".")) {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String questionImageId = UUID.randomUUID() + fileExtension;

        // Determines the content type (MIME type) of the file. If the content type is available, it uses that;
        // otherwise, it defaults to "application/octet-stream", a generic binary stream.
        String contentType = file.getContentType() != null ? file.getContentType() : "application/octet-stream";

        String username = userService.getCurrentUser().getUsername();

        // saving the image to s3
        try {
            s3Service.putObject(
                    s3Buckets.getStorageLocation(),
                    String.format("question-images/%s/%s/%s", username, questionEntity.getNumber(), questionImageId),
                    file.getBytes(),
                    contentType // Pass the content type here
            );

            // find the uploaded question and attach the image to the question
            QuestionEntity newQuestionEntity = questionRepository.findById(questionEntity.getId())
                    .orElseThrow(() -> new RuntimeException("Question not found"));
            newQuestionEntity.setQuestionImageId(questionImageId);
            questionRepository.save(newQuestionEntity);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public byte[] getQuestionImage(QuestionEntity questionEntity) {
        String questionImageId = questionEntity.getQuestionImageId();
        String username = userService.getCurrentUser().getUsername();

        if (questionImageId == null || questionImageId.isEmpty()) {
            throw new RuntimeException("Image not found");
        }
        return s3Service.getObject(
                s3Buckets.getStorageLocation(),
                "question-images/%s/%s/%s".formatted(username, questionEntity.getNumber(), questionImageId)
        );
    }

    @Override
    public QuestionEntity getQuestionById(UUID id) {
            // Fetch the question entity by ID
            return questionRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));
    }

}

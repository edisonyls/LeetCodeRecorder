package com.yls.ylslc.question.solution;

import com.yls.ylslc.config.response.Response;
import com.yls.ylslc.config.s3.S3Buckets;
import com.yls.ylslc.config.s3.S3Service;
import com.yls.ylslc.question.QuestionEntity;
import com.yls.ylslc.question.QuestionService;
import com.yls.ylslc.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class SolutionServiceImpl implements SolutionService{
    private SolutionRepository solutionRepository;
    private QuestionService questionService;
    private UserService userService;
    private S3Service s3Service;
    private S3Buckets s3Buckets;

    public SolutionServiceImpl(SolutionRepository solutionRepository, QuestionService questionService, UserService userService, S3Service s3Service, S3Buckets s3Buckets) {
        this.solutionRepository = solutionRepository;
        this.questionService = questionService;
        this.userService = userService;
        this.s3Service = s3Service;
        this.s3Buckets = s3Buckets;
    }

    @Override
    public String uploadImages(MultipartFile image, String questionNumber) {
        String originalImageName = image.getOriginalFilename();
        String fileExtension = "";

        if (originalImageName != null && originalImageName.contains(".")) {
            fileExtension = originalImageName.substring(originalImageName.lastIndexOf("."));
        }
        String imageId = UUID.randomUUID() + fileExtension;

        // Determines the content type (MIME type) of the file. If the content type is available, it uses that;
        // otherwise, it defaults to "application/octet-stream", a generic binary stream.
        String contentType = image.getContentType() != null ? image.getContentType() : "application/octet-stream";

        String username = userService.getCurrentUser().getUsername();

        try {
            s3Service.putObject(
                    s3Buckets.getStorageLocation(),
                    String.format("question-images/%s/%s/%s", username, questionNumber, imageId),
                    image.getBytes(),
                    contentType // Pass the content type here
            );
            return imageId;
        } catch (IOException e) {
            return "FAILED";
        }
    }
}

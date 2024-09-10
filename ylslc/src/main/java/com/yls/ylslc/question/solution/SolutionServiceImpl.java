package com.yls.ylslc.question.solution;

import com.yls.ylslc.config.s3.S3Buckets;
import com.yls.ylslc.config.s3.S3Service;
import com.yls.ylslc.question.QuestionEntity;
import com.yls.ylslc.user.UserService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class SolutionServiceImpl implements SolutionService {
    private final UserService userService;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;

    public SolutionServiceImpl(UserService userService, S3Service s3Service, S3Buckets s3Buckets) {
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

        String contentType = image.getContentType() != null ? image.getContentType() : "application/octet-stream";

        String username = userService.getCurrentUser().getUsername();

        try {
            s3Service.putObject(
                    s3Buckets.getStorageLocation(),
                    String.format("ylslc-question-images/%s/%s/%s", username, questionNumber, imageId),
                    image.getBytes(),
                    contentType);
            return imageId;
        } catch (IOException e) {
            return "FAILED";
        }
    }

    @Override
    public void updateSolutions(QuestionEntity existingQuestion, List<SolutionEntity> newSolutions) {
        existingQuestion.getSolutions().removeIf(solution -> newSolutions.stream()
                .noneMatch(newSol -> newSol.getId() != null && newSol.getId().equals(solution.getId())));

        for (SolutionEntity newSolution : newSolutions) {
            if (newSolution.getId() == null) {
                // This is a new solution, just add it
                existingQuestion.addSolution(newSolution);
            } else {
                // Update existing solution
                existingQuestion.getSolutions().stream()
                        .filter(s -> s.getId().equals(newSolution.getId()))
                        .findFirst()
                        .ifPresent(existingSolution -> {
                            existingSolution.setThinkingProcess(newSolution.getThinkingProcess());
                            existingSolution.setCodeSnippet(newSolution.getCodeSnippet());
                            existingSolution.setImageId(newSolution.getImageId());
                        });
            }
        }
    }

}

package com.yls.ylslc.question.solution;

import com.yls.ylslc.question.QuestionEntity;
import com.yls.ylslc.user.UserService;

import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class SolutionServiceImpl implements SolutionService {
    private final UserService userService;

    public SolutionServiceImpl(UserService userService) {
        this.userService = userService;
    }

    public String uploadImages(MultipartFile image, String questionNumber) {
        String extension = FilenameUtils.getExtension(image.getOriginalFilename());
        String uuid = UUID.randomUUID().toString();
        String filename = uuid + "." + extension;
        String rawUsername = userService.getCurrentUser().getUsername();
        String username = rawUsername.replaceAll("[^a-zA-Z0-9_-]", "_");

        String baseDir = System.getProperty("user.home") + "/ylslc_images/solution_images";
        Path uploadDir = Paths.get(baseDir, username, questionNumber);
        try {
            Files.createDirectories(uploadDir);
            Path filePath = uploadDir.resolve(filename);
            image.transferTo(filePath.toFile());
            return filename;
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to save image", e);
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

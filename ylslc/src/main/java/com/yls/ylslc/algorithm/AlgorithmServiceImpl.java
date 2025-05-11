package com.yls.ylslc.algorithm;

import com.yls.ylslc.algorithm.section.SectionService;
import com.yls.ylslc.user.UserEntity;
import com.yls.ylslc.user.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class AlgorithmServiceImpl implements AlgorithmService {
    private final UserService userService;
    private final AlgorithmRepository algorithmRepository;
    private final SectionService sectionService;

    @Override
    public List<AlgorithmEntity> getAlgorithms() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<UserEntity> currentUser = userService.findOneByUsername(username);
        return currentUser
                .map(algorithmRepository::findByUser)
                .orElse(Collections.emptyList());
    }

    @Override
    public AlgorithmEntity getAlgorithmById(UUID id) {
        return algorithmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Algorithm not found with id: " + id));
    }

    @Override
    public AlgorithmEntity createAlgorithm(AlgorithmEntity algorithm) {
        UserEntity userEntity = userService.getCurrentUser();
        algorithm.setUser(userEntity);
        return algorithmRepository.save(algorithm);
    }

    @Override
    public String uploadImages(MultipartFile image) {
        String originalImageName = image.getOriginalFilename();
        String fileExtension = "";

        if (originalImageName != null && originalImageName.contains(".")) {
            fileExtension = originalImageName.substring(originalImageName.lastIndexOf("."));
        }
        String imageId = UUID.randomUUID() + fileExtension;
        String rawUsername = userService.getCurrentUser().getUsername();
        String username = rawUsername.replaceAll("[^a-zA-Z0-9_-]", "_");
        String baseDir = System.getProperty("user.home") + "/ylslc_images/algorithm_images";
        Path uploadDir = Paths.get(baseDir, username, imageId);
        try {
            Files.createDirectories(uploadDir);
            Path filePath = uploadDir.resolve(imageId);
            image.transferTo(filePath.toFile());
            return imageId;
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to save image", e);
        }
    }

    @Override
    public void delete(UUID id) {
        String rawUsername = userService.getCurrentUser().getUsername();
        String username = rawUsername.replaceAll("[^a-zA-Z0-9_-]", "_");

        AlgorithmEntity algorithmToDelete = algorithmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Algorithm not found with id: " + id));

        String imageId = algorithmToDelete.getImageId(); // Ensure AlgorithmEntity has getImageId()

        if (imageId != null && !imageId.isBlank()) {
            String baseDir = System.getProperty("user.home") + "/ylslc_images/algorithm_images";
            Path imagePath = Paths.get(baseDir, username, imageId, imageId);
            try {
                Files.deleteIfExists(imagePath);
                Files.deleteIfExists(imagePath.getParent());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        algorithmRepository.deleteById(id);
    }

    @Override
    public AlgorithmEntity updateAlgorithm(UUID id, AlgorithmEntity algorithm) {
        AlgorithmEntity existingAlgorithm = algorithmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Algorithm not found"));

        // Update the properties of the existing algorithm
        existingAlgorithm.setTitle(algorithm.getTitle());
        existingAlgorithm.setTag(algorithm.getTag());
        existingAlgorithm.setSummary(algorithm.getSummary());

        sectionService.updateSections(existingAlgorithm, algorithm.getSections());

        // Save the updated algorithm
        return algorithmRepository.save(existingAlgorithm);
    }

    @Override
    public void deleteImage(String algorithmId, String imageId) {
        if (imageId == null || imageId.equals("undefined") || imageId.isBlank()) {
            throw new IllegalArgumentException("Invalid imageId provided");
        }

        String rawUsername = userService.getCurrentUser().getUsername();
        String username = rawUsername.replaceAll("[^a-zA-Z0-9_-]", "_");
        String baseDir = System.getProperty("user.home") + "/ylslc_images/algorithm_images";
        Path imagePath = Paths.get(baseDir, username, imageId, imageId);

        try {
            Files.deleteIfExists(imagePath);
            // Optional: delete parent folder if empty
            Files.deleteIfExists(imagePath.getParent());
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to delete image file", e);
        }
    }


    @Override
    public Long countAlgorithm(UUID userId) {
        return algorithmRepository.countAlgorithmByUserId(userId);
    }

    @Override
    public byte[] getImage(String imageId) {
        if (imageId == null || imageId.equals("undefined") || imageId.isBlank()) {
            throw new IllegalArgumentException("Invalid imageId provided");
        }

        String rawUsername = userService.getCurrentUser().getUsername();
        String username = rawUsername.replaceAll("[^a-zA-Z0-9_-]", "_");
        String baseDir = System.getProperty("user.home") + "/ylslc_images/algorithm_images";
        Path imagePath = Paths.get(baseDir, username, imageId, imageId);

        try {
            return Files.readAllBytes(imagePath);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to read image file", e);
        }
    }

    public AlgorithmServiceImpl(UserService userService, AlgorithmRepository algorithmRepository, SectionService sectionService) {
        this.userService = userService;
        this.algorithmRepository = algorithmRepository;
        this.sectionService = sectionService;
    }
}

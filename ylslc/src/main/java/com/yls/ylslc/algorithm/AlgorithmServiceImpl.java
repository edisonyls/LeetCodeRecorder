package com.yls.ylslc.algorithm;

import com.yls.ylslc.algorithm.section.SectionService;
import com.yls.ylslc.config.s3.S3Buckets;
import com.yls.ylslc.config.s3.S3Service;
import com.yls.ylslc.user.UserEntity;
import com.yls.ylslc.user.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class AlgorithmServiceImpl implements AlgorithmService {
    private final UserService userService;
    private final AlgorithmRepository algorithmRepository;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;
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

        // Determines the content type (MIME type) of the file. If the content type is
        // available, it uses that;
        // otherwise, it defaults to "application/octet-stream", a generic binary
        // stream.
        String contentType = image.getContentType() != null ? image.getContentType() : "application/octet-stream";

        String username = userService.getCurrentUser().getUsername();

        try {
            s3Service.putObject(
                    s3Buckets.getStorageLocation(),
                    String.format("ylslc-algorithm-images/%s/%s", username, imageId),
                    image.getBytes(),
                    contentType // Pass the content type here
            );
            return imageId;
        } catch (IOException e) {
            return "FAILED";
        }
    }

    @Override
    public void delete(UUID id) {
        String username = userService.getCurrentUser().getUsername();
        AlgorithmEntity algorithmToDelete = algorithmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Algorithm not found with id: " + id));
        s3Service.deleteObjectsInFolder(
                s3Buckets.getStorageLocation(),
                "ylslc-algorithm-images/%s/%s".formatted(username, algorithmToDelete.getImageId()));
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
        String username = userService.getCurrentUser().getUsername();
        s3Service.deleteObject(
                s3Buckets.getStorageLocation(),
                "ylslc-question-images/%s/%s".formatted(username, imageId));
    }

    @Override
    public Long countAlgorithm(UUID userId) {
        return algorithmRepository.countAlgorithmByUserId(userId);
    }

    @Override
    public byte[] getImage(String imageId) {
        String username = userService.getCurrentUser().getUsername();
        return s3Service.getObject(
                s3Buckets.getStorageLocation(),
                "ylslc-algorithm-images/%s/%s".formatted(username, imageId));
    }

    public AlgorithmServiceImpl(UserService userService, AlgorithmRepository algorithmRepository, S3Service s3Service,
            S3Buckets s3Buckets, SectionService sectionService) {
        this.userService = userService;
        this.algorithmRepository = algorithmRepository;
        this.s3Service = s3Service;
        this.s3Buckets = s3Buckets;
        this.sectionService = sectionService;
    }
}

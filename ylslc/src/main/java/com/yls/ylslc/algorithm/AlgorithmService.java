package com.yls.ylslc.algorithm;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface AlgorithmService {
    List<AlgorithmEntity> getAlgorithms();

    AlgorithmEntity getAlgorithmById(UUID id);

    AlgorithmEntity createAlgorithm(AlgorithmEntity algorithm);

    String uploadImages(MultipartFile image, String algorithmId);

    void delete(UUID id);

    AlgorithmEntity updateAlgorithm(UUID id, AlgorithmEntity algorithmEntity);

    void deleteImage(String algorithmId, String imageId);

    byte[] getImage(String algorithmId, String imageId);

}

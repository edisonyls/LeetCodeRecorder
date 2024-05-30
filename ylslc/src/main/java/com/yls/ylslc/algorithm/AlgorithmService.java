package com.yls.ylslc.algorithm;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface AlgorithmService {
    List<AlgorithmEntity> getAlgorithms();
    AlgorithmEntity createAlgorithm(AlgorithmEntity algorithm);

    String uploadImages(MultipartFile image, String algorithmName);

    void delete(UUID id);

    AlgorithmEntity updateAlgorithm(UUID id, AlgorithmEntity algorithmEntity);
}

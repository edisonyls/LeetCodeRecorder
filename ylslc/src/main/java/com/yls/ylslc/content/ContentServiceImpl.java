package com.yls.ylslc.content;

import com.yls.ylslc.config.s3.S3Buckets;
import com.yls.ylslc.config.s3.S3Service;
import com.yls.ylslc.sub_structure.SubStructureEntity;
import com.yls.ylslc.sub_structure.SubStructureRepository;
import com.yls.ylslc.user.UserService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ContentServiceImpl implements ContentService{
    private final ContentRepository contentRepository;
    private final SubStructureRepository subStructureRepository;
    private S3Service s3Service;
    private S3Buckets s3Buckets;
    private UserService userService;

    public ContentServiceImpl(ContentRepository contentRepository, SubStructureRepository subStructureRepository, S3Service s3Service, S3Buckets s3Buckets, UserService userService) {
        this.contentRepository = contentRepository;
        this.subStructureRepository = subStructureRepository;
        this.s3Service = s3Service;
        this.s3Buckets = s3Buckets;
        this.userService = userService;
    }

    @Override
    public List<ContentEntity> createMultipleContent(UUID subStructureEntityId, List<ContentEntity> contentEntities) {
        SubStructureEntity subStructureEntity = subStructureRepository.findById(subStructureEntityId)
                .orElseThrow(() -> new IllegalStateException("SubStructureEntity not found"));

        // Associate each content with the sub-structure
        contentEntities.forEach(contentEntity -> {
            contentEntity.setSubStructure(subStructureEntity);
            subStructureEntity.addContent(contentEntity);
        });

        // Save all content entities
        return contentRepository.saveAll(contentEntities);
    }

    @Override
    public ContentEntity createContent(UUID subStructureEntityId, ContentEntity contentEntity) {
        SubStructureEntity subStructureEntity = subStructureRepository.findById(subStructureEntityId)
                .orElseThrow(() -> new IllegalStateException("SubStructureEntity not found"));
        contentEntity.setSubStructure(subStructureEntity);
        subStructureEntity.addContent(contentEntity);
        return contentRepository.save(contentEntity);
    }

    @Override
    public List<ContentEntity> getContents(UUID subStructureId) {
        SubStructureEntity subStructureEntity = subStructureRepository.findById(subStructureId)
                .orElseThrow(() -> new IllegalStateException("SubStructureEntity not found"));
        return contentRepository.findBySubStructure(subStructureEntity);

    }

    @Override
    public String uploadImages(MultipartFile image, UUID subStructureId) {
        return null;
    }



}

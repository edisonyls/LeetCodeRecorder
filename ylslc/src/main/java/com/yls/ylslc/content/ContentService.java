package com.yls.ylslc.content;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface ContentService {
    List<ContentEntity> createMultipleContent(UUID subStructureEntityId, List<ContentEntity> contentEntities);
    String uploadImages(MultipartFile image, UUID subStructureId);

    ContentEntity createContent(UUID subStructureEntityId, ContentEntity contentEntity);

    List<ContentEntity> getContents(UUID subStructureId);
}

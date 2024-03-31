package com.yls.ylslc.content;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface ContentService {
    String uploadImages(MultipartFile image, String subStructureName);

    ContentEntity createContent(UUID subStructureEntityId, ContentEntity contentEntity);

    List<ContentEntity> getContents(UUID subStructureId);

    byte[] getImage(String subStructureName, String imageId);
}

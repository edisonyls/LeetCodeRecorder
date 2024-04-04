package com.yls.ylslc.sub_structure;

import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface SubStructureService {
    SubStructureEntity createSubstructure(UUID dataStructureEntityId, SubStructureEntity subStructureEntity);

    boolean isExist(UUID id);

    SubStructureEntity updateName(UUID id, String name);

    SubStructureEntity delete(UUID id);

    byte[] getImage(String subStructureId, String imageId);

    String uploadImages(MultipartFile image, String subStructureId);


    SubStructureEntity updateContent(UUID id, String content);

    Boolean deleteImage(String subStructureId, String imageId);
}

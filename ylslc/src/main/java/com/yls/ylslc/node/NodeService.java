package com.yls.ylslc.node;

import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface NodeService {
    NodeEntity createNode(UUID dataStructureEntityId, NodeEntity nodeEntity);

    boolean isExist(Long id);

    NodeEntity updateName(Long id, String name);

    NodeEntity delete(Long id);

    byte[] getImage(String nodeId, String imageId);

    String uploadImages(MultipartFile image, String nodeId);


    NodeEntity updateContent(Long id, String content);

    Boolean deleteImage(String nodeId, String imageId);
}

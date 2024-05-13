package com.yls.ylslc.node;

import com.yls.ylslc.config.s3.S3Buckets;
import com.yls.ylslc.config.s3.S3Service;
import com.yls.ylslc.data_structure.DataStructureEntity;
import com.yls.ylslc.data_structure.DataStructureRepository;
import com.yls.ylslc.user.UserService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.util.UUID;

@Service
public class NodeServiceImpl implements NodeService {
    private final NodeRepository nodeRepository;
    private final DataStructureRepository dataStructureRepository;
    private final UserService userService;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;

    @Override
    public NodeEntity createNode(UUID dataStructureEntityId, NodeEntity nodeEntity) {
        DataStructureEntity dataStructureEntity = dataStructureRepository.findById(dataStructureEntityId)
                .orElseThrow(() -> new IllegalStateException("DataStructureEntity not found"));
        nodeEntity.setDataStructure(dataStructureEntity);
        return nodeRepository.save(nodeEntity);
    }

    @Override
    public boolean isExist(Long id) {
        return nodeRepository.existsById(id);
    }

    @Override
    public NodeEntity updateName(Long id, String name) {
        NodeEntity nodeEntity = nodeRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Node not found!"));
        nodeEntity.setName(name);
        return nodeRepository.save(nodeEntity);
    }

    @Override
    public NodeEntity updateContent(Long id, String content) {
        NodeEntity nodeEntity = nodeRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Node not found!"));
        nodeEntity.setContent(content);
        return nodeRepository.save(nodeEntity);
    }

    @Override
    @Transactional
    public NodeEntity delete(Long id) {
        NodeEntity nodeEntity = nodeRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Node not found!"));
        // Example of removing a NodeEntity from its parent
        DataStructureEntity parent = nodeEntity.getDataStructure();
        parent.getNodes().remove(nodeEntity);
        dataStructureRepository.save(parent);
        nodeRepository.delete(nodeEntity);
        return nodeEntity;
    }

    @Override
    public byte[] getImage(String nodeId, String imageId) {
        String username = userService.getCurrentUser().getUsername();
        return s3Service.getObject(
                s3Buckets.getStorageLocation(),
                "content-images/%s/%s/%s".formatted(username, nodeId, imageId));
    }

    @Override
    public Boolean deleteImage(String nodeId, String imageId) {
        String username = userService.getCurrentUser().getUsername();
        String key = String.format("content-images/%s/%s/%s", username, nodeId, imageId);
        try {
            s3Service.deleteObject(s3Buckets.getStorageLocation(), key);
            return true;
        } catch (S3Exception e) {
            return false;
        }
    }

    @Override
    public String uploadImages(MultipartFile image, String nodeId) {
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
                    String.format("content-images/%s/%s/%s", username, nodeId, imageId),
                    image.getBytes(),
                    contentType // Pass the content type here
            );
            return imageId;
        } catch (IOException e) {
            return "FAILED";
        }
    }

    public NodeServiceImpl(NodeRepository nodeRepository, DataStructureRepository dataStructureRepository,
            UserService userService, S3Service s3Service, S3Buckets s3Buckets) {
        this.nodeRepository = nodeRepository;
        this.dataStructureRepository = dataStructureRepository;
        this.userService = userService;
        this.s3Service = s3Service;
        this.s3Buckets = s3Buckets;
    }
}

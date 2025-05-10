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
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
        DataStructureEntity parent = nodeEntity.getDataStructure();
        parent.getNodes().remove(nodeEntity);
        dataStructureRepository.save(parent);
        nodeRepository.delete(nodeEntity);
        return nodeEntity;
    }

    @Override
    public byte[] getImage(String nodeId, String imageId) {
        String rawUsername = userService.getCurrentUser().getUsername();
        String username = rawUsername.replaceAll("[^a-zA-Z0-9_-]", "_");
        String baseDir = System.getProperty("user.home") + "/ylslc_images/data_structure_images";
        Path imagePath = Paths.get(baseDir, username, nodeId, imageId);

        try {
            return Files.readAllBytes(imagePath);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to read image file", e);
        }
    }

    @Override
    public Boolean deleteImage(String nodeId, String imageId) {
        String rawUsername = userService.getCurrentUser().getUsername();
        String username = rawUsername.replaceAll("[^a-zA-Z0-9_-]", "_");
        String baseDir = System.getProperty("user.home") + "/ylslc_images/data_structure_images";
        Path imagePath = Paths.get(baseDir, username, nodeId, imageId);

        try {
            return Files.deleteIfExists(imagePath);
        } catch (IOException e) {
            e.printStackTrace();
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
        String rawUsername = userService.getCurrentUser().getUsername();
        String username = rawUsername.replaceAll("[^a-zA-Z0-9_-]", "_");
        String baseDir = System.getProperty("user.home") + "/ylslc_images/data_structure_images";
        Path uploadDir = Paths.get(baseDir, username, nodeId);
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

    public NodeServiceImpl(NodeRepository nodeRepository, DataStructureRepository dataStructureRepository,
            UserService userService, S3Service s3Service, S3Buckets s3Buckets) {
        this.nodeRepository = nodeRepository;
        this.dataStructureRepository = dataStructureRepository;
        this.userService = userService;
        this.s3Service = s3Service;
        this.s3Buckets = s3Buckets;
    }
}

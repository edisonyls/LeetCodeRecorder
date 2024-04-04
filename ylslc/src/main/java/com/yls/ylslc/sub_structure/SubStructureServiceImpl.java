package com.yls.ylslc.sub_structure;

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
import java.util.Optional;
import java.util.UUID;

@Service
public class SubStructureServiceImpl implements SubStructureService{
    private final SubStructureRepository subStructureRepository;
    private final DataStructureRepository dataStructureRepository;
    private final UserService userService;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;
    @Override
    public SubStructureEntity createSubstructure(UUID dataStructureEntityId, SubStructureEntity subStructureEntity) {
        DataStructureEntity dataStructureEntity = dataStructureRepository.findById(dataStructureEntityId)
                .orElseThrow(() -> new IllegalStateException("DataStructureEntity not found"));
        subStructureEntity.setDataStructure(dataStructureEntity);
        return subStructureRepository.save(subStructureEntity);
    }

    @Override
    public boolean isExist(UUID id) {
        return subStructureRepository.existsById(id);
    }

    @Override
    public SubStructureEntity updateName(UUID id, String name) {
        SubStructureEntity subStructureEntity = subStructureRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Sub-structure not found!"));
        subStructureEntity.setName(name);
        return subStructureRepository.save(subStructureEntity);
    }

    @Override
    public SubStructureEntity updateContent(UUID id, String content) {
        SubStructureEntity subStructureEntity = subStructureRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Sub-structure not found!"));
        subStructureEntity.setContent(content);
        return subStructureRepository.save(subStructureEntity);
    }

    @Override
    @Transactional
    public SubStructureEntity delete(UUID id) {
        SubStructureEntity subStructureEntity = subStructureRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Sub-structure not found!"));
        // Example of removing a SubStructureEntity from its parent
        DataStructureEntity parent = subStructureEntity.getDataStructure();
        parent.getSubStructures().remove(subStructureEntity);
        dataStructureRepository.save(parent);
        subStructureRepository.delete(subStructureEntity);
        return subStructureEntity;
    }

    @Override
    public byte[] getImage(String subStructureId, String imageId) {
        String username = userService.getCurrentUser().getUsername();
        return s3Service.getObject(
                s3Buckets.getStorageLocation(),
                "content-images/%s/%s/%s".formatted(username,subStructureId, imageId)
        );
    }

    @Override
    public Boolean deleteImage(String subStructureId, String imageId) {
        String username = userService.getCurrentUser().getUsername();
        String key = String.format("content-images/%s/%s/%s", username, subStructureId, imageId);
        try {
            s3Service.deleteObject(s3Buckets.getStorageLocation(), key);
            return true;
        } catch (S3Exception e) {
            return false;
        }
    }

    @Override
    public String uploadImages(MultipartFile image, String subStructureId) {
        String originalImageName = image.getOriginalFilename();
        String fileExtension = "";

        if (originalImageName != null && originalImageName.contains(".")) {
            fileExtension = originalImageName.substring(originalImageName.lastIndexOf("."));
        }
        String imageId = UUID.randomUUID() + fileExtension;

        // Determines the content type (MIME type) of the file. If the content type is available, it uses that;
        // otherwise, it defaults to "application/octet-stream", a generic binary stream.
        String contentType = image.getContentType() != null ? image.getContentType() : "application/octet-stream";

        String username = userService.getCurrentUser().getUsername();

        try {
            s3Service.putObject(
                    s3Buckets.getStorageLocation(),
                    String.format("content-images/%s/%s/%s", username, subStructureId, imageId),
                    image.getBytes(),
                    contentType // Pass the content type here
            );
            return imageId;
        } catch (IOException e) {
            return "FAILED";
        }
    }

    public SubStructureServiceImpl(SubStructureRepository subStructureRepository, DataStructureRepository dataStructureRepository, UserService userService, S3Service s3Service, S3Buckets s3Buckets) {
        this.subStructureRepository = subStructureRepository;
        this.dataStructureRepository = dataStructureRepository;
        this.userService = userService;
        this.s3Service = s3Service;
        this.s3Buckets = s3Buckets;
    }
}

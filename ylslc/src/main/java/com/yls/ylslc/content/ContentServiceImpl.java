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

@Service
public class ContentServiceImpl implements ContentService {
    private final ContentRepository contentRepository;
    private final SubStructureRepository subStructureRepository;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;
    private final UserService userService;

    public ContentServiceImpl(ContentRepository contentRepository, SubStructureRepository subStructureRepository, S3Service s3Service, S3Buckets s3Buckets, UserService userService) {
        this.contentRepository = contentRepository;
        this.subStructureRepository = subStructureRepository;
        this.s3Service = s3Service;
        this.s3Buckets = s3Buckets;
        this.userService = userService;
    }


    @Override
    public String uploadImages(MultipartFile image, String subStructureName) {
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
                    String.format("content-images/%s/%s/%s", username,subStructureName, imageId),
                    image.getBytes(),
                    contentType // Pass the content type here
            );
            return imageId;
        } catch (IOException e) {
            return "FAILED";
        }
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
    public byte[] getImage(String subStructureName, String imageId) {
       String username = userService.getCurrentUser().getUsername();
       return s3Service.getObject(
               s3Buckets.getStorageLocation(),
               "content-images/%s/%s/%s".formatted(username,subStructureName, imageId)
       );
    }
}
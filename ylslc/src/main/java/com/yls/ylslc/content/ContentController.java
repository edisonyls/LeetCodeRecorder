package com.yls.ylslc.content;

import com.yls.ylslc.config.response.Response;
import com.yls.ylslc.mappers.Mapper;
import com.yls.ylslc.question.QuestionEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/content/")
@CrossOrigin(origins = {"https://ylslc.org", "http://localhost:3000"})
public class ContentController {
    private final ContentService contentService;
    private final Mapper<ContentEntity, ContentDto> contentMapper;

    @PostMapping(path = "/{id}")
    public Response createContent(@PathVariable("id") UUID subStructureId, @RequestBody ContentDto contentDto){
        ContentEntity contentEntity = contentMapper.mapFrom(contentDto);
        ContentEntity savedContentEntity = contentService.createContent(subStructureId,contentEntity);
        ContentDto savedContentDto = contentMapper.mapTo(savedContentEntity);
        return Response.ok(savedContentDto, "Content saved successfully!");
    }

    @GetMapping(path = "/{id}")
    public Response getContents(@PathVariable("id") UUID subStructureId){
        List<ContentEntity> contentEntities = contentService.getContents(subStructureId);
        List<ContentDto> contentDtos = contentEntities.stream().map(contentMapper::mapTo).toList();
        return Response.ok(contentDtos, "Content retrieved successfully!");
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, path="upload-image")
    public Response uploadImages(@RequestPart("image") MultipartFile image,
                                 @RequestPart("subStructureName") String subStructureName){
        String imageId = contentService.uploadImages(image, subStructureName);
        return Response.ok(imageId, "Image saved successfully!");
    }

    @GetMapping("image/{subStructureName}/{imageId}")
    public ResponseEntity<byte[]> getQuestionImage(@PathVariable String subStructureName, @PathVariable String imageId) {
        byte[] imageData =contentService.getImage(subStructureName, imageId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(getMediaTypeForImageId(imageId));

        return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
    }

    private MediaType getMediaTypeForImageId(String imageId) {
        if (imageId.endsWith(".png")) {
            return MediaType.IMAGE_PNG;
        } else if (imageId.endsWith(".jpg") || imageId.endsWith(".jpeg")) {
            return MediaType.IMAGE_JPEG;
        } else {
            // Default or fallback content type
            return MediaType.APPLICATION_OCTET_STREAM;
        }
    }

    public ContentController(ContentService contentService, Mapper<ContentEntity, ContentDto> contentMapper) {
        this.contentService = contentService;
        this.contentMapper = contentMapper;
    }
}

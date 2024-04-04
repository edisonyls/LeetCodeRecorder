package com.yls.ylslc.sub_structure;

import com.yls.ylslc.config.response.Response;
import com.yls.ylslc.mappers.Mapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("api/sub-structure")
@CrossOrigin(origins = {"https://ylslc.org", "http://localhost:3000"})
public class SubStructureController {
    private final SubStructureService subStructureService;
    private final Mapper<SubStructureEntity, SubStructureDto> subStructureMapper;

    @PostMapping(path = "/{id}")
    public Response createSubStructure(@PathVariable("id") UUID dataStructureId, @RequestBody SubStructureDto subStructureDto){
        SubStructureEntity subStructureEntity = subStructureMapper.mapFrom(subStructureDto);
        SubStructureEntity savedSubStructureEntity = subStructureService.createSubstructure(dataStructureId, subStructureEntity);
        SubStructureDto savedSubstructureDto = subStructureMapper.mapTo(savedSubStructureEntity);
        return Response.ok(savedSubstructureDto, "Sub structure created successfully!");
    }

    @PatchMapping(path = "/{id}")
    public Response updateSubStructureByName(@PathVariable("id") UUID id, @RequestBody Map<String, String> updateRequest){
        String name = updateRequest.get("name");
        if (!subStructureService.isExist(id)){
            return Response.failed(HttpStatus.NOT_FOUND, "Sub-structure not found!");
        }
        SubStructureEntity subStructureEntity = subStructureService.updateName(id, name);
        SubStructureDto updatedSubStructure = subStructureMapper.mapTo(subStructureEntity);
        return Response.ok(updatedSubStructure, "Name for the sub-structure is updated successfully");
    }

    @PatchMapping(path = "content/{id}")
    public Response updateSubStructureByContent(@PathVariable("id") UUID id, @RequestBody Map<String, String> updateRequest){
        String content = updateRequest.get("content");
        if (!subStructureService.isExist(id)){
            return Response.failed(HttpStatus.NOT_FOUND, "Sub-structure not found!");
        }
        SubStructureEntity subStructureEntity = subStructureService.updateContent(id, content);
        SubStructureDto updatedSubStructure = subStructureMapper.mapTo(subStructureEntity);
        return Response.ok(updatedSubStructure, "Content for sub-structure is updated successfully!");
    }


    @DeleteMapping(path = "/{id}")
    public Response deleteSubStructure(@PathVariable("id") UUID id){
        SubStructureEntity subStructureEntity = subStructureService.delete(id);
        SubStructureDto deletedSubStructure = subStructureMapper.mapTo(subStructureEntity);
        return Response.ok(deletedSubStructure, deletedSubStructure.getName() + (" deleted successfully!"));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, path="upload-image")
    public Response uploadContentImages(@RequestPart("image") MultipartFile image,
                                 @RequestPart("subStructureId") String subStructureId){
        String imageId = subStructureService.uploadImages(image, subStructureId);
        return Response.ok(imageId, "Image saved successfully!");
    }

    @GetMapping("image/{subStructureName}/{imageId}")
    public ResponseEntity<byte[]> getContentImage(@PathVariable String subStructureName, @PathVariable String imageId) {
        byte[] imageData = subStructureService.getImage(subStructureName, imageId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(getMediaTypeForImageId(imageId));

        return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
    }

    @DeleteMapping("image/{subStructureId}/{imageId}")
    public Response deleteImage(@PathVariable String subStructureId, @PathVariable String imageId){
        Boolean deleted = subStructureService.deleteImage(subStructureId, imageId);
        if (deleted) {
            return Response.ok(true, "Image deleted successfully!");
        } else {
            return Response.failed(HttpStatus.BAD_REQUEST, "Image deleted unsuccessfully!");
        }
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

    public SubStructureController(SubStructureService subStructureService, Mapper<SubStructureEntity, SubStructureDto> subStructureMapper) {
        this.subStructureService = subStructureService;
        this.subStructureMapper = subStructureMapper;
    }
}

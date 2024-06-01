package com.yls.ylslc.algorithm;

import com.yls.ylslc.config.response.Response;
import com.yls.ylslc.mappers.Mapper;
import com.yls.ylslc.question.QuestionEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path="api/algorithm")
@CrossOrigin
public class AlgorithmController {
    private final AlgorithmService algorithmService;
    private final Mapper<AlgorithmEntity, AlgorithmDto> algorithmMapper;
    @GetMapping
    public Response getAlgorithms(){
        List<AlgorithmEntity> algorithmEntities = algorithmService.getAlgorithms();
        List<AlgorithmDto> algorithmDtos = algorithmEntities.stream().map(algorithmMapper::mapTo).toList();
        return Response.ok(algorithmDtos, "Algorithm retrieved successfully!");
    }

    @PostMapping
    public Response createAlgorithm(@RequestBody AlgorithmDto algorithmDto){
        AlgorithmEntity algorithmEntity = algorithmMapper.mapFrom(algorithmDto);
        AlgorithmEntity savedAlgorithmEntity = algorithmService.createAlgorithm(algorithmEntity);
        AlgorithmDto savedAlgorithm = algorithmMapper.mapTo(savedAlgorithmEntity);
        return Response.ok(savedAlgorithm, "Algorithm created successfully!");
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, path="upload-image")
    public Response uploadImages(@RequestPart("image") MultipartFile image,
                                 @RequestPart("algorithmName") String algorithmName){
        String imageId = algorithmService.uploadImages(image, algorithmName);
        return Response.ok(imageId, "Image saved successfully!");
    }

    @DeleteMapping(path = "/{id}")
    public Response deleteAlgorithm(@PathVariable("id") UUID id){
        algorithmService.delete(id);
        return Response.ok("Algorithm deleted!");
    }

    @PutMapping("/{id}")
    public Response updateAlgorithm(@PathVariable UUID id, @RequestBody AlgorithmDto algorithmDto) {
        try {
            AlgorithmEntity algorithmEntity = algorithmMapper.mapFrom(algorithmDto);
            AlgorithmEntity updatedAlgorithmEntity = algorithmService.updateAlgorithm(id, algorithmEntity);
            AlgorithmDto updatedAlgorithm = algorithmMapper.mapTo(updatedAlgorithmEntity);
            return Response.ok(updatedAlgorithm, "Algorithm updated successfully!");
        } catch (RuntimeException e){
            return Response.failed(HttpStatus.BAD_REQUEST, "Failed to update algorithm.", e.toString());
        }
    }

    @DeleteMapping("image/{algorithmId}/{imageId}")
    public void deleteQuestionImage(@PathVariable UUID algorithmId, @PathVariable String imageId) {
        AlgorithmEntity algorithmEntity = algorithmService.getAlgorithmById(algorithmId);
        algorithmService.deleteImage(algorithmEntity.getTitle(), imageId);
    }


    public AlgorithmController(AlgorithmService algorithmService, Mapper<AlgorithmEntity, AlgorithmDto> algorithmMapper) {
        this.algorithmService = algorithmService;
        this.algorithmMapper = algorithmMapper;
    }
}

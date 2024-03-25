package com.yls.ylslc.content;

import com.yls.ylslc.config.response.Response;
import com.yls.ylslc.mappers.Mapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/content/")
@CrossOrigin(origins = {"https://ylslc.org", "http://localhost:3000"})
public class ContentController {
    private final ContentService contentService;
    private final Mapper<ContentEntity, ContentDto> contentMapper;

    @PostMapping(path = "/multiple-content/{id}")
    public Response createContent(@PathVariable("id") UUID subStructureId, @RequestBody List<ContentDto> contentDtos){
        List<ContentEntity> contentEntities = contentDtos.stream()
                .map(contentMapper::mapFrom)
                .collect(Collectors.toList());
        List<ContentEntity> savedContents = contentService.createMultipleContent(subStructureId, contentEntities);
        List<ContentDto> savedContentDtos = savedContents.stream()
                .map(contentMapper::mapTo)
                .toList();
        return Response.ok(savedContentDtos, "Content saved successfully!");
    }

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

    public ContentController(ContentService contentService, Mapper<ContentEntity, ContentDto> contentMapper) {
        this.contentService = contentService;
        this.contentMapper = contentMapper;
    }
}

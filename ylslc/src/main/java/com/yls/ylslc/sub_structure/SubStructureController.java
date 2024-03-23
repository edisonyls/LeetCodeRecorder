package com.yls.ylslc.sub_structure;

import com.yls.ylslc.config.response.Response;
import com.yls.ylslc.mappers.Mapper;
import org.springframework.web.bind.annotation.*;

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

    public SubStructureController(SubStructureService subStructureService, Mapper<SubStructureEntity, SubStructureDto> subStructureMapper) {
        this.subStructureService = subStructureService;
        this.subStructureMapper = subStructureMapper;
    }
}

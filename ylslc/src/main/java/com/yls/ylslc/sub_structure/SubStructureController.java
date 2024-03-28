package com.yls.ylslc.sub_structure;

import com.yls.ylslc.config.response.Response;
import com.yls.ylslc.mappers.Mapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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

    public SubStructureController(SubStructureService subStructureService, Mapper<SubStructureEntity, SubStructureDto> subStructureMapper) {
        this.subStructureService = subStructureService;
        this.subStructureMapper = subStructureMapper;
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

    @DeleteMapping(path = "/{id}")
    public Response deleteSubStructure(@PathVariable("id") UUID id){
        SubStructureEntity subStructureEntity = subStructureService.delete(id);
        SubStructureDto deletedSubStructure = subStructureMapper.mapTo(subStructureEntity);
        return Response.ok(deletedSubStructure, deletedSubStructure.getName() + (" deleted successfully!"));
    }
}

package com.yls.ylslc.data_structure;

import com.yls.ylslc.config.response.Response;
import com.yls.ylslc.mappers.Mapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/data-structure")
@CrossOrigin(origins = {"https://ylslc.org", "http://localhost:3000"})
public class DataStructureController {
    private final DataStructureService dataStructureService;
    private final Mapper<DataStructureEntity, DataStructureDto> dataStructureMapper;

    @GetMapping
    public Response getDataStructures(){
        List<DataStructureEntity> dataStructureEntities = dataStructureService.getDataStructures();
        List<DataStructureDto> dataStructureDtos = dataStructureEntities.stream().map(dataStructureMapper::mapTo).toList();
        return Response.ok(dataStructureDtos, "Data structure retrieved successfully!");
    }

    @PostMapping
    public Response createDataStructure(@RequestBody DataStructureDto dataStructureDto){
        DataStructureEntity dataStructureEntity = dataStructureMapper.mapFrom(dataStructureDto);
        DataStructureEntity savedDataStructureEntity = dataStructureService.createDataStructure(dataStructureEntity);
        DataStructureDto savedDataStructureDto = dataStructureMapper.mapTo(savedDataStructureEntity);
        return Response.ok(savedDataStructureDto, "Data structure saved successfully!");
    }

    public DataStructureController(DataStructureService dataStructureService, Mapper<DataStructureEntity, DataStructureDto> dataStructureMapper) {
        this.dataStructureService = dataStructureService;
        this.dataStructureMapper = dataStructureMapper;
    }

}

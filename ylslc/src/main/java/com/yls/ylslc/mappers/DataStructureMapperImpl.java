package com.yls.ylslc.mappers;

import com.yls.ylslc.data_structure.DataStructureDto;
import com.yls.ylslc.data_structure.DataStructureEntity;
import com.yls.ylslc.question.solution.SolutionDto;
import com.yls.ylslc.question.solution.SolutionEntity;
import com.yls.ylslc.sub_structure.SubStructureDto;
import com.yls.ylslc.sub_structure.SubStructureEntity;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class DataStructureMapperImpl implements Mapper<DataStructureEntity, DataStructureDto>{

    private final ModelMapper modelMapper;

    public DataStructureMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public DataStructureDto mapTo(DataStructureEntity dataStructureEntity) {
        DataStructureDto dataStructureDto = modelMapper.map(dataStructureEntity, DataStructureDto.class);
        if (dataStructureEntity.getSubStructures() != null && !dataStructureEntity.getSubStructures().isEmpty()){
            List<SubStructureDto> subStructureDtos = dataStructureEntity.getSubStructures().stream()
                    .map(subStructure -> modelMapper.map(subStructure, SubStructureDto.class))
                    .collect(Collectors.toList());
            dataStructureDto.setSubStructures(subStructureDtos);
        }
        return dataStructureDto;
    }

    @Override
    public DataStructureEntity mapFrom(DataStructureDto dataStructureDto) {
        DataStructureEntity dataStructureEntity = modelMapper.map(dataStructureDto, DataStructureEntity.class);
        dataStructureEntity.getSubStructures().clear();
        if (dataStructureDto.getSubStructures() != null) {
            for (SubStructureDto subStructureDto: dataStructureDto.getSubStructures()) {
                SubStructureEntity subStructure = modelMapper.map(subStructureDto, SubStructureEntity.class);
                subStructure.setId(null);
                dataStructureEntity.addSubStructure(subStructure);
            }
        }
        return dataStructureEntity;
    }
}

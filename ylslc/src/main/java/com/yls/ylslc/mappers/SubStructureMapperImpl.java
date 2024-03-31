package com.yls.ylslc.mappers;

import com.yls.ylslc.sub_structure.SubStructureDto;
import com.yls.ylslc.sub_structure.SubStructureEntity;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Component;

@Component
public class SubStructureMapperImpl implements Mapper<SubStructureEntity, SubStructureDto> {
    private final ModelMapper modelMapper;

    public SubStructureMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public SubStructureDto mapTo(SubStructureEntity subStructureEntity) {
        return modelMapper.map(subStructureEntity, SubStructureDto.class);
    }

    @Override
    public SubStructureEntity mapFrom(SubStructureDto subStructureDto) {
        return modelMapper.map(subStructureDto, SubStructureEntity.class);
    }
}

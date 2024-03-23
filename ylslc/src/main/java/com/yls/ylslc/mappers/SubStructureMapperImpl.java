package com.yls.ylslc.mappers;

import com.yls.ylslc.content.ContentDto;
import com.yls.ylslc.content.ContentEntity;
import com.yls.ylslc.sub_structure.SubStructureDto;
import com.yls.ylslc.sub_structure.SubStructureEntity;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SubStructureMapperImpl implements Mapper<SubStructureEntity, SubStructureDto> {
    private final ModelMapper modelMapper;

    public SubStructureMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
        this.modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    }

    @Override
    public SubStructureDto mapTo(SubStructureEntity subStructureEntity) {
        SubStructureDto subStructureDto = modelMapper.map(subStructureEntity, SubStructureDto.class);
        if (subStructureEntity.getContents() != null && !subStructureEntity.getContents().isEmpty()) {
            List<ContentDto> contentDtos = subStructureEntity.getContents().stream()
                    .map(content -> modelMapper.map(content, ContentDto.class))
                    .collect(Collectors.toList());
            subStructureDto.setContents(contentDtos);
        }
        return subStructureDto;
    }

    @Override
    public SubStructureEntity mapFrom(SubStructureDto subStructureDto) {
        SubStructureEntity subStructureEntity = modelMapper.map(subStructureDto, SubStructureEntity.class);
        if (subStructureDto.getContents() != null && !subStructureDto.getContents().isEmpty()) {
            List<ContentEntity> contentEntities = subStructureDto.getContents().stream()
                    .map(contentDto -> modelMapper.map(contentDto, ContentEntity.class))
                    .collect(Collectors.toList());
            contentEntities.forEach(content -> content.setSubStructure(subStructureEntity)); // Set the parent
            subStructureEntity.setContents(contentEntities);
        }
        return subStructureEntity;
    }
}

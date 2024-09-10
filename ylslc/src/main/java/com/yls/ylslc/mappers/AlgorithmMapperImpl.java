package com.yls.ylslc.mappers;

import com.yls.ylslc.algorithm.AlgorithmDto;
import com.yls.ylslc.algorithm.AlgorithmEntity;
import com.yls.ylslc.algorithm.section.SectionDto;
import com.yls.ylslc.algorithm.section.SectionEntity;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AlgorithmMapperImpl implements Mapper<AlgorithmEntity, AlgorithmDto> {
    private final ModelMapper modelMapper;

    public AlgorithmMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public AlgorithmDto mapTo(AlgorithmEntity algorithmEntity) {
        AlgorithmDto algorithmDto = modelMapper.map(algorithmEntity, AlgorithmDto.class);
        if (algorithmDto.getSections() != null && !algorithmEntity.getSections().isEmpty()) {
            List<SectionDto> sectionDtos = algorithmEntity.getSections().stream()
                    .map(sectionEntity -> modelMapper.map(sectionEntity, SectionDto.class))
                    .collect(Collectors.toList());
            algorithmDto.setSections(sectionDtos);
        }
        return algorithmDto;
    }

    @Override
    public AlgorithmEntity mapFrom(AlgorithmDto algorithmDto) {
        if (algorithmDto == null) {
            return null;
        }
        AlgorithmEntity algorithmEntity = modelMapper.map(algorithmDto, AlgorithmEntity.class);
        List<SectionEntity> sectionEntities = algorithmDto.getSections().stream()
                .map(sectionDto -> {
                    SectionEntity section = modelMapper.map(sectionDto, SectionEntity.class);
                    section.setAlgorithm(algorithmEntity);
                    return section;
                })
                .collect(Collectors.toList());
        algorithmEntity.setSections(sectionEntities);
        return algorithmEntity;
    }
}

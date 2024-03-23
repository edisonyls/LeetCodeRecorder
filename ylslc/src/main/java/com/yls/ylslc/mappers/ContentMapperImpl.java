package com.yls.ylslc.mappers;

import com.yls.ylslc.content.ContentDto;
import com.yls.ylslc.content.ContentEntity;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class ContentMapperImpl implements Mapper<ContentEntity, ContentDto> {
    private ModelMapper modelMapper;

    public ContentMapperImpl(ModelMapper modelMapper){this.modelMapper = modelMapper;}

    @Override
    public ContentDto mapTo(ContentEntity contentEntity) {
        return modelMapper.map(contentEntity, ContentDto.class);
    }

    @Override
    public ContentEntity mapFrom(ContentDto contentDto) {
        return modelMapper.map(contentDto, ContentEntity.class);
    }
}

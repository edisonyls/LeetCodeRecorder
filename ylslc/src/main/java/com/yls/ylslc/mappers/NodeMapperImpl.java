package com.yls.ylslc.mappers;

import com.yls.ylslc.node.NodeDto;
import com.yls.ylslc.node.NodeEntity;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class NodeMapperImpl implements Mapper<NodeEntity, NodeDto> {
    private final ModelMapper modelMapper;

    public NodeMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public NodeDto mapTo(NodeEntity nodeEntity) {
        return modelMapper.map(nodeEntity, NodeDto.class);
    }

    @Override
    public NodeEntity mapFrom(NodeDto nodeDto) {
        return modelMapper.map(nodeDto, NodeEntity.class);
    }
}

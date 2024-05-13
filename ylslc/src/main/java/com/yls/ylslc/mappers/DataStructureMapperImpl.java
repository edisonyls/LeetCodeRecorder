package com.yls.ylslc.mappers;

import com.yls.ylslc.data_structure.DataStructureDto;
import com.yls.ylslc.data_structure.DataStructureEntity;
import com.yls.ylslc.node.NodeDto;
import com.yls.ylslc.node.NodeEntity;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
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
        if (dataStructureEntity.getNodes() != null && !dataStructureEntity.getNodes().isEmpty()){
            List<NodeDto> nodeDtos = dataStructureEntity.getNodes().stream()
                    .map(node -> modelMapper.map(node, NodeDto.class))
                    .collect(Collectors.toList());
            dataStructureDto.setNodes(nodeDtos);
        }
        return dataStructureDto;
    }

    @Override
    public DataStructureEntity mapFrom(DataStructureDto dataStructureDto) {
        DataStructureEntity dataStructureEntity = modelMapper.map(dataStructureDto, DataStructureEntity.class);
        if (dataStructureEntity.getNodes() == null) {
            dataStructureEntity.setNodes(new ArrayList<>());
        }
        dataStructureEntity.getNodes().clear();
        if (dataStructureDto.getNodes() != null) {
            for (NodeDto nodeDto : dataStructureDto.getNodes()) {
                NodeEntity node = modelMapper.map(nodeDto, NodeEntity.class);
                node.setId(null);
                dataStructureEntity.addNode(node);
            }
        }
        return dataStructureEntity;
    }
}

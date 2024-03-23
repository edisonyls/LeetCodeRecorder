package com.yls.ylslc.sub_structure;

import com.yls.ylslc.data_structure.DataStructureEntity;
import com.yls.ylslc.data_structure.DataStructureRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class SubStructureServiceImpl implements SubStructureService{
    private final SubStructureRepository subStructureRepository;
    private final DataStructureRepository dataStructureRepository;
    @Override
    public SubStructureEntity createSubstructure(UUID dataStructureEntityId, SubStructureEntity subStructureEntity) {
        DataStructureEntity dataStructureEntity = dataStructureRepository.findById(dataStructureEntityId)
                .orElseThrow(() -> new IllegalStateException("DataStructureEntity not found"));
        subStructureEntity.setDataStructure(dataStructureEntity);
        dataStructureEntity.addSubStructure(subStructureEntity);
        return subStructureRepository.save(subStructureEntity);
    }

    public SubStructureServiceImpl(SubStructureRepository subStructureRepository, DataStructureRepository dataStructureRepository) {
        this.subStructureRepository = subStructureRepository;
        this.dataStructureRepository = dataStructureRepository;
    }
}

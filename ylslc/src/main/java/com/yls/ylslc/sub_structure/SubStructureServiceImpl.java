package com.yls.ylslc.sub_structure;

import com.yls.ylslc.data_structure.DataStructureEntity;
import com.yls.ylslc.data_structure.DataStructureRepository;
import jakarta.transaction.Transactional;
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
        return subStructureRepository.save(subStructureEntity);
    }

    @Override
    public boolean isExist(UUID id) {
        return subStructureRepository.existsById(id);
    }

    @Override
    public SubStructureEntity updateName(UUID id, String name) {
        SubStructureEntity subStructureEntity = subStructureRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Sub-structure not found!"));
        subStructureEntity.setName(name);
        return subStructureRepository.save(subStructureEntity);
    }

    @Override
    @Transactional
    public SubStructureEntity delete(UUID id) {
        SubStructureEntity subStructureEntity = subStructureRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Sub-structure not found!"));
        // Example of removing a SubStructureEntity from its parent
        DataStructureEntity parent = subStructureEntity.getDataStructure();
        parent.getSubStructures().remove(subStructureEntity);
        dataStructureRepository.save(parent);
        subStructureRepository.delete(subStructureEntity);
        return subStructureEntity;
    }

    public SubStructureServiceImpl(SubStructureRepository subStructureRepository, DataStructureRepository dataStructureRepository) {
        this.subStructureRepository = subStructureRepository;
        this.dataStructureRepository = dataStructureRepository;
    }
}

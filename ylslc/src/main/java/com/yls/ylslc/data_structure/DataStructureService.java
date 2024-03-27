package com.yls.ylslc.data_structure;

import java.util.List;
import java.util.UUID;

public interface DataStructureService {
    DataStructureEntity createDataStructure(DataStructureEntity dataStructureEntity);
    List<DataStructureEntity> getDataStructures();

    boolean isExist(UUID id);

    DataStructureEntity updateName(UUID id, String name);

    DataStructureEntity delete(UUID id);
}

package com.yls.ylslc.data_structure;

import java.util.List;

public interface DataStructureService {
    DataStructureEntity createDataStructure(DataStructureEntity dataStructureEntity);
    List<DataStructureEntity> getDataStructures();
}

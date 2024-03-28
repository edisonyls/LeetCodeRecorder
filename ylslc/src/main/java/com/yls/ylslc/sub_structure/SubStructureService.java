package com.yls.ylslc.sub_structure;

import java.util.UUID;

public interface SubStructureService {
    SubStructureEntity createSubstructure(UUID dataStructureEntityId, SubStructureEntity subStructureEntity);

    boolean isExist(UUID id);

    SubStructureEntity updateName(UUID id, String name);

    SubStructureEntity delete(UUID id);
}

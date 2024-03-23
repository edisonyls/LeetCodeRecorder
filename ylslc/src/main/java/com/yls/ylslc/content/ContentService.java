package com.yls.ylslc.content;

import java.util.List;
import java.util.UUID;

public interface ContentService {
    List<ContentEntity> createContent(UUID subStructureEntityId, List<ContentEntity> contentEntities);
}

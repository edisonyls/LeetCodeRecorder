package com.yls.ylslc.content;

import com.yls.ylslc.sub_structure.SubStructureEntity;
import com.yls.ylslc.sub_structure.SubStructureRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ContentServiceImpl implements ContentService{
    private final ContentRepository contentRepository;
    private final SubStructureRepository subStructureRepository;

    public ContentServiceImpl(ContentRepository contentRepository, SubStructureRepository subStructureRepository) {
        this.contentRepository = contentRepository;
        this.subStructureRepository = subStructureRepository;
    }

    @Override
    public List<ContentEntity> createContent(UUID subStructureEntityId, List<ContentEntity> contentEntities) {
        SubStructureEntity subStructureEntity = subStructureRepository.findById(subStructureEntityId)
                .orElseThrow(() -> new IllegalStateException("SubStructureEntity not found"));

        // Associate each content with the sub-structure
        contentEntities.forEach(contentEntity -> {
            contentEntity.setSubStructure(subStructureEntity);
            subStructureEntity.addContent(contentEntity);
        });

        // Save all content entities
        return contentRepository.saveAll(contentEntities);
    }

}

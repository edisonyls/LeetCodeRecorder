package com.yls.ylslc.content;

import com.yls.ylslc.sub_structure.SubStructureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ContentRepository extends JpaRepository<ContentEntity, UUID> {
    List<ContentEntity> findBySubStructure(SubStructureEntity subStructureEntity);
}

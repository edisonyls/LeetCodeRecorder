package com.yls.ylslc.sub_structure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SubStructureRepository extends JpaRepository<SubStructureEntity, UUID> {
}

package com.yls.ylslc.node;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface NodeRepository extends JpaRepository<NodeEntity, Long> {
}

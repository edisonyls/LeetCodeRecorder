package com.yls.ylslc.data_structure;

import com.yls.ylslc.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DataStructureRepository extends JpaRepository<DataStructureEntity, UUID> {
    List<DataStructureEntity> findByUser(UserEntity currentUser);
}

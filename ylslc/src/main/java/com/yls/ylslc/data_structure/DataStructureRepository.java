package com.yls.ylslc.data_structure;

import com.yls.ylslc.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DataStructureRepository extends JpaRepository<DataStructureEntity, UUID> {
    List<DataStructureEntity> findByUser(UserEntity currentUser);

    @Query("SELECT COUNT(ds) FROM DataStructureEntity ds WHERE ds.user.id = :userId")
    long countDataStructuresByUserId(@Param("userId") UUID userId);
}

package com.yls.ylslc.algorithm;

import com.yls.ylslc.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AlgorithmRepository extends JpaRepository<AlgorithmEntity, UUID> {
    List<AlgorithmEntity> findByUser(UserEntity currentUser);
    @Query("SELECT COUNT(algo) FROM AlgorithmEntity algo WHERE algo.user.id = :userId")
    long countAlgorithmByUserId(@Param("userId") UUID userId);

}

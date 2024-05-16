package com.yls.ylslc.question;

import com.yls.ylslc.user.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface QuestionRepository extends JpaRepository<QuestionEntity, UUID> {
    Page<QuestionEntity> findByUser(UserEntity currentUser, Pageable pageable);

    @Query("SELECT q FROM QuestionEntity q WHERE q.user = :user AND (LOWER(q.title) LIKE LOWER(CONCAT('%', :searchQuery, '%')) OR CAST(q.number AS string) LIKE %:searchQuery%)")
    Page<QuestionEntity> searchByTitleOrNumber(@Param("user") UserEntity user, @Param("searchQuery") String searchQuery, Pageable pageable);

    @Query("SELECT q FROM QuestionEntity q WHERE q.id = :id AND q.user.username = :username")
    Optional<QuestionEntity> findByIdAndUsername(@Param("id") UUID id, @Param("username") String username);
}


package com.yls.ylslc.question;

import com.yls.ylslc.user.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface QuestionRepository extends JpaRepository<QuestionEntity, UUID> {
    Page<QuestionEntity> findByUser(UserEntity currentUser, Pageable pageable);

    @Query("SELECT q FROM QuestionEntity q WHERE q.user = :user AND (LOWER(q.title) LIKE LOWER(CONCAT('%', :searchQuery, '%')) OR CAST(q.number AS string) LIKE %:searchQuery%)")
    Page<QuestionEntity> searchByTitleOrNumber(@Param("user") UserEntity user, @Param("searchQuery") String searchQuery,
            Pageable pageable);

    @Query("SELECT q FROM QuestionEntity q WHERE q.id = :id AND q.user.username = :username")
    Optional<QuestionEntity> findByIdAndUsername(@Param("id") UUID id, @Param("username") String username);

    @Query("SELECT COUNT(q) FROM QuestionEntity q WHERE q.user.id = :userId")
    long countQuestionsByUserId(@Param("userId") UUID userId);

    @Query("SELECT q.difficulty AS difficulty, COUNT(q) AS count FROM QuestionEntity q WHERE q.user.id = :userId GROUP BY q.difficulty")
    List<Map<String, Object>> findDifficultyDistributionByUserId(@Param("userId") UUID userId);

    @Query(value = """
              SELECT s.success, COALESCE(COUNT(q.id), 0) AS count
              FROM (SELECT TRUE AS success UNION SELECT FALSE) s
              LEFT JOIN question q ON q.success = s.success AND q.user_id = :userId
              GROUP BY s.success
            """, nativeQuery = true)
    List<Map<String, Object>> findSuccessDistributionByUserId(@Param("userId") UUID userId);

    @Query("SELECT DATE(q.createdAt) AS createdAtDate, COUNT(q) AS count FROM QuestionEntity q WHERE q.user.id = :userId GROUP BY DATE(q.createdAt) ORDER BY DATE(q.createdAt) DESC")
    List<Map<String, Object>> findCreatedAtDistributionByUserId(@Param("userId") UUID userId);

    @Query("SELECT COUNT(q) FROM QuestionEntity q WHERE q.user.id = :userId AND q.star = true")
    Long countStarredQuestionsByUserId(@Param("userId") UUID userId);

    @Query("SELECT q.difficulty AS difficulty, ROUND(AVG(CAST(q.timeOfCompletion AS double)), 2) AS averageTime FROM QuestionEntity q WHERE q.user.id = :userId GROUP BY q.difficulty")
    List<Map<String, Object>> findAverageTimeOfCompletionByDifficulty(@Param("userId") UUID userId);

}

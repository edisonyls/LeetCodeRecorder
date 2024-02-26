package com.yls.ylslc.question;

import com.yls.ylslc.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository
        extends JpaRepository<QuestionEntity, Long> {
    List<QuestionEntity> findByUser(UserEntity currentUser);
    @Query("SELECT q FROM QuestionEntity q WHERE q.id = :id AND q.user.username = :username")
    Optional<QuestionEntity> findByIdAndUsername(@Param("id") Long id, @Param("username") String username);
}

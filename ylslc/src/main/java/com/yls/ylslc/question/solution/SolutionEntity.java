package com.yls.ylslc.question.solution;

import com.yls.ylslc.question.QuestionEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name="solution")
public class SolutionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private QuestionEntity question;

    @Column(columnDefinition = "TEXT")
    private String thinkingProcess;
    @Column(columnDefinition = "TEXT")
    private String codeSnippet;
    private String imageId;




}

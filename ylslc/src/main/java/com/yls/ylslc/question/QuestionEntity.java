package com.yls.ylslc.question;

import com.yls.ylslc.question.solution.SolutionEntity;
import com.yls.ylslc.user.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name="question")
public class QuestionEntity {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private UserEntity user;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<SolutionEntity> solutions = new ArrayList<>();

    private Integer number;
    private String title;
    private String difficulty;
    private LocalDate dateOfCompletion;
    private Boolean success;
    private Integer attempts;
    private String timeOfCompletion;
    private Boolean star;
    private LocalDateTime createdAt;

    // Automatically set the current date and time before persisting
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Add helper methods to manage bi-directional relationship
    public void addSolution(SolutionEntity solution) {
        solutions.add(solution);
        solution.setQuestion(this);
    }

    public void removeSolution(SolutionEntity solution) {
        solutions.remove(solution);
        solution.setQuestion(null);
    }

    public QuestionEntity(){
        this.id = UUID.randomUUID();
    }
}

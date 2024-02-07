package com.yls.ylslc.question;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name="question")
public class QuestionEntity {
    @Id
    @SequenceGenerator(
            name="question_sequence",
            sequenceName = "question_sequence",
            allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "question_sequence"
    )
    private Long id;
    private Integer number;
    private String title;
    private String difficulty;
    private LocalDate dateOfCompletion;
    private Boolean success;
    private Integer attempts;
    private String timeOfCompletion;
    private String thinkingProcess;

    public QuestionEntity(){}

    public QuestionEntity(Integer number, String title, String difficulty, LocalDate dateOfCompletion, Boolean success, Integer attempts, String timeOfCompletion, String thinkingProcess) {
        this.number = number;
        this.title = title;
        this.difficulty = difficulty;
        this.dateOfCompletion = dateOfCompletion;
        this.success = success;
        this.attempts = attempts;
        this.timeOfCompletion = timeOfCompletion;
        this.thinkingProcess = thinkingProcess;
    }

    @Override
    public String toString() {
        return "Question{" +
                "id=" + id +
                ", number=" + number +
                ", title='" + title + '\'' +
                ", difficulty='" + difficulty + '\'' +
                ", dateOfCompletion=" + dateOfCompletion +
                ", success=" + success +
                ", attempts=" + attempts +
                ", timeOfCompletion='" + timeOfCompletion + '\'' +
                ", thinkingProcess='" + thinkingProcess + '\'' +
                '}';
    }
}

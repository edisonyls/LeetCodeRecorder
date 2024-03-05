package com.yls.ylslc.question;

import com.yls.ylslc.user.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name="question")
public class QuestionEntity {
    @Id
    @GeneratedValue
    private UUID id;

//    @Id
//    @SequenceGenerator(
//            name="question_sequence",
//            sequenceName = "question_sequence",
//            allocationSize = 1)
//    @GeneratedValue(
//            strategy = GenerationType.SEQUENCE,
//            generator = "question_sequence"
//    )
//    private Long id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private UserEntity user;

    private String questionImageId;

    private Integer number;
    private String title;
    private String difficulty;
    private LocalDate dateOfCompletion;
    private Boolean success;
    private Integer attempts;
    private String timeOfCompletion;
    private String thinkingProcess;

    public QuestionEntity(){
        this.id = UUID.randomUUID();
    }
}

package com.yls.ylslc.algorithm;

import com.yls.ylslc.algorithm.section.SectionEntity;
import com.yls.ylslc.question.solution.SolutionEntity;
import com.yls.ylslc.user.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name="algorithm")
public class AlgorithmEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private String title;
    private String tag;
    private String summary;

    @OneToMany(mappedBy = "algorithm", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<SectionEntity> sections = new ArrayList<>();

    private LocalDateTime createdAt;

    public void addSection(SectionEntity section) {
        sections.add(section);
        section.setAlgorithm(this);
    }

    @PrePersist
    protected void onCreate(){
        createdAt = LocalDateTime.now();
    }

}

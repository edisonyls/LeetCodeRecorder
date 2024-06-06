package com.yls.ylslc.algorithm.section;

import com.yls.ylslc.algorithm.AlgorithmEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="section")
public class SectionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="algorithm_id")
    private AlgorithmEntity algorithm;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String content;
}

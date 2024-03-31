package com.yls.ylslc.sub_structure;

import com.yls.ylslc.data_structure.DataStructureEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name="sub_structure")
public class SubStructureEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "data_structure_id")
    private DataStructureEntity dataStructure;

    private String name;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String content;
}



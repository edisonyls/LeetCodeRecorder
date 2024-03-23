package com.yls.ylslc.content;

import com.yls.ylslc.sub_structure.SubStructureEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name="content")
public class ContentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name="sub_structure_id")
    private SubStructureEntity subStructure;

    @Enumerated(value = EnumType.STRING)
    private ContentType type;

    @Column(columnDefinition = "TEXT")
    private String text;

    private String imageId;



}

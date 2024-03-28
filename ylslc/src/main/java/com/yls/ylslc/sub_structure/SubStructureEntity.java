package com.yls.ylslc.sub_structure;

import com.yls.ylslc.content.ContentEntity;
import com.yls.ylslc.data_structure.DataStructureEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
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

    @OneToMany(mappedBy = "subStructure", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<ContentEntity> contents = new ArrayList<>();

    public void addContent(ContentEntity contentEntity){
        contents.add(contentEntity);
        contentEntity.setSubStructure(this);
    }

}



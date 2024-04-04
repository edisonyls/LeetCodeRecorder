package com.yls.ylslc.data_structure;

import com.yls.ylslc.sub_structure.SubStructureEntity;
import com.yls.ylslc.user.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name="data_structure")
public class DataStructureEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private UserEntity user;

    private String name;

    @OneToMany(mappedBy = "dataStructure",  cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<SubStructureEntity> subStructures = new ArrayList<>();

    public void addSubStructure(SubStructureEntity subStructure){
        subStructures.add(subStructure);
        subStructure.setDataStructure(this);
    }

}

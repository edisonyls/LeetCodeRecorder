package com.yls.ylslc.data_structure;

import com.yls.ylslc.node.NodeEntity;
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
    private List<NodeEntity> nodes = new ArrayList<>();

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }


    public void addNode(NodeEntity node){
        node.setDataStructure(this);
        nodes.add(node);
    }

}

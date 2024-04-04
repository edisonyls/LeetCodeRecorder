package com.yls.ylslc.data_structure;

import com.yls.ylslc.sub_structure.SubStructureDto;
import com.yls.ylslc.sub_structure.SubStructureEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DataStructureDto {
    private UUID id;
    private String name;
    private List<SubStructureDto> subStructures;
}

package com.yls.ylslc.sub_structure;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubStructureDto {
    private UUID id;
    private String name;
    private String content;
}

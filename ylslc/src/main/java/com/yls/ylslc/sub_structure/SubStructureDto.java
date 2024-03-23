package com.yls.ylslc.sub_structure;

import com.yls.ylslc.content.ContentDto;
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
public class SubStructureDto {
    private UUID id;
    private String name;
    private List<ContentDto> contents;
}

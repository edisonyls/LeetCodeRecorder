package com.yls.ylslc.algorithm.section;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SectionDto {
    private Long id;
    private String name;
    private String content;
}

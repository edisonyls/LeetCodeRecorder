package com.yls.ylslc.algorithm;

import com.yls.ylslc.algorithm.section.SectionDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlgorithmDto {
    private UUID id;
    private String title;
    private String tag;
    private String summary;
    private List<SectionDto> sections;
    private LocalDateTime createdAt;
}

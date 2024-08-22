package com.yls.ylslc.node;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NodeDto {
    private Long id;
    private String name;
    private String content;
    private LocalDateTime createdAt;
}

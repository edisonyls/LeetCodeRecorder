package com.yls.ylslc.question.solution;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SolutionDto {
    private String thinkingProcess;
    private String codeSnippet;
    private String imageId;
}

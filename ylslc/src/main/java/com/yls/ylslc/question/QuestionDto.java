package com.yls.ylslc.question;


import com.yls.ylslc.question.solution.SolutionDto;
import com.yls.ylslc.question.solution.SolutionEntity;
import com.yls.ylslc.user.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuestionDto {
    private UUID id;
    private Integer number;
    private String title;
    private String difficulty;
    private LocalDate dateOfCompletion;
    private Boolean success;
    private Integer attempts;
    private String timeOfCompletion;
    private List<SolutionDto> solutions;
    private LocalDateTime createdAt;
}

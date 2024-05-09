package com.yls.ylslc.question.solution;

import com.yls.ylslc.question.QuestionEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface SolutionService {
    String uploadImages(MultipartFile image, String questionNumber);

    void updateSolutions(QuestionEntity existingQuestion, List<SolutionEntity> newSolutions);
}

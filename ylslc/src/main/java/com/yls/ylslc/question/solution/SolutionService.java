package com.yls.ylslc.question.solution;

import com.yls.ylslc.question.QuestionEntity;
import org.springframework.web.multipart.MultipartFile;

public interface SolutionService {
    String uploadImages(MultipartFile image, String questionNumber);
}

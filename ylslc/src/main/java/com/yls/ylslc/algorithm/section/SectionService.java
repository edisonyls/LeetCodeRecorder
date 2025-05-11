package com.yls.ylslc.algorithm.section;

import com.yls.ylslc.algorithm.AlgorithmEntity;

import java.util.List;

public interface SectionService {
    void updateSections(AlgorithmEntity existingAlgorithm, List<SectionEntity> sections);
}

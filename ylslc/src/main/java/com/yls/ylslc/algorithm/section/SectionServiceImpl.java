package com.yls.ylslc.algorithm.section;

import com.yls.ylslc.algorithm.AlgorithmEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SectionServiceImpl implements SectionService{
    @Override
    public void updateSections(AlgorithmEntity existingAlgorithm, List<SectionEntity> sections) {
        existingAlgorithm.getSections().removeIf(section ->
                sections.stream().noneMatch(newSec -> newSec.getId() != null && newSec.getId().equals(section.getId()))
        );
        for (SectionEntity newSection : sections){
            if (newSection.getId() == null){
                existingAlgorithm.addSection(newSection);
            } else {
                existingAlgorithm.getSections().stream()
                        .filter(s -> s.getId().equals(newSection.getId()))
                        .findFirst()
                        .ifPresent(existingSection -> {
                            existingSection.setName(newSection.getName());
                            existingSection.setContent(newSection.getContent());
                        });
            }
        }
    }
}

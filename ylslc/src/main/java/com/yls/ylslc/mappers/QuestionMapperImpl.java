package com.yls.ylslc.mappers;

import com.yls.ylslc.question.QuestionDto;
import com.yls.ylslc.question.QuestionEntity;
import com.yls.ylslc.question.solution.SolutionDto;
import com.yls.ylslc.question.solution.SolutionEntity;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class QuestionMapperImpl implements Mapper<QuestionEntity, QuestionDto>{

    private final ModelMapper modelMapper;

    public QuestionMapperImpl(ModelMapper modelMapper){
        this.modelMapper = modelMapper;
    }


    @Override
    public QuestionEntity mapFrom(QuestionDto questionDto) {
        QuestionEntity questionEntity = modelMapper.map(questionDto, QuestionEntity.class);
        questionEntity.getSolutions().clear();
        if (questionDto.getSolutions() != null) {
            for (SolutionDto solutionDto : questionDto.getSolutions()) {
                SolutionEntity solution = modelMapper.map(solutionDto, SolutionEntity.class);
                solution.setId(null);
                questionEntity.addSolution(solution);
            }
        }
        return questionEntity;
    }
    @Override
    public QuestionDto mapTo(QuestionEntity questionEntity) {
        QuestionDto questionDto = modelMapper.map(questionEntity, QuestionDto.class);
        if (questionEntity.getSolutions() != null && !questionEntity.getSolutions().isEmpty()) {
            List<SolutionDto> solutionDtos = questionEntity.getSolutions().stream()
                    .map(solution -> modelMapper.map(solution, SolutionDto.class))
                    .collect(Collectors.toList());
            questionDto.setSolutions(solutionDtos);
        }
        return questionDto;
    }

}

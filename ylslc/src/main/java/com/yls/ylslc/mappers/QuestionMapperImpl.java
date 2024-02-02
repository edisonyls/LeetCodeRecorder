package com.yls.ylslc.mappers;

import com.yls.ylslc.question.QuestionDto;
import com.yls.ylslc.question.QuestionEntity;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class QuestionMapperImpl implements Mapper<QuestionEntity, QuestionDto>{

    private ModelMapper modelMapper;

    public QuestionMapperImpl(ModelMapper modelMapper){
        this.modelMapper = modelMapper;
    }

    @Override
    public QuestionDto mapTo(QuestionEntity questionEntity) {
        return modelMapper.map(questionEntity, QuestionDto.class);
    }

    @Override
    public QuestionEntity mapFrom(QuestionDto questionDto) {
        return modelMapper.map(questionDto, QuestionEntity.class);
    }
}

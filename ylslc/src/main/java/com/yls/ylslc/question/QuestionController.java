package com.yls.ylslc.question;

import com.yls.ylslc.config.response.Response;
import com.yls.ylslc.mappers.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path="api/question")
public class QuestionController {
    private final QuestionService questionService;
    private Mapper<QuestionEntity, QuestionDto> questionMapper;


    @Autowired
    public QuestionController(QuestionService theQuestionService, Mapper<QuestionEntity, QuestionDto> questionMapper){
        this.questionService = theQuestionService;
        this.questionMapper = questionMapper;
    }

    @GetMapping
    public List<QuestionDto> getQuestions(){
        List<QuestionEntity> questions = questionService.getQuestions();
        return questions.stream().map(questionMapper::mapTo).collect(Collectors.toList());
    }

    @PostMapping
    public QuestionDto createQuestion(@RequestBody QuestionDto question){
        QuestionEntity questionEntity = questionMapper.mapFrom(question);
        QuestionEntity savedQuestionEntity = questionService.createQuestion(questionEntity);
        return questionMapper.mapTo(savedQuestionEntity);
    }

    @GetMapping(path = "/{id}")
    public Response getQuestion(@PathVariable("id") Long id){
        Optional<QuestionEntity> foundQuestion = questionService.findOne(id);
        return foundQuestion.map(questionEntity -> {
            QuestionDto questionDto = questionMapper.mapTo(questionEntity);
            return Response.ok(questionDto, "Question retrieved successfully!");
        }).orElse(
                Response.failed(HttpStatus.NOT_FOUND, "Question not found!")
        );
    }
}

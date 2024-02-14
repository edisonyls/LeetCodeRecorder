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
    private final Mapper<QuestionEntity, QuestionDto> questionMapper;


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

    @GetMapping(path = "/{username}/all")
    public Response getQuestionsByUsername(@PathVariable String username){
        List<QuestionEntity> questionEntities = questionService.getQuestionsByUsername(username);
        return Response.ok(questionEntities, "Questions created by " + username + " retrieved successfully!");
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

    @DeleteMapping(path="/{id}")
    public Response deleteQuestion(@PathVariable("id") Long id){
        Optional<QuestionEntity> foundQuestion = questionService.findOne(id);
        return foundQuestion.map(questionEntity -> {
            QuestionDto questionDto = questionMapper.mapTo(questionEntity);
            questionService.delete(id);
            return Response.ok(questionDto, "Question <" + questionDto.getTitle() + "> deleted successfully!");
        }) .orElse(
                Response.failed(HttpStatus.NOT_FOUND, "Question not found!")
        );
    }

    @PutMapping(path="/{id}")
    public Response updateQuestion(
            @PathVariable("id") Long id,
            @RequestBody QuestionDto questionDto
    ){
        if (!questionService.isExist(id)){
            return Response.failed(HttpStatus.NOT_FOUND, "Question not found!");
        }
        QuestionEntity questionEntity = questionMapper.mapFrom(questionDto);
        QuestionEntity updatedQuestion = questionService.partialUpdate(id, questionEntity);
        return Response.ok(questionMapper.mapTo(updatedQuestion), "Question update successfully!");
    }
}

package com.yls.ylslc.question;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.yls.ylslc.config.response.Response;
import com.yls.ylslc.mappers.Mapper;
import com.yls.ylslc.question.solution.SolutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path="api/question")
@CrossOrigin(origins = {"https://ylslc.org", "http://localhost:3000"})
public class QuestionController {
    private final QuestionService questionService;
    private final SolutionService solutionService;
    private final Mapper<QuestionEntity, QuestionDto> questionMapper;


    @Autowired
    public QuestionController(QuestionService theQuestionService, SolutionService theSolutionService, Mapper<QuestionEntity, QuestionDto> questionMapper){
        this.questionService = theQuestionService;
        this.solutionService = theSolutionService;
        this.questionMapper = questionMapper;
    }

    @GetMapping
    public Response getQuestions(){
        List<QuestionEntity> questions = questionService.getQuestions();
        List<QuestionDto> questionDtos = questions.stream().map(questionMapper::mapTo).toList();
        return Response.ok(questionDtos, "Question retrieved successfully!");
    }

    @GetMapping("all")
    public Response getQuestionsPerUser(){
        List<QuestionEntity> questions = questionService.getQuestionsByUser();
        List<QuestionDto> questionDtos = questions.stream().map(questionMapper::mapTo).toList();
        return Response.ok(questionDtos, "Question retrieved successfully!");
    }


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, path="upload-image")
    public Response uploadImages(@RequestPart("image") MultipartFile image,
                                 @RequestPart("questionNumber") String questionNumber){
        String imageId = solutionService.uploadImages(image, questionNumber);
        return Response.ok(imageId, "Image saved successfully!");
    }

    @PostMapping
    public Response createQuestion(@RequestBody QuestionDto questionDto) {
        QuestionEntity questionEntity = questionMapper.mapFrom(questionDto);
        QuestionEntity savedQuestionEntity = questionService.createQuestion(questionEntity);
        QuestionDto savedQuestionDto = questionMapper.mapTo(savedQuestionEntity);
        return Response.ok(savedQuestionDto, "Question saved successfully!");
    }

    @GetMapping(path = "/{id}")
    public Response getQuestion(@PathVariable("id") UUID id){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<QuestionEntity> foundQuestion = questionService.findOne(id, username);
        return foundQuestion.map(questionEntity -> {
            QuestionDto questionDto = questionMapper.mapTo(questionEntity);
            return Response.ok(questionDto, "Question retrieved successfully!");
        }).orElse(
                Response.failed(HttpStatus.NOT_FOUND, "Question doesn't exist")
        );
    }

    @DeleteMapping(path="/{id}")
    public Response deleteQuestion(@PathVariable("id") UUID id){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<QuestionEntity> foundQuestion = questionService.findOne(id, username);
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
            @PathVariable("id") UUID id,
            @RequestBody QuestionDto questionDto
    ){
        if (!questionService.isExist(id)){
            return Response.failed(HttpStatus.NOT_FOUND, "Question not found!");
        }
        QuestionEntity questionEntity = questionMapper.mapFrom(questionDto);
        QuestionEntity updatedQuestion = questionService.partialUpdate(id, questionEntity);
        return Response.ok(questionMapper.mapTo(updatedQuestion), "Question update successfully!");
    }

    @GetMapping("image/{questionId}/{imageId}")
    public ResponseEntity<byte[]> getQuestionImage(@PathVariable UUID questionId, @PathVariable String imageId) {
        QuestionEntity questionEntity = questionService.getQuestionById(questionId);
        byte[] imageData = questionService.getImage(questionEntity.getNumber(), imageId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(getMediaTypeForImageId(imageId));

        return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
    }

    @GetMapping("number")
    public Response getNumberOfQuestions(){
        return Response.ok(questionService.countQuestion(), "Count the number of questions successfully!");
    }

    @PutMapping("/toggleStar/{id}")
    public Response toggleStar(@PathVariable UUID id){
        try {
            QuestionEntity question = questionService.updateStar(id);
            QuestionDto updatedQuestion = questionMapper.mapTo(question);
            return Response.ok(updatedQuestion,"Star updated!");
        } catch (Exception e) {
            return Response.failed(HttpStatus.INTERNAL_SERVER_ERROR, "Star update failed", e.toString());
        }
    }

    private MediaType getMediaTypeForImageId(String imageId) {
        if (imageId.endsWith(".png")) {
            return MediaType.IMAGE_PNG;
        } else if (imageId.endsWith(".jpg") || imageId.endsWith(".jpeg")) {
            return MediaType.IMAGE_JPEG;
        } else {
            // Default or fallback content type
            return MediaType.APPLICATION_OCTET_STREAM;
        }
    }
}

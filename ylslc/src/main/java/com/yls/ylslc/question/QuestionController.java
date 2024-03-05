package com.yls.ylslc.question;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.yls.ylslc.config.response.Response;
import com.yls.ylslc.mappers.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path="api/question")
@CrossOrigin(origins = "http://localhost:3000")
public class QuestionController {
    private final QuestionService questionService;
    private final Mapper<QuestionEntity, QuestionDto> questionMapper;


    @Autowired
    public QuestionController(QuestionService theQuestionService, Mapper<QuestionEntity, QuestionDto> questionMapper){
        this.questionService = theQuestionService;
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


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Response createQuestion(
            @RequestPart("question") String questionJson,
            @RequestPart("file") MultipartFile file
    ) throws JsonProcessingException {
        // make the incoming String to a QuestionDto
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        QuestionDto question = objectMapper.readValue(questionJson, QuestionDto.class);


        QuestionEntity questionEntity = questionMapper.mapFrom(question);
        QuestionEntity savedQuestionEntity = questionService.createQuestion(questionEntity);

        questionService.uploadQuestionImage(savedQuestionEntity, file);

        // update the QuestionEntity with updated image id
        QuestionEntity updatedQuestionEntity = questionService.getQuestionById(savedQuestionEntity.getId());
        QuestionDto questionDto = questionMapper.mapTo(updatedQuestionEntity);
        return Response.ok(questionDto, "Question saved successfully!");
    }


    @GetMapping(path = "/{id}")
    public Response getQuestion(@PathVariable("id") Long id){
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
    public Response deleteQuestion(@PathVariable("id") Long id){
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

    @GetMapping("{id}/image")
    public ResponseEntity<byte[]> getQuestionImage(@PathVariable("id") Long id) {
        QuestionEntity questionEntity = questionService.getQuestionById(id);
        byte[] imageData = questionService.getQuestionImage(questionEntity);

        // Use the imageId which includes the file extension to determine the MIME type
        String imageId = questionEntity.getQuestionImageId();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(getMediaTypeForImageId(imageId));

        return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
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

package com.yls.ylslc.config.exception;
import com.yls.ylslc.config.response.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<Response> handleApiNotFoundException(Exception exc){
        Response error = new Response(
                HttpStatus.NOT_FOUND.value(),
                "Api address not found!",
                exc.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<Response> handleQuestionException(QuestionException exc){
        Response error = new Response(HttpStatus.NOT_FOUND.value(),
                "Question Exception Thrown!",
                exc.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}



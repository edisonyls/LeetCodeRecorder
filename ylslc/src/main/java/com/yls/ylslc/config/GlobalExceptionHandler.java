package com.yls.ylslc.config;

import com.yls.ylslc.response.Response;
import com.yls.ylslc.response.ResponseError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<Response<?>> handleNotFoundException(ResponseStatusException e){
        return new ResponseEntity<>(
                Response.error(
                        HttpStatus.NOT_FOUND,
                        new ArrayList<>(List.of(new ResponseError("error", "Not Found Exception - " + e.getReason())))
                ), e.getStatusCode()
        );
    }

    @ExceptionHandler
    public ResponseEntity<Response<?>> handleException(Exception e){
        return new ResponseEntity<>(
                Response.error(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        new ArrayList<>(List.of(new ResponseError("error", "Internal Server Error - " + e.getMessage())))
                ),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}



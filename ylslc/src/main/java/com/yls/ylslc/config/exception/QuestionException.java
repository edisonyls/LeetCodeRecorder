package com.yls.ylslc.config.exception;

public class QuestionException extends RuntimeException{
    public QuestionException(String message){
        super(message);
    }

    public QuestionException(String message, Throwable cause){
        super(message, cause);
    }

    public QuestionException(Throwable cause){
        super(cause);
    }
}

package com.yls.ylslc.config.response;

import lombok.Data;
import org.springframework.http.HttpStatus;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

@Data
public class Response {
    private Integer status;
    private String message;
    private String serverMessage;
    private Object data;
    private String timeStamp;
    private Long dataLength;

    public static Response ok(Object data, String message){
        return new Response(data, message);
    }
    public static Response ok(String message){
        return new Response(message);
    }


    public static Response failed(HttpStatus status, String message){
        return new Response(status.value(), message);
    }

    public static Response failed(HttpStatus status, String message, String serverMessage){
        return new Response(status.value(), message, serverMessage);
    }

    public Response(String message){
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        df.setTimeZone(TimeZone.getTimeZone("UTC"));
        this.status = HttpStatus.OK.value();
        this.message = message;
        this.data = null;
        this.timeStamp = df.format(new Date());
        this.serverMessage = "SUCCESS";
    }

    public Response(Object data, String message){
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        df.setTimeZone(TimeZone.getTimeZone("UTC"));
        this.status = HttpStatus.OK.value();
        this.message = message;
        this.data = data;
        this.timeStamp = df.format(new Date());
        this.serverMessage = "SUCCESS";
    }

    public Response(Object data, Long dataLength, String message){
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        df.setTimeZone(TimeZone.getTimeZone("UTC"));
        this.status = HttpStatus.OK.value();
        this.message = message;
        this.data = data;
        this.timeStamp = df.format(new Date());
        this.serverMessage = "SUCCESS";
        this.dataLength = dataLength;
    }

    public static Response ok(Object data, Long dataLength, String message){
        return new Response(data, dataLength, message);
    }

    public Response(Integer status, String message) {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        df.setTimeZone(TimeZone.getTimeZone("UTC"));
        this.status = status;
        this.message = message;
        this.timeStamp = df.format(new Date());
        this.serverMessage = "FAILED";
    }

    public Response(Integer status, String message, String serverMessage) {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        df.setTimeZone(TimeZone.getTimeZone("UTC"));

        this.status = status;
        this.message = message;
        this.serverMessage = serverMessage;
        this.timeStamp = df.format(new Date());
    }

}

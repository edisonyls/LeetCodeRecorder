package com.yls.ylslc.response;

import org.springframework.http.HttpStatus;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

public class Response<T> {
    private int status;
    private String msg;
    private String timeStamp;
    private T data;
    private List<ResponseError> errorDetails;


    public Response(HttpStatus status, T data, List<ResponseError> errorDetails) {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        df.setTimeZone(TimeZone.getTimeZone("UTC"));
        this.status = status.value();
        this.msg = status.name();
        this.timeStamp = df.format(new Date());
        this.data = data;
        this.errorDetails = errorDetails;
    }

    public static <T> Response<T> ok(T data) {
        return new Response<>(HttpStatus.OK, data, null);
    }

    public static <T> Response<T> error(HttpStatus status, List<ResponseError> errorDetails) {
        return new Response<>(status, null, errorDetails);
    }
}


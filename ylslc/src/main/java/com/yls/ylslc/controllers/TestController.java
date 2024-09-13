package com.yls.ylslc.controllers;

import com.yls.ylslc.config.response.Response;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/test")
@CrossOrigin(origins = { "https://ylslc.org", "http://localhost:3000" })
public class TestController {
    @PostMapping
    public Response test(){
        return Response.ok("Test successful");
    }
}

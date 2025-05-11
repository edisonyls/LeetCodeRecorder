package com.yls.ylslc.controllers;

import com.yls.ylslc.config.response.Response;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/test")
@CrossOrigin(origins = { "https://my-website.org", "http://localhost:3000" })
public class TestController {
    @GetMapping
    public Response test(){
        return Response.ok("Test successful");
    }
}

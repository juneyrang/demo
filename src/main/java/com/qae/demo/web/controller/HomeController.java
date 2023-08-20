package com.qae.demo.web.controller;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.UnsupportedEncodingException;

@Controller
@Slf4j
public class HomeController {
    @RequestMapping("/")
    public String home() throws UnsupportedEncodingException {
        return "index.html";
    }

    @RequestMapping("/login")
    public String login() throws UnsupportedEncodingException {
        return "login.html";
    }

}

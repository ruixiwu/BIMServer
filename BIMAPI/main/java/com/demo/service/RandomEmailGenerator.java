package com.demo.service;
import org.springframework.stereotype.Service;
@Service
public class RandomEmailGenerator implements EmailGenerator {
    public String generate() {
        return "feedback@yiibai.com";
    }
}
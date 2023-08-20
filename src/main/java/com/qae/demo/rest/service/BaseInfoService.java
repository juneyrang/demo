package com.qae.demo.rest.service;

import com.qae.demo.entity.FileEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Slf4j
@Service
public class BaseInfoService {

    public Map<String, Object> data() throws Exception {
        try {
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception();
        }
    }
}

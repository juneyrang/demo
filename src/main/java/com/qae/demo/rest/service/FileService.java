package com.qae.demo.rest.service;

import com.qae.demo.entity.FileEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
public class FileService {

    public FileEntity fileUpload(String userId, String fileNo, String path, MultipartFile multipartFile) throws Exception {
        try {
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception();
        }
    }
}

package com.qae.demo.rest.controller;

import com.qae.demo.dto.response.BaseInfoResponse;
import com.qae.demo.dto.response.FileResponse;
import com.qae.demo.rest.service.BaseInfoService;
import com.qae.demo.rest.service.FileService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Tag(name = "FileController", description = "File Upload 관련 api")
@RestController
@RequestMapping("/api/common")
public class CommonController {

    @Autowired
    private BaseInfoService baeInfoService;

    @PostMapping("/data")
    public ResponseEntity<BaseInfoResponse> data() throws Exception {
        return ResponseEntity.ok(BaseInfoResponse.toDTO(baeInfoService.data()));
    }
}

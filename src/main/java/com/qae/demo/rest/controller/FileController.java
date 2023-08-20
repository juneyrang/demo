package com.qae.demo.rest.controller;

import com.qae.demo.dto.response.FileResponse;
import com.qae.demo.rest.service.FileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
@RequestMapping("/api/file")
public class FileController {

    @Autowired
    private FileService fileService;

    /**
     * @ApiParam -> @Parameter
     * @ApiOperation -> @Operation
     * @Api -> @Tag
     * @ApiImplicitParams -> @Parameters
     * @ApiImplicitParam -> @Parameter
     * @ApiIgnore -> @Parameter(hidden = true) or @Operation(hidden = true) or @Hidden
     * @ApiModel -> @Schema
     * @ApiModelProperty -> @Schema
     */
    @Operation(summary = "파일 업로드", description = "파일 업로드.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @Parameters({
            @Parameter(name = "X-AUTH-TOKEN", description = "APP-KEY access_token", required = true),
            @Parameter(name = "userId", description = "회원 ID", required = true, example = "1"),
            @Parameter(name = "fileNo", description = "File 번호", required = true, example = "1"),
            @Parameter(name = "uploadFolder", description = "Upload path", required = true, example = "1"),
            @Parameter(name = "uploadFile", description = "Upload file", required = true, example = "1")
    })
    @PostMapping("/upload")
    public ResponseEntity<FileResponse> fileUpload(
           @RequestParam("userId") String userId,
           @RequestParam("fileNo") String fileNo,
           @RequestParam("uploadFolder") String path,
           @RequestParam("uploadFile") MultipartFile file) throws Exception {
        return ResponseEntity.ok(FileResponse.toDTO(fileService.fileUpload(userId, fileNo, path, file)));
    }
}

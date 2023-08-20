package com.qae.demo.dto.response;

import com.qae.demo.entity.FileEntity;
import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class FileResponse {
    private String fileNo;

    private Integer fileSeq;

    private String fileOrgNm;

    private String fileSize;

    private String filePath;

    public static FileResponse toDTO(FileEntity entity) {
        if (entity == null) return null;
        return FileResponse.builder()
                .fileNo(entity.getFileNo())
                .fileSeq(entity.getFileSeq())
                .fileOrgNm(entity.getFileOrgNm())
                .fileSize(entity.getFileSize())
                .filePath(entity.getFilePath())
                .build();
    }
}

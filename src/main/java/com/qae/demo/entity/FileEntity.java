package com.qae.demo.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@ToString
public class FileEntity implements Serializable {
    private static final long serialVersionUID = 6424226407367161836L;

    private String fileNo;
    private Integer fileSeq;
    private String filePath;
    private String fileType;
    private String fileNm;
    private String fileOrgNm;
    private String fileSize;
    private String addId;
}

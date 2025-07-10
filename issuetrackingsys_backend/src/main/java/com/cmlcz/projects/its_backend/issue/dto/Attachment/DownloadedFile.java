package com.cmlcz.projects.its_backend.issue.dto.Attachment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DownloadedFile {
    private byte[] fileBytes;
    private String contentType;
    private String fileName;
} 
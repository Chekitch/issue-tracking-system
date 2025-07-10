package com.cmlcz.projects.its_backend.issue.dto.Attachment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttachmentResponseDTO {
    private Long id;
    private String fileName;
    private String fileType;
    private Long fileSize;
    private String filePath;
} 
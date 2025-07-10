package com.cmlcz.projects.its_backend.issue.dto.Attachment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttachmentRequestDTO {
    private MultipartFile file;
    private UUID userId;
} 
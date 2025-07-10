package com.cmlcz.projects.its_backend.issue.dto.Attachment;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttachmentRequestDTO {
    @NotNull
    @NotEmpty
    private MultipartFile file;
    private UUID userId;
} 
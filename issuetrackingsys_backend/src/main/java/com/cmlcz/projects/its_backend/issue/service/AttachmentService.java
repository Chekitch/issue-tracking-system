package com.cmlcz.projects.its_backend.issue.service;

import com.cmlcz.projects.its_backend.issue.dto.Attachment.AttachmentRequestDTO;
import com.cmlcz.projects.its_backend.issue.dto.Attachment.AttachmentResponseDTO;
import com.cmlcz.projects.its_backend.issue.dto.Attachment.DownloadedFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface AttachmentService {
    AttachmentResponseDTO saveAttachment(AttachmentRequestDTO requestDTO, UUID issueId) throws IOException;
    AttachmentResponseDTO getAttachmentMetadata(Long id, UUID issueId);
    DownloadedFile downloadAttachment(Long id, UUID issueId);
    List<AttachmentResponseDTO> getAttachmentsByIssueId(UUID issueId);
} 
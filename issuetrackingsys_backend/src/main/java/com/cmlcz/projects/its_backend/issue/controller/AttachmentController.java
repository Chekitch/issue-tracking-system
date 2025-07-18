package com.cmlcz.projects.its_backend.issue.controller;

import com.cmlcz.projects.its_backend.common.constants.ControllerMessages;
import com.cmlcz.projects.its_backend.issue.dto.Attachment.AttachmentDownloadDTO;
import com.cmlcz.projects.its_backend.issue.model.Attachment;
import com.cmlcz.projects.its_backend.issue.service.AttachmentService;
import com.cmlcz.projects.its_backend.issue.dto.Attachment.AttachmentResponseDTO;
import com.cmlcz.projects.its_backend.common.dto.ApiResponse;
import com.cmlcz.projects.its_backend.issue.dto.Attachment.DownloadedFile;
import com.cmlcz.projects.its_backend.issue.dto.Attachment.AttachmentRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;
import java.util.List;

@RestController
@RequestMapping("/api/issues/{issueId}/attachments")
public class AttachmentController {

    private final AttachmentService attachmentService;

    @Autowired
    public AttachmentController(AttachmentService attachmentService) {
        this.attachmentService = attachmentService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<AttachmentResponseDTO>>> getAttachmentsByIssue(@PathVariable UUID issueId) {
        List<AttachmentResponseDTO> attachments = attachmentService.getAttachmentsByIssueId(issueId);
        ApiResponse<List<AttachmentResponseDTO>> response = new ApiResponse<>(attachments, ControllerMessages.LIST_SUCCESS, ControllerMessages.LIST_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AttachmentResponseDTO>> uploadFile(@ModelAttribute AttachmentRequestDTO requestDTO, @PathVariable UUID issueId) throws IOException {

        AttachmentResponseDTO dto = attachmentService.saveAttachment(requestDTO, issueId);
        ApiResponse<AttachmentResponseDTO> response = new ApiResponse<>(dto, "File uploaded successfully", 200);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AttachmentResponseDTO>> getAttachmentMetadata(@PathVariable UUID issueId, @PathVariable Long id) {
        AttachmentResponseDTO dto = attachmentService.getAttachmentMetadata(id, issueId);
        ApiResponse<AttachmentResponseDTO> response = new ApiResponse<>(dto, "Attachment metadata fetched successfully", 200);
        return ResponseEntity.ok(response);
    }

    @GetMapping("{id}/download")
    public ResponseEntity<ApiResponse<AttachmentDownloadDTO>> downloadFile(@PathVariable UUID issueId, @PathVariable Long id) {
        DownloadedFile downloadedFile = attachmentService.downloadAttachment(id, issueId);
        String base64 = Base64.getEncoder().encodeToString(downloadedFile.getFileBytes());

        AttachmentDownloadDTO dto = new AttachmentDownloadDTO(
                base64,
                downloadedFile.getFileName(),
                downloadedFile.getContentType()
        );
        ApiResponse<AttachmentDownloadDTO> response = new ApiResponse<>(dto, "File downloaded successfully", 200);
        return ResponseEntity.ok(response);
    }
} 
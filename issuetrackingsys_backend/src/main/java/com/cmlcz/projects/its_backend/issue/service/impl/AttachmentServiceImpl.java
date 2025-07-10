package com.cmlcz.projects.its_backend.issue.service.impl;

import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.issue.dto.Attachment.AttachmentResponseDTO;
import com.cmlcz.projects.its_backend.issue.dto.Attachment.DownloadedFile;
import com.cmlcz.projects.its_backend.issue.dto.Attachment.AttachmentRequestDTO;
import com.cmlcz.projects.its_backend.issue.model.Attachment;
import com.cmlcz.projects.its_backend.issue.repository.AttachmentRepository;
import com.cmlcz.projects.its_backend.issue.service.AttachmentService;
import com.cmlcz.projects.its_backend.issue.mapper.AttachmentMapper;
import com.cmlcz.projects.its_backend.user.model.User;
import com.cmlcz.projects.its_backend.user.repository.UserRepository;
import com.cmlcz.projects.its_backend.issue.repository.IssueRepository;
import com.cmlcz.projects.its_backend.issue.model.Issue;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttachmentServiceImpl implements AttachmentService {

    private final AttachmentRepository attachmentRepository;
    private final UserRepository userRepository;
    private final IssueRepository issueRepository;
    private final AttachmentMapper attachmentMapper;

    @Value("${attachments.upload.dir:uploads}")
    private String uploadDir;

    public AttachmentServiceImpl(AttachmentRepository attachmentRepository, UserRepository userRepository, 
                                IssueRepository issueRepository, AttachmentMapper attachmentMapper) {
        this.attachmentRepository = attachmentRepository;
        this.userRepository = userRepository;
        this.issueRepository = issueRepository;
        this.attachmentMapper = attachmentMapper;
    }

    @Override
    public AttachmentResponseDTO saveAttachment(AttachmentRequestDTO requestDTO, UUID issueId) throws IOException {
        User user = userRepository.findById(requestDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found"));

        MultipartFile file = requestDTO.getFile();
        String originalFileName = file.getOriginalFilename();
        String uniqueFileName = UUID.randomUUID() + "_" + originalFileName;
        
        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        try {
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to create upload directory: " + uploadPath, e);
        }
        
        Path filePath = uploadPath.resolve(uniqueFileName);
        try {
            file.transferTo(filePath.toFile());
        } catch (IOException e) {
            throw new RuntimeException("Failed to save file: " + originalFileName, e);
        }

        Attachment attachment = attachmentMapper.fromMultipartFile(file);
        attachment.setFilePath(filePath.toString());
        attachment.setUploadedBy(user);
        attachment.setIssue(issue);

        attachmentRepository.save(attachment);

        return attachmentMapper.toDto(attachment);
    }

    @Override
    public AttachmentResponseDTO getAttachmentMetadata(Long id, UUID issueId) {
        Attachment attachment = attachmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attachment not found"));
        
        // Validate that the attachment belongs to the specified issue
        if (!attachment.getIssue().getId().equals(issueId)) {
            throw new ResourceNotFoundException("Attachment not found for the specified issue");
        }
        
        return attachmentMapper.toDto(attachment);
    }

    @Override
    public DownloadedFile downloadAttachment(Long id, UUID issueId) {
        Attachment attachment = attachmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attachment not found"));
        
        // Validate that the attachment belongs to the specified issue
        if (!attachment.getIssue().getId().equals(issueId)) {
            throw new ResourceNotFoundException("Attachment not found for the specified issue");
        }
        
        Path filePath = Paths.get(attachment.getFilePath());
        try {
            byte[] fileBytes = Files.readAllBytes(filePath);
            return new DownloadedFile(fileBytes, attachment.getFileType(), attachment.getFileName());
        } catch (IOException e) {
            throw new RuntimeException("File could not be read", e);
        }
    }

    @Override
    public List<AttachmentResponseDTO> getAttachmentsByIssueId(UUID issueId) {
        List<Attachment> attachments = attachmentRepository.findByIssueId(issueId);
        return attachments.stream()
                .map(attachmentMapper::toDto)
                .collect(Collectors.toList());
    }
} 
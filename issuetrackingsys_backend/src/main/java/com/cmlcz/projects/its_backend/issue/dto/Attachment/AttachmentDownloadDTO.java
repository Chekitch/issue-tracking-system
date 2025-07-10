package com.cmlcz.projects.its_backend.issue.dto.Attachment;

public record AttachmentDownloadDTO(
        String base64Content,
        String fileName,
        String contentType
) {
}

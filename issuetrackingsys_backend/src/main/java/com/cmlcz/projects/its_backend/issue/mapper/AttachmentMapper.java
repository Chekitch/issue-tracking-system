package com.cmlcz.projects.its_backend.issue.mapper;

import com.cmlcz.projects.its_backend.issue.dto.Attachment.AttachmentResponseDTO;
import com.cmlcz.projects.its_backend.issue.model.Attachment;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.web.multipart.MultipartFile;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AttachmentMapper {

    AttachmentResponseDTO toDto(Attachment attachment);

    @Mapping(target = "fileName", expression = "java(file.getOriginalFilename())")
    @Mapping(target = "fileType", expression = "java(file.getContentType())")
    @Mapping(target = "fileSize", expression = "java(file.getSize())")
    Attachment fromMultipartFile(MultipartFile file);
} 
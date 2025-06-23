package com.cmlcz.projects.its_backend.comment.mapper;

import com.cmlcz.projects.its_backend.comment.dto.CommentRequestDTO;
import com.cmlcz.projects.its_backend.comment.dto.CommentResponseDTO;
import com.cmlcz.projects.its_backend.comment.model.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {


    @Mapping(source = "createdBy.id", target = "authorId")
    @Mapping(source = "createdBy.username", target = "authorUsername")
    @Mapping(source = "creationDate", target = "createdAt")
    CommentResponseDTO toDto (Comment comment);

    @Mapping(source = "userId", target = "createdBy.id")
    @Mapping(source="issueId", target = "issue.id")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "creationDate", ignore = true)
    @Mapping(target = "lastModificationDate", ignore = true)
    Comment toEntity(CommentRequestDTO commentDTO);
}

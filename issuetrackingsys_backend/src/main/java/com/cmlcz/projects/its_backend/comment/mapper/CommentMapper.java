package com.cmlcz.projects.its_backend.comment.mapper;

import com.cmlcz.projects.its_backend.comment.dto.CommentRequestDTO;
import com.cmlcz.projects.its_backend.comment.dto.CommentResponseDTO;
import com.cmlcz.projects.its_backend.comment.dto.CommentUpdateDTO;
import com.cmlcz.projects.its_backend.comment.model.Comment;
import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.issue.model.Issue;
import com.cmlcz.projects.its_backend.issue.repository.IssueRepository;
import com.cmlcz.projects.its_backend.user.model.User;
import com.cmlcz.projects.its_backend.user.repository.UserRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

@Mapper(componentModel = "spring")
public abstract class CommentMapper {

    @Autowired private UserRepository userRepository;

    @Autowired private IssueRepository issueRepository;

    @Mapping(source = "createdBy.id", target = "authorId")
    @Mapping(source = "createdBy.username", target = "authorUsername")
    @Mapping(source = "creationDate", target = "createdAt")
    public abstract CommentResponseDTO toDto (Comment comment);

    @Mapping(source = "userId", target = "createdBy", qualifiedByName = "mapUser")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "creationDate", ignore = true)
    @Mapping(target = "lastModificationDate", ignore = true)
    public abstract Comment toEntity(CommentRequestDTO commentDTO);

    public abstract void updateFromDto(CommentUpdateDTO commentUpdateDTO, @MappingTarget Comment comment);

    @Named("mapUser")
    protected User mapUser(UUID id){
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}

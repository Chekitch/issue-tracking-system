package com.cmlcz.projects.its_backend.comment.service.impl;

import com.cmlcz.projects.its_backend.comment.dto.CommentRequestDTO;
import com.cmlcz.projects.its_backend.comment.dto.CommentResponseDTO;
import com.cmlcz.projects.its_backend.comment.mapper.CommentMapper;
import com.cmlcz.projects.its_backend.comment.model.Comment;
import com.cmlcz.projects.its_backend.comment.repository.CommentRepository;
import com.cmlcz.projects.its_backend.comment.service.CommentService;
import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.issue.repository.IssueRepository;
import com.cmlcz.projects.its_backend.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;
    private final UserRepository userRepository;
    private final IssueRepository issueRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, CommentMapper commentMapper, UserRepository userRepository, IssueRepository issueRepository) {
        this.commentRepository = commentRepository;
        this.commentMapper = commentMapper;
        this.userRepository = userRepository;
        this.issueRepository = issueRepository;
    }

    public ArrayList<CommentResponseDTO> getComments() {
        List<Comment> comments = commentRepository.findAll();
        ArrayList<CommentResponseDTO> commentResponseDTOS = new ArrayList<>();
        for (Comment comment : comments) {
            commentResponseDTOS.add(commentMapper.toDto(comment));
        }

        return commentResponseDTOS;
    }

    @Override
    public CommentResponseDTO save(CommentRequestDTO commentRequestDTO) {

        if(!userRepository.existsById(commentRequestDTO.getUserId())){
            throw new ResourceNotFoundException("There is no user with the id : " + commentRequestDTO.getUserId());
        }
        if(!issueRepository.existsById(commentRequestDTO.getIssueId())){
            throw new ResourceNotFoundException("There is no issue with the id : " + commentRequestDTO.getIssueId());
        }

        Comment comment = commentMapper.toEntity(commentRequestDTO);

        commentRepository.save(comment);

        return commentMapper.toDto(comment);
    }

}

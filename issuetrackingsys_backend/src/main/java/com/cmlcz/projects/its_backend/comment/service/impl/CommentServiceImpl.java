package com.cmlcz.projects.its_backend.comment.service.impl;

import com.cmlcz.projects.its_backend.comment.dto.CommentRequestDTO;
import com.cmlcz.projects.its_backend.comment.dto.CommentResponseDTO;
import com.cmlcz.projects.its_backend.comment.dto.CommentUpdateDTO;
import com.cmlcz.projects.its_backend.comment.mapper.CommentMapper;
import com.cmlcz.projects.its_backend.comment.model.Comment;
import com.cmlcz.projects.its_backend.comment.repository.CommentRepository;
import com.cmlcz.projects.its_backend.comment.service.CommentService;
import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.issue.model.Issue;
import com.cmlcz.projects.its_backend.issue.repository.IssueRepository;
import com.cmlcz.projects.its_backend.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
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

    @Override
    public List<CommentResponseDTO> getCommentsByIssueId(UUID issueId) {

        if(!issueRepository.existsById(issueId)){
            throw new ResourceNotFoundException("Issue not found");
        }

        List<Comment> comments = commentRepository.getCommentsByIssueId(issueId);

        return comments.stream()
                .map(commentMapper::toDto)
                .toList();
    }

    @Override
    public CommentResponseDTO createComment(UUID issueId, CommentRequestDTO commentRequestDTO) {

        if(!userRepository.existsById(commentRequestDTO.userId())){
            throw new ResourceNotFoundException("User not found");
        }
        if(!issueRepository.existsById(issueId)){
            throw new ResourceNotFoundException("Issue not found");
        }

        Comment comment = commentMapper.toEntity(commentRequestDTO);
        Issue issue = loadIssueOrFail(issueId);

        comment.setIssue(issue);
        commentRepository.save(comment);
        return commentMapper.toDto(comment);
    }

    @Override
    public CommentResponseDTO getCommentById(Long id) {
        Comment comment = loadCommentOrFail(id);

        return commentMapper.toDto(comment);
    }

    @Override
    public CommentResponseDTO updateComment(Long commentId, UUID issueId, CommentUpdateDTO commentUpdateDTO) {
        Comment comment = loadCommentOrFail(commentId);

        if(!comment.getIssue().getId().equals(issueId)){
            throw new ResourceNotFoundException("Issue not found");
        }

        commentMapper.updateFromDto(commentUpdateDTO, comment);

        return commentMapper.toDto(comment);
    }

    @Override
    public void deleteComment(Long commentId, UUID issueId) {
        Comment comment = loadCommentOrFail(commentId);

        if(!comment.getIssue().getId().equals(issueId)){
            throw new ResourceNotFoundException("Issue not found");
        }
        commentRepository.delete(comment);
    }

    public Comment loadCommentOrFail(Long id){
        return commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found"));
    }
    public Issue loadIssueOrFail(UUID id){
        return issueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found"));
    }

}

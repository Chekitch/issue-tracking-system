package com.cmlcz.projects.its_backend.comment.controller;

import com.cmlcz.projects.its_backend.comment.dto.CommentUpdateDTO;
import com.cmlcz.projects.its_backend.comment.service.CommentService;
import com.cmlcz.projects.its_backend.comment.dto.CommentRequestDTO;
import com.cmlcz.projects.its_backend.comment.dto.CommentResponseDTO;
import com.cmlcz.projects.its_backend.common.constants.ControllerMessages;
import com.cmlcz.projects.its_backend.common.dto.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/issues/{issueId}/comments/")
public class CommentController {


    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CommentResponseDTO>>> getCommentsByIssueId(@PathVariable UUID issueId) {
        List<CommentResponseDTO> comments = commentService.getCommentsByIssueId(issueId);
        ApiResponse<List<CommentResponseDTO>> response = new ApiResponse<>
                (comments, ControllerMessages.LIST_SUCCESS, ControllerMessages.LIST_SUCCESS_CODE);

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CommentResponseDTO>> createComment(@RequestBody @Valid CommentRequestDTO commentRequestDTO,
                                                                         @PathVariable UUID issueId) {


        CommentResponseDTO commentResponseDTO = commentService.createComment(issueId,commentRequestDTO);

        ApiResponse<CommentResponseDTO> response = new ApiResponse<>
                (commentResponseDTO, ControllerMessages.CREATE_SUCCESS, ControllerMessages.CREATE_SUCCESS_CODE);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<ApiResponse<CommentResponseDTO>> getCommentById(@PathVariable Long commentId,
                                                                          @PathVariable UUID issueId) {

        CommentResponseDTO commentResponseDTO = commentService.getCommentById(commentId);
        ApiResponse<CommentResponseDTO> response = new ApiResponse<>
                (commentResponseDTO, ControllerMessages.FETCH_SUCCESS, ControllerMessages.FETCH_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<ApiResponse<CommentResponseDTO>> updateComment(@PathVariable Long commentId,
                                                                         @PathVariable UUID issueId,
                                                                         @RequestBody @Valid CommentUpdateDTO commentUpdateDTO) {
        CommentResponseDTO commentResponseDTO = commentService.updateComment(commentId, issueId, commentUpdateDTO);
        ApiResponse<CommentResponseDTO> response = new ApiResponse<>
                (commentResponseDTO, ControllerMessages.UPDATE_SUCCESS, ControllerMessages.UPDATE_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<ApiResponse<Void>> deleteComment(@PathVariable Long commentId, @PathVariable UUID issueId) {
        commentService.deleteComment(commentId, issueId);
        ApiResponse<Void> response = new ApiResponse<>
                (null, ControllerMessages.DELETE_SUCCESS, ControllerMessages.DELETE_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }
}

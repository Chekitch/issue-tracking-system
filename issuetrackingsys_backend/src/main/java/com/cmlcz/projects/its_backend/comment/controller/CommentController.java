package com.cmlcz.projects.its_backend.comment.controller;

import com.cmlcz.projects.its_backend.comment.service.CommentService;
import com.cmlcz.projects.its_backend.comment.dto.CommentRequestDTO;
import com.cmlcz.projects.its_backend.comment.dto.CommentResponseDTO;
import com.cmlcz.projects.its_backend.common.dto.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/comments/")
public class CommentController {


    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<ArrayList<CommentResponseDTO>>> getComments() {
        ArrayList<CommentResponseDTO> comments = commentService.getComments();
        ApiResponse<ArrayList<CommentResponseDTO>> response = new ApiResponse<ArrayList<CommentResponseDTO>>(comments, "OK", 200);

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CommentResponseDTO>> save(@RequestBody @Valid CommentRequestDTO commentRequestDTO) {


        CommentResponseDTO commentResponseDTO = commentService.save(commentRequestDTO);

        ApiResponse<CommentResponseDTO> response = new ApiResponse<CommentResponseDTO>(commentResponseDTO, "OK", 200);

        return ResponseEntity.ok(response);
    }
}

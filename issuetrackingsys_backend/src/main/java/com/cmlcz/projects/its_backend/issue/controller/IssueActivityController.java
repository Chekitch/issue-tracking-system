package com.cmlcz.projects.its_backend.issue.controller;

import com.cmlcz.projects.its_backend.common.constants.ControllerMessages;
import com.cmlcz.projects.its_backend.common.dto.ApiResponse;
import com.cmlcz.projects.its_backend.issue.dto.IssueActivity.IssueActivityCreateDTO;
import com.cmlcz.projects.its_backend.issue.dto.IssueActivity.IssueActivityDTO;
import com.cmlcz.projects.its_backend.issue.dto.IssueActivity.IssueActivityUpdateDTO;
import com.cmlcz.projects.its_backend.issue.model.IssueActivity;
import com.cmlcz.projects.its_backend.issue.service.IssueActivityService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/issues/{issueId}/activities")
public class IssueActivityController {

    private final IssueActivityService issueActivityService;

    @Autowired
    public IssueActivityController(IssueActivityService issueActivityService) {
        this.issueActivityService = issueActivityService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<IssueActivityDTO>>> getIssueActivity(@PathVariable UUID issueId) {
        List<IssueActivityDTO> issueActivityDTOs = issueActivityService.getIssueActivitiesByIssue(issueId);
        ApiResponse<List<IssueActivityDTO>> response = new ApiResponse<>
                (issueActivityDTOs, ControllerMessages.LIST_SUCCESS, ControllerMessages.LIST_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<IssueActivityDTO>> createIssueActivity(@RequestBody IssueActivityCreateDTO issueActivityCreateDTO, @PathVariable UUID issueId) {
        IssueActivityDTO issueActivityDTO = issueActivityService.createIssueActivity(issueId, issueActivityCreateDTO);
        ApiResponse<IssueActivityDTO> response = new ApiResponse<>
                (issueActivityDTO, ControllerMessages.CREATE_SUCCESS, ControllerMessages.CREATE_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<IssueActivityDTO>> getIssueActivityByIdAndIssueId(@PathVariable Long id, @PathVariable UUID issueId) {
        IssueActivityDTO issueActivityDTO = issueActivityService.getIssueActivityByIdAndIssueId(id, issueId);
        ApiResponse<IssueActivityDTO> response = new ApiResponse<>
                (issueActivityDTO, ControllerMessages.FETCH_SUCCESS, ControllerMessages.FETCH_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<IssueActivityDTO>> updateIssueActivity(@RequestBody @Valid IssueActivityUpdateDTO issueActivityUpdateDTO,
                                                                             @PathVariable Long id, @PathVariable UUID issueId) {
        IssueActivityDTO issueActivityDTO = issueActivityService.updateIssueActivity(id, issueId, issueActivityUpdateDTO);
        ApiResponse<IssueActivityDTO> response = new ApiResponse<>
                (issueActivityDTO, ControllerMessages.UPDATE_SUCCESS, ControllerMessages.UPDATE_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteIssueActivity(@PathVariable Long id, @PathVariable UUID issueId) {
        issueActivityService.deleteIssueActivity(id, issueId);
        ApiResponse<Void> response = new ApiResponse<>
                (null, ControllerMessages.DELETE_SUCCESS, ControllerMessages.DELETE_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

}

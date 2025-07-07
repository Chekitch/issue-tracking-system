package com.cmlcz.projects.its_backend.issue.controller;

import com.cmlcz.projects.its_backend.common.constants.ControllerMessages;
import com.cmlcz.projects.its_backend.common.dto.ApiResponse;
import com.cmlcz.projects.its_backend.issue.dto.Issue.IssueCreateDTO;
import com.cmlcz.projects.its_backend.issue.dto.Issue.IssueDTO;
import com.cmlcz.projects.its_backend.issue.dto.Issue.IssueUpdateDTO;
import com.cmlcz.projects.its_backend.issue.service.IssueService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class IssueController {


    private final IssueService issueService;

    @Autowired
    public IssueController(IssueService issueService){
        this.issueService = issueService;
    }

    @GetMapping("/sub-projects/{subId}/issues")
    public ResponseEntity<ApiResponse<List<IssueDTO>>> getAllIssuesBySubProject(@PathVariable UUID subId){
        List<IssueDTO> issueDTOs = issueService.getAllIssuesBySubProject(subId);
        ApiResponse<List<IssueDTO>> response = new ApiResponse<>
                (issueDTOs, ControllerMessages.LIST_SUCCESS, ControllerMessages.LIST_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/sub-projects/{subId}/issues")
    public ResponseEntity<ApiResponse<IssueDTO>> createIssue(@PathVariable UUID subId, @RequestBody IssueCreateDTO issueCreateDTO){
        IssueDTO issueDTO = issueService.createIssue(subId, issueCreateDTO);
        ApiResponse<IssueDTO> response = new ApiResponse<>
                (issueDTO, ControllerMessages.CREATE_SUCCESS, ControllerMessages.CREATE_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/issues/{issueId}")
    public ResponseEntity<ApiResponse<IssueDTO>> updateIssue(@PathVariable UUID issueId, @RequestBody @Valid IssueUpdateDTO issueUpdateDTO){
        IssueDTO issueDTO = issueService.updateIssue(issueId, issueUpdateDTO);
        ApiResponse<IssueDTO> response = new ApiResponse<>
                (issueDTO, ControllerMessages.UPDATE_SUCCESS, ControllerMessages.UPDATE_SUCCESS_CODE);
        return ResponseEntity.ok(response);

    }

    @DeleteMapping("/issues/{issueId}")
    public ResponseEntity<ApiResponse<Void>> deleteIssue(@PathVariable UUID issueId){
        issueService.deleteIssue(issueId);
        ApiResponse<Void> response = new ApiResponse<>
                (null, ControllerMessages.DELETE_SUCCESS, ControllerMessages.DELETE_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }


}

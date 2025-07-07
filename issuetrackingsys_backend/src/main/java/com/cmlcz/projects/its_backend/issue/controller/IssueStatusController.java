package com.cmlcz.projects.its_backend.issue.controller;

import com.cmlcz.projects.its_backend.common.constants.ControllerMessages;
import com.cmlcz.projects.its_backend.common.controller.BaseController;
import com.cmlcz.projects.its_backend.common.dto.ApiResponse;
import com.cmlcz.projects.its_backend.issue.dto.IssueStatus.IssueStatusRequestDTO;
import com.cmlcz.projects.its_backend.issue.dto.IssueStatus.IssueStatusDTO;
import com.cmlcz.projects.its_backend.issue.service.IssueStatusService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issue-statuses")
public class IssueStatusController extends BaseController<IssueStatusRequestDTO, IssueStatusDTO, Long> {

    private final IssueStatusService issueStatusService;

    @Autowired
    public IssueStatusController(IssueStatusService issueStatusService) {
        this.issueStatusService = issueStatusService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<IssueStatusDTO>>> getAllIssueStatuses() {
        List<IssueStatusDTO> issueStatusDTOList = issueStatusService.getAllIssueStatuses();
        ApiResponse<List<IssueStatusDTO>> response = new ApiResponse<>
                (issueStatusDTOList, ControllerMessages.LIST_SUCCESS, ControllerMessages.LIST_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<IssueStatusDTO>> createIssueStatus(@Valid @RequestBody IssueStatusRequestDTO issueStatusRequestDTO) {
        IssueStatusDTO issueStatusDTO = issueStatusService.createIssueStatus(issueStatusRequestDTO);
        ApiResponse<IssueStatusDTO> response = new ApiResponse<>
                (issueStatusDTO, ControllerMessages.CREATE_SUCCESS, ControllerMessages.CREATE_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<IssueStatusDTO>> getIssueStatus(@PathVariable Long id) {
        IssueStatusDTO issueStatusDTO = issueStatusService.getIssueStatusById(id);
        ApiResponse<IssueStatusDTO> response = new ApiResponse<>
                (issueStatusDTO, ControllerMessages.FETCH_SUCCESS, ControllerMessages.FETCH_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<IssueStatusDTO>>  updateIssueStatus(@Valid @RequestBody IssueStatusRequestDTO issueStatusRequestDTO,
                                                                          @PathVariable Long id) {
        IssueStatusDTO issueStatusDTO = issueStatusService.updateIssueStatus(id, issueStatusRequestDTO);
        ApiResponse<IssueStatusDTO> response = new ApiResponse<>
                (issueStatusDTO, ControllerMessages.UPDATE_SUCCESS, ControllerMessages.UPDATE_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteIssueStatus(@Valid @PathVariable Long id) {
        issueStatusService.deleteIssueStatus(id);
        ApiResponse<Void> response = new ApiResponse<>
                (null,  ControllerMessages.DELETE_SUCCESS, ControllerMessages.DELETE_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }
}

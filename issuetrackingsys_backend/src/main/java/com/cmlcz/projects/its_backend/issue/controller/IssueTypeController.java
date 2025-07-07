package com.cmlcz.projects.its_backend.issue.controller;

import com.cmlcz.projects.its_backend.common.constants.ControllerMessages;
import com.cmlcz.projects.its_backend.common.dto.ApiResponse;
import com.cmlcz.projects.its_backend.issue.dto.IssueType.IssueTypeDTO;
import com.cmlcz.projects.its_backend.issue.dto.IssueType.IssueTypeRequestDTO;
import com.cmlcz.projects.its_backend.issue.service.IssueTypeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issue-types")
public class IssueTypeController {

    private final IssueTypeService issueTypeService;

    @Autowired
    public IssueTypeController(IssueTypeService issueTypeService) {
        this.issueTypeService = issueTypeService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<IssueTypeDTO>>> getAllIssueTypes() {
        List<IssueTypeDTO> issueTypeDTOs = issueTypeService.getAllIssueTypes();
        ApiResponse<List<IssueTypeDTO>> response = new ApiResponse<>
                (issueTypeDTOs, ControllerMessages.LIST_SUCCESS, ControllerMessages.LIST_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<IssueTypeDTO>> createIssueType(@RequestBody @Valid IssueTypeRequestDTO issueTypeRequestDTO) {
        IssueTypeDTO issueTypeDTO = issueTypeService.createIssueType(issueTypeRequestDTO);
        ApiResponse<IssueTypeDTO> response = new ApiResponse<>
                (issueTypeDTO, ControllerMessages.CREATE_SUCCESS, ControllerMessages.CREATE_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<IssueTypeDTO>> getIssueTypeById(@PathVariable Long id) {
        IssueTypeDTO issueTypeDTO = issueTypeService.getIssueTypeById(id);
        ApiResponse<IssueTypeDTO> response = new ApiResponse<>
                (issueTypeDTO, ControllerMessages.FETCH_SUCCESS, ControllerMessages.FETCH_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<IssueTypeDTO>> updateIssueType(@RequestBody @Valid IssueTypeRequestDTO issueTypeRequestDTO,
                                                                     @PathVariable Long id) {
        IssueTypeDTO issueTypeDTO = issueTypeService.update(id,issueTypeRequestDTO);
        ApiResponse<IssueTypeDTO> response = new ApiResponse<>
                (issueTypeDTO, ControllerMessages.UPDATE_SUCCESS, ControllerMessages.UPDATE_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteIssueType(@PathVariable Long id) {

        issueTypeService.deleteIssueType(id);
        ApiResponse<Void> response = new ApiResponse<>
                (null, ControllerMessages.DELETE_SUCCESS, ControllerMessages.DELETE_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }
}

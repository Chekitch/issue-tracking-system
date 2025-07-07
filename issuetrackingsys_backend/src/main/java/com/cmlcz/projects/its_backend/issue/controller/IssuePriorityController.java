package com.cmlcz.projects.its_backend.issue.controller;

import com.cmlcz.projects.its_backend.common.constants.ControllerMessages;
import com.cmlcz.projects.its_backend.common.controller.BaseController;
import com.cmlcz.projects.its_backend.common.dto.ApiResponse;
import com.cmlcz.projects.its_backend.issue.dto.IssuePriority.IssuePriorityDTO;
import com.cmlcz.projects.its_backend.issue.dto.IssuePriority.IssuePriorityRequestDTO;
import com.cmlcz.projects.its_backend.issue.service.IssuePriorityService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issue-priorities")
public class IssuePriorityController extends BaseController<IssuePriorityRequestDTO, IssuePriorityDTO, Long> {


    private final IssuePriorityService issuePriorityService;

    @Autowired
    public IssuePriorityController(IssuePriorityService issuePriorityService){
        this.issuePriorityService = issuePriorityService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<IssuePriorityDTO>>> getAllIssuePriorities(){
        List<IssuePriorityDTO> issuePriorityDTOs = issuePriorityService.getAllIssuePriorities();
        ApiResponse<List<IssuePriorityDTO>> response = new ApiResponse<>
                (issuePriorityDTOs, ControllerMessages.LIST_SUCCESS, ControllerMessages.LIST_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<IssuePriorityDTO>> createIssuePriority(@RequestBody @Valid IssuePriorityRequestDTO issuePriorityRequestDTO){
        IssuePriorityDTO issuePriorityDTO = issuePriorityService.createIssuePriority(issuePriorityRequestDTO);
        ApiResponse<IssuePriorityDTO> response = new ApiResponse<>
                (issuePriorityDTO, ControllerMessages.CREATE_SUCCESS, ControllerMessages.CREATE_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<IssuePriorityDTO>> getIssuePriorityById(@PathVariable Long id){
        IssuePriorityDTO issuePriorityDTO = issuePriorityService.getIssuePriorityById(id);
        ApiResponse<IssuePriorityDTO> response = new ApiResponse<>
                (issuePriorityDTO, ControllerMessages.FETCH_SUCCESS, ControllerMessages.FETCH_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<IssuePriorityDTO>> updateIssuePriority(@RequestBody @Valid IssuePriorityRequestDTO issuePriorityRequestDTO,
                                                                             @PathVariable Long id){
        IssuePriorityDTO issuePriorityDTO = issuePriorityService.updateIssuePriority(issuePriorityRequestDTO, id);
        ApiResponse<IssuePriorityDTO> response = new ApiResponse<>
                (issuePriorityDTO, ControllerMessages.UPDATE_SUCCESS, ControllerMessages.UPDATE_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteIssuePriority(@PathVariable Long id){
        issuePriorityService.deleteIssuePriority(id);
        ApiResponse<Void> response = new ApiResponse<>
                (null, ControllerMessages.DELETE_SUCCESS, ControllerMessages.DELETE_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }



}

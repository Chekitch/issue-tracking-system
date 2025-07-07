package com.cmlcz.projects.its_backend.subproject.controller;

import com.cmlcz.projects.its_backend.common.constants.ControllerMessages;
import com.cmlcz.projects.its_backend.common.dto.ApiResponse;
import com.cmlcz.projects.its_backend.subproject.dto.SubProjectCreateDTO;
import com.cmlcz.projects.its_backend.subproject.dto.SubProjectResponseDTO;
import com.cmlcz.projects.its_backend.subproject.dto.SubProjectUpdateDTO;
import com.cmlcz.projects.its_backend.subproject.service.SubProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/sub-projects")
public class SubProjectController {

    
    private final SubProjectService subProjectService;

    @Autowired
    public SubProjectController(SubProjectService subProjectService){
        this.subProjectService = subProjectService;
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<List<SubProjectResponseDTO>>> getSubProjectsByParent(@RequestParam UUID parentId) {

        List<SubProjectResponseDTO> responseDTOS= subProjectService.findByParentProjectId(parentId);
        ApiResponse<List<SubProjectResponseDTO>> response = new ApiResponse<>
                (responseDTOS,  ControllerMessages.LIST_SUCCESS, ControllerMessages.LIST_SUCCESS_CODE);

        return ResponseEntity.ok(response);
    }

    @PostMapping()
    public ResponseEntity<ApiResponse<SubProjectResponseDTO>> createSubProject(@RequestBody @Valid SubProjectCreateDTO subProjectCreateDTO, @RequestParam UUID parentId) {
        SubProjectResponseDTO subProjectResponseDTO = subProjectService.createUnderParent(subProjectCreateDTO, parentId);

        ApiResponse<SubProjectResponseDTO> apiResponse = new ApiResponse<>
                (subProjectResponseDTO, ControllerMessages.CREATE_SUCCESS, ControllerMessages.CREATE_SUCCESS_CODE);

        return ResponseEntity.ok(apiResponse);

    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SubProjectResponseDTO>> getSubProjectById(@PathVariable UUID id) {
        SubProjectResponseDTO subProjectResponseDTO = subProjectService.findById(id);
        ApiResponse<SubProjectResponseDTO> response = new ApiResponse<>
                (subProjectResponseDTO, ControllerMessages.FETCH_SUCCESS, ControllerMessages.CREATE_SUCCESS_CODE);
        return ResponseEntity.ok(response);

    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<SubProjectResponseDTO>> updateSubProject(@RequestBody @Valid SubProjectUpdateDTO subProjectUpdate, @PathVariable UUID id){
        SubProjectResponseDTO subProjectResponseDTO = subProjectService.update(id, subProjectUpdate);

        ApiResponse<SubProjectResponseDTO> apiResponse = new ApiResponse<>
                (subProjectResponseDTO, ControllerMessages.UPDATE_SUCCESS, ControllerMessages.UPDATE_SUCCESS_CODE);

        return ResponseEntity.ok(apiResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSubProject(@PathVariable UUID id){
        subProjectService.deleteById(id);

        ApiResponse<Void> apiResponse = new ApiResponse<>
                (null, ControllerMessages.DELETE_SUCCESS, ControllerMessages.DELETE_SUCCESS_CODE);

        return ResponseEntity.ok(apiResponse);

    }


}

package com.cmlcz.projects.its_backend.parentproject.controller;

import com.cmlcz.projects.its_backend.common.controller.BaseController;
import com.cmlcz.projects.its_backend.common.dto.ApiResponse;
import com.cmlcz.projects.its_backend.parentproject.service.ParentProjectService;
import com.cmlcz.projects.its_backend.parentproject.dto.ParentProjectCreateDTO;
import com.cmlcz.projects.its_backend.parentproject.dto.ParentProjectResponseDTO;
import com.cmlcz.projects.its_backend.parentproject.dto.ParentProjectUpdateDTO;
import com.cmlcz.projects.its_backend.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/parent-projects")
public class ParentProjectController extends BaseController<ParentProjectCreateDTO,ParentProjectResponseDTO, UUID>{

    private final ParentProjectService parentProjectService;
    private final UserService userService;

    @Autowired
    public ParentProjectController(ParentProjectService parentProjectService, UserService userService) {
        this.parentProjectService = parentProjectService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ParentProjectResponseDTO>>> getAllParentProjects(){
        List<ParentProjectResponseDTO> responseDTOs = parentProjectService.findAll();
        ApiResponse<List<ParentProjectResponseDTO>> response = new ApiResponse<>(responseDTOs, "Fetched All Parent Projects", 200);
        return ResponseEntity.ok(response);

    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ParentProjectResponseDTO>> getParentProjectById(@PathVariable UUID id){
        ParentProjectResponseDTO responseDTO = parentProjectService.findById(id);
        ApiResponse<ParentProjectResponseDTO> response = new ApiResponse<>(responseDTO, "Fetched Parent Project", 200);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ParentProjectResponseDTO>> createParentProject(@RequestBody @Valid ParentProjectCreateDTO requestDTO) {

        ParentProjectResponseDTO responseDTO = parentProjectService.create(requestDTO);

        ApiResponse<ParentProjectResponseDTO> response = new ApiResponse<>(
                responseDTO,
                "Parent project created successfully",
                HttpStatus.CREATED.value()
        );

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ParentProjectResponseDTO>> updateParentProject(@PathVariable UUID id,@RequestBody @Valid ParentProjectUpdateDTO requestDTO) {

        ParentProjectResponseDTO responseDTO = parentProjectService.update(id,requestDTO);
        ApiResponse<ParentProjectResponseDTO> response = new ApiResponse<>(responseDTO, "Updated Parent Project", 200);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Boolean>> deleteParentProject(@PathVariable UUID id) {
        boolean responseDTO = parentProjectService.deleteById(id);
        ApiResponse<Boolean> response = new ApiResponse<>(responseDTO, "Deleted Parent Project", 200);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}

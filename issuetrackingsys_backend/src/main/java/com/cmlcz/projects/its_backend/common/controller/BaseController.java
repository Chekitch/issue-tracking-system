package com.cmlcz.projects.its_backend.common.controller;

import com.cmlcz.projects.its_backend.common.dto.ApiResponse;
import com.cmlcz.projects.its_backend.common.service.BaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

public abstract class BaseController<ReqDTO, ResDTO, ID>{

    protected BaseService<ReqDTO,ResDTO, ID> baseService;

    public BaseController() {}

    public BaseController(BaseService<ReqDTO,ResDTO, ID> baseService){
        this.baseService = baseService;
     }


}

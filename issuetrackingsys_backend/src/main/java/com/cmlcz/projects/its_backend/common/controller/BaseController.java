package com.cmlcz.projects.its_backend.common.controller;

import com.cmlcz.projects.its_backend.common.service.BaseService;

public abstract class BaseController<ReqDTO, ResDTO, ID>{

    protected BaseService<ReqDTO,ResDTO, ID> baseService;

    public BaseController() {}

    public BaseController(BaseService<ReqDTO,ResDTO, ID> baseService){
        this.baseService = baseService;
     }


}

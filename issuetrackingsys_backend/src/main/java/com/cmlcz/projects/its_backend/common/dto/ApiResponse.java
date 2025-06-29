package com.cmlcz.projects.its_backend.common.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ApiResponse<T> {

    private T data;
    private String message;
    private int statusCode;

    public ApiResponse(T data, String message, int statusCode){
        this.data = data;
        this.message = message;
        this.statusCode = statusCode;
    }

}

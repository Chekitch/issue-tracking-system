package com.cmlcz.projects.its_backend.common.dto;

public record ApiResponse<T>(T data, String message, int statusCode){

}

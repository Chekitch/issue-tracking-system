package com.cmlcz.projects.its_backend.common.exception;

public class ResourceAlreadyExistsException extends RuntimeException {

    public ResourceAlreadyExistsException(String message) {
        super(message);
    }
    public ResourceAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }
}

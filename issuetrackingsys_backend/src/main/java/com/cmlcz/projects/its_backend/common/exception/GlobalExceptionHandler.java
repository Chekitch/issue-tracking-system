package com.cmlcz.projects.its_backend.common.exception;

import com.cmlcz.projects.its_backend.common.dto.ErrorResponse;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.fasterxml.jackson.databind.exc.MismatchedInputException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
public class    GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND.value());

        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleResourceAlreadyExistsException(ResourceAlreadyExistsException ex, WebRequest request) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), HttpStatus.CONFLICT.value());

        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationErrors(
            MethodArgumentNotValidException ex,
            WebRequest request) {

        List<String> errorMessages = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(fe -> fe.getField() + ": " + fe.getDefaultMessage())
                .collect(Collectors.toList());

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("title", "Validation Failed");
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("errors", errorMessages);
        body.put("detail", String.join("; ", errorMessages));
        body.put("instance", request.getDescription(false).replace("uri=", ""));

        return new ResponseEntity<>(body,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidFormatException.class)
    public ResponseEntity<Map<String,Object>> handleInvalidFormat(InvalidFormatException ex, WebRequest request) {
        String field = ex.getPath().isEmpty() ? "unknown" : ex.getPath().getFirst().getFieldName();
        String invalidValue = ex.getValue() != null ? ex.getValue().toString() : "null";
        String expectedType = ex.getTargetType().getSimpleName();

        String detail = String.format(
                "Field '%s' received invalid value '%s'. Expected a valid %s.",
                field, invalidValue, expectedType
        );

        Map<String,Object> body = new LinkedHashMap<>();
        body.put("title", "Invalid format in request body");
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("detail", detail);
        body.put("invalidField", field);
        body.put("invalidValue", invalidValue);
        body.put("expectedType", expectedType);
        body.put("instance", request.getDescription(false).replace("uri=", ""));

        return new ResponseEntity<>(body,HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(MismatchedInputException.class)
    public ResponseEntity<Map<String,Object>> handleMismatchedInput(MismatchedInputException ex, WebRequest request) {
        String field = ex.getPath().isEmpty() ? "unknown" : ex.getPath().getFirst().getFieldName();
        String expectedType = ex.getTargetType() != null
                ? ex.getTargetType().getSimpleName()
                : "expected structure";

        String detail = String.format(
                "Field '%s' could not be parsed. Expected structure matching type %s, but found incompatible format.",
                field, expectedType
        );

        Map<String,Object> body = new LinkedHashMap<>();
        body.put("title", "Invalid format in request body");
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("detail", detail);
        body.put("invalidField", field);
        body.put("expectedType", expectedType);
        body.put("instance", request.getDescription(false).replace("uri=", ""));

        return new ResponseEntity<>(body,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MissingServletRequestPartException.class)
    public ResponseEntity<ErrorResponse> handleMissingServletRequestPartException(MissingServletRequestPartException ex, WebRequest request) {
        String detail = String.format("Required part '%s' is not present in the request.", ex.getRequestPartName());
        ErrorResponse error = new ErrorResponse(detail, HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}

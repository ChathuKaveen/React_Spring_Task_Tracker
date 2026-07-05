package com.task_management.Task.Management.controllers;

import com.task_management.Task.Management.exceptions.UserAlreadyExisist;
import com.task_management.Task.Management.exceptions.UserNotFound;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UserAlreadyExisist.class)
    public ResponseEntity<Map<String , String>> leaveDayTypeNotFoundExceptionHandler(){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error" , "User already exist"));
    }

    @ExceptionHandler(UserNotFound.class)
    public ResponseEntity<Map<String , String>> userNotFoundExceptionHandler(){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error" , "User Not Found"));
    }
}

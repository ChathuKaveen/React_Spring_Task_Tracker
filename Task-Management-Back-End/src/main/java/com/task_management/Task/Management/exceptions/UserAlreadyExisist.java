package com.task_management.Task.Management.exceptions;

public class UserAlreadyExisist extends RuntimeException {
    public UserAlreadyExisist(String message) {
        super(message);
    }
}

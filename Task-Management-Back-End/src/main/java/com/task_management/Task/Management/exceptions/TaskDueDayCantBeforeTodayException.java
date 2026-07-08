package com.task_management.Task.Management.exceptions;

public class TaskDueDayCantBeforeTodayException extends RuntimeException {
    public TaskDueDayCantBeforeTodayException(String message) {
        super(message);
    }
}

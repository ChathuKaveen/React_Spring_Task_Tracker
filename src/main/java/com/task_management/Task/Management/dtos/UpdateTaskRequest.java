package com.task_management.Task.Management.dtos;

import com.task_management.Task.Management.enums.TaskStatus;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class UpdateTaskRequest {
    private String title;
    private String description;
    private TaskStatus status = TaskStatus.PENDING;
    private LocalDate dueDate;
}

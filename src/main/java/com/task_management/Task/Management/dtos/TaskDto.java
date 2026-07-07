package com.task_management.Task.Management.dtos;

import com.task_management.Task.Management.entities.User;
import com.task_management.Task.Management.enums.TaskStatus;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class TaskDto {
    private Long id;
    private String title;
    private String description;
    private TaskStatus status = TaskStatus.PENDING;
    private LocalDateTime dueDate;
    private TaskResponseDto owner;
//    private LocalDateTime createdAt;
//    private LocalDateTime updatedAt;
}

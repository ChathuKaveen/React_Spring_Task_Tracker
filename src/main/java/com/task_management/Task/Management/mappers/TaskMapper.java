package com.task_management.Task.Management.mappers;

import com.task_management.Task.Management.dtos.RegisterTaskRequest;
import com.task_management.Task.Management.dtos.TaskDto;
import com.task_management.Task.Management.entities.Task;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    TaskDto toDto(Task t);
    Task toEntity(RegisterTaskRequest request);
}

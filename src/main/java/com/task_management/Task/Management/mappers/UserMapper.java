package com.task_management.Task.Management.mappers;

import com.task_management.Task.Management.dtos.RegisterUserRequest;
import com.task_management.Task.Management.dtos.UserDto;
import com.task_management.Task.Management.entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDto(User u);
    User toEntity(RegisterUserRequest request);
}

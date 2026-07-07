package com.task_management.Task.Management.controllers;

import com.task_management.Task.Management.dtos.RegisterTaskRequest;
import com.task_management.Task.Management.services.TaskService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/task")
@AllArgsConstructor
public class TaskController {

    private final TaskService taskService;
    @PostMapping
    public ResponseEntity<?> createLeaveDayType(@Valid @RequestBody RegisterTaskRequest request , UriComponentsBuilder uriBuilder){
        var response = taskService.createTask(request);
        var uri = uriBuilder.path("/task/{id}").buildAndExpand(response.getId()).toUri();
        return ResponseEntity.created(uri).body(response);
    }
}

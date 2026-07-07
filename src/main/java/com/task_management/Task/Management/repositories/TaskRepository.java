package com.task_management.Task.Management.repositories;

import com.task_management.Task.Management.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task , Long> {
}

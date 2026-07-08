package com.task_management.Task.Management.entities;

import com.task_management.Task.Management.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false , name = "name")
    private String name;
    @Column(nullable = false , name = "email")
    private String email;
    @Column(nullable = false , name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;
    @Column(nullable = false , name = "password")
    private String password;
}

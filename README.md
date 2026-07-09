<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>

<h1>📝 Full-Stack Task Tracker Application</h1>

<p>A secure, real-time, full-stack Task Tracker application built using <strong>Spring Boot (Java)</strong> and <strong>React (JavaScript)</strong>. The system implements secure Token-Based JWT Authentication alongside Role-Based Access Control (RBAC) to separate ordinary user permissions from full administrative system visibility.</p>

<p>This repository uses a monorepo layout containing both individual application tiers and a consolidated <strong>Docker Compose</strong> setup for rapid deployment utilizing environment configuration files.</p>

<hr>

<h2>🏗️ Architecture &amp; Core Features</h2>
<ul>
    <li><strong>Backend API:</strong> Built with Spring Boot, Spring Security (JWT), and Spring Data JPA.</li>
    <li><strong>Frontend Client:</strong> Built with React, utilizing Vite, React Router, and Axios.</li>
    <li><strong>Database Persistence Layer:</strong> Powered by MySQL 8.0.</li>
    <li><strong>Real-Time Task Updates:</strong> Implemented using <strong>WebSockets with STOMP protocol</strong> to broadcast live task changes (creations, edits, or deletions) instantly across all connected user dashboards without requiring page refreshes.</li>
</ul>

<hr>

<h2>🔑 Pre-configured Admin Credentials</h2>
<p>For testing and evaluation purposes, use the following pre-existing administrative credentials:</p>
<ul>
    <li><strong>Email / Username:</strong> <code>13@gg.com</code></li>
    <li><strong>Password:</strong> <code>12</code></li>
</ul>

<hr>

<h2>🚀 Local Setup Instructions (Using Docker Compose)</h2>

<h3>1. Configure Environment Variables</h3>
<p>Before launching the containers, you need to create your environment configuration file from the provided template:</p>
<ol>
    <li>In the project root directory, look for the <code>.env.example</code> file.</li>
    <li>Duplicate it or rename it to <code>.env</code>:
        <pre><code>cp .env.example .env</code></pre>
    </li>
    <li>Open the newly created <code>.env</code> file and make sure the parameters (such as your secure JWT Token Secret) are set correctly. Docker Compose automatically references this file to inject properties into your application runtime.</li>
</ol>

<h3>2. Bring up the Containers</h3>
<p>From the root folder where your <code>docker-compose.yml</code> file is located, run the following command to build and launch all services:</p>
<pre><code>docker compose up --build -d</code></pre>
<p>This will initialize three isolated bridge network services:</p>
<ul>
    <li><strong>MySQL Database:</strong> Bound locally to port <code>3307</code></li>
    <li><strong>Spring Boot Backend:</strong> Bound locally to port <code>8080</code></li>
    <li><strong>React Frontend:</strong> Bound locally to port <code>80</code></li>
</ul>

<h3>3. Critical Database Initialization (Schema Import)</h3>
<p>Because automated Hibernate schema migrations do not execute initially due to database startup constraints, you <strong>must</strong> manually import the provided SQL export dump file using one of the following two options:</p>

<h4>Option A: Database Import via MySQL Workbench / Client (Recommended)</h4>
<ol>
    <li>Open <strong>MySQL Workbench</strong> or your preferred database client.</li>
    <li>Establish a new connection using the following configurations:
        <ul>
            <li><strong>Hostname:</strong> <code>127.0.0.1</code> (or <code>localhost</code>)</li>
            <li><strong>Port:</strong> <code>3307</code></li>
            <li><strong>Username:</strong> <code>root</code></li>
            <li><strong>Password:</strong> <code>root</code></li>
        </ul>
    </li>
    <li>Once connected, open the provided <code>db_export.sql</code> database export file included in this repository.</li>
    <li>Execute the entire script to generate the required <code>task_tracker</code> schema tables and insert initial test data.</li>
</ol>

<h4>Option B: Manual Local Setup (Alternative)</h4>
<p>If you prefer not to use Docker, ensure a native instance of MySQL is running on your machine on default port <code>3306</code>, create a database named <code>task_tracker</code>, configure your local database credentials inside the backend's <code>pom.xml</code> / properties settings, and seed the schema manually.</p>

<hr>

<h2>📂 Project Structure</h2>
<pre><code>.
├── Task-Management-Back-End/     # Spring Boot Source Code &amp; Dockerfile
├── Task-Management-Front-End/    # React Web Application &amp; Dockerfile
├── Postman/                      # Postman JSON Collection Export Files
├── .env.example                  # Environment Configuration Template Example
├── .env                          # Local Environment Configuration File (Ignored by Git)
├── db_export.sql                 # MySQL Schema Initialization Dump
└── docker-compose.yml            # Parent Orchestration Deployment Template</code></pre>

<hr>

<h2>📂 API Testing via Postman</h2>
<p>A complete <strong>Postman Collection</strong> is provided within the <code>/Postman</code> folder of the repository root.</p>
<ol>
    <li>Import the collection JSON file directly into Postman.</li>
    <li>Execute the <strong>Login</strong> request using the admin credentials (<code>13@gg.com</code> / <code>12</code>).</li>
    <li>The collection includes a post-execution test script that automatically captures the returned JWT token and stores it inside an active collection variable environment context (<code>{{jwt_token}}</code>), letting you run all other protected endpoints seamlessly without manual copy-pasting.</li>
</ol>

<hr>

<h2>🔒 Role-Based Access Control (RBAC) Model</h2>
<p>The application strictly secures task states based on user accounts:</p>
<table>
    <thead>
        <tr>
            <th>Feature Matrix</th>
            <th>User Role (<code>ROLE_USER</code>)</th>
            <th>Admin Role (<code>ROLE_ADMIN</code>)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Task Actions</strong></td>
            <td>Create, view, update, and delete <strong>only their own</strong> tasks.</td>
            <td>View, modify, and delete <strong>any task</strong> globally across the organization.</td>
        </tr>
        <tr>
            <td><strong>System Visibility</strong></td>
            <td>Restricted entirely to personal resources.</td>
            <td>Complete access to view all systemic application records.</td>
        </tr>
    </tbody>
</table>

<hr>

<h2>💡 Engineering &amp; Design Decisions</h2>
<h3>1. WebSockets with STOMP Over Polling</h3>
<p>To satisfy the real-time update requirements, <strong>WebSockets with STOMP</strong> were chosen instead of standard periodic API HTTP polling. Polling creates substantial server connection overhead and processing delays. WebSockets maintain a single lightweight TCP connection pipeline, serving live events to clients instantly upon data mutations.</p>

<h3>2. Secured Ownership Check Architecture</h3>
<p>While global administrators can execute methods on paths like <code>/task/all-tasks</code>, individual endpoint operations (<code>PUT</code>, <code>DELETE</code>) are validated at the method/service layer using explicit ownership controls. This checks that an ordinary user cannot alter or delete tasks belonging to other accounts simply by tampering with path parameter IDs.</p>

</body>
</html>

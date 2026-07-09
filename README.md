<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>

    <h1>📝 Full-Stack Task Tracker Application (Dockerized)</h1>
    <p>A secure, real-time, full-stack Task Tracker application built using <strong>Spring Boot (Java)</strong>, <strong>React (JavaScript)</strong>, and <strong>MySQL</strong>. The system implements secure Token-Based JWT Authentication alongside Role-Based Access Control (RBAC) to isolate standard user boundaries from full administrative privileges.</p>

    <hr />

    <h2>🏗️ Architecture & Core Features</h2>
    <ul>
        <li><strong>Backend Service:</strong> Spring Boot API layer utilizing Spring Security, JWT, and Spring Data JPA.</li>
        <li><strong>Frontend Service:</strong> React client optimized via Vite, React Router, and Axios. Built and served via Nginx.</li>
        <li><strong>Database Layer:</strong> Relational persistence managed inside a isolated MySQL container.</li>
        <li><strong>Real-Time Updates:</strong> Implemented via <strong>WebSockets with STOMP protocol</strong> to broadcast live task mutations immediately across connected browser clients without requiring page polling.</li>
    </ul>

    <hr />

    <h2>📂 Monorepo Directory Structure</h2>
    <pre>
├── Task-Management-Back-End/   # Spring Boot Project Source & Dockerfile
├── Task-Management-Front-End/  # React Project Source & Dockerfile
├── Postman/                    # Postman Collection JSON Exports
├── database/                   # Contains task_tracker.sql (Database Dump)
└── docker-compose.yml          # Root orchestration pipeline configuration
    </pre>

    <hr />

    <h2>🚀 Quick Start & Environment Setup</h2>

    <h3>Option A: Automated Deployment via Docker Compose (Recommended)</h3>
    <p>Ensure you have Docker and Docker Compose installed locally, then execute the following steps:</p>

    <h4>1. Build and Start the Containers</h4>
    <p>Run this command from the root directory to spin up the network, database volume, and services:</p>
    <pre><code>docker compose up --build -d</code></pre>

    <h4>2. CRITICAL STEP: Manual Database Schema Import</h4>
    <p>Because automated JPA/Hibernate migrations are restricted by internal network constraints during container instantiation, you <strong>must</strong> manually import the initial database structure and seed data before testing.</p>
    
    <p>The MySQL instance is exposed securely to your host machine on port <strong><code>3307</code></strong>. Choose one of the following methods to initialize it:</p>

    <h5>Method 1: via MySQL Workbench / TablePlus (GUI)</h5>
    <ul>
        <li>Open your preferred SQL client tool.</li>
        <li>Establish a new connection using these parameters:
            <ul>
                <li><strong>Host:</strong> <code>127.0.0.1</code> or <code>localhost</code></li>
                <li><strong>Port:</strong> <code>3307</code> <em>(Note: Internal container maps 3306 to 3307 on your host)</em></li>
                <li><strong>Username:</strong> <code>root</code></li>
                <li><strong>Password:</strong> <code>root</code></li>
                <li><strong>Database:</strong> <code>task_tracker</code></li>
            </ul>
        </li>
        <li>Open and execute the SQL script provided inside the <code>/database/task_tracker.sql</code> file to build the initial schema and populate user data.</li>
    </ul>

    <h5>Method 2: via Command Line (CLI)</h5>
    <p>If you have a local MySQL client utility installed on your terminal, execute the following direct pipeline import command from the project root:</p>
    <pre><code>mysql -h 127.0.0.1 -P 3307 -u root -proot task_tracker &lt; ./database/task_tracker.sql</code></pre>

    <hr />

    <h3>Option B: Local Native Setup (Fallback)</h3>
    <p>If you prefer running the application outside of Docker container runtimes, follow this layout:</p>
    <ol>
        <li>Configure a local native MySQL server instance using the database properties defined in your backend's <code>pom.xml</code> / <code>application.properties</code> files.</li>
        <li>Import the <code>/database/task_tracker.sql</code> schema script manually.</li>
        <li>Run the Spring Boot application locally via your IDE or command terminal: <code>mvn spring-boot:run</code>.</li>
        <li>Install dependencies and start the React app locally: <code>npm install && npm run dev</code>.</li>
    </ol>

    <hr />

    <h2>🔑 Seeded Authentication Credentials</h2>
    <p>The database dump contains pre-configured test profiles to instantly bypass authorization testing setup configurations:</p>
    
    <table border="1" cellpadding="6" cellspacing="0">
        <thead>
            <tr style="background-color: #f2f2f2;">
                <th>Role Type</th>
                <th>Username / Email Address</th>
                <th>Plain-text Password</th>
                <th>Permissions Context</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>System Administrator</strong></td>
                <td><code>13@gg.com</code></td>
                <td><code>12</code></td>
                <td>Authorized to view and manage tasks for all global accounts.</td>
            </tr>
            <tr>
                <td><strong>Standard User</strong></td>
                <td><em>Register via UI</em></td>
                <td><em>Configured on registration</em></td>
                <td>Isolated completely to personal task actions (CRUD own records).</td>
            </tr>
        </tbody>
    </table>

    <hr />

    <h2>🌐 Service Access Ports Mapping</h2>
    <p>Once the docker compose orchestrator changes state to active, the individual application points can be reached via your browser:</p>
    <ul>
        <li><strong>Frontend Application Interface:</strong> <a href="http://localhost" target="_blank">http://localhost</a> (Port <code>80</code>)</li>
        <li><strong>Backend Rest API Target:</strong> <a href="http://localhost:8080" target="_blank">http://localhost:8080</a> (Port <code>8080</code>)</li>
        <li><strong>External Database Port Connection:</strong> <code>localhost:3307</code></li>
    </ul>

    <hr />

    <h2>📂 API Documentation via Postman</h2>
    <p>The complete, test-ready <strong>Postman Collection</strong> can be found inside the <code>/Postman</code> folder. Import this JSON directly into Postman to test all endpoints. The collection contains automated pre-request scripts that save returning JWT tokens to collection context automatically upon a successful administrative login request.</p>

</body>
</html>
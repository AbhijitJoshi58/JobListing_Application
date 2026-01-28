--> Job Listing Application

A full-stack job portal where companies can post job openings and job seekers can browse and search jobs.
This project demonstrates role-based authentication, secure REST APIs, and integration of SQL + NoSQL databases in a real-world application architecture.

--> Project Goal

This project was built to practice and demonstrate:
Secure authentication using Spring Security + JWT
Role-based access control (COMPANY vs JOB SEEKER)
Full-stack integration between React frontend and Spring Boot backend
Using MySQL for relational user data and MongoDB for job post storage
Designing a production-style REST API

-->Features

->Authentication & Authorization
User registration and login
JWT-based authentication
Role-based access control

->Company Role

Create job posts
View only their own job listings
Update job posts
Delete job posts (owner-only access)

-> Job Seeker Role

View all job listings
Search jobs by keyword

--> Tech Stack
->Frontend

React (Vite)
React Router
Axios
CSS

->Backend

Spring Boot
Spring Security + JWT
Spring Data JPA (MySQL)
Spring Data MongoDB

->Databases

MySQL → Stores user credentials and roles
MongoDB → Stores job posts

-->System Architecture

React Frontend  →  Spring Boot REST API  →  MySQL (Users)
                                   ↘
                                    → MongoDB (Job Posts)

                                    

-->Project Structure

```text
JobListing_Application
│
├── backend
│   ├── auth        - Security, JWT, login & registration
│   ├── controller  - REST API endpoints
│   ├── service     - Business logic
│   ├── repository  - Database access layer
│   ├── model       - Entity & document classes
│   └── resources   - application.properties
│
├── frontend
│   ├── pages       - Application screens
│   ├── components  - Reusable UI parts
│   ├── api         - Axios configuration
│   └── auth        - Route protection logic
│
└── screenshots     - README images
```





-->Backend Setup (Spring Boot)
->Prerequisites
Java 21
Maven
MySQL Server
MongoDB (Atlas)   


                                    
# MongoDB
spring.data.mongodb.uri=YOUR_MONGODB_URI
spring.data.mongodb.database=JobListing

# MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/LoginDetails
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT Secret
jwt.secret=YOUR_SECRET_KEY



-->Authentication Flow
User registers or logs in
Backend generates a JWT token
Frontend stores the token
Token sent in request header
Backend validates token and role before granting access


| Method | Endpoint    | Description                    |
| ------ | ----------- | ------------------------------ |
| POST   | `/register` | Register a new user            |
| POST   | `/login`    | Authenticate user & return JWT |



| Method | Endpoint        | Access  | Description        |
| ------ | --------------- | ------- | ------------------ |
| GET    | `/allposts`     | Public  | Get all job posts  |
| GET    | `/posts/{text}` | Public  | Search jobs        |
| POST   | `/addpost`      | COMPANY | Create job post    |
| GET    | `/myposts`      | COMPANY | View own job posts |
| PUT    | `/update/{id}`  | COMPANY | Update job post    |
| DELETE | `/delete/{id}`  | COMPANY | Delete job post    |



-->Future Improvements

Job application system
Resume upload & parsing
Advanced search filters (location, salary, skills)
Pagination for job listings
Admin dashboard
Email notifications



-->Author
Abhijit Joshi
Full Stack Java Developer

# Learning Support Platform Case Study

## Overview

Learning Support Platform is a fullstack web application designed to help high school students organize their study materials, track completed materials, and ask questions through an AI Study Assistant.

I built this project as a portfolio project to practice real software engineering fundamentals: identifying a user problem, designing a solution, building a fullstack application, connecting a database, protecting routes, deploying the system, and documenting the development process.

---

## Problem

High school students often prepare for exams using scattered learning resources such as notes, files, websites, and class materials. This makes it harder to quickly find the right material and continue studying consistently.

Another problem is progress tracking. Students may forget which materials they have already completed, especially when studying multiple subjects.

This project focuses on two main questions:

1. How can students access structured learning materials in one place?
2. How can students track their learning progress more clearly?

---

## Target User

The main users are high school students who need a simple learning dashboard for exam preparation.

User needs include:

- Access learning materials in one place
- Find materials based on subject or keyword
- See difficulty and study duration before opening material
- Read structured material content
- Track completed materials
- Ask simple questions when they need extra explanation

---

## My Role

My role in this project was **Fullstack Developer**.

I worked on:

- Frontend implementation using React and Vite
- Backend REST API using Node.js and Express.js
- MongoDB data modeling using Mongoose
- JWT authentication and protected route middleware
- User-based progress tracking
- AI Study Assistant integration using Gemini API through the backend
- Frontend-backend integration using Axios
- Deployment setup for frontend and backend using Vercel
- Manual testing and portfolio documentation

---

## Solution

The solution is a web-based learning platform where students can register, log in, browse learning materials, view material details, mark materials as completed, and ask questions through an AI Study Assistant.

The main solution includes:

### 1. Authentication System

Students can create an account and log in. The backend returns a JWT token, which is used to access protected routes.

### 2. Learning Dashboard

The dashboard displays learning materials, subject filters, search input, total materials, completed materials, and estimated study duration.

### 3. Material Detail Page

Students can open a material to read structured content and view related materials from the same subject.

### 4. Progress Tracking

Students can mark materials as completed. The backend stores progress per authenticated user, so each student has their own progress data.

### 5. AI Study Assistant

Students can ask questions about available learning materials. The backend retrieves material context from MongoDB, sends the question and context to Gemini API, and returns an answer with related material sources.

---

## Architecture

```txt
Student
  |
  v
React + Vite Web App
  |
  v
Express.js REST API
  |
  |-- JWT Authentication Middleware
  |-- Auth Controller
  |-- Material Controller
  |-- Progress Controller
  |-- AI Controller
  |
  v
MongoDB Atlas

External AI Service:
Express Backend -> Gemini API
```

The main data relationship is:

```txt
User -> Progress -> Material
```

This structure allows each student to have their own completed materials and learning progress.

---

## Key Technical Decisions

### JWT for Authentication

JWT was used because it is simple to implement for a portfolio project and works well with protected API routes.

### Separate Frontend and Backend

The frontend and backend are separated to practice real API-based application architecture.

### MongoDB for Flexible Learning Materials

MongoDB was used because learning material data can contain flexible fields such as topics, content, difficulty, subject, and duration.

### Backend-Based AI Integration

The AI API is called only from the backend so the API key is not exposed to the frontend.

---

## Challenges

### 1. CORS in Production

When the frontend and backend were deployed separately, the browser blocked requests because the backend had not allowed the frontend domain.

**Solution:** I configured allowed origins using the `CLIENT_ORIGIN` environment variable.

### 2. Environment Variable Management

The project needs different environment variables for local development and deployment.

**Solution:** I created `.env.example` files and configured real values only in local/deployment environments.

### 3. User-Based Progress Tracking

Progress tracking required a clear relationship between users and materials.

**Solution:** I created a `Progress` model that connects `user` and `material`, then stores status, progress percentage, and timestamps.

### 4. AI Context Handling

The AI assistant should not answer without context from the platform.

**Solution:** The backend retrieves available materials from MongoDB and sends them as context before generating an answer.

### 5. Error Handling

AI services may fail because of quota, billing, or API errors.

**Solution:** I added backend error handling so the application returns a readable message instead of crashing.

---

## What I Learned

Through this project, I learned how to:

- Build a fullstack web application from idea to deployment
- Create REST API routes with Express.js
- Design MongoDB models using Mongoose
- Implement authentication using JWT
- Protect API routes using middleware
- Connect React frontend with backend API
- Store user-specific progress data
- Debug frontend-backend integration problems
- Handle CORS and environment variables in production
- Integrate an AI API safely from the backend
- Write documentation that explains both product thinking and technical decisions

This project helped me understand that software development is not only about writing code. It also requires understanding user problems, making technical decisions, testing flows, documenting the system, and improving the product step by step.

---

## Future Improvements

Possible future improvements:

- Add progress percentage charts
- Add bookmarks or saved materials
- Add learning streaks
- Add admin dashboard for managing materials
- Add role-based access control
- Add unit and integration tests
- Add API documentation using Postman or Swagger
- Improve AI answer formatting
- Improve authentication security using httpOnly cookies
- Add profile editing feature

---

## Summary

Learning Support Platform is a fullstack web application that helps students access structured materials, track learning progress, and ask questions through an AI Study Assistant.

This project represents my learning journey in building a practical software product that combines frontend development, backend API design, database modeling, authentication, deployment, and AI integration.

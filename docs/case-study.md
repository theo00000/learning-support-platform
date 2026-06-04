# Learning Support Platform Case Study

## Problem

High school students often need a simple and organized way to access learning materials, especially when preparing for exams. In many cases, learning resources are scattered across different platforms, notes, files, or websites. This makes it harder for students to quickly find the right material based on subject, difficulty, and available study time.

Another problem is that students often lose track of which materials they have already completed. Without a progress tracking system, it becomes harder for them to continue learning consistently and plan their next study session.

Learning Support Platform was created to solve these problems by providing a centralized learning dashboard where students can access structured materials, filter by subject, search by keyword, view material details, and track completed learning materials.

---

## Target User

The main target users are high school students who are preparing for exams and need a simple platform to manage their study materials.

The user needs include:

- Accessing learning materials in one place
- Finding materials based on subject
- Understanding material difficulty before studying
- Knowing estimated study duration
- Tracking which materials have been completed
- Continuing learning more consistently

---

## My Role

My role in this project was **Fullstack Developer**.

I worked on the main parts of the system, including:

- Designing the web frontend using React and Vite
- Building the backend REST API using Express.js
- Creating MongoDB models with Mongoose
- Implementing JWT-based authentication
- Creating protected routes for authenticated users
- Building a mobile version using Expo React Native
- Connecting frontend and mobile apps to the backend API
- Adding learning progress tracking
- Deploying the backend and frontend using Vercel
- Debugging production issues such as CORS, environment variables, and mobile-to-backend connection problems

---

## Solution

Learning Support Platform provides a fullstack learning system where students can register, login, browse learning materials, view material details, and mark materials as completed.

The main solution includes:

- **Authentication system**
  Students can register and login securely using JWT authentication.

- **Learning dashboard**
  Students can view available materials from different subjects.

- **Search and filter feature**
  Students can search materials by keyword and filter them by subject.

- **Material detail page**
  Students can open each material and read structured learning content.

- **Progress tracking**
  Students can mark materials as completed, and the system stores progress per authenticated user.

- **Cross-platform access**
  The project supports both web and mobile applications.

---

## Architecture

The project uses a fullstack architecture with separate backend, web frontend, and mobile app folders.

```txt
User
 ├── Web App: React + Vite
 └── Mobile App: Expo React Native
          |
          v
Express.js REST API
          |
          ├── JWT Authentication
          ├── Routes and Controllers
          ├── Progress Tracking Logic
          └── Mongoose ODM
          |
          v
MongoDB Atlas
```

The main data relationship for progress tracking is:

```txt
User → Enrollment / Progress → Material
```

This relationship allows each student to have their own progress data for each learning material.

The system is deployed using:

- **Vercel** for the web frontend
- **Vercel** for the backend API
- **MongoDB Atlas** for the cloud database

---

## Challenges

During development, I faced several challenges:

### 1. Connecting mobile app to local backend

The mobile app could not use `localhost` directly because the mobile device and laptop have different network contexts. I learned how to use the laptop IP address for physical device testing and `10.0.2.2` for Android Emulator.

### 2. Handling CORS in production

After deploying the frontend and backend to Vercel, the frontend was blocked by CORS because the backend did not allow the frontend domain. I fixed this by configuring `CLIENT_ORIGIN` in the backend environment variables.

### 3. Managing environment variables

The project uses different environment variables for local development and production. I learned how to manage `.env` files locally and environment variables in Vercel.

### 4. Keeping data consistent across backend and frontend

Some fields needed to stay consistent between backend models, frontend forms, and mobile screens. I learned the importance of naming consistency, especially for user data, material data, and progress data.

### 5. Implementing user-based progress tracking

Progress tracking required a new data relationship between users and materials. I implemented an Enrollment model to store each user's completed material status.

---

## What I Learned

Through this project, I learned how to:

- Build a fullstack web application
- Build REST API using Express.js
- Connect backend with MongoDB using Mongoose
- Implement JWT authentication
- Protect API routes using middleware
- Connect React frontend with backend API
- Build a mobile app using Expo React Native
- Store authentication sessions on web and mobile
- Design user-based progress tracking
- Deploy frontend and backend using Vercel
- Debug CORS issues in production
- Debug mobile-to-backend network issues
- Manage environment variables in local and production environments
- Structure a project for better maintainability

This project also helped me understand that software engineering is not only about writing code, but also about solving problems, designing clear system structure, debugging real issues, and improving user experience.

---

## Future Improvements

There are several improvements that can be added in the future:

- Add progress percentage visualization
- Add bookmark or saved materials feature
- Add admin dashboard for managing learning materials
- Add role-based access control for admin and student users
- Add user profile editing
- Add learning history
- Add unit and integration testing
- Add API documentation using Postman or Swagger
- Improve mobile UI and animations
- Improve authentication security using httpOnly cookies or secure token storage
- Add better error handling and empty states

---

## Summary

Learning Support Platform is a fullstack web and mobile learning application built to help students access structured learning materials and track their study progress.

This project represents my learning journey in software engineering, especially in building a product from problem identification, system design, backend API development, frontend implementation, mobile development, deployment, and production debugging.

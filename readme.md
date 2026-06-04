# Learning Support Platform

**Learning Support Platform** is a fullstack web and mobile learning application designed to help high school students access structured learning materials based on subject, difficulty, study goals, and personal learning progress.

This project was built as a software engineering portfolio project to practice fullstack development, authentication flow, REST API integration, database modeling, deployment, cross-platform user experience, and user-based progress tracking.

---

## Live Demo

- **Web App:** https://learning-support-platform-4q3x.vercel.app
- **Backend API Health Check:** https://learning-support-platform-six.vercel.app/api/health

---

## Problem Statement

High school students often need a simple and organized way to access learning materials, especially when preparing for exams. Learning resources can be scattered across different platforms, making it harder for students to find the right material based on subject, difficulty, and available study time.

Another common problem is that students often lose track of which materials they have already completed. Without progress tracking, it becomes harder to plan study sessions and continue learning consistently.

Learning Support Platform was created to solve this problem by providing a centralized learning dashboard where students can access structured materials, filter by subject, search by keyword, view detailed learning content, and track completed materials.

---

## Project Overview

Learning Support Platform provides students with an accessible platform to register, login, browse learning materials, filter materials by subject, open detailed learning content, and mark materials as completed.

The project consists of three main parts:

- **Backend API** built with Node.js, Express.js, MongoDB, and JWT authentication
- **Web Frontend** built with React and Vite
- **Mobile App** built with Expo React Native

---

## Features

### Authentication

- Student registration
- Student login
- JWT-based authentication
- Protected routes
- Persistent session on web and mobile
- Logout functionality

### Learning Materials

- List of learning materials
- Material detail page
- Search materials by keyword
- Filter materials by subject
- Difficulty badge
- Duration information
- Related materials by subject

### Learning Progress

- Mark material as completed
- Reset completed material progress
- View completed material count on dashboard
- Store progress per authenticated user
- Track relationship between user and material

### Platform Support

- Web application
- Mobile application
- REST API backend
- MongoDB database integration
- Deployed backend and frontend using Vercel

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs
- CORS
- dotenv

### Web Frontend

- React
- Vite
- React Router
- Axios
- CSS

### Mobile App

- Expo
- React Native
- React Navigation
- Axios
- AsyncStorage

### Deployment

- Vercel for web frontend
- Vercel for backend API
- MongoDB Atlas for cloud database

---

## Project Structure

```txt
learning-support-platform/
├── Back-end/
│   ├── config/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── materialController.js
│   │   ├── lessonController.js
│   │   └── progressController.js
│   ├── middleware/
│   ├── models/
│   │   ├── User.js
│   │   ├── Material.js
│   │   ├── Lesson.js
│   │   └── Enrollment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── materialRoutes.js
│   │   ├── lessons.js
│   │   └── progressRoutes.js
│   ├── .env.example
│   ├── package.json
│   ├── seed.js
│   └── server.js
│
├── Front-end/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   └── package.json
│
├── my-learning-app/
│   ├── src/
│   │   ├── context/
│   │   ├── screens/
│   │   ├── services/
│   │   └── styles/
│   ├── App.js
│   ├── app.json
│   └── package.json
│
├── docs/
│   ├── register.png
│   ├── dashboard.png
│   ├── material-detail.png
│   └── mobile-dashboard.png
│
└── README.md
```

---

## System Architecture

```mermaid
flowchart LR
    U[User / Student]

    subgraph Client Side
        W[Web App<br/>React + Vite]
        M[Mobile App<br/>Expo React Native]
    end

    subgraph Server Side
        API[Express.js REST API]
        AUTH[JWT Authentication]
        ROUTES[Routes / Controllers]
        PROGRESS[Progress Tracking Logic]
        DBLAYER[Mongoose ODM]
    end

    subgraph Database
        USER[(User Collection)]
        MATERIAL[(Material Collection)]
        ENROLLMENT[(Enrollment / Progress Collection)]
    end

    subgraph Deployment
        VF[Vercel Frontend]
        VB[Vercel Backend]
        MDB[(MongoDB Atlas)]
    end

    U --> W
    U --> M

    W --> API
    M --> API

    API --> AUTH
    API --> ROUTES
    ROUTES --> PROGRESS
    ROUTES --> DBLAYER

    DBLAYER --> USER
    DBLAYER --> MATERIAL
    DBLAYER --> ENROLLMENT

    USER --> MDB
    MATERIAL --> MDB
    ENROLLMENT --> MDB

    W --> VF
    API --> VB
```

The web frontend and mobile app communicate with the backend through REST API endpoints. Authentication is handled using JWT tokens, which are stored locally on the client side.

The progress tracking feature introduces a relationship between authenticated users and learning materials through an enrollment/progress model.

---

## Request Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend as Web / Mobile Frontend
    participant API as Express Backend
    participant DB as MongoDB Atlas

    User->>Frontend: Register / Login / Access Materials
    Frontend->>API: Send HTTP Request with JWT Token
    API->>API: Validate Token
    API->>DB: Read / Write Data
    DB-->>API: Return Query Result
    API-->>Frontend: Return JSON Response
    Frontend-->>User: Display Dashboard / Material Detail / Progress
```

---

## Authentication Flow

```mermaid
flowchart TD
    A[User Register / Login] --> B[Frontend Form]
    B --> C[POST /api/auth/register or /api/auth/login]
    C --> D[Express Backend]
    D --> E[Validate Input]
    E --> F[Check / Create User in MongoDB]
    F --> G[Generate JWT Token]
    G --> H[Return Token + User Data]
    H --> I[Frontend Stores Token]
    I --> J[Access Protected Dashboard and Materials]
```

---

## Learning Progress Flow

```mermaid
flowchart TD
    A[Student Opens Dashboard] --> B[Frontend Fetches Materials]
    B --> C[Frontend Fetches User Progress]
    C --> D[Dashboard Displays Completed Count]
    D --> E[Student Clicks Mark Done]
    E --> F[POST /api/progress/:materialId/complete]
    F --> G[Backend Validates JWT Token]
    G --> H[Backend Creates or Updates Progress Record]
    H --> I[MongoDB Stores User-Material Progress]
    I --> J[Frontend Refreshes Progress Data]
    J --> K[Dashboard Updates Completed Status]
```

---

## Data Relationship

```mermaid
erDiagram
    USER ||--o{ ENROLLMENT : tracks
    MATERIAL ||--o{ ENROLLMENT : belongs_to

    USER {
        ObjectId _id
        string name
        string email
        string password
        string grade
        string school
        string role
    }

    MATERIAL {
        ObjectId _id
        string title
        string subject
        string category
        string description
        string difficulty
        number duration
        array topics
        string content
    }

    ENROLLMENT {
        ObjectId _id
        ObjectId user
        ObjectId material
        string status
        Date completedAt
    }
```

---

## API Endpoints

### Auth Routes

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| POST   | `/api/auth/register` | Register a new student         |
| POST   | `/api/auth/login`    | Login student                  |
| GET    | `/api/auth/me`       | Get current authenticated user |

### Material Routes

| Method | Endpoint           | Description                |
| ------ | ------------------ | -------------------------- |
| GET    | `/api/courses`     | Get all learning materials |
| GET    | `/api/courses/:id` | Get material detail by ID  |

### Lesson Routes

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| GET    | `/api/lessons`     | Get all lessons   |
| GET    | `/api/lessons/:id` | Get lesson detail |
| POST   | `/api/lessons`     | Create lesson     |
| PUT    | `/api/lessons/:id` | Update lesson     |
| DELETE | `/api/lessons/:id` | Delete lesson     |

### Progress Routes

| Method | Endpoint                             | Description                          |
| ------ | ------------------------------------ | ------------------------------------ |
| GET    | `/api/progress`                      | Get current user's learning progress |
| POST   | `/api/progress/:materialId/complete` | Mark material as completed           |
| DELETE | `/api/progress/:materialId`          | Reset material progress              |

---

## Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/theo00000/learning-support-platform.git
cd learning-support-platform
```

---

## Backend Setup

Go to backend folder:

```bash
cd Back-end
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```bash
cp .env.example .env
```

Fill your `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
CLIENT_ORIGIN=http://localhost:5173
```

Seed database:

```bash
npm run seed
```

Run backend server:

```bash
npm run dev
```

Backend will run on:

```txt
http://localhost:5000
```

Health check:

```txt
GET http://localhost:5000/api/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "learning-support-platform-api"
}
```

---

## Web Frontend Setup

Go to frontend folder:

```bash
cd Front-end
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```bash
cp .env.example .env
```

Fill your `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

Frontend will run on:

```txt
http://localhost:5173
```

---

## Mobile App Setup

Go to mobile folder:

```bash
cd my-learning-app
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```bash
cp .env.example .env
```

For Android Emulator:

```env
EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:5000/api
```

For physical phone using Expo Go:

```env
EXPO_PUBLIC_API_BASE_URL=http://YOUR_LAPTOP_IP:5000/api
```

Example:

```env
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.3:5000/api
```

Run mobile app:

```bash
npm start
```

For Android:

```bash
npm run android
```

---

## Important Notes for Mobile Development

If you are testing with a physical phone:

1. Make sure laptop and phone are connected to the same WiFi.
2. Backend must listen on `0.0.0.0`.
3. Use your laptop IP address, not `localhost`.
4. Allow port `5000` through firewall if needed.
5. Restart Expo after changing `.env`.

---

## Environment Variables

### Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
CLIENT_ORIGIN=http://localhost:5173
```

### Web Frontend `.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Mobile `.env`

```env
EXPO_PUBLIC_API_BASE_URL=http://YOUR_BACKEND_IP:5000/api
```

---

## Deployment

### Backend Deployment

The backend is deployed on Vercel.

Required environment variables:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_random_secret_key
CLIENT_ORIGIN=https://your_frontend_domain.vercel.app
```

Backend health check:

```txt
https://learning-support-platform-six.vercel.app/api/health
```

### Frontend Deployment

The frontend is deployed on Vercel.

Required environment variable:

```env
VITE_API_BASE_URL=https://learning-support-platform-six.vercel.app/api
```

### CORS Configuration

The backend uses `CLIENT_ORIGIN` to allow requests from the frontend domain.

Example:

```env
CLIENT_ORIGIN=http://localhost:5173,https://learning-support-platform-4q3x.vercel.app
```

---

## Screenshots

### Register Page

![Register Page](docs/register.png)

### Dashboard

![Dashboard](docs/dashboard.png)

### Material Detail

![Material Detail](docs/material-detail.png)

### Mobile Dashboard

![Mobile Dashboard](docs/mobile-dashboard.png)

---

## What I Learned

Through this project, I learned how to:

- Build REST API using Express.js
- Connect backend with MongoDB using Mongoose
- Implement JWT authentication
- Hash passwords using bcryptjs
- Protect API routes with middleware
- Connect React frontend with backend API
- Build a mobile app using Expo React Native
- Store authentication sessions on web and mobile
- Structure a fullstack project more maintainably
- Build user-based progress tracking with MongoDB relationships
- Deploy frontend and backend using Vercel
- Debug CORS issues in production
- Debug network issues between mobile app and local backend
- Manage environment variables across local and production environments

---

## Software Engineering Focus

This project focuses on more than just coding. It also emphasizes:

- Clear folder structure
- Separation of concerns
- Route-controller-model backend pattern
- API-based application flow
- Authentication and authorization basics
- Data consistency between frontend, backend, and mobile
- User-to-material progress relationship
- Error handling and loading states
- Environment variable management
- Deployment and production debugging
- Portfolio-ready documentation

---

## Future Improvements

Planned improvements:

- Improve progress visualization with percentage charts
- Add learning streaks or weekly study summary
- Add bookmark or saved materials feature
- Add admin dashboard for managing materials
- Add role-based access control
- Add unit and integration testing
- Add API documentation using Postman or Swagger
- Improve mobile UI animations
- Add profile editing feature
- Add secure token handling improvement for production usage

---

## Project Status

This project is currently under active development as a software engineering portfolio project.

Current status:

```txt
Backend API         : Completed basic version
Web Frontend        : Completed basic version
Mobile App          : Completed basic version
Authentication      : Implemented
Material Dashboard  : Implemented
Material Detail     : Implemented
Progress Tracking   : Implemented
Deployment          : Implemented
```

---

## Security Notes

This project uses JWT for authentication. For learning and portfolio purposes, tokens are stored locally on the client side.

For a production-level application, future improvements may include:

- Using httpOnly cookies for web authentication
- Using more secure storage for mobile tokens
- Adding refresh token handling
- Adding stronger role-based authorization
- Adding rate limiting for authentication routes

---

## Author

**Wesly Rismahadi**

- GitHub: [github.com/theo00000](https://github.com/theo00000)
- Instagram: [@wslyadm](https://instagram.com/wslyadm)

---

## Portfolio Description

Learning Support Platform is a fullstack web and mobile application designed to help students access structured learning materials and track completed study materials. I built this project to practice software engineering fundamentals such as authentication, REST API integration, MongoDB data modeling, protected routing, deployment, user-based progress tracking, and cross-platform application development.

This project represents my learning journey in building practical digital products that solve real user problems.

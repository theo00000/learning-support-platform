# Testing Documentation

This document contains manual testing results for the Learning Support Platform project. The purpose of testing is to ensure that the main user flow works correctly: registration, login, protected dashboard access, learning material browsing, progress tracking, AI assistant usage, and logout.

---

## Testing Environment

- Platform: Web Browser
- Frontend: React + Vite
- Backend: Express.js REST API
- Database: MongoDB Atlas
- Authentication: JWT-based authentication
- Deployment: Vercel

---

## Manual Test Summary

| Feature            | Status |
| ------------------ | ------ |
| Register           | Passed |
| Login              | Passed |
| Protected Route    | Passed |
| Dashboard          | Passed |
| Search and Filter  | Passed |
| Material Detail    | Passed |
| Progress Tracking  | Passed |
| AI Study Assistant | Passed |
| Logout             | Passed |

---

## Main User Flow

```txt
Register -> Login -> Dashboard -> Search/Filter Materials -> Material Detail -> Mark Done -> Ask AI -> Logout
```

---

## Test Cases

### 1. Register

| Item            | Description                                                         |
| --------------- | ------------------------------------------------------------------- |
| Scenario        | User creates a new student account using valid data                 |
| Input           | Name, email, password, grade, and school                            |
| Expected Result | Account is created successfully and user is redirected to dashboard |
| Actual Result   | User account was created and dashboard was displayed                |
| Status          | Passed                                                              |

---

### 2. Login

| Item            | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| Scenario        | User logs in using registered email and password                  |
| Input           | Email and password                                                |
| Expected Result | User receives authentication token and is redirected to dashboard |
| Actual Result   | User successfully logged in and dashboard was displayed           |
| Status          | Passed                                                            |

---

### 3. Protected Route

| Item            | Description                                 |
| --------------- | ------------------------------------------- |
| Scenario        | User opens dashboard without authentication |
| Input           | Open dashboard route without valid token    |
| Expected Result | User is redirected to login page            |
| Actual Result   | User was redirected to login page           |
| Status          | Passed                                      |

---

### 4. Dashboard

| Item            | Description                                                                        |
| --------------- | ---------------------------------------------------------------------------------- |
| Scenario        | Authenticated user opens dashboard                                                 |
| Input           | Valid authenticated session                                                        |
| Expected Result | Dashboard displays user information, materials, search, filter, and progress count |
| Actual Result   | Dashboard displayed correctly                                                      |
| Status          | Passed                                                                             |

---

### 5. Search and Filter

| Item            | Description                                              |
| --------------- | -------------------------------------------------------- |
| Scenario        | User searches material by keyword and filters by subject |
| Input           | Keyword and subject selection                            |
| Expected Result | Material list updates based on search/filter input       |
| Actual Result   | Material list updated correctly                          |
| Status          | Passed                                                   |

---

### 6. Material Detail

| Item            | Description                                      |
| --------------- | ------------------------------------------------ |
| Scenario        | User opens a material detail page from dashboard |
| Input           | Click `View` button on material card             |
| Expected Result | Material detail page displays structured content |
| Actual Result   | Material detail page opened successfully         |
| Status          | Passed                                           |

---

### 7. Progress Tracking

| Item            | Description                                                        |
| --------------- | ------------------------------------------------------------------ |
| Scenario        | User marks a material as completed                                 |
| Input           | Click `Mark Done` button                                           |
| Expected Result | Material status changes to completed and completed count increases |
| Actual Result   | Material was marked as completed and dashboard count updated       |
| Status          | Passed                                                             |

---

### 8. AI Study Assistant

| Item            | Description                                                                                                          |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| Scenario        | User asks a question through AI Study Assistant                                                                      |
| Input           | Study-related question                                                                                               |
| Expected Result | Backend validates token, retrieves material context, calls Gemini API, and returns answer/source data                |
| Actual Result   | AI assistant returned answer/source data when API quota was available and handled errors gracefully when unavailable |
| Status          | Passed                                                                                                               |

---

### 9. Logout

| Item            | Description                                                            |
| --------------- | ---------------------------------------------------------------------- |
| Scenario        | User logs out from the application                                     |
| Input           | Click logout button                                                    |
| Expected Result | Authentication session is cleared and user is redirected to login page |
| Actual Result   | User was logged out and redirected to login page                       |
| Status          | Passed                                                                 |

---

## API Testing Notes

Protected endpoints require a valid JWT token in the request header:

```txt
Authorization: Bearer <token>
```

Protected endpoints include:

```txt
GET /api/auth/me
GET /api/courses
GET /api/courses/:id
GET /api/progress
POST /api/progress/:materialId/start
POST /api/progress/:materialId/complete
PATCH /api/progress/:materialId
DELETE /api/progress/:materialId
POST /api/ai/ask
```

If no token is provided, the API returns:

```json
{
  "msg": "Authorization token is required"
}
```

---

## Issues Found and Fixed

| Issue                              | Cause                                        | Solution                                           |
| ---------------------------------- | -------------------------------------------- | -------------------------------------------------- |
| CORS error in production           | Backend did not allow frontend Vercel domain | Added frontend URL to `CLIENT_ORIGIN`              |
| Dashboard white screen             | Frontend state issue after progress update   | Improved dashboard state handling                  |
| Protected API returned token error | Endpoint accessed without JWT token          | Confirmed expected behavior and documented it      |
| AI API error shown unclearly       | External AI service quota/API issue          | Added readable backend and frontend error handling |

---

## Conclusion

The main flow of Learning Support Platform has been manually tested and works as a portfolio-ready fullstack web application.

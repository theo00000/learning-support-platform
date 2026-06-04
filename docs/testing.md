# Testing Documentation

This document contains manual testing results for the Learning Support Platform project. The purpose of this testing is to ensure that the main user flow works correctly from authentication, dashboard access, learning material interaction, progress tracking, and logout.

---

## Testing Environment

### Web Application

- Platform: Web Browser
- Frontend: React + Vite
- Backend: Express.js REST API
- Database: MongoDB Atlas
- Deployment: Vercel

### Backend API

- Authentication: JWT-based authentication
- Protected Routes: Enabled
- Database Connection: MongoDB Atlas

---

## Manual Test Summary

| Feature           | Status |
| ----------------- | ------ |
| Register          | Passed |
| Login             | Passed |
| Protected Route   | Passed |
| Dashboard         | Passed |
| Progress Tracking | Passed |
| Material Detail   | Passed |
| Logout            | Passed |

---

## Test Cases

### 1. Register

| Item            | Description                                                             |
| --------------- | ----------------------------------------------------------------------- |
| Feature         | User Registration                                                       |
| Scenario        | User creates a new student account using valid data                     |
| Input           | Name, email, password, grade, and school                                |
| Expected Result | Account is created successfully and user is redirected to the dashboard |
| Actual Result   | User account was created and dashboard was displayed                    |
| Status          | Passed                                                                  |

---

### 2. Login

| Item            | Description                                                           |
| --------------- | --------------------------------------------------------------------- |
| Feature         | User Login                                                            |
| Scenario        | User logs in using registered email and password                      |
| Input           | Email and password                                                    |
| Expected Result | User receives authentication token and is redirected to the dashboard |
| Actual Result   | User successfully logged in and dashboard was displayed               |
| Status          | Passed                                                                |

---

### 3. Protected Route

| Item            | Description                                           |
| --------------- | ----------------------------------------------------- |
| Feature         | Protected Dashboard Route                             |
| Scenario        | User tries to access dashboard without authentication |
| Input           | Open dashboard route without valid token              |
| Expected Result | User is redirected to the login page                  |
| Actual Result   | User was redirected to the login page                 |
| Status          | Passed                                                |

---

### 4. Dashboard

| Item            | Description                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------- |
| Feature         | Learning Dashboard                                                                                |
| Scenario        | Authenticated user opens the dashboard                                                            |
| Input           | Valid authenticated session                                                                       |
| Expected Result | Dashboard displays user information, learning materials, search, filter, and progress information |
| Actual Result   | Dashboard displayed correctly with learning materials and progress data                           |
| Status          | Passed                                                                                            |

---

### 5. Progress Tracking

| Item            | Description                                                               |
| --------------- | ------------------------------------------------------------------------- |
| Feature         | Learning Progress Tracking                                                |
| Scenario        | User marks a material as completed                                        |
| Input           | Click `Mark Done` button on a material card                               |
| Expected Result | Material status changes to completed and completed count increases        |
| Actual Result   | Material was marked as completed and completed count updated successfully |
| Status          | Passed                                                                    |

---

### 6. Material Detail

| Item            | Description                                                                  |
| --------------- | ---------------------------------------------------------------------------- |
| Feature         | Material Detail Page                                                         |
| Scenario        | User opens a material detail page from the dashboard                         |
| Input           | Click `View` button on a material card                                       |
| Expected Result | User is redirected to material detail page and detailed content is displayed |
| Actual Result   | Material detail page opened successfully and content was displayed           |
| Status          | Passed                                                                       |

---

### 7. Logout

| Item            | Description                                                            |
| --------------- | ---------------------------------------------------------------------- |
| Feature         | User Logout                                                            |
| Scenario        | User logs out from the application                                     |
| Input           | Click logout button                                                    |
| Expected Result | Authentication session is cleared and user is redirected to login page |
| Actual Result   | User was logged out and redirected to login page                       |
| Status          | Passed                                                                 |

---

## API Testing Notes

The following protected endpoints require a valid JWT token in the request header:

```txt
Authorization: Bearer <token>
```

Protected endpoints include:

```txt
GET /api/auth/me
GET /api/courses
GET /api/courses/:id
GET /api/progress
POST /api/progress/:materialId/complete
DELETE /api/progress/:materialId
```

If no token is provided, the API returns:

```json
{
  "msg": "Authorization token is required"
}
```

This behavior is expected because the route is protected by authentication middleware.

---

## Production Testing Checklist

| Test Item                    | Expected Result                  | Status |
| ---------------------------- | -------------------------------- | ------ |
| Web app opens successfully   | Homepage/Login page is displayed | Passed |
| Backend health check works   | API returns status `ok`          | Passed |
| Register works in production | New account can be created       | Passed |
| Login works in production    | User can login successfully      | Passed |
| Dashboard loads materials    | Materials are displayed          | Passed |
| Progress tracking works      | Completed status is saved        | Passed |
| Material detail page works   | Detail content is displayed      | Passed |
| Logout works                 | User session is cleared          | Passed |

---

## Issues Found During Testing

During development and deployment, several issues were found and fixed:

| Issue                                   | Cause                                                 | Solution                                            |
| --------------------------------------- | ----------------------------------------------------- | --------------------------------------------------- |
| Mobile app could not connect to backend | Mobile device could not use `localhost`               | Used laptop IP address for physical device testing  |
| CORS error in production                | Backend did not allow frontend Vercel domain          | Added frontend URL to `CLIENT_ORIGIN`               |
| Dashboard white screen                  | Frontend runtime error after progress tracking update | Fixed dashboard state and progress data handling    |
| Protected API returned token error      | Endpoint was accessed without JWT token               | Confirmed behavior is expected for protected routes |

---

## Conclusion

The main user flow of Learning Support Platform has been manually tested and works successfully.

The tested flow includes:

```txt
Register → Login → Dashboard → Progress Tracking → Material Detail → Logout
```

Based on this manual testing, the project is ready to be presented as a fullstack software engineering portfolio project.

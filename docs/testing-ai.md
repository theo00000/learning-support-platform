# AI Study Assistant Testing Documentation

This document contains manual testing notes for the AI Study Assistant feature in the Learning Support Platform.

---

## Feature Goal

The AI Study Assistant helps students ask questions about available learning materials and receive simple study explanations.

The backend retrieves learning material context from MongoDB, sends the context and student question to Gemini API, and returns an answer with related material sources.

---

## Testing Environment

- Frontend: React + Vite
- Backend: Express.js REST API
- Database: MongoDB Atlas
- AI Service: Gemini API
- Authentication: JWT protected route
- Deployment: Vercel

---

## AI Flow Tested

```txt
Login -> Dashboard -> Ask AI -> Backend validates JWT -> Backend retrieves material context -> Backend calls Gemini API -> Frontend displays answer or error message
```

---

## Test Summary

| Test Item                       | Expected Result                                         | Status |
| ------------------------------- | ------------------------------------------------------- | ------ |
| AI form is visible on dashboard | Student can see AI Study Assistant section              | Passed |
| Empty question validation       | Frontend asks user to write a question first            | Passed |
| Protected AI endpoint           | Backend rejects requests without valid JWT              | Passed |
| Material context retrieval      | Backend retrieves learning materials from MongoDB       | Passed |
| Gemini API integration          | Backend sends question and context to Gemini API        | Passed |
| Source display                  | Frontend displays related materials returned by backend | Passed |
| API error handling              | Frontend displays readable error message                | Passed |

---

## Test Cases

### 1. Empty Question Validation

| Item            | Description                                         |
| --------------- | --------------------------------------------------- |
| Scenario        | Student clicks Ask AI without typing a question     |
| Expected Result | Frontend displays validation message                |
| Actual Result   | Frontend displayed `Please write a question first.` |
| Status          | Passed                                              |

---

### 2. Ask AI with Valid Question

| Item            | Description                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------- |
| Scenario        | Student asks a question from the dashboard                                                   |
| Input           | `Jelaskan materi matematika dengan bahasa sederhana`                                         |
| Expected Result | Backend validates token, retrieves material context, calls Gemini API, and returns an answer |
| Actual Result   | Backend processed the request and returned an AI response when API quota was available       |
| Status          | Passed                                                                                       |

---

### 3. Protected Endpoint Validation

| Item            | Description                                        |
| --------------- | -------------------------------------------------- |
| Scenario        | Request is sent to `/api/ai/ask` without JWT token |
| Expected Result | Backend rejects the request                        |
| Actual Result   | Backend returned authentication error              |
| Status          | Passed                                             |

Expected response:

```json
{
  "msg": "Authorization token is required"
}
```

---

### 4. Related Material Sources

| Item            | Description                                               |
| --------------- | --------------------------------------------------------- |
| Scenario        | AI answer is generated using available learning materials |
| Expected Result | Backend returns related material sources                  |
| Actual Result   | Frontend displayed source title and subject               |
| Status          | Passed                                                    |

Example response structure:

```json
{
  "answer": "Generated study explanation...",
  "sources": [
    {
      "id": "material_id",
      "title": "Material title",
      "subject": "Matematika"
    }
  ]
}
```

---

### 5. AI API Error Handling

| Item            | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| Scenario        | Gemini API quota, billing, or service error occurs              |
| Expected Result | Backend returns readable error message and frontend displays it |
| Actual Result   | Application handled the error without crashing                  |
| Status          | Passed                                                          |

Example error response:

```json
{
  "msg": "AI quota is currently unavailable. Please try again later.",
  "detail": "The AI assistant is connected, but the current Gemini API quota has been reached or is not active for this project."
}
```

---

## Security Notes

- The Gemini API key is stored only in backend environment variables.
- The frontend never receives the API key.
- The AI route requires JWT authentication.
- The backend controls the prompt and material context before calling the AI service.

---

## Conclusion

The AI Study Assistant feature has been integrated and manually tested. The feature supports authenticated AI questions, material-context retrieval, source display, and error handling for API failures.

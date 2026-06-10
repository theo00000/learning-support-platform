# AI Study Assistant Testing

This section documents manual testing for the AI Study Assistant feature in Learning Support Platform.

---

## AI Testing Summary

| Feature                                  | Status                             |
| ---------------------------------------- | ---------------------------------- |
| AI component displayed on dashboard      | Passed                             |
| AI route protected by authentication     | Passed                             |
| AI request sent from frontend to backend | Passed                             |
| Backend validates JWT token              | Passed                             |
| Backend connects to OpenAI API           | Passed                             |
| AI quota error handled gracefully        | Passed                             |
| AI response displayed on frontend        | Pending quota/billing availability |

---

## AI Test Cases

### 1. AI Assistant Component Display

| Item            | Description                                        |
| --------------- | -------------------------------------------------- |
| Feature         | AI Study Assistant UI                              |
| Scenario        | Authenticated user opens the dashboard             |
| Input           | Valid authenticated session                        |
| Expected Result | AI Study Assistant card appears on dashboard       |
| Actual Result   | AI Study Assistant card was displayed successfully |
| Status          | Passed                                             |

---

### 2. Protected AI Route

| Item            | Description                                        |
| --------------- | -------------------------------------------------- |
| Feature         | Protected AI Endpoint                              |
| Scenario        | User accesses AI endpoint without token            |
| Input           | Request without Authorization header               |
| Expected Result | Backend rejects request and returns token error    |
| Actual Result   | Backend returned `Authorization token is required` |
| Status          | Passed                                             |

---

### 3. AI Request from Frontend

| Item            | Description                                          |
| --------------- | ---------------------------------------------------- |
| Feature         | Ask AI                                               |
| Scenario        | Authenticated user submits a question from dashboard |
| Input           | `Jelaskan materi matematika dengan bahasa sederhana` |
| Expected Result | Frontend sends request to `/api/ai/ask`              |
| Actual Result   | Request was sent successfully to backend             |
| Status          | Passed                                               |

---

### 4. Backend AI Integration

| Item            | Description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| Feature         | Backend AI Controller                                                    |
| Scenario        | Backend processes AI request                                             |
| Input           | Student question and JWT token                                           |
| Expected Result | Backend validates token, searches material context, and calls OpenAI API |
| Actual Result   | Backend successfully reached OpenAI API                                  |
| Status          | Passed                                                                   |

---

### 5. OpenAI Quota Handling

| Item            | Description                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| Feature         | AI Error Handling                                                           |
| Scenario        | OpenAI API quota or billing is unavailable                                  |
| Input           | Valid AI request                                                            |
| Expected Result | Backend returns a clear quota error message                                 |
| Actual Result   | Backend returned `insufficient_quota` from OpenAI API and handled the error |
| Status          | Passed                                                                      |

---

### 6. AI Response Display

| Item            | Description                                             |
| --------------- | ------------------------------------------------------- |
| Feature         | AI Answer Display                                       |
| Scenario        | User asks a question when OpenAI quota is available     |
| Input           | Valid question                                          |
| Expected Result | AI answer and related material sources are displayed    |
| Actual Result   | Pending because OpenAI API quota/billing must be active |
| Status          | Pending                                                 |

---

## AI Testing Notes

The AI Study Assistant endpoint requires authentication.

Required header:

```txt
Authorization: Bearer <token>
```

Endpoint:

```txt
POST /api/ai/ask
```

Request body:

```json
{
  "question": "Jelaskan materi matematika dengan bahasa sederhana"
}
```

If the request does not include a valid JWT token, the backend returns:

```json
{
  "msg": "Authorization token is required"
}
```

This behavior is expected because the AI route is protected.

---

## OpenAI API Quota Note

During testing, the backend successfully connected to the OpenAI API, but the OpenAI response returned:

```txt
insufficient_quota
```

This means the integration is technically connected, but the OpenAI project requires active billing or available API quota before generating responses.

The application handles this condition gracefully so the user receives a clear error message instead of a broken page.

---

## Updated Production Testing Checklist

| Test Item                    | Expected Result                   | Status                       |
| ---------------------------- | --------------------------------- | ---------------------------- |
| Web app opens successfully   | Homepage/Login page is displayed  | Passed                       |
| Backend health check works   | API returns status `ok`           | Needs recheck after redeploy |
| Register works in production | New account can be created        | Needs recheck after redeploy |
| Login works in production    | User can login successfully       | Needs recheck after redeploy |
| Dashboard loads materials    | Materials are displayed           | Passed locally               |
| Progress tracking works      | Completed status is saved         | Passed locally               |
| AI Assistant appears         | AI card is displayed on dashboard | Passed locally               |
| AI protected route works     | Request without token is rejected | Passed                       |
| AI backend integration works | Backend reaches OpenAI API        | Passed                       |
| AI response generation works | AI returns answer                 | Pending quota/billing        |
| Material detail page works   | Detail content is displayed       | Passed locally               |
| Logout works                 | User session is cleared           | Passed locally               |

---

## Conclusion

The AI Study Assistant feature has been integrated into the Learning Support Platform and tested locally.

The feature is technically connected to the backend and OpenAI API. However, AI response generation requires active OpenAI API quota or billing.

The tested AI flow includes:

```txt
Login → Dashboard → Ask AI → Backend validates token → Backend calls OpenAI API → Handle response or quota error
```

Based on this testing, the AI feature is ready for portfolio documentation and can be fully demonstrated once OpenAI API quota is available.

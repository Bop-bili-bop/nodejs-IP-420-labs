# PR6 Test Plan (API v1)

## Endpoint matrix

- `GET /api/v1/languages` → `200`
- `POST /api/v1/languages` → `201`, `400`, `409`
- `GET /api/v1/languages/:id` → `200`, `400`, `404`
- `PUT /api/v1/languages/:id` → `200`, `400`, `404`, `409`
- `DELETE /api/v1/languages/:id` → `204`, `400`, `404`

- `GET /api/v1/dictionaries` → `200`
- `POST /api/v1/dictionaries` → `201`, `400`, `409`
- `GET /api/v1/dictionaries/:id` → `200`, `400`, `404`
- `PUT /api/v1/dictionaries/:id` → `200`, `400`, `404`, `409`
- `DELETE /api/v1/dictionaries/:id` → `204`, `400`, `404`

- `GET /api/v1/words` (+ `page`, `limit`, `langId`, `text`) → `200`, `400`
- `POST /api/v1/words` → `201`, `400`, `409`
- `GET /api/v1/words/:id` → `200`, `400`, `404`
- `PUT /api/v1/words/:id` → `200`, `400`, `404`, `409`
- `DELETE /api/v1/words/:id` → `204`, `400`, `404`

- `GET /api/v1/translations` → `200`
- `POST /api/v1/translations` → `201`, `400`, `409`
- `GET /api/v1/translations/:id` → `200`, `400`, `404`
- `PUT /api/v1/translations/:id` → `200`, `400`, `404`, `409`
- `DELETE /api/v1/translations/:id` → `204`, `400`, `404`
- `GET /api/v1/translations/lookup?word=<w>&lang=<id>` → `200`, `400`, `404`

## Example requests

- `GET /api/v1/translations/lookup?word=cat&lang=2`
  - `200`: `{ "word": "cat", "lang": "2", "translation": "кіт" }`
  - `404`: `{ "error": { "message": "Translation not found", "code": 404 } }`
  - `400`: `{ "error": { "message": "query param 'word' is required", "code": 400 } }`

## What to demo

1. API is fully under `/api/v1/*` for all four entities.
2. All responses are JSON for API routes (no SSR dependency).
3. Positive and negative HTTP statuses are consistent (`200/201/204/400/404/409`).

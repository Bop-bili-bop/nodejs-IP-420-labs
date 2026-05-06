# nodejs-IP-420-labs
Repo for lab works for Node.js discipline
## Lab 6 API quick guide

### Base URL

`/api/v1`

### Error format

All API errors are returned as JSON with proper HTTP status code:
```json
{
  "error": {
    "message": "Error message",
    "details": "Optional details or null",
    "code": "status code"
  }
}
```

## Resource: words

### Endpoints

- `POST /api/v1/words`
- `GET /api/v1/words`
- `GET /api/v1/words/:id`
- `PUT /api/v1/words/:id`
- `DELETE /api/v1/words/:id`

### Query parameters for `GET /api/v1/words`

- `page` - page number (default `1`)
- `limit` - items per page (default `10`)
- `langId` - filter by language id
- `text` - partial text match

### List response format

```json
{
  "items": [
    {
      "id": 1,
      "text": "hello",
      "langId": 1,
      "description": "greeting"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "pages": 1,
    "limit": 10
  }
}
```

### Expected HTTP status codes

- `201` created
- `200` read/update success
- `204` delete success
- `400` invalid input
- `404` resource not found

## How to bootstrap DB (Docker) and run app

### 1) Prepare environment

Make sure root `.env` contains:

```env
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=pass123
DB_HOST=localhost
DB_PORT=5432
```

### 2) Start PostgreSQL in Docker

From repository root:

```bash
docker compose up -d db
```

If credentials were changed before and auth fails, recreate DB volume:

```bash
docker compose down -v
docker compose up -d db
```

### 3) Initialize schema and seed data

```bash
node lab6/db/seed.js
```

### 4) Run the app

```bash
node lab6/server.js
```

App will be available at `http://localhost:3005`.

## API testing examples (without Swagger)

### Create word

```bash
curl -X POST http://localhost:3005/api/v1/words \
  -H "Content-Type: application/json" \
  -d "{\"text\":\"house\",\"langId\":1,\"description\":\"test word\"}"
```

### Get words with pagination/filter

```bash
curl "http://localhost:3005/api/v1/words?page=1&limit=5&langId=1&text=ho"
```

### Get word by id

```bash
curl "http://localhost:3005/api/v1/words/1"
```

### Update word

```bash
curl -X PUT http://localhost:3005/api/v1/words/1 \
  -H "Content-Type: application/json" \
  -d "{\"text\":\"home\"}"
```

### Delete word

```bash
curl -X DELETE http://localhost:3005/api/v1/words/1 -i
```
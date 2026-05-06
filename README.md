# nodejs-IP-420-labs
Repo for lab works for Node.js discipline
## Lab 5 - Контракт REST API (Issue 1)

**Базовий URL:** `/api/v1`

**Формат помилок:**
Всі помилки API повертаються у форматі JSON з відповідним HTTP статусом (без рендеру EJS-сторінок):
```json
{
  "error": {
    "message": "Текст помилки",
    "details": "Додаткові деталі (за наявності) або null"
  }
}
```
Загальні Query-параметри:

page — номер сторінки
limit — ліміт записів на сторінку

Ресурси:

GET /api/v1/words/:id — Отримати слово за ID
PUT /api/v1/words/:id — Оновити слово
DELETE /api/v1/words/:id — Видалити слово
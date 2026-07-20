# rest-api Worker

Hono-based Cloudflare Worker providing a D1-backed CRUD REST API with authentication.

## Endpoints

- `GET /rest/{table}` — list / filter rows
- `POST /rest/{table}` — create row
- `PATCH /rest/{table}/{id}` — update row
- `DELETE /rest/{table}/{id}` — delete row
- `POST /query` — execute raw SQL

All endpoints require an `Authorization: ****** header matching the `SECRET` Secrets Store value.

## Deploy

```bash
wrangler deploy
```

Database setup and migration

1) Configure environment variables (do not commit credentials):

Copy `.env.local.example` to `.env.local` and set `DB_PASSWORD` or `DATABASE_URL`.

Example full URL:

```
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@services.irn5.chabokan.net:34939/robert
```

2) Create schema

Use psql or any Postgres client to run the SQL schema file:

```
psql "$DATABASE_URL" -f src/db/schema.sql
```

Or connect with explicit params:

```
psql -h services.irn5.chabokan.net -p 34939 -U postgres -d robert -f src/db/schema.sql
```

3) Verify

Connect and run `SELECT count(*) FROM posts;` to verify tables exist.

Notes:
- This project uses a minimal `src/lib/db.ts` helper that reads `DATABASE_URL` or individual env vars.
- Do not commit secrets; use CI secrets or environment variables on the host.

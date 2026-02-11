# Database Setup and Migration

## 1) Configure Environment Variables

Copy `.env.local.example` to `.env.local` and set `DB_PASSWORD` or `DATABASE_URL`.

Example full URL:

```
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@services.irn5.chabokan.net:34939/robert
```

## 2) Create Initial Schema

Use psql or any Postgres client to run the SQL schema file:

```bash
psql "$DATABASE_URL" -f src/db/schema.sql
```

Or connect with explicit params:

```bash
psql -h services.irn5.chabokan.net -p 34939 -U postgres -d robert -f src/db/schema.sql
```

## 3) Run Migrations

Apply migration 002 to add tags support:

```bash
psql "$DATABASE_URL" -f src/db/migration-002.sql
```

**What it adds:**
- `tags` JSONB column to posts table
- Index for better query performance

## 4) Verify

Connect and run:

```sql
SELECT count(*) FROM posts;
SELECT column_name FROM information_schema.columns WHERE table_name='posts' ORDER BY ordinal_position;
```

## Files

- `schema.sql` - Initial schema (posts, authors, comments, users)
- `migration-001.sql` - (existing migrations if any)
- `migration-002.sql` - Add tags JSONB column (NEW)

## Notes

- This project uses a minimal `src/lib/db.ts` helper that reads `DATABASE_URL` or individual env vars.
- Do not commit secrets; use CI secrets or environment variables on the host.
- Tags are stored as JSON arrays: `["tag1", "tag2", ...]`
- Migrations are idempotent (safe to run multiple times)

## Example: Create Full Setup Script

```bash
#!/bin/bash
# setup-db.sh

# Load env
source .env.local

# Create schema
echo "Creating schema..."
psql "$DATABASE_URL" -f src/db/schema.sql

# Run migrations
echo "Running migrations..."
psql "$DATABASE_URL" -f src/db/migration-002.sql

echo "✅ Database setup complete!"
```

Run with:
```bash
chmod +x setup-db.sh
./setup-db.sh
```

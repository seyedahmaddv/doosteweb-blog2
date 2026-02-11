import { Pool } from "pg";

declare global {
  // allow global pool across module reloads in dev
  // eslint-disable-next-line no-var
  var __PG_POOL__: Pool | undefined;
}

function buildConnectionString() {
  // prefer full DATABASE_URL, but allow components
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;

  const host = process.env.DB_HOST || process.env.PGHOST;
  const port = process.env.DB_PORT || process.env.PGPORT;
  const database = process.env.DB_NAME || process.env.PGDATABASE;
  const user = process.env.DB_USER || process.env.PGUSER;
  const password = process.env.DB_PASSWORD || process.env.PGPASSWORD;

  if (!host || !port || !database || !user || !password) {
    throw new Error(
      "Database connection is not configured. Set DATABASE_URL or DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD"
    );
  }

  // postgres://user:pass@host:port/dbname
  return `postgres://${encodeURIComponent(user)}:${encodeURIComponent(
    password
  )}@${host}:${port}/${database}`;
}

const connectionString = buildConnectionString();

const getPool = () => {
  if (global.__PG_POOL__) return global.__PG_POOL__;
  const pool = new Pool({ connectionString });
  global.__PG_POOL__ = pool;
  return pool;
};

export async function query(text: string, params?: any[]) {
  const pool = getPool();
  const res = await pool.query(text, params);
  return res;
}

export default { query };

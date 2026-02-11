#!/usr/bin/env node

/**
 * Initialize database schema from src/db/schema.sql
 * Run: node scripts/init-db.js
 */

require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');
const { readFileSync } = require('fs');
const { resolve } = require('path');

async function initDatabase() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.error('❌ Error: DATABASE_URL is not set in .env.local');
    process.exit(1);
  }

  console.log('🔗 Connecting to database...');

  const client = new Client({ connectionString });

  try {
    await client.connect();
    console.log('✅ Connected successfully');

    const schemaPath = resolve(__dirname, '../src/db/schema.sql');
    const schema = readFileSync(schemaPath, 'utf8');

    console.log('📝 Running schema...');
    await client.query(schema);

    console.log('✅ Schema applied successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
    console.log('🔌 Connection closed');
  }
}

initDatabase();

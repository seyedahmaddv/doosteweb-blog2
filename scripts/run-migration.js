#!/usr/bin/env node

/**
 * Run a migration file
 * Usage: node scripts/run-migration.js migration-001.sql
 */

require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');
const { readFileSync } = require('fs');
const { resolve } = require('path');

async function runMigration() {
  const migrationFile = process.argv[2];

  if (!migrationFile) {
    console.error('❌ Usage: node scripts/run-migration.js <migration-file.sql>');
    process.exit(1);
  }

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.error('❌ Error: DATABASE_URL is not set in .env.local');
    process.exit(1);
  }

  console.log(`🔗 Connecting to database...`);

  const client = new Client({ connectionString });

  try {
    await client.connect();
    console.log('✅ Connected successfully');

    const migrationPath = resolve(__dirname, '../src/db', migrationFile);
    const migration = readFileSync(migrationPath, 'utf8');

    console.log(`📝 Running migration: ${migrationFile}`);
    await client.query(migration);

    console.log('✅ Migration applied successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
    console.log('🔌 Connection closed');
  }
}

runMigration();

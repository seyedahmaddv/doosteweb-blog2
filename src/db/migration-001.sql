-- Migration: Add email, phone, status to comments and create users table

-- Add new columns to comments table if they don't exist
ALTER TABLE comments
ADD COLUMN IF NOT EXISTS profile_email TEXT,
ADD COLUMN IF NOT EXISTS profile_phone TEXT,
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending';

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Database schema for simple blog

CREATE TABLE IF NOT EXISTS authors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  avatar TEXT
);

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_img TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  views INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  category TEXT,
  featured BOOLEAN DEFAULT false,
  tags JSONB,
  author_id INTEGER REFERENCES authors(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  profile_name TEXT,
  profile_email TEXT,
  profile_phone TEXT,
  profile_avatar TEXT,
  content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  parent_comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Example seed (optional)
-- INSERT INTO authors (name, avatar) VALUES ('Admin', '/images/profile/user-1.jpg');
-- Password: admin123 (hashed)
-- INSERT INTO users (username, email, password, role) VALUES ('admin', 'admin@example.com', '$2b$10$...', 'admin');

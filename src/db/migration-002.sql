-- Migration 002: Add tags to posts table

BEGIN;

-- Check if column exists before adding
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'posts' AND column_name = 'tags'
  ) THEN
    ALTER TABLE posts ADD COLUMN tags JSONB;
  END IF;
END $$;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS posts_tags_idx ON posts USING GIN(tags);

COMMIT;

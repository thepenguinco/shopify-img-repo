-- Create user roles
CREATE TYPE Role AS ENUM('USER', 'ADMIN');

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  role Role NOT NULL DEFAULT 'USER',
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create images table
CREATE TABLE images (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255),
  contentImage TEXT NOT NULL,
  description TEXT,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

-- Create tags table
CREATE TABLE tags (
  id SERIAL PRIMARY KEY NOT NULL,
  tag VARCHAR(255) NOT NULL UNIQUE
);

-- Create images_tags table
CREATE TABLE images_tags (
  id SERIAL PRIMARY KEY NOT NULL,
  image_id INTEGER,
  tag_id INTEGER,
  FOREIGN KEY(image_id) REFERENCES images(id),
  FOREIGN KEY(tag_id) REFERENCES tags(id),
  CONSTRAINT "images_tags_unique" UNIQUE (image_id, tag_id)
);

DROP TABLE IF EXISTS listings CASCADE;

CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  thumbnail_photo_url VARCHAR(255) NOT NULL,
  users_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  brand VARCHAR(255),
  make VARCHAR(32),
  year VARCHAR(255),
  color VARCHAR(255),
  transmission VARCHAR(255),
  price INTEGER,
  description TEXT,
  sold VARCHAR(255) DEFAULT NULL
);

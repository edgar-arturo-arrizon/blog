DROP DATABASE IF EXISTS blog_system;

CREATE DATABASE blog_system;

\c blog_system;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
user_id uuid DEFAULT uuid_generate_v4(),
user_name VARCHAR(35) NOT NULL,
user_email VARCHAR(50) NOT NULL UNIQUE,
user_password VARCHAR(255) NOT NULL,
PRIMARY KEY (user_id)
);

CREATE TABLE blogs(
  blog_id SERIAL,
  blog_title VARCHAR(50) NOT NULL,
  -- blog_body TEXT NOT NULL,
  user_id UUID,
  created_at DATE DEFAULT CURRENT_DATE,
  updated_at DATE DEFAULT CURRENT_DATE,
  PRIMARY KEY (blog_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE comments(
  comment_id SERIAL,
  comment_body VARCHAR(255) NOT NULL,
  blog_id SERIAL,
  user_id UUID,
  PRIMARY KEY (comment_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (blog_id) REFERENCES blogs(blog_id)
);

-- INSERT INTO users (user_name, user_email, user_password) VALUES ('edgar', 'edgar@gmail.com', 'edgar123');
-- INSERT INTO blogs (blog_title, blog_body, user_id,)
-- SELECT * FROM users;
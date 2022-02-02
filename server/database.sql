CREATE DATABASE blogsystem;

CREATE TABLE users(
user_id uuid PRIMARY KEY DEFAULT
uuid_generate_v4(),
user_name VARCHAR(35) NOT NULL,
user_email VARCHAR(50) NOT NULL,
user_password VARCHAR(25) NOT NULL
);

INSERT INTO users (user_name, user_email, user_password) VALUES ('edgar', 'edgarrizon@gmail.com', 'ea1991');
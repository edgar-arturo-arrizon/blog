import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  user: 'me',
  password: 'password',
  host: 'localhost',
  port: 5432,
  database: 'blogsystem'
});

export default pool;
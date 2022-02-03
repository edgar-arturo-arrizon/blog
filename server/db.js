import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  user: 'edgararrizon',
  password: 'password',
  host: 'localhost',
  port: 5432,
  database: 'blog_system'
});

export default pool;
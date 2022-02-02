import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  user: 'edgararrizon',
  password: 'ea1991',
  host: 'localhost',
  port: 5432,
  database: 'BlogSystem'
});

export default pool;
import Pool from 'pg';

const pool = new Pool({
  user: 'postgress',
  password: 'ea1991',
  host: 'localhost',
  port: 5432,
  database: 'BlogSystem'
});

module.exports = pool;

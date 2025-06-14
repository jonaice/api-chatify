import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  ssl: true, // o true si usas servicios como Render
});

pool.on('connect', () => {
  console.log('Base de datos conectada correctamente');
});

pool.on('error', (err) => {
  console.error('Error con la base de datos:', err);
});

export default pool;

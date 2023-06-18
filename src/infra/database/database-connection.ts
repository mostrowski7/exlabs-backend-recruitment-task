import { Pool } from 'pg';
import logger from '../../utils/logger';

async function databaseConnection() {
  try {
    const pool = new Pool();

    await pool.connect();

    await pool.query('SELECT NOW()');

    logger.info('Database connected');
  } catch (error) {
    logger.error('Cannot connect to database');
  }
}

export default databaseConnection;

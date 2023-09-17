import { Pool } from 'pg';
import logger from '../../utils/logger';

async function databaseConnection() {
  try {
    const pool = new Pool();
    await pool.connect();

    logger.info('Connected to database');
  } catch (error) {
    logger.error('Cannot connect to database', error);

    process.exit(1);
  }
}

export default databaseConnection;

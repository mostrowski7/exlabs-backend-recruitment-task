import 'reflect-metadata';
import config from '../config';
import logger from '../utils/logger';
import databaseConnection from '../infrastructure/database/database-connection';
import createServer from './server';

async function main() {
  const app = createServer();

  await databaseConnection();

  app.listen(config.port, async () => {
    logger.info(`Server listening on port ${config.port}`);
  });
}

main();

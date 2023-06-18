import 'reflect-metadata';
import express from 'express';
import config from '../config';
import logger from '../utils/logger';
import errorHandler from '../interfaces/middleware/error-handler';
import databaseConnection from '../infra/database/database-connection';

const app = express();

databaseConnection();

app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`Server listening on port ${config.port}`);
});

export const server = app;

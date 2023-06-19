import 'reflect-metadata';
import express from 'express';
import config from '../config';
import logger from '../utils/logger';
import errorHandler from '../interfaces/middleware/error-handler.middleware';
import databaseConnection from '../infra/database/database-connection';
import routes from '../interfaces/routes';

const app = express();

databaseConnection();

app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`Server listening on port ${config.port}`);
});

export const server = app;

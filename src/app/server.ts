import 'reflect-metadata';
import express from 'express';
import config from '../config';
import logger from '../utils/logger';
import routes from '../interfaces/routes';
import errorHandler from '../interfaces/middleware/error-handler';

const app = express();

app.use('/api', routes);

app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`Server listening on port ${config.port}`);
});

export const server = app;

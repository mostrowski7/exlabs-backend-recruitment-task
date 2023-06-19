import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from '../config';
import logger from '../utils/logger';
import errorHandler from '../interfaces/middleware/error-handler.middleware';
import databaseConnection from '../infra/database/database-connection';
import routes from '../interfaces/routes';

const app = express();

databaseConnection();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use('/api', routes);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log('node env', process.env.NODE_ENV);
  logger.info(`Server listening on port ${config.port}`);
});

export const server = app;

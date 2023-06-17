import 'reflect-metadata';
import express from 'express';
import config from './config';
import logger from './utils/logger';

const app = express();

app.listen(config.port, () => {
  logger.info(`Server listening on port ${config.port}`);
});

export const server = app;

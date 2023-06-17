import 'reflect-metadata';
import express from 'express';
import config from './config';

const app = express();

app.listen(config.port, () => {
  console.log(`Listening on PORT ${config.port}`);
});

export const server = app;

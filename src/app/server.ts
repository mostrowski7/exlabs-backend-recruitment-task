import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from '../interfaces/middleware/error-handler.middleware';
import routes from '../interfaces/routes';

function createServer(): Application {
  const app = express();

  app.use(express.json());

  app.use(cors());

  app.use(helmet());

  app.use('/api', routes);

  app.use(errorHandler);

  return app;
}

export default createServer;

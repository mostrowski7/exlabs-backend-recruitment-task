import { NextFunction, Request, Response } from 'express';
import logger from '../../utils/logger';
import config from '../../config';
import { Environment } from '../../config/env.validation';

function requestLogger(req: Request, res: Response, next: NextFunction) {
  if (config.nodeEnv === Environment.Development) {
    logger.info('Request', {
      method: req.method,
      url: req.originalUrl,
    });
  }

  next();
}

export default requestLogger;

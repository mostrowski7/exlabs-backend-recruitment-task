import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import HttpException from '../../utils/http-exception';
import config from '../../config';
import { Environment } from '../../config/env.validation';
import logger from '../../utils/logger';

function validateBody(dto: ClassConstructor<object>): RequestHandler {
  return async function (req: Request, _: Response, next: NextFunction) {
    const errors = await validate(plainToInstance(dto, req.body), {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      if (config.nodeEnv === Environment.Development) {
        logger.debug('Request query validator: ', errors);
      }

      next(new HttpException('Invalid data', 400));
    }

    next();
  };
}

function validateQuery(dto: ClassConstructor<object>): RequestHandler {
  return async function (req: Request, _: Response, next: NextFunction) {
    const errors = await validate(plainToInstance(dto, req.query), {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      if (config.nodeEnv === Environment.Development) {
        logger.debug('Request query validator: ', errors);
      }

      next(new HttpException('Invalid data', 400));
    }

    next();
  };
}

function validateParam(dto: ClassConstructor<object>): RequestHandler {
  return async function (req: Request, _: Response, next: NextFunction) {
    const errors = await validate(plainToInstance(dto, req.params), {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      if (config.nodeEnv === Environment.Development) {
        logger.debug('Request param validator: ', errors);
      }

      next(new HttpException('Invalid data', 400));
    }

    next();
  };
}

export { validateBody, validateQuery, validateParam };

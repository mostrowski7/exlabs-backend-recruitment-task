import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import HttpException from '../../utils/http-exception';
import config from '../../config';
import { Environment } from '../../config/env.validation';
import logger from '../../utils/logger';

type RequestObjectType = 'body' | 'params' | 'query';

function requestValidator(dto: ClassConstructor<object>, type: RequestObjectType): RequestHandler {
  return async function (req: Request, _: Response, next: NextFunction) {
    const errors = await validate(plainToInstance(dto, req[type]), {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      if (config.nodeEnv === Environment.Development) {
        logger.debug(`Request ${type} validator: `, errors);
      }

      next(new HttpException('Invalid data', 400));
    }

    next();
  };
}

function validateBody(dto: ClassConstructor<object>): RequestHandler {
  return requestValidator(dto, 'body');
}

function validateQuery(dto: ClassConstructor<object>): RequestHandler {
  return requestValidator(dto, 'query');
}

function validateParam(dto: ClassConstructor<object>): RequestHandler {
  return requestValidator(dto, 'params');
}

export { validateBody, validateQuery, validateParam };

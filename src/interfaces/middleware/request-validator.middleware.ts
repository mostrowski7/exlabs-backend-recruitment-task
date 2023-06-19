import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import HttpException from '../../utils/http-exception';

export function validateBody(dto: ClassConstructor<object>): RequestHandler {
  return async function (req: Request, _: Response, next: NextFunction) {
    const errors = await validate(plainToInstance(dto, req.body));

    if (errors.length > 0) {
      next(new HttpException('Invalid data', 400));
    }

    next();
  };
}

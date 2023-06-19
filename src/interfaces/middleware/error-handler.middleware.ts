import { NextFunction, Request, Response } from 'express';
import HttpException from '../../utils/http-exception';
import { ValidationError } from 'class-validator';

function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  if (error instanceof HttpException) {
    return res.status(error.code).send(error.message);
  }

  if (error instanceof ValidationError) {
    return res.status(400).json({ message: error.constraints });
  }

  return res.status(500).send('Something went wrong');
}

export default errorHandler;

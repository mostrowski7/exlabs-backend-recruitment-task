import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import config from '../../config';

function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers['authorization']?.split(' ').pop();

    if (!token) throw new Error();

    verify(token, config.jwtSecret);

    next();
  } catch (error) {
    res.status(401).send('Unauthenticated');
  }
}

export default auth;

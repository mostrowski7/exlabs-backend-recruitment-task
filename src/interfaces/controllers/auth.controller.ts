import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';
import AuthService from '../../modules/auth/auth.service';

async function authenticateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const authService = Container.get(AuthService);

    const token = await authService.authenticateUser(req.body);

    return res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
}

export { authenticateUser };

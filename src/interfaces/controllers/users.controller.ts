import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import UserService from '../../modules/users/users.service';

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userService = Container.get(UserService);

    await userService.createUser(req.body);

    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

export { createUser };

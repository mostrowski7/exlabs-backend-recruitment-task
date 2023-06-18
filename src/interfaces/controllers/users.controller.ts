import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import UserService from '../../modules/users/users.service';

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userService = Container.get(UserService);

    const user = await userService.createUser();

    return res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export { createUser };

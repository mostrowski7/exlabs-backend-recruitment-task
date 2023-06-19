import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import UserService from '../../modules/users/users.service';
import { Role } from '../../modules/users/users.type';

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userService = Container.get(UserService);

    await userService.createUser(req.body);

    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function getUsers(req: Request, res: Response, next: NextFunction) {
  const { role } = req.query as { role: Role };

  try {
    const userService = Container.get(UserService);

    const users = await userService.getUsers(role);

    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

export { createUser, getUsers };

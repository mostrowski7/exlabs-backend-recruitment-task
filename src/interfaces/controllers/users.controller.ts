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

async function getUsersByRole(req: Request, res: Response, next: NextFunction) {
  const { role } = req.query as { role: Role };

  try {
    const userService = Container.get(UserService);

    const users = await userService.getUsersByRole(role);

    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

async function findUserById(req: Request, res: Response, next: NextFunction) {
  const parsedId = parseInt(req.params.id);

  try {
    const userService = Container.get(UserService);

    const user = await userService.findUserById(parsedId);

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

async function updateUserById(req: Request, res: Response, next: NextFunction) {
  const parsedId = parseInt(req.params.id);

  try {
    const userService = Container.get(UserService);

    await userService.updateUserById(parsedId, req.body);

    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

export { createUser, getUsersByRole, findUserById, updateUserById };

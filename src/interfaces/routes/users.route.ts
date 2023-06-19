import { Router } from 'express';
import { createUser, findUserById, getUsers } from '../controllers/users.controller';
import { validateBody, validateQuery } from '../middleware/request-validator.middleware';
import CreateUserDto from '../dtos/create-user.dto';
import auth from '../middleware/auth.middleware';
import GetUsersDto from '../dtos/get-users.dto';

const router = Router();

router.post('/', auth, validateBody(CreateUserDto), createUser);

router.get('/', auth, validateQuery(GetUsersDto), getUsers);

router.get('/:id', auth, validateQuery(GetUsersDto), findUserById);

export default router;

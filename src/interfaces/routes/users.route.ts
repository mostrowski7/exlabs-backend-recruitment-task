import { Router } from 'express';
import { createUser, findUserById, getUsersByRole, updateUserById } from '../controllers/users.controller';
import { validateBody, validateParam, validateQuery } from '../middleware/request-validator.middleware';
import CreateUserDto from '../dtos/create-user.dto';
import auth from '../middleware/auth.middleware';
import GetUsersDto from '../dtos/get-users.dto';
import GetUserDto from '../dtos/get-user.dto';
import { UpdateUserBodyDto, UpdateUserParamDto } from '../dtos/update-user.dto';

const router = Router();

router.post('/', auth, validateBody(CreateUserDto), createUser);

router.get('/', auth, validateQuery(GetUsersDto), getUsersByRole);

router.get('/:id', auth, validateParam(GetUserDto), findUserById);

router.patch('/:id', auth, validateParam(UpdateUserParamDto), validateBody(UpdateUserBodyDto), updateUserById);

export default router;

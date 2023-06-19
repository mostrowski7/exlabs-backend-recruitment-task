import { Router } from 'express';
import { createUser, deleteUser, findUser, getUsersByRole, updateUser } from '../controllers/users.controller';
import { validateBody, validateParam, validateQuery } from '../middleware/request-validator.middleware';
import CreateUserDto from '../dtos/create-user.dto';
import auth from '../middleware/auth.middleware';
import GetUsersDto from '../dtos/get-users.dto';
import GetUserDto from '../dtos/get-user.dto';
import { UpdateUserBodyDto, UpdateUserParamDto } from '../dtos/update-user.dto';
import DeleteUserDto from '../dtos/delete-user.dto';

const router = Router();

router.post('/', auth, validateBody(CreateUserDto), createUser);

router.get('/', auth, validateQuery(GetUsersDto), getUsersByRole);

router.get('/:id', auth, validateParam(GetUserDto), findUser);

router.patch('/:id', auth, validateParam(UpdateUserParamDto), validateBody(UpdateUserBodyDto), updateUser);

router.delete('/:id', auth, validateParam(DeleteUserDto), deleteUser);

export default router;

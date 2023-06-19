import { Router } from 'express';
import { createUser } from '../controllers/users.controller';
import { validateBody } from '../middleware/request-validator.middleware';
import CreateUserDto from '../dtos/create-user.dto';
import auth from '../middleware/auth.middleware';

const router = Router();

router.post('/', auth, validateBody(CreateUserDto), createUser);

export default router;

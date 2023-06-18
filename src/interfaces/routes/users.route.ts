import { Router } from 'express';
import { createUser } from '../controllers/users.controller';
import { validateBody } from '../middleware/request-validator';
import CreateUserDto from '../dtos/create-user.dto';

const router = Router();

router.post('/', validateBody(CreateUserDto), createUser);

export default router;

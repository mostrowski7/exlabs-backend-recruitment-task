import { Router } from 'express';
import { validateBody } from '../middleware/request-validator';
import { authenticateUser } from '../controllers/auth.controller';
import AuthenticateUserDto from '../dtos/authenticate-user.dto';

const router = Router();

router.post('/', validateBody(AuthenticateUserDto), authenticateUser);

export default router;

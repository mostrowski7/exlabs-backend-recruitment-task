import { Router } from 'express';
import users from './users.route';
import auth from './auth.route';
import requestLogger from '../middleware/request-logger.middleware';

const router = Router();

router.use(requestLogger);

router.use('/users', users);
router.use('/auth', auth);

export default router;

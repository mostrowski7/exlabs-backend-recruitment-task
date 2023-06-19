import { Router } from 'express';
import users from './users.route';
import auth from './auth.route';

const router = Router();

router.use('/users', users);
router.use('/auth', auth);

export default router;

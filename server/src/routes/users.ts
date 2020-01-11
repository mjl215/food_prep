import { Router } from 'express';

import {  createUser, loginUser, logoutUser } from '../controllers/users'
import { auth } from '../middleware/auth';

const router = Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/logout', auth , logoutUser);
export default router;
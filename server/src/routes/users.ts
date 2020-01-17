import { Router } from 'express';

import {  createUser, loginUser, logoutUser, authUser, addBasket } from '../controllers/users'
import { auth } from '../middleware/auth';

const router = Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/logout', auth , logoutUser);
router.post('/auth', auth, authUser);
router.post('/basket', addBasket);
export default router;
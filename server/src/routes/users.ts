import { Router } from 'express';

import {  createUser, loginUser, logoutUser, authUser, deleteUser } from '../controllers/users';
import { addBasket, checkout } from '../controllers/basket';
import { getOrders, completeOrder } from '../controllers/orders';
import { auth } from '../middleware/auth';
import { validateRegister } from '../middleware/validate';

const router = Router();

// User Controller
router.post('/register',validateRegister, createUser);
router.post('/login', loginUser);
router.post('/logout', auth , logoutUser);
router.post('/auth', auth, authUser);
router.delete('/:id', deleteUser)

//Basket Controller
router.post('/basket',auth, addBasket);
router.post('/basket/checkout', auth, checkout)

//Order Controller
router.get('/orders',auth , getOrders);
router.post('/orders/:id', completeOrder)



export default router;
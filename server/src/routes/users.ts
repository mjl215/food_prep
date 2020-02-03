import { Router } from 'express';

import {  createUser, loginUser, logoutUser, authUser, } from '../controllers/users';
import { addBasket, checkout } from '../controllers/basket';
import { getOrders, completeOrder } from '../controllers/orders';
import { auth } from '../middleware/auth';

const router = Router();

// User Controller
router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/logout', auth , logoutUser);
router.post('/auth', auth, authUser);

//Basket Controller
router.post('/basket',auth, addBasket);
router.post('/basket/checkout', auth, checkout)

//Order Controller
router.get('/orders',auth , getOrders);
router.post('/orders/:id', completeOrder)



export default router;
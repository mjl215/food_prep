import { Router } from 'express';

import {  createUser, loginUser, logoutUser, authUser, deleteUser, passwordEmailReset } from '../controllers/users';
import { deleteRecipeByUserId, deleteImageByUserID } from '../controllers/recipe';
import { addBasket, checkout } from '../controllers/basket';
import { getOrders, completeOrder } from '../controllers/orders';
import { auth } from '../middleware/auth';
import { validateRegister } from '../middleware/validate';

const router = Router();

// User Controller
router.post('/register',/**validateRegister,**/ createUser);
router.post('/login', loginUser);
router.post('/logout', auth , logoutUser);
router.post('/auth', auth, authUser);
router.post('/forgotPassword', passwordEmailReset)
router.delete('', auth, deleteUser, deleteImageByUserID, deleteRecipeByUserId);

//Basket Controller
router.post('/basket',auth, addBasket);
router.post('/basket/checkout', auth, checkout)

//Order Controller
router.get('/orders',auth , getOrders);
router.post('/orders/:id', completeOrder)



export default router; 
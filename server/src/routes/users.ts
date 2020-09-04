import { Router } from 'express';
import multer from 'multer';

import {  
        createUser, loginUser, logoutUser, 
        authUser, deleteUser, passwordEmailReset, 
        resetPasswordCheck, resetPassword, resetPasswordEdit, 
        uploadProfilePicture, getProfilePicture , updateProfilePicture,
        updateUser
        } from '../controllers/users';
import { deleteRecipeByUserId, deleteImageByUserID } from '../controllers/recipe';
import { addBasket, checkout } from '../controllers/basket';
import { getOrders, completeOrder } from '../controllers/orders';
import { auth } from '../middleware/auth';
import { validateRegister } from '../middleware/validate';

const router = Router();

const upload = multer({
        //dest: 'images'
    });

// User Controller
router.post('/register', validateRegister, createUser);
router.post('/profilePicture', upload.single('upload'), uploadProfilePicture); //add auth if possible
router.get('/profilePicture/:id', getProfilePicture);
router.patch('/profilePicture', auth, upload.single('upload'), updateProfilePicture);
router.post('/login', loginUser);
router.post('/logout', auth , logoutUser);
router.post('/auth', auth, authUser);
router.post('/forgotPassword', passwordEmailReset);
router.get('/resetCheck', resetPasswordCheck);
router.post('/resetPassword', resetPassword);
router.post('/resetPasswordEdit', resetPasswordEdit)
router.delete('', auth, deleteUser, deleteImageByUserID, deleteRecipeByUserId);
router.patch('/update',auth, updateUser)

//Basket Controller
router.post('/basket',auth, addBasket);
router.post('/basket/checkout', auth, checkout)

//Order Controller
router.get('/orders',auth , getOrders);
router.post('/orders/:id', completeOrder)



export default router; 
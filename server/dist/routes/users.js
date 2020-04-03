"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const recipe_1 = require("../controllers/recipe");
const basket_1 = require("../controllers/basket");
const orders_1 = require("../controllers/orders");
const auth_1 = require("../middleware/auth");
const router = express_1.Router();
// User Controller
router.post('/register', /**validateRegister,**/ users_1.createUser);
router.post('/login', users_1.loginUser);
router.post('/logout', auth_1.auth, users_1.logoutUser);
router.post('/auth', auth_1.auth, users_1.authUser);
router.post('/forgotPassword', users_1.passwordEmailReset);
router.delete('', auth_1.auth, users_1.deleteUser, recipe_1.deleteImageByUserID, recipe_1.deleteRecipeByUserId);
//Basket Controller
router.post('/basket', auth_1.auth, basket_1.addBasket);
router.post('/basket/checkout', auth_1.auth, basket_1.checkout);
//Order Controller
router.get('/orders', auth_1.auth, orders_1.getOrders);
router.post('/orders/:id', orders_1.completeOrder);
exports.default = router;

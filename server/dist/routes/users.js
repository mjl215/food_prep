"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const users_1 = require("../controllers/users");
const recipe_1 = require("../controllers/recipe");
const basket_1 = require("../controllers/basket");
const orders_1 = require("../controllers/orders");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const router = express_1.Router();
const upload = multer_1.default({
//dest: 'images'
});
// User Controller
router.post('/register', validate_1.validateRegister, users_1.createUser);
router.post('/profilePicture', upload.single('upload'), users_1.uploadProfilePicture);
router.post('/login', users_1.loginUser);
router.post('/logout', auth_1.auth, users_1.logoutUser);
router.post('/auth', auth_1.auth, users_1.authUser);
router.post('/forgotPassword', users_1.passwordEmailReset);
router.get('/resetCheck', users_1.resetPasswordCheck);
router.post('/resetPassword', users_1.resetPassword);
router.post('/resetPasswordEdit', users_1.resetPasswordEdit);
router.delete('', auth_1.auth, users_1.deleteUser, recipe_1.deleteImageByUserID, recipe_1.deleteRecipeByUserId);
router.patch('/update', auth_1.auth, users_1.updateUser);
//Basket Controller
router.post('/basket', auth_1.auth, basket_1.addBasket);
router.post('/basket/checkout', auth_1.auth, basket_1.checkout);
//Order Controller
router.get('/orders', auth_1.auth, orders_1.getOrders);
router.post('/orders/:id', orders_1.completeOrder);
exports.default = router;

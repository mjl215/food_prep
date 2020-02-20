"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const order_1 = __importDefault(require("../models/order"));
//Add User Basked
exports.addBasket = async (req, res, next) => {
    try {
        const user = await user_1.default.updateOne({ _id: req.user.id }, { basket: req.body.basket });
        if (!user) {
            throw new Error('user not found');
        }
        const updatedUser = await user_1.default.findOne({ _id: req.user.id });
        res.send(updatedUser);
        // const newBasket = {recipe: req.body.recipe, quantity: req.body.quantity}
        // user.basket = [...user.basket, newBasket];
    }
    catch (e) {
        console.log(e);
    }
};
exports.checkout = async (req, res, next) => {
    try {
        const basket = req.body.basket;
        console.log(basket);
        basket.forEach((basketItem) => {
            const newOrder = {
                recipe: basketItem.recipe,
                buyer: req.user._id,
                suplier: basketItem.owner,
                quantity: basketItem.quantity,
                status: 'OPEN',
                basketId: basketItem.basketId
            };
            const order = new order_1.default(newOrder);
            order.save();
        });
        const user = await user_1.default.updateOne({ _id: req.user.id }, { basket: [] });
        res.send();
    }
    catch (e) {
    }
};

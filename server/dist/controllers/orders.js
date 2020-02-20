"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const order_1 = __importDefault(require("../models/order"));
exports.getOrders = async (req, res, next) => {
    try {
        if (req.user.userType === 'BUYER') {
            const user = await user_1.default.findById(req.user._id);
            if (!user) {
                throw new Error('no user found');
            }
            await user.populate('buyerOrder').execPopulate();
            res.send({ orders: user.buyerOrder });
        }
        else {
            const user = await user_1.default.findById(req.user._id);
            if (!user) {
                throw new Error('no user found');
            }
            await user.populate('suplierOrder').execPopulate();
            res.send({ orders: user.suplierOrder });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.completeOrder = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const order = order_1.default.findByIdAndUpdate(req.params.id, { status: 'COMPLETE' });
        //const order = Order.findByIdAndUpdate
    }
    catch (error) {
        console.log(error);
    }
};

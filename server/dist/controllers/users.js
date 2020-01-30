"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//Create a User
exports.createUser = async (req, res, next) => {
    const user = new user_1.default(req.body);
    const token = await user.generateAuthToken();
    user.save((err) => {
        if (err) {
            res.send(err);
        }
        else {
            console.log('saving');
            res.send({ token, user });
        }
    });
};
//Login User
exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await user_1.default.findOne({ email });
        if (!user) {
            throw new Error('Unable to login');
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Unable to login');
        }
        const token = await user.generateAuthToken();
        res.send({ token, user });
    }
    catch (error) {
        res.status(400).send();
    }
};
//Logout User
exports.logoutUser = async (req, res, next) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    }
    catch (e) {
        res.status(500).send(e);
    }
};
//Check Auth of User
exports.authUser = async (req, res, next) => {
    try {
        res.send({ user: req.user, token: req.token });
    }
    catch (e) {
        console.log(e);
    }
};
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
//Edit basket item
exports.editBasketItem = async (req, res, next) => {
    try {
        console.log(req.body);
        //const user = await User.findOneAndUpdate({}, { })
        //   if(!user){
        //     throw new Error('user not found')
        // }
        // console.log(user._id)
        res.send();
    }
    catch (e) {
    }
};
//remove basket item
exports.removeBasketItem = async (req, res, next) => {
    try {
    }
    catch (e) {
    }
};
//Remove basket
exports.removeBasket = async (req, res, next) => {
    try {
    }
    catch (e) {
    }
};

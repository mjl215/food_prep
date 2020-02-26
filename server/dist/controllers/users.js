"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//Create a User
exports.createUser = async (req, res, next) => {
    //console.log(req.body)
    try {
        if (!validator_1.default.isLength(req.body.password, { min: 6, max: 20 })) {
            throw new Error();
        }
        const user = new user_1.default(req.body);
        const token = await user.generateAuthToken();
        //await user.save()
        res.send({ token, user });
    }
    catch (error) {
        console.log(error.message);
    }
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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
// Recipe Class
//import { Todo } from '../models/todo';
//const TODOS: Todo[] = [];
exports.createUser = async (req, res, next) => {
    const user = new user_1.default(req.body);
    const token = await user.generateAuthToken();
    user.save((err) => {
        if (err) {
            res.send(err);
        }
        else {
            console.log('saving');
            res.send({ token });
        }
    });
};

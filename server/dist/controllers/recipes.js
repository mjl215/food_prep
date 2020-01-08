"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = __importDefault(require("../models/book"));
// Recipe Class
//import { Todo } from '../models/todo';
//const TODOS: Todo[] = [];
exports.getRecipes = (req, res, next) => {
    res.status(200).json({ message: 'Recipe' });
};
exports.addBook = (req, res, next) => {
    const book = new book_1.default({ title: 'test', author: 'Testauthor' });
    book.save((err) => {
        if (err) {
            res.send(err);
        }
        else {
            console.log('saving');
            res.send(book);
        }
    });
};

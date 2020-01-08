"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const connect_1 = __importDefault(require("./db/connect"));
const users_1 = __importDefault(require("./routes/users"));
const app = express_1.default();
const db = 'mongodb://127.0.0.1:27017/recipe';
connect_1.default(db);
app.use(body_parser_1.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/user', users_1.default);
console.log('hi from the server');
app.listen(3000);

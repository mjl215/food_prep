"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
exports.auth = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, 'recipe'); // fix this casting
            const user = await user_1.default.findOne({ _id: decoded._id, 'tokens.token': token });
            if (!user) {
                throw new Error();
            }
            req.token = token;
            req.user = user;
            console.log(req.user);
            next();
        }
    }
    catch (error) {
        res.status(401).send({ error: 'please authenticate' });
    }
};

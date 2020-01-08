"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = (db) => {
    const connect = () => {
        mongoose_1.default.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            return console.log(`connected to ${db}`);
        })
            .catch(err => {
            console.log('Error connecting to db: ', err);
        });
    };
    connect();
    mongoose_1.default.connection.on("disconnect", connect);
};

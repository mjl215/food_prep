"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    recipe: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    },
    buyer: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    },
    suplier: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});
const Order = mongoose_1.default.model("Order", OrderSchema);
exports.default = Order;

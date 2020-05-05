"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const additionalImageSchema = new mongoose_1.default.Schema({
    imageArray: {
        type: [],
        required: true
    },
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    recipe: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    }
});
const AdditionalImage = mongoose_1.default.model("AdditionalImage", additionalImageSchema);
exports.default = AdditionalImage;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const profileImageSchema = new mongoose_1.default.Schema({
    image: {
        type: Buffer,
        required: true
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    }
});
const ProfileImage = mongoose_1.default.model("ProfileImage", profileImageSchema);
exports.default = ProfileImage;

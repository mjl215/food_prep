"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const recipeImageSchema = new mongoose_1.default.Schema({
    image: {
        type: Buffer,
        required: true
    }
});
const RecipeImage = mongoose_1.default.model("RecipeImage", recipeImageSchema);
exports.default = RecipeImage;

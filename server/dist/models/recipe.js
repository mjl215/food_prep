"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const recipeSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    costPerMeal: {
        type: Number,
        required: true
    },
    ingredients: [
        {
            type: String
        }
    ],
    vegetarian: {
        type: Boolean,
        required: true
    },
    vegan: {
        type: Boolean,
        required: true
    },
    image: {
        type: mongoose_1.default.Schema.Types.ObjectId
    },
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    },
    basePrepTime: {
        type: Number,
        required: true
    },
    additionalPrepTime: {
        type: Number,
        required: true
    }
});
const Recipe = mongoose_1.default.model("Recipe", recipeSchema);
exports.default = Recipe;

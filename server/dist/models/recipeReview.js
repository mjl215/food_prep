"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const recipeReviewSchema = new mongoose_1.default.Schema({
    recipeId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    review: {
        type: String
    }
});
const RecipeReview = mongoose_1.default.model("RecipeReview", recipeReviewSchema);
exports.default = RecipeReview;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recipeReview_1 = __importDefault(require("../models/recipeReview"));
const user_1 = __importDefault(require("../models/user"));
exports.PostRecipeReview = async (req, res, next) => {
    try {
        const user = await user_1.default.findById(req.user._id);
        if (!user) {
            throw new Error('user not found');
        }
        const review = new recipeReview_1.default({
            ...req.body,
            userId: req.user._id
        });
        const savedReview = await review.save();
        res.send('hi');
    }
    catch (e) {
        res.send(e);
    }
};

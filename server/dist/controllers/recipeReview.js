"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recipeReview_1 = __importDefault(require("../models/recipeReview"));
const user_1 = __importDefault(require("../models/user"));
exports.postRecipeReview = async (req, res, next) => {
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
exports.getReviewsForRecipe = async (req, res, next) => {
    try {
        const reviews = await recipeReview_1.default.find({ recipeId: req.params.id });
        res.send(reviews);
    }
    catch (e) {
        res.send(e);
    }
};
exports.getReviewsForUser = async (req, res, next) => {
    try {
        console.log(req.user._id);
        if (req.user._id != req.params.id) {
            return res.send('error');
        }
        const reviews = await recipeReview_1.default.find({ userId: req.params.id });
        res.send(reviews);
    }
    catch (e) {
        res.send(e);
    }
};
exports.deleteRecipeReview = async (req, res, next) => {
    try {
        const deletedReview = await recipeReview_1.default.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        res.send(deletedReview);
    }
    catch (e) {
        res.send(e);
    }
};
exports.updateRecipeReview = async (req, res, next) => {
    try {
        const updatedReview = await recipeReview_1.default.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body.update, {
            new: true
        });
        if (!updatedReview) {
            return res.send('not found');
        }
        return res.send(updatedReview);
    }
    catch (e) {
        res.send(e);
    }
};

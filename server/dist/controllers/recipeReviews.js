"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRecipeReview = async (req, res, next) => {
    try {
        console.log(req.body.recipeId);
        res.send('hi');
    }
    catch (e) {
        res.send(e.message);
    }
};

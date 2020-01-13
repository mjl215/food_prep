"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recipe_1 = __importDefault(require("../models/recipe"));
exports.uploadRecipe = async (req, res, next) => {
    const recipe = new recipe_1.default();
    recipe.image = req.file.buffer;
    await recipe.save();
    res.send();
};
exports.getAllRecipes = async (req, res, next) => {
    const recipes = await recipe_1.default.find();
    res.send(recipes);
};
exports.getRecipeImage = async (req, res, next) => {
    try {
        const recipe = await recipe_1.default.findById(req.params.id);
        if (!recipe || !recipe.image) {
            throw new Error();
        }
        res.set('Content-type', 'image/jpg');
        res.send(recipe.image);
    }
    catch (error) {
        res.status(404).send();
    }
};

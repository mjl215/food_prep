"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recipeImages_1 = __importDefault(require("../models/recipeImages"));
const recipe_1 = __importDefault(require("../models/recipe"));
//Add Image for Recipe
exports.uploadRecipeImage = async (req, res, next) => {
    const recipeImage = new recipeImages_1.default();
    recipeImage.image = req.file.buffer;
    const savedImage = await recipeImage.save();
    res.send(savedImage._id);
};
//Add Recipe
exports.uploadRecipe = async (req, res, next) => {
    try {
        const recipe = new recipe_1.default(req.body);
        await recipe.save();
        res.send();
    }
    catch (error) {
        console.log(error);
    }
};
//Get All Recipes
exports.getAllRecipes = async (req, res, next) => {
    const recipes = await recipeImages_1.default.find();
    res.send(recipes);
};
//Get recipe Image
exports.getRecipeImage = async (req, res, next) => {
    try {
        const recipe = await recipeImages_1.default.findById(req.params.id);
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

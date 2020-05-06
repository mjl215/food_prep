"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recipeImages_1 = __importDefault(require("../models/recipeImages"));
const recipe_1 = __importDefault(require("../models/recipe"));
const additionalImages_1 = __importDefault(require("../models/additionalImages"));
//Add Image for Recipe
exports.uploadRecipeImage = async (req, res, next) => {
    try {
        console.log(req.file);
        console.log(req.body.mainImage);
        const recipeImage = new recipeImages_1.default();
        recipeImage.image = req.file.buffer;
        recipeImage.recipe = req.body.recipe;
        recipeImage.owner = req.user._id;
        recipeImage.mainImage = req.body.mainImage;
        const savedImage = await recipeImage.save();
        res.send(savedImage._id);
    }
    catch (error) {
        res.status(404).send();
    }
};
exports.uploadRecipeAdditionalImages = async (req, res, next) => {
    try {
        console.log(req.files);
        if (req.files.length === 0) {
            console.log('no add file');
            return res.send();
        }
        const additionalImage = new additionalImages_1.default();
        additionalImage.imageArray = req.files;
        const images = await additionalImage.save();
        res.send(images);
    }
    catch (error) {
        res.status(404).send();
    }
};
//Add Recipe
exports.uploadRecipe = async (req, res, next) => {
    try {
        const recipeInfo = req.body;
        recipeInfo.owner = req.user._id;
        const recipe = new recipe_1.default(recipeInfo);
        await recipe.save();
        res.send(recipe.id);
    }
    catch (error) {
        console.log(error);
    }
};
//Get All Recipes
exports.getAllRecipes = async (req, res, next) => {
    const recipes = await recipe_1.default.find();
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
//Get single recipe
exports.getRecipe = async (req, res, next) => {
    try {
        const recipe = await recipe_1.default.findById(req.params.id);
        res.send(recipe);
    }
    catch (error) {
        console.log(error);
    }
};
exports.getRecipeByUser = async (req, res, next) => {
    try {
        const recipes = await recipe_1.default.find({ owner: req.user.id });
        res.send(recipes);
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteRecipeByUserId = async (req, res, next) => {
    try {
        await recipe_1.default.deleteMany({ owner: req.user._id });
        return res.send(res.locals.user);
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteRecipeById = async (req, res, next) => {
    try {
        const recipe = await recipe_1.default.findByIdAndDelete(req.params.id);
        if (!recipe) {
            return res.status(404).send();
        }
        res.locals.recipe = recipe;
        next();
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteImageByRecipeId = async (req, res, next) => {
    try {
        const recipeImage = await recipeImages_1.default.findByIdAndDelete(res.locals.recipe.image);
        console.log(recipeImage);
        return res.send(res.locals.recipe);
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteImageByUserID = async (req, res, next) => {
    try {
        const recipeImages = await recipeImages_1.default.deleteMany({ owner: req.user._id });
        console.log(recipeImages);
        next();
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteImageById = async (req, res, next) => {
    try {
        const recipeImage = await recipeImages_1.default.findByIdAndDelete(req.params.id);
        if (!recipeImage) {
            return res.status(404).send();
        }
        res.send(recipeImage._id);
    }
    catch (error) {
        console.log(error);
    }
};

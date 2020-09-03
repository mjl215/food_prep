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
        console.log(req.body.recipe);
        const recipeImage = new recipeImages_1.default();
        recipeImage.image = req.file.buffer;
        recipeImage.recipe = req.body.recipe;
        recipeImage.owner = req.user._id;
        recipeImage.mainImage = req.body.mainImage;
        const savedImage = await recipeImage.save();
        res.send(savedImage._id);
    }
    catch (error) {
        console.log(error);
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
exports.getMainRecipeImage = async (req, res, next) => {
    try {
        // const recipe = await RecipeImage.findById(req.params.id);
        const recipeImage = await recipeImages_1.default.findOne({ recipe: req.params.id, mainImage: true });
        if (!recipeImage || !recipeImage.image) {
            throw new Error();
        }
        res.set('Content-type', 'image/jpg');
        res.send(recipeImage.image);
    }
    catch (error) {
        res.status(404).send();
    }
};
exports.getRecipeImageById = async (req, res, next) => {
    try {
        const recipeImage = await recipeImages_1.default.findById(req.params.id);
        if (!recipeImage || !recipeImage.image) {
            throw new Error();
        }
        res.set('Content-type', 'image/jpg');
        res.send(recipeImage.image);
    }
    catch (error) {
        res.status(404).send();
    }
};
exports.getAllImageIds = async (req, res, next) => {
    try {
        // const recipe = await RecipeImage.findById(req.params.id);
        const recipeImages = await recipeImages_1.default.find({ recipe: req.params.id });
        if (!recipeImages) {
            throw new Error();
        }
        const sortedRecipe = recipeImages.sort((a, b) => b.mainImage - a.mainImage);
        const sortedIds = sortedRecipe.map((image) => {
            const obj = {
                id: image.id,
                mainImage: image.mainImage
            };
            return obj;
        });
        res.send(sortedIds);
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
        console.log(' in deleteRecipeByUserId');
        await recipe_1.default.deleteMany({ owner: req.user._id });
        return res.send(res.locals.user);
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteRecipeById = async (req, res, next) => {
    try {
        //fix this to check for recipe owner
        console.log('in deleteRecipeById');
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
        const recipeImage = await recipeImages_1.default.deleteMany({ recipe: res.locals.recipe._id });
        console.log(recipeImage);
        return res.send(res.locals.recipe);
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteImageByUserID = async (req, res, next) => {
    try {
        console.log('in deleteImageByUserID');
        const recipeImages = await recipeImages_1.default.deleteMany({ owner: req.user._id });
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
exports.updateRecipe = async (req, res, next) => {
    try {
        // // console.log(req.user);
        // // console.log(req.body);
        // const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
        //     new: true
        //   });
        if (req.user.id === req.body.owner) {
            const updatedRecipe = await recipe_1.default.findByIdAndUpdate(req.body.recipe, req.body, {
                new: true
            });
            console.log(req.body);
            return res.send(updatedRecipe);
        }
        return res.send('error');
    }
    catch (e) {
        res.send(400);
    }
};
exports.updateImageDelete = async (req, res, next) => {
    try {
        console.log(req.body);
        if (req.body.delete != null) {
            await recipeImages_1.default.deleteMany({ _id: { $in: req.body.delete } });
            return res.send('hi');
        }
        return res.send('no images deleted');
    }
    catch (e) {
        res.send(e.message);
    }
};
exports.updateImage = async (req, res, next) => {
    try {
        console.log(req.body.update);
        const updatedImage = await recipeImages_1.default.findByIdAndUpdate(req.body.update.id, req.body.update, {
            new: true
        });
        console.log(updatedImage);
        res.send(200);
    }
    catch (e) {
        res.send(e.message);
    }
};

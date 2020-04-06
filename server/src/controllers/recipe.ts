import { Request, Response, NextFunction } from 'express';

import RecipeImage from '../models/recipeImages';
import Recipe from '../models/recipe';

//Add Image for Recipe
export const uploadRecipeImage = async (req: Request, res: Response, next: NextFunction) => {
    const recipeImage = new RecipeImage();
    recipeImage.image = req.file.buffer;
    recipeImage.owner = req.user._id;
    const savedImage = await recipeImage.save();
    res.send(savedImage._id);
};

//Add Recipe
export const uploadRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipeInfo = req.body
        recipeInfo.owner = req.user._id
        const recipe = new Recipe(recipeInfo);
        await recipe.save();
        res.send()

    } catch (error) {
        console.log(error)
    }
    
   
    
}

//Get All Recipes
export const getAllRecipes = async (req: Request, res: Response, next: NextFunction) => {
    const recipes = await Recipe.find();
    res.send(recipes);
}

//Get recipe Image
export const getRecipeImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipe = await RecipeImage.findById(req.params.id)

        if(!recipe || !recipe.image){
            throw new Error();
        }

        res.set('Content-type', 'image/jpg');
        res.send(recipe.image);

    } catch (error) {
        res.status(404).send();
    }
}

//Get single recipe
export const getRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
        res.send(recipe)
    } catch (error) {
        console.log(error)
    }
}

export const getRecipeByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipes = await Recipe.find({owner: req.user.id});
        
        res.send(recipes);
    } catch (error) {
        console.log(error);
    }
}

export const deleteRecipeByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Recipe.deleteMany({owner: req.user._id});
        return res.send(res.locals.user);
    } catch (error) {
        console.log(error);
    } 
}

export const deleteRecipeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        
        if(!recipe){
            return res.status(404).send();
        }

        res.locals.recipe = recipe;

        next()
    } catch (error) {
        console.log(error)
    } 
}

export const deleteImageByRecipeId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipeImage = await RecipeImage.findByIdAndDelete(res.locals.recipe.image);
        console.log(recipeImage);

        return res.send(res.locals.recipe); 
    } catch (error) {
        console.log(error); 
    } 
}

export const deleteImageByUserID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipeImages = await RecipeImage.deleteMany({owner: req.user._id});
        console.log(recipeImages);
        
        next();

    } catch (error) {
        console.log(error);
    } 
};

export const deleteImageById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipeImage = await RecipeImage.findByIdAndDelete(req.params.id);
        
        if(!recipeImage){
            return res.status(404).send()
        }
        
        res.send(recipeImage._id);

    } catch (error) {
        console.log(error);
    } 
};






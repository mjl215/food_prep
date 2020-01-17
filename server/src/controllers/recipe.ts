import { Request, Response, NextFunction } from 'express';

import RecipeImage from '../models/recipeImages';
import Recipe from '../models/recipe';

//Add Image for Recipe
export const uploadRecipeImage = async (req: Request, res: Response, next: NextFunction) => {
    const recipeImage = new RecipeImage();
    recipeImage.image = req.file.buffer;
    const savedImage = await recipeImage.save();
    res.send(savedImage._id);
};

//Add Recipe
export const uploadRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        const recipe = new Recipe(req.body);
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




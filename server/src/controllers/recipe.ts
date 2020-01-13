import { Request, Response, NextFunction } from 'express';

import Recipe from '../models/recipe';

export const uploadRecipe = async (req: Request, res: Response, next: NextFunction) => {
    const recipe = new Recipe();
    recipe.image = req.file.buffer;
    await recipe.save();
    res.send();
};

export const getAllRecipes = async (req: Request, res: Response, next: NextFunction) => {
    const recipes = await Recipe.find();
    res.send(recipes);
}

export const getRecipeImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipe = await Recipe.findById(req.params.id)

        if(!recipe || !recipe.image){
            throw new Error();
        }

        res.set('Content-type', 'image/jpg');
        res.send(recipe.image);

    } catch (error) {
        res.status(404).send();
    }
}




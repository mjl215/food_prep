import { Request, Response, NextFunction } from 'express';

import RecipeImage from '../models/recipeImages';
import Recipe from '../models/recipe';
import AdditionalImage from '../models/additionalImages';

//Add Image for Recipe
export const uploadRecipeImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.file);
        console.log(req.body.mainImage);
        console.log(req.body.recipe);

        const recipeImage = new RecipeImage();
        recipeImage.image = req.file.buffer;
        recipeImage.recipe = req.body.recipe;
        recipeImage.owner = req.user._id;
        recipeImage.mainImage = req.body.mainImage;
        const savedImage = await recipeImage.save();
        res.send(savedImage._id);

    } catch (error) {
        console.log(error);
        res.status(404).send();
    }
};

export const uploadRecipeAdditionalImages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.files);
        if(req.files.length === 0){
            console.log('no add file')
            return res.send()
        }
        
        const additionalImage = new AdditionalImage();
        additionalImage.imageArray = req.files;
        const images = await additionalImage.save()
        
        res.send(images);
    } catch (error) {
        res.status(404).send();
    }
}

//Add Recipe
export const uploadRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const recipeInfo = req.body
        recipeInfo.owner = req.user._id
        const recipe = new Recipe(recipeInfo);
        await recipe.save();
        res.send(recipe.id);
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
export const getMainRecipeImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const recipe = await RecipeImage.findById(req.params.id);
        const recipeImage = await RecipeImage.findOne({ recipe: req.params.id, mainImage: true})

        if(!recipeImage || !recipeImage.image){
            throw new Error();
        }

        res.set('Content-type', 'image/jpg');
        res.send(recipeImage.image);

    } catch (error) {
        res.status(404).send();
    }
}

export const getRecipeImageById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipeImage = await RecipeImage.findById(req.params.id);

        if(!recipeImage || !recipeImage.image){
            throw new Error();
        }

        res.set('Content-type', 'image/jpg');
        res.send(recipeImage.image);

    } catch (error) {
        res.status(404).send();
    }
}

export const getAllImageIds = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const recipe = await RecipeImage.findById(req.params.id);
        const recipeImages = await RecipeImage.find({ recipe: req.params.id})

        if(!recipeImages){
            throw new Error();
        }

        const sortedRecipe = recipeImages.sort((a: any, b: any) => b.mainImage - a.mainImage);
        const sortedIds = sortedRecipe.map((image) => {
            const obj = {
                id: image.id,
                mainImage: image.mainImage
            }
            return obj })
        res.send(sortedIds);

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
        console.log(' in deleteRecipeByUserId');
        await Recipe.deleteMany({owner: req.user._id});
        return res.send(res.locals.user);
    } catch (error) {
        console.log(error);
    } 
}

export const deleteRecipeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('in deleteRecipeById')
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
        const recipeImage = await RecipeImage.deleteMany({recipe: res.locals.recipe._id});
        console.log(recipeImage);

        return res.send(res.locals.recipe); 
    } catch (error) {
        console.log(error); 
    } 
}

export const deleteImageByUserID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('in deleteImageByUserID');
        const recipeImages = await RecipeImage.deleteMany({owner: req.user._id});
        
        
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

export const updateRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // // console.log(req.user);
        // // console.log(req.body);

        // const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
        //     new: true
        //   });

        if(req.user.id === req.body.owner){
            const updatedRecipe = await Recipe.findByIdAndUpdate(req.body.recipe, req.body, {
                new: true
            })
            console.log(req.body);
            return res.send(updatedRecipe);
        }

        return res.send('error');
        

    } catch (e) {
        res.send(400);
    }
}


export const updateImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        

        return res.send('hi');
        

    } catch (e) {
        res.send(400);
    }
}






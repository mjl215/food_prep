import { Router } from 'express';
import multer from 'multer';

import {uploadRecipe ,uploadRecipeImage, getAllRecipes, getRecipeImage, getRecipe } from '../controllers/recipe';

const router = Router();

const upload = multer({
    //dest: 'images'
});

//POST
router.post('', uploadRecipe);
router.post('/image', upload.single('upload'), uploadRecipeImage)
//GET
router.get('', getAllRecipes);
router.get('/:id', getRecipe);
router.get('/image/:id', getRecipeImage);

export default router;

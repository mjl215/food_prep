import { Router } from 'express';
import multer from 'multer';

import {uploadRecipe ,uploadRecipeImage, getAllRecipes, getRecipeImage, getRecipe, deleteRecipeById, deleteImageByRecipeId, deleteImageById } from '../controllers/recipe';
import { auth } from '../middleware/auth';

const router = Router();

const upload = multer({
    //dest: 'images'
});

//POST
router.post('', auth, uploadRecipe);
router.post('/image', auth, upload.single('upload'), uploadRecipeImage)
//GET
router.get('', getAllRecipes);
router.get('/:id', getRecipe);
router.get('/image/:id', getRecipeImage);
//DELETE
router.delete('/:id', deleteRecipeById, deleteImageByRecipeId );
router.delete('/image/:id', deleteImageById)
export default router;

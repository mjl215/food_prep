import { Router } from 'express';
import multer from 'multer';

import {
    uploadRecipe ,uploadRecipeImage, uploadRecipeAdditionalImages, getAllRecipes, 
    getRecipeImage, getRecipe, deleteRecipeById, 
    deleteImageByRecipeId, deleteImageById, getRecipeByUser
} from '../controllers/recipe';
import { auth } from '../middleware/auth';
import { validateAddRecipe } from '../middleware/validate';

const router = Router();

const upload = multer({
    //dest: 'images'
});

//POST
router.post('', auth, validateAddRecipe, uploadRecipe);
router.post('/image', auth, upload.single('upload'), uploadRecipeImage)
router.post('/additional-image', upload.any(), uploadRecipeAdditionalImages)
//GET
router.get('', getAllRecipes);
router.get('/:id', getRecipe);
router.get('/image/:id', getRecipeImage);
router.get('/get-recipe/owner', auth, getRecipeByUser);
//DELETE
router.delete('/:id', deleteRecipeById, deleteImageByRecipeId );
router.delete('/image/:id', deleteImageById);

export default router;

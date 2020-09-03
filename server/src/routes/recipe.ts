import { Router } from 'express';
import multer from 'multer';

import {
    uploadRecipe ,uploadRecipeImage, uploadRecipeAdditionalImages, getAllRecipes, 
    getMainRecipeImage, getRecipeImageById,getAllImageIds, getRecipe, deleteRecipeById, 
    deleteImageByRecipeId, deleteImageById, getRecipeByUser, updateRecipe, updateImageDelete,
    updateImage
} from '../controllers/recipe';

import { postRecipeReview, deleteRecipeReview, getReviewsForRecipe, 
    updateRecipeReview, getReviewsForUser
} from '../controllers/recipeReview';
import { auth } from '../middleware/auth';
import { validateAddRecipe } from '../middleware/validate';

const router = Router();

const upload = multer({
    //dest: 'images'
});

//POST
router.post('', auth, validateAddRecipe, uploadRecipe);
router.post('/image', auth, upload.single('upload'), uploadRecipeImage)
router.post('/additional-image', upload.array('upload'), uploadRecipeAdditionalImages)
router.post('/review', auth, postRecipeReview);
//GET
router.get('', getAllRecipes);
router.get('/:id', getRecipe);
router.get('/mainImage/:id', getMainRecipeImage);
router.get('/image/:id', getRecipeImageById)
router.get('/image/getIds/:id', getAllImageIds);
router.get('/get-recipe/owner', auth, getRecipeByUser);
router.get('/review/:id', getReviewsForRecipe);
router.get('/review/user/:id', auth, getReviewsForUser);
//DELETE
router.delete('/:id', auth, deleteRecipeById, deleteImageByRecipeId );
router.delete('/image/:id', deleteImageById); //ADD auth
router.delete('/review/:id', auth, deleteRecipeReview)
//PATCH 
router.patch('/update', auth, updateRecipe);
router.patch('/imageUpdateDelete',auth, updateImageDelete)
router.patch('/image', updateImage); // ADD AUTH
router.patch('/review/:id', auth, updateRecipeReview)


export default router;

import { Router } from 'express';
import multer from 'multer';

import { uploadRecipe, getAllRecipes } from '../controllers/recipe';

const router = Router();

const upload = multer({
    //dest: 'images'
});

router.post('/image', upload.single('upload'), uploadRecipe)
router.get('/image', getAllRecipes)

export default router;

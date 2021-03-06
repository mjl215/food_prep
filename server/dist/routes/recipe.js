"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const recipe_1 = require("../controllers/recipe");
const recipeReview_1 = require("../controllers/recipeReview");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const router = express_1.Router();
const upload = multer_1.default({
//dest: 'images'
});
//POST
router.post('', auth_1.auth, validate_1.validateAddRecipe, recipe_1.uploadRecipe);
router.post('/image', auth_1.auth, upload.single('upload'), recipe_1.uploadRecipeImage);
router.post('/additional-image', upload.array('upload'), recipe_1.uploadRecipeAdditionalImages);
router.post('/review', auth_1.auth, recipeReview_1.postRecipeReview);
//GET
router.get('', recipe_1.getAllRecipes);
router.get('/:id', recipe_1.getRecipe);
router.get('/mainImage/:id', recipe_1.getMainRecipeImage);
router.get('/image/:id', recipe_1.getRecipeImageById);
router.get('/image/getIds/:id', recipe_1.getAllImageIds);
router.get('/get-recipe/owner', auth_1.auth, recipe_1.getRecipeByUser);
router.get('/review/:id', recipeReview_1.getReviewsForRecipe);
router.get('/review/user/:id', auth_1.auth, recipeReview_1.getReviewsForUser);
//DELETE
router.delete('/:id', auth_1.auth, recipe_1.deleteRecipeById, recipe_1.deleteImageByRecipeId);
router.delete('/image/:id', recipe_1.deleteImageById); //ADD auth
router.delete('/review/:id', auth_1.auth, recipeReview_1.deleteRecipeReview);
//PATCH 
router.patch('/update', auth_1.auth, recipe_1.updateRecipe);
router.patch('/imageUpdateDelete', auth_1.auth, recipe_1.updateImageDelete);
router.patch('/image', recipe_1.updateImage); // ADD AUTH
router.patch('/review/:id', auth_1.auth, recipeReview_1.updateRecipeReview);
exports.default = router;

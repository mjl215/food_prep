"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const recipe_1 = require("../controllers/recipe");
const router = express_1.Router();
const upload = multer_1.default({
//dest: 'images'
});
//POST
router.post('', recipe_1.uploadRecipe);
router.post('/image', upload.single('upload'), recipe_1.uploadRecipeImage);
//GET
router.get('', recipe_1.getAllRecipes);
router.get('/:id', recipe_1.getRecipe);
router.get('/image/:id', recipe_1.getRecipeImage);
exports.default = router;

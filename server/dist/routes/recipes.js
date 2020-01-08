"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipes_1 = require("../controllers/recipes");
const router = express_1.Router();
router.get('/', recipes_1.addBook);
exports.default = router;

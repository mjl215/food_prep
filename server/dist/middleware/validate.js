"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const validator_1 = __importDefault(require("validator"));
exports.validateRegister = async (req, res, next) => {
    try {
        const { email, firstName, password, confirmPassword, location } = req.body;
        const { address, addressId } = location;
        const errors = [];
        if (password.length < 6 || password.length > 20) {
            errors.push({
                message: 'password must be between 6 and 20 charecters',
                type: 'register-password',
                id: uuid_1.v4()
            });
        }
        if (!validator_1.default.equals(password, confirmPassword)) {
            errors.push({
                message: 'passwords must be equal',
                type: 'register-confirmPassword',
                id: uuid_1.v4()
            });
        }
        if (firstName.length < 4 || firstName.length > 40) {
            errors.push({
                message: 'name must be between 4 and 40 charecters',
                type: 'register-name',
                id: uuid_1.v4()
            });
        }
        if (!validator_1.default.isEmail(email)) {
            errors.push({
                message: 'email address not valid',
                type: 'register-email',
                id: uuid_1.v4()
            });
        }
        if (validator_1.default.isEmpty(address) || validator_1.default.isEmpty(addressId)) {
            errors.push({
                message: 'Please select address',
                type: 'register-address',
                id: uuid_1.v4()
            });
        }
        console.log(errors);
        if (errors.length > 0) {
            return res.status(400).send(errors);
        }
        next();
    }
    catch (error) {
        res.status(400).send();
    }
};
exports.validateAddRecipe = async (req, res, next) => {
    try {
        const { title, description, costPerMeal, ingredients, vegetarian, vegan, image, basePrepTime, additionalPrepTime } = req.body;
        const errors = [];
        if (title.length < 6 || title.length > 40) {
            errors.push({
                message: 'title must be between 6 and 40 characters',
                type: 'recipe-title',
                id: uuid_1.v4()
            });
        }
        if (description.length > 800) {
            errors.push({
                message: 'Description must be shorter than 800 charecters',
                type: 'recipe-description',
                id: uuid_1.v4()
            });
        }
        if (!costPerMeal) {
            errors.push({
                message: 'You must enter a cost per meal',
                type: 'recipe-cost',
                id: uuid_1.v4()
            });
        }
        if (costPerMeal <= 0) {
            errors.push({
                message: 'cost per meal must be greater than 0',
                type: 'recipe-cost',
                id: uuid_1.v4()
            });
        }
        if (ingredients.length <= 0) {
            errors.push({
                message: 'You must enter atleast 1 ingredient',
                type: 'recipe-ingredients',
                id: uuid_1.v4()
            });
        }
        if (!basePrepTime) {
            errors.push({
                message: 'You must enter a prep time',
                type: 'recipe-basePrepTime',
                id: uuid_1.v4()
            });
        }
        if (basePrepTime <= 0) {
            errors.push({
                message: 'prep time must be greater than 0',
                type: 'recipe-basePrepTime',
                id: uuid_1.v4()
            });
        }
        if (!additionalPrepTime) {
            errors.push({
                message: 'You must enter additional prep time',
                type: 'recipe-basePrepTime',
                id: uuid_1.v4()
            });
        }
        if (additionalPrepTime < 0) {
            errors.push({
                message: 'additional prep time cannot be smaller than 0',
                type: 'recipe-additionalPrepTime',
                id: uuid_1.v4()
            });
        }
        if (errors.length > 0) {
            return res.status(400).send(errors);
        }
        next();
    }
    catch (error) {
        res.status(400).send();
    }
};

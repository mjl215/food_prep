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
        if (errors.length > 0) {
            return res.status(400).send(errors);
        }
        next();
    }
    catch (error) {
        res.status(400).send();
    }
};

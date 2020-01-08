"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    userType: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        lat: {
            type: Number
        },
        long: {
            type: Number
        }
    },
    tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
});
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jsonwebtoken_1.default.sign({
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        userType: user.userType,
        location: user.location
    }, 'recipe', { expiresIn: 60 * 15 });
    user.tokens = [...user.tokens, { token }];
    await user.save();
    return token;
};
//Add types
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
};
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt_1.default.hash(user.password, 8);
    }
    next();
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;

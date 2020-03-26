"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const recipe_1 = __importDefault(require("./recipe"));
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
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        addressId: {
            type: String,
            required: true
        }
    },
    tokens: [{
            token: {
                type: String,
                required: true
            }
        }],
    basket: [{
            recipe: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            owner: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                required: true
            },
            costPerMeal: {
                type: Number,
                required: true
            },
            basePrepTime: {
                type: Number,
                required: true
            },
            additionalPrepTime: {
                type: Number,
                required: true
            },
            basketId: {
                type: String,
                required: true
            }
        }]
});
userSchema.virtual('buyerOrder', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'buyer'
});
userSchema.virtual('suplierOrder', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'suplier'
});
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    try {
        const token = jsonwebtoken_1.default.sign({
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            userType: user.userType,
            location: user.location,
            basket: user.basket
        }, 'recipe');
        user.tokens = [...user.tokens, { token }];
        await user.save();
        return token;
    }
    catch (error) {
        console.log(error);
    }
};
//Add types
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
};
userSchema.statics.findByCredentials = async (email, password) => {
    // const user = await User.findOne({ email });
    // if (!user) {
    //     throw new Error('Unable to login');
    // }
    // const isMatch = await bcrypt.compare(password, user.password)
    // if (!isMatch) {
    //     throw new Error('Unable to login');
    // }
    // return user;
};
userSchema.pre('save', async function (next) {
    const user = this;
    console.log('password');
    if (user.isModified('password')) {
        user.password = await bcrypt_1.default.hash(user.password, 8);
    }
    next();
});
// Delete recipes when user is removed
userSchema.pre('remove', async function (next) {
    const user = this;
    console.log('here');
    await recipe_1.default.deleteMany({ owner: user._id });
    next();
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;

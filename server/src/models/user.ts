import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import { ObjectID, ObjectId } from "mongodb";

export interface UserInterface extends mongoose.Document {
    name: string;
    email: string;
    userType: 'ADMIN' | 'SUPLIER' | 'BUYER';
    password: string;
    tokens: {token: string}[];
    location: {lat: number, lng: number, address: string, addressId: string};
    basket: {
        recipe: mongoose.Schema.Types.ObjectId, 
        quantity: number, 
        owner: mongoose.Schema.Types.ObjectId, 
        costPerMeal: number,
        basePrepTime: number,
        additionalPrepTime: number, 
        basketId: string
    };
    generateAuthToken(): string;
    buyerOrder(): any;
    suplierOrder(): any;
    
}

export interface UserModelInterface extends Model<UserInterface> {
    findByCredentials(): any;
}


const userSchema: Schema = new mongoose.Schema({
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
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            owner: {
                type: mongoose.Schema.Types.ObjectId,
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
})

userSchema.virtual('buyerOrder', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'buyer'
    })

userSchema.virtual('suplierOrder', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'suplier'
    })

userSchema.methods.generateAuthToken = async function () {
    
    const user = this;

    try {
        const token = jwt.sign({ 
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
    } catch (error) {
        console.log(error);
    }
    
};

  //Add types
userSchema.methods.toJSON = function (){
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

userSchema.statics.findByCredentials = async (email: string, password: string) => {
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


userSchema.pre<UserInterface>('save', async function (next: mongoose.HookNextFunction) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model<UserInterface, UserModelInterface>("User", userSchema);
export default User;
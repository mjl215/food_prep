import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';

export interface UserInterface extends Document {
    name: string;
    email: string;
    userType: 'ADMIN' | 'SUPLIER' | 'BUYER';
    password: string;
    tokens: {token: string}[];
    location: {lat: number, long: number};
    generateAuthToken(): string;
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
})

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign(
      { 
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
  userSchema.methods.toJSON = function (){
    const user = this;
    const userObject = user.toObject();
  
    delete userObject.password;
    delete userObject.tokens;
  
    return userObject;
  };


  userSchema.pre<UserInterface>('save', async function (next) {
    const user = this;
  
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  });

const User = mongoose.model<UserInterface>("User", userSchema);
export default User;
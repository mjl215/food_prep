import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import Order from '../models/order';
import bcrypt from 'bcrypt';

//Create a User
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    user.save((err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send({token, user});
        }
    });
};


//Login User
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password} = req.body
    
    try {
        const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login');
    }
    
    const token = await user.generateAuthToken();
    res.send({token, user});

    } catch (error) {
        res.status(400).send();
    }
}

//Logout User
export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.user.tokens = req.user.tokens.filter((token: {token: string}) => {
        return token.token !== req.token
        })
    
        await req.user.save();
    
        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
}

//Check Auth of User
export const authUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send({user: req.user, token: req.token});
    } catch (e) {
        console.log(e)
    }
}




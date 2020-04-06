import { Request, Response, NextFunction, response } from 'express';
import { v4 as uuidv4 } from 'uuid'
import crypto from 'crypto';
import nodemailer from 'nodemailer';

import { validateRegister } from '../middleware/validate';

import User from '../models/user';
import bcrypt from 'bcrypt';

//Create a User
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    // const errors = validateRegister(req.body);
    // console.log(errors)
    // if(errors.length > 0){
    //     return res.status(400).send(errors);
    // }
    try {
        const user = new User(req.body);
        const token = await user.generateAuthToken();
        await user.save() // leave this in to send error correctly
        res.send({token, user});
    } catch (error) {
        res.status(400).send();
    }

};

//Login User
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password} = req.body;
    try {
        const user = await User.findOne({ email });

    if (!user) {
        throw new Error();
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login');
    }
    
    const token = await user.generateAuthToken();
    res.status(201).send({token, user});

    } catch (error) {
        res.status(400).send({
            message: 'Email or password Incorrect',
            type: 'login',
            id: uuidv4()
        });
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


//DELETE USER
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('in delete user');
        const user = await User.findByIdAndDelete(req.user._id);
        res.locals.user = user;
        
        if(!user){
            return res.status(404).send();
        }

        next()

    } catch (e) {
        res.status(500).send();
    }
}

//SEND RESET EMAIL
export const passwordEmailReset = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user = await User.findOne({email: req.body.email});

        if(!user){
            return res.send('user not found')
        }

        const passwordToken = crypto.randomBytes(20).toString('hex');

        user.passwordToken = passwordToken;
        user.passwordTokenExpire = Date.now() + 3600000;

        await user.save(); 

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.EMAIL}`,
                pass: `${process.env.PASS}`
            }
        })

        const mailOptions = {
            from: 'recipe.project.reset@gmail.com',
            to: `${user.email}`,
            subject: 'Link to reset password',
            text: `To reset password please follow this link http://localhost:3001/reset-password/${passwordToken}`
        }

        transporter.sendMail(mailOptions, (err, response) => {
            if(err){
                console.log(err);
            } else {
                console.log('here is the res: ',  response);
                res.status(200).send('email send')
            }
        })

    } catch (e) {
        
    }
}

export const resetPasswordCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const user = await User.findOne({passwordToken: req.query.passwordToken});

        if(!user){
            return res.status(400).send({error: 'user not found'});
        }

        if(user.passwordTokenExpire < Date.now()){
            return res.status(400).send({error: 'token expired'});
        }

        res.send(user);

    } catch (e) {
        res.status(400).send();
    }
}

export const resetPassword =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);

        const user = await User.findOne({email: req.body.email})

        if(!user){
            return res.status(400).send('user not found');
        }

        if(user.passwordToken !== req.body.passwordToken){
            return res.status(400).send('token error');
        }
        
        user.password = req.body.newPassword;
        user.passwordToken = '';
        user.passwordTokenExpire=0;

        const updatedUser = await user.save();

        res.send(updatedUser);

    } catch (e) {
        res.status(400).send(e);
    }
}

export const resetPasswordEdit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, newPassword, confirmPassword} = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error();
        }

        if(newPassword !== confirmPassword){
            throw new Error()
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            throw new Error();
        }

        user.password = newPassword;
        const updatedUser = await user.save();
        res.send(updatedUser);

    } catch (e) {
        res.send(400);
    }
}

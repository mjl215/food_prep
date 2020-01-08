import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

// Recipe Class
//import { Todo } from '../models/todo';
//const TODOS: Todo[] = [];



export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    user.save((err: any) => {
        if (err) {
            res.send(err);
        } else {
            console.log('saving')
            res.send({token});
        }
    });
};
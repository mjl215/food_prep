import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User  from '../models/user';



export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(token){
        const decoded: any = jwt.verify(token, 'recipe'); // fix this casting
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error();
        }
        
        req.token = token;
        req.user = user;

        next();
    }
  } catch (error) {
    res.status(401).send({ error: 'please authenticate' })
  }
};


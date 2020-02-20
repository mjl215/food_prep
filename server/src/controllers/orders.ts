import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import Order from '../models/order';

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(req.user.userType === 'BUYER'){
      const user = await User.findById(req.user._id);
      
      if(!user){
        throw new Error('no user found')
      }

      await user.populate('buyerOrder').execPopulate()
      res.send({orders: user.buyerOrder});
      
    } else {
      const user = await User.findById(req.user._id);
      
      if(!user){
        throw new Error('no user found')
      }

      await user.populate('suplierOrder').execPopulate()
      res.send({orders: user.suplierOrder})
    }
    

  } catch (error) {
    console.log(error)
  }
}

export const completeOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.params.id)
    
    const order = Order.findByIdAndUpdate(req.params.id, {status: 'COMPLETE'})
    

    //const order = Order.findByIdAndUpdate

  } catch (error) {
      console.log(error);
  }
}


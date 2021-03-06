import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import Order from '../models/order';


//Add User Basked
export const addBasket = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const user = await User.updateOne(
          {_id: req.user.id}, 
          {basket: req.body.basket}
      );
      
      if(!user){
          throw new Error('user not found')
      }

      const updatedUser = await User.findOne({_id: req.user.id})
      res.send(updatedUser);
      
      // const newBasket = {recipe: req.body.recipe, quantity: req.body.quantity}
      // user.basket = [...user.basket, newBasket];
  } catch (e) {
      console.log(e)
  }
}

export const checkout = async (req: Request, res: Response, next: NextFunction) => {
  try {

      const basket = req.body.basket
      console.log(basket);
      basket.forEach((basketItem: any) => {
          

              const newOrder = {
                  recipe: basketItem.recipe,
                  buyer: req.user._id,
                  suplier: basketItem.owner,
                  quantity: basketItem.quantity,
                  status: 'OPEN',
                  orderId: basketItem.basketId,
                  costPerMeal: basketItem.costPerMeal,
                  prepTime: basketItem.basePrepTime + (basketItem.additionalPrepTime * (basketItem.quantity-1))
              }
  
              const order = new Order(newOrder);
              order.save();
      });
      
      const user = await User.updateOne(
          {_id: req.user.id}, 
          {basket: []}
      );

      res.send();

      
  } catch (e) {
      
  }
}
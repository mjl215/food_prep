import { Request, Response, NextFunction } from 'express';

import RecipeReview from '../models/recipeReview';
import User from '../models/user';

export const PostRecipeReview =  async (req: Request, res: Response, next: NextFunction) => {
  try {
      
      const user = await User.findById(req.user._id)
      

      if(!user){
        throw new Error('user not found')
      }
      
      const review = new RecipeReview({
        ...req.body,
        userId: req.user._id
      });
      const savedReview = await review.save()
  
      res.send('hi');

  } catch (e) {
      res.send(e);
  }
}
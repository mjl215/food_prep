import { Request, Response, NextFunction } from 'express';

import RecipeReview from '../models/recipeReview';
import User from '../models/user';

export const postRecipeReview =  async (req: Request, res: Response, next: NextFunction) => {
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

export const getReviewsForRecipe =  async (req: Request, res: Response, next: NextFunction) => {
  try {
      
      const reviews = await RecipeReview.find({recipeId: req.params.id})
      res.send(reviews);

  } catch (e) {
      res.send(e);
  }
}

export const getReviewsForUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.user._id)
    

    if(req.user._id != req.params.id){
      return res.send('error')
    }

    const reviews =  await RecipeReview.find({userId: req.params.id})

    res.send(reviews)

} catch (e) {
    res.send(e);
}
}



export const deleteRecipeReview =  async (req: Request, res: Response, next: NextFunction) => {
  try {
      
      const deletedReview = await RecipeReview.findOneAndDelete({_id: req.params.id, userId: req.user._id})
    
      res.send(deletedReview)

  } catch (e) {
      res.send(e);
  }
}

export const updateRecipeReview =  async (req: Request, res: Response, next: NextFunction) => {
  try {

      const updatedReview = await RecipeReview.findOneAndUpdate({_id: req.params.id, userId: req.user._id}, 
        req.body.update, 
        {
        new: true
      })

      if(!updatedReview){
        return res.send('not found')
      }
      return res.send(updatedReview)

  } catch (e) {
      res.send(e);
  }
}


